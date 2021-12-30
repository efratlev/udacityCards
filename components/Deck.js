import * as React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'
import DeckItem from './DeckItem'
import TextButton from './TextButton'

class Deck extends React.Component{   
  render(){
    const { deck } = this.props
    const disabledQuiz = deck.questions === null || deck.questions.length === 0
    
    return (
      <View style={styles.container}>
        <View style={styles.item}>
          <Text style={{fontSize: 24, margin: 5}}>{deck.title}</Text>
          <Text>{`${deck.questions.length} Cards`}</Text>       
        </View>
        <View style={styles.buttonsContainer}>
          <TextButton
                onPress={()=>this.props.navigation.navigate(
                  'AddCard',
                  {id: deck.title}
                )}
              >Add Card
          </TextButton>
          <TextButton disabled={disabledQuiz} style={disabledQuiz?{backgroundColor: 'rgba(0, 0, 0, 0.24)'}:{}}
                onPress={()=>this.props.navigation.navigate('Quiz', {deckId: deck.title, cardId:0})}
              >Quiz
          </TextButton>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  buttonsContainer:{
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    padding: 25
  },
  item: {
    alignItems: 'center'
  }
});

export default connect(mapStateToProps)(Deck);

function mapStateToProps({decks},{route}){
  const { id } = route.params
  
  return{
    deck: decks[id]
  }
}
