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
  justifyContent: space-evenly;
  backgroundColor: #5b89ce;
  flexDirection: row;
  height: 60px;
  width: 100%;
`;

const Footer = styled.View`
  alignItems: center;
  flexDirection: row;
  justifyContent: space-evenly;
  backgroundColor: #4479c8;
  height: 70px;
  width: 100%;
`;

const Circle = styled.View`
  width: 48;
  height: 48;
  borderRadius: 24;
  justifyContent: center;
  alignItems: center;
  backgroundColor: #304dad;
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


export {
    Container,
    NavBar,
    Footer,
    Circle,
    Left,
    Logo
  };
  