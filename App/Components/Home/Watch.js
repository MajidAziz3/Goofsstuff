import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Dimensions,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  Modal,
  TouchableHighlight,
  ActivityIndicator,
} from 'react-native';
import {Thumbnail, Item} from 'native-base';
import {jsxAttribute} from '@babel/types';
import FA from 'react-native-vector-icons/Entypo';
import firebase from 'firebase';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import EIcon from 'react-native-vector-icons/EvilIcons';
import AIcon from 'react-native-vector-icons/AntDesign';
import Ionicon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import GlobalConst from '../../Backend/GlobalConst';
import {
  getAllOfCollection,
  addToArray,
  saveData,
  getData,
  deleteArray,
  uploadImageComment,
} from '../../Backend/Utility';
import Video from 'react-native-video';
import VideoPlayer from 'react-native-video-controls';
import {_retrieveData} from '../../Backend/AsyncStore/AsyncFunc';

const height = Dimensions.get('screen').height / 3;
const width = Dimensions.get('screen').width;

export default class Watch extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      pflag: true,
      rflag: false,
      nflag: false,
      hflag: false,
      pflag1: true,
      rflag1: false,
      nflag1: false,
      hflag1: false,
      datasource: null,
      datasource2: null,
      post_data: [],
      loading: true,
      video: false,
      viewsData: 0,
      Views: 0,
      hit_favorite: true,
      comment_data: [],
      loadingModal: true,
      photo: null,
      ImageName: null,
      imageType: null,
      ImageUrl: null,
      modalVisible: false,
      uploading_time: '',
      popular: [
        {
          name: 'Harrison Ford',
          imageName: 'https://randomuser.me/api/portraits/men/94.jpg',
        },
        {
          name: 'Woody Allen',
          imageName: 'https://randomuser.me/api/portraits/men/62.jpg',
        },

        {
          name: 'Arnold ',
          imageName: 'https://randomuser.me/api/portraits/men/45.jpg',
        },
        {
          name: 'Mel Gibson',
          imageName: 'https://randomuser.me/api/portraits/men/13.jpg',
        },

        {
          name: 'Ben Kingsley',
          imageName: 'https://randomuser.me/api/portraits/men/79.jpg',
        },

        {
          name: ' Adrien Brody ',
          imageName: 'https://randomuser.me/api/portraits/men/1.jpg',
        },
        {
          name: 'Ben Stiller',
          imageName: 'https://randomuser.me/api/portraits/men/13.jpg',
        },
      ],
      recommanded: [
        {
          name: 'john wick',
          imageName: 'https://randomuser.me/api/portraits/men/13.jpg',
        },
        {
          name: 'Rock',
          imageName: 'https://randomuser.me/api/portraits/men/45.jpg',
        },
        {
          name: 'Ben Kingsley',
          imageName: 'https://randomuser.me/api/portraits/men/62.jpg',
        },
      ],
      newest: [
        {
          name: 'Al Pacino',
          imageName: 'https://randomuser.me/api/portraits/men/1.jpg',
        },
        {
          name: 'Jhon',
          imageName: 'https://randomuser.me/api/portraits/men/79.jpg',
        },
      ],
      history: [
        {
          name: 'Clint Eastwood',
          imageName: 'https://randomuser.me/api/portraits/men/94.jpg',
        },
        {
          name: 'Nicholson',
          imageName: 'https://randomuser.me/api/portraits/men/62.jpg',
        },
        {
          name: 'Tom Hanks',
          imageName: 'https://randomuser.me/api/portraits/men/45.jpg',
        },
      ],
      hit_like: true,
    };
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
  CommentsPost = async item => {
    await _retrieveData('user').then(async result => {
      await getData('users', result).then(async res => {
        let iteratorNum = 0;
        await uploadImageComment(
          this.state.ImageUrl,
          this.state.imageType,
          this.state.ImageName,
          this.state.ImageName,
          'watchComments',
          item,
          this.state.comments_words,
          res.userId,
          res.name,
          this.state.uploading_time,
          res.profile_picture,
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
                [
                  {
                    text: 'OK',
                    onPress: () => that.props.navigation.goBack(),
                  },
                ],
              );
            }
          });
        }, 1000);
      });
      await addToArray('Watch', item, 'comments', {
        post_id: item,
        date: this.state.uploading_time,
        userId: result,
        words: this.state.comments_words,
      });
    });
  };

  componentDidMount = async () => {
    firebase
      .firestore()
      .collection('Watch')
      .onSnapshot(() => {
        setTimeout(async () => {
          let data = await getAllOfCollection('Watch');
          this.setState({post_data: data, loading: false}, async () => {
            const {post_data} = this.state;
            await _retrieveData('user').then(async user_id => {
              await getData('watchLike', user_id).then(data => {
                post_data.map(dt => {
                  data.like.map(ft => {
                    if (ft.post_id === dt.post_id) {
                      dt.islike = true;
                    }
                  });
                });
              });
              await getData('watchFavorite', user_id).then(data => {
                post_data.map(dt => {
                  data.favorite.map(ft => {
                    if (ft.post_id === dt.post_id) {
                      dt.isfavorite = true;
                    }
                  });
                });
              });
              this.setState({post_data}, () => {});
            });
          });
        }, 400);
      });

    this.setState({datasource: this.state.popular});
    this.setState({datasource2: this.state.popular});
    const {addListener} = this.props.navigation;
    const {isDisplayed} = this.state;
    const self = this;

    this.listeners = [
      addListener('didFocus', () => {
        if (self.state.isDisplayed !== true) {
          GlobalConst.STORAGE_KEYS.ScreenType = '2';
          self.setState({isDisplayed: true});
        }
      }),
      addListener('willBlur', () => {
        if (self.state.isDisplayed !== false) {
          GlobalConst.STORAGE_KEYS.ScreenType = '2';

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
  };
  setModalVisible() {
    this.setState({modalVisible: !this.state.modalVisible});
  }

  likePost = async (item, ind) => {
    await _retrieveData('user').then(async result => {
      await getData('Watch', item).then(async res => {
        if (res) {
          if (res.like.length > 0) {
            res.like.map(async (id, index) => {
              if (id.post_id === item) {
                await this.setState({hit_like: false});
                await deleteArray('watchLike', result, 'like', index);
                await deleteArray('Watch', item, 'like', index);
                await deleteArray('users', result, 'likes', index);
              } else {
                if (this.state.hit_like === true) {
                  await addToArray('watchLike', result, 'like', {
                    post_id: item,
                  });
                  await addToArray('Watch', item, 'like', {
                    post_id: item,
                  });
                  await addToArray('users', result, 'likes', {post_id: item});
                }
                return;
              }
            });
            return;
          } else {
            await addToArray('watchLike', result, 'like', {
              post_id: item,
            });
            await addToArray('Watch', item, 'like', {
              post_id: item,
            });
            await addToArray('users', result, 'likes', {post_id: item});
          }
        } else {
          await addToArray('watchLike', result, 'like', {
            post_id: item,
          });
          await addToArray('Watch', item, 'like', {
            post_id: item,
          });
          await addToArray('users', result, 'likes', {post_id: item});
        }
      });
    });
  };

  calculateTime(time) {
    time = time
      .toString()
      .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) {
      // If time format correct
      time = time.slice(1); // Remove full string match value
      time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(''); // return adjusted time or original string
  }

  saveViews = async item => {
    let finalViews = this.state.viewsData + this.state.Views;
    await saveData('Watch', item.post_id, {Views: finalViews});
  };

  async CommentPost(item) {
    firebase
      .firestore()
      .collection('watchComments')
      .onSnapshot(async () => {
        let data = await getData('watchComments', item);
        this.setState({comment_data: data, loadingModal: false});
      });
  }

  favoritePost = async item => {
    await _retrieveData('user').then(async result => {
      await getData('Watch', item).then(async res => {
        if (res) {
          if (res.favorite.length > 0) {
            res.favorite.map(async (id, index) => {
              if (id.post_id === item) {
                await this.setState({hit_favorite: false});
                await deleteArray('watchFavorite', result, 'favorite', index);
                await deleteArray('Watch', item, 'favorite', index);
                await deleteArray('users', result, 'favorite', index);
              } else {
                if (this.state.hit_favorite === true) {
                  await addToArray('watchFavorite', result, 'favorite', {
                    post_id: item,
                  });
                  await addToArray('users', result, 'favorite', {
                    post_id: item,
                  });
                  await addToArray('Watch', item, 'favorite', {
                    post_id: item,
                  });
                }
                return;
              }
            });
            return;
          } else {
            await addToArray('watchFavorite', result, 'favorite', {
              post_id: item,
            });
            await addToArray('users', result, 'favorite', {
              post_id: item,
            });
            await addToArray('Watch', item, 'favorite', {
              post_id: item,
            });
          }
        } else {
          await addToArray('watchFavorite', result, 'favorite', {
            post_id: item,
          });
          await addToArray('users', result, 'favorite', {
            post_id: item,
          });
          await addToArray('Watch', item, 'favorite', {
            post_id: item,
          });
        }
      });
    });
  };

  popularEventHandler() {
    this.setState({
      datasource: this.state.popular,
      pflag: true,
      rflag: false,
      nflag: false,
      hflag: false,
    });
  }
  recommandedEventHandler() {
    this.setState({
      datasource: this.state.recommanded,
      pflag: false,
      rflag: true,
      nflag: false,
      hflag: false,
    });
  }
  newestEventHandler() {
    this.setState({
      datasource: this.state.newest,
      pflag: false,
      rflag: false,
      nflag: true,
      hflag: false,
    });
  }
  historyEventHandler() {
    this.setState({
      datasource: this.state.history,
      pflag: false,
      rflag: false,
      nflag: false,
      hflag: true,
    });
  }
  popularEventHandler2() {
    this.setState({
      datasource2: this.state.popular,
      pflag1: true,
      rflag1: false,
      nflag1: false,
      hflag1: false,
    });
  }
  recommandedEventHandler2() {
    this.setState({
      datasource2: this.state.recommanded,
      pflag1: false,
      rflag1: true,
      nflag1: false,
      hflag1: false,
    });
  }
  newestEventHandler2() {
    this.setState({
      datasource2: this.state.newest,
      pflag1: false,
      rflag1: false,
      nflag1: true,
      hflag1: false,
    });
  }
  historyEventHandler2() {
    this.setState({
      datasource2: this.state.history,
      pflag1: false,
      rflag1: false,
      nflag1: false,
      hflag1: true,
    });
  }

  playVideo() {
    this.setState({
      video: true,
    });
  }

  render() {
    const uri =
      'https://facebook.github.io/react-native/docs/assets/favicon.png';
    const myIcon = <Icon name="account" size={30} color="#900" />;
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.welcome}>Watch</Text>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}>
          <SafeAreaView style={{flex: 1}}>
            <FA
              name="cross"
              size={30}
              color={'#32cd32'}
              style={styles.modalcross}
              onPress={() => {
                this.setModalVisible();
              }}
            />
            {this.state.loadingModal ? (
              <ActivityIndicator
                size={'large'}
                color="#32cd32"
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  flex: 1,
                }}
              />
            ) : (
              <FlatList
                style={styles.root}
                data={this.state.comment_data.comments}
                ItemSeparatorComponent={() => {
                  return <View style={styles.separator} />;
                }}
                keyExtractor={item => item.user_id}
                renderItem={({item}) => {
                  console.log('itemm', item);
                  return item.imageUrl ? (
                    <View style={styles.container2}>
                      <TouchableOpacity onPress={() => {}}>
                        <Image
                          style={styles.image}
                          source={{
                            uri: item.userImage,
                          }}
                        />
                      </TouchableOpacity>
                      <View style={styles.content}>
                        <View style={styles.contentHeader}>
                          <Text style={styles.name}>{item.user_name}</Text>
                          <Text style={styles.time}>{item.time}</Text>
                        </View>
                        <Text rkType="primary3 mediumLine">
                          {item.comments}
                        </Text>
                        <Image
                          style={styles.image}
                          source={{uri: item.imageUrl}}
                        />
                      </View>
                    </View>
                  ) : (
                    <View style={styles.container2}>
                      <TouchableOpacity onPress={() => {}}>
                        <Image
                          style={styles.image}
                          source={{
                            uri: item.userImage,
                          }}
                        />
                      </TouchableOpacity>
                      <View style={styles.content}>
                        <View style={styles.contentHeader}>
                          <Text style={styles.name}>{item.user_name}</Text>
                          <Text style={styles.time}>{item.time}</Text>
                        </View>
                        <Text rkType="primary3 mediumLine">
                          {item.comments}
                        </Text>
                      </View>
                    </View>
                  );
                }}
              />
            )}
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
                  style={{right: 15, position: 'absolute', top: 5}}
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
                  size={40}
                  color="#32cd32"
                  onPress={() => {
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
                        date +
                        '/' +
                        month +
                        '/' +
                        year +
                        ' ' +
                        hours +
                        ':' +
                        min +
                        ':' +
                        sec,
                    });
                    this.CommentsPost(this.state._id);
                  }}
                />
              </View>
            </View>
          </SafeAreaView>
        </Modal>
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
          <View
            style={{
              backgroundColor: 'white',
              paddingHorizontal: 10,
              height: responsiveHeight(6),
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: responsiveFontSize(2.5),
                color: '#000',
                fontWeight: '900',
                top: responsiveHeight(1.2),
              }}>
              3 Minutes of Inspiration
            </Text>
          </View>

          <View
            style={{
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.5,
              shadowRadius: 2,
              elevation: 5,
              backgroundColor: '#eee',
              width: responsiveWidth(100),
              height: responsiveHeight(40),
              borderRadius: 25,
              paddingVertical: 5,
              paddingHorizontal: 0,
              backgroundColor: 'white',
              marginBottom: 5,
              marginTop: 10,
            }}>
            <View
              style={{
                backgroundColor: 'white',
                width: '99%',
                height: '15%',
                flexDirection: 'row',
                marginBottom: 1,
                borderRadius: 25,
              }}>
              <View
                style={{
                  width: '15%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  left: 10,
                }}>
                <Thumbnail small source={{}} />
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  width: '70%',
                  left: 10,
                }}>
                <Text
                  style={{
                    fontSize: responsiveFontSize(2.5),
                    fontWeight: 'bold',
                  }}>
                  Jhon Snow
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
                    right: 5,
                  }}>
                  8h ago
                </Text>
              </View>
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'white',
                width: '99%',
                height: '70%',
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

            <View
              style={{
                height: '15%',
                flexDirection: 'row',
                paddingHorizontal: 5,
                backgroundColor: 'white',
                borderRadius: 25,
                justifyContent: 'space-evenly',
              }}>
              {/* <View
                    style={{
                      left: 15,
                      backgroundColor: 'white',
                      flexDirection: 'row',
                      width: '25%',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity>
                      <Icon name="bookmark" size={20} color="#7e7a7a" />
                    </TouchableOpacity>
                    <Text
                      style={{
                        marginHorizontal: 2,
                        fontSize: responsiveFontSize(1.8),
                        fontWeight: '400',
                        color: '#7e7a7a',
                      }}>
                      123
                    </Text>
                  </View> */}
              <View
                style={{
                  backgroundColor: 'white',
                  flexDirection: 'row',
                  width: '25%',
                  justifyContent: 'center',
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
                      this.CommentPost(item.post_id);
                    }}
                  />
                </TouchableOpacity>
                <Text
                  style={{
                    marginHorizontal: 2,
                    fontSize: responsiveFontSize(1.8),
                    fontWeight: '400',
                    color: '#7e7a7a',
                  }}>
                  45
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  width: '25%',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }}>
                <TouchableOpacity>
                  <AIcon
                    name={this.state.hit_like ? 'like1' : 'like2'}
                    size={28}
                    color={'#32cd32'}
                    onPress={() => {
                      this.setState({
                        hit_like: !this.state.hit_like,
                      });
                    }}
                  />
                </TouchableOpacity>
                <Text
                  style={{
                    marginHorizontal: 2,
                    fontSize: responsiveFontSize(1.8),
                    fontWeight: '400',
                    color: '#7e7a7a',
                  }}>
                  91
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  width: '25%',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }}>
                <TouchableOpacity>
                  <AIcon
                    name="heart"
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

                <Text
                  style={{
                    marginHorizontal: 5,
                    fontSize: responsiveFontSize(1.8),
                    fontWeight: '400',
                    color: '#7e7a7a',
                  }}>
                  878
                </Text>
              </View>
            </View>
          </View>

          <TouchableOpacity
            style={{height: responsiveHeight(5), backgroundColor: 'white'}}
            onPress={() => {
              this.props.navigation.navigate('LearnMore');
            }}>
            <Text
              style={{
                fontSize: responsiveFontSize(2.2),
                fontWeight: 'bold',
                color: '#32cd32',
                alignSelf: 'center',
              }}>
              Learn More About This Speaker
            </Text>
          </TouchableOpacity>
          <View
            style={{height: responsiveHeight(10), backgroundColor: 'white'}}>
            <View
              style={{
                paddingHorizontal: 10,
                height: '50%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: responsiveFontSize(2.5),
                  fontWeight: '900',
                  color: '#000',
                }}>
                Recent Speakers
              </Text>
            </View>

            <View
              style={{
                height: '60%',
                backgroundColor: 'white',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={{
                  height: '80%',
                  width: '20%',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => this.popularEventHandler()}>
                <Text
                  style={{
                    fontSize: responsiveFontSize(1.8),
                    fontWeight: this.state.pflag === true ? 'bold' : '900',
                    color: this.state.pflag === true ? '#000' : '#8f8f8f',
                  }}>
                  Popular
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  height: '80%',
                  width: '30%',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => this.recommandedEventHandler()}>
                <Text
                  style={{
                    fontSize: responsiveFontSize(1.8),
                    fontWeight: this.state.rflag === true ? 'bold' : '900',
                    color: this.state.rflag === true ? '#000' : '#8f8f8f',
                  }}>
                  Recommended
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  height: '80%',
                  width: '20%',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => this.newestEventHandler()}>
                <Text
                  style={{
                    fontSize: responsiveFontSize(1.8),
                    fontWeight: this.state.nflag === true ? 'bold' : '900',
                    color: this.state.nflag === true ? '#000' : '#8f8f8f',
                  }}>
                  Newest
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  height: '80%',
                  width: '20%',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => this.historyEventHandler()}>
                <Text
                  style={{
                    fontSize: responsiveFontSize(1.8),
                    fontWeight: this.state.hflag === true ? 'bold' : '900',
                    color: this.state.hflag === true ? '#000' : '#8f8f8f',
                  }}>
                  History
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              marginLeft: 0,
              padding: 5,
              marginTop: 5,
              flexDirection: 'row',
              backgroundColor: 'white',
              height: responsiveHeight(17),
              justifyContent: 'space-evenly',
            }}>
            <FlatList
              data={this.state.datasource}
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              keyExtractor={item => item.id}
              renderItem={({item, index}) => (
                <View>
                  <View
                    style={{
                      backgroundColor: 'white',
                      height: responsiveHeight(10),
                      width: responsiveWidth(20),
                    }}>
                    <Thumbnail
                      source={{uri: item.imageName}}
                      style={{
                        width: responsiveHeight(7),
                        height: responsiveHeight(7),
                        alignSelf: 'center',
                      }}
                    />
                    <Text
                      style={{
                        fontWeight: '400',
                        color: '#5e5d5d',
                        fontSize: responsiveFontSize(1.5),
                        textAlign: 'center',
                        textTransform: 'capitalize',
                      }}
                      numberOfLines={2}>
                      {item.name}
                    </Text>
                  </View>
                  {/* <View
                    style={{
                      backgroundColor: 'white',
                      height: responsiveHeight(3),
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        fontWeight: '400',
                        color: '#32cd32',
                        fontSize: responsiveFontSize(1.8),
                        textAlign: 'center',
                        textTransform: 'capitalize',
                        fontWeight: 'bold',
                      }}
                      numberOfLines={2}>
                      {'Title'}
                    </Text>
                  </View> */}
                </View>
              )}
            />

            {/* <View style={{ backgroundColor: 'red', height: '80%', width: '20%', }}>
    <Thumbnail source={{ uri: uri }} style={{marginHorizontal:5 }} />
        <Text style={{ margin:5, fontWeight: '400', color: 'black' }}>
        Jena-louis
       Jena-louis
      </Text>

    </View> */}
          </View>

          <View style={{height: responsiveHeight(10), backgroundColor: 'red'}}>
            <View
              style={{
                paddingHorizontal: 10,
                height: '50%',
                backgroundColor: 'white',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: responsiveFontSize(2.5),
                  fontWeight: '900',
                  color: '#000',
                }}>
                More Videos
              </Text>
            </View>

            <View
              style={{
                height: '60%',
                backgroundColor: 'white',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={{
                  height: '80%',
                  width: '20%',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => this.popularEventHandler2()}>
                <Text
                  style={{
                    fontSize: responsiveFontSize(1.8),
                    fontWeight: this.state.pflag1 === true ? 'bold' : '900',
                    color: this.state.pflag1 === true ? '#000' : '#8f8f8f',
                  }}>
                  Popular
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  height: '80%',
                  width: '30%',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => this.recommandedEventHandler2()}>
                <Text
                  style={{
                    fontSize: responsiveFontSize(1.8),
                    fontWeight: this.state.rflag1 === true ? 'bold' : '900',
                    color: this.state.rflag1 === true ? '#000' : '#8f8f8f',
                  }}>
                  Recommended
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  height: '80%',
                  width: '20%',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => this.newestEventHandler2()}>
                <Text
                  style={{
                    fontSize: responsiveFontSize(1.8),
                    fontWeight: this.state.nflag1 === true ? 'bold' : '900',
                    color: this.state.nflag1 === true ? '#000' : '#8f8f8f',
                  }}>
                  Newest
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  height: '80%',
                  width: '20%',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => this.historyEventHandler2()}>
                <Text
                  style={{
                    fontSize: responsiveFontSize(1.8),
                    fontWeight: this.state.hflag1 === true ? 'bold' : '900',
                    color: this.state.hflag1 === true ? '#000' : '#8f8f8f',
                  }}>
                  History
                </Text>
              </TouchableOpacity>
            </View>
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
                  elevation: 5,
                  backgroundColor: '#eee',
                  width: responsiveWidth(100),
                  height: responsiveHeight(40),
                  borderRadius: 25,
                  paddingVertical: 5,
                  paddingHorizontal: 0,
                  backgroundColor: 'white',
                  marginBottom: 5,
                  marginTop: 10,
                }}>
                <View
                  style={{
                    backgroundColor: 'white',
                    width: '99%',
                    height: '15%',
                    flexDirection: 'row',
                    marginBottom: 1,
                    borderRadius: 25,
                  }}>
                  <View
                    style={{
                      width: '15%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      left: 10,
                    }}>
                    <Thumbnail small source={{uri: item.imageName}} />
                  </View>
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'flex-start',
                      width: '60%',
                      flexDirection: 'column',
                      marginLeft: responsiveWidth(2),
                    }}>
                    <Text style={{fontSize: 1, color: 'white'}}>
                      {(date = item.uploading_time.split(' '))}
                    </Text>
                    <Text
                      style={{
                        fontSize: responsiveFontSize(3),
                        fontWeight: 'bold',
                      }}>
                      {item.user_name}
                      {/* {console.log('ITEM NAME', item.name)} */}
                    </Text>
                    <Text
                      style={{
                        fontSize: responsiveFontSize(1.5),
                        color: '#7e7a7a',
                      }}>
                      {date[0]} at {this.calculateTime(date[1])}
                      {/* {console.log('ITEM NAME', item.name)} */}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'white',
                    width: '99%',
                    height: '70%',
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
                    // onPlay={()=>  this.setState({ Views: 1 })}
                    // onPause={()=> this.setState({ Views: 0 })}
                    // onEnd={()=> this.saveViews(item)}
                  />
                </View>

                <View
                  style={{
                    height: '15%',
                    flexDirection: 'row',
                    paddingHorizontal: 5,
                    backgroundColor: 'white',
                    borderRadius: 25,
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
                          this.CommentPost(item.post_id);
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
                      {item.comments.length}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      width: '25%',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity>
                      <AIcon
                        name={item.islike ? 'like1' : 'like2'}
                        size={28}
                        color={'#32cd32'}
                        onPress={() => {
                          this.likePost(item.post_id, index);
                        }}
                      />
                    </TouchableOpacity>
                    <Text
                      style={{
                        marginHorizontal: 2,
                        fontSize: responsiveFontSize(1.8),
                        fontWeight: '400',
                        color: '#7e7a7a',
                      }}>
                      {item.like.length}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      width: '25%',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity>
                      <Ionicon
                        name={item.isfavorite ? 'md-heart' : 'md-heart-empty'}
                        size={30}
                        color={'#32cd32'}
                        style={{top: 1}}
                        onPress={() => {
                          this.favoritePost(item.post_id);
                        }}
                      />
                    </TouchableOpacity>

                    <Text
                      style={{
                        marginHorizontal: 5,
                        fontSize: responsiveFontSize(1.8),
                        fontWeight: '400',
                        color: '#7e7a7a',
                      }}>
                      {item.favorite.length}
                    </Text>
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
    // backgroundColor: 'red',
  },
  welcome: {
    fontSize: responsiveFontSize(3.8),
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 7,
  },
  content: {
    marginLeft: 16,
    flex: 1,
  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
  },
  image: {
    width: 45,
    height: 45,
    borderRadius: 20,
    marginLeft: 20,
  },
  time: {
    fontSize: 11,
    color: '#808080',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
    marginTop: responsiveHeight(3)
  },
  menu: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: responsiveHeight(1.8),
    marginLeft: '4%',
    position: 'absolute',
  },
  modalcross: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: responsiveHeight(0.8),
    marginLeft: '4%',
  },
  container2: {
    paddingLeft: 19,
    paddingRight: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  backgroundVideo: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '95%',
    height: '80%',
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 5,
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
    marginTop: responsiveHeight(8.5),
  },
  separator: {
    height: 1,
    backgroundColor: 'black',
  },
  root: {
    backgroundColor: '#ffffff',
    marginTop: 10,
  },
});
