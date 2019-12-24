
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';


export default class Login extends Component{
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to Login</Text>
       
      </View>



   <FlatList
              data={this.state.datasource}
              keyExtractor={item => item.id}
              renderItem={({item, index}) => (
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
                      {item.name}
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
                      renderItem={({item, index}) => (
                        <TouchableOpacity
                          style={{backgroundColor: 'white', borderRadius: 20}}
                          onPress={() => {
                            this.state.jobflag === true
                              ? this.props.navigation.navigate('JobInfo')
                              : this.props.navigation.navigate(
                                  'CommunityEvent',
                                );
                          }}>
                          <View style={{backgroundColor: 'white', padding: 5}}>
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
                                  <Text>Company Name</Text>
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
                                  <Text>Job Title</Text>
                                ) : (
                                  <Text>Training Hike</Text>
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
                                    uri:
                                      'https://randomuser.me/api/portraits/women/43.jpg',
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
                                  459
                                </Text>
                                <AIcon name="plus" size={10} color="#000" />
                              </View>
                            </View>
                          </View>
                        </TouchableOpacity>
                      )}
                    />
                  </View>
                </View>
              )}></FlatList>
        


    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
