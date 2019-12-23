import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  Dimensions,
  FlatList,
  TextInput,
  BackHandler,
  RecyclerViewBackedScrollView,
  SafeAreaView,
} from 'react-native';
import {Left, Thumbnail} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FA from 'react-native-vector-icons/FontAwesome';
import EIcon from 'react-native-vector-icons/EvilIcons';
import AIcon from 'react-native-vector-icons/AntDesign';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import Ionicon from 'react-native-vector-icons/Ionicons';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {
  ScrollableTabView,
  DefaultTabBar,
  ScrollableTabBar,
} from '@valdio/react-native-scrollable-tabview';
import ImageView from 'react-native-image-view';
import {_retrieveData} from '../../Backend/AsyncStore/AsyncFunc';
import {
  getData,
  uploadFamilyPostImage,
  uploadFamilyVideo,
} from '../../Backend/Utility';
import ImagePicker from 'react-native-image-picker';
import SwitchToggle from 'react-native-switch-toggle';
import Entypo from 'react-native-vector-icons/Entypo';
import ImageResizer from 'react-native-image-resizer';

const height = Dimensions.get('screen').height / 3;
const width = Dimensions.get('screen').width;
///Company Profile  5th Screen
const uri = 'https://facebook.github.io/react-native/docs/assets/favicon.png';

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

class FamilyList extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      datasource: [1, 2, 3, 1, 2, 3],
      datasource2: [1, 2],
      datasource3: [10, 11, 12],
      displayIMG: false,
      data: [
        {
          id: 3,
          image: 'https://picsum.photos/536/354',
          name: 'Cricket',
          countMembers: 51,
          members: [
            'https://randomuser.me/api/portraits/women/3.jpg',
            'https://randomuser.me/api/portraits/men/68.jpg',
            'https://randomuser.me/api/portraits/women/3.jpg',
            'https://randomuser.me/api/portraits/men/68.jpg',
            'https://randomuser.me/api/portraits/men/68.jpg',
            'https://bootdey.com/img/Content/avatar/avatar4.png',
          ],
        },
        {
          id: 2,
          image: 'https://picsum.photos/536/354',
          name: 'Football',
          countMembers: 10,
          members: [
            'https://randomuser.me/api/portraits/women/3.jpg',
            'https://randomuser.me/api/portraits/men/68.jpg',
            'https://randomuser.me/api/portraits/women/3.jpg',
          ],
        },
        {
          id: 4,
          image: 'https://picsum.photos/536/354',
          name: 'Hike',
          countMembers: 58,
          members: [
            'https://randomuser.me/api/portraits/women/3.jpg',
            'https://randomuser.me/api/portraits/men/68.jpg',
            'https://randomuser.me/api/portraits/women/3.jpg',
            'https://randomuser.me/api/portraits/men/68.jpg',
          ],
        },
      ],
      imgUrl: '',
      data_user: null,
      uname: '',
      imageType: '',
      photo: '',
      ImageName: '',
      videoPath: '',
      videoType: '',
      videoName: '',
      ImageUrl: '',
      uploading_time: '',
      description: '',
      like: [],
      favorite: [],
      view: [],
      familyName: '',
    };
  }

  renderGroupMembers = group => {
    if (group.members) {
      return (
        <View style={styles.groupMembersContent}>
          {group.members.map((prop, key) => {
            return (
              <Image
                key={key}
                style={styles.memberImage}
                source={{uri: prop}}
              />
            );
          })}
        </View>
      );
    }
    return null;
  };

  componentDidMount() {
    this.userData();
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

  userData = async () => {
    await _retrieveData('user').then(async result => {
      let res = await getData('users', result);
      this.setState({
        data_user: res,
        imgUrl: res.profile_picture,
        uname: res.name,
      });
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
            this.setState({
              ImageName: resizedImage.name,
              ImageUrl: resizedImage.uri,
            });
          });
        },
      );
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
        console.log('response.uri', response.uri);
        this.setState({
          videoPath: response.uri,
          videoType: 'mp4',
          videoName: response.path,
        });
      }
    });
  };

  familyPost = () => {
    const {
      uploading_time,
      like,
      favorite,
      description,
      view,
      imageType,
      ImageName,
      ImageUrl,
      photo,
      videoName,
      videoPath,
      videoType,
      familyName,
    } = this.state;

    _retrieveData('user').then(async item => {
      await getData('users', item).then(async data => {
        if (ImageUrl || imageType !== '') {
          let iteratorNum = 0;
          uploadFamilyPostImage(
            ImageUrl,
            imageType,
            ImageName,
            ImageName,
            'familypost',
            item,
            data.name,
            data.profile_picture,
            familyName,
            view,
            like,
            favorite,
            uploading_time,
            description,
          );
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
        } else {
          var parts = this.state.videoName.split('/');
          var lastSegment = parts.pop() || parts.pop(); // handle potential trailing slash
          let iteratorNum = 0;
          console.log('vedios', videoName, videoPath, videoType, lastSegment);
          uploadFamilyVideo(
            videoPath,
            videoType,
            lastSegment,
            lastSegment,
            'familyPost',
            item,
            data.name,
            data.profile_picture,
            familyName,
            view,
            like, 
            favorite,
            uploading_time,
            description,
          );
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
      });
    });
  };

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <ScrollView style={{flex: 1}}>
          <View style={{marginBottom: 10}}>
            <Text style={styles.welcome}>My Family</Text>
            <Ionicon
              name="ios-menu"
              size={35}
              color={'#32cd32'}
              onPress={() => this.props.navigation.openDrawer()}
              style={styles.menu}
            />
            <Image source={{uri: this.state.imgUrl}} style={styles.menu1} />
          </View>

          <ScrollView>
            <View
              style={{
                backgroundColor: 'white',
                height: responsiveHeight(40),
                width: responsiveWidth(100),
              }}>
              <Image
                source={require('../../Assets/watch.jpg')}
                style={{width: '100%', height: '100%', borderRadius: 0}}
              />
            </View>

            <View
              style={{
                backgroundColor: 'white',
                height: responsiveHeight(20),
                width: responsiveWidth(100),
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.5,
                shadowRadius: 2,
                elevation: 1,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  height: '15%',
                  marginTop: 10,
                  backgroundColor: 'white',
                  justifyContent: 'space-between',
                }}>
                <View style={{width: '60%', height: '100%'}}>
                  <TouchableOpacity
                    style={{
                      alignSelf: 'center',
                      backgroundColor: 'white',
                      justifyContent: 'center',
                      alignItems: 'flex-start',
                    }}
                    onPress={() => {
                      this.props.navigation.navigate('Family');
                    }}>
                    <Text
                      style={{
                        fontSize: responsiveFontSize(3),
                        color: '#7e7474',
                      }}>
                      {this.state.uname}'s Family
                    </Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={{
                    width: '30%',
                    height: '100%',
                    backgroundColor: '#32cd32',
                    justifyContent: 'center',
                    alignItems: 'center',
                    right: 10,
                    borderRadius: 10,
                  }}
                  onPress={() => {
                    this.props.navigation.navigate('InviteToFamily');
                  }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: responsiveFontSize(1.5),
                      color: '#fff',
                      textAlign: 'center',
                    }}>
                    Add Family Member
                  </Text>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  alignSelf: 'center',
                  backgroundColor: 'white',
                  width: '90%',
                  height: '30%',
                  flexDirection: 'row',
                  marginTop: 10,
                }}>
                <FlatList
                  data={this.state.datasource}
                  showsHorizontalScrollIndicator={false}
                  horizontal={true}
                  keyExtractor={item => item.id}
                  renderItem={({item, index}) => (
                    <View
                      style={{
                        backgroundColor: 'white',
                        height: '95%',
                        width: 55,
                      }}>
                      <View
                        style={{
                          backgroundColor: 'white',
                          height: 40,
                          width: 40,
                          borderRadius: 50,
                          shadowOffset: {width: 0, height: 2},
                          shadowOpacity: 0.5,
                          shadowRadius: 2,
                          elevation: 5,
                        }}>
                        <Image
                          source={require('../../Assets/watch.jpg')}
                          style={{
                            width: '100%',
                            height: '100%',
                            borderRadius: 50,
                          }}
                        />
                      </View>
                      <View
                        style={{
                          top: 1,
                          backgroundColor: 'white',
                          width: '100%',
                          height: '30%',
                        }}>
                        <Text
                          style={{fontSize: responsiveFontSize(1.2), flex: 1}}
                          numberOfLines={1}>
                          Jhon Louis
                        </Text>
                      </View>
                    </View>
                  )}></FlatList>
              </View>

              <View
                style={{
                  padding: 5,
                  alignSelf: 'center',
                  backgroundColor: 'white',
                  width: '90%',
                }}>
                <Text
                  numberOfLines={3}
                  style={{fontSize: responsiveFontSize(1.6), color: '#7e7474'}}>
                  SimpleText is the native text editor for the Apple classic Mac
                  OS. SimpleText allows editing including text formatting,
                  fonts, and sizes. It was developed to integrate the features
                  included in the different versions of TeachText that were
                  created by various software development groups within Appl
                </Text>
              </View>
            </View>
          </ScrollView>
          <ScrollableTabView
            tabBarUnderlineStyle={{height: 2, backgroundColor: '#32cd32'}}
            tabBarInactiveTextColor="gray"
            tabBarActiveTextColor="#32cd32"
            renderTabBar={() => <DefaultTabBar />}>
            <View tabLabel="Feed">
              <View
                style={{
                  borderRadius: 10,
                  width: '96%',
                  backgroundColor: 'white',
                  height: '12%',
                  justifyContent: 'space-between',
                  alignSelf: 'center',
                  shadowOffset: {width: 0, height: 2},
                  shadowOpacity: 0.5,
                  shadowRadius: 2,
                  elevation: 5,
                }}>
                <TextInput
                  value={this.state.description}
                  onChangeText={text => this.setState({description: text})}
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
                    // this.setState({
                    //   videoName: '',
                    //   videoPath: '',
                    //   videoType: '',
                    // });
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
                    this.handlechooseVideo();
                    // this.setState({
                    //   imageType: '',
                    //   ImageName: '',
                    //   ImageUrl: '',
                    //   photo: '',
                    // });
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
                    this.familyPost();
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
                data={[1, 2]}
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
                      height: responsiveHeight(25),
                      borderRadius: 25,
                      paddingVertical: 20,
                      paddingHorizontal: 10,
                      backgroundColor: 'white',
                      marginBottom: responsiveHeight(0.2),
                      marginTop: responsiveHeight(3),
                    }}>
                    <View
                      style={{
                        backgroundColor: 'white',
                        width: '99%',
                        height: '35%',
                        flexDirection: 'row',
                        marginBottom: 1,
                      }}>
                      <View
                        style={{
                          width: '25%',
                          justifyContent: 'center',
                          alignItems: 'flex-end',
                          padding: 10,
                        }}>
                        <Thumbnail source={{uri: uri}} />
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
                          David Jhon
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
                        backgroundColor: '',
                        paddingHorizontal: 20,
                        height: '35%',
                      }}>
                      {/* <ScrollView> */}
                      <Text
                        style={{
                          fontSize: responsiveFontSize(2.2),
                          fontWeight: '600',
                          color: '#7e7a7a',
                          flexWrap: 'wrap',
                        }}
                        numberOfLines={2}>
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
                        height: '15%',
                        flexDirection: 'row',
                        paddingHorizontal: 20,
                        backgroundColor: 'white',
                      }}>
                      <View
                        style={{
                          flexDirection: 'column',
                          flexWrap: 'wrap',
                          width: '33%',
                          justifyContent: 'center',
                        }}>
                        <Icon name="account" size={20} color="#7e7a7a" />
                        <Text
                          style={{
                            marginHorizontal: 10,
                            fontWeight: '400',
                            color: '#7e7a7a',
                            fontSize: responsiveFontSize(1.8),
                          }}>
                          878
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'column',
                          flexWrap: 'wrap',
                          width: '33%',
                          justifyContent: 'center',
                        }}>
                        <EIcon name="like" size={25} color="#7e7a7a" />
                        <Text
                          style={{
                            marginHorizontal: 10,
                            fontWeight: '400',
                            color: '#7e7a7a',
                            fontSize: responsiveFontSize(1.8),
                          }}>
                          91
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'column',
                          flexWrap: 'wrap-reverse',
                          width: '33%',
                          justifyContent: 'center',
                          alignItems: 'flex-end',
                        }}>
                        <Text
                          style={{
                            marginHorizontal: 10,
                            fontWeight: '400',
                            color: '#32cd32',
                            fontSize: responsiveFontSize(1.8),
                          }}>
                          878
                        </Text>
                        <Ionicon name="ios-heart" size={20} color="#32cd32" />
                      </View>
                    </View>
                  </View>
                )}
              />
            </View>
            <View tabLabel="Gallery">
              <FlatList
                data={[1, 2, 3, 1]}
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
                    <ImageView
                      images={images}
                      imageIndex={0}
                      isVisible={this.state.displayIMG}
                      onClose={() => {
                        this.setState({displayIMG: false});
                      }}
                    />

                    <TouchableOpacity
                      style={{
                        height: responsiveHeight(16),
                        width: responsiveHeight(16.5),
                      }}
                      onPress={() => {
                        this.setState({displayIMG: true});
                      }}>
                      <Image
                        source={{
                          uri: 'https://picsum.photos/id/1060/536/354?blur=2',
                        }}
                        style={{height: '100%', width: '100%'}}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        height: responsiveHeight(16),
                        width: responsiveHeight(16.5),
                      }}
                      onPress={() => {
                        this.setState({displayIMG: true});
                      }}>
                      <Image
                        source={{
                          uri: 'https://picsum.photos/id/1060/536/354?blur=2',
                        }}
                        style={{height: '100%', width: '100%'}}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        height: responsiveHeight(16),
                        width: responsiveHeight(16.5),
                      }}>
                      <Image
                        source={{
                          uri: 'https://picsum.photos/id/1060/536/354?blur=2',
                        }}
                        style={{height: '100%', width: '100%'}}
                        onPress={() => {
                          this.setState({displayIMG: true});
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                )}
              />
            </View>
            <View tabLabel="Family Events" style={{backgroundColor: '#F5F5F5'}}>
              <FlatList
                style={styles.root}
                data={this.state.data}
                extraData={this.state}
                ItemSeparatorComponent={() => {
                  return <View style={styles.separator} />;
                }}
                keyExtractor={item => {
                  return item.id;
                }}
                renderItem={item => {
                  const Group = item.item;
                  let mainContentStyle;
                  if (Group.attachment) {
                    mainContentStyle = styles.mainContent;
                  }
                  return (
                    <View style={styles.container}>
                      <Image
                        source={{uri: Group.image}}
                        style={styles.avatar}
                      />
                      <View style={styles.content}>
                        <View style={mainContentStyle}>
                          <View style={styles.text}>
                            <Text style={styles.groupName}>{Group.name}</Text>
                          </View>
                          <Text style={styles.countMembers}>
                            Sun, Sep 8, 10:00 AM
                          </Text>
                          <View style={{flexDirection: 'row'}}>
                            <EIcon
                              name="location"
                              size={20}
                              color="green"
                              style={{}}
                            />
                            <Text style={styles.timeAgo}>Annapolis Rock</Text>
                          </View>
                          <Text style={styles.timeAgo}>
                            Updated 2 months ago
                          </Text>
                          {this.renderGroupMembers(Group)}
                        </View>
                      </View>
                    </View>
                  );
                }}
              />
            </View>
          </ScrollableTabView>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    width: responsiveWidth(100),
    height: responsiveHeight(100),
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
    marginTop: responsiveHeight(2.1),
    marginLeft: '90%',
    position: 'absolute',
  },
  container1: {
    marginTop: responsiveHeight(8.5),
  },
  root: {
    backgroundColor: '#FFFFFF',
  },
  container: {
    padding: 16,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#FFFFFF',
    alignItems: 'flex-start',
  },
  avatar: {
    width: responsiveHeight(15),
    height: responsiveHeight(15),
    borderRadius: 20,
  },
  text: {
    marginBottom: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  content: {
    flex: 1,
    marginLeft: 16,
    marginRight: 0,
  },
  mainContent: {
    marginRight: 60,
  },
  memberImage: {
    height: 30,
    width: 30,
    marginRight: 4,
    borderRadius: 10,
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
  },
  countMembers: {
    color: '#20B2AA',
  },
  timeAgo: {
    left: 2,
    fontSize: 12,
    color: '#696969',
  },
  groupName: {
    fontSize: 23,
    color: '#32cd32',
  },
  groupMembersContent: {
    flexDirection: 'row',
    marginTop: 10,
  },
});
export default FamilyList;
