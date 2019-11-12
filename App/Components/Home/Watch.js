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
} from 'react-native';
import {Thumbnail, Item} from 'native-base';
import {jsxAttribute} from '@babel/types';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import EIcon from 'react-native-vector-icons/EvilIcons';
import AIcon from 'react-native-vector-icons/AntDesign';
import Ionicon from 'react-native-vector-icons/Ionicons';
import FA from 'react-native-vector-icons/Entypo';
import GlobalConst from '../../Backend/GlobalConst';
import { getAllOfCollection } from '../../Backend/Utility';


const height = Dimensions.get('screen').height / 3;
const width = Dimensions.get('screen').width;

export default class Watch extends Component {
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
      post_data:[],
      loading:true,
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
    };
  }
  componentDidMount=async()=> {

    await getAllOfCollection('Watch')
      .then(result => {
        this.setState({post_data: result, loading: false});
      })
      .catch(error => alert(error));

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
  }

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

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    const uri =
      'https://facebook.github.io/react-native/docs/assets/favicon.png';
    const myIcon = <Icon name="account" size={30} color="#900" />;
    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}>
          <View style={{}}>
            <TouchableOpacity
              onPress={() => {
                this.setModalVisible(!this.state.modalVisible);
              }}>
              <FA
                name="cross"
                size={30}
                color={'#32cd32'}
                style={styles.modalcross}
              />
            </TouchableOpacity>
            <View
              style={{
                height: responsiveHeight(25),
                backgroundColor: 'white',
                flexDirection: 'row',
              }}>
              <View
                style={{
                  backgroundColor: 'white',
                  width: '40%',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    backgroundColor: 'white',
                    top: 38,
                    height: 90,
                    width: 90,
                    borderRadius: 20,
                  }}>
                  <Image
                    source={require('../../Assets/watch.jpg')}
                    style={{height: '100%', width: '100%', borderRadius: 20}}
                  />
                </View>
              </View>
              <View style={{backgroundColor: 'white', width: '60%', left: -10}}>
                <Text
                  style={{
                    top: 30,
                    marginHorizontal: 2,
                    fontSize: responsiveFontSize(2.8),
                    fontWeight: 'bold',
                    color: '#000',
                  }}>
                  Seidiledahan
                </Text>

                <Text
                  style={{
                    top: 45,
                    marginHorizontal: 10,
                    fontSize: responsiveFontSize(2.2),
                    fontFamily: 'EvilIcons',
                  }}>
                  Location:
                </Text>
                <Text
                  style={{
                    top: 50,
                    marginHorizontal: 10,
                    fontSize: responsiveFontSize(2.2),
                    fontFamily: 'EvilIcons',
                  }}>
                  Contact Information
                </Text>
                <Text
                  style={{
                    top: 55,
                    marginHorizontal: 10,
                    fontSize: responsiveFontSize(2.2),
                    fontFamily: 'EvilIcons',
                  }}>
                  A Little About Me:
                </Text>
                <Text
                  style={{
                    top: 60,
                    marginHorizontal: 10,
                    fontSize: responsiveFontSize(2.2),
                    fontFamily: 'EvilIcons',
                  }}>
                  Title:
                </Text>
              </View>
            </View>

            {/* <FlatList
                    data={this.state.datasource}
                    showsHorizontalScrollIndicator={false}
                    // horizontal={true}
                    keyExtractor={item => item.id}
                    renderItem={({ item, index }) => */}

            <View
              style={{
                shadowColor: '#000',
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.5,
                shadowRadius: 2,
                elevation: 5,
                backgroundColor: '#eee',
                width: responsiveWidth(100),
                height: responsiveHeight(30),
                borderRadius: 25,
                paddingVertical: 0,
                paddingHorizontal: 0,
                backgroundColor: 'white',
                marginBottom: 5,
                marginTop: 5,
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'white',
                  width: '99%',
                  height: '80%',
                  flexDirection: 'row',
                  marginBottom: 1,
                }}>
                <Image
                  source={require('../../Assets/watch.jpg')}
                  style={{
                    width: '95%',
                    height: '95%',
                    borderRadius: 20,
                  }}></Image>
                <TouchableOpacity style={{position: 'absolute'}}>
                  <AIcon name="play" size={50} color="#24ec28" />
                </TouchableOpacity>
              </View>

              <View
                style={{
                  height: '15%',
                  flexDirection: 'row',
                  paddingHorizontal: 5,
                  backgroundColor: 'white',
                }}>
                <View
                  style={{
                    left: 20,
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
                    878
                  </Text>
                </View>
                <View
                  style={{
                    backgroundColor: 'white',
                    flexDirection: 'row',
                    width: '25%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity>
                    <Icon name="account" size={20} color="#7e7a7a" />
                  </TouchableOpacity>
                  <Text
                    style={{
                      marginHorizontal: 2,
                      fontSize: responsiveFontSize(1.8),
                      fontWeight: '400',
                      color: '#7e7a7a',
                    }}>
                    878
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
                    <EIcon name="like" size={25} color="#7e7a7a" />
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
                    <AIcon name="heart" size={20} color="#24ec28" />
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
            {/* //  }> */}

            {/* </FlatList> */}

            <View
              style={{
                height: responsiveHeight(4),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  top: 0,
                  marginHorizontal: 2,
                  fontSize: responsiveFontSize(2.8),
                  fontWeight: 'bold',
                  color: '#000',
                  textAlign: 'center',
                }}>
                Past Videos From This Speaker
              </Text>
            </View>

            <FlatList
              data={this.state.datasource2}
              keyExtractor={item => item.id}
              renderItem={({item, index}) => (
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
                      <Thumbnail small source={{uri: item.imageName}} />
                    </View>
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        width: '50%',
                        left: 10,
                      }}>
                      <Text
                        style={{
                          fontSize: responsiveFontSize(2.5),
                          fontWeight: 'bold',
                        }}>
                        {item.name}
                      </Text>
                      <Text
                        style={{
                          fontSize: responsiveFontSize(1.5),
                          fontWeight: '400',
                          color: '#7e7a7a',
                        }}>
                        Title
                      </Text>
                    </View>
                    <View style={{flexDirection: 'row', width: '35%'}}>
                      {/* <View
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Text
                          style={{
                            fontSize: responsiveFontSize(1.5),
                            fontWeight: '400',
                            color: '#7e7a7a',
                          }}>
                          Title
                        </Text>
                      </View> */}
                      <View
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Text
                          style={{
                            fontSize: responsiveFontSize(1.5),
                            fontWeight: '400',
                            color: '#7e7a7a',
                            left: 55,
                          }}>
                          8h ago
                        </Text>
                      </View>
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
                    <Image
                      source={require('../../Assets/watch.jpg')}
                      style={{
                        width: '95%',
                        height: '95%',
                        borderRadius: 20,
                      }}></Image>
                    <TouchableOpacity style={{position: 'absolute'}}>
                      <AIcon name="play" size={50} color="#32cd32" />
                    </TouchableOpacity>
                  </View>

                  <View
                    style={{
                      height: '15%',
                      flexDirection: 'row',
                      paddingHorizontal: 5,
                      backgroundColor: 'white',
                      borderRadius: 25,
                    }}>
                    <View
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
                        878
                      </Text>
                    </View>
                    <View
                      style={{
                        backgroundColor: 'white',
                        flexDirection: 'row',
                        width: '25%',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <TouchableOpacity>
                        <Icon name="account" size={20} color="#7e7a7a" />
                      </TouchableOpacity>
                      <Text
                        style={{
                          marginHorizontal: 2,
                          fontSize: responsiveFontSize(1.8),
                          fontWeight: '400',
                          color: '#7e7a7a',
                        }}>
                        878
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
                        <EIcon name="like" size={25} color="#7e7a7a" />
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
                        <AIcon name="heart" size={20} color="#32cd32" />
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
              )}
            />
          </View>
        </Modal>

        <Text style={styles.welcome}>Watch</Text>
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
                <Thumbnail small source={{uri: uri}} />
              </View>
              <TouchableOpacity
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
                  David Jhon
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  right: 5,
                  alignItems: 'center',
                  width: '15%',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontSize: responsiveFontSize(1.8),
                    fontWeight: 'bold',
                    color: '#32cd32',
                  }}>
                  Title
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
              <Image
                source={require('../../Assets/watch.jpg')}
                style={{width: '95%', height: '95%', borderRadius: 20}}></Image>
              <TouchableOpacity style={{position: 'absolute'}}>
                <AIcon name="play" size={50} color="#32cd32" />
              </TouchableOpacity>
            </View>

            <View
              style={{
                height: '15%',
                flexDirection: 'row',
                paddingHorizontal: 5,
                backgroundColor: 'white',
                borderRadius: 25,
              }}>
              <View
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
                    marginHorizontal: 5,
                    fontWeight: '400',
                    fontSize: responsiveFontSize(1.8),
                    color: '#7e7a7a',
                  }}>
                  878
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: 'white',
                  flexDirection: 'row',
                  width: '25%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TouchableOpacity>
                  <Icon name="account" size={20} color="#7e7a7a" />
                </TouchableOpacity>
                <Text
                  style={{
                    marginHorizontal: 5,
                    fontWeight: '400',
                    fontSize: responsiveFontSize(1.8),
                    color: '#7e7a7a',
                  }}>
                  878
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
                  <EIcon name="like" size={25} color="#7e7a7a" />
                </TouchableOpacity>
                <Text
                  style={{
                    marginHorizontal: 5,
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
                  <AIcon name="heart" size={20} color="#32cd32" />
                </TouchableOpacity>

                <Text
                  style={{
                    marginHorizontal: 5,
                    fontSize: responsiveFontSize(1.8),
                    fontWeight: '400',
                    color: '#32cd32',
                  }}>
                  878
                </Text>
              </View>
            </View>
          </View>

          <TouchableOpacity
            style={{height: responsiveHeight(5), backgroundColor: 'white'}}
            onPress={() => {
              this.setModalVisible(true);
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

              <TouchableOpacity
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: responsiveHeight(5),
                  width: responsiveHeight(5),
                  backgroundColor: '#32cd32',
                  flexDirection: 'row',
                  borderRadius: responsiveHeight(5),
                }}>
                <EIcon name="search" size={25} color="white" />
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
                      height: responsiveHeight(12),
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
                  <View
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
                  </View>
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

              <TouchableOpacity
                style={{
                  right: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: responsiveHeight(5),
                  width: responsiveHeight(5),
                  backgroundColor: '#32cd32',
                  flexDirection: 'row',
                  borderRadius: responsiveHeight(5),
                }}>
                <EIcon name="search" size={25} color="white" />
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
                      width: '70%',
                      left: 10,
                    }}>
                    <Text
                      style={{
                        fontSize: responsiveFontSize(2.5),
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
                  <Image
                    source={require('../../Assets/watch.jpg')}
                    style={{
                      width: '95%',
                      height: '95%',
                      borderRadius: 20,
                    }}></Image>
                  <TouchableOpacity style={{position: 'absolute'}}>
                    <AIcon name="play" size={50} color="#32cd32" />
                  </TouchableOpacity>
                </View>

                <View
                  style={{
                    height: '15%',
                    flexDirection: 'row',
                    paddingHorizontal: 5,
                    backgroundColor: 'white',
                    borderRadius: 25,
                  }}>
                  <View
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
                      {item.label.length}
                    </Text>
                  </View>
                  <View
                    style={{
                      backgroundColor: 'white',
                      flexDirection: 'row',
                      width: '25%',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity>
                      <Icon name="account" size={20} color="#7e7a7a" />
                    </TouchableOpacity>
                    <Text
                      style={{
                        marginHorizontal: 2,
                        fontSize: responsiveFontSize(1.8),
                        fontWeight: '400',
                        color: '#7e7a7a',
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
                      <EIcon name="like" size={25} color="#7e7a7a" />
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
                      <AIcon name="heart" size={20} color="#32cd32" />
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
            )}
          />
        </ScrollView>
      </View>
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
});
