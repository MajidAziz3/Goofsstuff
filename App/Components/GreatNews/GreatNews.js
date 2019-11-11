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
} from 'react-native';
import {Thumbnail, Item, Textarea} from 'native-base';
import {jsxAttribute} from '@babel/types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import EIcon from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {withNavigationFocus} from 'react-navigation';
import {TouchableOpacity} from 'react-native-gesture-handler';

const uri = 'https://randomuser.me/api/portraits/men/1.jpg';
class GreatNews extends Component {
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
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={{marginBottom: 10}}>
          <Text style={styles.welcome}>Great Stuff</Text>
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
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: 8,
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              color: '#000',
            }}>
            What Are You celebirating?
          </Text>
          <Text
            style={{
              fontWeight: 'bold',
              color: '#000',
            }}>
            Sharewith your friends the great stuff that is going on your life.It
            will spotlighted on Good News feed.
          </Text>
        </View>

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
            width: '33%',
            alignSelf: 'flex-end',
            borderRadius: 10,
            marginRight: 10,
          }}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              backgroundColor: '#32cd32',
              width: '100%',
              height: '100%',
              borderRadius: 5,
              justifyContent: 'center',
              alignItems: 'center',
              elevation: 1,
            }}
            onPress={() => {
              alert('Posted');
            }}>
            <FontAwesome name="upload" size={18} color="white" style={{}} />

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

        <ScrollView style={styles.container1}>
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
                    height: '25%',
                    flexDirection: 'row',
                    marginBottom: 1,
                  }}>
                  <View
                    style={{
                      backgroundColor: 'white',
                      width: '25%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: 1,
                      height: 65,
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
                    paddingHorizontal: 20,
                    backgroundColor: 'white',
                    height: '15%',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      width: '25%',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity>
                      <Image
                        source={require('../../Assets/clap2.png')}
                        style={{height: 15, width: 15}}
                      />
                    </TouchableOpacity>
                    <Text
                      style={{
                        marginHorizontal: 10,
                        fontWeight: '400',
                        fontSize: responsiveFontSize(1.6),
                      }}>
                      878
                    </Text>
                  </View>
                  {/* <View
                    style={{
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      width: '25%',
                      justifyContent: 'center',
                      alignItems: 'flex-end',
                    }}>
                    <TouchableOpacity></TouchableOpacity>
                    <Image
                      source={require('../../Assets/clap.png')}
                    />
                    <Text
                      style={{
                        marginHorizontal: 10,
                        fontWeight: '400',
                        color: '#7e7a7a',
                        fontSize: responsiveFontSize(1.6),
                      }}>
                      878
                    </Text>
                  </View> */}
                  <View
                    style={{
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      width: '25%',
                      justifyContent: 'center',
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
                      width: '25%',
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
                      width: '25%',
                      justifyContent: 'center',
                      alignItems: 'flex-end',
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
                  <TextInput
                    style={{
                      fontSize: 12,
                      paddingHorizontal: 20,
                      padding: 0,
                      height: '90%',
                      backgroundColor: '#dee3e1',
                      width: '80%',
                      borderRadius: 50,
                    }}
                    placeholder="Type something">
                    {/* <TextInput style={{ marginHorizontal: 10, alignSelf: 'flex-start' }} placeholder='type something'placeholderStyle={{ fontFamily: "AnotherFont", borderColor: 'red',alignSelf:'center' }} > */}
                  </TextInput>
                  {/* </View> */}
                  <View
                    style={{
                      width: '20%',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Icon
                      name="message"
                      size={20}
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  container1: {
    marginTop: responsiveHeight(5),
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
  welcome: {
    fontSize: responsiveFontSize(3.8),
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 7,
  },
});
export default GreatNews;
