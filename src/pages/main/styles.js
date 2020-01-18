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
  flexDirection: row;
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

const CourtImage = styled.Image`
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
  width: 100%;
  margin-top: 5px;
  margin-bottom: 5px;
  padding-top: 5px;
  padding-bottom: 10px;
  flexDirection: row;
  alignItems: flex-start;
  backgroundColor: #d7d3d2;
  border: 1px solid #d7d3d5;
  borderRadius: 10px;
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

const GoBack = styled.TouchableOpacity`
  position: absolute;
  left: 10px;
  font-size: 15px;
  font-weight: 700;
`;

const UserType = styled.Text`
  position: absolute;
  right: 10px;  
  font-size: 15px;
  font-weight: 700;
`;

const MidPart = styled.View`
  padding: 10px;
  backgroundColor: #FAF9F8;
  height: 100%;
  font-size: 12px;
`;

const TimePicker = styled.TouchableOpacity`
  border-radius: 3px;
  border: 1px solid #82a4cc;
  margin-left: 5px;
  margin-right: 5px;
  backgroundColor: ${props => props.backgroundColor};
  flex: 1;
  padding: 5px;
  justifyContent: center;
`;

const Row = styled.View`
  flexDirection: row;
  justifyContent: space-evenly;

`;

const Hr = styled.View`
  height: ${props => props.size};
  width: 100%;
  backgroundColor: #999999
`;

const TimeDisplay = styled.View`
  border-radius: 3px;
  border: 1px solid #afafd3;
  padding: 7px;
  margin-left: 10px;
  alignItems: center;
  flex: 1;
  justifyContent: center;
`;

const TimeDisplayText = styled.Text`
  font-weight: 700;
  font-size: 18px;
`;

const HrContainer = styled.View`
  padding: 10px
`;

const StatusCircle = styled.View`
  width: 24;
  height: 24;
  borderRadius: 12;
  justifyContent: center;
  alignItems: center;
  border: 2px solid #353535;
  backgroundColor: ${props => props.color};;
`;

const NRow = styled.View`
  flexDirection: row;
`;

export {
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
  };
  