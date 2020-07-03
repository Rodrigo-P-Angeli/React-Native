import React, { Component } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import params from './params'
import Header from './Components/Header'
import LevelSelection from './Screens/LevelSelection'

import MineFiled from './Components/MineField'
import { createMinedBoard, cloneBoard, openField, hadExplosion, showMines, wonGame, inverteFlag, flagsUsed } from './Functions';

export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = this.createState()
  }


  minesAmount = () => {
    const rows = params.getRowsAmount()
    const cols = params.getColumnsAmount()
    return Math.ceil(cols * rows * params.difficultLevel)
  }
  createState = () => {
    const rows = params.getRowsAmount()
    const cols = params.getColumnsAmount()
    return {
      board: createMinedBoard(rows, cols, this.minesAmount()),
      won: false,
      lost: false,
      showLevelSelection: false,
    }
  }

  onOpenField = (row, col) => {
    const board = cloneBoard(this.state.board)
    openField(board, row, col)
    const lost = hadExplosion(board)
    const won = wonGame(board)
    if (lost) {
      showMines(board)
      Alert.alert('Ai que buro, da zero pra ele!!')
    }
    if (won) {
      Alert.alert('Vc venceu')
    }
    this.setState({ board, lost, won })
  }

  onFlagField = (row, col) => {
    const board = cloneBoard(this.state.board)
    inverteFlag(board, row, col)
    const won = wonGame(board)
    if (won) {
      Alert.alert('Vc venceu')
    }
    this.setState({ board, won })
  }

  onLevelSelected = level => {
    params.difficultLevel = level
    this.setState(this.createState())
  }

  render() {
    return (
      <View style={styles.container}>
        <LevelSelection isVisibel={this.state.showLevelSelection} onLevelSelection={this.onLevelSelected} onCancel={()=> this.setState({ showLevelSelection: false })} />
        <Header flagsLeft={this.minesAmount() - flagsUsed(this.state.board)} onNewGame={() => this.setState(this.createState())} onFlagPress={() => this.setState({ showLevelSelection: true })} />
        <View style={styles.board}>
          <MineFiled board={this.state.board} onOpenField={this.onOpenField} onLongSelect={this.onFlagField} />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  board: {
    backgroundColor: '#AAA',
    alignItems: 'center',
  }

});
