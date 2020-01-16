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


const Left = styled.View`
  alignItems: flex-start;
  justifyContent: flex-start;
  flexDirection: row;
  padding: 10px;
  margin: 5px;
`


const Logo = styled.Image`
  height: 30%;
  width: 10%;
`;


const InstitutionImage = styled.Image`
  height: 125px;
  width: 150px;
  resizeMode: stretch;
  borderRadius: 20px;
  position: relative;
  padding: 10px;
  margin-left: 5px;
  margin-right: 10px;
`;

const ImageView = styled.View`
  flex: 1;
  width: 100%;
  margin-top: 5px;
  margin-bottom: 5px;
  padding-top: 5px;
  padding-bottom: 10px;
  flexDirection: row;
  alignItems: flex-start;
  backgroundColor: #d7d3d2;
`;

const ImageScrollView = styled.ScrollView`
  flex: 1;
  width: 100%;
  padding-left: 10px;
  padding-right: 10px;
`;

const NameText = styled.Text`
  font-weight: 600;
  font-size: 16px;
  padding-left: 5px;
`;

const DescriptionText = styled.Text`
  font-weight: 400;
  font-size: 13px;
  margin-top: 2px;
  padding-left: 7px;
`;

export {
    Container,
    NavBar,
    Footer,
    Circle,
    Left,
    Logo,
    InstitutionImage,
    ImageView,
    ImageScrollView,
    NameText,
    DescriptionText
  };
  