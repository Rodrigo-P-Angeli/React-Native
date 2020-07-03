import React from 'react'
import { StyleSheet, View, Text, Dimensions, TouchableHighlight } from 'react-native'

const styles = StyleSheet.create({
    display: {
        flex: 1,
        padding: 20,
        backgroundColor: 'rgba(0,0,0,0.6)',
        alignItems: 'flex-end',
        justifyContent: 'center',
        borderColor: '#888',
    },
    displayValue: {

        fontSize: 60,
        color: '#fff',

    }
})

export default props =>
    <View style={styles.display}>
        <Text style={styles.displayValue} numberOfLines={1}>{props.value}</Text>
    </View>