import React, { Component } from 'react'
import { Text, View, TouchableHighlight } from 'react-native'

import PropTypes from 'prop-types';

import { FontAwesome, MaterialIcons, Feather} from "@expo/vector-icons";

import { StackActions, NavigationActions } from 'react-navigation';

import {
    Container,
    NavBar,
    Footer,
    Circle,
    Left,
    Logo
  } from './styles';
  
//import api from '../../services/api';

export default class Institutions extends Component {
  
  static navigationOptions = {
    header: null,
  };

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
      dispatch: PropTypes.func,
    }).isRequired,
  };

  handleProfilePress = () => {
    this.props.navigation.navigate('Profile');
  }

  handleMainPress = () => {
    this.props.navigation.navigate('Main');
  }
  
  render() {
    return (
      <Container>
        <NavBar> 
          <Left>
            <Feather name="arrow-left" size={32} color="#000" onPress={this.handleMainPress}/>
          </Left>
          <Text>
            LocaQuadra USP
          </Text>
          <Logo source={require('../../images/Logo.png')} color="gray" resizeMode="contain"/>
        </NavBar>
        <Container>
          <Text>
            Body
          </Text>
        </Container>
        <Footer>
          <TouchableHighlight onPress={this.handleProfilePress}>
            <MaterialIcons name="person" size={32} color="#3e3e3e" />
          </TouchableHighlight>
          <TouchableHighlight onPress={this.handleMainPress}>
            <MaterialIcons name="home" size={32} color="#3e3e3e" />
          </TouchableHighlight>
          <Circle >
            <FontAwesome name="institution" size={28} color="#bfbfbf" />
          </Circle>
        </Footer>
      </Container>
    )
  }
}
