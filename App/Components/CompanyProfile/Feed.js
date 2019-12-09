import React, { Component } from 'react';
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
  SafeAreaView
} from 'react-native';
import { Left, Thumbnail } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ETIcon from 'react-native-vector-icons/Entypo';
import EIcon from 'react-native-vector-icons/EvilIcons';
import FA from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AIcon from 'react-native-vector-icons/AntDesign';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import Ionicon from 'react-native-vector-icons/Ionicons';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import VideoPlayer from 'react-native-video-controls';
import {
  ScrollableTabView,
  DefaultTabBar,
  ScrollableTabBar,
} from '@valdio/react-native-scrollable-tabview';
import ImageView from 'react-native-image-view';
import { CompanyPost } from '../../Backend/Create/CompanyPost';
import ViewMoreText from 'react-native-view-more-text';

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

class Feed extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      datasource: [1, 2, 3, 1, 2, 3],
      datasource2: [1, 2],
      displayIMG: false,
      description: '',
      uploading_time: '',
      comment: [],
      like: [],
      favorite: [],
      file: null,
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

  renderViewMore(onPress) {
    return (
      <Text onPress={onPress} style={{
        fontSize: responsiveFontSize(2.1),
        fontWeight: 'bold',
        color: '#7e7a7a',
      }}>View more</Text>
    )
  }

  renderViewLess(onPress) {
    return (
      <Text onPress={onPress} style={{
        fontSize: responsiveFontSize(2.1),
        fontWeight: 'bold',
        color: '#7e7a7a',
      }}>View less</Text>
    )
  }

  render() {
    const {
      description,
      uploading_time,
      comment,
      like,
      favorite,
      file,
    } = this.state;
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }}>
          <View style={{ marginBottom: 10 }}>
            <Text style={styles.welcome}>Company Profile</Text>
            <Ionicon
              name="ios-menu"
              size={35}
              color={'#32cd32'}
              onPress={() => this.props.navigation.openDrawer()}
              style={styles.menu}
            />
            <TouchableOpacity style={styles.menu1}>
              <ETIcon
                name="dots-three-vertical"
                size={25}
                color={'#32cd32'}
                onPress={() => this.props.navigation.navigate('EditCompany')}
              />
            </TouchableOpacity>
          </View>

          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <View
              style={{
                backgroundColor: 'white',
                height: responsiveHeight(30),
                width: responsiveWidth(100),
              }}>
              <Image
                source={require('../../Assets/watch.jpg')}
                style={{ width: '100%', height: '100%', borderRadius: 0 }}
              />
            </View>

            <View
              style={{
                backgroundColor: 'white',
                height: responsiveHeight(32),
                width: responsiveWidth(100),
                borderRadius: 20,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.5,
                shadowRadius: 2,
                elevation: 1,
              }}>
              <View
                style={{
                  alignSelf: 'center',
                  top: 10,
                  backgroundColor: 'white',
                  justifyContent: 'flex-start',
                  width: '90%',
                  height: '20%',
                }}>
                <Text
                  style={{
                    left: 5,
                    fontSize: responsiveFontSize(3),
                    color: '#32cd32',
                    fontWeight: 'bold',
                  }}>
                  ABC Company
              </Text>
              </View>

              <View
                style={{
                  paddingHorizontal: 5,
                  alignSelf: 'center',
                  top: 0,
                  backgroundColor: 'white',
                  justifyContent: 'space-around',
                  alignItems: 'flex-start',
                  width: '90%',
                  height: '35%',
                }}>
                {/* <Text style={{letterSpacing:1, left:2,fontSize: responsiveFontSize(2), color: '#7e7474' }}>
                            Company Info
                        </Text> */}
                <Text
                  style={{
                    left: 1,
                    fontSize: responsiveFontSize(1.8),
                    fontWeight: 'bold',
                    color: '#7e7474',
                  }}>
                  Address:
                <Text
                    style={{
                      letterSpacing: 1,
                      fontSize: responsiveFontSize(1.6),
                      fontWeight: '800',
                    }}>
                    Plot 14 Street 12
                </Text>
                </Text>
                <Text
                  style={{
                    left: 1,
                    fontSize: responsiveFontSize(1.8),
                    fontWeight: 'bold',
                    color: '#7e7474',
                  }}>
                  Email:
                <Text
                    style={{
                      letterSpacing: 1,
                      fontSize: responsiveFontSize(1.6),
                      fontWeight: '800',
                    }}>
                    user123@gmail.com
                </Text>
                </Text>
                <Text
                  style={{
                    left: 1,
                    fontSize: responsiveFontSize(1.8),
                    fontWeight: 'bold',
                    color: '#7e7474',
                  }}>
                  Phone#:
                <Text
                    style={{
                      letterSpacing: 1,
                      fontSize: responsiveFontSize(1.6),
                      fontWeight: '800',
                    }}>
                    05133449
                </Text>
                </Text>
              </View>
              <View
                style={{
                  alignSelf: 'center',
                  top: 5,
                  backgroundColor: 'white',
                  width: '90%',
                  height: '10%',
                  flexDirection: 'row',
                }}>
                <View
                  style={{
                    paddingHorizontal: 7,
                    width: '80%',
                    height: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      left: 1,
                      fontSize: responsiveFontSize(1.8),
                      color: '#7e7474',
                    }}>
                    9:00 AM - 5:00 PM
                </Text>

                  <Text
                    style={{
                      letterSpacing: 1,
                      fontSize: responsiveFontSize(1.6),
                      fontWeight: 'bold',
                    }}>
                    Sat-Sun off
                </Text>


                  <TouchableOpacity
                    style={{
                      top: -18,
                      backgroundColor: 'white',
                      width: '20%',
                      height: '100%',
                      flexDirection: 'column',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      position: 'absolute',
                      left: responsiveWidth(75),
                    }}>
                    <View
                      style={{
                        flexDirection: 'column',
                        height: '100%',
                        width: '50%',
                        alignItems: 'center',
                        justifyContent: 'space-evenly',
                        left: 0,
                      }}>
                      <Text
                        style={{
                          fontSize: responsiveFontSize(2),
                          color: '#40d240',
                          fontWeight: 'bold',
                          marginBottom: 10,
                        }}>
                        45
                  </Text>
                      <TouchableOpacity>
                        <ETIcon name="star" size={30} color="#32cd32" style={{}} />
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>

              <View
                style={{
                  marginTop: 2,
                  padding: 0,
                  paddingVertical: 8,
                  alignSelf: 'center',
                  top: 0,
                  backgroundColor: 'white',
                  width: '90%',
                  height: '34%',
                }}>
                <Text
                  numberOfLines={3}
                  style={{
                    flex: 1,
                    flexGrow: 1,
                    fontSize: responsiveFontSize(1.8),
                    color: '#7e7474',
                  }}>
                  SimpleText is the native text editor for the Apple classic Mac
                  OS. SimpleText allows editing including text formatting, fonts,
                  and sizes. It was developed to integrate the features included
                  in the different versions of TeachText that were created by
                  various software development groups within Appl
              </Text>
              </View>
            </View>
          </View>

          <ScrollableTabView
            tabBarUnderlineStyle={{ height: 2, backgroundColor: '#32cd32' }}
            tabBarInactiveTextColor="gray"
            tabBarActiveTextColor="#32cd32"
            renderTabBar={() => <DefaultTabBar />}>
            <View tabLabel="Feed">
              {/* #ebeeeb */}
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
                  value={this.state.description}
                  onChangeText={values =>
                    this.setState({
                      description: values,
                    })
                  }
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
                  <FA name="video-camera" size={18} color="#32cd32" style={{}} />

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
                    CompanyPost(
                      description,
                      uploading_time,
                      comment,
                      like,
                      favorite,
                      file,
                    );
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
                renderItem={({ item, index }) => (
                  <View
                    key={index}
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
                      marginTop: responsiveHeight(2)
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
                            style={{ width: 60, height: 60, borderRadius: 60 }}
                          />
                        ) : (
                            <Image
                              source={{
                                uri:
                                  'https://randomuser.me/api/portraits/men/94.jpg',
                              }}
                              style={{ width: 60, height: 60, borderRadius: 60 }}
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
                          Asad
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
                        marginBottom: 3
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
                        }}
                      >
                        <Text>
                          ckjdsnjcndjksnckjsdnjkcnksdjncjknsdjkcnjksd jdcdjks c sdc sdccjkndskjcds cds csd c sdc dks csd cds chjds csd chsdc sdhbckhjsdchjksdbckjsdsd cks dcsd ckjsd ckjsdcsdc ksd ckjsdcsdccksd
                        </Text>
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

                    <View style={{
                      width: '100%',
                      height: item.imageUrl || item.videoUrl ? responsiveHeight(30) : null,

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
                            source={{ uri: item.imageUrl }}
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
                          justifyContent: "space-evenly"
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
                              name={this.state.hit_favorite ? "md-heart" : "md-heart-empty"}
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
                              this.setState({ comments_words: values })
                            }
                            placeholder="Type something">
                            {/* <TextInput style={{ marginHorizontal: 10, alignSelf: 'flex-start' }} placeholder='type something'placeholderStyle={{ fontFamily: "AnotherFont", borderColor: 'red',alignSelf:'center' }} > */}
                          </TextInput>
                          <Ionicon
                            name="ios-camera"
                            size={30}
                            style={{ right: 15, position: 'absolute', top: 5 }}
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
            <View tabLabel="Gallery">
              <FlatList
                data={[1, 2, 3, 1]}
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
                    <ImageView
                      images={images}
                      imageIndex={0}
                      isVisible={this.state.displayIMG}
                      onClose={() => {
                        this.setState({ displayIMG: false });
                      }}
                      renderFooter={(currentImage) => (<View style={{ marginBottom: responsiveHeight(4), alignItems: 'center' }}><Text style={{ fontSize: 20, color: 'white' }}>Hello! I'm Footer</Text></View>)}
                    />

                    <TouchableOpacity
                      style={{
                        height: responsiveHeight(16),
                        width: responsiveHeight(16.5),
                      }}
                      onPress={() => {
                        this.setState({ displayIMG: true });
                      }}>
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
                      onPress={() => {
                        this.setState({ displayIMG: true });
                      }}>
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
                      }}>
                      <Image
                        source={{
                          uri: 'https://picsum.photos/id/1060/536/354?blur=2',
                        }}
                        style={{ height: '100%', width: '100%' }}
                        onPress={() => {
                          this.setState({ displayIMG: true });
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                )}
              />
            </View>
            <View tabLabel="Client of Week">
              <Image
                source={require('../../Assets/cow.png')}
                style={{
                  width: responsiveWidth(100),
                  height: responsiveHeight(73),
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
    backgroundColor: '#eee',
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
    marginTop: responsiveHeight(2.2),
    marginLeft: '90%',
    position: 'absolute',
  },
  container1: {
    marginTop: responsiveHeight(8.5),
  },
});
export default Feed;
