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
  BackHandler,
  RecyclerViewBackedScrollView,
  SafeAreaView
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
    };
  }

  componentDidMount = () => {
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
        'News',
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
    await _retrieveData('user').then(async item => {
      console.log('refffffffff', item);
      await uploadImage(
        this.state.ImageUrl,
        this.state.imageType,
        this.state.ImageName,
        this.state.ImageName,
        'Create_Group',
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
            height: '12%',
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
            height: '5%',
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
              );
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

        <View
          style={{
            marginTop: 10,
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
                source={{uri: uri}}
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
                style={{fontSize: responsiveFontSize(3), fontWeight: 'bold'}}>
                ABC
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
              Once I was drawing a perfect chair for myself in my head but I
              could not finish her design.. And so I found her! was drawing a
              perfect chair for myself in my head but I could not finish her
              design.. And so I found her! Once I was drawing a perfect chair
              for myself in my head but I could not finish her design.. And so I
              found her! was drawing a perfect chair for myself in my head but I
              could not finish her design.. And so I found her!
            </Text>
            {/* </ScrollView> */}
          </View>

          <View
            style={{
              flexDirection: 'row',
              //   paddingHorizontal: 15,
              backgroundColor: 'white',
              height: '15%',
              alignItems: 'center',
              justifyContent: 'space-evenly',
            }}>
            {/*}
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                width: '25%',
                justifyContent: 'center',
                alignItems: 'flex-end',
              }}>
              <TouchableOpacity>
                <FontAwesome name="comment-o" size={20} color="#7e7a7a" />
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
            </View> */}
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                width: '25%',
                justifyContent: 'center',
                alignItems: 'flex-end',
              }}>
              <TouchableOpacity>
                <FontAwesome name="comment-o" size={20} color="#7e7a7a" />
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
                <EvilIcons name="like" size={25} color="#7e7a7a" />
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
