/* eslint-disable react/self-closing-comp */
/* eslint-disable semi */
/* eslint-disable jsx-quotes */
/* eslint-disable prettier/prettier */
import Icon from 'react-native-vector-icons/FontAwesome'
import moment from 'moment'
import 'moment/locale/pt-br'
import Swipeable from 'react-native-gesture-handler/Swipeable'

import React from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import commonStyles from '../CommonStyles'

export default props => {
    const doneOrNotStyles = props.doneAt != null ? { textDecorationLine: 'line-through' } : {}
    const whatDateToShow = props.doneAt ? props.doneAt : props.estimateAt
    const date = moment(whatDateToShow).locale('pt-br').format('ddd, D [de] MMMM')

    const getRightContent = () => {
        return (
            <TouchableOpacity onPress={() => props.onDelete(props.id)} style={styles.right}>
                <Icon name={'trash'} size={20} color={'#FFF'}></Icon>
            </TouchableOpacity>
        )
    }
    const getLeftContent = () => {
        return (
            <View style={styles.left}>
                <Icon name={'trash'} size={20} color={'#FFF'} style={styles.excludesIcon} />
                <Text style={styles.excludeText}>Excluir</Text>
            </View>
        )
    }
    return (
        <Swipeable onSwipeableLeftOpen={() => props.onDelete(props.id)} renderRightActions={getRightContent} renderLeftActions={getLeftContent}>
            <View style={styles.containet}>
                <TouchableWithoutFeedback onPress={() => props.toggleTask(props.id)}>
                    <View style={styles.checkContainer}>
                        {getCheckView(props.doneAt)}
                    </View>
                </TouchableWithoutFeedback>
                <View>
                    <Text style={[styles.desc, doneOrNotStyles]}>{props.desc}</Text>
                    <Text style={styles.date}>{date}</Text>
                </View>
            </View>
        </Swipeable>
    )
}

function getCheckView(doneAt) {
    if (doneAt != null) {
        return (
            <View style={styles.done}>
                <Icon name='check' size={20} color='#FFF'></Icon>
            </View>
        )
    } else {
        return (
            <View style={styles.pendding}>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    containet: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderColor: '#AAA',
        borderBottomWidth: 1,
        alignItems: 'center',
        paddingVertical: 10,
    },
    checkContainer: {
        width: '20%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    pendding: {
        width: 25,
        height: 25,
        borderRadius: 13,
        borderWidth: 1,
        borderColor: '#555',
    },
    done: {
        width: 25,
        height: 25,
        borderRadius: 13,
        backgroundColor: '#4d7031',
        alignItems: 'center',
        justifyContent: 'center',
    },
    desc: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.Colors.mainText,
        fontSize: 15,
    },
    date: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.Colors.subText,
        fontSize: 12,
    },
    right: {
        backgroundColor: 'red',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
    },
    left: {
        flex: 1,
        backgroundColor: 'red',
        flexDirection: 'row',
        alignItems: 'center',
    },
    excludeText: {
        fontFamily: commonStyles.fontFamily,
        color: 'white',
        fontSize: 20,
        margin: 10,
    },
    excludesIcon: {
        margin: 10,
    },
})
