import React, { Component, useState } from 'react'
import { Platform, Text, View, StyleSheet, Animated, TouchableOpacity} from 'react-native';
import { connect } from 'react-redux'

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

class DeckItem extends Component  {

  state={
     bounceValue: new Animated.Value(1),
  }

  onPress = (item) =>
  {  
    const { deck, navigate } = this.props
    const { bounceValue} = this.state

    Animated.sequence([   
      Animated.timing(bounceValue, { duration: 1500, toValue: 0}),      
        ]).start(() => {this.resetAndnavigate()})
             
  }

  resetAndnavigate = () =>
  {   
    const { bounceValue} = this.state
    const { deck, navigate } = this.props

    bounceValue.setValue(1)    
    navigate(deck.title)    
  }

  render(){
    const { deck } = this.props
    const { bounceValue } = this.state 

    return (
      <AnimatedTouchable style={[styles.item, {opacity: bounceValue}]}
              onPress={()=>this.onPress(deck.title)}>
      <View style={{alignItems: 'center'}}>
        <Text style={{fontSize: 24, margin: 5}}>{deck.title}</Text>
        <Text>{`${deck.questions.length} Cards`}</Text>       
      </View>           
    </AnimatedTouchable>
      
    );
  }
}


function mapStateToProps ({decks}, {id}) {
  return {
    deck: decks[id]
  }
}

export default connect(
  mapStateToProps,
)(DeckItem)

const styles = StyleSheet.create({
  item: {
    flex: 1,
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: 'white',
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,    
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    },  
  }
});
