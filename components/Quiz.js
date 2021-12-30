import * as React from 'react';
import { Text, FlatList, StyleSheet, View, TouchableOpacity } from 'react-native';
import TextButton from './TextButton'
import { connect } from 'react-redux'
import { registerForPushNotificationsAsync, clearLocalNotification } from './../utils/helpers'

class Quiz extends React.Component {

  state={
    toggleCard: false,
    score: 0
  }

  nextCard=(answer) =>{
    const {score} = this.state
    let {cardId, deck} = this.props

    this.setState(()=>({score: answer==='Correct'?score+1:score}))

    this.setState(()=>({toggleCard: false}))
    
    this.props.navigation.navigate('Quiz', {deckId:deck.title, cardId:cardId+1})
  }

  restartTheQuiz = () =>
  {
    const {deck, navigation} = this.props   
    
    this.setState(()=>({score: 0}))

    navigation.navigate('Quiz', {deckId:deck.title, cardId:0})

  }

  render(){
    const {toggleCard, score} = this.state
    const {questions} = this.props.deck

    if(this.props.card===undefined)
    {
      clearLocalNotification()
      .then(registerForPushNotificationsAsync)
      
      return(
        <View style={[{flex: 1}, styles.center]}>
          <Text>You answered correctly on:</Text>
          <Text>{score}/{questions.length}</Text>
           <TextButton
              onPress={this.restartTheQuiz}
            >Restart
          </TextButton>
        </View>)
    }

    const {answer, question} = this.props.card
    const cardId = this.props.cardId+1

    return (
      <View style={styles.container}>
        <Text style={styles.txtNumberLeft}>{cardId}/{questions.length}</Text>
        <View style={styles.center}>
          <Text style={styles.txtAnswerquestion}>{toggleCard?answer:question}</Text>
          <TextButton
              onPress={()=>this.setState(()=>({toggleCard:!toggleCard}))}
            >{toggleCard?'Question':'Answer'}
          </TextButton>
        </View>
         <View style={styles.buttonsContainer} >
           <TextButton style={{backgroundColor: 'green'}}
              onPress={()=>this.nextCard('Correct')}
            >Correct
          </TextButton>
          <TextButton style={{backgroundColor: 'red'}}
              onPress={()=>this.nextCard('Incorrect')}
            >Incorrect
          </TextButton>
        </View>        
      </View>
    );
  }
}

const styles = StyleSheet.create({
   container: {
    flex:1,
    padding: 24,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  txtNumberLeft:{    
    justifyContent: 'left',
  },
  buttonsContainer:{    
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  txtAnswerquestion: {
    height: 30,
    margin: 20,
  }
});

function mapStateToProps({decks}, {route}){  
  const deckId = route.params.deckId
  const cardId = route.params.cardId

  return{
    card: decks[deckId].questions[cardId],
    cardId,
    deck: decks[deckId]
  }
}

export default connect(mapStateToProps)(Quiz)