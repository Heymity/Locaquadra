import React, { Component } from 'react'
import { Text, View, TouchableHighlight, Modal, TouchableOpacity, AsyncStorage } from 'react-native'

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

  
  pickImage = async () => {
    const options1 = { mediaTypes: ImagePicker.MediaTypeOptions.All, allowsEditing: true, aspect: [4, 3] }
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
      const email = await AsyncStorage.getItem('@user_email')
      console.log(email)
      const user = await api.post('/atual', {
        email: email,
      });
      console.log(user.data[1].id)
      

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
        <MaterialIcons name="person" size={32} color="#bfbfbf" onPress={this.handleCameraModalOpenClose}/>
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
