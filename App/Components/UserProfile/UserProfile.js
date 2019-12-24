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
  TextInput,
  Dimensions,
  ActivityIndicator,
  BackHandler,
  RecyclerViewBackedScrollView,
  SafeAreaView,
} from 'react-native';
import firebase from 'firebase';
import {Left, Thumbnail} from 'native-base';
import ImageView from 'react-native-image-view';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import EIcon from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FA from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ImagePicker from 'react-native-image-picker';
import Entypo from 'react-native-vector-icons/Entypo';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {
  getData,
  uploadImage,
  uploadUserImage,
  getAllOfCollection,
} from '../../Backend/Utility';
import {_retrieveData} from '../../Backend/AsyncStore/AsyncFunc';
import ImageResizer from 'react-native-image-resizer';
import ViewMoreText from 'react-native-view-more-text';
import VideoPlayer from 'react-native-video-controls';
import AIcon from 'react-native-vector-icons/AntDesign';
import {signUp} from '../../Backend/Auths';
///ProfileScreen 2 5th Screen
const images = [
  {
    source: {
      uri: 'https://picsum.photos/id/1060/536/354?blur=2',
    },
    title: 'Paris',
    width: 806,
    height: 720,
  },
];
const uri = 'https://randomuser.me/api/portraits/men/36.jpg';
const imageList = [
  {
    src:
      'https://scontent.cdninstagram.com/vp/3fc240dca41408d36cc23f504fe1174e/5C66EC32/t51.2885-15/e35/s320x320/43817886_246662336018913_6991265436514516630_n.jpg',
    width: 320,
    height: 320,
  },
  {
    src:
      'https://scontent.cdninstagram.com/vp/f1d729fe57fa4ddc7c18fa346609cdb8/5C838862/t51.2885-15/e35/s320x320/44348158_2491449144206376_3633417851169311676_n.jpg',
    width: 320,
    height: 167,
  },
  {
    src:
      'https://scontent.cdninstagram.com/vp/b0f56148b7f7d06ff186a51853888b2f/5C84ACC0/t51.2885-15/e35/s320x320/44724241_2191160064490130_1438494317224719529_n.jpg',
    width: 320,
    height: 240,
  },
  {
    src:
      'https://scontent.cdninstagram.com/vp/dcda7878c4a828f0c850b73dc5c6587d/5C728976/t51.2885-15/e35/p320x320/43158355_534503580355624_1875160473904621159_n.jpg',
    width: 320,
    height: 400,
  },
];
class UserProfile extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      datasource: [1, 2, 3, 1, 2, 3],
      data_user: null,
      datasource2: [1, 2],
      loading: true,
      displayIMG: false,
      imageType: null,
      photo: null,
      ImageName: null,
      ImageUrl: null,
      VisionBoard: [],
      Gallery: [],
      userId: '',
      post_data: [],
      timeAgo: 0,
      postDate: '',
      modalVisible: false,
      postTime: '',

    };
  }

  async Upload_Image() {
    let iteratorNum = 0;
    await _retrieveData('user').then(async item => {
      await uploadUserImage(
        this.state.ImageUrl,
        this.state.imageType,
        this.state.ImageName,
        this.state.ImageName,
        'users',
        item,
      );
    });
    let that = this;

    let refreshId = setInterval(function() {
      iteratorNum += 1;
      _retrieveData('imageUploadProgress').then(data => {
        that.setState({uploadProgress: data});
        if (Number(data) >= 100) {
          clearInterval(refreshId);
          alert('Uploaded', 'Profile is updated', [
            {text: 'OK', onPress: () => that.props.navigation.goBack()},
          ]);
        }
        if (data == '-1') {
          clearInterval(refreshId);
          alert('goes wrong', 'Something went wrong', [
            {text: 'OK', onPress: () => that.props.navigation.goBack()},
          ]);
        }
        if (iteratorNum == 120) {
          clearInterval(refreshId);
          alert(
            'To Long TIme',
            'Picture uploading taking too long. Please upload a low resolution picture',
            [{text: 'OK', onPress: () => that.props.navigation.goBack()}],
          );
        }
      });
    }, 1000);
  }

  componentDidMount = async () => {
    await firebase
      .firestore()
      .collection('users')
      .onSnapshot(async () => {
        await _retrieveData('user').then(async result => {
          await getData('users', result).then(res =>
            this.setState({
              data_user: res,
              userId: res.userId,
              loading: false,
            }),
          );
        });
      });
    this.getVisionBoardData();
    this.getGalleryData();
    this.showPost();
  };
  setModalVisible() {
    this.setState({ modalVisible: !this.state.modalVisible });
  }

  async showPost() {
    firebase
      .firestore()
      .collection('News')
      .onSnapshot(async () => {
        let data = await getAllOfCollection('News');
        this.setState({ post_data: data });
      });
  }

  getVisionBoardData = async () => {
    await getData('VisionBoard', this.state.userId).then(res =>
      this.setState({
        VisionBoard: res,
      }),
    );
  };

  getGalleryData = async () => {
    await getData('Gallery', this.state.userId).then(res =>
      this.setState({
        Gallery: res,
      }),
    );
  };

  handleChoosePhoto = () => {
    var options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
      } else if (response.error) {
      } else if (response.customButton) {
        // this.showCamera();
      } else {
        let source = response;
        //let source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.setState(
          {
            photo: source.uri,
            imageType: source.type,
          },
          async () => {
            await ImageResizer.createResizedImage(
              this.state.photo,
              Dimensions.get('window').width,
              Dimensions.get('window').height / 3,
              'JPEG',
              50,
            ).then(resizedImage => {
              this.setState(
                {
                  ImageName: resizedImage.name,
                  ImageUrl: resizedImage.uri,
                },
                () => {
                  this.Upload_Image();
                },
              );
            });
          },
        );
      }
    });
  };

  calculateTime(date1) {
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds

    var uploading_time =
      date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec;

    var diff = Math.round(uploading_time - date1);

    return diff;
  }

  renderViewMore(onPress) {
    return (
      <Text
        onPress={onPress}
        style={{
          fontSize: responsiveFontSize(2.1),
          fontWeight: 'bold',
          color: '#7e7a7a',
        }}>
        View more
      </Text>
    );
  }

  renderViewLess(onPress) {
    return (
      <Text
        onPress={onPress}
        style={{
          fontSize: responsiveFontSize(2.1),
          fontWeight: 'bold',
          color: '#7e7a7a',
        }}>
        View less
      </Text>
    );
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        {this.state.loading ? (
          <ActivityIndicator
            size={'large'}
            color="#32cd32"
            style={{justifyContent: 'center', alignItems: 'center', flex: 1}}
          />
        ) : (
          <View style={{flex: 1}}>
            <View style={{marginBottom: 10}}>
              <Text style={styles.welcome}>Profile</Text>
              <Ionicon
                name="ios-menu"
                size={35}
                color={'#32cd32'}
                onPress={() => this.props.navigation.openDrawer()}
                style={styles.menu}
              />
              {this.state.data_user.profile_picture == null ? (
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
            <ScrollView style={styles.container}>
              <View style={styles.profileContainer}>
                <View
                  style={{
                    height: '55%',
                    width: '100%',
                    backgroundColor: 'white',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Thumbnail
                    large
                    source={{uri: this.state.data_user.profile_picture}}
                    style={{
                      backgroundColor: 'white',
                      borderWidth: StyleSheet.hairlineWidth,
                      borderColor: '#d1dcff',
                      shadowOffset: {width: 0, height: 2},
                      shadowOpacity: 0.5,
                      shadowRadius: 2,
                      elevation: 5,
                    }}
                  />
                </View>
                <View
                  style={{
                    height: responsiveHeight(3),
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Ionicon
                    name="ios-camera"
                    size={30}
                    style={{right: 15, position: 'absolute'}}
                    onPress={this.handleChoosePhoto}
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  />
                </View>
                <View
                  style={{
                    height: '35%',
                    backgroundColor: 'white',
                    justifyContent: 'flex-start',
                  }}>
                  <View
                    style={{
                      backgroundColor: 'white',
                      height: '45%',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        color: '#32cd32',
                        fontSize: responsiveFontSize(2.4),
                        fontWeight: 'bold',
                      }}>
                      {this.state.data_user.name}
                    </Text>
                  </View>
                  <View
                    style={{
                      backgroundColor: 'white',
                      height: '35%',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: responsiveFontSize(2),
                        color: '#8d8c8c',
                      }}>
                      {this.state.data_user.location}
                    </Text>
                  </View>
                </View>
              </View>

              <View
                style={{
                  backgroundColor: '#32cd32',
                  top: 5,
                  alignSelf: 'center',

                  borderRadius: 10,
                  shadowOffset: {width: 0, height: 2},
                  shadowOpacity: 0.5,
                  shadowRadius: 2,
                  elevation: 3,
                  marginBottom: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: responsiveFontSize(2), color: 'white'}}>
                  {this.state.data_user.bio}
                </Text>
              </View>

              <View
                style={{
                  padding: 1,
                  top: 10,
                  alignSelf: 'center',
                  backgroundColor: 'white',
                  height: responsiveHeight(15),
                  width: responsiveWidth(100),
                }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: 'white',
                    height: '30%',
                    paddingHorizontal: 15,
                  }}
                  onPress={() => {
                    if (this.state.data_user.family_member.length > 0) {
                      this.props.navigation.navigate('Family', {
                        item: this.state.data_user.family_member,
                      });
                    } else {
                      this.props.navigation.navigate('Family');
                    }
                  }}>
                  <Text
                    style={{
                      fontSize: responsiveFontSize(2),
                      top: 0,
                      fontWeight: 'bold',
                    }}>
                    {this.state.data_user.name} Family members
                  </Text>
                </TouchableOpacity>

                <View
                  style={{
                    backgroundColor: 'white',
                    height: '70%',
                    top: 0,
                    justifyContent:
                      this.state.data_user.family_member.length == 0
                        ? 'center'
                        : 'flex-start',
                    flexDirection: 'row',
                  }}>
                  {this.state.data_user.family_member.length == 0 ? (
                    <View
                      style={{
                        backgroundColor: 'white',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                      }}>
                      <Text>You Have No Family Members Yet</Text>
                    </View>
                  ) : (
                    <FlatList
                      data={this.state.data_user.family_member}
                      showsHorizontalScrollIndicator={false}
                      horizontal={true}
                      keyExtractor={item => item.id}
                      renderItem={({item, index}) => (
                        <View
                          style={{
                            backgroundColor: 'white',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100%',
                            width: 65,
                          }}>
                          <View
                            style={{
                              backgroundColor: 'white',
                              height: 50,
                              width: 50,
                              borderRadius: 50,
                              shadowOffset: {width: 0, height: 2},
                              shadowOpacity: 0.5,
                              shadowRadius: 2,
                              elevation: 5,
                            }}>
                            <Image
                              source={{
                                uri: item.profile_picture,
                              }}
                              style={{
                                width: '100%',
                                height: '100%',
                                borderRadius: 50,
                              }}
                            />
                          </View>
                          <View
                            style={{
                              paddingHorizontal: 5,
                              backgroundColor: 'white',
                              width: '100%',
                              height: '30%',
                              flex: 1,
                            }}>
                            <Text
                              style={{
                                fontSize: responsiveFontSize(1.2),
                                flex: 1,
                              }}
                              numberOfLines={1}>
                              {item.name}
                            </Text>
                          </View>
                        </View>
                      )}
                    />
                  )}
                </View>
              </View>

              <View
                style={{
                  padding: 1,
                  top: 10,
                  alignSelf: 'center',
                  backgroundColor: 'white',
                  height: responsiveHeight(15),
                  width: responsiveWidth(100),
                }}>
                <View
                  style={{
                    backgroundColor: 'white',
                    height: '30%',
                    paddingHorizontal: 15,
                  }}>
                  <Text
                    style={{
                      fontSize: responsiveFontSize(2),
                      top: 0,
                      fontWeight: 'bold',
                    }}>
                    Joined Groups
                  </Text>
                </View>

                <View
                  style={{
                    backgroundColor: 'white',
                    height: '70%',
                    top: 0,
                    justifyContent:
                      this.state.data_user.groups.length == 0
                        ? 'center'
                        : 'flex-start',
                    flexDirection: 'row',
                  }}>
                  {this.state.data_user.groups.length == 0 ? (
                    <View
                      style={{
                        backgroundColor: 'white',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                      }}>
                      <Text>You Are Not A Member Of Any Group</Text>
                    </View>
                  ) : (
                    <FlatList
                      data={this.state.data_user.groups}
                      showsHorizontalScrollIndicator={false}
                      horizontal={true}
                      keyExtractor={item => item.id}
                      renderItem={({item, index}) => (
                        <View
                          style={{
                            backgroundColor: 'white',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100%',
                            width: 65,
                          }}>
                          <View
                            style={{
                              backgroundColor: 'white',
                              height: 50,
                              width: 50,
                              borderRadius: 50,
                              shadowOffset: {width: 0, height: 2},
                              shadowOpacity: 0.5,
                              shadowRadius: 2,
                              elevation: 5,
                            }}>
                            <Image
                              source={{
                                uri:
                                  'https://picsum.photos/id/1084/536/354?grayscale',
                              }}
                              style={{
                                width: '100%',
                                height: '100%',
                                borderRadius: 50,
                              }}
                            />
                          </View>
                          <View
                            style={{
                              paddingHorizontal: 5,
                              backgroundColor: 'white',
                              width: '100%',
                              height: '30%',
                              flex: 1,
                            }}>
                            <Text
                              style={{
                                fontSize: responsiveFontSize(1.2),
                                flex: 1,
                                textAlign: 'center',
                              }}
                              numberOfLines={1}>
                              Group1
                            </Text>
                          </View>
                        </View>
                      )}
                    />
                  )}
                </View>
              </View>

              <View
                style={{
                  backgroundColor: 'white',
                  height: responsiveHeight(12),
                  width: responsiveWidth(100),
                  marginTop: 10,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    top: 5,
                    height: '100%',
                    backgroundColor: 'white',
                    width: responsiveWidth(90),
                    alignSelf: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 10,
                    shadowOffset: {width: 0, height: 2},
                    shadowOpacity: 0.5,
                    shadowRadius: 2,
                    elevation: 10,
                  }}>
                  <View
                    style={{
                      backgroundColor: 'white',
                      height: '55%',
                      width: '35%',
                      borderRightWidth: StyleSheet.hairlineWidth,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        top: 6,
                        fontSize: responsiveFontSize(2.4),
                        color: '#32cd32',
                      }}>
                      {this.state.data_user.favorite.length}
                    </Text>
                    <Text
                      style={{
                        top: 7,
                        textAlign: 'center',
                        fontSize: responsiveFontSize(1.4),
                        color: '#8d8c8c',
                      }}>
                      Favorite Inspirational videos
                    </Text>
                  </View>

                  <View
                    style={{
                      margin: 0,
                      backgroundColor: 'white',
                      height: '55%',
                      width: '30%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRightWidth: StyleSheet.hairlineWidth,
                    }}>
                    <Text
                      style={{
                        fontSize: responsiveFontSize(2.4),
                        color: '#32cd32',
                      }}>
                      {this.state.data_user.friends.length}
                    </Text>
                    <Text
                      style={{
                        fontSize: responsiveFontSize(1.5),
                        color: '#8d8c8c',
                      }}>
                      Friends
                    </Text>
                  </View>
                  <View
                    style={{
                      backgroundColor: 'white',
                      height: '55%',
                      width: '30%',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: responsiveFontSize(2.4),
                        color: '#32cd32',
                      }}>
                      {this.state.data_user.likes.length}
                    </Text>
                    <Text
                      style={{
                        fontSize: responsiveFontSize(1.5),
                        color: '#8d8c8c',
                      }}>
                      Likes
                    </Text>
                  </View>
                </View>
              </View>

              <View
                style={{
                  backgroundColor: 'white',
                  paddingHorizontal: 10,
                  shadowOffset: {width: 0, height: 2},
                  shadowOpacity: 0.5,
                  shadowRadius: 2,
                  elevation: 5,
                }}>
                <View
                  style={{
                    backgroundColor: 'white',
                    top: 5,

                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: responsiveFontSize(2.5),
                      fontWeight: 'bold',
                    }}>
                    Vision Board
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('VisionBoard')}
                  style={{top: 4, right: 10, position: 'absolute'}}>
                  <AntDesign name="pluscircle" color={'#32cd32'} size={20} />
                </TouchableOpacity>

                <View style={{top: 5}}>
                  {this.state.VisionBoard ? (
                    <FlatList
                      data={this.state.VisionBoard.vision}
                      keyExtractor={item => item.id}
                      renderItem={({item, index}) => (
                        <View
                          style={{
                            paddingVertical: 5,
                            flexDirection: 'row',
                            backgroundColor: 'white',
                            flexWrap: 'wrap',
                            justifyContent: 'space-evenly',
                          }}>
                          <TouchableOpacity
                            style={{
                              height: responsiveHeight(16),
                              width: responsiveHeight(16.5),
                            }}
                            onPress={() =>
                              this.props.navigation.navigate('MoreVisionBoard')
                            }>
                            <Image
                              source={{
                                uri: item,
                              }}
                              style={{height: '100%', width: '100%'}}
                            />
                          </TouchableOpacity>
                        </View>
                      )}
                    />
                  ) : (
                    <View
                      style={{
                        paddingVertical: 5,
                        flexDirection: 'row',
                        backgroundColor: 'white',

                        justifyContent: 'center',
                        height: responsiveHeight(10),
                        marginTop: responsiveHeight(4),
                      }}>
                      <Text>There nothing in your Vision Board!</Text>
                    </View>
                  )}
                </View>
              </View>

              <View>
                <View style={{height: 40, padding: 10, marginTop: 10}}>
                  <Text
                    style={{
                      fontSize: responsiveFontSize(2.5),
                      fontWeight: 'bold',
                    }}>
                    Gallery
                  </Text>
                </View>
                {this.state.Gallery ? (
                  <FlatList
                    data={this.state.Gallery.gallery}
                    keyExtractor={item => item.id}
                    renderItem={({item, index}) => (
                      <View
                        style={{
                          paddingVertical: 5,
                          flexDirection: 'row',
                          backgroundColor: 'white',
                          flexWrap: 'wrap',
                          justifyContent: 'space-evenly',
                        }}>
                        <TouchableOpacity
                          style={{
                            height: responsiveHeight(16),
                            width: responsiveHeight(16.5),
                          }}
                          onPress={() =>
                            this.props.navigation.navigate('MoreGallery')
                          }>
                          <Image
                            source={{
                              uri: item,
                            }}
                            style={{height: '100%', width: '100%'}}
                          />
                        </TouchableOpacity>
                      </View>
                    )}
                  />
                ) : (
                  <View
                    style={{
                      paddingVertical: 5,
                      flexDirection: 'row',
                      backgroundColor: 'white',

                      justifyContent: 'center',
                      height: responsiveHeight(10),
                      marginTop: responsiveHeight(4),
                    }}>
                    <Text>There nothing in your Gallery!</Text>
                  </View>
                )}
              </View>

              <FlatList
                data={this.state.post_data}
                keyExtractor={item => item.id}
                renderItem={({item}) => (
                  <View
                    style={{
                      shadowColor: '#000',
                      shadowOffset: {width: 0, height: 2},
                      shadowOpacity: 0.5,
                      shadowRadius: 2,
                      elevation: 2,
                      backgroundColor: '#eee',
                      width: '100%',

                      borderRadius: 25,
                      paddingVertical: 0,
                      paddingHorizontal:
                        item.imageUrl || item.videoUrl ? 10 : 10,
                      backgroundColor: 'white',
                      marginBottom: responsiveHeight(2),
                    }}>
                    <View
                      style={{
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.5,
                        shadowRadius: 2,
                        elevation: 2,
                        backgroundColor: '#eee',
                        width: '100%',

                        borderRadius: 25,
                        paddingVertical: 0,
                        paddingHorizontal:
                          item.imageUrl || item.videoUrl ? 10 : 10,
                        backgroundColor: 'white',
                        marginBottom: responsiveHeight(2),
                      }}>
                      {/* {console.log('ITEMM:::', item)} */}
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
                        <Image
                          source={{
                            uri: item.profile_image,
                          }}
                          style={{width: 60, height: 60, borderRadius: 60}}
                        />
                      </View>

                        </View>

                        <View
                          style={{
                            justifyContent: 'center',
                            alignItems: 'flex-start',
                            width: '60%',
                            flexDirection: 'column',
                            marginLeft: responsiveWidth(2)
                          }}>
                          <Text>
                          {item.user_name}
                        </Text>
                      </View>

                      <View
                        style={{
                          width: '99%',
                          paddingHorizontal: 20,
                          marginBottom: responsiveHeight(2),
                          backgroundColor: 'white',
                          marginBottom: 3,
                          marginTop: responsiveHeight(2)
                        }}>
                        {/* <ScrollView> */}
                        <ViewMoreText
                          numberOfLines={3}
                          renderViewMore={this.renderViewMore}
                          renderViewLess={this.renderViewLess}
                          textStyle={{
                            fontSize: responsiveFontSize(2.1),
                            fontWeight: '600',
                            color: '#7e7a7a',
                            flexWrap: 'wrap',
                          }}>
                          {this.calculateTime(item.uploading_time)}
                        </ViewMoreText>
                      </View>
                      <View
                        style={{
                          width: '100%',
                          height:
                            item.imageUrl || item.videoUrl
                              ? responsiveHeight(30)
                              : null,
                        }}>
                        {item.imageUrl ? (
                          <View
                            style={{
                              justifyContent: 'center',
                              alignItems: 'center',
                              backgroundColor: 'white',
                              width: '99%',
                              height: '100%',
                              flexDirection: 'row',
                              marginBottom: 1,
                            }}>
                            {this.state.showImage && this.state.imageFooter && (
                              <ImageView
                                images={[
                                  {
                                    source: {
                                      uri: this.state.showImage,
                                    },

                                    width: 1200,
                                    height: 800,
                                  },
                                ]}
                                isVisible={this.state.displayIMG}
                                isSwipeCloseEnabled={false}
                                onClose={() => {
                                  this.setState({ displayIMG: false }, () => {
                                    this.setState({ showImage: null }, () => {
                                      this.setState({ itemFooter: null });
                                    });
                                  });
                                }}
                                renderFooter={currentImage => (
                                  <View
                                    style={{
                                      marginBottom: responsiveHeight(4),
                                      alignItems: 'center',
                                    }}>
                                    <Text style={{ fontSize: 20, color: 'white' }}>
                                      {this.state.imageFooter}
                                    </Text>
                                  </View>
                                )}
                              />
                            )}

                            <TouchableOpacity
                              style={{
                                height: responsiveHeight(30),
                                width: responsiveHeight(40),
                              }}
                              onPress={() => {
                                this.setState({ displayIMG: true }, () => {
                                  this.setState(
                                    { showImage: item.imageUrl },
                                    () => {
                                      this.setState({
                                        imageFooter: item.description,
                                      });
                                    },
                                  );
                                });
                              }}>
                              <Image
                                style={{
                                  width: '100%',
                                  height: '100%',
                                }}
                                source={{ uri: item.imageUrl }}
                                resizeMode={'cover'}
                              />
                            </TouchableOpacity>
                          </View>
                        ) : item.videoUrl ? (
                          <View
                            style={{
                              justifyContent: 'center',
                              alignItems: 'center',
                              backgroundColor: 'white',
                              width: '99%',
                              height: '100%',
                              flexDirection: 'row',
                              marginBottom: 1,
                            }}>
                            <VideoPlayer
                              source={{
                                uri: item.videoUrl,
                              }}
                              navigator={this.props.navigator}
                              disableBack={true}
                              disableVolume={true}
                              disableFullscreen={true}
                              paused={true}
                            />
                        </View>
                      ) : item.videoUrl ? (
                        <View
                          style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: 'white',
                            width: '99%',
                            height: '100%',
                            flexDirection: 'row',
                            marginBottom: 1,
                          }}>
                          <VideoPlayer
                            source={{
                              uri: item.videoUrl,
                            }}
                            navigator={this.props.navigator}
                            disableBack={true}
                            disableVolume={true}
                            disableFullscreen={true}
                            paused={true}
                          />
                        </View>
                      ) : null}
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        paddingHorizontal: 0,
                        backgroundColor: 'white',

                        // alignItems: item.imageUrl || item.videoUrl ?null: 'center',
                        // alignSelf: item.imageUrl || item.videoUrl ?null: 'center',
                        marginHorizontal: 10,
                        marginVertical: 10,
                        alignItems: 'center',
                        justifyContent: 'space-evenly',
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}>
                        <TouchableOpacity>
                          <FontAwesome
                            name="comment-o"
                            size={30}
                            color="#32cd32"
                            onPress={() => {
                              this.setModalVisible();
                              this.setState({_id: item.post_id});
                            }}
                          />
                        </TouchableOpacity>
                        <Text
                          style={{
                            marginHorizontal: 10,
                            fontWeight: '400',
                            top: 5,
                            color: '#32cd32',
                            fontSize: responsiveFontSize(1.6),
                          }}>
                          0{/* {item.comments.length} */}
                        </Text>
                      </View>
                      <View style={styles.separator} />
                      <View
                        style={{
                          flexDirection: 'row',
                          paddingHorizontal: 0,
                          backgroundColor: 'white',

                          // alignItems: item.imageUrl || item.videoUrl ?null: 'center',
                          // alignSelf: item.imageUrl || item.videoUrl ?null: 'center',
                          marginHorizontal: 10,
                          marginVertical: 10,
                          alignItems: 'center',
                          justifyContent: 'space-evenly',
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}>
                          <TouchableOpacity>
                            <FontAwesome
                              name="comment-o"
                              size={30}
                              color="#32cd32"
                              onPress={() => {
                                this.setModalVisible();
                                this.setState({ _id: item.post_id })
                              }}
                            />
                          </TouchableOpacity>
                          <Text
                            style={{
                              marginHorizontal: 10,
                              fontWeight: '400',
                              top: 5,
                              color: '#32cd32',
                              fontSize: responsiveFontSize(1.6),
                            }}>
                            0{/* {item.comments.length} */}
                          </Text>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            flexWrap: 'wrap',

                            justifyContent: 'center',
                            alignItems: 'flex-end',
                          }}>
                          <TouchableOpacity>
                            <AIcon
                              name={this.state.hit_like ? 'like1' : 'like2'}
                              size={28}
                              color={'#32cd32'}
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
                              alignItems: 'center',
                              color: '#32cd32',

                              fontSize: responsiveFontSize(1.6),
                            }}>
                            {/* {item.like.length} */}0
                        </Text>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            flexWrap: 'wrap',

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
                              name={
                                this.state.hit_favorite
                                  ? 'md-heart'
                                  : 'md-heart-empty'
                              }
                              size={30}
                              color={'#32cd32'}
                              style={{ top: 1 }}
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
                    </View>
                  </View>
                )}
              />
            </ScrollView>
          </View>
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
  profileContainer: {
    width: responsiveWidth(100),
    height: responsiveHeight(22),
    backgroundColor: 'white',
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
  welcome: {
    fontSize: responsiveFontSize(3.8),
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 7,
  },

  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
    marginTop: responsiveHeight(3)
  },
});

export default UserProfile;
