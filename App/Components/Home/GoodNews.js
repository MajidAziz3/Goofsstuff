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
import Entypo from 'react-native-vector-icons/Entypo';
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
import ImageView from 'react-native-image-view';
import {
  getAllOfCollection,
  getDocByKeyValue,
  getDocRefByKeyValue,
  getData,
  addToArray,
  uploadImage,
  uploadImageComment,
} from '../../Backend/Utility';
import {_retrieveData} from '../../Backend/AsyncStore/AsyncFunc';
import VideoPlayer from 'react-native-video-controls';
import ImageResizer from 'react-native-image-resizer';
import ViewMoreText from 'react-native-view-more-text';

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
      photo: null,
      ImageName: null,
      imageType: null,
      displayIMG: false,
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
      uploading_time: '',
      comments_data: [],
      ImageUrl: null,
      _id: null,
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
              time: this.state.uploading_time,
              imageUrl: '',
            }).then(() => {
              setTimeout(async () => {
                this.Upload_Image(item);
              }, 1000);
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
    firebase
      .firestore()
      .collection('Comments')
      .onSnapshot(async () => {
        let data = await getData('Comments', item);
        this.setState({comment_data: data, loading: false});
      });
  }
  async showPost() {
    firebase
      .firestore()
      .collection('News')
      .onSnapshot(async () => {
        let data = await getAllOfCollection('News');
        this.setState({post_data: data, loading: false});
      });
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

  async Upload_Image(item) {
    let iteratorNum = 0;
    await uploadImageComment(
      this.state.ImageUrl,
      this.state.imageType,
      this.state.ImageName,
      this.state.ImageName,
      'Comments',
      item,
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
    const uri =
      'https://facebook.github.io/react-native/docs/assets/favicon.png';
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
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
            <FlatList
              style={styles.root}
              data={this.state.comment_data.comments}
              ItemSeparatorComponent={() => {
                return <View style={styles.separator} />;
              }}
              keyExtractor={item => item.user_id}
              renderItem={({item, index}) => {
                return item.imageUrl ? (
                  <View style={styles.container2} key={index}>
                    <TouchableOpacity onPress={() => {}}>
                      <Image
                        style={styles.image}
                        source={{
                          uri: 'https://randomuser.me/api/portraits/men/94.jpg',
                        }}
                      />
                    </TouchableOpacity>
                    <View style={styles.content}>
                      <View style={styles.contentHeader}>
                        <Text style={styles.name}>{item.user_name}</Text>
                        <Text style={styles.time}>{item.time}</Text>
                      </View>
                      <Text rkType="primary3 mediumLine">{item.comments}</Text>
                      <Image
                        style={styles.image}
                        source={{uri: item.imageUrl}}
                      />
                    </View>
                  </View>
                ) : (
                  <View style={styles.container2} key={index}>
                    <TouchableOpacity onPress={() => {}}>
                      <Image
                        style={styles.image}
                        source={{
                          uri: 'https://randomuser.me/api/portraits/men/94.jpg',
                        }}
                      />
                    </TouchableOpacity>
                    <View style={styles.content}>
                      <View style={styles.contentHeader}>
                        <Text style={styles.name}>{item.user_name}</Text>
                        <Text style={styles.time}>{item.time}</Text>
                      </View>
                      <Text rkType="primary3 mediumLine">{item.comments}</Text>
                    </View>
                  </View>
                );
              }}
            />
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
                  size={30}
                  color="#32cd32"
                  onPress={() => this.CommentsPost(this.state._id)}
                />
              </View>
            </View>
          </SafeAreaView>
        </Modal>
        <Text style={styles.welcome}>Good News</Text>
        <Ionicon
          name="ios-menu"
          size={35}
          color={'#32cd32'}
          onPress={() => this.props.navigation.openDrawer()}
          style={styles.menu}
        />
        {this.state.post_data.profile_picuture == null ? (
          <Entypo
            name="user"
            size={30}
            color="#d0d0d0dd"
            style={[styles.menu1]}
          />
        ) : (
          <Image
            source={{
              uri: 'https://randomuser.me/api/portraits/men/85.jpg',
            }}
            style={styles.menu1}
          />
        )}
        <ScrollView style={styles.container1}>
          {this.state.loading ? (
            <ActivityIndicator
              size={'large'}
              color="#32cd32"
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
                              // this.likePost(item.post_id);
                              // this.setState({
                              //   hit_like: !this.state.hit_like,
                              // });
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
                          borderRadius: 25,
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
                              uri:
                                'https://randomuser.me/api/portraits/men/94.jpg',
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
                        <Text>{item.description}</Text>
                      </ViewMoreText>
                      {/* <Text
                          style={{
                            fontSize: responsiveFontSize(2.1),
                            fontWeight: '600',
                            color: '#7e7a7a',
                            flexWrap: 'wrap',
                          }}
                          numberOfLines={4}>
                          {item.description}
                        </Text> */}
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
                            style={{top: 1}}
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
                )}
              />
            </View>
          )}
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
  backgroundVideo: {
    width: '95%',
    height: '80%',
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 5,
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
    marginTop: responsiveHeight(1.8),
    marginLeft: '85%',
    position: 'absolute',
  },
  container1: {
    marginTop: responsiveHeight(7.5),
  },
  root: {
    backgroundColor: '#ffffff',
    marginTop: 10,
  },
  container2: {
    paddingLeft: 19,
    paddingRight: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
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
});
