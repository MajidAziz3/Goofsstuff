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
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {Thumbnail, Item} from 'native-base';
import {jsxAttribute} from '@babel/types';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import EIcon from 'react-native-vector-icons/EvilIcons';
import AIcon from 'react-native-vector-icons/AntDesign';
import GlobalConst from '../../Backend/GlobalConst';
import firebase from 'firebase';
import {getAllOfCollection} from '../../Backend/Utility';
const height = Dimensions.get('screen').height / 3;
const width = Dimensions.get('screen').width;

export default class CommunityBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datasource: null,
      datasource1: [
        {
          name: 'Harrison Ford',
          imageName: 'https://randomuser.me/api/portraits/men/94.jpg',
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

      alldatasource: [
        {
          name: 'Sports',
          // data: this.state.sport_data,
        },
        {
          name: 'Events',
          // data: this.state.event_data,
        },
        {
          name: 'Outdoor',
        },
      ],
      sportsdatasource: [
        {
          name: 'Cricket',
          //  data: this.state.sport_data,
        },
        {
          name: 'Football',
          //  data: this.state.sport_data,
        },
        {
          name: 'BaseBall',
          // data: this.state.sport_data,
        },
      ],
      jobsdatasource: [
        {
          name: 'IT Section',
        },
        {
          name: 'Finance Department',
        },
        {
          name: 'Marketing',
        },
        {
          name: 'Office Work',
        },
      ],
      eventsdatasource: [
        {
          name: 'Events',
        },
      ],
      outdoordatasource: [
        {
          name: 'Outdoor',
        },
      ],
      allflag: true,
      sportsflag: false,
      eventsflag1: false,
      outdoorflag: false,
      jobflag: false,
      sport_data: [],
      event_data: [],
      loading: true,
      job_data: [],
      outdoor_data: [],
      job_fin: [],
      job_marketing: [],
      job_office: [],
      Football: [],
      BaseBall: [],
      outing: [],
      movies: [],
      birthdays: [],
      other: [],
    };
  }
  async sportPost() {
    firebase
      .firestore()
      .collection('Sport')
      .onSnapshot(async () => {
        let data = await getAllOfCollection('Sport');
        data.map(item => {
          this.setState({
            sport_data: item.Cricket,
            Football: item.football,
            BaseBall: item.baseball,
            loading: false,
          });
          console.log('data', item.Cricket);
        });
      });
  }
  async EventPost() {
    firebase
      .firestore()
      .collection('Event')
      .onSnapshot(async () => {
        let data = await getAllOfCollection('Event');
        data.map(item => {
          this.setState({
            event_data: item.Party,
            birthdays: item.birthday,
            other: item.Other,
            loading: false,
          });
        });
      });
  }
  async JobPost() {
    firebase
      .firestore()
      .collection('Create_Job')
      .onSnapshot(async () => {
        let data = await getAllOfCollection('Create_Job');
        data.map(item => {
          this.setState({
            job_data: item.Job_iT,
            job_fin: item.job_FinanceDepartment,
            job_marketing: item.job_Marketing,
            job_office: item.job_OfficeWork,
            loading: false,
          });
        });
      });
  }

  async outdoorPost() {
    firebase
      .firestore()
      .collection('OutDoor')
      .onSnapshot(async () => {
        let data = await getAllOfCollection('OutDoor');
        data.map(item => {
          this.setState({
            outdoor_data: item.Hiking,
            movies: item.watch_Movie,
            outing: item.Outing,
            loading: false,
          });
        });
      });
  }

  componentDidMount() {
    this.sportPost();
    this.EventPost();
    this.JobPost();
    this.outdoorPost();
    this.setState({datasource: this.state.alldatasource});

    const {addListener} = this.props.navigation;
    const {isDisplayed} = this.state;
    const self = this;

    this.listeners = [
      addListener('didFocus', () => {
        if (self.state.isDisplayed !== true) {
          GlobalConst.STORAGE_KEYS.ScreenType = '4';
          self.setState({isDisplayed: true});
        }
      }),
      addListener('willBlur', () => {
        if (self.state.isDisplayed !== false) {
          GlobalConst.STORAGE_KEYS.ScreenType = '4';

          self.setState({isDisplayed: false});
        }
      }),
    ];
  }

  allEventHandler() {
    const {addListener} = this.props.navigation;
    const {isDisplayed} = this.state;
    const self = this;

    this.listeners = [
      addListener('didFocus', () => {
        if (self.state.isDisplayed !== true) {
          GlobalConst.STORAGE_KEYS.ScreenType = '4';
          self.setState({isDisplayed: true});
        }
      }),
      addListener('willBlur', () => {
        if (self.state.isDisplayed !== false) {
          GlobalConst.STORAGE_KEYS.ScreenType = '4';

          self.setState({isDisplayed: false});
        }
      }),
    ];
    this.setState({
      datasource: this.state.alldatasource,
      allflag: true,
      sportsflag: false,
      eventsflag: false,
      outdoorflag: false,
      jobflag: false,
    });
  }
  sportsEventHandler() {
    const {addListener} = this.props.navigation;
    const {isDisplayed} = this.state;
    const self = this;

    this.listeners = [
      addListener('didFocus', () => {
        if (self.state.isDisplayed !== true) {
          GlobalConst.STORAGE_KEYS.ScreenType = '4';
          self.setState({isDisplayed: true});
        }
      }),
      addListener('willBlur', () => {
        if (self.state.isDisplayed !== false) {
          GlobalConst.STORAGE_KEYS.ScreenType = '4';

          self.setState({isDisplayed: false});
        }
      }),
    ];
    this.setState({
      datasource: this.state.sportsdatasource,
      allflag: false,
      sportsflag: true,
      eventsflag: false,
      outdoorflag: false,
      jobflag: false,
    });
  }
  eventsEventHandler() {
    const {addListener} = this.props.navigation;
    const {isDisplayed} = this.state;
    const self = this;

    this.listeners = [
      addListener('didFocus', () => {
        if (self.state.isDisplayed !== true) {
          GlobalConst.STORAGE_KEYS.ScreenType = '4';
          self.setState({isDisplayed: true});
        }
      }),
      addListener('willBlur', () => {
        if (self.state.isDisplayed !== false) {
          GlobalConst.STORAGE_KEYS.ScreenType = '4';

          self.setState({isDisplayed: false});
        }
      }),
    ];
    this.setState({
      datasource: this.state.eventsdatasource,
      allflag: false,
      sportsflag: false,
      eventsflag: true,
      outdoorflag: false,
      jobflag: false,
    });
  }
  outdoorEventHandler() {
    const {addListener} = this.props.navigation;
    const {isDisplayed} = this.state;
    const self = this;

    this.listeners = [
      addListener('didFocus', () => {
        if (self.state.isDisplayed !== true) {
          GlobalConst.STORAGE_KEYS.ScreenType = '4';
          self.setState({isDisplayed: true});
        }
      }),
      addListener('willBlur', () => {
        if (self.state.isDisplayed !== false) {
          GlobalConst.STORAGE_KEYS.ScreenType = '4';

          self.setState({isDisplayed: false});
        }
      }),
    ];
    this.setState({
      datasource: this.state.outdoordatasource,
      allflag: false,
      sportsflag: false,
      eventsflag: false,
      outdoorflag: true,
      jobflag: false,
    });
  }
  jobEventHandler() {
    const {addListener} = this.props.navigation;
    const {isDisplayed} = this.state;
    const self = this;

    this.listeners = [
      addListener('didFocus', () => {
        if (self.state.isDisplayed !== true) {
          GlobalConst.STORAGE_KEYS.ScreenType = '3';
          self.setState({isDisplayed: true});
        }
      }),
      addListener('willBlur', () => {
        if (self.state.isDisplayed !== false) {
          GlobalConst.STORAGE_KEYS.ScreenType = '3';

          self.setState({isDisplayed: false});
        }
      }),
    ];
    this.setState({
      datasource: this.state.jobsdatasource,
      allflag: false,
      sportsflag: false,
      eventsflag: false,
      outdoorflag: false,
      jobflag: true,
    });
  }
  render() {
    const uri =
      'https://facebook.github.io/react-native/docs/assets/favicon.png';
    const myIcon = <Icon name="account" size={30} color="#900" />;
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.welcome}>Community Board</Text>
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

        <View style={styles.container1}>
          <View
            style={{
              height: responsiveHeight(6),
              backgroundColor: 'white',
              justifyContent: 'center',
              width: '100%',
            }}>
            <View
              style={{
                height: '80%',
                backgroundColor: 'white',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                style={{
                  height: '80%',
                  width: '15%',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => this.allEventHandler()}>
                <Text
                  style={{
                    fontSize: responsiveFontSize(1.8),
                    fontWeight: this.state.allflag === true ? 'bold' : '900',
                    color: this.state.allflag === true ? '#000' : '#8f8f8f',
                  }}>
                  All
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  height: '80%',
                  width: '15%',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
                onPress={() => this.jobEventHandler()}>
                <Text
                  style={{
                    fontSize: responsiveFontSize(1.8),
                    fontWeight: this.state.jobflag === true ? 'bold' : '900',
                    color: this.state.jobflag === true ? '#000' : '#8f8f8f',
                  }}>
                  Jobs
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  height: '80%',
                  width: '15%',
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: 'white',
                }}
                onPress={() => this.sportsEventHandler()}>
                <Text
                  style={{
                    fontSize: responsiveFontSize(1.8),
                    fontWeight: this.state.sportsflag === true ? 'bold' : '900',
                    color: this.state.sportsflag === true ? '#000' : '#8f8f8f',
                  }}>
                  Sports
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  height: '80%',
                  width: '15%',
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }}
                onPress={() => this.eventsEventHandler()}>
                <Text
                  style={{
                    fontSize: responsiveFontSize(1.8),
                    fontWeight: this.state.eventsflag === true ? 'bold' : '900',
                    color: this.state.eventsflag === true ? '#000' : '#8f8f8f',
                  }}>
                  Events
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  height: '80%',
                  width: '15%',
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }}
                onPress={() => this.outdoorEventHandler()}>
                <Text
                  style={{
                    fontSize: responsiveFontSize(1.8),
                    fontWeight:
                      this.state.outdoorflag === true ? 'bold' : '900',
                    color: this.state.outdoorflag === true ? '#000' : '#8f8f8f',
                  }}>
                  Outdoor
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <ScrollView style={{height: '83%'}}>
            {this.state.allflag ? (
              <View>
                <View
                  style={{
                    backgroundColor: 'white',
                    height: responsiveHeight(47),
                    shadowOpacity: 0.5,
                    shadowRadius: 2,
                    elevation: 10,
                    width: responsiveWidth(100),
                    marginBottom: 10,
                    top: 5,
                    borderRadius: 20,
                  }}>
                  <View
                    style={{
                      backgroundColor: 'white',
                      height: '12%',
                      justifyContent: 'flex-end',
                      marginHorizontal: 10,
                    }}>
                    <Text
                      style={{
                        fontSize: responsiveFontSize(2.7),
                        fontWeight: '600',
                        color: 'black',
                        marginLeft: 10,
                      }}>
                      Sport
                    </Text>
                  </View>

                  <View
                    style={{
                      backgroundColor: 'white',
                      height: responsiveHeight(40),
                      flexDirection: 'row',
                      marginTop: 10,
                      borderRadius: 20,
                    }}>
                    <FlatList
                      data={this.state.sport_data}
                      showsHorizontalScrollIndicator={false}
                      horizontal={true}
                      keyExtractor={item => item.id}
                      renderItem={({item, index}) => {
                        // item.Cricket.map(itm => {
                        {
                          console.log(item);
                        }

                        return (
                          <TouchableOpacity
                            style={{backgroundColor: 'white', borderRadius: 20}}
                            onPress={() => {
                              this.state.jobflag === true
                                ? this.props.navigation.navigate('JobInfo', {
                                    item: item,
                                  })
                                : this.props.navigation.navigate(
                                    'CommunityEvent',
                                    {item: item},
                                  );
                            }}>
                            <View
                              style={{backgroundColor: 'white', padding: 5}}>
                              <View
                                style={{
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                <Image
                                  source={require('../../Assets/watch.jpg')}
                                  style={{
                                    width: responsiveHeight(15),
                                    height: responsiveHeight(15),
                                    borderRadius: 20,
                                  }}></Image>
                              </View>

                              <View
                                style={{
                                  width: '100%',
                                  borderRadius: 0,
                                  justifyContent: 'flex-start',
                                  alignItems: 'center',
                                }}>
                                <Text
                                  style={{
                                    fontSize: responsiveFontSize(1.4),
                                    fontWeight: '600',
                                    color: '#5e5d5d',
                                  }}>
                                  {this.state.jobflag ? (
                                    <Text>{item.company_name}</Text>
                                  ) : (
                                    <Text>Sun,Sep 8,10:00 AM</Text>
                                  )}
                                </Text>
                              </View>
                            </View>

                            <View
                              style={{
                                backgroundColor: 'white',
                                height: '45%',
                                width: 150,
                              }}>
                              <View
                                style={{
                                  backgroundColor: 'white',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                <Text
                                  style={{
                                    fontSize: responsiveFontSize(2),
                                    fontWeight: '600',
                                    color: '#5e5d5d',
                                  }}>
                                  {this.state.jobflag ? (
                                    <Text>{item.title}</Text>
                                  ) : (
                                    <Text>{item.sub_category}</Text>
                                  )}
                                </Text>
                              </View>

                              <View
                                style={{
                                  flexDirection: 'row',
                                  backgroundColor: 'white',
                                  height: '40%',
                                  justifyContent: 'flex-start',
                                  alignItems: 'center',
                                }}>
                                <Thumbnail
                                  small
                                  source={{
                                    uri: item.userImg,
                                  }}
                                  style={{
                                    left: 20,
                                    borderRadius: 30,
                                    shadowOpacity: 0.5,
                                    shadowRadius: 2,
                                    elevation: 5,
                                  }}
                                />
                                <Text
                                  style={{
                                    left: 30,
                                    fontSize: responsiveFontSize(1.8),
                                    fontWeight: '600',
                                    color: '#5e5d5d',
                                  }}>
                                  {item.user_name}
                                </Text>
                              </View>

                              <View
                                style={{
                                  flexDirection: 'row',
                                  backgroundColor: 'white',
                                  height: '10%',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                <EIcon
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
                                  {item.location}
                                </Text>
                              </View>

                              <View
                                style={{
                                  backgroundColor: 'white',
                                  width: 130,
                                  height: '35%',
                                  flexDirection: 'row',
                                  left: 10,
                                  borderRadius: 10,
                                  top: 1,
                                }}>
                                <View
                                  style={{
                                    left: 10,
                                    flexDirection: 'row',
                                    backgroundColor: 'white',
                                    width: '70%',
                                    height: '90%',
                                    alignItems: 'center',
                                  }}>
                                  <Thumbnail
                                    small
                                    source={{
                                      uri: item.userImg,
                                    }}
                                    style={{
                                      marginLeft: 0,
                                      borderRadius: 30,
                                      shadowOpacity: 0.5,
                                      shadowRadius: 2,
                                      elevation: 5,
                                      height: 30,
                                      width: 30,
                                    }}
                                  />
                                  <Thumbnail
                                    small
                                    source={{
                                      uri:
                                        'https://randomuser.me/api/portraits/men/51.jpg',
                                    }}
                                    style={{
                                      marginLeft: -10,
                                      borderRadius: 30,
                                      shadowOpacity: 0.5,
                                      shadowRadius: 2,
                                      elevation: 5,
                                      height: 30,
                                      width: 30,
                                    }}
                                  />
                                  <Thumbnail
                                    small
                                    source={{
                                      uri: item.userImg,
                                    }}
                                    style={{
                                      marginLeft: -10,
                                      borderRadius: 30,
                                      shadowOpacity: 0.5,
                                      shadowRadius: 2,
                                      elevation: 5,
                                      height: 30,
                                      width: 30,
                                    }}
                                  />
                                </View>

                                <View
                                  style={{
                                    flexDirection: 'row',
                                    backgroundColor: 'white',
                                    width: '30%',
                                    height: '100%',
                                    justifyContent: 'flex-start',
                                    alignItems: 'center',
                                  }}>
                                  <Text
                                    style={{
                                      fontSize: responsiveFontSize(1.4),
                                      fontWeight: '600',
                                      color: 'black',
                                    }}>
                                    {item.joining_members.length}
                                  </Text>
                                  <AIcon name="plus" size={10} color="#000" />
                                </View>
                              </View>
                            </View>
                          </TouchableOpacity>
                        );

                        // });
                      }}
                    />
                  </View>
                </View>

                {/* event_data */}

                <View
                  style={{
                    backgroundColor: 'white',
                    height: responsiveHeight(47),
                    shadowOpacity: 0.5,
                    shadowRadius: 2,
                    elevation: 10,
                    width: responsiveWidth(100),
                    marginBottom: 10,
                    top: 5,
                    borderRadius: 20,
                  }}>
                  <View
                    style={{
                      backgroundColor: 'white',
                      height: '12%',
                      justifyContent: 'flex-end',
                      marginHorizontal: 10,
                    }}>
                    <Text
                      style={{
                        fontSize: responsiveFontSize(2.7),
                        fontWeight: '600',
                        color: 'black',
                        marginLeft: 10,
                      }}>
                      Event
                    </Text>
                  </View>

                  <View
                    style={{
                      backgroundColor: 'white',
                      height: responsiveHeight(40),
                      flexDirection: 'row',
                      marginTop: 10,
                      borderRadius: 20,
                    }}>
                    <FlatList
                      data={this.state.event_data}
                      showsHorizontalScrollIndicator={false}
                      horizontal={true}
                      keyExtractor={item => item.id}
                      renderItem={({item, index}) => {
                        // item.Cricket.map(itm => {
                        {
                          console.log(item);
                        }

                        return (
                          <TouchableOpacity
                            style={{backgroundColor: 'white', borderRadius: 20}}
                            onPress={() => {
                              this.state.jobflag === true
                                ? this.props.navigation.navigate('JobInfo', {
                                    item: item,
                                  })
                                : this.props.navigation.navigate(
                                    'CommunityEvent',
                                    {item: item},
                                  );
                            }}>
                            <View
                              style={{backgroundColor: 'white', padding: 5}}>
                              <View
                                style={{
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                <Image
                                  source={require('../../Assets/watch.jpg')}
                                  style={{
                                    width: responsiveHeight(15),
                                    height: responsiveHeight(15),
                                    borderRadius: 20,
                                  }}></Image>
                              </View>

                              <View
                                style={{
                                  width: '100%',
                                  borderRadius: 0,
                                  justifyContent: 'flex-start',
                                  alignItems: 'center',
                                }}>
                                <Text
                                  style={{
                                    fontSize: responsiveFontSize(1.4),
                                    fontWeight: '600',
                                    color: '#5e5d5d',
                                  }}>
                                  {this.state.jobflag ? (
                                    <Text>{item.company_name}</Text>
                                  ) : (
                                    <Text>Sun,Sep 8,10:00 AM</Text>
                                  )}
                                </Text>
                              </View>
                            </View>

                            <View
                              style={{
                                backgroundColor: 'white',
                                height: '45%',
                                width: 150,
                              }}>
                              <View
                                style={{
                                  backgroundColor: 'white',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                <Text
                                  style={{
                                    fontSize: responsiveFontSize(2),
                                    fontWeight: '600',
                                    color: '#5e5d5d',
                                  }}>
                                  {this.state.jobflag ? (
                                    <Text>{item.title}</Text>
                                  ) : (
                                    <Text>{item.sub_category}</Text>
                                  )}
                                </Text>
                              </View>

                              <View
                                style={{
                                  flexDirection: 'row',
                                  backgroundColor: 'white',
                                  height: '40%',
                                  justifyContent: 'flex-start',
                                  alignItems: 'center',
                                }}>
                                <Thumbnail
                                  small
                                  source={{
                                    uri: item.userImg,
                                  }}
                                  style={{
                                    left: 20,
                                    borderRadius: 30,
                                    shadowOpacity: 0.5,
                                    shadowRadius: 2,
                                    elevation: 5,
                                  }}
                                />
                                <Text
                                  style={{
                                    left: 30,
                                    fontSize: responsiveFontSize(1.8),
                                    fontWeight: '600',
                                    color: '#5e5d5d',
                                  }}>
                                  {item.user_name}
                                </Text>
                              </View>

                              <View
                                style={{
                                  flexDirection: 'row',
                                  backgroundColor: 'white',
                                  height: '10%',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                <EIcon
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
                                  {item.location}
                                </Text>
                              </View>

                              <View
                                style={{
                                  backgroundColor: 'white',
                                  width: 130,
                                  height: '35%',
                                  flexDirection: 'row',
                                  left: 10,
                                  borderRadius: 10,
                                  top: 1,
                                }}>
                                <View
                                  style={{
                                    left: 10,
                                    flexDirection: 'row',
                                    backgroundColor: 'white',
                                    width: '70%',
                                    height: '90%',
                                    alignItems: 'center',
                                  }}>
                                  <Thumbnail
                                    small
                                    source={{
                                      uri: item.userImg,
                                    }}
                                    style={{
                                      marginLeft: 0,
                                      borderRadius: 30,
                                      shadowOpacity: 0.5,
                                      shadowRadius: 2,
                                      elevation: 5,
                                      height: 30,
                                      width: 30,
                                    }}
                                  />
                                  <Thumbnail
                                    small
                                    source={{
                                      uri: item.userImg,
                                    }}
                                    style={{
                                      marginLeft: -10,
                                      borderRadius: 30,
                                      shadowOpacity: 0.5,
                                      shadowRadius: 2,
                                      elevation: 5,
                                      height: 30,
                                      width: 30,
                                    }}
                                  />
                                  <Thumbnail
                                    small
                                    source={{
                                      uri:
                                        'https://randomuser.me/api/portraits/men/28.jpg',
                                    }}
                                    style={{
                                      marginLeft: -10,
                                      borderRadius: 30,
                                      shadowOpacity: 0.5,
                                      shadowRadius: 2,
                                      elevation: 5,
                                      height: 30,
                                      width: 30,
                                    }}
                                  />
                                </View>

                                <View
                                  style={{
                                    flexDirection: 'row',
                                    backgroundColor: 'white',
                                    width: '30%',
                                    height: '100%',
                                    justifyContent: 'flex-start',
                                    alignItems: 'center',
                                  }}>
                                  <Text
                                    style={{
                                      fontSize: responsiveFontSize(1.4),
                                      fontWeight: '600',
                                      color: 'black',
                                    }}>
                                    {item.joining_members.length}
                                  </Text>
                                  <AIcon name="plus" size={10} color="#000" />
                                </View>
                              </View>
                            </View>
                          </TouchableOpacity>
                        );

                        // });
                      }}
                    />
                  </View>
                </View>

                {/* Outdoor */}

                <View
                  style={{
                    backgroundColor: 'white',
                    height: responsiveHeight(47),
                    shadowOpacity: 0.5,
                    shadowRadius: 2,
                    elevation: 10,
                    width: responsiveWidth(100),
                    marginBottom: 10,
                    top: 5,
                    borderRadius: 20,
                  }}>
                  <View
                    style={{
                      backgroundColor: 'white',
                      height: '12%',
                      justifyContent: 'flex-end',
                      marginHorizontal: 10,
                    }}>
                    <Text
                      style={{
                        fontSize: responsiveFontSize(2.7),
                        fontWeight: '600',
                        color: 'black',
                        marginLeft: 10,
                      }}>
                      OutDoor
                    </Text>
                  </View>

                  <View
                    style={{
                      backgroundColor: 'white',
                      height: responsiveHeight(40),
                      flexDirection: 'row',
                      marginTop: 10,
                      borderRadius: 20,
                    }}>
                    <FlatList
                      data={this.state.outdoor_data}
                      showsHorizontalScrollIndicator={false}
                      horizontal={true}
                      keyExtractor={item => item.id}
                      renderItem={({item, index}) => {
                        // item.Cricket.map(itm => {
                        {
                          console.log(item);
                        }

                        return (
                          <TouchableOpacity
                            style={{backgroundColor: 'white', borderRadius: 20}}
                            onPress={() => {
                              this.state.jobflag === true
                                ? this.props.navigation.navigate('JobInfo', {
                                    item: item,
                                  })
                                : this.props.navigation.navigate(
                                    'CommunityEvent',
                                    {item: item},
                                  );
                            }}>
                            <View
                              style={{backgroundColor: 'white', padding: 5}}>
                              <View
                                style={{
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                <Image
                                  source={require('../../Assets/watch.jpg')}
                                  style={{
                                    width: responsiveHeight(15),
                                    height: responsiveHeight(15),
                                    borderRadius: 20,
                                  }}></Image>
                              </View>

                              <View
                                style={{
                                  width: '100%',
                                  borderRadius: 0,
                                  justifyContent: 'flex-start',
                                  alignItems: 'center',
                                }}>
                                <Text
                                  style={{
                                    fontSize: responsiveFontSize(1.4),
                                    fontWeight: '600',
                                    color: '#5e5d5d',
                                  }}>
                                  {this.state.jobflag ? (
                                    <Text>{item.company_name}</Text>
                                  ) : (
                                    <Text>Sun,Sep 8,10:00 AM</Text>
                                  )}
                                </Text>
                              </View>
                            </View>

                            <View
                              style={{
                                backgroundColor: 'white',
                                height: '45%',
                                width: 150,
                              }}>
                              <View
                                style={{
                                  backgroundColor: 'white',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                <Text
                                  style={{
                                    fontSize: responsiveFontSize(2),
                                    fontWeight: '600',
                                    color: '#5e5d5d',
                                  }}>
                                  {this.state.jobflag ? (
                                    <Text>{item.title}</Text>
                                  ) : (
                                    <Text>{item.sub_category}</Text>
                                  )}
                                </Text>
                              </View>

                              <View
                                style={{
                                  flexDirection: 'row',
                                  backgroundColor: 'white',
                                  height: '40%',
                                  justifyContent: 'flex-start',
                                  alignItems: 'center',
                                }}>
                                <Thumbnail
                                  small
                                  source={{
                                    uri:item.userImg,
                                  }}
                                  style={{
                                    left: 20,
                                    borderRadius: 30,
                                    shadowOpacity: 0.5,
                                    shadowRadius: 2,
                                    elevation: 5,
                                  }}
                                />
                                <Text
                                  style={{
                                    left: 30,
                                    fontSize: responsiveFontSize(1.8),
                                    fontWeight: '600',
                                    color: '#5e5d5d',
                                  }}>
                                  {item.user_name}
                                </Text>
                              </View>

                              <View
                                style={{
                                  flexDirection: 'row',
                                  backgroundColor: 'white',
                                  height: '10%',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                <EIcon
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
                                  {item.location}
                                </Text>
                              </View>

                              <View
                                style={{
                                  backgroundColor: 'white',
                                  width: 130,
                                  height: '35%',
                                  flexDirection: 'row',
                                  left: 10,
                                  borderRadius: 10,
                                  top: 1,
                                }}>
                                <View
                                  style={{
                                    left: 10,
                                    flexDirection: 'row',
                                    backgroundColor: 'white',
                                    width: '70%',
                                    height: '90%',
                                    alignItems: 'center',
                                  }}>
                                  <Thumbnail
                                    small
                                    source={{
                                      uri: item.userImg,
                                    }}
                                    style={{
                                      marginLeft: 0,
                                      borderRadius: 30,
                                      shadowOpacity: 0.5,
                                      shadowRadius: 2,
                                      elevation: 5,
                                      height: 30,
                                      width: 30,
                                    }}
                                  />
                                  <Thumbnail
                                    small
                                    source={{
                                      uri:item.userImg,
                                    }}
                                    style={{
                                      marginLeft: -10,
                                      borderRadius: 30,
                                      shadowOpacity: 0.5,
                                      shadowRadius: 2,
                                      elevation: 5,
                                      height: 30,
                                      width: 30,
                                    }}
                                  />
                                  <Thumbnail
                                    small
                                    source={{
                                      uri:
                                        'https://randomuser.me/api/portraits/men/28.jpg',
                                    }}
                                    style={{
                                      marginLeft: -10,
                                      borderRadius: 30,
                                      shadowOpacity: 0.5,
                                      shadowRadius: 2,
                                      elevation: 5,
                                      height: 30,
                                      width: 30,
                                    }}
                                  />
                                </View>

                                <View
                                  style={{
                                    flexDirection: 'row',
                                    backgroundColor: 'white',
                                    width: '30%',
                                    height: '100%',
                                    justifyContent: 'flex-start',
                                    alignItems: 'center',
                                  }}>
                                  <Text
                                    style={{
                                      fontSize: responsiveFontSize(1.4),
                                      fontWeight: '600',
                                      color: 'black',
                                    }}>
                                    {item.joining_members.length}
                                  </Text>
                                  <AIcon name="plus" size={10} color="#000" />
                                </View>
                              </View>
                            </View>
                          </TouchableOpacity>
                        );

                        // });
                      }}
                    />
                  </View>
                </View>

                {/* Jobs */}

                <View
                  style={{
                    backgroundColor: 'white',
                    height: responsiveHeight(47),
                    shadowOpacity: 0.5,
                    shadowRadius: 2,
                    elevation: 10,
                    width: responsiveWidth(100),
                    marginBottom: 10,
                    top: 5,
                    borderRadius: 20,
                  }}>
                  <View
                    style={{
                      backgroundColor: 'white',
                      height: '12%',
                      justifyContent: 'flex-end',
                      marginHorizontal: 10,
                    }}>
                    <Text
                      style={{
                        fontSize: responsiveFontSize(2.7),
                        fontWeight: '600',
                        color: 'black',
                        marginLeft: 10,
                      }}>
                      Jobs
                    </Text>
                  </View>

                  <View
                    style={{
                      backgroundColor: 'white',
                      height: responsiveHeight(40),
                      flexDirection: 'row',
                      marginTop: 10,
                      borderRadius: 20,
                    }}>
                    <FlatList
                      data={this.state.job_data}
                      showsHorizontalScrollIndicator={false}
                      horizontal={true}
                      keyExtractor={item => item.id}
                      renderItem={({item, index}) => {
                        // item.Cricket.map(itm => {
                        {
                          console.log(item);
                        }

                        return (
                          <TouchableOpacity
                            style={{backgroundColor: 'white', borderRadius: 20}}
                            onPress={() => {
                              this.state.jobflag === true
                                ? this.props.navigation.navigate('JobInfo', {
                                    item: item,
                                  })
                                : this.props.navigation.navigate(
                                    'CommunityEvent',
                                    {item: item},
                                  );
                            }}>
                            <View
                              style={{backgroundColor: 'white', padding: 5}}>
                              <View
                                style={{
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                <Image
                                  source={require('../../Assets/watch.jpg')}
                                  style={{
                                    width: responsiveHeight(15),
                                    height: responsiveHeight(15),
                                    borderRadius: 20,
                                  }}></Image>
                              </View>

                              <View
                                style={{
                                  width: '100%',
                                  borderRadius: 0,
                                  justifyContent: 'flex-start',
                                  alignItems: 'center',
                                }}>
                                <Text
                                  style={{
                                    fontSize: responsiveFontSize(1.4),
                                    fontWeight: '600',
                                    color: '#5e5d5d',
                                  }}>
                                  {item.company_name}
                                </Text>
                              </View>
                            </View>

                            <View
                              style={{
                                backgroundColor: 'white',
                                height: '45%',
                                width: 150,
                              }}>
                              <View
                                style={{
                                  backgroundColor: 'white',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                <Text
                                  style={{
                                    fontSize: responsiveFontSize(2),
                                    fontWeight: '600',
                                    color: '#5e5d5d',
                                  }}>
                                  {this.state.jobflag ? (
                                    <Text>{item.title}</Text>
                                  ) : (
                                    <Text>{item.sub_category}</Text>
                                  )}
                                </Text>
                              </View>

                              <View
                                style={{
                                  flexDirection: 'row',
                                  backgroundColor: 'white',
                                  height: '40%',
                                  justifyContent: 'flex-start',
                                  alignItems: 'center',
                                }}>
                                <Thumbnail
                                  small
                                  source={{uri: item.userImg}}
                                  style={{
                                    left: 20,
                                    borderRadius: 30,
                                    shadowOpacity: 0.5,
                                    shadowRadius: 2,
                                    elevation: 5,
                                  }}
                                />
                                <Text
                                  style={{
                                    left: 30,
                                    fontSize: responsiveFontSize(1.8),
                                    fontWeight: '600',
                                    color: '#5e5d5d',
                                  }}>
                                  {item.user_name}
                                </Text>
                              </View>

                              <View
                                style={{
                                  flexDirection: 'row',
                                  backgroundColor: 'white',
                                  height: '10%',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                <EIcon
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
                                  {item.location}
                                </Text>
                              </View>

                              <View
                                style={{
                                  backgroundColor: 'white',
                                  width: 130,
                                  height: '35%',
                                  flexDirection: 'row',
                                  left: 10,
                                  borderRadius: 10,
                                  top: 1,
                                }}></View>
                            </View>
                          </TouchableOpacity>
                        );

                        // });
                      }}
                    />
                  </View>
                </View>
              </View>
            ) : this.state.jobflag ? (
              <View>
                <View
                  style={{
                    backgroundColor: 'white',
                    height: responsiveHeight(47),
                    shadowOpacity: 0.5,
                    shadowRadius: 2,
                    elevation: 10,
                    width: responsiveWidth(100),
                    marginBottom: 10,
                    top: 5,
                    borderRadius: 20,
                  }}>
                  <View
                    style={{
                      backgroundColor: 'white',
                      height: '12%',
                      justifyContent: 'flex-end',
                      marginHorizontal: 10,
                    }}>
                    <Text
                      style={{
                        fontSize: responsiveFontSize(2.7),
                        fontWeight: '600',
                        color: 'black',
                        marginLeft: 10,
                      }}>
                      IT Section
                    </Text>
                  </View>

                  <View
                    style={{
                      backgroundColor: 'white',
                      height: responsiveHeight(40),
                      flexDirection: 'row',
                      marginTop: 10,
                      borderRadius: 20,
                    }}>
                    <FlatList
                      data={this.state.job_data}
                      showsHorizontalScrollIndicator={false}
                      horizontal={true}
                      keyExtractor={item => item.id}
                      renderItem={({item, index}) => {
                        // item.Cricket.map(itm => {
                        {
                          console.log(item);
                        }

                        return (
                          <TouchableOpacity
                            style={{backgroundColor: 'white', borderRadius: 20}}
                            onPress={() => {
                              this.state.jobflag === true
                                ? this.props.navigation.navigate('JobInfo', {
                                    item: item,
                                  })
                                : this.props.navigation.navigate(
                                    'CommunityEvent',
                                    {item: item},
                                  );
                            }}>
                            <View
                              style={{backgroundColor: 'white', padding: 5}}>
                              <View
                                style={{
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                <Image
                                  source={require('../../Assets/watch.jpg')}
                                  style={{
                                    width: responsiveHeight(15),
                                    height: responsiveHeight(15),
                                    borderRadius: 20,
                                  }}></Image>
                              </View>

                              <View
                                style={{
                                  width: '100%',
                                  borderRadius: 0,
                                  justifyContent: 'flex-start',
                                  alignItems: 'center',
                                }}>
                                <Text
                                  style={{
                                    fontSize: responsiveFontSize(1.4),
                                    fontWeight: '600',
                                    color: '#5e5d5d',
                                  }}>
                                  {this.state.jobflag ? (
                                    <Text>{item.company_name}</Text>
                                  ) : (
                                    <Text>Sun,Sep 8,10:00 AM</Text>
                                  )}
                                </Text>
                              </View>
                            </View>

                            <View
                              style={{
                                backgroundColor: 'white',
                                height: '45%',
                                width: 150,
                              }}>
                              <View
                                style={{
                                  backgroundColor: 'white',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                <Text
                                  style={{
                                    fontSize: responsiveFontSize(2),
                                    fontWeight: '600',
                                    color: '#5e5d5d',
                                  }}>
                                  {this.state.jobflag ? (
                                    <Text>{item.title}</Text>
                                  ) : (
                                    <Text>{item.sub_category}</Text>
                                  )}
                                </Text>
                              </View>

                              <View
                                style={{
                                  flexDirection: 'row',
                                  backgroundColor: 'white',
                                  height: '40%',
                                  justifyContent: 'flex-start',
                                  alignItems: 'center',
                                }}>
                                <Thumbnail
                                  small
                                  source={{
                                    uri:
                                      'https://randomuser.me/api/portraits/men/45.jpg',
                                  }}
                                  style={{
                                    left: 20,
                                    borderRadius: 30,
                                    shadowOpacity: 0.5,
                                    shadowRadius: 2,
                                    elevation: 5,
                                  }}
                                />
                                <Text
                                  style={{
                                    left: 30,
                                    fontSize: responsiveFontSize(1.8),
                                    fontWeight: '600',
                                    color: '#5e5d5d',
                                  }}>
                                  {item.user_name}
                                </Text>
                              </View>

                              <View
                                style={{
                                  flexDirection: 'row',
                                  backgroundColor: 'white',
                                  height: '10%',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                <EIcon
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
                                  {item.location}
                                </Text>
                              </View>
                            </View>
                          </TouchableOpacity>
                        );

                        // });
                      }}
                    />
                  </View>
                </View>

                {/* event_data */}

                <View
                  style={{
                    backgroundColor: 'white',
                    height: responsiveHeight(47),
                    shadowOpacity: 0.5,
                    shadowRadius: 2,
                    elevation: 10,
                    width: responsiveWidth(100),
                    marginBottom: 10,
                    top: 5,
                    borderRadius: 20,
                  }}>
                  <View
                    style={{
                      backgroundColor: 'white',
                      height: '12%',
                      justifyContent: 'flex-end',
                      marginHorizontal: 10,
                    }}>
                    <Text
                      style={{
                        fontSize: responsiveFontSize(2.7),
                        fontWeight: '600',
                        color: 'black',
                        marginLeft: 10,
                      }}>
                      Finance Department
                    </Text>
                  </View>

                  <View
                    style={{
                      backgroundColor: 'white',
                      height: responsiveHeight(40),
                      flexDirection: 'row',
                      marginTop: 10,
                      borderRadius: 20,
                    }}>
                    <FlatList
                      data={this.state.job_fin}
                      showsHorizontalScrollIndicator={false}
                      horizontal={true}
                      keyExtractor={item => item.id}
                      renderItem={({item, index}) => {
                        // item.Cricket.map(itm => {
                        {
                          console.log(item);
                        }

                        return (
                          <TouchableOpacity
                            style={{backgroundColor: 'white', borderRadius: 20}}
                            onPress={() => {
                              this.state.jobflag === true
                                ? this.props.navigation.navigate('JobInfo', {
                                    item: item,
                                  })
                                : this.props.navigation.navigate(
                                    'CommunityEvent',
                                    {item: item},
                                  );
                            }}>
                            <View
                              style={{backgroundColor: 'white', padding: 5}}>
                              <View
                                style={{
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                <Image
                                  source={require('../../Assets/watch.jpg')}
                                  style={{
                                    width: responsiveHeight(15),
                                    height: responsiveHeight(15),
                                    borderRadius: 20,
                                  }}></Image>
                              </View>

                              <View
                                style={{
                                  width: '100%',
                                  borderRadius: 0,
                                  justifyContent: 'flex-start',
                                  alignItems: 'center',
                                }}>
                                <Text
                                  style={{
                                    fontSize: responsiveFontSize(1.4),
                                    fontWeight: '600',
                                    color: '#5e5d5d',
                                  }}>
                                  {this.state.jobflag ? (
                                    <Text>{item.company_name}</Text>
                                  ) : (
                                    <Text>Sun,Sep 8,10:00 AM</Text>
                                  )}
                                </Text>
                              </View>
                            </View>

                            <View
                              style={{
                                backgroundColor: 'white',
                                height: '45%',
                                width: 150,
                              }}>
                              <View
                                style={{
                                  backgroundColor: 'white',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                <Text
                                  style={{
                                    fontSize: responsiveFontSize(2),
                                    fontWeight: '600',
                                    color: '#5e5d5d',
                                  }}>
                                  {this.state.jobflag ? (
                                    <Text>{item.title}</Text>
                                  ) : (
                                    <Text>{item.sub_category}</Text>
                                  )}
                                </Text>
                              </View>

                              <View
                                style={{
                                  flexDirection: 'row',
                                  backgroundColor: 'white',
                                  height: '40%',
                                  justifyContent: 'flex-start',
                                  alignItems: 'center',
                                }}>
                                <Thumbnail
                                  small
                                  source={{
                                    uri:
                                      'https://randomuser.me/api/portraits/men/45.jpg',
                                  }}
                                  style={{
                                    left: 20,
                                    borderRadius: 30,
                                    shadowOpacity: 0.5,
                                    shadowRadius: 2,
                                    elevation: 5,
                                  }}
                                />
                                <Text
                                  style={{
                                    left: 30,
                                    fontSize: responsiveFontSize(1.8),
                                    fontWeight: '600',
                                    color: '#5e5d5d',
                                  }}>
                                  {item.user_name}
                                </Text>
                              </View>

                              <View
                                style={{
                                  flexDirection: 'row',
                                  backgroundColor: 'white',
                                  height: '10%',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                <EIcon
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
                                  {item.location}
                                </Text>
                              </View>
                            </View>
                          </TouchableOpacity>
                        );

                        // });
                      }}
                    />
                  </View>
                </View>

                {/* Outdoor */}

                <View
                  style={{
                    backgroundColor: 'white',
                    height: responsiveHeight(47),
                    shadowOpacity: 0.5,
                    shadowRadius: 2,
                    elevation: 10,
                    width: responsiveWidth(100),
                    marginBottom: 10,
                    top: 5,
                    borderRadius: 20,
                  }}>
                  <View
                    style={{
                      backgroundColor: 'white',
                      height: '12%',
                      justifyContent: 'flex-end',
                      marginHorizontal: 10,
                    }}>
                    <Text
                      style={{
                        fontSize: responsiveFontSize(2.7),
                        fontWeight: '600',
                        color: 'black',
                        marginLeft: 10,
                      }}>
                      Marking
                    </Text>
                  </View>

                  <View
                    style={{
                      backgroundColor: 'white',
                      height: responsiveHeight(40),
                      flexDirection: 'row',
                      marginTop: 10,
                      borderRadius: 20,
                    }}>
                    <FlatList
                      data={this.state.job_marketing}
                      showsHorizontalScrollIndicator={false}
                      horizontal={true}
                      keyExtractor={item => item.id}
                      renderItem={({item, index}) => {
                        // item.Cricket.map(itm => {
                        {
                          console.log(item);
                        }

                        return (
                          <TouchableOpacity
                            style={{backgroundColor: 'white', borderRadius: 20}}
                            onPress={() => {
                              this.state.jobflag === true
                                ? this.props.navigation.navigate('JobInfo', {
                                    item: item,
                                  })
                                : this.props.navigation.navigate(
                                    'CommunityEvent',
                                    {item: item},
                                  );
                            }}>
                            <View
                              style={{backgroundColor: 'white', padding: 5}}>
                              <View
                                style={{
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                <Image
                                  source={require('../../Assets/watch.jpg')}
                                  style={{
                                    width: responsiveHeight(15),
                                    height: responsiveHeight(15),
                                    borderRadius: 20,
                                  }}></Image>
                              </View>

                              <View
                                style={{
                                  width: '100%',
                                  borderRadius: 0,
                                  justifyContent: 'flex-start',
                                  alignItems: 'center',
                                }}>
                                <Text
                                  style={{
                                    fontSize: responsiveFontSize(1.4),
                                    fontWeight: '600',
                                    color: '#5e5d5d',
                                  }}>
                                  {this.state.jobflag ? (
                                    <Text>{item.company_name}</Text>
                                  ) : (
                                    <Text>Sun,Sep 8,10:00 AM</Text>
                                  )}
                                </Text>
                              </View>
                            </View>

                            <View
                              style={{
                                backgroundColor: 'white',
                                height: '45%',
                                width: 150,
                              }}>
                              <View
                                style={{
                                  backgroundColor: 'white',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                <Text
                                  style={{
                                    fontSize: responsiveFontSize(2),
                                    fontWeight: '600',
                                    color: '#5e5d5d',
                                  }}>
                                  {this.state.jobflag ? (
                                    <Text>{item.title}</Text>
                                  ) : (
                                    <Text>{item.sub_category}</Text>
                                  )}
                                </Text>
                              </View>

                              <View
                                style={{
                                  flexDirection: 'row',
                                  backgroundColor: 'white',
                                  height: '40%',
                                  justifyContent: 'flex-start',
                                  alignItems: 'center',
                                }}>
                                <Thumbnail
                                  small
                                  source={{
                                    uri:
                                      'https://randomuser.me/api/portraits/men/45.jpg',
                                  }}
                                  style={{
                                    left: 20,
                                    borderRadius: 30,
                                    shadowOpacity: 0.5,
                                    shadowRadius: 2,
                                    elevation: 5,
                                  }}
                                />
                                <Text
                                  style={{
                                    left: 30,
                                    fontSize: responsiveFontSize(1.8),
                                    fontWeight: '600',
                                    color: '#5e5d5d',
                                  }}>
                                  {item.user_name}
                                </Text>
                              </View>

                              <View
                                style={{
                                  flexDirection: 'row',
                                  backgroundColor: 'white',
                                  height: '10%',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                <EIcon
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
                                  {item.location}
                                </Text>
                              </View>
                            </View>
                          </TouchableOpacity>
                        );

                        // });
                      }}
                    />
                  </View>
                </View>

                {/* Jobs */}

                <View
                  style={{
                    backgroundColor: 'white',
                    height: responsiveHeight(47),
                    shadowOpacity: 0.5,
                    shadowRadius: 2,
                    elevation: 10,
                    width: responsiveWidth(100),
                    marginBottom: 10,
                    top: 5,
                    borderRadius: 20,
                  }}>
                  <View
                    style={{
                      backgroundColor: 'white',
                      height: '12%',
                      justifyContent: 'flex-end',
                      marginHorizontal: 10,
                    }}>
                    <Text
                      style={{
                        fontSize: responsiveFontSize(2.7),
                        fontWeight: '600',
                        color: 'black',
                        marginLeft: 10,
                      }}>
                      Office Work
                    </Text>
                  </View>

                  <View
                    style={{
                      backgroundColor: 'white',
                      height: responsiveHeight(40),
                      flexDirection: 'row',
                      marginTop: 10,
                      borderRadius: 20,
                    }}>
                    <FlatList
                      data={this.state.job_office}
                      showsHorizontalScrollIndicator={false}
                      horizontal={true}
                      keyExtractor={item => item.id}
                      renderItem={({item, index}) => {
                        // item.Cricket.map(itm => {
                        {
                          console.log(item);
                        }

                        return (
                          <TouchableOpacity
                            style={{backgroundColor: 'white', borderRadius: 20}}
                            onPress={() => {
                              this.state.jobflag === true
                                ? this.props.navigation.navigate('JobInfo', {
                                    item: item,
                                  })
                                : this.props.navigation.navigate(
                                    'CommunityEvent',
                                    {item: item},
                                  );
                            }}>
                            <View
                              style={{backgroundColor: 'white', padding: 5}}>
                              <View
                                style={{
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                <Image
                                  source={require('../../Assets/watch.jpg')}
                                  style={{
                                    width: responsiveHeight(15),
                                    height: responsiveHeight(15),
                                    borderRadius: 20,
                                  }}></Image>
                              </View>

                              <View
                                style={{
                                  width: '100%',
                                  borderRadius: 0,
                                  justifyContent: 'flex-start',
                                  alignItems: 'center',
                                }}>
                                <Text
                                  style={{
                                    fontSize: responsiveFontSize(1.4),
                                    fontWeight: '600',
                                    color: '#5e5d5d',
                                  }}>
                                  {item.company_name}
                                </Text>
                              </View>
                            </View>

                            <View
                              style={{
                                backgroundColor: 'white',
                                height: '45%',
                                width: 150,
                              }}>
                              <View
                                style={{
                                  backgroundColor: 'white',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                <Text
                                  style={{
                                    fontSize: responsiveFontSize(2),
                                    fontWeight: '600',
                                    color: '#5e5d5d',
                                  }}>
                                  {this.state.jobflag ? (
                                    <Text>{item.title}</Text>
                                  ) : (
                                    <Text>{item.sub_category}</Text>
                                  )}
                                </Text>
                              </View>

                              <View
                                style={{
                                  flexDirection: 'row',
                                  backgroundColor: 'white',
                                  height: '40%',
                                  justifyContent: 'flex-start',
                                  alignItems: 'center',
                                }}>
                                <Thumbnail
                                  small
                                  source={{uri: item.userImg}}
                                  style={{
                                    left: 20,
                                    borderRadius: 30,
                                    shadowOpacity: 0.5,
                                    shadowRadius: 2,
                                    elevation: 5,
                                  }}
                                />
                                <Text
                                  style={{
                                    left: 30,
                                    fontSize: responsiveFontSize(1.8),
                                    fontWeight: '600',
                                    color: '#5e5d5d',
                                  }}>
                                  {item.user_name}
                                </Text>
                              </View>

                              <View
                                style={{
                                  flexDirection: 'row',
                                  backgroundColor: 'white',
                                  height: '10%',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                <EIcon
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
                                  {item.location}
                                </Text>
                              </View>

                              <View
                                style={{
                                  backgroundColor: 'white',
                                  width: 130,
                                  height: '35%',
                                  flexDirection: 'row',
                                  left: 10,
                                  borderRadius: 10,
                                  top: 1,
                                }}></View>
                            </View>
                          </TouchableOpacity>
                        );

                        // });
                      }}
                    />
                  </View>
                </View>
              </View>
            ) : this.state.eventsflag ? (
              <View>
                <View
                  style={{
                    backgroundColor: 'white',
                    height: responsiveHeight(47),
                    shadowOpacity: 0.5,
                    shadowRadius: 2,
                    elevation: 10,
                    width: responsiveWidth(100),
                    marginBottom: 10,
                    top: 5,
                    borderRadius: 20,
                  }}>
                  <View
                    style={{
                      backgroundColor: 'white',
                      height: '12%',
                      justifyContent: 'flex-end',
                      marginHorizontal: 10,
                    }}>
                    <Text
                      style={{
                        fontSize: responsiveFontSize(2.7),
                        fontWeight: '600',
                        color: 'black',
                        marginLeft: 10,
                      }}>
                      Party
                    </Text>
                  </View>

                  <View
                    style={{
                      backgroundColor: 'white',
                      height: responsiveHeight(40),
                      flexDirection: 'row',
                      marginTop: 10,
                      borderRadius: 20,
                    }}>
                    <FlatList
                      data={this.state.event_data}
                      showsHorizontalScrollIndicator={false}
                      horizontal={true}
                      keyExtractor={item => item.id}
                      renderItem={({item, index}) => {
                        // item.Cricket.map(itm => {
                        {
                          console.log(item);
                        }

                        return (
                          <TouchableOpacity
                            style={{backgroundColor: 'white', borderRadius: 20}}
                            onPress={() => {
                              this.state.jobflag === true
                                ? this.props.navigation.navigate('JobInfo', {
                                    item: item,
                                  })
                                : this.props.navigation.navigate(
                                    'CommunityEvent',
                                    {item: item},
                                  );
                            }}>
                            <View
                              style={{backgroundColor: 'white', padding: 5}}>
                              <View
                                style={{
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                <Image
                                  source={require('../../Assets/watch.jpg')}
                                  style={{
                                    width: responsiveHeight(15),
                                    height: responsiveHeight(15),
                                    borderRadius: 20,
                                  }}></Image>
                              </View>

                              <View
                                style={{
                                  width: '100%',
                                  borderRadius: 0,
                                  justifyContent: 'flex-start',
                                  alignItems: 'center',
                                }}>
                                <Text
                                  style={{
                                    fontSize: responsiveFontSize(1.4),
                                    fontWeight: '600',
                                    color: '#5e5d5d',
                                  }}>
                                  {this.state.jobflag ? (
                                    <Text>{item.company_name}</Text>
                                  ) : (
                                    <Text>Sun,Sep 8,10:00 AM</Text>
                                  )}
                                </Text>
                              </View>
                            </View>

                            <View
                              style={{
                                backgroundColor: 'white',
                                height: '45%',
                                width: 150,
                              }}>
                              <View
                                style={{
                                  backgroundColor: 'white',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                <Text
                                  style={{
                                    fontSize: responsiveFontSize(2),
                                    fontWeight: '600',
                                    color: '#5e5d5d',
                                  }}>
                                  {this.state.jobflag ? (
                                    <Text>{item.title}</Text>
                                  ) : (
                                    <Text>{item.sub_category}</Text>
                                  )}
                                </Text>
                              </View>

                              <View
                                style={{
                                  flexDirection: 'row',
                                  backgroundColor: 'white',
                                  height: '40%',
                                  justifyContent: 'flex-start',
                                  alignItems: 'center',
                                }}>
                                <Thumbnail
                                  small
                                  source={{
                                    uri:
                                      'https://randomuser.me/api/portraits/men/45.jpg',
                                  }}
                                  style={{
                                    left: 20,
                                    borderRadius: 30,
                                    shadowOpacity: 0.5,
                                    shadowRadius: 2,
                                    elevation: 5,
                                  }}
                                />
                                <Text
                                  style={{
                                    left: 30,
                                    fontSize: responsiveFontSize(1.8),
                                    fontWeight: '600',
                                    color: '#5e5d5d',
                                  }}>
                                  {item.user_name}
                                </Text>
                              </View>

                              <View
                                style={{
                                  flexDirection: 'row',
                                  backgroundColor: 'white',
                                  height: '10%',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                <EIcon
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
                                  {item.location}
                                </Text>
                              </View>

                              <View
                                style={{
                                  backgroundColor: 'white',
                                  width: 130,
                                  height: '35%',
                                  flexDirection: 'row',
                                  left: 10,
                                  borderRadius: 10,
                                  top: 1,
                                }}>
                                <View
                                  style={{
                                    left: 10,
                                    flexDirection: 'row',
                                    backgroundColor: 'white',
                                    width: '70%',
                                    height: '90%',
                                    alignItems: 'center',
                                  }}>
                                  <Thumbnail
                                    small
                                    source={{
                                      uri: item.userImg,
                                    }}
                                    style={{
                                      marginLeft: 0,
                                      borderRadius: 30,
                                      shadowOpacity: 0.5,
                                      shadowRadius: 2,
                                      elevation: 5,
                                      height: 30,
                                      width: 30,
                                    }}
                                  />
                                  <Thumbnail
                                    small
                                    source={{
                                      uri:
                                        'https://randomuser.me/api/portraits/men/51.jpg',
                                    }}
                                    style={{
                                      marginLeft: -10,
                                      borderRadius: 30,
                                      shadowOpacity: 0.5,
                                      shadowRadius: 2,
                                      elevation: 5,
                                      height: 30,
                                      width: 30,
                                    }}
                                  />
                                  <Thumbnail
                                    small
                                    source={{
                                      uri:
                                        'https://randomuser.me/api/portraits/men/28.jpg',
                                    }}
                                    style={{
                                      marginLeft: -10,
                                      borderRadius: 30,
                                      shadowOpacity: 0.5,
                                      shadowRadius: 2,
                                      elevation: 5,
                                      height: 30,
                                      width: 30,
                                    }}
                                  />
                                </View>

                                <View
                                  style={{
                                    flexDirection: 'row',
                                    backgroundColor: 'white',
                                    width: '30%',
                                    height: '100%',
                                    justifyContent: 'flex-start',
                                    alignItems: 'center',
                                  }}>
                                  <Text
                                    style={{
                                      fontSize: responsiveFontSize(1.4),
                                      fontWeight: '600',
                                      color: 'black',
                                    }}>
                                    {item.joining_members.length}
                                  </Text>
                                  <AIcon name="plus" size={10} color="#000" />
                                </View>
                              </View>
                            </View>
                          </TouchableOpacity>
                        );

                        // });
                      }}
                    />
                  </View>
                </View>

                {/* event_data */}

                <View
                  style={{
                    backgroundColor: 'white',
                    height: responsiveHeight(47),
                    shadowOpacity: 0.5,
                    shadowRadius: 2,
                    elevation: 10,
                    width: responsiveWidth(100),
                    marginBottom: 10,
                    top: 5,
                    borderRadius: 20,
                  }}>
                  <View
                    style={{
                      backgroundColor: 'white',
                      height: '12%',
                      justifyContent: 'flex-end',
                      marginHorizontal: 10,
                    }}>
                    <Text
                      style={{
                        fontSize: responsiveFontSize(2.7),
                        fontWeight: '600',
                        color: 'black',
                        marginLeft: 10,
                      }}>
                      Birth Day
                    </Text>
                  </View>

                  <View
                    style={{
                      backgroundColor: 'white',
                      height: responsiveHeight(40),
                      flexDirection: 'row',
                      marginTop: 10,
                      borderRadius: 20,
                    }}>
                    <FlatList
                      data={this.state.birthdays}
                      showsHorizontalScrollIndicator={false}
                      horizontal={true}
                      keyExtractor={item => item.id}
                      renderItem={({item, index}) => {
                        // item.Cricket.map(itm => {
                        {
                          console.log(item);
                        }

                        return (
                          <TouchableOpacity
                            style={{backgroundColor: 'white', borderRadius: 20}}
                            onPress={() => {
                              this.state.jobflag === true
                                ? this.props.navigation.navigate('JobInfo', {
                                    item: item,
                                  })
                                : this.props.navigation.navigate(
                                    'CommunityEvent',
                                    {item: item},
                                  );
                            }}>
                            <View
                              style={{backgroundColor: 'white', padding: 5}}>
                              <View
                                style={{
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                <Image
                                  source={require('../../Assets/watch.jpg')}
                                  style={{
                                    width: responsiveHeight(15),
                                    height: responsiveHeight(15),
                                    borderRadius: 20,
                                  }}></Image>
                              </View>

                              <View
                                style={{
                                  width: '100%',
                                  borderRadius: 0,
                                  justifyContent: 'flex-start',
                                  alignItems: 'center',
                                }}>
                                <Text
                                  style={{
                                    fontSize: responsiveFontSize(1.4),
                                    fontWeight: '600',
                                    color: '#5e5d5d',
                                  }}>
                                  {this.state.jobflag ? (
                                    <Text>{item.company_name}</Text>
                                  ) : (
                                    <Text>Sun,Sep 8,10:00 AM</Text>
                                  )}
                                </Text>
                              </View>
                            </View>

                            <View
                              style={{
                                backgroundColor: 'white',
                                height: '45%',
                                width: 150,
                              }}>
                              <View
                                style={{
                                  backgroundColor: 'white',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                <Text
                                  style={{
                                    fontSize: responsiveFontSize(2),
                                    fontWeight: '600',
                                    color: '#5e5d5d',
                                  }}>
                                  {this.state.jobflag ? (
                                    <Text>{item.title}</Text>
                                  ) : (
                                    <Text>{item.sub_category}</Text>
                                  )}
                                </Text>
                              </View>

                              <View
                                style={{
                                  flexDirection: 'row',
                                  backgroundColor: 'white',
                                  height: '40%',
                                  justifyContent: 'flex-start',
                                  alignItems: 'center',
                                }}>
                                <Thumbnail
                                  small
                                  source={{
                                    uri:
                                      'https://randomuser.me/api/portraits/men/45.jpg',
                                  }}
                                  style={{
                                    left: 20,
                                    borderRadius: 30,
                                    shadowOpacity: 0.5,
                                    shadowRadius: 2,
                                    elevation: 5,
                                  }}
                                />
                                <Text
                                  style={{
                                    left: 30,
                                    fontSize: responsiveFontSize(1.8),
                                    fontWeight: '600',
                                    color: '#5e5d5d',
                                  }}>
                                  {item.user_name}
                                </Text>
                              </View>

                              <View
                                style={{
                                  flexDirection: 'row',
                                  backgroundColor: 'white',
                                  height: '10%',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                <EIcon
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
                                  {item.location}
                                </Text>
                              </View>

                              <View
                                style={{
                                  backgroundColor: 'white',
                                  width: 130,
                                  height: '35%',
                                  flexDirection: 'row',
                                  left: 10,
                                  borderRadius: 10,
                                  top: 1,
                                }}>
                                <View
                                  style={{
                                    left: 10,
                                    flexDirection: 'row',
                                    backgroundColor: 'white',
                                    width: '70%',
                                    height: '90%',
                                    alignItems: 'center',
                                  }}>
                                  <Thumbnail
                                    small
                                    source={{
                                      uri: item.userImg,
                                    }}
                                    style={{
                                      marginLeft: 0,
                                      borderRadius: 30,
                                      shadowOpacity: 0.5,
                                      shadowRadius: 2,
                                      elevation: 5,
                                      height: 30,
                                      width: 30,
                                    }}
                                  />
                                  <Thumbnail
                                    small
                                    source={{
                                      uri:
                                        'https://randomuser.me/api/portraits/men/51.jpg',
                                    }}
                                    style={{
                                      marginLeft: -10,
                                      borderRadius: 30,
                                      shadowOpacity: 0.5,
                                      shadowRadius: 2,
                                      elevation: 5,
                                      height: 30,
                                      width: 30,
                                    }}
                                  />
                                  <Thumbnail
                                    small
                                    source={{
                                      uri:
                                        'https://randomuser.me/api/portraits/men/28.jpg',
                                    }}
                                    style={{
                                      marginLeft: -10,
                                      borderRadius: 30,
                                      shadowOpacity: 0.5,
                                      shadowRadius: 2,
                                      elevation: 5,
                                      height: 30,
                                      width: 30,
                                    }}
                                  />
                                </View>

                                <View
                                  style={{
                                    flexDirection: 'row',
                                    backgroundColor: 'white',
                                    width: '30%',
                                    height: '100%',
                                    justifyContent: 'flex-start',
                                    alignItems: 'center',
                                  }}>
                                  <Text
                                    style={{
                                      fontSize: responsiveFontSize(1.4),
                                      fontWeight: '600',
                                      color: 'black',
                                    }}>
                                    {item.joining_members.length}
                                  </Text>
                                  <AIcon name="plus" size={10} color="#000" />
                                </View>
                              </View>
                            </View>
                          </TouchableOpacity>
                        );

                        // });
                      }}
                    />
                  </View>
                </View>

                {/* Outdoor */}

                <View
                  style={{
                    backgroundColor: 'white',
                    height: responsiveHeight(47),
                    shadowOpacity: 0.5,
                    shadowRadius: 2,
                    elevation: 10,
                    width: responsiveWidth(100),
                    marginBottom: 10,
                    top: 5,
                    borderRadius: 20,
                  }}>
                  <View
                    style={{
                      backgroundColor: 'white',
                      height: '12%',
                      justifyContent: 'flex-end',
                      marginHorizontal: 10,
                    }}>
                    <Text
                      style={{
                        fontSize: responsiveFontSize(2.7),
                        fontWeight: '600',
                        color: 'black',
                        marginLeft: 10,
                      }}>
                      Others
                    </Text>
                  </View>

                  <View
                    style={{
                      backgroundColor: 'white',
                      height: responsiveHeight(40),
                      flexDirection: 'row',
                      marginTop: 10,
                      borderRadius: 20,
                    }}>
                    <FlatList
                      data={this.state.other}
                      showsHorizontalScrollIndicator={false}
                      horizontal={true}
                      keyExtractor={item => item.id}
                      renderItem={({item, index}) => {
                        // item.Cricket.map(itm => {
                        {
                          console.log(item);
                        }

                        return (
                          <TouchableOpacity
                            style={{backgroundColor: 'white', borderRadius: 20}}
                            onPress={() => {
                              this.state.jobflag === true
                                ? this.props.navigation.navigate('JobInfo', {
                                    item: item,
                                  })
                                : this.props.navigation.navigate(
                                    'CommunityEvent',
                                    {item: item},
                                  );
                            }}>
                            <View
                              style={{backgroundColor: 'white', padding: 5}}>
                              <View
                                style={{
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                <Image
                                  source={require('../../Assets/watch.jpg')}
                                  style={{
                                    width: responsiveHeight(15),
                                    height: responsiveHeight(15),
                                    borderRadius: 20,
                                  }}></Image>
                              </View>

                              <View
                                style={{
                                  width: '100%',
                                  borderRadius: 0,
                                  justifyContent: 'flex-start',
                                  alignItems: 'center',
                                }}>
                                <Text
                                  style={{
                                    fontSize: responsiveFontSize(1.4),
                                    fontWeight: '600',
                                    color: '#5e5d5d',
                                  }}>
                                  {this.state.jobflag ? (
                                    <Text>{item.company_name}</Text>
                                  ) : (
                                    <Text>Sun,Sep 8,10:00 AM</Text>
                                  )}
                                </Text>
                              </View>
                            </View>

                            <View
                              style={{
                                backgroundColor: 'white',
                                height: '45%',
                                width: 150,
                              }}>
                              <View
                                style={{
                                  backgroundColor: 'white',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                <Text
                                  style={{
                                    fontSize: responsiveFontSize(2),
                                    fontWeight: '600',
                                    color: '#5e5d5d',
                                  }}>
                                  {this.state.jobflag ? (
                                    <Text>{item.title}</Text>
                                  ) : (
                                    <Text>{item.sub_category}</Text>
                                  )}
                                </Text>
                              </View>

                              <View
                                style={{
                                  flexDirection: 'row',
                                  backgroundColor: 'white',
                                  height: '40%',
                                  justifyContent: 'flex-start',
                                  alignItems: 'center',
                                }}>
                                <Thumbnail
                                  small
                                  source={{
                                    uri:
                                      'https://randomuser.me/api/portraits/men/45.jpg',
                                  }}
                                  style={{
                                    left: 20,
                                    borderRadius: 30,
                                    shadowOpacity: 0.5,
                                    shadowRadius: 2,
                                    elevation: 5,
                                  }}
                                />
                                <Text
                                  style={{
                                    left: 30,
                                    fontSize: responsiveFontSize(1.8),
                                    fontWeight: '600',
                                    color: '#5e5d5d',
                                  }}>
                                  {item.user_name}
                                </Text>
                              </View>

                              <View
                                style={{
                                  flexDirection: 'row',
                                  backgroundColor: 'white',
                                  height: '10%',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                <EIcon
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
                                  {item.location}
                                </Text>
                              </View>

                              <View
                                style={{
                                  backgroundColor: 'white',
                                  width: 130,
                                  height: '35%',
                                  flexDirection: 'row',
                                  left: 10,
                                  borderRadius: 10,
                                  top: 1,
                                }}>
                                <View
                                  style={{
                                    left: 10,
                                    flexDirection: 'row',
                                    backgroundColor: 'white',
                                    width: '70%',
                                    height: '90%',
                                    alignItems: 'center',
                                  }}>
                                  <Thumbnail
                                    small
                                    source={{
                                      uri: item.userImg,
                                    }}
                                    style={{
                                      marginLeft: 0,
                                      borderRadius: 30,
                                      shadowOpacity: 0.5,
                                      shadowRadius: 2,
                                      elevation: 5,
                                      height: 30,
                                      width: 30,
                                    }}
                                  />
                                  <Thumbnail
                                    small
                                    source={{
                                      uri:
                                        'https://randomuser.me/api/portraits/men/51.jpg',
                                    }}
                                    style={{
                                      marginLeft: -10,
                                      borderRadius: 30,
                                      shadowOpacity: 0.5,
                                      shadowRadius: 2,
                                      elevation: 5,
                                      height: 30,
                                      width: 30,
                                    }}
                                  />
                                  <Thumbnail
                                    small
                                    source={{
                                      uri:
                                        'https://randomuser.me/api/portraits/men/28.jpg',
                                    }}
                                    style={{
                                      marginLeft: -10,
                                      borderRadius: 30,
                                      shadowOpacity: 0.5,
                                      shadowRadius: 2,
                                      elevation: 5,
                                      height: 30,
                                      width: 30,
                                    }}
                                  />
                                </View>

                                <View
                                  style={{
                                    flexDirection: 'row',
                                    backgroundColor: 'white',
                                    width: '30%',
                                    height: '100%',
                                    justifyContent: 'flex-start',
                                    alignItems: 'center',
                                  }}>
                                  <Text
                                    style={{
                                      fontSize: responsiveFontSize(1.4),
                                      fontWeight: '600',
                                      color: 'black',
                                    }}>
                                    {item.joining_members.length}
                                  </Text>
                                  <AIcon name="plus" size={10} color="#000" />
                                </View>
                              </View>
                            </View>
                          </TouchableOpacity>
                        );

                        // });
                      }}
                    />
                  </View>
                </View>
              </View>
            ) : this.state.sportsflag ? (
              <View>
                <View
                  style={{
                    backgroundColor: 'white',
                    height: responsiveHeight(47),
                    shadowOpacity: 0.5,
                    shadowRadius: 2,
                    elevation: 10,
                    width: responsiveWidth(100),
                    marginBottom: 10,
                    top: 5,
                    borderRadius: 20,
                  }}>
                  <View
                    style={{
                      backgroundColor: 'white',
                      height: '12%',
                      justifyContent: 'flex-end',
                      marginHorizontal: 10,
                    }}>
                    <Text
                      style={{
                        fontSize: responsiveFontSize(2.7),
                        fontWeight: '600',
                        color: 'black',
                        marginLeft: 10,
                      }}>
                      Cricket
                    </Text>
                  </View>

                  <View
                    style={{
                      backgroundColor: 'white',
                      height: responsiveHeight(40),
                      flexDirection: 'row',
                      marginTop: 10,
                      borderRadius: 20,
                    }}>
                    <FlatList
                      data={this.state.sport_data}
                      showsHorizontalScrollIndicator={false}
                      horizontal={true}
                      keyExtractor={item => item.id}
                      renderItem={({item, index}) => {
                        // item.Cricket.map(itm => {
                        {
                          console.log(item);
                        }

                        return (
                          <TouchableOpacity
                            style={{backgroundColor: 'white', borderRadius: 20}}
                            onPress={() => {
                              this.state.jobflag === true
                                ? this.props.navigation.navigate('JobInfo', {
                                    item: item,
                                  })
                                : this.props.navigation.navigate(
                                    'CommunityEvent',
                                    {item: item},
                                  );
                            }}>
                            <View
                              style={{backgroundColor: 'white', padding: 5}}>
                              <View
                                style={{
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                <Image
                                  source={require('../../Assets/watch.jpg')}
                                  style={{
                                    width: responsiveHeight(15),
                                    height: responsiveHeight(15),
                                    borderRadius: 20,
                                  }}></Image>
                              </View>

                              <View
                                style={{
                                  width: '100%',
                                  borderRadius: 0,
                                  justifyContent: 'flex-start',
                                  alignItems: 'center',
                                }}>
                                <Text
                                  style={{
                                    fontSize: responsiveFontSize(1.4),
                                    fontWeight: '600',
                                    color: '#5e5d5d',
                                  }}>
                                  {this.state.jobflag ? (
                                    <Text>{item.company_name}</Text>
                                  ) : (
                                    <Text>Sun,Sep 8,10:00 AM</Text>
                                  )}
                                </Text>
                              </View>
                            </View>

                            <View
                              style={{
                                backgroundColor: 'white',
                                height: '45%',
                                width: 150,
                              }}>
                              <View
                                style={{
                                  backgroundColor: 'white',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                <Text
                                  style={{
                                    fontSize: responsiveFontSize(2),
                                    fontWeight: '600',
                                    color: '#5e5d5d',
                                  }}>
                                  {this.state.jobflag ? (
                                    <Text>{item.title}</Text>
                                  ) : (
                                    <Text>{item.sub_category}</Text>
                                  )}
                                </Text>
                              </View>

                              <View
                                style={{
                                  flexDirection: 'row',
                                  backgroundColor: 'white',
                                  height: '40%',
                                  justifyContent: 'flex-start',
                                  alignItems: 'center',
                                }}>
                                <Thumbnail
                                  small
                                  source={{
                                    uri:
                                      'https://randomuser.me/api/portraits/men/45.jpg',
                                  }}
                                  style={{
                                    left: 20,
                                    borderRadius: 30,
                                    shadowOpacity: 0.5,
                                    shadowRadius: 2,
                                    elevation: 5,
                                  }}
                                />
                                <Text
                                  style={{
                                    left: 30,
                                    fontSize: responsiveFontSize(1.8),
                                    fontWeight: '600',
                                    color: '#5e5d5d',
                                  }}>
                                  {item.user_name}
                                </Text>
                              </View>

                              <View
                                style={{
                                  flexDirection: 'row',
                                  backgroundColor: 'white',
                                  height: '10%',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                <EIcon
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
                                  {item.location}
                                </Text>
                              </View>

                              <View
                                style={{
                                  backgroundColor: 'white',
                                  width: 130,
                                  height: '35%',
                                  flexDirection: 'row',
                                  left: 10,
                                  borderRadius: 10,
                                  top: 1,
                                }}>
                                <View
                                  style={{
                                    left: 10,
                                    flexDirection: 'row',
                                    backgroundColor: 'white',
                                    width: '70%',
                                    height: '90%',
                                    alignItems: 'center',
                                  }}>
                                  <Thumbnail
                                    small
                                    source={{
                                      uri: item.userImg,
                                    }}
                                    style={{
                                      marginLeft: 0,
                                      borderRadius: 30,
                                      shadowOpacity: 0.5,
                                      shadowRadius: 2,
                                      elevation: 5,
                                      height: 30,
                                      width: 30,
                                    }}
                                  />
                                  <Thumbnail
                                    small
                                    source={{
                                      uri:
                                        'https://randomuser.me/api/portraits/men/51.jpg',
                                    }}
                                    style={{
                                      marginLeft: -10,
                                      borderRadius: 30,
                                      shadowOpacity: 0.5,
                                      shadowRadius: 2,
                                      elevation: 5,
                                      height: 30,
                                      width: 30,
                                    }}
                                  />
                                  <Thumbnail
                                    small
                                    source={{
                                      uri:
                                        'https://randomuser.me/api/portraits/men/28.jpg',
                                    }}
                                    style={{
                                      marginLeft: -10,
                                      borderRadius: 30,
                                      shadowOpacity: 0.5,
                                      shadowRadius: 2,
                                      elevation: 5,
                                      height: 30,
                                      width: 30,
                                    }}
                                  />
                                </View>

                                <View
                                  style={{
                                    flexDirection: 'row',
                                    backgroundColor: 'white',
                                    width: '30%',
                                    height: '100%',
                                    justifyContent: 'flex-start',
                                    alignItems: 'center',
                                  }}>
                                  <Text
                                    style={{
                                      fontSize: responsiveFontSize(1.4),
                                      fontWeight: '600',
                                      color: 'black',
                                    }}>
                                    {item.joining_members.length}
                                  </Text>
                                  <AIcon name="plus" size={10} color="#000" />
                                </View>
                              </View>
                            </View>
                          </TouchableOpacity>
                        );

                        // });
                      }}
                    />
                  </View>
                </View>

                {/* event_data */}

                <View
                  style={{
                    backgroundColor: 'white',
                    height: responsiveHeight(47),
                    shadowOpacity: 0.5,
                    shadowRadius: 2,
                    elevation: 10,
                    width: responsiveWidth(100),
                    marginBottom: 10,
                    top: 5,
                    borderRadius: 20,
                  }}>
                  <View
                    style={{
                      backgroundColor: 'white',
                      height: '12%',
                      justifyContent: 'flex-end',
                      marginHorizontal: 10,
                    }}>
                    <Text
                      style={{
                        fontSize: responsiveFontSize(2.7),
                        fontWeight: '600',
                        color: 'black',
                        marginLeft: 10,
                      }}>
                      Foot Ball
                    </Text>
                  </View>

                  <View
                    style={{
                      backgroundColor: 'white',
                      height: responsiveHeight(40),
                      flexDirection: 'row',
                      marginTop: 10,
                      borderRadius: 20,
                    }}>
                    <FlatList
                      data={this.state.Football}
                      showsHorizontalScrollIndicator={false}
                      horizontal={true}
                      keyExtractor={item => item.id}
                      renderItem={({item, index}) => {
                        // item.Cricket.map(itm => {
                        {
                          console.log(item);
                        }

                        return (
                          <TouchableOpacity
                            style={{backgroundColor: 'white', borderRadius: 20}}
                            onPress={() => {
                              this.state.jobflag === true
                                ? this.props.navigation.navigate('JobInfo', {
                                    item: item,
                                  })
                                : this.props.navigation.navigate(
                                    'CommunityEvent',
                                    {item: item},
                                  );
                            }}>
                            <View
                              style={{backgroundColor: 'white', padding: 5}}>
                              <View
                                style={{
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                <Image
                                  source={require('../../Assets/watch.jpg')}
                                  style={{
                                    width: responsiveHeight(15),
                                    height: responsiveHeight(15),
                                    borderRadius: 20,
                                  }}></Image>
                              </View>

                              <View
                                style={{
                                  width: '100%',
                                  borderRadius: 0,
                                  justifyContent: 'flex-start',
                                  alignItems: 'center',
                                }}>
                                <Text
                                  style={{
                                    fontSize: responsiveFontSize(1.4),
                                    fontWeight: '600',
                                    color: '#5e5d5d',
                                  }}>
                                  {this.state.jobflag ? (
                                    <Text>{item.company_name}</Text>
                                  ) : (
                                    <Text>Sun,Sep 8,10:00 AM</Text>
                                  )}
                                </Text>
                              </View>
                            </View>

                            <View
                              style={{
                                backgroundColor: 'white',
                                height: '45%',
                                width: 150,
                              }}>
                              <View
                                style={{
                                  backgroundColor: 'white',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                <Text
                                  style={{
                                    fontSize: responsiveFontSize(2),
                                    fontWeight: '600',
                                    color: '#5e5d5d',
                                  }}>
                                  {this.state.jobflag ? (
                                    <Text>{item.title}</Text>
                                  ) : (
                                    <Text>{item.sub_category}</Text>
                                  )}
                                </Text>
                              </View>

                              <View
                                style={{
                                  flexDirection: 'row',
                                  backgroundColor: 'white',
                                  height: '40%',
                                  justifyContent: 'flex-start',
                                  alignItems: 'center',
                                }}>
                                <Thumbnail
                                  small
                                  source={{
                                    uri:
                                      'https://randomuser.me/api/portraits/men/45.jpg',
                                  }}
                                  style={{
                                    left: 20,
                                    borderRadius: 30,
                                    shadowOpacity: 0.5,
                                    shadowRadius: 2,
                                    elevation: 5,
                                  }}
                                />
                                <Text
                                  style={{
                                    left: 30,
                                    fontSize: responsiveFontSize(1.8),
                                    fontWeight: '600',
                                    color: '#5e5d5d',
                                  }}>
                                  {item.user_name}
                                </Text>
                              </View>

                              <View
                                style={{
                                  flexDirection: 'row',
                                  backgroundColor: 'white',
                                  height: '10%',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                <EIcon
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
                                  {item.location}
                                </Text>
                              </View>

                              <View
                                style={{
                                  backgroundColor: 'white',
                                  width: 130,
                                  height: '35%',
                                  flexDirection: 'row',
                                  left: 10,
                                  borderRadius: 10,
                                  top: 1,
                                }}>
                                <View
                                  style={{
                                    left: 10,
                                    flexDirection: 'row',
                                    backgroundColor: 'white',
                                    width: '70%',
                                    height: '90%',
                                    alignItems: 'center',
                                  }}>
                                  <Thumbnail
                                    small
                                    source={{
                                      uri: item.userImg,
                                    }}
                                    style={{
                                      marginLeft: 0,
                                      borderRadius: 30,
                                      shadowOpacity: 0.5,
                                      shadowRadius: 2,
                                      elevation: 5,
                                      height: 30,
                                      width: 30,
                                    }}
                                  />
                                  <Thumbnail
                                    small
                                    source={{
                                      uri:
                                        'https://randomuser.me/api/portraits/men/51.jpg',
                                    }}
                                    style={{
                                      marginLeft: -10,
                                      borderRadius: 30,
                                      shadowOpacity: 0.5,
                                      shadowRadius: 2,
                                      elevation: 5,
                                      height: 30,
                                      width: 30,
                                    }}
                                  />
                                  <Thumbnail
                                    small
                                    source={{
                                      uri:
                                        'https://randomuser.me/api/portraits/men/28.jpg',
                                    }}
                                    style={{
                                      marginLeft: -10,
                                      borderRadius: 30,
                                      shadowOpacity: 0.5,
                                      shadowRadius: 2,
                                      elevation: 5,
                                      height: 30,
                                      width: 30,
                                    }}
                                  />
                                </View>

                                <View
                                  style={{
                                    flexDirection: 'row',
                                    backgroundColor: 'white',
                                    width: '30%',
                                    height: '100%',
                                    justifyContent: 'flex-start',
                                    alignItems: 'center',
                                  }}>
                                  <Text
                                    style={{
                                      fontSize: responsiveFontSize(1.4),
                                      fontWeight: '600',
                                      color: 'black',
                                    }}>
                                    {item.joining_members.length}
                                  </Text>
                                  <AIcon name="plus" size={10} color="#000" />
                                </View>
                              </View>
                            </View>
                          </TouchableOpacity>
                        );

                        // });
                      }}
                    />
                  </View>
                </View>

                {/* Outdoor */}

                <View
                  style={{
                    backgroundColor: 'white',
                    height: responsiveHeight(47),
                    shadowOpacity: 0.5,
                    shadowRadius: 2,
                    elevation: 10,
                    width: responsiveWidth(100),
                    marginBottom: 10,
                    top: 5,
                    borderRadius: 20,
                  }}>
                  <View
                    style={{
                      backgroundColor: 'white',
                      height: '12%',
                      justifyContent: 'flex-end',
                      marginHorizontal: 10,
                    }}>
                    <Text
                      style={{
                        fontSize: responsiveFontSize(2.7),
                        fontWeight: '600',
                        color: 'black',
                        marginLeft: 10,
                      }}>
                      Base Ball
                    </Text>
                  </View>

                  <View
                    style={{
                      backgroundColor: 'white',
                      height: responsiveHeight(40),
                      flexDirection: 'row',
                      marginTop: 10,
                      borderRadius: 20,
                    }}>
                    <FlatList
                      data={this.state.BaseBall}
                      showsHorizontalScrollIndicator={false}
                      horizontal={true}
                      keyExtractor={item => item.id}
                      renderItem={({item, index}) => {
                        // item.Cricket.map(itm => {
                        {
                          console.log(item);
                        }

                        return (
                          <TouchableOpacity
                            style={{backgroundColor: 'white', borderRadius: 20}}
                            onPress={() => {
                              this.state.jobflag === true
                                ? this.props.navigation.navigate('JobInfo', {
                                    item: item,
                                  })
                                : this.props.navigation.navigate(
                                    'CommunityEvent',
                                    {item: item},
                                  );
                            }}>
                            <View
                              style={{backgroundColor: 'white', padding: 5}}>
                              <View
                                style={{
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                <Image
                                  source={require('../../Assets/watch.jpg')}
                                  style={{
                                    width: responsiveHeight(15),
                                    height: responsiveHeight(15),
                                    borderRadius: 20,
                                  }}></Image>
                              </View>

                              <View
                                style={{
                                  width: '100%',
                                  borderRadius: 0,
                                  justifyContent: 'flex-start',
                                  alignItems: 'center',
                                }}>
                                <Text
                                  style={{
                                    fontSize: responsiveFontSize(1.4),
                                    fontWeight: '600',
                                    color: '#5e5d5d',
                                  }}>
                                  {this.state.jobflag ? (
                                    <Text>{item.company_name}</Text>
                                  ) : (
                                    <Text>Sun,Sep 8,10:00 AM</Text>
                                  )}
                                </Text>
                              </View>
                            </View>

                            <View
                              style={{
                                backgroundColor: 'white',
                                height: '45%',
                                width: 150,
                              }}>
                              <View
                                style={{
                                  backgroundColor: 'white',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                <Text
                                  style={{
                                    fontSize: responsiveFontSize(2),
                                    fontWeight: '600',
                                    color: '#5e5d5d',
                                  }}>
                                  {this.state.jobflag ? (
                                    <Text>{item.title}</Text>
                                  ) : (
                                    <Text>{item.sub_category}</Text>
                                  )}
                                </Text>
                              </View>

                              <View
                                style={{
                                  flexDirection: 'row',
                                  backgroundColor: 'white',
                                  height: '40%',
                                  justifyContent: 'flex-start',
                                  alignItems: 'center',
                                }}>
                                <Thumbnail
                                  small
                                  source={{
                                    uri:
                                      'https://randomuser.me/api/portraits/men/45.jpg',
                                  }}
                                  style={{
                                    left: 20,
                                    borderRadius: 30,
                                    shadowOpacity: 0.5,
                                    shadowRadius: 2,
                                    elevation: 5,
                                  }}
                                />
                                <Text
                                  style={{
                                    left: 30,
                                    fontSize: responsiveFontSize(1.8),
                                    fontWeight: '600',
                                    color: '#5e5d5d',
                                  }}>
                                  {item.user_name}
                                </Text>
                              </View>

                              <View
                                style={{
                                  flexDirection: 'row',
                                  backgroundColor: 'white',
                                  height: '10%',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                <EIcon
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
                                  {item.location}
                                </Text>
                              </View>

                              <View
                                style={{
                                  backgroundColor: 'white',
                                  width: 130,
                                  height: '35%',
                                  flexDirection: 'row',
                                  left: 10,
                                  borderRadius: 10,
                                  top: 1,
                                }}>
                                <View
                                  style={{
                                    left: 10,
                                    flexDirection: 'row',
                                    backgroundColor: 'white',
                                    width: '70%',
                                    height: '90%',
                                    alignItems: 'center',
                                  }}>
                                  <Thumbnail
                                    small
                                    source={{
                                      uri: item.userImg,
                                    }}
                                    style={{
                                      marginLeft: 0,
                                      borderRadius: 30,
                                      shadowOpacity: 0.5,
                                      shadowRadius: 2,
                                      elevation: 5,
                                      height: 30,
                                      width: 30,
                                    }}
                                  />
                                  <Thumbnail
                                    small
                                    source={{
                                      uri:
                                        'https://randomuser.me/api/portraits/men/51.jpg',
                                    }}
                                    style={{
                                      marginLeft: -10,
                                      borderRadius: 30,
                                      shadowOpacity: 0.5,
                                      shadowRadius: 2,
                                      elevation: 5,
                                      height: 30,
                                      width: 30,
                                    }}
                                  />
                                  <Thumbnail
                                    small
                                    source={{
                                      uri:
                                        'https://randomuser.me/api/portraits/men/28.jpg',
                                    }}
                                    style={{
                                      marginLeft: -10,
                                      borderRadius: 30,
                                      shadowOpacity: 0.5,
                                      shadowRadius: 2,
                                      elevation: 5,
                                      height: 30,
                                      width: 30,
                                    }}
                                  />
                                </View>

                                <View
                                  style={{
                                    flexDirection: 'row',
                                    backgroundColor: 'white',
                                    width: '30%',
                                    height: '100%',
                                    justifyContent: 'flex-start',
                                    alignItems: 'center',
                                  }}>
                                  <Text
                                    style={{
                                      fontSize: responsiveFontSize(1.4),
                                      fontWeight: '600',
                                      color: 'black',
                                    }}>
                                    {item.joining_members.length}
                                  </Text>
                                  <AIcon name="plus" size={10} color="#000" />
                                </View>
                              </View>
                            </View>
                          </TouchableOpacity>
                        );

                        // });
                      }}
                    />
                  </View>
                </View>
              </View>
            ) : (
              <View>
                <View
                  style={{
                    backgroundColor: 'white',
                    height: responsiveHeight(47),
                    shadowOpacity: 0.5,
                    shadowRadius: 2,
                    elevation: 10,
                    width: responsiveWidth(100),
                    marginBottom: 10,
                    top: 5,
                    borderRadius: 20,
                  }}>
                  <View
                    style={{
                      backgroundColor: 'white',
                      height: '12%',
                      justifyContent: 'flex-end',
                      marginHorizontal: 10,
                    }}>
                    <Text
                      style={{
                        fontSize: responsiveFontSize(2.7),
                        fontWeight: '600',
                        color: 'black',
                        marginLeft: 10,
                      }}>
                      Outing
                    </Text>
                  </View>

                  <View
                    style={{
                      backgroundColor: 'white',
                      height: responsiveHeight(40),
                      flexDirection: 'row',
                      marginTop: 10,
                      borderRadius: 20,
                    }}>
                    <FlatList
                      data={this.state.outing}
                      showsHorizontalScrollIndicator={false}
                      horizontal={true}
                      keyExtractor={item => item.id}
                      renderItem={({item, index}) => {
                        // item.Cricket.map(itm => {
                        {
                          console.log(item);
                        }

                        return (
                          <TouchableOpacity
                            style={{backgroundColor: 'white', borderRadius: 20}}
                            onPress={() => {
                              this.state.jobflag === true
                                ? this.props.navigation.navigate('JobInfo', {
                                    item: item,
                                  })
                                : this.props.navigation.navigate(
                                    'CommunityEvent',
                                    {item: item},
                                  );
                            }}>
                            <View
                              style={{backgroundColor: 'white', padding: 5}}>
                              <View
                                style={{
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                <Image
                                  source={require('../../Assets/watch.jpg')}
                                  style={{
                                    width: responsiveHeight(15),
                                    height: responsiveHeight(15),
                                    borderRadius: 20,
                                  }}></Image>
                              </View>

                              <View
                                style={{
                                  width: '100%',
                                  borderRadius: 0,
                                  justifyContent: 'flex-start',
                                  alignItems: 'center',
                                }}>
                                <Text
                                  style={{
                                    fontSize: responsiveFontSize(1.4),
                                    fontWeight: '600',
                                    color: '#5e5d5d',
                                  }}>
                                  {this.state.jobflag ? (
                                    <Text>{item.company_name}</Text>
                                  ) : (
                                    <Text>Sun,Sep 8,10:00 AM</Text>
                                  )}
                                </Text>
                              </View>
                            </View>

                            <View
                              style={{
                                backgroundColor: 'white',
                                height: '45%',
                                width: 150,
                              }}>
                              <View
                                style={{
                                  backgroundColor: 'white',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                <Text
                                  style={{
                                    fontSize: responsiveFontSize(2),
                                    fontWeight: '600',
                                    color: '#5e5d5d',
                                  }}>
                                  {this.state.jobflag ? (
                                    <Text>{item.title}</Text>
                                  ) : (
                                    <Text>{item.sub_category}</Text>
                                  )}
                                </Text>
                              </View>

                              <View
                                style={{
                                  flexDirection: 'row',
                                  backgroundColor: 'white',
                                  height: '40%',
                                  justifyContent: 'flex-start',
                                  alignItems: 'center',
                                }}>
                                <Thumbnail
                                  small
                                  source={{
                                    uri:
                                      'https://randomuser.me/api/portraits/men/45.jpg',
                                  }}
                                  style={{
                                    left: 20,
                                    borderRadius: 30,
                                    shadowOpacity: 0.5,
                                    shadowRadius: 2,
                                    elevation: 5,
                                  }}
                                />
                                <Text
                                  style={{
                                    left: 30,
                                    fontSize: responsiveFontSize(1.8),
                                    fontWeight: '600',
                                    color: '#5e5d5d',
                                  }}>
                                  {item.user_name}
                                </Text>
                              </View>

                              <View
                                style={{
                                  flexDirection: 'row',
                                  backgroundColor: 'white',
                                  height: '10%',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                <EIcon
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
                                  {item.location}
                                </Text>
                              </View>

                              <View
                                style={{
                                  backgroundColor: 'white',
                                  width: 130,
                                  height: '35%',
                                  flexDirection: 'row',
                                  left: 10,
                                  borderRadius: 10,
                                  top: 1,
                                }}>
                                <View
                                  style={{
                                    left: 10,
                                    flexDirection: 'row',
                                    backgroundColor: 'white',
                                    width: '70%',
                                    height: '90%',
                                    alignItems: 'center',
                                  }}>
                                  <Thumbnail
                                    small
                                    source={{
                                      uri: item.userImg,
                                    }}
                                    style={{
                                      marginLeft: 0,
                                      borderRadius: 30,
                                      shadowOpacity: 0.5,
                                      shadowRadius: 2,
                                      elevation: 5,
                                      height: 30,
                                      width: 30,
                                    }}
                                  />
                                  <Thumbnail
                                    small
                                    source={{
                                      uri:
                                        'https://randomuser.me/api/portraits/men/51.jpg',
                                    }}
                                    style={{
                                      marginLeft: -10,
                                      borderRadius: 30,
                                      shadowOpacity: 0.5,
                                      shadowRadius: 2,
                                      elevation: 5,
                                      height: 30,
                                      width: 30,
                                    }}
                                  />
                                  <Thumbnail
                                    small
                                    source={{
                                      uri:
                                        'https://randomuser.me/api/portraits/men/28.jpg',
                                    }}
                                    style={{
                                      marginLeft: -10,
                                      borderRadius: 30,
                                      shadowOpacity: 0.5,
                                      shadowRadius: 2,
                                      elevation: 5,
                                      height: 30,
                                      width: 30,
                                    }}
                                  />
                                </View>

                                <View
                                  style={{
                                    flexDirection: 'row',
                                    backgroundColor: 'white',
                                    width: '30%',
                                    height: '100%',
                                    justifyContent: 'flex-start',
                                    alignItems: 'center',
                                  }}>
                                  <Text
                                    style={{
                                      fontSize: responsiveFontSize(1.4),
                                      fontWeight: '600',
                                      color: 'black',
                                    }}>
                                    {item.joining_members.length}
                                  </Text>
                                  <AIcon name="plus" size={10} color="#000" />
                                </View>
                              </View>
                            </View>
                          </TouchableOpacity>
                        );

                        // });
                      }}
                    />
                  </View>
                </View>

                {/* event_data */}

                <View
                  style={{
                    backgroundColor: 'white',
                    height: responsiveHeight(47),
                    shadowOpacity: 0.5,
                    shadowRadius: 2,
                    elevation: 10,
                    width: responsiveWidth(100),
                    marginBottom: 10,
                    top: 5,
                    borderRadius: 20,
                  }}>
                  <View
                    style={{
                      backgroundColor: 'white',
                      height: '12%',
                      justifyContent: 'flex-end',
                      marginHorizontal: 10,
                    }}>
                    <Text
                      style={{
                        fontSize: responsiveFontSize(2.7),
                        fontWeight: '600',
                        color: 'black',
                        marginLeft: 10,
                      }}>
                      Watching Movies
                    </Text>
                  </View>

                  <View
                    style={{
                      backgroundColor: 'white',
                      height: responsiveHeight(40),
                      flexDirection: 'row',
                      marginTop: 10,
                      borderRadius: 20,
                    }}>
                    <FlatList
                      data={this.state.movies}
                      showsHorizontalScrollIndicator={false}
                      horizontal={true}
                      keyExtractor={item => item.id}
                      renderItem={({item, index}) => {
                        // item.Cricket.map(itm => {
                        {
                          console.log(item);
                        }

                        return (
                          <TouchableOpacity
                            style={{backgroundColor: 'white', borderRadius: 20}}
                            onPress={() => {
                              this.state.jobflag === true
                                ? this.props.navigation.navigate('JobInfo', {
                                    item: item,
                                  })
                                : this.props.navigation.navigate(
                                    'CommunityEvent',
                                    {item: item},
                                  );
                            }}>
                            <View
                              style={{backgroundColor: 'white', padding: 5}}>
                              <View
                                style={{
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                <Image
                                  source={require('../../Assets/watch.jpg')}
                                  style={{
                                    width: responsiveHeight(15),
                                    height: responsiveHeight(15),
                                    borderRadius: 20,
                                  }}></Image>
                              </View>

                              <View
                                style={{
                                  width: '100%',
                                  borderRadius: 0,
                                  justifyContent: 'flex-start',
                                  alignItems: 'center',
                                }}>
                                <Text
                                  style={{
                                    fontSize: responsiveFontSize(1.4),
                                    fontWeight: '600',
                                    color: '#5e5d5d',
                                  }}>
                                  {this.state.jobflag ? (
                                    <Text>{item.company_name}</Text>
                                  ) : (
                                    <Text>Sun,Sep 8,10:00 AM</Text>
                                  )}
                                </Text>
                              </View>
                            </View>

                            <View
                              style={{
                                backgroundColor: 'white',
                                height: '45%',
                                width: 150,
                              }}>
                              <View
                                style={{
                                  backgroundColor: 'white',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                <Text
                                  style={{
                                    fontSize: responsiveFontSize(2),
                                    fontWeight: '600',
                                    color: '#5e5d5d',
                                  }}>
                                  {this.state.jobflag ? (
                                    <Text>{item.title}</Text>
                                  ) : (
                                    <Text>{item.sub_category}</Text>
                                  )}
                                </Text>
                              </View>

                              <View
                                style={{
                                  flexDirection: 'row',
                                  backgroundColor: 'white',
                                  height: '40%',
                                  justifyContent: 'flex-start',
                                  alignItems: 'center',
                                }}>
                                <Thumbnail
                                  small
                                  source={{
                                    uri:
                                      'https://randomuser.me/api/portraits/men/45.jpg',
                                  }}
                                  style={{
                                    left: 20,
                                    borderRadius: 30,
                                    shadowOpacity: 0.5,
                                    shadowRadius: 2,
                                    elevation: 5,
                                  }}
                                />
                                <Text
                                  style={{
                                    left: 30,
                                    fontSize: responsiveFontSize(1.8),
                                    fontWeight: '600',
                                    color: '#5e5d5d',
                                  }}>
                                  {item.user_name}
                                </Text>
                              </View>

                              <View
                                style={{
                                  flexDirection: 'row',
                                  backgroundColor: 'white',
                                  height: '10%',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                <EIcon
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
                                  {item.location}
                                </Text>
                              </View>

                              <View
                                style={{
                                  backgroundColor: 'white',
                                  width: 130,
                                  height: '35%',
                                  flexDirection: 'row',
                                  left: 10,
                                  borderRadius: 10,
                                  top: 1,
                                }}>
                                <View
                                  style={{
                                    left: 10,
                                    flexDirection: 'row',
                                    backgroundColor: 'white',
                                    width: '70%',
                                    height: '90%',
                                    alignItems: 'center',
                                  }}>
                                  <Thumbnail
                                    small
                                    source={{
                                      uri: item.userImg,
                                    }}
                                    style={{
                                      marginLeft: 0,
                                      borderRadius: 30,
                                      shadowOpacity: 0.5,
                                      shadowRadius: 2,
                                      elevation: 5,
                                      height: 30,
                                      width: 30,
                                    }}
                                  />
                                  <Thumbnail
                                    small
                                    source={{
                                      uri:
                                        'https://randomuser.me/api/portraits/men/51.jpg',
                                    }}
                                    style={{
                                      marginLeft: -10,
                                      borderRadius: 30,
                                      shadowOpacity: 0.5,
                                      shadowRadius: 2,
                                      elevation: 5,
                                      height: 30,
                                      width: 30,
                                    }}
                                  />
                                  <Thumbnail
                                    small
                                    source={{
                                      uri:
                                        'https://randomuser.me/api/portraits/men/28.jpg',
                                    }}
                                    style={{
                                      marginLeft: -10,
                                      borderRadius: 30,
                                      shadowOpacity: 0.5,
                                      shadowRadius: 2,
                                      elevation: 5,
                                      height: 30,
                                      width: 30,
                                    }}
                                  />
                                </View>

                                <View
                                  style={{
                                    flexDirection: 'row',
                                    backgroundColor: 'white',
                                    width: '30%',
                                    height: '100%',
                                    justifyContent: 'flex-start',
                                    alignItems: 'center',
                                  }}>
                                  <Text
                                    style={{
                                      fontSize: responsiveFontSize(1.4),
                                      fontWeight: '600',
                                      color: 'black',
                                    }}>
                                    {item.joining_members.length}
                                  </Text>
                                  <AIcon name="plus" size={10} color="#000" />
                                </View>
                              </View>
                            </View>
                          </TouchableOpacity>
                        );

                        // });
                      }}
                    />
                  </View>
                </View>

                {/* Outdoor */}

                <View
                  style={{
                    backgroundColor: 'white',
                    height: responsiveHeight(47),
                    shadowOpacity: 0.5,
                    shadowRadius: 2,
                    elevation: 10,
                    width: responsiveWidth(100),
                    marginBottom: 10,
                    top: 5,
                    borderRadius: 20,
                  }}>
                  <View
                    style={{
                      backgroundColor: 'white',
                      height: '12%',
                      justifyContent: 'flex-end',
                      marginHorizontal: 10,
                    }}>
                    <Text
                      style={{
                        fontSize: responsiveFontSize(2.7),
                        fontWeight: '600',
                        color: 'black',
                        marginLeft: 10,
                      }}>
                      Hiking
                    </Text>
                  </View>

                  <View
                    style={{
                      backgroundColor: 'white',
                      height: responsiveHeight(40),
                      flexDirection: 'row',
                      marginTop: 10,
                      borderRadius: 20,
                    }}>
                    <FlatList
                      data={this.state.outdoor_data}
                      showsHorizontalScrollIndicator={false}
                      horizontal={true}
                      keyExtractor={item => item.id}
                      renderItem={({item, index}) => {
                        // item.Cricket.map(itm => {
                        {
                          console.log(item);
                        }

                        return (
                          <TouchableOpacity
                            style={{backgroundColor: 'white', borderRadius: 20}}
                            onPress={() => {
                              this.state.jobflag === true
                                ? this.props.navigation.navigate('JobInfo', {
                                    item: item,
                                  })
                                : this.props.navigation.navigate(
                                    'CommunityEvent',
                                    {item: item},
                                  );
                            }}>
                            <View
                              style={{backgroundColor: 'white', padding: 5}}>
                              <View
                                style={{
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                <Image
                                  source={require('../../Assets/watch.jpg')}
                                  style={{
                                    width: responsiveHeight(15),
                                    height: responsiveHeight(15),
                                    borderRadius: 20,
                                  }}></Image>
                              </View>

                              <View
                                style={{
                                  width: '100%',
                                  borderRadius: 0,
                                  justifyContent: 'flex-start',
                                  alignItems: 'center',
                                }}>
                                <Text
                                  style={{
                                    fontSize: responsiveFontSize(1.4),
                                    fontWeight: '600',
                                    color: '#5e5d5d',
                                  }}>
                                  {this.state.jobflag ? (
                                    <Text>{item.company_name}</Text>
                                  ) : (
                                    <Text>Sun,Sep 8,10:00 AM</Text>
                                  )}
                                </Text>
                              </View>
                            </View>

                            <View
                              style={{
                                backgroundColor: 'white',
                                height: '45%',
                                width: 150,
                              }}>
                              <View
                                style={{
                                  backgroundColor: 'white',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                <Text
                                  style={{
                                    fontSize: responsiveFontSize(2),
                                    fontWeight: '600',
                                    color: '#5e5d5d',
                                  }}>
                                  {this.state.jobflag ? (
                                    <Text>{item.title}</Text>
                                  ) : (
                                    <Text>{item.sub_category}</Text>
                                  )}
                                </Text>
                              </View>

                              <View
                                style={{
                                  flexDirection: 'row',
                                  backgroundColor: 'white',
                                  height: '40%',
                                  justifyContent: 'flex-start',
                                  alignItems: 'center',
                                }}>
                                <Thumbnail
                                  small
                                  source={{
                                    uri:
                                      'https://randomuser.me/api/portraits/men/45.jpg',
                                  }}
                                  style={{
                                    left: 20,
                                    borderRadius: 30,
                                    shadowOpacity: 0.5,
                                    shadowRadius: 2,
                                    elevation: 5,
                                  }}
                                />
                                <Text
                                  style={{
                                    left: 30,
                                    fontSize: responsiveFontSize(1.8),
                                    fontWeight: '600',
                                    color: '#5e5d5d',
                                  }}>
                                  {item.user_name}
                                </Text>
                              </View>

                              <View
                                style={{
                                  flexDirection: 'row',
                                  backgroundColor: 'white',
                                  height: '10%',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                <EIcon
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
                                  {item.location}
                                </Text>
                              </View>

                              <View
                                style={{
                                  backgroundColor: 'white',
                                  width: 130,
                                  height: '35%',
                                  flexDirection: 'row',
                                  left: 10,
                                  borderRadius: 10,
                                  top: 1,
                                }}>
                                <View
                                  style={{
                                    left: 10,
                                    flexDirection: 'row',
                                    backgroundColor: 'white',
                                    width: '70%',
                                    height: '90%',
                                    alignItems: 'center',
                                  }}>
                                  <Thumbnail
                                    small
                                    source={{
                                      uri: item.userImg,
                                    }}
                                    style={{
                                      marginLeft: 0,
                                      borderRadius: 30,
                                      shadowOpacity: 0.5,
                                      shadowRadius: 2,
                                      elevation: 5,
                                      height: 30,
                                      width: 30,
                                    }}
                                  />
                                  <Thumbnail
                                    small
                                    source={{
                                      uri:
                                        'https://randomuser.me/api/portraits/men/51.jpg',
                                    }}
                                    style={{
                                      marginLeft: -10,
                                      borderRadius: 30,
                                      shadowOpacity: 0.5,
                                      shadowRadius: 2,
                                      elevation: 5,
                                      height: 30,
                                      width: 30,
                                    }}
                                  />
                                  <Thumbnail
                                    small
                                    source={{
                                      uri:
                                        'https://randomuser.me/api/portraits/men/28.jpg',
                                    }}
                                    style={{
                                      marginLeft: -10,
                                      borderRadius: 30,
                                      shadowOpacity: 0.5,
                                      shadowRadius: 2,
                                      elevation: 5,
                                      height: 30,
                                      width: 30,
                                    }}
                                  />
                                </View>

                                <View
                                  style={{
                                    flexDirection: 'row',
                                    backgroundColor: 'white',
                                    width: '30%',
                                    height: '100%',
                                    justifyContent: 'flex-start',
                                    alignItems: 'center',
                                  }}>
                                  <Text
                                    style={{
                                      fontSize: responsiveFontSize(1.4),
                                      fontWeight: '600',
                                      color: 'black',
                                    }}>
                                    {item.joining_members.length}
                                  </Text>
                                  <AIcon name="plus" size={10} color="#000" />
                                </View>
                              </View>
                            </View>
                          </TouchableOpacity>
                        );

                        // });
                      }}
                    />
                  </View>
                </View>
              </View>
            )}
          </ScrollView>
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
  welcome: {
    fontSize: responsiveFontSize(3.6),
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
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
  container1: {
    marginTop: responsiveHeight(6.7),
  },
});
