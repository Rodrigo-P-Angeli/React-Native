import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'

import Flag from './Flag'

export default prosp => {
    return (
        <View style={styles.container}>
            <View style={styles.flagContainer}>
                <TouchableOpacity onPress={prosp.onFlagPress} style={styles.onFlagPress}>
                    <Flag bigged />
                </TouchableOpacity>
                <Text style={styles.flagsLeft}>= {prosp.flagsLeft}</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={prosp.onNewGame}>
                <Text style={styles.buttonText}>New Game!</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: 20,
        paddingHorizontal: 20,
    },
    flagContainer: {
        flexDirection: 'row'
    },
    onFlagPress: {
        marginTop: 10,
        minWidth: 30
    },
    flagsLeft: {
        fontSize: 30,
        fontWeight: 'bold',
        paddingTop: 5,
        marginLeft: 20
    },
    button: {
        backgroundColor: '#999',
        padding: 5
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#DDD'
    },
})