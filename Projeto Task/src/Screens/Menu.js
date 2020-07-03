/* eslint-disable no-shadow */
/* eslint-disable semi */
/* eslint-disable no-floating-decimal */
/* eslint-disable jsx-quotes */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */

import React from 'react'
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { DrawerItems } from 'react-navigation-drawer'
import { Gravatar } from 'react-native-gravatar'
import CommonStyles from '../CommonStyles'

import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'
import Icon from 'react-native-vector-icons/FontAwesome'

export default props => {
    const logout = () => {
        delete axios.defaults.headers.common['Authorization']
        AsyncStorage.removeItem('userData')
        props.navigation.navigate('AuthorApp')
    }

    return (
        <ScrollView>
            <View style={styles.header}>
                <Text style={styles.title}>Tasks</Text>
                <Gravatar style={styles.avatar}
                    options={{
                        email: props.navigation.getParam('email'),
                        secure: true,
                    }} />
                <View style={styles.usersInfo}>
                    <Text style={styles.emailText}>{props.navigation.getParam('name')}</Text>
                    <Text>{props.navigation.getParam('email')}</Text>
                </View>
                <TouchableOpacity onPress={logout}>
                    <View style={styles.logoutIcon}>
                        <Icon name={'sign-out'} size={30} color={'#800'} />
                    </View>
                </TouchableOpacity>
            </View>
            <DrawerItems {...props} />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    header: {
        borderBottomWidth: 1,
        borderBottomColor: '#DDD',
    },
    avatar: {
        width: 60,
        height: 60,
        borderWidth: 3,
        borderRadius: 30,
        margin: 10,
    },
    usersInfo: {
        marginLeft: 10,

    },
    emailText: {
        fontFamily: CommonStyles.fontFamily,
        fontSize: 15,
        color: CommonStyles.Colors.subText,
        marginBottom: 10,
    },
    nameText: {
        fontFamily: CommonStyles.fontFamily,
        fontSize: 20,
        marginBottom: 5,
        color: CommonStyles.Colors.mainText,
    },
    title: {
        color: '#000',
        fontFamily: CommonStyles.fontFamily,
        fontSize: 30,
        paddingTop: 30,
        padding: 10,
    },
    logoutIcon: {
        marginLeft: 10,
        marginBottom: 10,
    }
})
