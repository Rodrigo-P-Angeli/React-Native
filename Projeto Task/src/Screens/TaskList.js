/* eslint-disable semi */
/* eslint-disable prettier/prettier */

import React, { Component } from 'react'
import { View, Text, ImageBackground, StyleSheet, FlatList, TouchableOpacity, Platform, Alert } from 'react-native'

import AsyncStorage from '@react-native-community/async-storage'
import moment from 'moment'
import 'moment/locale/pt-br'
import Icon from 'react-native-vector-icons/FontAwesome'

import axios from 'axios'
import { server, showErro } from '../Common'

import AddTask from './AddTasks'
import todayImage from '../../assets/imgs/today.jpg'
import tomorrowImage from '../../assets/imgs/tomorrow.jpg'
import weekImage from '../../assets/imgs/week.jpg'
import monthImage from '../../assets/imgs/month.jpg'
import CommonStyles from '../CommonStyles'
import Task from '../Component/Task'

const inicialState = {
    showDoneTasks: true,
    showAddTask: false,
    visibleTasks: [],
    task: [],
}

export default class TaskList extends Component {
    state = {
        ...inicialState,
    }

    addTask = async newTask => {
        if (!newTask.desc && !newTask.desc.trim()) {
            Alert.alert('Digite uma tarefa')
            return
        }
        try {
            await axios.post(`${server}/tasks`, {
                desc: newTask.desc,
                estimateAt: newTask.date,
            })
            this.setState({ showAddTask: false }, this.loadTasks)
        } catch (e) {
            showErro(e)
        }
    }

    loadTasks = async () => {
        try {
            const maxDate = moment().add({ days: this.props.daysAhead }).format('YYYY-MM-DD 23:59:59')
            const res = await axios.get(`${server}/tasks?date=${maxDate}`)
            this.setState({ task: res.data }, this.filterTasks)
        } catch (e) {
            showErro(e)
        }
    }
    componentDidMount = async () => {
        const stateString = await AsyncStorage.getItem('taskState')
        const state = JSON.parse(stateString) || inicialState
        this.setState({ showDoneTasks: state.showDoneTasks }, this.filterTasks)

        this.loadTasks()
    }

    toggleFilter = () => {
        this.setState({ showDoneTasks: !this.state.showDoneTasks }, this.filterTasks)
    }

    filterTasks = () => {
        let visibleTasks = null
        if (this.state.showDoneTasks) {
            visibleTasks = [...this.state.task]
        } else {
            const pending = task => task.doneAt === null
            visibleTasks = this.state.task.filter(pending)
        }
        this.setState({ visibleTasks })
        AsyncStorage.setItem('taskState', JSON.stringify({ showDoneTasks: this.state.showDoneTasks }))
    }
    toggleTask = async taskId => {
        try {
            await axios.put(`${server}/tasks/${taskId}/toggle`)
            await this.loadTasks()
        } catch (e) {
            showErro(e)
        }
    }

    getImage = () => {
        switch (this.props.daysAhead) {
            default: return todayImage
            case 1: return tomorrowImage
            case 7: return weekImage
            case 30: return monthImage
        }
    }
    getColor = () => {
        switch (this.props.daysAhead) {
            default: return CommonStyles.Colors.today
            case 1: return CommonStyles.Colors.tomorrow
            case 7: return CommonStyles.Colors.week
            case 30: return CommonStyles.Colors.month
        }
    }
    onDelete = async id => {
        try {
            await axios.delete(`${server}/tasks/${id}`)
            await this.loadTasks()
        } catch (e) {
            showErro(e)
        }

    }
    render() {
        const today = moment().locale('pt-br').format('ddd, D [de] MMMM');
        return (
            <View style={styles.container}>
                <AddTask isVisible={this.state.showAddTask} onCancel={() => this.setState({ showAddTask: false })} onSave={this.addTask} />
                <ImageBackground style={styles.backGround} source={this.getImage()}>
                    <View style={styles.iconBar}>
                        <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
                            <Icon name={'bars'} size={20} color={CommonStyles.Colors.secundary} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.toggleFilter}>
                            <Icon name={this.state.showDoneTasks ? 'eye' : 'eye-slash'} size={20} color={CommonStyles.Colors.secundary} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.titleBar}>
                        <Text style={styles.title}>{this.props.title}</Text>
                        <Text style={styles.subTitle}>{today}</Text>
                    </View>
                </ImageBackground>
                <View style={styles.taskList}>
                    <FlatList data={this.state.visibleTasks} keyExtractor={item => `${item.id}`} renderItem={({ item }) => <Task {...item} toggleTask={this.toggleTask} onDelete={this.onDelete} />} />
                </View>
                <TouchableOpacity style={[styles.addButton, { backgroundColor: this.getColor() }]} onPress={() => this.setState({ showAddTask: true })}>
                    <Icon name={'plus'} size={20} color={CommonStyles.Colors.secundary} />
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backGround: {
        flex: 3,
    },
    taskList: {
        flex: 7,
    },
    titleBar: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    title: {
        fontFamily: CommonStyles.fontFamily,
        color: CommonStyles.Colors.secundary,
        fontSize: 50,
        marginLeft: 20,
        marginBottom: 20,
    },
    subTitle: {
        fontFamily: CommonStyles.fontFamily,
        color: CommonStyles.Colors.secundary,
        fontSize: 20,
        marginLeft: 20,
        marginBottom: 30,
    },
    iconBar: {
        flexDirection: 'row',
        marginHorizontal: 20,
        justifyContent: 'space-between',
        marginTop: Platform.OS === 'ios' ? 30 : 10,
    },
    addButton: {
        position: 'absolute',
        right: 30,
        bottom: 30,
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
})
