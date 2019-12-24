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
  TouchableHighlight,
  Modal,
} from 'react-native';
import {Left} from 'native-base';
import Icon from 'react-native-vector-icons/EvilIcons';
import FIAcon from 'react-native-vector-icons/FontAwesome';
import FIcon from 'react-native-vector-icons/FontAwesome5';
import {SearchBar} from 'react-native-elements';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import EIcon from 'react-native-vector-icons/Entypo';
import {getAllOfCollection, addToArray, getData} from '../../Backend/Utility';
import SearchInput, {createFilter} from 'react-native-search-filter';
import AIcon from 'react-native-vector-icons/AntDesign';
import {_retrieveData} from '../../Backend/AsyncStore/AsyncFunc';

import AntDesign from 'react-native-vector-icons/AntDesign';
import firebase from 'firebase';

//frineds Screen
const uri = 'https://randomuser.me/api/portraits/men/8.jpg';
const KEYS_TO_FILTERS = ['name'];
export default class InviteFriendsTofamily extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      calls: [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}, {id: 6}, {id: 7}],
      data_user: null,
      userId: null,
      loading: true,
      searchTerm: '',
      modalVisible: false,
      data: [],
    };
  }

  toggleModal(visible) {
    this.setState({modalVisible: visible});
  }

  componentDidMount = async () => {
    _retrieveData('user').then(async result => {
      await firebase
        .firestore()
        .collection('users')
        .onSnapshot(async () => {
          await _retrieveData('user').then(async result => {
            await getData('users', result).then(res => {
              console.log('sold prooof', res);
              this.setState({
                data_user: res,
                data: res.friends,
                userId: res.userId,
                loading: false,
              });
            });
          });
        });
    });
  };
  searchUpdated(term) {
    this.setState({searchTerm: term});
  }

  FamilyInvitation = async item => {
    console.log('data', item);
    let data1 = this.state.data;
    // this.setState({d: []});
    let data2 = [];
    new Promise((resolve, reject) => {
      let i = 0;
      //   });
      data1.forEach(itm => {
        i++;
        if (itm.userId !== item.userId) {
          data2.push(itm);
          resolve();
        }
      });
    }).then(result => {
      this.setState({data: data2});
    });
    console.log('gagag', item);
    await _retrieveData('user').then(async result => {
      await getData('users', result).then(async check => {
        await firebase
          .firestore()
          .collection('users')
          .doc(item.userId)
          .update({
            familyInvitation: firebase.firestore.FieldValue.arrayUnion({
              userId: result,
              name: check.name,
              profile_picture: check.profile_picture,
              bio: check.bio,
            }),
          })
          .then(() => this.toggleModal(true));
      });
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
          <Image source={{uri: uri}} style={styles.pic} />
        </View>

        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt} numberOfLines={1}>
            Mark Doe
          </Text>
        </View>
        <TouchableOpacity
          style={styles.InviteFriendsContainer}
          onPress={() => alert('Invite Friend')}>
          <Ionicon name="md-person-add" size={25} color="#3fee4a" style={{}} />
          {/* <Entypo name='message' size={25} color='#3fee4a' style={{}}/> */}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.InviteFriendsContainer}
          onPress={() => alert('Invite Friend')}>
          {/* <Ionicon name='md-person-add' size={25} color='#3fee4a' style={{}}/> */}
          <Entypo name="message" size={25} color="#3fee4a" style={{}} />
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#F5F5F5'}}>
        <View style={{marginBottom: 10}}>
          <Text style={styles.welcome}>Invite Friends</Text>
          <FIAcon
            name="chevron-left"
            size={25}
            color={'#32cd32'}
            onPress={() => this.props.navigation.goBack()}
            style={styles.menu}
          />

          {!this.state.data_user ||
          this.state.data_user.profile_picture == null ? (
            <Entypo
              name="user"
              size={30}
              color="#d0d0d0dd"
              style={styles.menu1}
            />
          ) : (
            <Image
              source={{
                uri: this.state.data_user.profile_picture,
              }}
              style={styles.menu1}
            />
          )}
        </View>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <View style={styles.seacrhbarContainter}>
            <SearchInput
              onChangeText={term => {
                this.searchUpdated(term);
              }}
              style={styles.searchInput}
              placeholder="Type a message to search"
              clearIcon={
                this.state.searchTerm !== '' && (
                  <EIcon name="cross" size={30} color={'#32cd32'} />
                )
              }
              clearIconViewStyles={{position: 'absolute', top: 4, right: 22}}
            />
          </View>
          <AntDesign
            name="pluscircle"
            size={40}
            color="#3fee4a"
            style={{marginTop: 5, marginLeft: 20}}
            onPress={() => this.props.navigation.navigate('AppUser')}
          />
        </View>
        <View style={{flex: 1}}>
          {this.state.searchTerm == '' && this.state.loading ? (
            <ActivityIndicator
              size={'large'}
              color="#32cd32"
              style={{justifyContent: 'center', alignItems: 'center', flex: 1}}
            />
          ) : this.state.data ? (
            <ScrollView>
              {this.state.data
                .filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))
                .map(item => {
                  return (
                    <View style={styles.row}>
                      <View style={styles.imageContainer}>
                        <Image
                          source={
                            item.profile_picture == null
                              ? {
                                  uri:
                                    'https://static-s.aa-cdn.net/img/ios/981028611/e05febed124ce8b8178b07e4f857ea6f?v=1',
                                }
                              : {uri: item.profile_picture}
                          }
                          style={styles.pic}
                        />
                      </View>

                      <View style={styles.nameContainer}>
                        <Text style={styles.nameTxt} numberOfLines={1}>
                          {item.name}
                        </Text>
                      </View>
                      <TouchableOpacity
                        style={styles.InviteFriendsContainer}
                        onPress={() => this.FamilyInvitation(item)}>
                        <Ionicon
                          name="md-person-add"
                          size={25}
                          color="#3fee4a"
                          style={{}}
                        />
                        {/* <Entypo name='message' size={25} color='#3fee4a' style={{}}/> */}
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.InviteFriendsContainer}
                        onPress={() => alert('Invite Friend')}>
                        {/* <Ionicon name='md-person-add' size={25} color='#3fee4a' style={{}}/> */}
                        <Entypo
                          name="message"
                          size={25}
                          color="#3fee4a"
                          style={{}}
                        />
                      </TouchableOpacity>
                    </View>
                  );
                  {
                    /* <View style={styles.box}>
                      <TouchableOpacity
                        onPress={() =>
                          this.props.navigation.navigate('FriendsProfile', {
                            id: item.userId,
                            name: item.name,
                          })
                        }>
                        <Image
                          style={styles.image}
                          source={
                            item.profile_picture == null
                              ? {
                                  uri:
                                    'https://static-s.aa-cdn.net/img/ios/981028611/e05febed124ce8b8178b07e4f857ea6f?v=1',
                                }
                              : {uri: item.profile_picture}
                          }
                        />
                      </TouchableOpacity>
                      <View style={styles.boxContent}>
                        <View style={{flexDirection: 'row'}}>
                          <TouchableOpacity
                            onPress={() =>
                              this.props.navigation.navigate('FriendsProfile', {
                                id: item.userId,
                                name: item.name,
                              })
                            }>
                            <Text style={styles.title}>{item.name}</Text>
                          </TouchableOpacity>

                          <TouchableOpacity
                            style={[styles.button]}
                            onPress={() =>
                              this.props.navigation.navigate('Chat', {
                                id: item.userId,
                                name: item.name,
                              })
                            }>
                            <Ionicon
                              name="ios-chatboxes"
                              size={28}
                              color={'#32cd32'}
                              style={styles.menu}
                            />
                          </TouchableOpacity>
                        </View>
                        <Text style={styles.description}>{item.bio}</Text>
                      </View>
                    </View> */
                  }
                })}
            </ScrollView>
          ) : (
            <View
              style={{
                height: 500,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text>You have no friends </Text>
            </View>
          )}
        </View>
        <Modal
          animationType={'slide'}
          transparent={false}
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {}}>
          <View style={styles.modal}>
            <View
              style={{height: '50%', width: '100%', justifyContent: 'center'}}>
              <Text style={{fontSize: responsiveFontSize(2), color: 'white'}}>
                Family Invitation Sent!
              </Text>
            </View>
            <View
              style={{
                padding: 5,
                height: '40%',
                width: '100%',
                justifyContent: 'flex-end',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <TouchableHighlight
                style={{
                  marginEnd: 10,
                  backgroundColor: 'white',
                  height: 50,
                  width: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 30,
                }}>
                <AIcon
                  name="close"
                  size={25}
                  color="#0d4d28"
                  style={{}}
                  onPress={() => {
                    this.toggleModal(!this.state.modalVisible);
                  }}
                />
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
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
  modal: {
    //  margin:5,
    top: responsiveHeight(40),
    width: responsiveWidth(90),
    height: responsiveHeight(15),
    borderRadius: 15,
    padding: 10,
    paddingHorizontal: 20,
    alignSelf: 'center',

    backgroundColor: '#32cd32',
    // padding: 100
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
