import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import SplashScreen from 'react-native-smart-splash-screen';
import { _retrieveData } from '../../Backend/AsyncStore/AsyncFunc';
import { connectFirebase } from '../../Backend/Connection/FirebaseConnection';
import firebase2 from 'react-native-firebase'

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
    this.checkPermission();
    this.messageListener();
    this.props.navigation.navigate('Animation');

  };

  checkPermission = async () => {
    const enabled = await firebase2.messaging().hasPermission();
    if (enabled) {
      this.getFcmToken();
    } else {
      this.requestPermission();
    }
  }
  getFcmToken = async () => {
    const fcmToken = await firebase2.messaging().getToken();
    if (fcmToken) {
      console.log(fcmToken);
      this.showAlert('Your Firebase Token is:', fcmToken);
      await _storeData('fcmToken', fcmToken);
      // this.setState({fcmToken})
    } else {
      this.showAlert('Failed', 'No token received');
    }
  }
  requestPermission = async () => {
    try {
      await firebase2.messaging().requestPermission();
      // User has authorised
    } catch (error) {
      // User has rejected permissions
    }
  }
  messageListener = async () => {
    this.notificationListener = firebase2.notifications().onNotification((notification) => {
      const { title, body } = notification;
      this.showAlert(title, body);
    });

    this.notificationOpenedListener = firebase2.notifications().onNotificationOpened((notificationOpen) => {
      const { title, body } = notificationOpen.notification;
      this.showAlert(title, body);
    });

    const notificationOpen = await firebase2.notifications().getInitialNotification();
    if (notificationOpen) {
      const { title, body } = notificationOpen.notification;
      this.showAlert(title, body);
    }

    this.messageListener = firebase2.messaging().onMessage((message) => {
      console.log(JSON.stringify(message));
    });
  }
  showAlert = (title, message) => {
    Alert.alert(
      title,
      message,
      [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false },
    );
    // this.dropDownAlertRef.alertWithType('error','Error', message);
  }
  

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
