import React, {Component} from 'react';
import {
  Platform,
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import LinearGradient from 'react-native-linear-gradient';
import FA from 'react-native-vector-icons/FontAwesome';
import Ent from 'react-native-vector-icons/AntDesign';
import FA5 from 'react-native-vector-icons/FontAwesome5';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import {DrawerActions} from 'react-navigation-drawer';
import {_retrieveData} from '../Backend/AsyncStore/AsyncFunc';
import {getData} from '../Backend/Utility';
import AsyncStorage from '@react-native-community/async-storage';
import firebase from 'firebase';

export default class CustomDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
      this.userData()
  }

  userData = async () => {
    await _retrieveData('user').then(async result => {
      console.log('uuuuuuuuu', result);
      let res = await getData('users', result);
      this.setState({
        data: res,
      });
    });
  };
  render() {
    console.log('datatttt', this.state.data);
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={['rgb(53, 203, 53)', 'rgb(64, 200, 64)', 'rgb(78,198,78)']}
          style={{height: '100%', width: '100%'}}>
          <ScrollView>
            <View>
              <TouchableOpacity style={{width: '50%'}}>
                <Image
                  source={{
                    uri: 'https://randomuser.me/api/portraits/men/85.jpg',
                  }}
                  style={{
                    height: 70,
                    width: 70,
                    borderRadius: 70,
                    marginTop: responsiveHeight(3.5),
                    marginLeft: 25,
                    backgroundColor: '#dddddd',
                    borderWidth: 2,
                    borderColor: 'white',
                  }}
                />
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: responsiveFontSize(3.5),
                  marginTop: responsiveHeight(3),
                  color: 'white',
                  marginLeft: 25,
                }}>
                {this.state.data.name}
              </Text>
              <Text
                style={{
                  fontSize: responsiveFontSize(1.8),
                  marginTop: responsiveHeight(1.5),
                  color: 'white',
                  marginLeft: 25,
                  top: -10,
                }}>
                @aurelianSalmon
              </Text>
            </View>
            <TouchableOpacity
              style={styles.menu}
              onPress={() =>
                this.props.navigation.dispatch(DrawerActions.closeDrawer())
              }>
              <Ent name="menu-unfold" size={25} color={'#fffafe'} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.card,
                {flexDirection: 'row', marginTop: responsiveHeight(6)},
              ]}
              onPress={() => this.props.navigation.navigate('Homedrawer')}>
              <View
                style={{marginLeft: 10, width: '50%', flexDirection: 'row'}}>
                <Icon
                  name="ios-home"
                  size={23}
                  color="white"
                  style={{top: 7.5, width: '15%'}}
                />
                <Text style={[styles.cardTittle, {width: '85%'}]}>Home</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.card,
                {flexDirection: 'row', marginTop: responsiveHeight(0)},
              ]}
              onPress={() => this.props.navigation.navigate('UserProfile')}>
              <View
                style={{marginLeft: 10, width: '50%', flexDirection: 'row'}}>
                <Icon
                  name="ios-person"
                  size={23}
                  color="white"
                  style={{top: 7.5, width: '15%'}}
                />
                <Text style={[styles.cardTittle, {width: '85%'}]}>
                  My Profile
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.card, {flexDirection: 'row'}]}
              onPress={() => this.props.navigation.navigate('Groups')}>
              <View
                style={{marginLeft: 10, width: '50%', flexDirection: 'row'}}>
                <FA
                  name="group"
                  size={20}
                  color="white"
                  style={{top: 7.5, width: '15%'}}
                />
                <Text style={[styles.cardTittle, {width: '85%'}]}>Groups</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.card, {flexDirection: 'row'}]}
              onPress={() => this.props.navigation.navigate('Friend')}>
              <View
                style={{marginLeft: 10, width: '50%', flexDirection: 'row'}}>
                <FA5
                  name="user-friends"
                  size={20}
                  color="white"
                  style={{top: 7.5, width: '15%'}}
                />
                <Text style={[styles.cardTittle, {width: '85%'}]}>Friends</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.card, {flexDirection: 'row'}]}
              onPress={() => this.props.navigation.navigate('CompanyProfile')}>
              <View
                style={{marginLeft: 10, width: '100%', flexDirection: 'row'}}>
                <MCI
                  name="office-building"
                  size={25}
                  color="white"
                  style={{top: 5, width: '7.5%'}}
                />
                <Text style={[styles.cardTittle, {width: '100%'}]}>
                  Company Profile
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.card, {flexDirection: 'row'}]}
              onPress={() => this.props.navigation.navigate('Family')}>
              <View
                style={{marginLeft: 10, width: '50%', flexDirection: 'row'}}>
                <MCI
                  name="human-female-boy"
                  size={25}
                  color="white"
                  style={{top: 5, width: '15%'}}
                />
                <Text style={[styles.cardTittle, {width: '85%'}]}>Family</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.card, {flexDirection: 'row'}]}
              onPress={() => this.props.navigation.navigate('InviteFriend')}>
              <View
                style={{marginLeft: 10, width: '50%', flexDirection: 'row'}}>
                <Icon
                  name="md-person-add"
                  size={25}
                  color="white"
                  style={{top: 7.5, width: '15%'}}
                />
                <Text style={[styles.cardTittle, {width: '100%'}]}>
                  Invite Friends
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.card, {flexDirection: 'row'}]}
              onPress={() => this.props.navigation.navigate('GreatNews')}>
              <View
                style={{marginLeft: 10, width: '50%', flexDirection: 'row'}}>
                <Icon
                  name="ios-gift"
                  size={25}
                  color="white"
                  style={{top: 7.5, width: '15%', left: 3}}
                />
                <Text style={[styles.cardTittle, {width: '85%'}]}>
                  Great Stuff
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.card, {flexDirection: 'row', marginTop: 30}]}
              onPress={() => this.props.navigation.navigate('House')}>
              <View style={{marginLeft: 10, width: '50%'}}>
                <Text style={styles.cardTittle1}>Bulid The House</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.card, {flexDirection: 'row'}]}
              onPress={() => this.props.navigation.navigate('AppWorking')}>
              <View style={{marginLeft: 10, width: '50%'}}>
                <Text style={styles.cardTittle1}>How It Works</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.card, {flexDirection: 'row'}]}
              onPress={() => this.props.navigation.navigate('CommunityGuide')}>
              <View style={{marginLeft: 10, width: '100%'}}>
                <Text style={styles.cardTittle1}>Community Guidelines</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.card, {flexDirection: 'row'}]}
              onPress={() => this.props.navigation.navigate('privacyPolicy')}>
              <View style={{marginLeft: 10, width: '50%'}}>
                <Text style={styles.cardTittle1}>Privacy Policy</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.card,
                {flexDirection: 'row', marginTop: responsiveHeight(5)},
              ]}
              onPress={async () => {
                await AsyncStorage.removeItem('user', async () => {
                  await firebase
                    .auth()
                    .signOut()
                    .then(() => {
                      this.props.navigation.navigate('Login');
                    });
                });
              }}>
              <View style={{marginLeft: 10, width: '50%'}}>
                <Text style={[styles.cardTittle, {fontWeight: 'bold'}]}>
                  Log Out
                </Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </LinearGradient>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopRightRadius: 15,
  },
  cardTittle: {
    color: 'white',
    fontSize: 20,
    top: 5,
    marginLeft: 20,
  },

  card: {
    borderRadius: 5,
    height: 40,
  },
  cardTittle1: {
    color: 'white',
    fontSize: 16,
    marginTop: responsiveHeight(2),
    top: 5,
    marginLeft: 20,
  },
  header: {
    height: '10%',
    width: '100%',
    backgroundColor: '#fbc503',
  },
  menu: {
    color: '#ffffff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: '5%',
    marginLeft: '88%',
    position: 'absolute',
  },
});
