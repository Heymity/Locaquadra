import React, { Component } from 'react'
import { Text, View, TouchableHighlight, Modal, TouchableOpacity, AsyncStorage, Image } from 'react-native'

import PropTypes from 'prop-types';

import { FontAwesome, MaterialIcons} from "@expo/vector-icons";

import { StackActions, NavigationActions, } from 'react-navigation';

import * as Permissions from 'expo-permissions';

import { Camera } from 'expo-camera';

import {
    Container,
    NavBar,
    Footer,
    Circle,
    CancelButtonContainer,
    SelectButtonContainer,
    ButtonText,
    ModalContainer,
    ModalImagesListContainer,
    ModalImagesList,
    ModalImageItem,
    ModalButtons,
    CameraButtonContainer,
    CancelButtonText,
    ContinueButtonText,
    TakePictureButtonContainer,
    TakePictureButtonLabel,
    DataButtonsWrapper,
    Form,
    Input,
    DetailsModalFirstDivision,
    DetailsModalSecondDivision,
    DetailsModalBackButton,
    DetailsModalProfileTitle,
    ProfileImage,
    VisaoDoPoder,
    Hr,
    HrContainer,
    ProfileText,
    ProfileInput
  } from './styles';

  
import * as ImagePicker from 'expo-image-picker';
  
import api from '../../services/api';



export default class Profile extends Component {
  
  constructor () {
    super();
    this.state = {
      hasCameraPermission: true,
      type: Camera.Constants.Type.back,
      newProfile: false,
      cameraModalOpened: false,
      dataModalOpened: false,
      profileData: {
        title: '',
        images: [],
      },
      user: {},
      username: "",
      description: ""
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

  handleInstitutionPress = () => {
    this.props.navigation.navigate('Institution');
  }

  handleMainPress = () => {
    this.props.navigation.navigate('Main');
  }

  handleCameraModalOpenClose = () => this.setState({
    cameraModalOpened: !this.state.cameraModalOpened 
  })

  
  handleTakePicture = async () => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true, forceUpOrientation: true, fixOrientation: true, };
      const data = await this.camera.takePictureAsync(options)
      const { profileData } = this.state;
      this.setState({ profileData: {
        ...profileData,
        images: [
          ...profileData.images,
          data,
        ]
      }})
    }
  }

  handleDataModalClose = () => this.setState({
    dataModalOpened: !this.state.dataModalOpened,
    cameraModalOpened: false,
  })

  
  handleInputChange = (index, value) => {
    const { profileData } = this.state;
    switch (index) {
      case 'title':
        this.setState({ profileData: {
          ...profileData,
          title: value,
        }});
        break;
    }
  }

  handleProfileInputChange = (value) => {
    this.setState({ description: value})
  }

  saveDes = async (desc, id) => {
    if(this.state.description != "" && this.state.description != desc)
    {
      var path = '/institution/' + id;
      console.log("\n\nEnviando dados...\n\n", path, desc, this.state.description);
      try {
        const response = await api.put(path, {
          description: this.state.description,
        })
        console.log(response)
      } catch(err)
      {
        console.log(err)
        return err
      }
    }
  }

  
  pickImage = async () => {
    const options1 = { mediaTypes: ImagePicker.MediaTypeOptions.All, allowsEditing: true, aspect: [6, 5] }
    const data1 = await ImagePicker.launchImageLibraryAsync(options1)
    const { profileData } = this.state;
    this.setState({ profileData: {
      ...profileData,
      images: [
        ...profileData.images,
        data1,
      ]
    }})
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
    const email = await AsyncStorage.getItem('@user_email')
    const user = await api.post('/atual', {
        email: email,
      });
    console.log(user)
    this.setState({ user: user });
  }
 
 
  renderImagesList = () => (
    this.state.profileData.images.length !== 0 ? (
      <ModalImagesListContainer>
        <ModalImagesList horizontal>
          { this.state.profileData.images.map ((image, i) => (
            <ModalImageItem source={{ uri: image.uri }} key={i.toString()} resizeMode="stretch" />
          ))}
        </ModalImagesList>
      </ModalImagesListContainer>
    ) : null
  )

  saveProfile = async () => {
    try {
      const {
        profileData: {
          title,
          images
        }
      } = this.state;
 
      
      const imagesData = new FormData();
      //const email = await AsyncStorage.getItem('@user_email')
      //console.log(email)
      const user = this.state.user
      //  email: email,
     // });
      console.log(this.state.user)
      

      images.forEach((image, index) => {
        imagesData.append('image', {
          uri: image.uri,
          type: 'image/jpeg',
          name: `${user.data[0].username}_${index}.jpg`
        });
      });
 
      await api.post(
        `/institution/${user.data[1].id}/images`,
        imagesData,
      );

      this.handleDataModalClose()
    } catch (err) {
      console.log(err)
      return(err);
    }
  }

  renderBody = () => {
    console.log(this.state.user)
    try{
      if(this.state.user.data[0] != undefined)
      {
        return (
          <VisaoDoPoder>
            { this.state.user.data[0].institution === true &&
              <View>
                <ProfileImage source={{ uri: `http://192.168.15.30:3333/images/${this.state.user.data[3].path}` }}/>
                <ProfileText>{this.state.user != {} && this.state.user.data[1].name}</ProfileText>
                <ProfileInput onChangeText={this.handleProfileInputChange}>{this.state.user != {} && this.state.user.data[1].description}</ProfileInput>
                <TouchableOpacity onPress={() => this.saveDes(this.state.user.data[1].description, this.state.user.data[1].id)}><Text>Salvar Descrição</Text></TouchableOpacity>
                <HrContainer><Hr size="3px"></Hr></HrContainer>
                <ProfileImage source={{ uri: `http://192.168.15.30:3333/images/${this.state.user.data[2].path}` }}/>
                <ProfileText>{this.state.user != {} && this.state.user.data[0].username}</ProfileText>
              </View>
            }
            { this.state.user.data[0].institution === false &&
              <View>
                <ProfileImage source={{ uri: `http://192.168.15.30:3333/images/${this.state.user.data[1].path}` }}/>
                <ProfileText>{this.state.user != {} && this.state.user.data[0].username}</ProfileText>
              </View>
            }
          </VisaoDoPoder>
        )
      }   
    } catch(err)
    {
      console.log(err)
    }
  };
  
  render() {
    return (
      <Container>
        <NavBar>
          <Text onPress={this.handleCameraModalOpenClose}>
            LocaQuadra USP
          </Text>
        </NavBar>
        <Container>
          {this.renderBody()}
        </Container>
        <Footer>
          <Circle >
            <MaterialIcons name="person" size={32} color="#bfbfbf" />
          </Circle>
          <TouchableHighlight onPress={this.handleMainPress}>
            <MaterialIcons name="home" size={32} color="#3e3e3e" />
          </TouchableHighlight>
          <TouchableHighlight onPress={this.handleInstitutionPress}>
            <FontAwesome name="institution" size={32} color="#3e3e3e" />
          </TouchableHighlight>
        </Footer>

        {this.renderCameraModal()}
        {this.renderDataModal()}
      </Container>
    )
  }

  renderCameraModal = () => (
    <Modal
      visible={this.state.cameraModalOpened}
      transparent={false}
      animationType="slide"
      onRequestClose={this.handleCameraModalClose}
    >
      <ModalContainer>
        <ModalContainer>
          <View style={{ flex: 1 }}>
            <Camera style={{ flex: 1 }} type={this.state.type} ref={camera => {this.camera = camera;}} >
              <View
                style={{
                  flex: 1,
                  backgroundColor: 'transparent',
                  flexDirection: 'row',
                }}>
                <TouchableOpacity
                  style={{
                    flex: 0.1,
                    alignSelf: 'flex-end',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    this.setState({
                      type:
                        this.state.type === Camera.Constants.Type.back
                          ? Camera.Constants.Type.front
                          : Camera.Constants.Type.back,
                    });
                  }}>
                  <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
                </TouchableOpacity>
              </View>
            </Camera>
          </View>         
          <TakePictureButtonContainer onPress={this.handleTakePicture}>
            <TakePictureButtonLabel />
          </TakePictureButtonContainer>
        </ModalContainer>
        { this.renderImagesList() }
        <ModalButtons>
          <CameraButtonContainer onPress={this.handleCameraModalOpenClose}>
            <CancelButtonText>Cancelar</CancelButtonText>
          </CameraButtonContainer>
          <CameraButtonContainer onPress={this.handleDataModalClose}>
            <ContinueButtonText>Continuar</ContinueButtonText>
          </CameraButtonContainer>
        </ModalButtons>
 
      </ModalContainer>
    </Modal>
  )

  renderDataModal = () => (
    <Modal
      visible={this.state.dataModalOpened}
      transparent={false}
      animationType="slide"
      onRequestClose={this.handleDataModalClose}
    >
      <ModalContainer>
        <ModalContainer>
        </ModalContainer>
        { this.renderImagesList() }
        <Form>
          <Input
            placeholder="Título do Perfil"
            value={this.state.profileData.title}
            onChangeText={title => this.handleInputChange('title', title)}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <DataButtonsWrapper>
            <SelectButtonContainer onPress={this.pickImage}>
              <ButtonText>Escolha uma imagem</ButtonText>           
            </SelectButtonContainer>
          </DataButtonsWrapper>
        </Form>
        <DataButtonsWrapper>
          <SelectButtonContainer onPress={this.saveProfile}>
            <ButtonText>Salvar Perfil</ButtonText>
          </SelectButtonContainer>
          <CancelButtonContainer onPress={this.handleDataModalClose}>
            <ButtonText>Cancelar</ButtonText>
          </CancelButtonContainer>
        </DataButtonsWrapper>
      </ModalContainer>
    </Modal>
  )
}
