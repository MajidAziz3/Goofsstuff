
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicon from 'react-native-vector-icons/Ionicons'
export default class Aboutus extends Component {
  render() {
    return (

      <View style={styles.container}>
        <Ionicon name="ios-menu" size={35} color={'#32cd32'} onPress={() => this.props.navigation.openDrawer()} style={styles.menu} />

        <View style={{ backgroundColor: 'white', height: responsiveHeight(20), width: responsiveWidth(100), alignSelf: 'center', justifyContent: 'space-around' }}>
          <View style={styles.imageContainer}>
            <Image source={require('../../Assets/goodstuff.png')} style={styles.imageStyle} />
          </View>

        </View>

        <View style={styles.missionContainer}>
          <View style={styles.missionHeadingContainer}>
            <Text style={styles.missionTextStyle} >
              Mission
              </Text>
            <View style={{ height: 1, width: 74, backgroundColor: 'rgb(53, 203, 53)' }}></View>
          </View>

          <View style={styles.missionTextContainer}>
            <Text style={styles.textStyle} >
              In this society we are inundated with. With this app we hope to  --- we are still working on this

              </Text>

          </View>

        </View>

        <View style={styles.whyContainer}>
          <View style={styles.missionHeadingContainer}>
            <Text style={styles.missionTextStyle} >
              Why
              </Text>
            <View style={{ height: 1, width: 40, backgroundColor: 'rgb(53, 203, 53)' }}></View>
          </View>

          <View style={[styles.missionTextContainer]}>
            <Text style={styles.textStyle1} >
              In this society we are inundated with. With this app we hope to  --- we are still working on this
              </Text>


          </View>
          <TouchableOpacity style={{backgroundColor:'white',height:40,width:120,position:'absolute',justifyContent:'center',alignSelf:'flex-end',top:responsiveHeight(14),right:10}} 
          onPress={() => this.props.navigation.navigate('BuildTheHouse')}
          >
          <Text style={{fontSize:responsiveFontSize(1.6),fontWeight:'bold',color:'#000'}} >
          Build The House…

              </Text>
            </TouchableOpacity>
        </View>

        <View style={styles.ruleContainer}>
          <View style={styles.missionHeadingContainer}>
            <Text style={styles.missionTextStyle} >
              Rules
              </Text>

          </View>
          <View style={styles.ruleInnerParentContainer}>

            <View style={styles.rulechile1}>
              <Entypo name="dot-single" size={25} color='#000' />
              <Text style={styles.textStyle1} >
                No Politics
              </Text>
            </View>

            <View style={styles.rulechile1}>
              <Entypo name="dot-single" size={25} color='#000' />
              <Text style={styles.textStyle1} >
                No Negativity
              </Text>
            </View>

            <View style={styles.rulechile2}>
              <Entypo name="dot-single" size={25} color='#000' />
              <Text style={styles.textStyle1} >
                No Negative Race, Religion, Sexual Orientation Talk
              </Text>
            </View>


          </View>
        </View>
        <TouchableOpacity style={styles.rulechile3}>

          <Text style={{ fontSize: responsiveFontSize(1.8), fontWeight: 'bold', color: '#000', textAlign: 'center' }} >
            All Terms & Conditions Here(link)

</Text>
        </TouchableOpacity>

        <View style={styles.footerContainer}>
          <Text style={styles.footerTextStyle}>
            Slogan Slogan Slogan Slogan
        </Text>
        </View>

      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
  },
  menu: {

    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: responsiveHeight(1.8),
    marginLeft: '4%',
   

  },
  imageContainer: {
    height: '65%', width: '90%',
    backgroundColor: 'white',
    alignSelf: 'center',
    top: 0
  },
  imageStyle: {
    height: '100%',
    width: "100%"
  },
  missionContainer: {
    height: responsiveHeight(17),
    backgroundColor: 'white',
    justifyContent: 'space-between'
  },
  missionHeadingContainer: {
    height: '30%',
    justifyContent: 'center',
    paddingHorizontal: 20
  },
  missionTextStyle: {
    fontSize: responsiveFontSize(2.5),
    color: 'rgb(53, 203, 53)',
    fontWeight: 'bold'
  },
  missionTextContainer: {
    height: '65%',
    paddingHorizontal: 20,
    paddingEnd: 30
  },
  textStyle: {
    fontSize: responsiveFontSize(2.3),
    color: '#2d2c2c',
  },
  textStyle1: {
    fontSize: responsiveFontSize(2.3),
    color: '#2d2c2c',

  },
  footerContainer: {
    height: responsiveHeight(8),
    backgroundColor: 'white',
    // justifyContent: 'center',
    top: 0,
    alignItems: 'center'
  },
  footerTextStyle: {
    fontWeight: 'bold',
    fontSize: responsiveFontSize(2.6),
    color: 'rgb(53, 203, 53)',
  },
  whyContainer: {
    height: responsiveHeight(20),
    backgroundColor: 'white',
    justifyContent: 'space-between'
  },

  ruleContainer: {
    height: responsiveHeight(23),
    backgroundColor: 'white'
  },
  ruleInnerParentContainer:
  {
    backgroundColor: 'white',
    height: '70%'
  },
  rulechile1: {
    height: "20%",
    flexDirection: 'row',
    width: '95%',
    alignSelf: 'flex-end'
  },
  rulechile2: {
    height: "35%",
    flexDirection: 'row', width: '95%',
    alignSelf: 'flex-end'
  },
  rulechile3: {

    justifyContent: 'center'
  }

});
