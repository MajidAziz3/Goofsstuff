
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, SafeAreaView, Image } from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import Ionicon from 'react-native-vector-icons/Ionicons';


export default class CommunityGuide extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={{ marginBottom: 10 }}>
          <Text style={styles.welcome}>How It Works?</Text>
          <Ionicon
            name="ios-menu"
            size={35}
            color={'#32cd32'}
            onPress={() => this.props.navigation.openDrawer()}
            style={styles.menu}
          />
        </View>
        <View style={{ marginHorizontal: 10 }}>


          <Text
            style={{
              color: 'rgb(53, 203, 53)',
              fontSize: responsiveFontSize(2.5),
              alignSelf: 'flex-start',
              borderBottomWidth: 1,
              borderBottomColor: 'rgb(53, 203, 53)',
              marginBottom: 10,
              fontWeight: 'bold',
            }}>
            Community Guidelines
              </Text>
          <Text
            style={{
              color: '#000',
              fontWeight: 'bold',
              marginBottom: 10,
            }}>
            We’ve created a safe, positive space for families and
            communities to flourish, this is why these community guidelines
            have been established.
              </Text>

          <Text
            style={{
              color: '#000',
              fontWeight: 'bold',
            }}>
            - No Politics
              </Text>
          <Text
            style={{
              color: '#000',
              fontWeight: 'bold',
            }}>
            - No Negativity
              </Text>
          <Text
            style={{
              color: '#000',
              fontWeight: 'bold',
            }}>
            - No Negative Race, Religion, Sexual Orientation Talk
              </Text>
          <Text
            style={{
              color: '#000',
              fontWeight: 'bold',
              marginBottom: 10,
            }}>
            - No Sexual Images… Remember This Is A Family App
              </Text>
        </View>

      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: responsiveWidth(100),
    height: responsiveHeight(100),
  },
  welcome: {
    fontSize: responsiveFontSize(3.8),
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 7,
  },
  menu: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: responsiveHeight(1.8),
    marginLeft: '4%',
    position: 'absolute',
  },
  menu1: {
    width: 10,
    height: 50,
    borderRadius: 42,
    marginTop: responsiveHeight(2.2),
    marginLeft: '90%',
    position: 'absolute',
  },
  container1: {
    marginTop: responsiveHeight(8.5),
  },
});
