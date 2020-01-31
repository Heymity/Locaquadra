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
  width: 220px;
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
  padding-bottom: 50px;
`;

const TimePicker = styled.TouchableOpacity`
  border-radius: 3px;
  border: 1px solid #82a4cc;
  margin-left: 5px;
  margin-right: 5px;
  backgroundColor: ${props => props.backgroundColor};
  flex: 1;
  padding-left: 5px;
  padding-right: 5px;
  justifyContent: center;
`;

const Row = styled.View`
  flexDirection: row;
  justifyContent: space-evenly;

`;

const Hr = styled.View`
  height: ${props => props.size};
  /*width: 100%;*/
  flex: 1;
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
  padding: 10px;
  flexDirection: row;
  justifyContent: center;
  alignItems: center;
`;

const StatusCircle = styled.View`
  width: 24;
  height: 24;
  borderRadius: 12;
  justifyContent: center;
  alignItems: center;
  border: 2px solid #353535;
  backgroundColor: ${props => props.color};
`;

const NRow = styled.View`
  flexDirection: row;
`;

const TextoOucupado = styled.Text`
  margin-left: 5px;
  font-weight: 600;
  font-size: 15px;
`;

const VisaoOcupada = styled.View`
  margin-bottom: 2px;
  margin-top:3px;
`;

const Locate = styled.View`
  margin-bottom: 10px;
`;

const ErrorMessage = styled.Text`
  textAlign: center;
  color: #ce2029;
  fontSize: 16px;
  marginBottom: 15px;
  marginHorizontal: 20px;
`;

const LocateBtn = styled.TouchableOpacity`
  border-radius: 4px;
  border: 1px solid #82a4cc;
  margin-left: 5px;
  margin-right: 5px;
  margin-top: 10px;
  backgroundColor: #7e85cf;
  width: null;
  padding: 5px;
  justifyContent: center;
  alignItems: center;
`;

const LocateText = styled.Text`
  margin-left: 5px;
  font-weight: 600;
  font-size: 17px;
  color: #f9f8fa
`;


const VisaoMuitoOucupada = styled.View`
  height: 20%; 
  /*backgroundColor: #0000ff;*/
  padding-top: 10px;
  borderRadius: 12;
`;

const ScrollViewOucupada = styled.ScrollView`
  height: 5%;  
  flex: 1;
  width: 100%;
  backgroundColor: #e6e4d9;
  padding-left: 5px;
  padding-right: 5px;
  borderRadius: 12;
`;

const SuccessMessage = styled.Text`
  textAlign: center;
  color: #08a092;
  fontSize: 16px;
  marginBottom: 15px;
  marginHorizontal: 20px;
`;

const VisaoMuitoFlexivel = styled.View`
  flex: 1;
`;

const VisaoNemTaoOucupada = styled.View`
  height: 40%; 
  /*backgroundColor: #0000ff;*/
  padding-top: 10px;
  borderRadius: 12;
`;

const VisaoDeCalorMuitoFria = styled.View`
  flexDirection: row
`;

const TextoDerretido = styled.Text`
  textAlign: center;
  backgroundColor: #d2271eaa;
  fontSize: 13px;
  padding-left: 5px;
  padding-right: 5px;
  width: 37px;
`;

const VisaoCentralCronica = styled.View`
  justifyContent: center;
  alignItems: center;
`;

const TextoCongelado = styled.Text`
  textAlign: center;
  backgroundColor: #281faaaa;
  fontSize: 13px;
  padding-left: 5px;
  padding-right: 5px;
  width: 37px;
`;

const ImagemCronica = styled.Image`
  height: 110%;
  width: 110%;
  resizeMode: stretch;
`;

const DescricaoCronica = styled.Text`
  font-size: 15px;
  font-weight: 600;
`;

const VisaoCronica = styled.View`
  backgroundColor: #e2e7eb;
  border-radius: 10px;
  padding: 10px;
  /*height: 100px;*/
  width: null;
  /*flex: 1;*/
  alignItems: center;
  justifyContent: space-evenly;
  margin-bottom: 10px;
  margin-top: 5px;
  flexDirection: row;
`;

const VisaoVistaCronica = styled.View`
  backgroundColor: #cbd5dc;
  height: 65px;
  width: 65px;
  justifyContent: center;
  alignItems: center;
  border-radius: 10px;
  justifyContent: center;
`;

const VisaoCryogenicaDescritivelDerretida = styled.View`
  justifyContent: center;
  alignItems: center;
`;

const VisaoDeDataTemporalCronioca = styled.View`
  flexDirection: row;
`;

const TextoTemporalHorario = styled.Text`
  font-size: 17px;
  font-weight: 600;
`;

const TextoTemporalData = styled.Text`
  font-size: 17px;
  font-weight: 600;
`;

const AdvancedButton = styled.TouchableOpacity`
  position: absolute;
  right: 10px;
  top: 10px;
`;

const AdvancedText = styled.Text`
  font-size: 12px;
  font-weight: 600;
`;

const WindDirection = styled.Image`
  transform: rotate(${props => props.rotation + 'deg'});
  height: 65%;
  width: 65%;
`;

const TextoChuvoso = styled.Text`
  textAlign: center;
  backgroundColor: #230aaa44;
  fontSize: 13px;
  padding-left: 5px;
  padding-right: 5px;
  width: 70px;
`;

const TextoVentania = styled.Text`
  textAlign: center;
  backgroundColor: #c0c0c077;
  fontSize: 12px;
  margin-top: 5px;
  padding-left: 5px;
  padding-right: 5px;
  width: 70px;
  border-radius: 4px;
`;

const CourtReservImage = styled.Image`
  height: 75px;
  width: 90px;
  resizeMode: stretch;
  borderRadius: 20px;
  position: relative;
  padding: 10px;
  margin-left: 5px;
  margin-right: 10px;
`;

const VisaoImagemReservada = styled.View`
  width: 100%;
  /*margin-top: 5px;*/
  margin-bottom: 5px;
  padding-top: 5px;
  padding-bottom: 10px;
  flexDirection: row;
  alignItems: flex-start;
  backgroundColor: #d0d2d9;
  border: 1px solid #d0d2d9;
  borderRadius: 10px;
`;

const TextoDoNome = styled.Text`
  font-weight: 600;
  font-size: 16px;
  padding-left: 5px;
`;

const DescriptionTexto = styled.Text`
  font-weight: 400;
  font-size: 13px;
  margin-top: 2px;
  padding-left: 7px;
  width: 220px;
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
    VisaoMuitoFlexivel,
    VisaoDeCalorMuitoFria,
    TextoDerretido,
    TextoCongelado,
    ImagemCronica,
    DescricaoCronica,
    VisaoCronica,
    VisaoVistaCronica,
    VisaoCryogenicaDescritivelDerretida,
    VisaoDeDataTemporalCronioca,
    TextoTemporalHorario,
    TextoTemporalData,
    DescriptionTexto,
    TextoDoNome,
    VisaoImagemReservada,
    CourtReservImage,
    VisaoCentralCronica,
    AdvancedButton,
    AdvancedText,
    WindDirection,
    TextoChuvoso,
    TextoVentania
  };
  