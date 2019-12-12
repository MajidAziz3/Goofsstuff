import React, { Component, Fragment } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  SafeAreaView,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import { Left, Thumbnail, Badge } from 'native-base';
import Ionicon from 'react-native-vector-icons/Ionicons';

import Swipeout from 'react-native-swipeout';
import Icon from 'react-native-vector-icons/EvilIcons';
import AIcon from 'react-native-vector-icons/AntDesign';
import EIcon from 'react-native-vector-icons/Entypo';
import FIcon from 'react-native-vector-icons/FontAwesome5';
import MTIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { SearchBar } from 'react-native-elements';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import { getAllOfCollection, getData, getDocRefByKeyValue } from '../../Backend/Utility';
import SearchInput, { createFilter } from 'react-native-search-filter';
import { _retrieveData } from '../../Backend/AsyncStore/AsyncFunc';

// import { formatResultsErrors } from 'jest-message-util';
///Inbox swiplist
const uri = 'https://facebook.github.io/react-native/docs/assets/favicon.png';
const KEYS_TO_FILTERS = ['name'];
const bRightColor = '#fff';
class ChatList extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      datasource: [1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3],
      datasource2: [1, 2],
      data: [],
      data2: [],
      loading: true,
      searchTerm: '',
      friends: [],
      chatted: []
    };
  }
  componentDidMount = async () => {
    let friends = [];
    let chatted = [];
    await _retrieveData('user').then(async (id) => {
      await getData('friends', id).then(result => {
        this.setState({ data: result.request }, () => {
          this.state.data.map(async (item) => {
            console.log('333333333333333333333333333333333333333333333333')
            console.log(item)
            await getData('users', item.userId).then((friend) => {
              friends.push(friend)
              this.setState({ friends: friends })
            })
          })
        });
      });
    })

    await _retrieveData('user').then(async (id) => {
      await getData('users', id).then(result => {
        this.setState({ data2: result.chatted }, () => {
          this.state.data2.map(async (item) => {
            console.log('666666666666666666666666666666666666666666666666666666')
            console.log(item)
            await getData('users', item).then((chat) => {
              chatted.push(chat)
              this.setState({ chatted: chatted, loading: false })
            })
          })
        });
      });
    })

  };

  searchUpdated(term) {
    this.setState({ searchTerm: term })
  }

  render() {
    console.log('data', this.state.data);
    const swipeoutBtns = (item) => [
      {
        //   text: 'Add', Message
        backgroundColor: 'white',
        //   type: 'add',
        // backgroundColor:'#3fee4a',
        component: (
          <TouchableOpacity
          onPress={()=> this.props.navigation.navigate('Chat', { id: item.userId, name: item.name })}
            style={{
              borderRightWidth: 1,
              borderRightColor: bRightColor,
              backgroundColor: '#3fee4a',
              borderTopLeftRadius: 30,
              borderBottomLeftRadius: 30,
              height: '100%',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <MTIcon
              name="message-processing"
              size={40}
              color="white"
              style={{ top: 2, left: 0, alignSelf: 'center' }}
            />
          </TouchableOpacity>
        ),
        
      },
      {
        //   text: 'Update',Star
        color: 'white',
        //   type: 'primary',
        // backgroundColor:'white',
        component: (
          <TouchableOpacity
            style={{
              borderRightWidth: 1.3,
              borderRightColor: bRightColor,
              backgroundColor: '#3fee4a',
              height: '100%',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <AIcon
              name="star"
              size={40}
              color="white"
              style={{ right: 0, top: -2, alignSelf: 'center' }}
            />
          </TouchableOpacity>
        ),

        onPress: () => {
          alert('Update');
        },
      },
      // trash
      {
        //   text: 'Delete',
        color: 'white',
        //   type: 'delete',
        // backgroundColor:'#3fee4a',
        component: (
          <TouchableOpacity
            style={{
              borderRightWidth: 1.5,
              borderRightColor: bRightColor,
              backgroundColor: '#3fee4a',
              height: '100%',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <EIcon
              name="trash"
              size={40}
              color="white"
              style={{ right: 0, alignSelf: 'center' }}
            />
          </TouchableOpacity>
        ),

        backgroundColor: '#3fee4a',
        onPress: () => {
          alert('Delete press');
        },
      },
    ];
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.welcome}>Inbox</Text>
        <Ionicon
          name="ios-menu"
          size={35}
          color={'#32cd32'}
          onPress={() => this.props.navigation.openDrawer()}
          style={styles.menu}
        />
        <Image
          source={{ uri: 'https://randomuser.me/api/portraits/men/85.jpg' }}
          style={styles.menu1}
        />
        <View style={styles.seacrhbarContainter}>
          <SearchInput
            onChangeText={(term) => { this.searchUpdated(term) }}
            style={styles.searchInput}
            placeholder="Type a message to search"
            clearIcon={this.state.searchTerm !== '' && <EIcon name="cross" size={30} color={'#32cd32'} />}
            clearIconViewStyles={{ position: 'absolute', top: 4, right: 22 }}
          />
        </View>

        {this.state.searchTerm == '' ? (
          this.state.loading ? (
            <ActivityIndicator
              size={'large'}
              color="#32cd32"
              style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}
            />
          ) : (


              < View >
                <View
                  style={{
                    paddingTop: 15,
                    paddingLeft: 5,
                    width: responsiveWidth(100),
                    backgroundColor: 'white',
                    height: responsiveHeight(15),
                    flexDirection: 'row',
                    marginBottom: 6,
                  }}>
                  <FlatList
                    data={this.state.friends}
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    keyExtractor={item => item.id}
                    renderItem={({ item, index }) => (
                      <TouchableOpacity
                        style={{ paddingHorizontal: 5, width: 70, height: '100%' }}
                        key={index}
                        onPress={() =>
                          this.props.navigation.navigate('Chat', { id: item.userId, name: item.name })
                        }>
                        <View style={{ backgroundColor: 'white', height: '70%' }}>
                          <Thumbnail
                            source={{
                              uri: item.profile_picture,
                            }}
                            style={{ alignSelf: 'center', top: 2, height: 60, width: 60 }}
                          />
                        </View>
                        <View
                          style={{
                            padding: 1,
                            backgroundColor: 'white',
                            height: '20%',
                            alignSelf: 'center',
                            alignItems: 'center',
                          }}>
                          <Text
                            numberOfLines={1}
                            style={{
                              flexGrow: 2,
                              flex: 1,
                              fontSize: responsiveFontSize(1.5),
                            }}>
                            {item.name}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    )}></FlatList>
                </View>
                <View
                  style={{
                    backgroundColor: 'white',
                    width: responsiveWidth(100),
                    height: responsiveHeight(70),
                  }}>
                  <FlatList
                    data={this.state.chatted}
                    showsHorizontalScrollIndicator={true}
                    horizontal={false}
                    keyExtractor={item => item.id}

                    renderItem={({ item, index }) => (
                      <View
                        key={index}
                        
                        
                      >
                        <Swipeout
                          buttonWidth={105}
                          autoClose={true}
                          right={swipeoutBtns(item)}
                          style={{ borderRadius: 0 }}>
                          <TouchableOpacity onPress={() =>
                          this.props.navigation.navigate('Chat', { id: item.userId, name: item.name })
                        } style={styles.row}>
                            <View
                              style={{
                                backgroundColor: 'white',
                                alignSelf: 'center',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginHorizontal: 10,
                                height: '80%',
                                width: '20%',
                                borderRadius: 20,
                              }}>
                              <Image
                                source={{ uri: item.profile_picture }}
                                style={{ borderRadius: 10, width: '80%', height: '90%' }}
                              />
                            </View>
                            <View
                              style={{
                                backgroundColor: 'white',
                                marginTop: 5,
                                height: '100%',
                                width: '75%',
                              }}>
                              <View
                                style={{
                                  alignItems: 'center',
                                  backgroundColor: 'white',
                                  height: '40%',
                                  width: '100%',
                                  flexDirection: 'row',
                                }}>
                                <View style={{ width: '60%', top: 5 }}>
                                  <Text
                                    numberOfLines={1}
                                    style={{
                                      color: '#363636',
                                      flex: 1,
                                      fontSize: responsiveFontSize(2.5),
                                      fontWeight: '900',
                                    }}>
                                    {item.name}
                                  </Text>
                                </View>

                                <View style={{ width: '40%' }}>
                                  <Text
                                    numberOfLines={1}
                                    style={{
                                      color: '#656565',
                                      top: 5,
                                      flexGrow: 2,
                                      flex: 1,
                                      fontSize: responsiveFontSize(1.2),
                                    }}>
                                    YESTERDAY 2:30 PM
                        </Text>
                                </View>
                              </View>

                              <View
                                style={{
                                  flexDirection: 'row',
                                  height: '60%',
                                  width: '100%',
                                }}>
                                <View style={{ width: '75%' }}>
                                  <Text
                                    numberOfLines={1}
                                    style={{
                                      color: '#656565',
                                      fontSize: responsiveFontSize(1.8),
                                    }}>
                                    Simple text haklsj Jajsk Jasknkajsklnasljkl as
                        </Text>
                                </View>

                                <View style={{ width: '25%' }}>
                                  <View
                                    style={{
                                      alignSelf: 'center',
                                      backgroundColor: '#3fee4a',
                                      height: 30,
                                      width: 30,
                                      top: 5,
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                      borderRadius: 20,
                                    }}>
                                    <Text
                                      numberOfLines={1}
                                      style={{
                                        color: 'white',
                                        fontSize: responsiveFontSize(1.9),
                                      }}>
                                      2
                          </Text>
                                  </View>
                                </View>
                              </View>
                            </View>
                          </TouchableOpacity>
                        </Swipeout>
                      </View>
                    )}></FlatList>
                </View>

              </View>
            )
        ) : (
            this.state.loading ? (
              <ActivityIndicator
                size={'large'}
                color="#32cd32"
                style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}
              />
            ) : (


                < ScrollView >
                  {
                    this.state.data.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS)).map(item => {
                      return (
                        <TouchableOpacity
                          key={item.key}
                          onPress={() =>
                            this.props.navigation.navigate('Chat', { id: item.userId, name: item.name })
                          }

                        >
                          <Swipeout
                            buttonWidth={105}
                            autoClose={true}
                            right={swipeoutBtns()}
                            style={{ borderRadius: 0 }}>
                            <View style={styles.row}>
                              <View
                                style={{
                                  backgroundColor: 'white',
                                  alignSelf: 'center',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  marginHorizontal: 10,
                                  height: '80%',
                                  width: '20%',
                                  borderRadius: 20,
                                }}>
                                <Image
                                source={{ uri: item.profile_picture }}
                                style={{ borderRadius: 10, width: '80%', height: '90%' }}
                              />
                              </View>
                              <View
                                style={{
                                  backgroundColor: 'white',
                                  marginTop: 5,
                                  height: '100%',
                                  width: '75%',
                                }}>
                                <View
                                  style={{
                                    alignItems: 'center',
                                    backgroundColor: 'white',
                                    height: '40%',
                                    width: '100%',
                                    flexDirection: 'row',
                                  }}>
                                  <View style={{ width: '60%', top: 5 }}>
                                    <Text
                                      numberOfLines={1}
                                      style={{
                                        color: '#363636',
                                        flex: 1,
                                        fontSize: responsiveFontSize(2.5),
                                        fontWeight: '900',
                                      }}>
                                      {item.name}
                                    </Text>
                                  </View>

                                  <View style={{ width: '40%' }}>
                                    <Text
                                      numberOfLines={1}
                                      style={{
                                        color: '#656565',
                                        top: 5,
                                        flexGrow: 2,
                                        flex: 1,
                                        fontSize: responsiveFontSize(1.2),
                                      }}>
                                      YESTERDAY 2:30 PM
                        </Text>
                                  </View>
                                </View>

                                <View
                                  style={{
                                    flexDirection: 'row',
                                    height: '60%',
                                    width: '100%',
                                  }}>
                                  <View style={{ width: '75%' }}>
                                    <Text
                                      numberOfLines={1}
                                      style={{
                                        color: '#656565',
                                        fontSize: responsiveFontSize(1.8),
                                      }}>
                                      Simple text haklsj Jajsk Jasknkajsklnasljkl as
                        </Text>
                                  </View>

                                  <View style={{ width: '25%' }}>
                                    <View
                                      style={{
                                        alignSelf: 'center',
                                        backgroundColor: '#3fee4a',
                                        height: 30,
                                        width: 30,
                                        top: 5,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        borderRadius: 20,
                                      }}>
                                      <Text
                                        numberOfLines={1}
                                        style={{
                                          color: 'white',
                                          fontSize: responsiveFontSize(1.9),
                                        }}>
                                        2
                          </Text>
                                    </View>
                                  </View>
                                </View>
                              </View>
                            </View>
                          </Swipeout>
                        </TouchableOpacity>
                      )
                    })
                  }
                </ScrollView>
              )
          )
        }









        {/* <View
          style={{
            backgroundColor: 'white',
            width: responsiveWidth(100),
            height: responsiveHeight(70),
          }}>
          <FlatList
            data={this.state.data}
            showsHorizontalScrollIndicator={true}
            horizontal={false}
            keyExtractor={item => item.id}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                key={index}
                onPress={() =>
                  this.props.navigation.navigate('Chat', { id: item.userId })
                }

              >
                <Swipeout
                  buttonWidth={105}
                  autoClose={true}
                  right={swipeoutBtns()}
                  style={{ borderRadius: 0 }}>
                  <View style={styles.row}>
                    <View
                      style={{
                        backgroundColor: 'white',
                        alignSelf: 'center',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginHorizontal: 10,
                        height: '80%',
                        width: '20%',
                        borderRadius: 20,
                      }}>
                      <Image
                        source={{ uri: 'https://randomuser.me/api/portraits/men/76.jpg' }}
                        style={{ borderRadius: 10, width: '80%', height: '90%' }}
                      />
                    </View>
                    <View
                      style={{
                        backgroundColor: 'white',
                        marginTop: 5,
                        height: '100%',
                        width: '75%',
                      }}>
                      <View
                        style={{
                          alignItems: 'center',
                          backgroundColor: 'white',
                          height: '40%',
                          width: '100%',
                          flexDirection: 'row',
                        }}>
                        <View style={{ width: '60%', top: 5 }}>
                          <Text
                            numberOfLines={1}
                            style={{
                              color: '#363636',
                              flex: 1,
                              fontSize: responsiveFontSize(2.5),
                              fontWeight: '900',
                            }}>
                            {item.name}
                          </Text>
                        </View>

                        <View style={{ width: '40%' }}>
                          <Text
                            numberOfLines={1}
                            style={{
                              color: '#656565',
                              top: 5,
                              flexGrow: 2,
                              flex: 1,
                              fontSize: responsiveFontSize(1.2),
                            }}>
                            YESTERDAY 2:30 PM
                        </Text>
                        </View>
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          height: '60%',
                          width: '100%',
                        }}>
                        <View style={{ width: '75%' }}>
                          <Text
                            numberOfLines={1}
                            style={{
                              color: '#656565',
                              fontSize: responsiveFontSize(1.8),
                            }}>
                            Simple text haklsj Jajsk Jasknkajsklnasljkl as
                        </Text>
                        </View>

                        <View style={{ width: '25%' }}>
                          <View
                            style={{
                              alignSelf: 'center',
                              backgroundColor: '#3fee4a',
                              height: 30,
                              width: 30,
                              top: 5,
                              justifyContent: 'center',
                              alignItems: 'center',
                              borderRadius: 20,
                            }}>
                            <Text
                              numberOfLines={1}
                              style={{
                                color: 'white',
                                fontSize: responsiveFontSize(1.9),
                              }}>
                              2
                          </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                </Swipeout>
              </TouchableOpacity>
            )}></FlatList>
        </View> */}
      </SafeAreaView >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  seacrhbarContainter: {
    backgroundColor: '#F5F5F5',
    height: responsiveHeight(8),
    width: responsiveWidth(100),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  row: {
    flexDirection: 'row',
    top: 0,
    height: 90,
    backgroundColor: 'white',
    width: responsiveWidth(100),
    // backgroundColor: '#f2f2f2',
    padding: 1,
  },
  nameContainer: {
    width: responsiveWidth(100),
    height: '100%',

    justifyContent: 'center',

    backgroundColor: 'white',
    borderBottomColor: '#f2f2f2',
    borderBottomWidth: 1,
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 0,
  },
  nameTxt: {
    fontWeight: '600',
    color: '#383838',
    fontSize: responsiveFontSize(2.4),
    width: 170,
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
  searchInput: {
    padding: 10,
    borderColor: '#CCC',
    borderWidth: 1,
    width: '100%',
    backgroundColor: 'white',
    width: responsiveWidth(80),
    color: 'black'
  },
});

export default ChatList;
