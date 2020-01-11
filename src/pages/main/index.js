import React, { Component } from 'react'
import { Text, View, TouchableHighlight, ScrollView } from 'react-native'

import PropTypes from 'prop-types';

import { FontAwesome, MaterialIcons} from "@expo/vector-icons";

import { StackActions, NavigationActions } from 'react-navigation';

import {
    Container,
    NavBar,
    Footer,
    Circle
  } from './styles';
  
//import api from '../../services/api';

export default class Main extends Component {

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

  handleInstitutionPress = () => {
    this.props.navigation.navigate('Institution');
  }
  
  render() {
    return (
      <Container>
        <NavBar>
          <Text>
            LocaQuadra USP
          </Text>
        </NavBar>
        <Container>
          <Text>
            Body
          </Text>
        </Container>
        <ScrollView>
          {/* items.map() */}
        </ScrollView>
        <Footer>
          <TouchableHighlight onPress={this.handleProfilePress}>
            <MaterialIcons name="person" size={32} color="#3e3e3e" />
          </TouchableHighlight>
          <Circle>
            <MaterialIcons name="home" size={32} color="#bfbfbf" />
          </Circle>
          <TouchableHighlight onPress={this.handleInstitutionPress}>
            <FontAwesome name="institution" size={32} color="#3e3e3e" />
          </TouchableHighlight>
        </Footer>
      </Container>
    )
  }
}

