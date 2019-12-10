import React, { Component, Fragment } from 'react';
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
  SafeAreaView
} from 'react-native';
import { Left, Thumbnail } from 'native-base';
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
import { getData, uploadImage, uploadUserImage } from '../../Backend/Utility';
import { _retrieveData } from '../../Backend/AsyncStore/AsyncFunc';
import ImageResizer from 'react-native-image-resizer';
import { signUp } from '../../Backend/Auths';
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
    };
  }

  async Upload_Image() {
    let iteratorNum = 0;
    await _retrieveData('user').then(async item => {
      console.log('refffffffff', item);
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

    let refreshId = setInterval(function () {
      iteratorNum += 1;
      _retrieveData('imageUploadProgress').then(data => {
        that.setState({ uploadProgress: data });
        if (Number(data) >= 100) {
          clearInterval(refreshId);
          alert('Uploaded', 'Profile is updated', [
            { text: 'OK', onPress: () => that.props.navigation.goBack() },
          ]);
        }
        if (data == '-1') {
          clearInterval(refreshId);
          alert('goes wrong', 'Something went wrong', [
            { text: 'OK', onPress: () => that.props.navigation.goBack() },
          ]);
        }
        if (iteratorNum == 120) {
          clearInterval(refreshId);
          alert(
            'To Long TIme',
            'Picture uploading taking too long. Please upload a low resolution picture',
            [{ text: 'OK', onPress: () => that.props.navigation.goBack() }],
          );
        }
      });
    }, 1000);
  }

  componentDidMount = async () => {
    await _retrieveData('user').then(async result => {
      await getData('users', result).then(res =>
        this.setState({
          data_user: res,
          loading: false,
        }),
      );
    });
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
    });
    // if (this.state.ImageUrl !== null) {
    //   // console.log('hhhhhh,', this.state.ImageUrl);
    //   // setTimeout(async () => {
    //      this.Upload_Image();
    // //   }, 300);
    // }
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        {this.state.loading ? (
          <ActivityIndicator
            size={'large'}
            color="#32cd32"
            style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}
          />
        ) : (
            <View style={{ flex: 1 }}>
              <View style={{ marginBottom: 10 }}>
                <Text style={styles.welcome}>Profile</Text>
                <Ionicon
                  name="ios-menu"
                  size={35}
                  color={'#32cd32'}
                  onPress={() => this.props.navigation.openDrawer()}
                  style={styles.menu}
                />
                {this.state.data_user.profile_picuture == null ? (
                  <Entypo
                    name="user"
                    size={30}
                    color="#d0d0d0dd"
                    style={styles.menu1}
                  />
                ) : (
                    <Image
                      source={{
                        uri: 'https://randomuser.me/api/portraits/men/85.jpg',
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
                    {this.state.data_user.profile_picuture == null ? (
                      <Entypo name="user" size={40} color="#d0d0d0dd" />
                    ) : (
                        <Thumbnail
                          large
                          source={{ uri: uri }}
                          style={{
                            backgroundColor: 'white',
                            borderWidth: StyleSheet.hairlineWidth,
                            borderColor: '#d1dcff',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.5,
                            shadowRadius: 2,
                            elevation: 5,
                          }}
                        />
                      )}
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
                      style={{ right: 15, position: 'absolute' }}
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
                    height: responsiveHeight(5),
                    width: responsiveWidth(60),
                    borderRadius: 10,
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.5,
                    shadowRadius: 2,
                    elevation: 3,
                    marginBottom: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{ fontSize: responsiveFontSize(2), color: 'white' }}>
                    hdhdhdhdhdhdhdhdhdhd hdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhd
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
                      this.props.navigation.navigate('Family');
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
                          renderItem={({ item, index }) => (
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
                                  shadowOffset: { width: 0, height: 2 },
                                  shadowOpacity: 0.5,
                                  shadowRadius: 2,
                                  elevation: 5,
                                }}>
                                <Image
                                  source={{
                                    uri:
                                      'https://randomuser.me/api/portraits/men/51.jpg',
                                  }}
                                  style={{
                                    width: '100%',
                                    height: '100%',
                                    borderRadius: 50,
                                  }}
                                />
                                }
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
                                  Jhon Louis
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
                          renderItem={({ item, index }) => (
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
                                  shadowOffset: { width: 0, height: 2 },
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
                      shadowOffset: { width: 0, height: 2 },
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
                    top: 10,
                    height: responsiveHeight(40),
                    paddingHorizontal: 10,
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.5,
                    shadowRadius: 2,
                    elevation: 5,
                  }}>
                  <View
                    style={{
                      backgroundColor: 'white',
                      top: 5,
                      height: '10%',
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
                  style={{ top: 4, right: 10, position: 'absolute' }}
                  >
                    <AntDesign
                      name="pluscircle"
                      color={'#32cd32'}
                      size={20}
                      
                    />

                  </TouchableOpacity>

                  <View style={{ top: 5, height: '90%' }}>
                    <View
                      style={{
                        backgroundColor: 'white',
                        height: '65%',
                        flexDirection: 'row',
                        padding: 2,
                      }}>
                      <View
                        style={{
                          backgroundColor: 'white',
                          height: '100%',
                          width: '30%',
                        }}>
                        <Image
                          source={require('../../Assets/watch.jpg')}
                          style={{ height: '100%', width: '100%' }}
                        />
                      </View>
                      <View
                        style={{
                          backgroundColor: 'white',
                          height: '100%',
                          width: '70%',
                        }}>
                        <View
                          style={{
                            height: '40%',
                            width: '100%',
                            backgroundColor: 'white',
                            flexDirection: 'row',
                            justifyContent: 'space-evenly',
                          }}>
                          <View style={{ height: '100%', width: '55%' }}>
                            <Image
                              source={require('../../Assets/groupsIMG.jpg')}
                              style={{ height: '100%', width: '100%' }}
                            />
                          </View>

                          <View
                            style={{
                              backgroundColor: 'white',
                              height: '100%',
                              width: '40%',
                            }}>
                            <Image
                              source={require('../../Assets/watch.jpg')}
                              style={{ height: '100%', width: '100%' }}
                            />
                          </View>
                        </View>

                        <View
                          style={{
                            height: '60%',
                            width: '100%',
                            backgroundColor: 'white',
                            flexDirection: 'row',
                            justifyContent: 'space-evenly',
                          }}>
                          <View style={{ height: '100%', width: '45%' }}>
                            <Image
                              source={require('../../Assets/groupsIMG.jpg')}
                              style={{ height: '100%', width: '100%' }}
                            />
                          </View>

                          <View
                            style={{
                              backgroundColor: 'white',
                              height: '100%',
                              width: '20%',
                            }}>
                            <Image
                              source={require('../../Assets/watch.jpg')}
                              style={{ height: '100%', width: '100%' }}
                            />
                          </View>

                          <View style={{ height: '100%', width: '30%' }}>
                            <Image
                              source={require('../../Assets/groupsIMG.jpg')}
                              style={{ height: '100%', width: '100%' }}
                            />
                          </View>
                        </View>
                      </View>
                    </View>

                    <View
                      style={{
                        backgroundColor: 'white',
                        height: '30%',
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                      }}>
                      <View style={{ height: '100%', width: '38%' }}>
                        <Image
                          source={require('../../Assets/watch.jpg')}
                          style={{ height: '100%', width: '100%' }}
                        />
                      </View>
                      <View style={{ height: '100%', width: '20%' }}>
                        <Image
                          source={require('../../Assets/groupsIMG.jpg')}
                          style={{ height: '100%', width: '100%' }}
                        />
                      </View>
                      <View style={{ height: '100%', width: '40%' }}>
                        <Image
                          source={require('../../Assets/watch.jpg')}
                          style={{ height: '100%', width: '100%' }}
                        />
                      </View>
                    </View>
                  </View>
                </View>
                <View>
                  <View style={{ height: 40, padding: 10, marginTop: 10 }}>
                    <Text
                      style={{
                        fontSize: responsiveFontSize(2.5),
                        fontWeight: 'bold',
                      }}>
                      Gallery
                  </Text>
                  </View>
                  <FlatList
                    data={[1, 2]}
                    keyExtractor={item => item.id}
                    renderItem={({ item, index }) => (
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
                            this.props.navigation.navigate('UserGallery')
                          }>
                          <Image
                            source={{
                              uri: 'https://picsum.photos/id/1060/536/354?blur=2',
                            }}
                            style={{ height: '100%', width: '100%' }}
                          />
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={{
                            height: responsiveHeight(16),
                            width: responsiveHeight(16.5),
                          }}
                          onPress={() =>
                            this.props.navigation.navigate('UserGallery')
                          }>
                          <Image
                            source={{
                              uri: 'https://picsum.photos/id/1060/536/354?blur=2',
                            }}
                            style={{ height: '100%', width: '100%' }}
                          />
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={{
                            height: responsiveHeight(16),
                            width: responsiveHeight(16.5),
                          }}
                          onPress={() =>
                            this.props.navigation.navigate('UserGallery')
                          }>
                          <Image
                            source={{
                              uri: 'https://picsum.photos/id/1060/536/354?blur=2',
                            }}
                            style={{ height: '100%', width: '100%' }}
                          />
                        </TouchableOpacity>
                      </View>
                    )}
                  />
                </View>

                <View
                  style={{
                    borderRadius: 10,
                    width: '96%',
                    backgroundColor: '',
                    height: responsiveHeight(12),
                    justifyContent: 'space-between',
                    elevation: 1,
                    alignSelf: 'center',
                  }}>
                  <TextInput
                    multiline={true}
                    numberOfLines={6}
                    style={{
                      textAlignVertical: 'top',
                      fontSize: responsiveFontSize(2),
                      height: '100%',
                      width: '100%',
                      paddingHorizontal: 10,
                    }}
                    placeholder={'Post Something'}
                  />
                </View>
                <View
                  style={{
                    top: 3,
                    height: responsiveHeight(6),
                    width: '96%',
                    flexDirection: 'row',
                    alignSelf: 'center',
                    borderRadius: 10,
                    elevation: 2,
                    justifyContent: 'space-evenly',
                  }}>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      backgroundColor: '#ffffff',
                      width: '33%',
                      height: '100%',
                      borderRadius: 5,
                      justifyContent: 'center',
                      alignItems: 'center',
                      elevation: 1,
                    }}
                    onPress={() => {
                      alert('Posted');
                    }}>
                    <FA name="camera" size={18} color="#32cd32" style={{}} />

                    <Text
                      style={{
                        marginLeft: 5,
                        fontSize: responsiveFontSize(1.8),
                        color: '#32cd32',
                      }}>
                      Image
                  </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      backgroundColor: '#ffffff',
                      width: '33%',
                      height: '100%',
                      borderRadius: 5,
                      justifyContent: 'center',
                      alignItems: 'center',
                      elevation: 1,
                    }}
                    onPress={() => {
                      alert('Posted');
                    }}>
                    <FA
                      name="video-camera"
                      size={18}
                      color="#32cd32"
                      style={{}}
                    />

                    <Text
                      style={{
                        marginLeft: 5,
                        fontSize: responsiveFontSize(1.8),
                        color: '#32cd32',
                      }}>
                      Video
                  </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      backgroundColor: '#32cd32',
                      width: '33%',
                      height: '100%',
                      borderRadius: 5,
                      justifyContent: 'center',
                      alignItems: 'center',
                      elevation: 1,
                    }}
                    onPress={() => {
                      alert('Posted');
                    }}>
                    <FA name="upload" size={18} color="white" style={{}} />

                    <Text
                      style={{
                        marginLeft: 5,
                        fontSize: responsiveFontSize(1.8),
                        color: 'white',
                      }}>
                      Post
                  </Text>
                  </TouchableOpacity>
                </View>

                <FlatList
                  data={this.state.datasource}
                  keyExtractor={item => item.id}
                  renderItem={({ item, index }) => (
                    <View
                      key={index}
                      style={{
                        justifyContent: 'space-evenly',
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
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
                          height: '25%',
                          flexDirection: 'row',
                          marginBottom: 1,
                        }}>
                        <View
                          style={{
                            backgroundColor: 'white',
                            width: '25%',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: 1,
                            height: 65,
                          }}>
                          {/* <Thumbnail source={{ uri: item.imageName }} /> */}
                          <Image
                            source={{ uri: item.imageName }}
                            style={{ width: 60, height: 60, borderRadius: 60 }}
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
                            {item.name}
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
                          paddingHorizontal: 20,
                          backgroundColor: 'white',
                          height: '15%',
                          alignItems: 'center',
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            width: '25%',
                            justifyContent: 'center',
                            alignItems: 'flex-end',
                          }}>
                          <TouchableOpacity>
                            <Image source={require('../../Assets/clap.png')} />
                          </TouchableOpacity>
                          <Text
                            style={{
                              marginHorizontal: 10,
                              fontWeight: '400',
                              color: '#7e7a7a',
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
                              color="#7e7a7a"
                            />
                          </TouchableOpacity>
                          <Text
                            style={{
                              marginHorizontal: 10,
                              fontWeight: '400',
                              color: '#7e7a7a',
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
                            <EIcon name="like" size={25} color="#7e7a7a" />
                          </TouchableOpacity>
                          <Text
                            style={{
                              marginHorizontal: 10,
                              fontWeight: '400',
                              color: '#7e7a7a',
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
                              color: '#7e7a7a',
                              fontSize: responsiveFontSize(1.6),
                            }}>
                            878
                        </Text>
                          <TouchableOpacity>
                            <Ionicon name="ios-heart" size={20} color="#32cd32" />
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
                        <TextInput
                          style={{
                            fontSize: 12,
                            paddingHorizontal: 20,
                            padding: 0,
                            height: '90%',
                            backgroundColor: '#dee3e1',
                            width: '80%',
                            borderRadius: 50,
                          }}
                          placeholder="Type something">
                          {/* <TextInput style={{ marginHorizontal: 10, alignSelf: 'flex-start' }} placeholder='type something'placeholderStyle={{ fontFamily: "AnotherFont", borderColor: 'red',alignSelf:'center' }} > */}
                        </TextInput>
                        {/* </View> */}
                        <View
                          style={{
                            width: '20%',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Icon
                            name="message"
                            size={20}
                            color="#7e7a7a"
                            onPress={() => {
                              alert('message');
                            }}
                          />
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
    backgroundColor: 'white',
    width: responsiveWidth(100),
    height: responsiveHeight(100),
    marginBottom: 10,
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
});

export default UserProfile;
