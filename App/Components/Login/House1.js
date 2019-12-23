import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    StatusBar,
    Image,
    TextInput,
    ScrollView,
    SafeAreaView
} from 'react-native';
import { Left, Thumbnail, Input } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
// import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ETIcon from 'react-native-vector-icons/Entypo';
import EIcon from 'react-native-vector-icons/EvilIcons';
import AIcon from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';

import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize,
} from 'react-native-responsive-dimensions';
import Ionicon from 'react-native-vector-icons/Ionicons';

class House1 extends Component {
    static navigationOptions = {
        header: null,
    };
    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView>
                    <View style={{ marginBottom: 10 }}>
                        <Text style={styles.welcome}>Build the House</Text>
                        <Ionicon
                            name="ios-menu"
                            size={35}
                            color={'#32cd32'}
                            onPress={() => this.props.navigation.openDrawer()}
                            style={styles.menu}
                        />
                    </View>
                    <View
                        style={{
                            marginHorizontal: 10,
                        }}>
                        <View
                            style={{
                                backgroundColor: 'white',
                                height: responsiveHeight(30),
                                width: responsiveWidth(100),
                                alignSelf: 'center',
                                justifyContent: 'space-around',
                            }}>
                            <View
                                style={{
                                    height: '45%',
                                    width: '100%',
                                    backgroundColor: 'white',
                                    alignSelf: 'center',
                                }}>
                                <Image
                                    source={require('../../Assets/goodstuff.png')}
                                    style={{ height: '80%', width: '80%', alignSelf: 'center' }}
                                />

                            </View>
                        </View>
                        <View
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                        </View>
                        <View
                            style={{
                                marginHorizontal: 5,
                            }}>
                            <Text
                                style={{
                                    color: '#000',
                                    fontWeight: '500',
                                    marginBottom: 15,
                                    fontSize: 15
                                }}>
                                One night, after putting our children to bed, we sat on the
                                couch and without even realizing, got on our phones and started
                                scrolling. Every couple of minutes we would mention what we saw
                                on social media or a news media, and most of it was crazy, bad
                                or sad. We finally looked at each other and said “Is this the
                                world we want our children to be raised in?”. In a world where
                                we are inundated with the bad, wouldn’t it be nice to just see
                                some good stuff? The next day while we were watching a message
                                called “Real Likes & Fake Love” from Pastor Howard John Wesley,
                                he said, “Social media is a tool that can be used for good or
                                for bad, to build or destroy. A hammer can be a very productive
                                tool in the right hands with the right intention or a hammer can
                                be a destructive weapon in the wrong hands with the wrong
                                intention“. A hammer can be can be used to build a house, or to
                                destroy one.
              </Text>
                            <View
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                <Text
                                    style={{
                                        color: '#000',
                                        fontWeight: 'bold',
                                        fontSize: 20,
                                        marginBottom: 15,
                                    }}>
                                    We decided to build the house.
                </Text>
                                <Image
                                    source={require('../../Assets/good.jpg')}
                                    style={{
                                        height: 180,
                                        width: 200,
                                        marginBottom: 20,
                                    }}
                                />
                                <Text
                                    style={{
                                        color: 'green',
                                        marginBottom: 15,
                                        marginHorizontal: 20,
                                        fontSize: responsiveFontSize(2),
                                    }}>
                                    We encourage you too to use the tools you have to build. Build
                                    your community, build the strength of your family, build
                                    yourself. Do all this while focusing on…. The good stuff.
                </Text>
                            </View>

                        </View>
                    </View>
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

export default House1;
