import React, { Component } from 'react'
import { Text, View, TouchableHighlight, ScrollView, Image, TouchableOpacity, AsyncStorage, TextInput } from 'react-native'

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
    DescriptionText,
    GoBack,
    UserType,
    MidPart,
    TimePicker,
    Hr,
    Row,
    TimeDisplay,
    TimeDisplayText,
    HrContainer,
    StatusCircle,
    NRow
  } from './styles';

import api from '../../services/api';

import DatePicker from 'react-native-datepicker'

const today = new Date();
export default class Main extends Component {

  constructor() {
    super();
    this.state = {
      courts: [],
      user: {},
      crvisible: false,
      court: {},
      date: "",
      timeOut: "",
      ant: 0
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
    try {
      const email = await AsyncStorage.getItem("@user_email")
      const response = await api.post('/atual', { email: email})
      console.log(response.data)
      this.setState({ user: response.data })
      
    } catch(err) {
      return err
    }

    this.setState({date: today, timeOut: today.getHours() + ":" + today.getMinutes()})
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

  handleBackPress = () => {
    this.setState({crvisible: false})
  }

  handleTimePress = (value) => {  
    var dateIn = this.state.date
    var tmp = []
    var tmp2 = []
    typeof(dateIn) == "string" ? (
      tmp = dateIn.split("-"), 
      tmp2 = tmp[3].split(":"),
      dateIn = new Date(tmp[0], (parseInt(tmp[1]) - 1), tmp[2], tmp2[0], tmp2[1])
    ) : dateIn.toISOString()
    var tmp3 = dateIn.getHours();
    var dateOut = 0
    parseInt(tmp3) + value <= 23 ? dateOut = parseInt(tmp3) + value : dateOut = parseInt(tmp3)
    tmp = this.state.timeOut.split(':')
    var timeOut = "";
    dateOut <= tmp3 && tmp[1] < dateIn.getMinutes() ? timeOut = tmp3 + ":" + dateIn.getMinutes() : timeOut = dateOut + ":" + tmp[1]
    console.log(timeOut)
    this.setState({timeOut: timeOut})
  }

  handleTimeMimPress = (value) => {  
    var dateIn = this.state.date
    var tmp = []
    var tmp2 = []
    typeof(dateIn) == "string" ? (
      tmp = dateIn.split("-"), 
      tmp2 = tmp[3].split(":"),
      dateIn = new Date(tmp[0], (parseInt(tmp[1]) - 1), tmp[2], tmp2[0], tmp2[1])
    ) : dateIn.toISOString()
    var tmp3 = dateIn.getMinutes();
    var dateOut = parseInt(tmp3) + value
    tmp = this.state.timeOut.split(':')
    var timeOut = "";
    tmp[1] - this.state.ant < 0 ? tmp[0] = parseInt(tmp[0]) - 1 : console.log(tmp[0])
    dateOut >= 60 ? (
      tmp[0] == 23 ? dateOut = 59 : (
        tmp[0] = parseInt(tmp[0]) + 1,
        dateOut = parseInt(dateOut) - 60
      ),
      timeOut = tmp[0] + ":" + dateOut
      
    ) : timeOut = tmp[0] + ":" + dateOut
    console.log(timeOut)
    this.setState({timeOut: timeOut, ant: parseInt(value)})
  }

   RenderCR = (props) => {
    var today = new Date();
    var minDate = new Date(today.getTime());
    var maxDate = new Date(parseInt(minDate.getTime()) + 3768400000)
    var dateIn = new Date();
    var dateOut = new Date();
    dateIn = this.state.date
    var tmp = []
    var tmp2 = []
    typeof(dateIn) == "string" ? (
      tmp = dateIn.split("-"), 
      tmp2 = tmp[3].split(":"),
      dateIn = new Date(tmp[0], (parseInt(tmp[1]) - 1), tmp[2], tmp2[0], tmp2[1])
    ) : dateIn.toISOString()
    dateOut = this.state.timeOut
    console.log(dateOut)
    typeof(dateOut) == "string" ? (
      tmp2 = dateOut.split(":"),
      dateOut = new Date(dateIn.getFullYear(), dateIn.getMonth(), dateIn.getDate(), tmp2[0], tmp2[1])
    ) : dateOut.toISOString()
   
    console.log(today.getTime())
    console.log(maxDate)
    console.log(dateOut)
    console.log(dateIn)
    return (
      <View>
        <NavBar>
          <GoBack onPress={this.handleBackPress}>
            <Text>Go Back</Text>
          </GoBack>
          <View>
            {this.state.user[0].institution === true && <View><Text>Court Reservation</Text></View>}
            {this.state.user[0].institution === false && <View><Text>Court Status</Text></View>}
            {this.state.user[0].admin === true && <Text>admin</Text>}
          </View>
          {this.state.user[0].institution === true && <UserType>institution</UserType>}
        </NavBar>
        <MidPart>
          <Text> {props.court.name} </Text>
          <ImageView>
            <CourtImage source={{ uri: `http://192.168.15.30:3333/images/${props.court.images[0].path}` }} />
            <View>  
              <NameText>{props.court.name}</NameText>
              <DescriptionText>Lorem Ipsum dolar sit amet</DescriptionText>
            </View>
          </ImageView>
          {this.state.user[0].institution === true && 
            <View>
              <Row>
                <DatePicker
                  style={{ width: 250 }}
                  date={this.state.date}
                  mode="datetime"
                  placeholder="select date"
                  format="YYYY-MM-DD-HH:mm"
                  minDate={minDate}
                  maxDate={maxDate}
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  customStyles={{
                    dateIcon: {
                      position: 'absolute',
                      left: 0,
                      top: 4,
                      marginLeft: 0
                    },
                    dateInput: {
                      marginLeft: 36
                    }
                    // ... You can check the source to find the other keys.
                  }}
                  onDateChange={(date) => {this.setState({date: date})}}
                />
                <TimeDisplay>
                  <TimeDisplayText>
                    {this.state.timeOut}
                  </TimeDisplayText>
                </TimeDisplay>
              </Row>
              <HrContainer><Hr size="2px"/></HrContainer>
              <Row>              
                <TimePicker backgroundColor="#979ac4" onPress={() => this.handleTimePress(0)}><Text>0</Text></TimePicker>
                <TimePicker backgroundColor="#9e88ba" onPress={() => this.handleTimePress(1)}><Text>1</Text></TimePicker>
                <TimePicker backgroundColor="#bd87c4" onPress={() => this.handleTimePress(2)}><Text>2</Text></TimePicker>
              </Row>
              <HrContainer><Hr size="1px"/></HrContainer>
              <Row>
                <TimePicker backgroundColor="#979ac4" onPress={() => this.handleTimeMimPress(0)}><Text>00</Text></TimePicker>
                <TimePicker backgroundColor="#a797c4" onPress={() => this.handleTimeMimPress(15)}><Text>15</Text></TimePicker>
                <TimePicker backgroundColor="#ad91c4" onPress={() => this.handleTimeMimPress(30)}><Text>30</Text></TimePicker>
                <TimePicker backgroundColor="#bd87c4" onPress={() => this.handleTimeMimPress(45)}><Text>45</Text></TimePicker>
              </Row>
              <HrContainer><Hr size="3px"/></HrContainer>
            </View>
          }
          <StatusCircle color="#d44848"/>
        </MidPart>
      </View>
    )
  }
  
  

  RenderCourts = () => {
    
    return this.state.courts.map ((item, i) => {
      console.log(i);
      handleCourtPress = () => {
        this.setState({crvisible: true, court: item})
      }
      return (
      <TouchableOpacity key={item.id} onPress={handleCourtPress}>
        <ImageView>
          <CourtImage source={{ uri: `http://192.168.15.30:3333/images/${item.images[0].path}` }} />
          <View>  
            <NameText>{item.name}</NameText>
            <DescriptionText>Lorem Ipsum dolar sit amet</DescriptionText>
            <TouchableOpacity onPress={handleCourtPress}><Text>Locate</Text></TouchableOpacity>
          </View>
        </ImageView>
      </TouchableOpacity>
      )
    })
  };

  render() {
      if (this.state.crvisible)
      {
        return (
          <View>{this.RenderCR({court: this.state.court})}</View>
        )
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





