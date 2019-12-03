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
import firebase from 'firebase';
import {getAllOfCollection, getData} from '../../Backend/Utility';
import {_retrieveData} from '../../Backend/AsyncStore/AsyncFunc';

//frineds Screen
const uri = 'https://randomuser.me/api/portraits/men/8.jpg';
export default class InviteFriends extends Component {
  constructor(props) {
    super(props);
    this.state = {
      calls: [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}, {id: 6}, {id: 7}],
      data: [],
      loading: true,
      pending_request: [],
      diff: [],
      send: false,
    };
  }

  componentDidMount = async () => {
    const {diff, pending_request, data} = this.state;
    await getAllOfCollection('users').then(async result => {
      // console.log('ressssssssssssssss', result.userId);
      await _retrieveData('user').then(async response => {
        await getData('users', response).then(res => {
          res.pending_friends.map(item => {
            diff.push({userId: item.userId});
            this.setState({
              diff,
            });
          });
        });
      });
      this.setState({data: result, loading: false});
    });
  };

  pending_Request_check = async (request, username, profile_pic) => {
    const {diff, pending_request, data} = this.state;

    console.log('ressssssssssssssss', diff);
    // if (!pending_request.includes(request, username, profile_pic)) {
    //   pending_request.push(request);
    //   this.setState({
    //     pending_request,
    //   });
    // }
    await _retrieveData('user').then(async result => {
      await getData('users', result).then(res => {
        // console.log('ressssssssssssssss', res.pending_friends);
        firebase
          .firestore()
          .collection('users')
          .doc(request)
          .update({
            pending_friends: firebase.firestore.FieldValue.arrayUnion({
              userId: result,
              name: res.name,
              profile_picture: res.profile_picture,
              send: !this.state.send,
            }),
          });
      });
    });

    // pending_request.push({userId: requst});
    await _retrieveData('user').then(result =>
      firebase
        .firestore()
        .collection('users')
        .doc(result)
        .update({
          pending_friends: firebase.firestore.FieldValue.arrayUnion({
            userId: request,
            name: username,
            profile_picture: profile_pic,
            send: this.state.send,
          }),
        }),
    );

    // var final = data.filter(function(item) {
    //   var name = item.userId;
    //   for (var i = 0; i < item.pending_friends.length; i++) {
    //     if (item.pending_friends[i] === name) return false;
    //   }
    //   return true;
    // });
    // this.setState({
    //   diff: final,
    // });
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

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#F5F5F5'}}>
        <View style={{marginBottom: 10}}>
          <Text style={styles.welcome}>Invite Friends</Text>
          <Ionicon
            name="ios-menu"
            size={35}
            color={'#32cd32'}
            onPress={() => this.props.navigation.openDrawer()}
            style={styles.menu}
          />
          <Image
            source={{uri: 'https://randomuser.me/api/portraits/men/85.jpg'}}
            style={styles.menu1}
          />
        </View>
        <View style={styles.seacrhbarContainter}>
          {/*                    
                    <SearchBar
                        placeholder="Type something..."
                        onChangeText={this.updateSearch}
                        // value={search}
                        round
                        lightTheme

                        leftIconContainerStyle={{backgroundColor:'#59e123',borderRadius:20,height:30,left:-12}}
                        
                        inputContainerStyle={{backgroundColor:'#eceeeb',width:'90%',height:35,padding:7}}
                        searchIcon={<Icon name="search" size={30} color='white' style={{marginLeft:0}}/>}
                        containerStyle={{ backgroundColor:'white',width:'100%',paddingLeft:50}}
                    /> */}

          <SearchBar
            placeholder="Type something..."
            onChangeText={this.updateSearch}
            // value={search}
            round
            lightTheme
            leftIconContainerStyle={{
              backgroundColor: '#3fee4a',
              borderRadius: 20,
              height: 30,
              left: -12,
            }}
            inputContainerStyle={{
              backgroundColor: 'white',
              width: '90%',
              paddingLeft: 5,
            }}
            searchIcon={
              <TouchableOpacity>
                <Icon
                  name="search"
                  size={30}
                  color="white"
                  style={{marginLeft: 0}}
                />
              </TouchableOpacity>
            }
            containerStyle={{
              backgroundColor: '#F5F5F5',
              width: '100%',
              padding: 5,
              paddingLeft: 50,
            }}
          />
        </View>
        {this.state.loading ? (
          <ActivityIndicator
            size={'large'}
            color="blue"
            style={{justifyContent: 'center', alignItems: 'center', flex: 1}}
          />
        ) : 
          <FlatList
            extraData={this.state}
            data={this.state.data}
            ItemSeparatorComponent={this.renderSeparator}
            keyExtractor={item => {
              return item.id;
            }}
            renderItem={({item, index}) => {
              return (
                <View style={styles.row}>
                  {this.state.diff.map(itm =>
                    itm.userId == item.userId ? (
                      null
                    ) : (
                      <View style={styles.row}>
                        <View style={styles.imageContainer}>
                          <Image source={{uri: uri}} style={styles.pic} />
                        </View>
                        {/* <Text>{itm.userId}</Text> */}
                        <View style={styles.nameContainer}>
                          <Text style={styles.nameTxt} numberOfLines={1}>
                            {item.name}
                          </Text>
                        </View>
                        <TouchableOpacity
                          style={styles.InviteFriendsContainer}
                          onPress={() => {
                            this.setState({send: true});
                            this.pending_Request_check(
                              item.userId,
                              item.name,
                              item.profile_picture,
                            );
                          }}>
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
                    ),
                  )}
                </View>
              );
            }}
          />
        }
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
