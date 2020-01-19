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
    NRow,
    TextoOucupado,
    VisaoOcupada,
    Locate,
    ErrorMessage,
    LocateBtn,
    ScrollViewOucupada,
    VisaoMuitoOucupada,
    LocateText,
    SuccessMessage,
    VisaoNemTaoOucupada,
    VisaoMuitoFlexivel
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
      ant: 0,
      reservs: [],
      errorMessage: "",
      successMessage: ""
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
      const response = await api.get('/reserv', {})
      console.log(response.data)
      this.setState({ reservs: response.data })
      
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
      )
      //timeOut = tmp[0] + ":" + dateOut
      
    ) : console.log("lenght:", dateOut.toString().length)//timeOut = tmp[0] + ":" + dateOut
    var tmpp = dateOut.toString();
    tmpp.length == 1 ? timeOut = tmp[0] + ":" + "0" + dateOut : timeOut = tmp[0] + ":" + dateOut
    console.log(timeOut)
    this.setState({timeOut: timeOut, ant: parseInt(value)})
  }

  toDate = (dateIn) => {
    var tmp = []
    var tmp2 = []
    typeof(dateIn) == "string" ? (
      tmp = dateIn.split("-"), 
      tmp2 = tmp[3].split(":"),
      dateIn = new Date(tmp[0], (parseInt(tmp[1]) - 1), tmp[2], tmp2[0], tmp2[1]),
      dateIn.toISOString()
    ) : console.log(dateIn);

    return dateIn;
  }

  fromISOtoISO = (dateIn) => {
    var tmp = [];
    var tmp2 = [];
    var tmp3 = [];
    //console.log(dateIn)
    typeof(dateIn) == "string" ? (
      tmp = dateIn.split("-"), 
      //console.log(tmp),
      tmp2 = tmp[2].split(":"),
      tmp3 = tmp2[0].split("T"),
      //console.log(tmp2),
      dateIn = new Date(tmp[0], tmp[1], tmp3[0], tmp3[1], tmp2[1])
    ) : console.log(dateIn)

    return dateIn
  }

  handleDateChange = (date) => {
    this.setState({date: date})
    this.handleTimePress(0);
    this.handleTimeMimPress(0);
  }

  locateCourt = async (out, courtid) => {
    console.log("\n\nEnviando dados\n\n");
    console.log(this.state.date, out, this.state.user[0].institution_id, courtid);
    try {
      const responseReserv = await api.get('/reserv', {})
      this.setState({ reservs: responseReserv.data })
      
    } catch(err) {
      return err
    }
    var dateIn = this.toDate(this.state.date)
    var dateOut = this.toDate(out)
    var canLocate = true;
    
    console.log(dateIn);
    this.state.reservs.map ((item, i) => {
      //console.log(item);
      var itemDateIn = this.fromISOtoISO(item.timeIn)
      var itemDateOut = this.fromISOtoISO(item.timeOut)

      var x = parseInt(itemDateIn.getHours()) + (parseInt(itemDateIn.getMinutes()) / 60)
      var y = parseInt(itemDateOut.getHours()) + (parseInt(itemDateOut.getMinutes()) / 60)

      if(dateIn.getDate() == itemDateIn.getDate() && parseInt(dateIn.getMonth()) + 1 == itemDateIn.getMonth())
      {       
        var d = parseInt((dateOut.getTime() - dateIn.getTime())) / 3600000
        var f = parseInt(dateOut.getHours()) + (parseInt(dateOut.getMinutes()) / 60)
        var i = parseInt(dateIn.getHours()) + (parseInt(dateIn.getMinutes()) / 60)

        var tmp = [f - (2 * d), f, i, i + (2 * d)]
        console.log(x, y, tmp, d, f, i, canLocate)
        if(tmp[0]<=x && x<=tmp[1] && tmp[2]<=y && y<=tmp[3])
        {
          console.log("\nNAO PODE\n")
          canLocate = false;
        }
      }
     
    });
    if(canLocate)
    {
      try {
        const response = await api.post('/reserv', {
          court_id: courtid,
          institution_id: this.state.user[0].institution_id,
          timeIn: dateIn,
          timeOut: out
        })
        this.setState({ successMessage:"A sua reserva foi concluida!" })
        console.log("response data:\n\n" ,response.data, "Message:\n\n", this.state.successMessage)    
        try {
          const responseReserv = await api.get('/reserv', {})
          this.setState({ reservs: responseReserv.data })
          
        } catch(err) {
          return err
        }
      } catch(err) {
        console.log("err:\n\n",err)
        return err
      }
    } else {
      this.setState({ errorMessage:"Parece que ja existe uma reserva nessa data e horario nessa quadra" })
    }
   
    //this.setState({ reservs: response.data })
  };

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
          {/*<Text> {props.court.name} </Text>*/}
          <ImageView>
            <CourtImage source={{ uri: `http://192.168.15.30:3333/images/${props.court.images[0].path}` }} />
            <View>  
              <NameText>{props.court.name}</NameText>
              <DescriptionText>{props.court.description}</DescriptionText>
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
                  onDateChange={this.handleDateChange}
                />
                <TimeDisplay>
                  <TimeDisplayText>
                    {this.state.timeOut}
                  </TimeDisplayText>
                </TimeDisplay>
              </Row>
              <HrContainer><Text>Horas </Text><Hr size="2px"/></HrContainer>
              <Row>              
                <TimePicker backgroundColor="#979ac4" onPress={() => this.handleTimePress(0)}><Text>0</Text></TimePicker>
                <TimePicker backgroundColor="#9e88ba" onPress={() => this.handleTimePress(1)}><Text>1</Text></TimePicker>
                <TimePicker backgroundColor="#bd87c4" onPress={() => this.handleTimePress(2)}><Text>2</Text></TimePicker>
              </Row>
              <HrContainer><Text>Minutos </Text><Hr size="1px"/></HrContainer>
              <Row>
                <TimePicker backgroundColor="#979ac4" onPress={() => this.handleTimeMimPress(0)}><Text>00</Text></TimePicker>
                <TimePicker backgroundColor="#a797c4" onPress={() => this.handleTimeMimPress(15)}><Text>15</Text></TimePicker>
                <TimePicker backgroundColor="#ad91c4" onPress={() => this.handleTimeMimPress(30)}><Text>30</Text></TimePicker>
                <TimePicker backgroundColor="#bd87c4" onPress={() => this.handleTimeMimPress(45)}><Text>45</Text></TimePicker>
              </Row>
              <HrContainer><Hr size="3px"/></HrContainer>
            </View>
          }
          {this.state.user[0].institution === false &&
            <VisaoNemTaoOucupada>
              <ScrollViewOucupada>
                {this.RenderAvaible(props.court)}
              </ScrollViewOucupada>
            </VisaoNemTaoOucupada>
          }
          {this.state.user[0].institution === true && 
            <VisaoMuitoOucupada>
              <ScrollViewOucupada>
                {this.RenderAvaible(props.court)}
              </ScrollViewOucupada>
            </VisaoMuitoOucupada>
          }
          {this.state.user[0].institution === true && 
            <VisaoMuitoFlexivel>
              <Locate>
                <LocateBtn onPress={() => this.locateCourt(dateOut, props.court.id)}><LocateText>Locate</LocateText></LocateBtn>
                {this.state.errorMessage.length !== 0 && <ErrorMessage>{this.state.errorMessage}</ErrorMessage>}
                {this.state.successMessage.length !== 0 && <SuccessMessage>{this.state.successMessage}</SuccessMessage>}
              </Locate>
            </VisaoMuitoFlexivel>
          }
        </MidPart>
      </View>
    )
  }
  
  

  RenderCourts = () => {

    return this.state.courts.map ((item, i) => {
      console.log(i);
      handleCourtPress = () => {
        this.setState({crvisible: true, court: item, errorMessage: "", successMessage: ""})
      }
      return (
      <TouchableOpacity key={item.id} onPress={handleCourtPress}>
        <ImageView>
          <CourtImage source={{ uri: `http://192.168.15.30:3333/images/${item.images[0].path}` }} />
          <View>  
            <NameText>{item.name}</NameText>
            <DescriptionText>{item.description}</DescriptionText>
            <TouchableOpacity onPress={handleCourtPress}><Text>Locate</Text></TouchableOpacity>
          </View>
        </ImageView>
      </TouchableOpacity>
      )
    })
  };

  RenderAvaible = (props) => {
    
    return this.state.reservs.map ((item, i) => {
      //console.log(item);
      var dateIn = item.timeIn;
      var dateOut = item.timeOut;
      var tmp = [];
      var tmp2 = [];
      var tmp3 = [];
      //console.log(dateIn)
      typeof(dateIn) == "string" ? (
        tmp = dateIn.split("-"), 
        //console.log(tmp),
        tmp2 = tmp[2].split(":"),
        tmp3 = tmp2[0].split("T"),
        //console.log(tmp2),
        dateIn = new Date(tmp[0], tmp[1], tmp3[0], tmp3[1], tmp2[1])
      ) : dateIn.toISOString()
      dateIn.toISOString()
      typeof(dateOut) == "string" ? (
        tmp = dateOut.split("-"), 
        //console.log(tmp),
        tmp2 = tmp[2].split(":"),
        tmp3 = tmp2[0].split("T"),
        //console.log(tmp2),
        dateOut = new Date(tmp[0], tmp[1], tmp3[0], tmp3[1], tmp2[1])
      ) : dateOut.toISOString()
      dateOut.toISOString()
      console.log("\n\n\n\n\n\n\nprops:\n\n\n\n\n\n\n", props)
      if(props.id == item.court_id) {
        return (
        <VisaoOcupada key={item.id}>
          <NRow>
            <StatusCircle color="#d44848"/>
            <TextoOucupado>Oucupada Dia {dateIn.getDate()}/{dateIn.getMonth()} das {dateIn.getHours()}:{dateIn.getMinutes()} as {dateOut.getHours()}:{dateOut.getMinutes()} por {item.institution.name}</TextoOucupado>
          </NRow>
        </VisaoOcupada>
        )
      } else { return null }
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





