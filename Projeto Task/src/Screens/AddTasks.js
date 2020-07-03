/* eslint-disable no-shadow */
/* eslint-disable semi */
/* eslint-disable no-floating-decimal */
/* eslint-disable jsx-quotes */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */

import React, { Component } from 'react'
import { Plataform, Modal, View, StyleSheet, TouchableWithoutFeedback, Text, TextInput, TouchableOpacity, Platform } from 'react-native'
import CommonStyles from '../CommonStyles'
import DateTimePicker from '@react-native-community/datetimepicker'
import moment from 'moment'

const inicialState = { desc: '', date: new Date(), showDatePicker: false }

export default class AddTask extends Component {
    state = {
        ...inicialState,
    }

    save = () => {
        const newTask = {
            desc: this.state.desc,
            date: this.state.date,
        }
        this.props.onSave && this.props.onSave(newTask)
        this.setState({ ...inicialState })
    }

    getDatePicker = () => {

        let datePicker = <DateTimePicker
            value={this.state.date}
            onChange={(_, date) => this.setState({ date, showDatePicker: false })}
            mode='date' />
        const dateString = moment(this.state.date).format('ddd, D [de] MMMM')
        if (Platform.OS === 'android') {
            datePicker = (
                <View>
                    <TouchableOpacity onPress={() => this.setState({ showDatePicker: true })}>
                        <Text style={styles.date}>{dateString}</Text>
                    </TouchableOpacity>
                    {this.state.showDatePicker && datePicker}
                </View>
            )
        }
        return datePicker
    }
    render() {
        return (
            <Modal transparent={true} visible={this.props.isVisible} onRequestClose={this.props.onCancel} animationType={'slide'}>
                <TouchableWithoutFeedback onPress={this.props.onCancel}>
                    <View style={styles.overlay}>
                    </View>
                </TouchableWithoutFeedback>
                <View style={styles.container}>
                    <Text style={styles.header}>Nova Tarefa</Text>
                    <TextInput style={styles.input}
                        placeholder={'Informar tarefa'}
                        value={this.state.desc}
                        onChangeText={desc => this.setState({ desc })} />
                    {this.getDatePicker()}
                    <View style={styles.buttons}>
                        <TouchableOpacity onPress={this.props.onCancel}>
                            <Text style={styles.button}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.save}>
                            <Text style={styles.button}>Adicionar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableWithoutFeedback onPress={this.props.onCancel}>
                    <View style={styles.overlay}>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    container: {
        backgroundColor: 'white',
    },
    header: {
        fontFamily: CommonStyles.fontFamily,
        backgroundColor: CommonStyles.Colors.today,
        color: CommonStyles.Colors.secundary,
        textAlign: 'center',
        padding: 15,
        fontSize: 18,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'flex-end',

    },
    input: {
        fontFamily: CommonStyles.fontFamily,
        height: 40,
        margin: 15,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#e3e3e3',
        borderRadius: 6,
    },
    button: {
        margin: 20,
        marginRight: 30,
        color: CommonStyles.Colors.today,
    },
    date: {
        fontFamily: CommonStyles.fontFamily,
        fontSize: 20,
        marginLeft: 10,
    },
})
