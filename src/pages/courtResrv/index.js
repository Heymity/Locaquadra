import React, { Component } from 'react'
import { Text, View } from 'react-native'

export default class courtResrv extends Component {
    
  static navigationOptions = {
    header: null,
  };
  
  render() {
    return (
      <View>
        <Text> {this.props.name} </Text>
      </View>
    )
  }
}
