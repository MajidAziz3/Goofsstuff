import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  Image,
  TextInput,
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
import validator from 'validator';
import { signinUser } from '../../Backend/Authentication/SigninUser';

///Login 5th Screen
const uri = 'https://facebook.github.io/react-native/docs/assets/favicon.png';

let emailInput = null;
let passwordInput = null;
class Login extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  chackValidation = async () => {
    const {email, password} = this.state;
    if (!validator.isEmail(email)) {
      emailInput.focus();
      return ;
    }
    if (password === '') {
      passwordInput.focus();
      return;
    }
    await signinUser(email, password).then(result => {
      if (result == undefined) {
        this.props.navigation.navigate('App');
      } else {
        this.props.navigation.navigate('App');
      }
    });
  };

  render() {
    const {email, password} = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="#32cd32" barStyle="light-content" />
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
              top: 20,
            }}>
            <Image
              source={require('../../Assets/goodstuff.png')}
              style={{height: '80%', width: '100%'}}
            />
          </View>
          <View
            style={{
              top: 30,
              backgroundColor: 'white',
              height: '40%',
              width: '90%',
              alignSelf: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: responsiveFontSize(4), fontWeight: 'bold'}}>
              Login
            </Text>
            <Text
              style={{
                marginTop: 5,
                fontSize: responsiveFontSize(2),
                fontWeight: '900',
                color: '#6d6b6b',
              }}>
              Please sign in to continue
            </Text>
          </View>
        </View>

        <View
          style={{
            backgroundColor: 'white',
            height: responsiveHeight(40),
            width: responsiveWidth(90),
            alignSelf: 'center',
            top: 40,
          }}>
          <View
            style={{
              margin: 5,
              height: '20%',
              backgroundColor: 'white',
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.5,
              shadowRadius: 2,
              elevation: 10,
            }}>
            <Text
              style={{
                marginTop: 5,
                left: 50,
                fontSize: responsiveFontSize(1.5),
                fontWeight: 'bold',
                color: '#858282',
              }}>
              EMAIL
            </Text>
            <View
              style={{
                backgroundColor: 'white',
                height: '70%',
                width: '100%',
                alignSelf: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  backgroundColor: 'white',
                  width: '10%',
                  justifyContent: 'center',
                  alignItems: 'flex-end',
                }}>
                <FIcon name="envelope-o" size={20} color="black" />
              </View>
              <View
                style={{
                  backgroundColor: 'white',
                  width: '87%',
                  height: '90%',
                  justifyContent: 'center',
                }}>
                <TextInput
                  ref={email => {
                    emailInput = email;
                  }}
                  value={email}
                  placeholder="user123@gmail.com"
                  style={{
                    backgroundColor: 'white',
                    height: '100%',
                    padding: 5,
                    fontSize: responsiveFontSize(1.6),
                    color: 'black'
                  }}
                  onChangeText={email => this.setState({email})}
                  require
                />
              </View>
            </View>
          </View>

          <View
            style={{
              height: '20%',
              margin: 5,
              top: 20,
              backgroundColor: 'white',
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.5,
              shadowRadius: 2,
              elevation: 5,
              flexDirection: 'row',
              justifyContent: 'space-evenly',
            }}>
            <View
              style={{
                backgroundColor: 'white',
                width: '10%',
                justifyContent: 'center',
                alignItems: 'flex-end',
              }}>
              <AIcon name="lock1" size={24} color="black" />
            </View>
            <View
              style={{backgroundColor: 'white', width: '60%', height: '100%'}}>
              <Input
                ref={password => {
                  passwordInput = password;
                }}
                value={password}
                placeholder="PASSWORD"
                style={{fontSize: responsiveFontSize(1.8)}}
                secureTextEntry={true}
                onChangeText={password => this.setState({password})}
                require
              />
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: 'white',
                width: '20%',
                justifyContent: 'center',
                alignItems: 'flex-end',
              }}>
              <Text
                style={{
                  fontSize: responsiveFontSize(1.6),
                  fontWeight: 'bold',
                  color: '#32cd32',
                }}>
                FORGOT
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              paddingEnd: 15,
              top: 50,
              backgroundColor: 'white',
              height: '30%',
              justifyContent: 'center',
              alignItems: 'flex-end',
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: '#ffa500',
                width: 140,
                height: '65%',
                borderRadius: 40,
                marginBottom: 20,
              }}
              onPress={() => this.chackValidation()}>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1.0, y: 1.0}}
                colors={[
                  'rgb(53, 203, 53)',
                  'rgb(64, 200, 64)',
                  'rgb(78,198,78)',
                ]}
                style={{
                  backgroundColor: '#ffa500',
                  width: 140,
                  height: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 40,
                  flexDirection: 'row',
                }}>
                <Text
                  style={{fontSize: responsiveFontSize(2.6), color: 'white'}}>
                  Login
                </Text>
                <AIcon
                  style={{marginLeft: 20}}
                  name="arrowright"
                  size={20}
                  color="white"
                />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            top: 25,
            backgroundColor: 'white',
            height: responsiveHeight(20),
            width: responsiveWidth(90),
            alignSelf: 'center',
          }}></View>
        <View
          style={{
            backgroundColor: 'white',
            height: responsiveHeight(5),
            width: responsiveWidth(90),
            alignSelf: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <Text style={{fontSize: responsiveFontSize(1.8), color: '#32cd32'}}>
            Don't have an account?
            <Text
              onPress={() => this.props.navigation.navigate('Signup')}
              style={{
                fontSize: responsiveFontSize(2),
                fontWeight: 'bold',
                color: '#32cd32',
              }}>
              {' '}
              Register
            </Text>
          </Text>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: 'white',
  },
});
export default Login;
