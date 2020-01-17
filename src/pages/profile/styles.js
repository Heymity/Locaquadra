import styled from 'styled-components';

const Container = styled.View`
  flex: 1;
  alignItems: center;
  justifyContent: center;
  backgroundColor: #FAF9F8;
  height: 100%;
`;

const NavBar = styled.View`
  alignItems: center;
  justifyContent: center;
  backgroundColor: #799ed7;
  height: 60px;
  width: 100%;
`;

const Footer = styled.View`
  alignItems: center;
  flexDirection: row;
  justifyContent: space-evenly;
  backgroundColor: #6b95d3;
  height: 70px;
  width: 100%;
`;

const Circle = styled.View`
  width: 48;
  height: 48;
  borderRadius: 24;
  justifyContent: center;
  alignItems: center;
  backgroundColor: #5b6ad0;
`;


export {
    Container,
    NavBar,
    Footer,
    Circle
  };

  
export const CancelButtonContainer = styled.TouchableHighlight`
alignSelf: stretch;
borderRadius: 5px;
paddingVertical: 20px;
backgroundColor: #555;
marginTop: 20px;
`;

export const SelectButtonContainer = styled.TouchableHighlight`
alignSelf: stretch;
borderRadius: 5px;
paddingVertical: 20px;
backgroundColor: #fc6663;
`;

export const ButtonText = styled.Text`
color: #fff;
fontSize: 16px;
textAlign: center;
fontWeight: bold;
`;

export const ModalContainer = styled.View`
flex: 1;
backgroundColor: #FFF;
`;

export const ModalImagesListContainer = styled.View``;

export const ModalImagesList = styled.ScrollView`
paddingHorizontal: 20px;
paddingTop: 20px;
`;

export const ModalImageItem = styled.Image`
height: 100px;
width: 100px;
marginRight: 10px;
`;

export const ModalButtons = styled.View`
paddingHorizontal: 10px;
paddingVertical: 5px;
flexDirection: row;
justifyContent: space-between;
`;

export const CameraButtonContainer = styled.TouchableHighlight`
paddingVertical: 20px;
paddingHorizontal: 40px;
`;

export const CancelButtonText = styled.Text`
color: #333;
fontSize: 18px;
fontWeight: bold;
`;

export const ContinueButtonText = styled.Text`
color: #fc6663;
fontSize: 18px;
fontWeight: bold;
`;

export const TakePictureButtonContainer = styled.TouchableHighlight`
position: absolute;
alignSelf: center;
bottom: 20;
width: 60px;
height: 60px;
backgroundColor: #FFF;
borderRadius: 30px;
alignItems: center;
justifyContent: center;
`;

export const TakePictureButtonLabel = styled.View`
width: 52px;
height: 52px;
borderRadius: 26px;
backgroundColor: #fc6663;
`;

export const DataButtonsWrapper = styled.View`
flex: 1;
alignItems: center;
justifyContent: center;
paddingHorizontal: 20px;
`;

export const Form = styled.View`
flex: 1;
marginTop: 20px;
`;

export const Input = styled.TextInput`
paddingHorizontal: 20px;
paddingVertical: 10px;
borderRadius: 5px;
backgroundColor: #FFF;
alignSelf: stretch;
marginBottom: 10px;
marginHorizontal: 20px;
fontSize: 14px;
borderWidth: 1px;
borderColor: #CCC;
`;

export const DetailsModalFirstDivision = styled.View`
flex: 3;
alignItems: center;
justifyContent: center;
`;

export const DetailsModalSecondDivision = styled.View`
flex: 4;
alignItems: center;
justifyContent: center;
`;

export const DetailsModalBackButton = styled.Text`
color: #fc6663;
fontSize: 18px;
fontWeight: bold;
`;

export const DetailsModalProfileTitle = styled.Text`
fontSize: 28px;
fontWeight: bold;
textAlign: center;
marginBottom: 15px;
marginHorizontal: 40px;
`;
  