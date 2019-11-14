import React, {Component} from 'react';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Dimensions,
  Modal,
  TextInput,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {Thumbnail, Item} from 'native-base';
import FA from 'react-native-vector-icons/Entypo';
import AIcon from 'react-native-vector-icons/AntDesign';
import {jsxAttribute} from '@babel/types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import GlobalConst from '../../Backend/GlobalConst';
import EIcon from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {withNavigationFocus} from 'react-navigation';
import {TouchableOpacity} from 'react-native-gesture-handler';
import firebase from 'firebase';
import ImagePicker from 'react-native-image-picker';
import {
  getAllOfCollection,
  getDocByKeyValue,
  getDocRefByKeyValue,
  getData,
  addToArray,
} from '../../Backend/Utility';
import {_retrieveData} from '../../Backend/AsyncStore/AsyncFunc';

const height = Dimensions.get('screen').height / 3.2;
const width = Dimensions.get('screen').width;

export default class GoodNews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDisplayed: false,
      isDateTimePickerVisible: false,
      post_data: [],
      hit_like: false,
      hit_favorite: false,
      loading: true,
      modalVisible: false,
      comment_data: [],
      datasource: [
        {
          name: 'Woody Allen',
          imageName: 'https://randomuser.me/api/portraits/men/1.jpg',
        },

        {
          name: 'David Jhon ',
          imageName: 'https://randomuser.me/api/portraits/men/79.jpg',
        },
        {
          name: 'Mel Gibson',
          imageName: 'https://randomuser.me/api/portraits/men/13.jpg',
        },

        {
          name: 'Ben Kingsley',
          imageName: 'https://randomuser.me/api/portraits/men/45.jpg',
        },

        {
          name: ' Adrien Brody ',
          imageName: 'https://randomuser.me/api/portraits/men/62.jpg',
        },
        {
          name: 'Ben Stiller',
          imageName: 'https://randomuser.me/api/portraits/men/94.jpg',
        },
      ],
      photo: null,
      uploading_time: '',
      comments_data: [],
    };
  }

  componentDidMount() {
    this.showPost();
    // this.CommentPost();

    const {addListener} = this.props.navigation;
    const {isDisplayed} = this.state;
    const self = this;

    this.listeners = [
      addListener('didFocus', () => {
        if (self.state.isDisplayed !== true) {
          GlobalConst.STORAGE_KEYS.ScreenType = '1';
          self.setState({isDisplayed: true});
        }
      }),
      addListener('willBlur', () => {
        if (self.state.isDisplayed !== false) {
          GlobalConst.STORAGE_KEYS.ScreenType = '1';

          self.setState({isDisplayed: false});
        }
      }),
    ];
    var that = this;
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    that.setState({
      //Setting the value of the date time
      uploading_time:
        date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec,
    });
  }
  setModalVisible() {
    this.setState({modalVisible: !this.state.modalVisible});
  }

  CommentsPost = async item => {
    await _retrieveData('user').then(
      async result =>
        await getData('users', result).then(
          async res =>
            await addToArray('Comments', item, 'comments', {
              comments: this.state.comments_words,
              post_id: item,
              user_id: res.userId,
              user_name: res.name,
              user_image: res.profile_picture,
              time: this.state.uploading_time,
            }),
        ),
    );
  };
  likePost = async item => {
    await _retrieveData('user').then(
      async result =>
        await addToArray('NewsLike', item, 'like', {
          user_id: result,
          post_id: item,
        }),
    );
  };

  favoritePost = async item => {
    await _retrieveData('user').then(
      async result =>
        await addToArray('NewsFavorite', item, 'Favorite', {
          user_id: result,
          post_id: item,
        }),
    );
  };

  async CommentPost(item) {
    let data = await getData('Comments', item);
    this.setState({comment_data: data, loading: false});
    console.log('comment data', this.state.comment_data);
  }
  async showPost() {
    let data = await getAllOfCollection('News');
    this.setState({post_data: data, loading: false});
  }

  handleChoosePhoto = () => {
    var options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        //let source = response;
        // You can also display the image using data:
        let source = response;
        //let source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.setState({
          photo: source,
        });
      }
    });
  };

  render() {
    const uri =
      'https://facebook.github.io/react-native/docs/assets/favicon.png';
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}>
          <View style={{height: '90%'}}>
            <FA
              name="cross"
              size={30}
              color={'#32cd32'}
              style={styles.modalcross}
              onPress={() => {
                this.setModalVisible();
              }}
            />
            <FlatList
              data={this.state.comment_data.comments}
              keyExtractor={item => item.user_id}
              renderItem={({item, index}) => (
                <View
                  key={index}
                  style={{
                    justifyContent: 'space-evenly',
                    shadowColor: '#000',
                    shadowOffset: {width: 0, height: 2},
                    shadowOpacity: 0.5,
                    shadowRadius: 2,
                    elevation: 2,
                    backgroundColor: '#eee',
                    height: responsiveHeight(20),
                    borderRadius: 35,
                    paddingVertical: 0,
                    paddingHorizontal: 10,
                    backgroundColor: 'white',
                    marginHorizontal: 10,
                    marginBottom: 5,
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      top: 2,
                      borderRadius: 25,
                      backgroundColor: 'white',
                      width: '98%',
                      height: 60,
                      flexDirection: 'row',
                      marginBottom: 1,
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        backgroundColor: 'white',
                        width: 60,
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 5,
                        height: 60,
                      }}>
                      {/* <Thumbnail source={{ uri: item.imageName }} /> */}
                      <Image
                        source={{
                          uri: 'https://randomuser.me/api/portraits/men/94.jpg',
                        }}
                        style={{width: 60, height: 60, borderRadius: 60}}
                      />
                    </View>
                    <View
                      style={{
                        marginLeft: 10,
                      }}>
                      <Text
                        style={{
                          fontSize: 20,
                        }}>
                        {item.user_name}
                      </Text>
                      <Text style={{fontSize: 20}}>{item.comments}</Text>
                      <Text>{item.time}</Text>
                    </View>
                  </View>
                </View>
              )}
            />
          </View>
        </Modal>

        <Text style={styles.welcome}>Good News</Text>
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

        <ScrollView style={styles.container1}>
          {this.state.loading ? (
            <ActivityIndicator
              size={'large'}
              color="blue"
              style={{justifyContent: 'center', alignItems: 'center', flex: 1}}
            />
          ) : (
            <View>
              <View
                style={{
                  backgroundColor: '#32cd32',
                  height: responsiveHeight(20),
                  marginBottom: 5,
                }}>
                <View
                  style={{
                    width: '100%',
                    height: '10%',
                    justifyContent: 'center',
                    marginTop: 10,
                  }}>
                  <Text
                    style={{
                      fontSize: responsiveFontSize(2.2),
                      color: 'white',
                      left: 20,
                      fontWeight: 'bold',
                      marginBottom: 5,
                    }}>
                    Great News
                  </Text>
                </View>

                <View
                  style={{width: '100%', height: '80%', flexDirection: 'row'}}>
                  <View style={{width: '20%', alignItems: 'center'}}>
                    <Image
                      source={{
                        uri: 'https://randomuser.me/api/portraits/men/13.jpg',
                      }}
                      style={{width: 50, height: 50, borderRadius: 60, top: 5}}
                    />
                  </View>

                  <View style={{width: '80%'}}>
                    <View
                      style={{
                        width: '100%',
                        height: '30%',
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          fontSize: responsiveFontSize(2.1),
                          color: 'white',
                          left: 0,
                        }}>
                        Mel Gibson just got a promotion!
                      </Text>
                    </View>

                    <View
                      style={{
                        height: '35%',
                        width: '100%',
                        flexDirection: 'row',
                        padding: 1,
                        marginHorizontal: 0,
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}>
                      <TextInput
                        style={{
                          fontSize: 12,
                          paddingHorizontal: 20,
                          padding: 0,
                          height: '80%',
                          backgroundColor: '#dee3e1',
                          width: '80%',
                          borderRadius: 10,
                        }}
                        placeholder="Type something"
                      />
                      <Icon
                        name="send-circle-outline"
                        size={30}
                        style={{
                          marginRight: 20,
                        }}
                        onPress={() => {
                          alert('message');
                        }}
                      />
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        paddingHorizontal: 0,
                        backgroundColor: '#32cd32',
                        height: '25%',
                        alignItems: 'center',
                        width: '88%',
                        marginTop: 5,
                        left: 5,
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          backgroundColor: '#32cd32',
                          flexWrap: 'wrap',
                          width: '25%',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <TouchableOpacity>
                          <Image source={require('../../Assets/clap.png')} />
                        </TouchableOpacity>
                        <Text
                          style={{
                            marginHorizontal: 10,
                            fontWeight: '400',
                            color: 'white',
                            fontSize: responsiveFontSize(1.6),
                          }}>
                          878
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          flexWrap: 'wrap',
                          width: '25%',
                          justifyContent: 'center',
                          alignItems: 'flex-end',
                        }}>
                        <TouchableOpacity>
                          <FontAwesome
                            name="comment-o"
                            size={20}
                            color="white"
                          />
                        </TouchableOpacity>
                        <Text
                          style={{
                            marginHorizontal: 10,
                            fontWeight: '400',
                            color: 'white',
                            fontSize: responsiveFontSize(1.6),
                          }}>
                          878
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          flexWrap: 'wrap',
                          width: '25%',
                          justifyContent: 'center',
                          alignItems: 'flex-end',
                        }}>
                        <TouchableOpacity>
                          <EIcon
                            name="like"
                            size={25}
                            color={this.state.hit_like ? '#32cd32' : '#7e7a7a'}
                            onPress={() => {
                              this.likePost(item.post_id);
                              this.setState({
                                hit_like: !this.state.hit_like,
                              });
                            }}
                          />
                        </TouchableOpacity>
                        <Text
                          style={{
                            marginHorizontal: 10,
                            fontWeight: '400',
                            color: 'white',
                            fontSize: responsiveFontSize(1.6),
                          }}>
                          91
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          flexWrap: 'wrap',
                          width: '25%',
                          justifyContent: 'center',
                          alignItems: 'flex-end',
                          alignItems: 'flex-end',
                        }}>
                        <Text
                          style={{
                            marginHorizontal: 10,
                            fontWeight: '400',
                            color: 'white',
                            fontSize: responsiveFontSize(1.6),
                          }}>
                          878
                        </Text>
                        <TouchableOpacity>
                          <Ionicon name="ios-heart" size={20} color="white" />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
              <FlatList
                data={this.state.post_data}
                keyExtractor={item => item.id}
                renderItem={({item, index}) => (
                  <View
                    key={index}
                    style={{
                      justifyContent: 'space-evenly',
                      shadowColor: '#000',
                      shadowOffset: {width: 0, height: 2},
                      shadowOpacity: 0.5,
                      shadowRadius: 2,
                      elevation: 2,
                      backgroundColor: '#eee',
                      width: '100%',
                      height: responsiveHeight(35),
                      borderRadius: 25,
                      paddingVertical: 0,
                      paddingHorizontal: 10,
                      backgroundColor: 'white',
                      marginBottom: 5,
                    }}>
                    <View
                      style={{
                        top: 2,
                        borderRadius: 25,
                        backgroundColor: 'white',
                        width: '98%',
                        height: 60,
                        flexDirection: 'row',
                        marginBottom: 1,
                      }}>
                      <View
                        style={{
                          backgroundColor: 'white',
                          width: 60,
                          justifyContent: 'center',
                          alignItems: 'center',
                          padding: 5,
                          height: 60,
                        }}>
                        {/* <Thumbnail source={{ uri: item.imageName }} /> */}
                        <Image
                          source={{
                            uri:
                              'https://randomuser.me/api/portraits/men/94.jpg',
                          }}
                          style={{width: 60, height: 60, borderRadius: 60}}
                        />
                      </View>

                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'flex-start',
                          width: '60%',
                        }}>
                        <Text
                          style={{
                            fontSize: responsiveFontSize(3),
                            fontWeight: 'bold',
                          }}>
                          {item.user_name}
                        </Text>
                      </View>
                      <View
                        style={{
                          alignItems: 'center',
                          width: '15%',
                          justifyContent: 'center',
                        }}>
                        <Text
                          style={{
                            fontSize: responsiveFontSize(1.5),
                            fontWeight: '400',
                            color: '#7e7a7a',
                          }}>
                          8h ago
                        </Text>
                      </View>
                    </View>

                    <View
                      style={{
                        width: '99%',
                        backgroundColor: 'white',
                        paddingHorizontal: 20,
                        height: '35%',
                      }}>
                      {/* <ScrollView> */}
                      <Text
                        style={{
                          fontSize: responsiveFontSize(2),
                          fontWeight: '600',
                          color: '#7e7a7a',
                          flexWrap: 'wrap',
                        }}
                        numberOfLines={4}>
                        Once I was drawing a perfect chair for myself in my head
                        but I could not finish her design.. And so I found her!
                        was drawing a perfect chair for myself in my head but I
                        could not finish her design.. And so I found her! Once I
                        was drawing a perfect chair for myself in my head but I
                        could not finish her design.. And so I found her! was
                        drawing a perfect chair for myself in my head but I
                        could not finish her design.. And so I found her!
                      </Text>
                      {/* </ScrollView> */}
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        paddingHorizontal: 0,
                        backgroundColor: 'white',
                        height: '15%',
                        alignItems: 'center',
                        alignSelf: 'center',
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          flexWrap: 'wrap',
                          width: '30%',
                          alignItems: 'flex-end',
                        }}>
                        <TouchableOpacity>
                          <FontAwesome
                            name="comment-o"
                            size={20}
                            color="#7e7a7a"
                            onPress={() => {
                              this.setModalVisible();
                              this.CommentPost(item.post_id);
                            }}
                          />
                        </TouchableOpacity>
                        <Text
                          style={{
                            marginHorizontal: 10,
                            fontWeight: '400',
                            color: '#7e7a7a',
                            fontSize: responsiveFontSize(1.6),
                          }}>
                          0{/* {item.comments.length} */}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          flexWrap: 'wrap',
                          width: '30%',
                          justifyContent: 'center',
                          alignItems: 'flex-end',
                        }}>
                        <TouchableOpacity>
                          <EIcon
                            name="like"
                            size={25}
                            color={this.state.hit_like ? '#32cd32' : '#7e7a7a'}
                            onPress={() =>
                              this.setState({
                                hit_like: !this.state.hit_like,
                              })
                            }
                          />
                        </TouchableOpacity>
                        <Text
                          style={{
                            marginHorizontal: 10,
                            fontWeight: '400',
                            color: '#7e7a7a',
                            fontSize: responsiveFontSize(1.6),
                          }}>
                          {/* {item.like.length} */}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          flexWrap: 'wrap',
                          width: '30%',
                          justifyContent: 'center',
                          alignItems: 'flex-end',
                        }}>
                        <Text
                          style={{
                            marginHorizontal: 10,
                            fontWeight: '400',
                            color: '#7e7a7a',
                            fontSize: responsiveFontSize(1.6),
                          }}>
                          {/* {item.favorite.length} */}
                        </Text>
                        <TouchableOpacity>
                          <Ionicon
                            name="ios-heart"
                            size={20}
                            color={this.state.hit_favorite ? '#32cd32' : null}
                            onPress={() => {
                              this.favoritePost(item.post_id);
                              this.setState({
                                hit_favorite: !this.state.hit_favorite,
                              });
                            }}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>

                    <View
                      style={{
                        height: '18%',
                        backgroundColor: 'white',
                        flexDirection: 'row',
                        padding: 1,
                        marginHorizontal: 20,
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          fontSize: 12,
                          paddingHorizontal: 20,
                          padding: 0,
                          height: '90%',
                          backgroundColor: '#dee3e1',
                          width: '80%',
                          borderRadius: 50,
                          flexDirection: 'row',
                        }}>
                        <TextInput
                          value={this.state.comments_words}
                          onChangeText={values =>
                            this.setState({comments_words: values})
                          }
                          placeholder="Type something">
                          {/* <TextInput style={{ marginHorizontal: 10, alignSelf: 'flex-start' }} placeholder='type something'placeholderStyle={{ fontFamily: "AnotherFont", borderColor: 'red',alignSelf:'center' }} > */}
                        </TextInput>
                        <Ionicon
                          name="ios-camera"
                          size={30}
                          style={{right: 15, position: 'absolute'}}
                          onPress={this.handleChoosePhoto}
                        />
                      </View>
                      {/* </View> */}
                      <View
                        style={{
                          width: '20%',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Icon
                          name="send-circle-outline"
                          size={30}
                          color="#7e7a7a"
                          onPress={() => {
                            this.CommentsPost(item.post_id);
                          }}
                        />
                      </View>
                    </View>
                  </View>
                )}
              />
            </View>
          )}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
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
  container1: {
    marginTop: responsiveHeight(9.5),
  },
});
