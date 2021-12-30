import React, { Component } from 'react'
import { connect } from 'react-redux'
import {TouchableOpacity, View, StyleSheet, TextInput, Text } from 'react-native'
import { createDeck } from './../actions/decks'
import TextButton from './TextButton'
import {addDeck} from './../utils/helpers'

class AddDeck extends Component {

  state={
    value: ''
  }

  handleChange = (input) =>
  {
    this.setState(()=>({
      value: input
    }))
  }

  submit = () =>
  {
    const { dispatch } = this.props
    const title = this.state.value

    const deck = {title, questions: []}

    addDeck(deck)
    
    dispatch(createDeck(deck))

    this.setState(()=>({value: ''}))
    this.props.navigation.navigate('Details',{ id: title}  )
  }

  render(){
    const {value} = this.state 
    return (
      <View style={styles.container}>
        <TextInput style={styles.input} value={value} onChangeText={(value) => this.handleChange(value)}/> 
        <TextButton 
            onPress={() => this.submit()}
          ><Text>Submit</Text>
        </TextButton>       
      </View>
    );
  }
}

export default connect()(AddDeck)

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  input: {
    padding:10,
    margin:10,
    width: 200,
    fontSize: 24,
    textAlign: 'center',
    backgroundColor:'white',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    }
  },
});
