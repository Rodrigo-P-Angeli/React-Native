import { Alert, Platform } from 'react-native'

const server = Platform.OS === 'ios' ? 'http://localhost:3000' : 'http://192.168.43.25:3000'

function showErro(erro) {
    Alert.alert('Ops, ocorrei um erro', `Mensagem: ${erro}:`)
}


function showSuccess(msn) {
    Alert.alert('Sucesso!', msn)
}

export { showErro, showSuccess, server }