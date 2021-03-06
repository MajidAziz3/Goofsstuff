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
  SafeAreaView,
} from 'react-native';
import {Left, Thumbnail} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AIcon from 'react-native-vector-icons/AntDesign';
import Ionicon from 'react-native-vector-icons/Ionicons';
import EIcon from 'react-native-vector-icons/Entypo';
import firebase from 'firebase';
import {SearchBar} from 'react-native-elements';
import Icon from 'react-native-vector-icons/EvilIcons';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {getAllOfCollection, getData} from '../../Backend/Utility';
import SearchInput, {createFilter} from 'react-native-search-filter';
import {_retrieveData} from '../../Backend/AsyncStore/AsyncFunc';

// import { formatResultsErrors } from 'jest-message-util';
///Enterprneure Corner Gallary
const uri = 'https://randomuser.me/api/portraits/men/85.jpg';
const KEYS_TO_FILTERS = ['group_name'];
class GroupList extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      datasource: [1, 2, 3],
      post_data: [],
      searchTerm: '',
      userId: '',
    };
  }

  componentDidMount = async () => {
    await firebase
      .firestore()
      .collection('Create_Group')
      .onSnapshot(async () => {
        await _retrieveData('user').then(async result => {
          let data = await getData('Create_Group', result);
          this.setState({
            post_data: data.group,
            loading: false,
            userId: result,
          });
        });
      });
  };

  searchUpdated(term) {
    this.setState({searchTerm: term});
  }

  render() {
    console.log(this.state.post_data);
    return (
      <SafeAreaView style={styles.container}>
        <View>
          <Text style={styles.welcome}>Groups</Text>
          <Ionicon
            name="ios-menu"
            size={35}
            color={'#32cd32'}
            onPress={() => this.props.navigation.openDrawer()}
            style={styles.menu}
          />
          <AIcon
            name="plus"
            size={35}
            color={'#32cd32'}
            style={styles.menu1}
            onPress={() =>
              this.props.navigation.navigate('AddGroup', {
                item: this.state.userId,
              })
            }
          />
        </View>
        <View style={styles.seacrhbarContainter}>
          {/*                    
                    <SearchBar
                        placeholder="Type something..."
                        onChangeText={this.updateSearch}
                        // value={search}
                        round
                        lightTheme

                        leftIconContainerStyle={{backgroundColor:'#59e123',borderRadius:20,height:30,left:-12}}
                        
                        inputContainerStyle={{backgroundColor:'#eceeeb',width:'90%',height:35,padding:7}}
                        searchIcon={<Icon name="search" size={30} color='white' style={{marginLeft:0}}/>}
                        containerStyle={{ backgroundColor:'white',width:'100%',paddingLeft:50}}
                    /> */}

          <SearchInput
            onChangeText={term => {
              this.searchUpdated(term);
            }}
            style={styles.searchInput}
            placeholder="Type a message to search"
            clearIcon={
              this.state.searchTerm !== '' && (
                <EIcon name="cross" size={30} color={'#32cd32'} />
              )
            }
            clearIconViewStyles={{position: 'absolute', top: 4, right: 22}}
          />
        </View>
        {!this.state.post_data ? (
          this.state.searchTerm == '' ? (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text
                style={{
                  alignSelf: 'center',
                  fontSize: 18,
                  fontFamily: 'Cochin',
                }}>
                You haven't joined any group yet!
              </Text>
            </View>
          ) : (
            <ScrollView>
              {this.state.post_data
                .filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))
                .map(item => {
                  return (
                    <TouchableOpacity
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
                      }}
                      onPress={() =>
                        this.props.navigation.navigate('GroupDetails', {
                          item: item,
                        })
                      }>
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
                          {item.group_name}
                        </Text>
                      </View>

                      <View
                        style={{
                          backgroundColor: 'white',
                          height: '55%',
                          width: '100%',
                        }}>
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
                          <View
                            style={{backgroundColor: 'white', height: '30%'}}>
                            <Text
                              style={{
                                fontSize: responsiveFontSize(1.8),
                                fontWeight: '900',
                                color: 'black',
                              }}>
                              Purpose:
                            </Text>
                          </View>
                          <View
                            style={{backgroundColor: 'white', height: '70%'}}>
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
                    </TouchableOpacity>
                  );
                })}
            </ScrollView>
          )
        ) : this.state.searchTerm == '' ? (
          <ScrollView style={styles.container1}>
            <FlatList
              data={this.state.post_data}
              keyExtractor={item => item.id}
              renderItem={({item, index}) => (
                <TouchableOpacity
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
                  }}
                  onPress={() =>
                    this.props.navigation.navigate('GroupDetails', {item: item})
                  }>
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
                      {item.group_name}
                    </Text>
                  </View>

                  <View
                    style={{
                      backgroundColor: 'white',
                      height: '55%',
                      width: '100%',
                    }}>
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
                </TouchableOpacity>
              )}
            />
          </ScrollView>
        ) : (
          <ScrollView>
            {this.state.post_data
              .filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))
              .map(item => {
                return (
                  <TouchableOpacity
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
                    }}
                    onPress={() =>
                      this.props.navigation.navigate('GroupDetails', {
                        item: item,
                      })
                    }>
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
                        {item.group_name}
                      </Text>
                    </View>

                    <View
                      style={{
                        backgroundColor: 'white',
                        height: '55%',
                        width: '100%',
                      }}>
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
                  </TouchableOpacity>
                );
              })}
          </ScrollView>
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  searchInput: {
    padding: 10,
    borderColor: '#CCC',
    borderWidth: 1,
    width: '100%',
    backgroundColor: 'white',
    width: responsiveWidth(80),
    color: 'black',
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
    marginTop: responsiveHeight(1),
    marginLeft: '4%',
    position: 'absolute',
  },
  menu1: {
    width: 10,
    height: 50,
    borderRadius: 42,
    marginTop: responsiveHeight(1),
    marginLeft: '90%',
    position: 'absolute',
  },
  seacrhbarContainter: {
    backgroundColor: '#F5F5F5',
    height: responsiveHeight(8),
    width: responsiveWidth(100),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default GroupList;
