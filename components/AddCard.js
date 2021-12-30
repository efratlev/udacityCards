import React, { Component } from 'react'
import {TouchableOpacity, View, StyleSheet, TextInput } from 'react-native';
import { connect } from 'react-redux'
import TextButton from './TextButton'
import { createCard } from './../actions/cards'
import {addCardToDeck} from './../utils/helpers'


class AddCard extends Component {

  state={
    question: '',
    answer: ''
  }

  handleChange = (name, value) =>
  {
    this.setState(()=>({
        [name]: value
    }))
  }

  submit =() =>
  {    
    const {dispatch} = this.props
    const {id} = this.props.route.params
    const {question, answer} = this.state

    const questionCard = {question:question, answer:answer}

    addCardToDeck(id, questionCard)

    dispatch(createCard({deckId:id, question:questionCard}))
    this.props.navigation.goBack('Details')
  }

  render(){
    const {question, answer} = this.state 
    return (
      <View style={styles.container}>
        <TextInput style={styles.input} value={question} 
          onChangeText={(value) => this.handleChange('question', value)}/> 
        <TextInput style={styles.input} value={answer} 
          onChangeText={(value) => this.handleChange('answer', value)}/> 
        <TextButton
            onPress={() => this.submit()}>
            Submit
        </TextButton>       
      </View>
    );
  }
}

export default connect()(AddCard)

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
    backgroundColor:'white'
  },
});
