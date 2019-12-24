import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import SplashScreen from 'react-native-smart-splash-screen';
import { _retrieveData } from '../../Backend/AsyncStore/AsyncFunc';
import { connectFirebase } from '../../Backend/Connection/FirebaseConnection';

export default class AuthLoadingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }
  componentDidMount = async () => {
    if (Platform.OS === 'android') {
      SplashScreen.close({
        animationType: SplashScreen.animationType.scale,
        duration: 850,
        delay: 500,
      });
    }
    this.props.navigation.navigate('Animation');

  };

  render() {
    return <View style={styles.container}>
    </View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
});
