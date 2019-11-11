import React, {Component, Fragment} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  FlatList,
} from 'react-native';
import {Left, Thumbnail, Badge} from 'native-base';
import Ionicon from 'react-native-vector-icons/Ionicons';

import Swipeout from 'react-native-swipeout';
import Icon from 'react-native-vector-icons/EvilIcons';
import AIcon from 'react-native-vector-icons/AntDesign';
import EIcon from 'react-native-vector-icons/Entypo';
import FIcon from 'react-native-vector-icons/FontAwesome5';
import MTIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {SearchBar} from 'react-native-elements';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import GlobalConst from '../../Backend/GlobalConst';

// import { formatResultsErrors } from 'jest-message-util';
///Inbox swiplist
const uri = 'https://facebook.github.io/react-native/docs/assets/favicon.png';
const bRightColor = '#fff';
class ChatList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datasource: [1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3],
      datasource2: [1, 2],
      isDisplayed: null,
    };
  }
  componentDidMount() {
    const {addListener} = this.props.navigation;
    const {isDisplayed} = this.state;
    const self = this;

    this.listeners = [
      addListener('didFocus', () => {
        if (self.state.isDisplayed !== true) {
          GlobalConst.STORAGE_KEYS.ScreenType = '5';
          self.setState({isDisplayed: true});
        }
      }),
      addListener('willBlur', () => {
        if (self.state.isDisplayed !== false) {
          GlobalConst.STORAGE_KEYS.ScreenType = '5';

          self.setState({isDisplayed: false});
        }
      }),
    ];
  }

  navigateChart() {
    console.log('Charlist press');
    this.props.navigation.navigate('Login');
  }
  render() {
    const swipeoutBtns = () => [
      {
        //   text: 'Add', Message
        backgroundColor: 'white',
        //   type: 'add',
        // backgroundColor:'#3fee4a',
        component: (
          <TouchableOpacity
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
              style={{top: 2, left: 0, alignSelf: 'center'}}
            />
          </TouchableOpacity>
        ),
        onPress: () => {
          alert('Add');
        },
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
              style={{right: 0, top: -2, alignSelf: 'center'}}
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
              style={{right: 0, alignSelf: 'center'}}
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
      <View style={styles.container}>
        <Text style={styles.welcome}>Inbox</Text>
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
        <View style={styles.seacrhbarContainter}>
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
              alignSelf: 'center',
              left: 20,
            }}
          />
        </View>

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
            data={this.state.datasource}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            keyExtractor={item => item.id}
            renderItem={({item, index}) => (
              <TouchableOpacity
                style={{
                  paddingHorizontal: 5,
                  width: 70,
                  height: '100%',
                  backgroundColor: 'white',
                }}
                onPress={() => this.props.navigation.navigate('Chat')}>
                <View style={{backgroundColor: 'white', height: '70%'}}>
                  <Thumbnail
                    source={{
                      uri: 'https://randomuser.me/api/portraits/men/76.jpg',
                    }}
                    style={{alignSelf: 'center', top: 2, height: 60, width: 60}}
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
                    Jhon
                  </Text>
                </View>
              </TouchableOpacity>
            )}></FlatList>
        </View>
        {/* Swipe List */}

        <View
          style={{
            backgroundColor: 'white',
            width: responsiveWidth(100),
            height: responsiveHeight(70),
          }}>
          <FlatList
            data={this.state.datasource}
            showsHorizontalScrollIndicator={false}
            // horizontal={true}
            keyExtractor={item => item.id}
            renderItem={({item, index}) => (
              <Swipeout
                buttonWidth={105}
                autoClose={true}
                right={swipeoutBtns()}
                style={{borderRadius: 0}}>
                <TouchableOpacity
                  style={styles.row}
                  onPress={() => this.props.navigation.navigate('Chat')}>
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
                      source={require('../../Assets/watch.jpg')}
                      style={{borderRadius: 10, width: '80%', height: '90%'}}
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
                      <View style={{width: '60%', top: 5}}>
                        <Text
                          numberOfLines={1}
                          style={{
                            color: '#363636',
                            flex: 1,
                            fontSize: responsiveFontSize(2.5),
                            fontWeight: '900',
                          }}>
                          Jhon
                        </Text>
                      </View>

                      <View style={{width: '40%'}}>
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
                      <View style={{width: '75%'}}>
                        <Text
                          numberOfLines={1}
                          style={{
                            color: '#656565',
                            fontSize: responsiveFontSize(1.8),
                          }}>
                          Simple text haklsj Jajsk Jasknkajsklnasljkl as
                        </Text>
                      </View>

                      <View style={{width: '25%'}}>
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
            )}></FlatList>
        </View>
      </View>
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
});

export default ChatList;
