import React, { Component } from 'react'
import { Text, View, TouchableHighlight, ScrollView, Image, TouchableOpacity } from 'react-native'

import PropTypes from 'prop-types';

import { FontAwesome, MaterialIcons} from "@expo/vector-icons";

import { StackActions, NavigationActions } from 'react-navigation';

import {
    Container,
    NavBar,
    Footer,
    Circle,
    CourtImage,
    ImageView,
    ImageScrollView,
    NameText,
    DescriptionText
  } from './styles';
import api from '../../services/api';
  
//import api from '../../services/api';


export default class Main extends Component {

  constructor() {
    super();
    this.state = {
      courts: [],
      crvisible: false
    }
  }

  async componentDidMount() {
    try {
      const response = await api.get('/court', {})
      console.log(response.data)
      this.setState({ courts: response.data })
      
    } catch(err) {
      return err
    }
  }

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

  handleCourtPress = () => {
    this.setState({crvisible: true})
  }
  

  RenderCourts = () => {
    
    return this.state.courts.map ((item, i) => {
      console.log(i);
      return (
      <TouchableOpacity key={item.id} onPress={this.handleCourtPress}>
        <ImageView>
          <CourtImage source={{ uri: `http://192.168.15.30:3333/images/${item.images[0].path}` }} />
          <View>  
            <NameText>{item.name}</NameText>
            <DescriptionText>Lorem Ipsum dolar sit amet</DescriptionText>
            <TouchableOpacity onPress={this.handleCourtPress}><Text>Locate</Text></TouchableOpacity>
          </View>
        </ImageView>
      </TouchableOpacity>
      )
    })
  };
  
  render() {
      if (this.state.crvisible)
      {
        return null
      } else {
        return (
          <Container>
            <NavBar>
              <Text>
                LocaQuadra USP
              </Text>
            </NavBar>
            {/* <Container>
              <Text>
                Body
              </Text>
              
          
            </Container>
            */}
            <ImageScrollView >
              {this.RenderCourts()}
              {/*<ImageView >
                <CourtImage source={require('../../images/Logo.png')} />  
                <Text>ola</Text>
              </ImageView>*/}

            </ImageScrollView>
            
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
}

