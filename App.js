import React from 'react';
import { StyleSheet, Text, View, Animated, Dimensions, Image, PanResponder, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Drawer, Container, Header, Content,Button } from 'native-base';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
const DownImages = [
  {id: "1", name:"House", uri: require('./assets/icon.png')},
 ]

 class SideBar extends React.Component {
  render(){
      return (
        <View style={[ styles.container, { backgroundColor: '#fff', flex: 1 } ]}>
          <View style={{ top: 40, height: 100 }}>
            <View style={{ flexDirection: 'row', height: 20}}>  
              <Image source={DownImages[0].uri} style={{
                  /*flex: 1,*/
                  left: 10,
                  height: 60,
                  width: 60,
                  resizeMode: "contain",
                  borderRadius: 20
                }}></Image>
              <Text  style={{ color: 'black', fontSize: 20, fontWeight: "800", left: 20}}>Hello</Text>
            </View>
            <Text  style={{ color: 'black', fontSize: 15, fontWeight: "500", left: 80}}>Atletica</Text>
          </View>
           {/* Hr */}
          <View
            style={{
              borderWidth: 0.5,
              borderColor:'black',
              margin:10,
            }}
          />
          <Text style={{ left: 10 }}>
            <Icon name="rocket" size={30} color="#900" />
            Conteúdo side bar
          </Text>
        </View>
      );
    } 
  };

export default class App extends React.Component {
  closeDrawer = () => {
    this.drawer._root.close()
};

openDrawer = () => {
    this.drawer._root.open()
};  
  render(){
    return (
      <Drawer
        ref={(ref) => { this.drawer = ref; }}
        content={<SideBar navigator={this.navigator} />}
        onClose={() => this.closeDrawer()}>
        {/* navBar */}
        <Container>
          <Animated.View style={[
            {
              height: 60,
              width: SCREEN_WIDTH,
              padding: 10,
              backgroundColor: '#3D4490',
              borderBottomWidth:4,
              borderColor: "#5994FF",
            }
          ]}>  
            <Animated.View style={{ padding: 10, flexDirection: 'row' }}>
              <Icon onPress={() => this.openDrawer()} name="bars" size={30} color="#fff" />
              <Text style={{ color: 'black', fontSize: 20, fontWeight: "800", left: 10}}>Hello!</Text>
            </Animated.View>
          </Animated.View>

          {/* Meio */}
          <Animated.View style={{ flex: 1, height: SCREEN_HEIGHT - 120, width: SCREEN_WIDTH - 20, left: 10, top: 10}}>
            {/*<Text>Meio!</Text>*/}
            <View style={{ width: SCREEN_WIDTH - 20, borderRadius: 20, backgroundColor: '#8090a0'}}>
              <Image
                  style={{
                    /*flex: 1,*/
                    height: 200,
                    width: SCREEN_WIDTH - 20,
                    resizeMode: "cover",
                    borderRadius: 20
                  }}
                  source={DownImages[0].uri}
              />
              <Text style={{ top: 10, paddingBottom: 10, paddingLeft:10 }}>
                Quadra 1 Aberta
              </Text>
              <Text style={{ paddingBottom: 10, paddingTop: 10, paddingLeft:10 }}>
                Status: disponivel <Icon name="check" size={15} color="#000" />
              </Text>
            </View>
          </Animated.View>
        {/*Rodape */}
        <Animated.View style={[
          {
            height: 60,
            width: SCREEN_WIDTH,
            padding: 10,
            backgroundColor: '#3D4490',
            //position: 'absolute'          
          }
        ]}>
          <Animated.View style={{ bottom: 10, top: 5, flexDirection: 'row', alignItems: 'center'  }}>
             <Icon onPress={() => this.openDrawer()} name="list" size={30} color="#fff" style={{left: (SCREEN_WIDTH / 5) - 15, justifyContent: 'center'}}/>
             <Icon onPress={() => this.openDrawer()} name="home" size={30} color="#fff" style={{left: (2 * (SCREEN_WIDTH / 5)) - 15, justifyContent: 'center'}}/>
             <Icon onPress={() => this.openDrawer()} name="plus-square-o" size={30} color="#fff" style={{left: (3 * (SCREEN_WIDTH / 5)) - 15, justifyContent: 'center'}}/>
             {/* <Icon onPress={() => this.openDrawer()} name="home" size={30} color="#fff" style={{left: 4 * (SCREEN_WIDTH / 10)}}/>
             <Icon onPress={() => this.openDrawer()} name="home" size={30} color="#fff" style={{left: 5 * (SCREEN_WIDTH / 10)}}/> */}
          </Animated.View>
        </Animated.View>
        </Container>
      </Drawer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    /*justifyContent: 'center',
    alignItems: 'left',*/
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,  
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  Pad10: {
    padding: 10
  },
});

