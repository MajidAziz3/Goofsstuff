import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image} from 'react-native';
import FastImage from 'react-native-fast-image';
import img from '../../Assets/animation.gif';
import {_retrieveData} from '../../Backend/AsyncStore/AsyncFunc';
import {connectFirebase} from '../../Backend/Connection/FirebaseConnection';
import SplashScreen from 'react-native-smart-splash-screen';

export default class Animation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flag: false,
    };
  }

  static navigationOptions = {
    header: null,
  };
  componentDidMount = async () => {
    await _retrieveData('user').then(user =>
      this.setState({
        value: user,
      }),
    );

    connectFirebase();

    if (Platform.OS === 'android') {
      SplashScreen.close({
        animationType: SplashScreen.animationType.scale,
        duration: 850,
        delay: 500,
      });
    }

    if (this.state.value == '' || this.state.value == undefined) {
      this.setState({flag: true});
      setTimeout(() => {
        this.props.navigation.navigate('MainAuth');
      }, 8000);
    } else {
      this.setState({flag: false});
      this.props.navigation.navigate('App');
    }
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.flag ? <Image source={img} /> : <View />}
      </View>
    );
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
