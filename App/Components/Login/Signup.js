import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  FlatList,
  TextInput,
  BackHandler,
  RecyclerViewBackedScrollView,
  SafeAreaView
} from 'react-native';
import {Left, Thumbnail, Input} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
// import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ETIcon from 'react-native-vector-icons/Entypo';
import EIcon from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AIcon from 'react-native-vector-icons/AntDesign';
import FIcon from 'react-native-vector-icons/FontAwesome';
import validator from 'validator';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {signUp} from '../../Backend/Auths';
import CheckBox from 'react-native-check-box';
import DateTimePicker from 'react-native-modal-datetime-picker';

///Family Profile  5th Screen
const uri = 'https://facebook.github.io/react-native/docs/assets/favicon.png';

let nameInput = null;
let emailInput = null;
let locationInput = null;
let bioInput = null;
let passwordInput = null;
let conformed_passwordInput = null;

class Signup extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      full_name: '',
      email: '',
      password: '',
      Date_Of_Birth: '',
      conformed_password: '',
      friends: [],
      pending_friends: [],
      favorite: [],
      family_member: [],
      isChecked: false,
      isDateTimePickerVisible: false,
      location: '',
      bio: '',
      groups: [],
      vission_board: null,
      likes: [],
      profile_picture: 'https://cdn2.iconfinder.com/data/icons/website-icons/512/User_Avatar-512.png',
      gallery: [],
    };
  }

  handleDatePicked = () => {
    this.setState({
      isDateTimePickerVisible: !this.state.isDateTimePickerVisible,
    });
  };

  check_Validation = async () => {
    const {
      full_name,
      email,
      bio,
      location,
      likes,
      profile_picture,
      gallery,
      groups,
      vission_board,
      password,
      Date_Of_Birth,
      conformed_password,
      friends,
      pending_friends,
      favorite,
      family_member,
    } = this.state;
    if (validator.isEmpty(full_name)) {
      nameInput.focus();
      return;
    }
    if (!validator.isEmail(email)) {
      emailInput.focus();
      return;
    }
    if (password === '') {
      passwordInput.focus();
      return;
    }
    // if (Date_Of_Birth === '') {
    //   alert('Please enter Date Of Birth');
    //   return;
    // }

    if (validator.isEmpty(conformed_password)) {
      conformed_passwordInput.focus();
      return;
    }
    if (conformed_password !== password) {
      alert('Conformed Password not Matched');
      return;
    }

    if (location === '') {
      locationInput.focus();
      return;
    }

    if (bio === '') {
      bioInput.focus();
      return;
    }

    await signUp(
      full_name,
      email,
      bio,
      location,
      likes,
      profile_picture,
      gallery,
      groups,
      vission_board,
      password,
      Date_Of_Birth,
      conformed_password,
      friends,
      pending_friends,
      favorite,
      family_member,
    ).then(() => {
      this.props.navigation.navigate('Login');
    });
  };

  render() {
    const {
      full_name,
      email,
      bio,
      location,
      likes,
      profile_picture,
      gallery,
      groups,
      vission_board,
      password,
      Date_Of_Birth,
      conformed_password,
      friends,
      pending_friends,
      favorite,
      family_member,
    } = this.state;
    return (
      <SafeAreaView style={{flex: 1}}>
        <ScrollView>
          <View
            style={{
              backgroundColor: 'white',
              height: responsiveHeight(15),
              width: responsiveWidth(100),
              alignSelf: 'center',
              justifyContent: 'space-between',
            }}>
            {/* <View
              style={{
                top: 25,
                height: '60%',
                width: '100%',
                backgroundColor: 'white',
                alignSelf: 'center',
              }}>
              <Image
                source={require('../../Assets/goodstuff.png')}
                style={{height: '100%', width: '100%'}}
              />
            </View> */}
            

            <View
              style={{
                top: 30,
                backgroundColor: 'white',
                height: '30%',
                width: '90%',
                alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{fontSize: responsiveFontSize(4), fontWeight: 'bold'}}>
                Create Account
              </Text>
            </View>
          </View>
          <View
            style={{
              backgroundColor: 'white',
              height: responsiveHeight(10),
              width: responsiveWidth(85),
              alignSelf: 'center',
              justifyContent: 'center',
              // top: 30,
            }}>
            <View
              style={{
                height: '70%',
                alignSelf: 'center',
                backgroundColor: 'white',
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.5,
                shadowRadius: 2,
                elevation: 15,
              }}>
              <Text
                style={{
                  marginTop: 5,
                  left: 50,
                  fontSize: responsiveFontSize(1.5),
                  fontWeight: 'bold',
                  color: '#858282',
                }}>
                FULL NAME
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
                  <Ionicons name="md-person" size={20} color="black" />
                </View>
                <View
                  style={{
                    backgroundColor: 'white',
                    width: '87%',
                    height: '100%',
                  }}>
                  <Input
                    ref={full_name => {
                      nameInput = full_name;
                    }}
                    value={full_name}
                    placeholder="Full Name"
                    style={{padding: 5, fontWeight: 'bold'}}
                    onChangeText={full_name => this.setState({full_name})}
                  />
                </View>
              </View>
            </View>
          </View>

          <View
            style={{
              top: 10,
              backgroundColor: 'white',
              height: responsiveHeight(10),
              width: responsiveWidth(90),
              alignSelf: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                height: '100%',
                width: '100%',
                backgroundColor: 'white',
                padding: 5,
                flexDirection: 'row',
                alignSelf: 'center',
              }}>
              <View
                style={{
                  borderBottomWidth: StyleSheet.hairlineWidth,
                  backgroundColor: 'white',
                  width: '10%',
                  height: '90%',
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                }}>
                <FIcon name="envelope-o" size={24} color="black" />
              </View>
              <View
                style={{
                  borderBottomWidth: StyleSheet.hairlineWidth,
                  paddingHorizontal: 5,
                  backgroundColor: 'white',
                  height: '90%',
                  width: '90%',
                }}>
                <Input
                  ref={email => {
                    emailInput = email;
                  }}
                  value={email}
                  placeholder="EMAIL"
                  style={{fontSize: responsiveFontSize(1.8)}}
                  onChangeText={email => this.setState({email})}
                />
              </View>
            </View>
          </View>

          <View
            style={{
              top: 10,
              backgroundColor: 'white',
              height: responsiveHeight(10),
              width: responsiveWidth(90),
              alignSelf: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                height: '100%',
                width: '100%',
                backgroundColor: 'white',
                padding: 5,
                flexDirection: 'row',
                alignSelf: 'center',
              }}>
              <View
                style={{
                  borderBottomWidth: StyleSheet.hairlineWidth,
                  backgroundColor: 'white',
                  width: '10%',
                  height: '90%',
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                }}>
                <ETIcon name="location-pin" size={24} color="black" />
              </View>
              <View
                style={{
                  borderBottomWidth: StyleSheet.hairlineWidth,
                  paddingHorizontal: 5,
                  backgroundColor: 'white',
                  height: '90%',
                  width: '90%',
                }}>
                <Input
                  ref={location => {
                    locationInput = location;
                  }}
                  value={location}
                  placeholder="CURRENT LOCATION"
                  style={{fontSize: responsiveFontSize(1.8)}}
                  onChangeText={location => this.setState({location})}
                />
              </View>
            </View>
          </View>

          <View
            style={{
              top: 10,
              backgroundColor: 'white',
              height: responsiveHeight(10),
              width: responsiveWidth(90),
              alignSelf: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                height: '100%',
                width: '100%',
                backgroundColor: 'white',
                padding: 5,
                flexDirection: 'row',
                alignSelf: 'center',
              }}>
              <View
                style={{
                  borderBottomWidth: StyleSheet.hairlineWidth,
                  backgroundColor: 'white',
                  width: '10%',
                  height: '90%',
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                }}>
                <ETIcon name="open-book" size={24} color="black" />
              </View>
              <View
                style={{
                  borderBottomWidth: StyleSheet.hairlineWidth,
                  paddingHorizontal: 5,
                  backgroundColor: 'white',
                  height: '90%',
                  width: '90%',
                }}>
                <Input
                  ref={bio => {
                    bioInput = bio;
                  }}
                  value={bio}
                  placeholder="BIO"
                  style={{fontSize: responsiveFontSize(1.8)}}
                  onChangeText={bio => this.setState({bio})}
                />
              </View>
            </View>
          </View>

          <TouchableOpacity
            style={{
              top: 10,
              backgroundColor: 'white',
              height: responsiveHeight(10),
              width: responsiveWidth(90),
              alignSelf: 'center',
              justifyContent: 'center',
            }}
            onPress={() => {
              this.setState({isDateTimePickerVisible: true});
            }}>
            <View
              style={{
                height: '100%',
                width: '100%',
                backgroundColor: 'white',
                padding: 5,
                flexDirection: 'row',
                alignSelf: 'center',
              }}>
              <View
                style={{
                  borderBottomWidth: StyleSheet.hairlineWidth,
                  backgroundColor: 'white',
                  width: '10%',
                  height: '90%',
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                }}>
                <FIcon name="calendar" size={24} color="black" />
              </View>

              <View
                style={{
                  borderBottomWidth: StyleSheet.hairlineWidth,
                  paddingHorizontal: 5,
                  backgroundColor: 'white',
                  height: '90%',
                  width: '90%',
                }}>
                <Text
                  style={{
                    marginTop: 15,
                    marginLeft: 10,
                  }}>
                  {Date_Of_Birth === '' ? (
                    <Text>DATE_OF_BIRTH</Text>
                  ) : (
                    <Text>{Date_Of_Birth}</Text>
                  )}
                </Text>
                <DateTimePicker
                  mode="date"
                  format="YYYY-MM-DD"
                  isVisible={this.state.isDateTimePickerVisible}
                  onConfirm={this.handleDatePicked}
                  onCancel={this.handleDatePicked}
                  onDateChange={Date_Of_Birth => {
                    this.setState({Date_Of_Birth});
                  }}
                />
              </View>
            </View>
          </TouchableOpacity>

          <View
            style={{
              top: 10,
              backgroundColor: 'white',
              height: responsiveHeight(10),
              width: responsiveWidth(90),
              alignSelf: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                height: '100%',
                width: '100%',
                backgroundColor: 'white',
                padding: 5,
                flexDirection: 'row',
                alignSelf: 'center',
              }}>
              <View
                style={{
                  borderBottomWidth: StyleSheet.hairlineWidth,
                  backgroundColor: 'white',
                  width: '10%',
                  height: '90%',
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                }}>
                <AIcon name="lock1" size={24} color="black" />
              </View>
              <View
                style={{
                  borderBottomWidth: StyleSheet.hairlineWidth,
                  paddingHorizontal: 5,
                  backgroundColor: 'white',
                  height: '90%',
                  width: '90%',
                }}>
                <Input
                  ref={password => {
                    passwordInput = password;
                  }}
                  value={password}
                  secureTextEntry={true}
                  placeholder="PASSWORD"
                  style={{fontSize: responsiveFontSize(1.5)}}
                  onChangeText={password => this.setState({password})}
                />
              </View>
            </View>
          </View>
          <View
            style={{
              top: 10,
              backgroundColor: 'white',
              height: responsiveHeight(10),
              width: responsiveWidth(90),
              alignSelf: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                height: '100%',
                width: '100%',
                backgroundColor: 'white',
                padding: 5,
                flexDirection: 'row',
                alignSelf: 'center',
              }}>
              <View
                style={{
                  borderBottomWidth: StyleSheet.hairlineWidth,
                  backgroundColor: 'white',
                  width: '10%',
                  height: '90%',
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                }}>
                <AIcon name="lock1" size={24} color="black" />
              </View>
              <View
                style={{
                  borderBottomWidth: StyleSheet.hairlineWidth,
                  paddingHorizontal: 5,
                  backgroundColor: 'white',
                  height: '90%',
                  width: '90%',
                }}>
                <Input
                  // ref={conformed_password => {
                  //   conformed_passwordInput = conformed_password;
                  // }}
                  value={conformed_password}
                  secureTextEntry={true}
                  placeholder="CONFIRM PASSWORD"
                  style={{fontSize: responsiveFontSize(1.5)}}
                  onChangeText={conformed_password =>
                    this.setState({conformed_password})
                  }
                />
              </View>
            </View>
          </View>

          <View style={{flexDirection: 'row'}}>
            <CheckBox
              style={{
                top: responsiveHeight(4),
                left: 10,
              }}
              onClick={() => {
                this.setState({
                  isChecked: !this.state.isChecked,
                });
              }}
              isChecked={this.state.isChecked}
            />
            <View>
              <Text
                style={{
                  top: responsiveHeight(4),
                  left: 20,
                  width: '70%'
                }}>
                I agree to the community guidelines, terms and conditions for
                The Good Stuff App
              </Text>
            </View>
          </View>
          <View
            style={{
              marginTop: 10,
              marginBottom: 10,
              height: responsiveHeight(20),
            }}>
            <View>
              <TouchableOpacity
                style={{
                  backgroundColor: '#ffa500',
                  width: 140,
                  top: responsiveHeight(8),
                  height: 60,
                  borderRadius: 40,
                  right: 0,
                  position: 'absolute',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => {
                  this.check_Validation();
                  // this.props.navigation.navigate('App');
                }}>
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
                    style={{
                      fontSize: responsiveFontSize(2),
                      color: 'white',
                      fontWeight: 'bold',
                    }}>
                    Signup
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
              backgroundColor: 'white',
              height: responsiveHeight(5),
              width: responsiveWidth(90),
              alignSelf: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
              bottom: 0,
              // position: 'absolute',
            }}>
            <Text style={{fontSize: responsiveFontSize(1.8), color: '#32cd32'}}>
              Already have an account?
              <Text
                onPress={() => this.props.navigation.navigate('Login')}
                style={{
                  fontSize: responsiveFontSize(2),
                  fontWeight: 'bold',
                  color: '#32cd32',
                }}>
                {' '}
                Login
              </Text>
            </Text>
          </View>
        </ScrollView>
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
export default Signup;
