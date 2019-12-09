import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  Image,
  TextInput,
  ScrollView,
  SafeAreaView
} from 'react-native';
import {Left, Thumbnail, Input} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
// import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ETIcon from 'react-native-vector-icons/Entypo';
import EIcon from 'react-native-vector-icons/EvilIcons';
import AIcon from 'react-native-vector-icons/AntDesign';
import FIcon from 'react-native-vector-icons/FontAwesome';

import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

class MainAuth extends Component {
  static navigationOptions = {
    header: null,
  };
  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <ScrollView style={{flex: 1}}>
          <View
            style={{
              marginHorizontal: 10,
            }}>
            <View
              style={{
                backgroundColor: 'white',
                height: responsiveHeight(30),
                width: responsiveWidth(100),
                alignSelf: 'center',
                justifyContent: 'space-around',
              }}>
              <View
                style={{
                  height: '45%',
                  width: '100%',
                  backgroundColor: 'white',
                  alignSelf: 'center',
                }}>
                <Image
                  source={require('../../Assets/goodstuff.png')}
                  style={{height: '80%', width: '100%'}}
                />
              </View>
            </View>
            <View
              style={{
                flex: 1,
                marginLeft: 5,
                marginRight: 5,
              }}>
              <Text
                style={{
                  color: '#000',
                  fontWeight: 'bold',
                }}>
                The Good Stuff App is a family and community centered social
                media mobile application that has community inspirational
                speakers, daily positive push notifications, community job
                posts, constructive social groups, personal and family profiles.
                The features on the app serve to inspire and encourage users to
                improve their mental and physical health, community involvement,
                relationships and focus on the good stuff in life.
              </Text>
              <Text
                style={{
                  color: 'rgb(53, 203, 53)',
                  fontSize: responsiveFontSize(2.5),
                  alignSelf: 'flex-start',
                  borderBottomWidth: 1,
                  borderBottomColor: 'rgb(53, 203, 53)',
                  marginBottom: 20,
                  fontWeight: 'bold',
                }}>
                Why
              </Text>
              <Text
                style={{
                  color: '#000',
                  fontWeight: 'bold',
                  marginBottom: 15,
                }}>
                In this society, we are inundated with negative images, videos
                and “news”. We feel that currently there is void of productive
                information and social media platforms that uplift and encourage
                users, inspiring them to do good for themselves and others; The
                Good Stuff App is here to fill that void.
              </Text>
              <View
                style={{
                  marginBottom: 35,
                }}>
                <View
                  style={{
                    right: 0,
                    position: 'absolute',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate('House');
                    }}>
                    <Text
                      style={{
                        color: 'rgb(53, 203, 53)',
                        fontWeight: 'bold',
                        marginBottom: 15,
                      }}>
                      Bulid The House...
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
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
              <TouchableOpacity
                style={{
                  marginBottom: 35,
                }}
                onPress={() => {
                  this.props.navigation.navigate('TermsandCondition');
                }}>
                <Text
                  style={{
                    color: '#000',
                    fontWeight: 'bold',
                    alignSelf: 'center',
                    fontSize: 20,
                  }}>
                  Read All Terms And Conditions Here
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: 'rgb(53, 203, 53)',
                    width: responsiveWidth(35),
                    height: responsiveHeight(8),
                    borderRadius: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 30,
                  }}
                  onPress={() => this.props.navigation.navigate('Signup')}>
                  <Text
                    style={{
                      fontSize: responsiveFontSize(2.6),
                      alignSelf: 'center',
                      color: 'white',
                      marginright: 10,
                    }}>
                    SignUp
                    <AIcon name="arrowright" size={20} color="white" />
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default MainAuth;
