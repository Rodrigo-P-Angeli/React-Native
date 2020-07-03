/* eslint-disable react-native/no-inline-styles */
/* eslint-disable semi */
/* eslint-disable prettier/prettier */

import React, { Component } from 'react'
import { ImageBackground, Text, StyleSheet, View, TouchableOpacity} from 'react-native'
import backgroungImage from '../../assets/imgs/login.jpg'
import CommonStyles from '../CommonStyles'
import AuthInput from '../Component/AuthInput'
import { server, showErro, showSuccess } from '../Common'
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'

const initialState = {
    name: '',
    email: 'rodrigop.deangeli@gmail.com',
    password: 'z1o2i3o4',
    confirmPassword: '',
    stageNew: false,
}

export default class Auth extends Component {

    state = { ...initialState }

    signOrSignup = () => {
        if (this.state.stageNew) {
            this.signUp()
        } else {
            this.signIn()
        }
    }
    signUp = async () => {
        try {
            await axios.post(`${server}/signup`, {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                confirmPassword: this.state.confirmPassword,
            })

            showSuccess('Usuário cadastrado')
            this.setState({ initialState })
        } catch (e) {
            showErro(e)
        }
    }

    signIn = async () => {
        try {
            const res = await axios.post(`${server}/signin`, {
                email: this.state.email,
                password: this.state.password,
            })
            AsyncStorage.setItem('userData', JSON.stringify(res.data))
            axios.defaults.headers.common['Authorization'] = `bearer ${res.data.token}`
            this.props.navigation.navigate('Home', res.data)
        } catch (e) {
            showErro(e)
        }
    }

    render() {
        const validation = []
        validation.push(this.state.email && this.state.email.includes('@'))
        validation.push(this.state.password && this.state.password.length >= 6)

        if (this.state.stageNew) {
            validation.push(this.state.name && this.state.name.length >= 3)
            validation.push(this.state.confirmPassword === this.state.password)
        }

        const validForm = validation.reduce((a, d) => a && d)
        return (
            <ImageBackground style={styles.backgroung} source={backgroungImage}>
                <Text style={styles.title}>Task</Text>
                <View style={styles.formContainer}>
                    <Text style={styles.subTitle}>{this.state.stageNew ? 'Crie a sua conta' : 'Informe seus dados'}</Text>
                    {this.state.stageNew &&
                        <AuthInput icon={'user'} placeholder={'Nome'} value={this.state.name} style={styles.input} onChangeText={name => this.setState({ name })} />}
                    <AuthInput icon={'at'} placeholder={'Email'} value={this.state.email} style={styles.input} onChangeText={email => this.setState({ email })} />
                    <AuthInput icon={'lock'} secureTextEntry={true} placeholder={'Senha'} value={this.state.password} style={styles.input} onChangeText={password => this.setState({ password })} />
                    {this.state.stageNew &&
                        <AuthInput icon={'asterisk'} secureTextEntry={true} placeholder={'Confirmar Senha'} value={this.state.confirmPassword} style={styles.input} onChangeText={confirmPassword => this.setState({ confirmPassword })} />}
                    <TouchableOpacity onPress={this.signOrSignup} disabled={!validForm}>
                        <View style={[styles.button, validForm ? [] : { backgroundColor: '#AAA' }]}>
                            <Text style={styles.buttonText}>{this.state.stageNew ? 'Registrar' : 'Entrar'}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={{ padding: 10 }}
                    onPress={
                        () => this.setState({ stageNew: !this.state.stageNew })
                    }>
                    <Text style={styles.buttonText}>
                        {this.state.stageNew ? 'Fazer Login' : 'Criar conta'}
                    </Text>
                </TouchableOpacity >
            </ImageBackground >
        )
    }
}

const styles = StyleSheet.create({
    backgroung: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontFamily: CommonStyles.fontFamily,
        color: CommonStyles.Colors.secundary,
        fontSize: 70,
        marginBottom: 10,
    },
    subTitle: {
        color: 'white',
        fontFamily: CommonStyles.fontFamily,
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 10,
    },
    input: {
        marginTop: 10,
        backgroundColor: 'white',
    },
    formContainer: {
        backgroundColor: 'rgba(0,0,0,0.8)',
        padding: 20,
        width: '90%',
    },
    button: {
        backgroundColor: '#080',
        marginTop: 10,
        padding: 10,
        alignItems: 'center',
    },
    buttonText: {
        fontFamily: CommonStyles.fontFamily,
        color: 'white',
        fontSize: 20,
    },
})
