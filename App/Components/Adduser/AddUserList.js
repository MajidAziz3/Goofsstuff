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
  ActivityIndicator,
} from 'react-native';
import {Left} from 'native-base';
import Icon from 'react-native-vector-icons/EvilIcons';
import EIcon from 'react-native-vector-icons/Entypo';
import FIcon from 'react-native-vector-icons/FontAwesome5';
import {SearchBar} from 'react-native-elements';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import {getData} from '../../Backend/Utility';
import firebase from 'firebase';
import {_retrieveData} from '../../Backend/AsyncStore/AsyncFunc';

const uri = 'https://randomuser.me/api/portraits/men/8.jpg';
export default class Chartlist extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true,
      userData: [],
      item: this.props.navigation.state.params.item,
    };
  }

  componentDidMount = async () => {
    let data = this.state.userData;
    data.push(this.state.item);
    this.setState({userData: data});
    await firebase
      .firestore()
      .collection('friends')
      .onSnapshot(async () => {
        await _retrieveData('user').then(user => {
          getData('users', user).then(res => {
            console.log('fav', res);
            this.setState({data: res.friends, loading: false});
          });
        });
      });
  };
  groupInvitation = async item => {
    let data = this.state.userData;
    data.push(item.userId);
    this.setState({userData: data}, () => {
      console.log(this.state.userData, 'checking user data');
    });
  };
  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '82%',
          backgroundColor: '#CED0CE',
          marginLeft: '18%',
        }}
      />
    );
  };

  renderItem = ({item}) => {
    return (
      <View style={styles.row}>
        <View style={styles.imageContainer}>
          <Image source={{uri: item.profile_picture}} style={styles.pic} />
        </View>

        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt} numberOfLines={1}>
            {item.name}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.InviteFriendsContainer}
          onPress={() => this.groupInvitation(item)}>
          {/* <Ionicon name='md-person-add' size={25} color='#3fee4a' style={{}}/> */}
          <Entypo name="plus" size={25} color="#3fee4a" style={{}} />
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#F5F5F5'}}>
        <View style={{marginBottom: 10}}>
          <Text style={styles.welcome}>User List</Text>
          <FIcon
            name="chevron-left"
            size={25}
            color={'#32cd32'}
            onPress={() => {
              if (this.state.userData) {
                this.props.navigation.navigate('AddGroup', {
                  items: this.state.userData,
                } );
              } else {
                this.props.navigation.goBack();
              }
            }}
            style={styles.menu}
          />
        </View>
        {this.state.loading ? (
          <ActivityIndicator
            size={'large'}
            color="#32cd32"
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
            }}
          />
        ) : (
          <FlatList
            extraData={this.state}
            data={this.state.data}
            ItemSeparatorComponent={this.renderSeparator}
            keyExtractor={item => {
              return item.id;
            }}
            renderItem={this.renderItem}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    backgroundColor: 'white',
    height: responsiveHeight(12),
    // marginTop: 1,
    width: responsiveWidth(100),

    // paddingBottom:2,
  },
  seacrhbarContainter: {
    backgroundColor: '#F5F5F5',
    height: responsiveHeight(8),
    width: responsiveWidth(100),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },

  imageContainer: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  hoursContainer: {
    height: '50%',
    width: '20%',
    justifyContent: 'center',
  },
  pic: {
    borderRadius: responsiveHeight(8),
    width: responsiveHeight(8),
    height: responsiveHeight(8),
  },
  nameContainer: {
    width: '60%',
    justifyContent: 'center',
    paddingHorizontal: 10,
    // backgroundColor:'red',
    // shadowOffset: { width: 0, height: 1 },
    // shadowOpacity: 0.2,
    // shadowRadius: 1.41,
    // elevation: 1,
    borderBottomWidth: 0.1,
  },
  nameTxt: {
    // marginLeft: 15,
    fontWeight: '600',
    color: '#222',
    fontSize: responsiveFontSize(2.4),
    width: 170,
  },

  msgContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  msgTxt: {
    fontWeight: '400',
    color: '#727171',
    fontSize: responsiveFontSize(1.7),
    // marginLeft: 15,
    fontWeight: '900',
    // alignSelf:'flex-end',
  },
  posttxt: {
    fontWeight: '400',
    color: '#3529b4',
    fontSize: responsiveFontSize(1.7),
    // marginLeft: 15,
    fontWeight: '900',
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
    marginTop: responsiveHeight(1.2),
    marginLeft: '85%',
    position: 'absolute',
  },
  InviteFriendsContainer: {
    // backgroundColor:'red',
    flexDirection: 'row',
    width: '10%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});
