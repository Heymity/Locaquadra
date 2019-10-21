import React from 'react';
import { StyleSheet, Text, View, Animated, Dimensions, Image, PanResponder } from 'react-native';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
const DownImages = [
  {id: "1", name:"House", uri: require('./assets/round_home_white_18dp.png')},
 ]
 const normalColor = 'red';
 const selectedColor = 'black';

export default class App extends React.Component {
  render(){
    return (
      <View style={{ flex: 1 }}>
        <Animated.View style={[
          {
            height: 60,
            width: SCREEN_WIDTH,
            padding: 10,
            backgroundColor: '#3D4490',
            borderBottomWidth:4,
            borderColor: "#5994FF",
            //position: 'absolute'
          }
        ]}>
          <Animated.View style={{ padding: 10 }}>
            <Text style={{ color: 'green', fontSize: 20, fontWeight: "800"}}>Hello!</Text>
          </Animated.View>
        </Animated.View>
        <Animated.View style={{ flex: 1 }}>

        </Animated.View>
        <Animated.View style={[
          {
            height: 60,
            width: SCREEN_WIDTH,
            padding: 10,
            backgroundColor: '#3D4490',
            //position: 'absolute'          
          }
        ]}>
          <Animated.View style={{ bottom: 10, top: 5 }}>
            <Image source={DownImages[0].uri} style={{
               //flex: 1,
               height: 35,
               width: 35,
               resizeMode: "cover",
               tintColor: selectedColor,
               borderRadius: 15,
               backgroundColor: 'white'
             }}></Image>
          </Animated.View>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
