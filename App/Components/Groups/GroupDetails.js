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
  Dimensions,
  TextInput,
  BackHandler,
  RecyclerViewBackedScrollView,
  SafeAreaView,
} from 'react-native';
import {Left, Thumbnail} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import EIcon from 'react-native-vector-icons/Entypo';

import AIcon from 'react-native-vector-icons/AntDesign';
import Ionicon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FIcon from 'react-native-vector-icons/FontAwesome';

import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {GroupPost} from '../../Backend/Create/GroupPost';
import ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import {
  uploadImage,
  uploadVideo,
  getAllOfCollection,
} from '../../Backend/Utility';
import {_retrieveData} from '../../Backend/AsyncStore/AsyncFunc';
import AsyncStorage from '@react-native-community/async-storage';
import firebase from 'firebase';
import Entypo from 'react-native-vector-icons/Entypo';
import VideoPlayer from 'react-native-video-controls';

// import { formatResultsErrors } from 'jest-message-util';
///Enterprneure Corner Gallary
const uri = 'https://randomuser.me/api/portraits/men/85.jpg';
class GroupDetails extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      datasource: [1, 2, 3],
      description: '',
      uploading_time: '',
      comment: [],
      like: [],
      favorite: [],
      file: null,
      item: this.props.navigation.state.params.item,
      photo: null,
      imageType: null,
      ImageName: null,
      ImageUrl: null,
      videoPath: null,
      videoType: null,
      videoName: null,
      loading: true,
      post_data: [],
    };
  }

  componentDidMount = async () => {
    await firebase
      .firestore()
      .collection('GroupPost')
      .onSnapshot(async () => {
        let data = await getAllOfCollection('GroupPost');
        this.setState({post_data: data, loading: false});
        console.log(data);
        console.log('\n');
      });
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
  };

  handlechooseVideo = () => {
    const options = {
      title: 'Select video',
      mediaType: 'video',

      quality: 1,
    };

    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
      } else if (response.error) {
      } else if (response.customButton) {
      } else {
        this.setState({
          videoPath: response.uri,
          videoType: 'mp4',
          videoName: response.path,
        });
      }
    });
  };

  upload_Video = async () => {
    var parts = this.state.videoName.split('/');
    var lastSegment = parts.pop() || parts.pop(); // handle potential trailing slash
    let iteratorNum = 0;
    await _retrieveData('ref').then(async item => {
      await uploadVideo(
        this.state.videoPath,
        this.state.videoType,
        lastSegment,
        'video',
        'GroupPost',
        item,
      );
      console.log('i m here');
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
    AsyncStorage.removeItem('doc_id');
  };

  async Upload_Image() {
    let iteratorNum = 0;
    await _retrieveData('ref').then(async item => {
      console.log('refffffffff', item);
      await uploadImage(
        this.state.ImageUrl,
        this.state.imageType,
        this.state.ImageName,
        this.state.ImageName,
        'GroupPost',
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
            this.setState({
              ImageName: resizedImage.name,
              ImageUrl: resizedImage.uri,
            });
          });
        },
      );
    });
  };

  render() {
    const {
      description,
      uploading_time,
      comment,
      like,
      favorite,
      file,
      item,
    } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View>
            <Text style={styles.welcome}>Group Details</Text>
            <FIcon
              name="chevron-left"
              size={25}
              color={'#32cd32'}
              onPress={() => this.props.navigation.goBack()}
              style={styles.menu}
            />
            <EIcon
              name="dots-three-vertical"
              size={25}
              color={'#32cd32'}
              style={styles.menu1}
              onPress={() => this.props.navigation.navigate('EditGroup')}
            />
          </View>

          <View
            style={{
              marginTop: 10,
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.5,
              shadowRadius: 2,
              elevation: 4,
              width: responsiveWidth(100),
              height: responsiveHeight(40),
              borderRadius: 20,
              backgroundColor: 'white',
              marginBottom: 0,
            }}>
            <View
              style={{
                marginRight: 5,
                marginTop: 5,
                backgroundColor: 'white',
                height: '15%',
                justifyContent: 'center',
                paddingHorizontal: 15,
                paddingBottom: 5,
                borderRadius: 20,
              }}>
              <Text
                style={{
                  fontSize: responsiveFontSize(2.8),
                  fontWeight: '600',
                  color: '#000000',
                }}>
                {this.state.item.group_name}
              </Text>
            </View>

            <View
              style={{backgroundColor: 'white', height: '55%', width: '100%'}}>
              <Image
                source={{uri: item.imageUrl}}
                style={{width: '100%', height: '100%'}}
              />
            </View>

            <View
              style={{
                marginLeft: 2,
                marginRight: 2,
                flexDirection: 'row',
                backgroundColor: 'white',
                height: '25%',
                borderRadius: 20,
              }}>
              <View
                style={{
                  padding: 1,
                  backgroundColor: 'white',
                  width: '40%',
                  height: '100%',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    backgroundColor: 'white',
                    height: '30%',
                    marginLeft: 15,
                  }}>
                  <EvilIcons
                    name="location"
                    size={20}
                    color="green"
                    style={{alignSelf: 'center'}}
                  />
                  <Text
                    style={{
                      fontSize: responsiveFontSize(1.5),
                      fontWeight: '600',
                      color: 'black',
                    }}>
                    {item.group_location}
                  </Text>
                </View>

                <View
                  style={{
                    backgroundColor: 'white',
                    width: '100%',
                    height: '70%',
                    flexDirection: 'row',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      backgroundColor: 'white',
                      width: '70%',
                      height: '100%',
                      alignItems: 'center',
                      marginLeft: 15,
                    }}>
                    <Thumbnail
                      small
                      source={{uri: uri}}
                      style={{
                        marginLeft: 0,
                        borderRadius: 30,
                        shadowOpacity: 0.5,
                        shadowRadius: 2,
                        elevation: 5,
                      }}
                    />
                    <Thumbnail
                      small
                      source={{uri: uri}}
                      style={{
                        marginLeft: -12,
                        borderRadius: 30,
                        shadowOpacity: 0.5,
                        shadowRadius: 2,
                        elevation: 5,
                      }}
                    />
                    <Thumbnail
                      small
                      source={{uri: uri}}
                      style={{
                        marginLeft: -10,
                        borderRadius: 30,
                        shadowOpacity: 0.5,
                        shadowRadius: 2,
                        elevation: 5,
                      }}
                    />
                    <Text
                      style={{
                        fontSize: responsiveFontSize(1.4),
                        fontWeight: '600',
                        color: 'black',
                        alignItems: 'center',
                      }}>
                      {item.group_member.length}
                    </Text>
                    <AIcon name="plus" size={8} color="#000" />
                  </View>
                </View>
              </View>

              <View style={{backgroundColor: 'white', width: '60%'}}>
                <View style={{backgroundColor: 'white', height: '30%'}}>
                  <Text
                    style={{
                      fontSize: responsiveFontSize(1.8),
                      fontWeight: '900',
                      color: 'black',
                    }}>
                    Purpose:
                  </Text>
                </View>
                <View style={{backgroundColor: 'white', height: '70%'}}>
                  <Text
                    style={{
                      fontSize: responsiveFontSize(1.8),
                      fontWeight: '800',
                      color: '#8f8f8f',
                    }}
                    numberOfLines={2}>
                    {item.group_description}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View
            style={{
              borderRadius: 10,
              width: '96%',
              backgroundColor: '',
              height: 90,
              justifyContent: 'space-between',
              elevation: 1,
              alignSelf: 'center',
            }}>
            <TextInput
              value={description}
              onChangeText={description => this.setState({description})}
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
              height: 50,
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
                this.handleChoosePhoto();
              }}>
              <FontAwesome name="camera" size={18} color="#32cd32" style={{}} />

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
                this.handlechooseVideo();
              }}>
              <FontAwesome
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
                GroupPost(
                  description,
                  uploading_time,
                  comment,
                  like,
                  favorite,
                  file,
                ).then(() => {
                  setTimeout(async () => {
                    await this.upload_Video();
                  }, 10000);
                });
              }}>
              <FontAwesome name="upload" size={18} color="white" style={{}} />

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
            data={this.state.post_data}
            keyExtractor={item => item.id}
            renderItem={({item, index}) => (
              <View
                key={index}
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
                  paddingHorizontal: item.imageUrl || item.videoUrl ? 10 : 10,
                  backgroundColor: 'white',
                  marginBottom: responsiveHeight(2),
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
                    {item.profile_picuture == null ? (
                      <Entypo
                        name="user"
                        size={40}
                        color="#d0d0d0dd"
                        style={{width: 60, height: 60, borderRadius: 60}}
                      />
                    ) : (
                      <Image
                        source={{
                          uri: 'https://randomuser.me/api/portraits/men/94.jpg',
                        }}
                        style={{width: 60, height: 60, borderRadius: 60}}
                      />
                    )}
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
                    paddingHorizontal: 20,
                    marginBottom: responsiveHeight(2),
                    backgroundColor: 'white',
                    marginBottom: 3,
                  }}>
                  {/* <ScrollView> */}
                  <Text
                    style={{
                      fontSize: responsiveFontSize(2.1),
                      fontWeight: '600',
                      color: '#7e7a7a',
                      flexWrap: 'wrap',
                    }}
                    numberOfLines={4}>
                    {item.description}
                  </Text>
                </View>
                <View
                  style={{
                    width: '100%',
                    height: responsiveHeight(30),
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
                      <Image
                        style={{
                          width: '100%',
                          height: '100%',
                        }}
                        source={{uri: item.imageUrl}}
                        resizeMode={'cover'}
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
                          uri:
                            'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
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
                      flexWrap: 'wrap',

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
                    marginBottom: responsiveHeight(2),
                    backgroundColor: 'white',
                    flexDirection: 'row',
                    padding: 1,
                    marginHorizontal: 20,
                    // alignItems:'center',
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
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  container1: {
    marginBottom: 15,
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
    marginTop: responsiveHeight(2.5),
    marginLeft: '4%',
    position: 'absolute',
  },
  menu1: {
    width: 10,
    height: 50,
    borderRadius: 42,
    marginTop: responsiveHeight(2.2),
    marginLeft: '90%',
    position: 'absolute',
  },
});

export default GroupDetails;
