import * as React from 'react';
import { Text, FlatList, StyleSheet, View, TouchableOpacity, Platform, Animated } from 'react-native';
import { connect } from 'react-redux'
import DeckItem from './DeckItem'
import { handleInitialData } from './../actions/index'



class DecksList extends React.Component {

  componentDidMount () {
    const { dispatch } = this.props
    
    dispatch(handleInitialData())    
  }

  navigateToDeckDetails = (item) =>{
    this.props.navigation.navigate(
                  'Details',
                  {id: item}
                )
  }
  
  render() 
  {
    const { decks } = this.props

    return (
      <FlatList style={styles.list}      
          data = {decks}
          renderItem={({item}) =>           
              <DeckItem key={item} id={item} navigate={this.navigateToDeckDetails}></DeckItem>
            }
        />
    );
  }
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    padding: 24,
  },
});

function mapStateToProps ({decks}) {
  return {
    decks: Object.keys(decks)
  }
}

export default connect(
  mapStateToProps,
)(DecksList)
