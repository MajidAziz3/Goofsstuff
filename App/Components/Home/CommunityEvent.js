import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  FlatList,
  StatusBar,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {Thumbnail} from 'native-base';
import EIcon from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';
import ETIcon from 'react-native-vector-icons/Entypo';
import ViewMoreText from 'react-native-view-more-text';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import AIcon from 'react-native-vector-icons/AntDesign';
import ImagePicker from 'react-native-image-picker';
import FA from 'react-native-vector-icons/FontAwesome';
import firebase from 'firebase';
import {getAllOfCollection} from '../../Backend/Utility';

class CommunityEvent extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
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
      sport_data: [],
      event_data: [],
      loading: true,
      item: this.props.navigation.state.params.item,
    };
  }

  // componentDidMount() {
  //   this.sportPost();
  //   this.EventPost();
  // }

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
    const {item} = this.state;
    return (
      <SafeAreaView
        style={{
          flex: 1,
        }}>
        <ScrollView>
          <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />

          <View style={{marginBottom: 10}}>
            <Text style={styles.welcome}>Event Details</Text>
            <Ionicon
              name="ios-menu"
              size={35}
              color={'#32cd32'}
              onPress={() => this.props.navigation.openDrawer()}
              style={styles.menu}
            />
          </View>

          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <View
              style={{
                backgroundColor: 'white',
                height: responsiveHeight(30),
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
                  {item.sub_category}
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
                    {item.location}
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
                    {item.email}
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
                    {item.phone}
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
                {item.description}
                </Text>
              </View>
            </View>
          </View>

          <View
            style={{
              borderRadius: 10,
              marginTop: 18,
              width: '94%',
              height: responsiveHeight(14),
              justifyContent: 'space-between',
              elevation: 1,
              marginHorizontal: 10,
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
              height: responsiveHeight(5),
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
                      source={{uri: item.imageName}}
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
                    Once I was drawing a perfect chair for myself in my head but
                    I could not finish her design.. And so I found her! was
                    drawing a perfect chair for myself in my head but I could
                    not finish her design.. And so I found her! Once I was
                    drawing a perfect chair for myself in my head but I could
                    not finish her design.. And so I found her! was drawing a
                    perfect chair for myself in my head but I could not finish
                    her design.. And so I found her!
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
                      width: '30%',
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
                    <TextInput placeholder="Type something">
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
                        alert('message');
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
  welcome: {
    fontSize: responsiveFontSize(3.8),
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 7,
  },
  menu: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: responsiveHeight(1.5),
    marginLeft: '4%',
    position: 'absolute',
  },
  menu1: {
    top: 15,
    width: 30,
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

export default CommunityEvent;
