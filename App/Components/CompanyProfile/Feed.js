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
  ActivityIndicator,
} from 'react-native';
import {Left, Thumbnail} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ETIcon from 'react-native-vector-icons/Entypo';
import EIcon from 'react-native-vector-icons/EvilIcons';
import FA from 'react-native-vector-icons/FontAwesome';
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
import {CompanyPost} from '../../Backend/Create/CompanyPost';
import {getData} from '../../Backend/Utility';
import {_retrieveData} from '../../Backend/AsyncStore/AsyncFunc';
import firebase from 'firebase';

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
      post_data: null,
      loading: true,
    };
  }

  componentDidMount = async () => {
    await _retrieveData('user').then(
      async result =>
        await firebase
          .firestore()
          .collection('Company_Profile')
          .onSnapshot(async () => {
            let data = await getData('Company_Profile', result);
            this.setState({post_data: data, loading: false});
            console.log(data);
            console.log('\n');
          }),
    );

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
  render() {
    const {
      description,
      uploading_time,
      comment,
      like,
      favorite,
      file,
      post_data,
    } = this.state;
    return (
      <SafeAreaView style={{flex: 1}}>
        <ScrollView style={{flex: 1}}>
          <View style={{marginBottom: 10}}>
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

          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            {this.state.loading ? (
              <ActivityIndicator size={'large'} color={'blue'} />
            ) : (
              <View>
                <View
                  style={{
                    backgroundColor: 'white',
                    height: responsiveHeight(30),
                    width: responsiveWidth(100),
                  }}>
                  <Image
                    source={{uri: post_data.imageUrl}}
                    style={{width: '100%', height: '100%', borderRadius: 0}}
                  />
                </View>

                <View
                  style={{
                    backgroundColor: 'white',
                    height: responsiveHeight(32),
                    width: responsiveWidth(100),
                    borderRadius: 20,
                    shadowOffset: {width: 0, height: 2},
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
                      {post_data.Company_Name}
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
                        {post_data.location}
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
                        {post_data.email}
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
                        {post_data.phone}
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
                        {post_data.opening_Time}- {post_data.closing_Time}
                      </Text>

                      <Text
                        style={{
                          letterSpacing: 1,
                          fontSize: responsiveFontSize(1.6),
                          fontWeight: 'bold',
                        }}>
                        {post_data.days} Open
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
                            {post_data.rating.length}
                          </Text>
                          <TouchableOpacity>
                            <ETIcon
                              name="star"
                              size={30}
                              color="#32cd32"
                              style={{}}
                            />
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
                      {post_data.description}
                    </Text>
                  </View>
                </View>
              </View>
            )}
          </View>

          <ScrollableTabView
            tabBarUnderlineStyle={{height: 2, backgroundColor: '#32cd32'}}
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
                      height: responsiveHeight(23),
                      borderRadius: 25,
                      paddingVertical: 20,
                      paddingHorizontal: 10,
                      backgroundColor: 'white',
                      marginBottom: responsiveHeight(1),
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
                        <TouchableOpacity>
                          <Icon name="account" size={20} color="#7e7a7a" />
                        </TouchableOpacity>
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
                        <TouchableOpacity>
                          <EIcon name="like" size={25} color="#7e7a7a" />
                        </TouchableOpacity>
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
                        <TouchableOpacity>
                          <Ionicon name="ios-heart" size={20} color="#32cd32" />
                        </TouchableOpacity>
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
                      renderFooter={currentImage => (
                        <View
                          style={{
                            marginBottom: responsiveHeight(4),
                            alignItems: 'center',
                          }}>
                          <Text style={{fontSize: 20, color: 'white'}}>
                            Hello! I'm Footer
                          </Text>
                        </View>
                      )}
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
