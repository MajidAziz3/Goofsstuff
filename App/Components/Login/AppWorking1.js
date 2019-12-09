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
import Ionicon from 'react-native-vector-icons/Ionicons';

import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize,
} from 'react-native-responsive-dimensions';

class AppWorking1 extends Component {
    static navigationOptions = {
        header: null,
    };
    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView>
                    <View style={{ marginBottom: 10 }}>
                        <Text style={styles.welcome}>How It Works?</Text>
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
                                    style={{ height: '80%', width: '100%' }}
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
                            <View>
                                <Text
                                    style={{
                                        color: '#000',
                                        fontWeight: 'bold',
                                        fontSize: 17,
                                        marginBottom: 0,
                                        textDecorationLine: 'underline',
                                        color: '#32cd32'
                                    }}>
                                    How It Works
              </Text>
                                <Text
                                    style={{
                                        color: '#000',
                                        fontWeight: '500',
                                        fontSize: 15,
                                        marginBottom: 15,

                                    }}>
                                    Whereas some social media is used to as a tool to be divisive- NOT FINISHEED WITH THIS
              </Text>
                            </View>
                            <View>
                                <Text
                                    style={{
                                        color: '#000',
                                        fontWeight: 'bold',
                                        fontSize: 17,
                                        marginBottom: 0,
                                        textDecorationLine: 'underline',
                                        color: '#32cd32'
                                    }}>
                                    Settings
              </Text>
                                <Text
                                    style={{
                                        color: '#000',
                                        fontWeight: '500',
                                        fontSize: 15,
                                        marginBottom: 15,
                                    }}>
                                    You have the option to turn on/off push notifications for daily affirmations, daily healthy self,  push notifications. We strive to help you become more confident, healthy and friendly to others.
              </Text>
                            </View>
                            <View>
                                <Text
                                    style={{
                                        color: '#000',
                                        fontWeight: 'bold',
                                        fontSize: 17,
                                        marginBottom: 0,
                                        textDecorationLine: 'underline',
                                        color: '#32cd32'
                                    }}>
                                    Good News
              </Text>
                                <Text
                                    style={{
                                        color: '#000',
                                        fontWeight: '500',
                                        fontSize: 15,
                                        marginBottom: 15,
                                    }}>
                                    This is a news feed page. Post text, images or videos to share with your friends on The Good Stuff App.
              </Text>
                            </View>
                            <View>
                                <Text
                                    style={{
                                        color: '#000',
                                        fontWeight: 'bold',
                                        fontSize: 17,
                                        marginBottom: 0,
                                        textDecorationLine: 'underline',
                                        color: '#32cd32'
                                    }}>
                                    Watch
              </Text>
                                <Text
                                    style={{
                                        color: '#000',
                                        fontWeight: '500',
                                        fontSize: 15,
                                        marginBottom: 15,
                                    }}>
                                    What makes our video tab so special is that we have a 3 mins of Inspiration video. Local users submit a video to inspire and encourage the community. Topics range from health, to  Hand picked speakers provide an encouraging and inspiration videos. This spotlight is reserved for people in the community.
              </Text>
                            </View>
                            <View>
                                <Text
                                    style={{
                                        color: '#000',
                                        fontWeight: 'bold',
                                        fontSize: 17,
                                        marginBottom: 0,
                                        textDecorationLine: 'underline',
                                        color: '#32cd32'
                                    }}>
                                    Community
              </Text>
                                <Text
                                    style={{
                                        color: '#000',
                                        fontWeight: '500',
                                        fontSize: 15,
                                        marginBottom: 15,
                                    }}>
                                    The community tab is for community events such as school concerts, non-profit events, networking events etc.
              </Text>
                            </View>
                            <View>
                                <Text
                                    style={{
                                        color: '#000',
                                        fontWeight: 'bold',
                                        fontSize: 17,
                                        marginBottom: 0,
                                        textDecorationLine: 'underline',
                                        color: '#32cd32'
                                    }}>
                                    Jobs
              </Text>
                                <Text
                                    style={{
                                        color: '#000',
                                        fontWeight: '500',
                                        fontSize: 15,
                                        marginBottom: 15,
                                    }}>
                                    We celebrate small businesses! Upload a job post and attract applicants from your community. Job posts at $10 per post and are visible for 30 days.
              </Text>
                            </View>
                            <View>
                                <Text
                                    style={{
                                        color: '#000',
                                        fontWeight: 'bold',
                                        fontSize: 17,
                                        marginBottom: 0,
                                        textDecorationLine: 'underline',
                                        color: '#32cd32'
                                    }}>
                                    Groups
              </Text>
                                <Text
                                    style={{
                                        color: '#000',
                                        fontWeight: '500',
                                        fontSize: 15,
                                        marginBottom: 15,
                                    }}>
                                    Groups are designed to be
              </Text>
                            </View>
                            <View>
                                <Text
                                    style={{
                                        color: '#000',
                                        fontWeight: 'bold',
                                        fontSize: 17,
                                        marginBottom: 0,
                                        textDecorationLine: 'underline',
                                        color: '#32cd32'
                                    }}>
                                    Great Stuff
              </Text>
                                <Text
                                    style={{
                                        color: '#000',
                                        fontWeight: '500',
                                        fontSize: 15,
                                        marginBottom: 15,
                                    }}>
                                    Great Stuff is a special part of the app where you can post the great stuff that is going on in your life. Just got a promotion? Found out you are pregnant? Closed on a home? This post is highlighted on your and your friend’s good news feed. Be celebrated and #postyourvictories !
              </Text>
                            </View>
                            <View>
                                <Text
                                    style={{
                                        color: '#000',
                                        fontWeight: 'bold',
                                        fontSize: 17,
                                        marginBottom: 0,
                                        textDecorationLine: 'underline',
                                        color: '#32cd32'
                                    }}>
                                    Personal Profile
              </Text>
                                <Text
                                    style={{
                                        color: '#000',
                                        fontWeight: '500',
                                        fontSize: 15,
                                        marginBottom: 15,
                                    }}>
                                    On your personal profile you have the option to create a vision board. Vision boards are used to see the goals in your life. You are able to make this public or private.
              </Text>
                            </View>
                            <View>
                                <Text
                                    style={{
                                        color: '#000',
                                        fontWeight: 'bold',
                                        fontSize: 17,
                                        marginBottom: 0,
                                        textDecorationLine: 'underline',
                                        color: '#32cd32'
                                    }}>
                                    Family Profile
              </Text>
                                <Text
                                    style={{
                                        color: '#000',
                                        fontWeight: '500',
                                        fontSize: 15,
                                        marginBottom: 15,
                                    }}>
                                    The family profile page is a closed “group” that allows family members to correspond with each other. Post on your family feed, share pictures in your gallery and keep all members updated with family events.
              </Text>
                            </View>
                            <View>
                                <Text
                                    style={{
                                        color: '#000',
                                        fontWeight: 'bold',
                                        fontSize: 17,
                                        marginBottom: 0,
                                        textDecorationLine: 'underline',
                                        color: '#32cd32'
                                    }}>
                                    Company Page
              </Text>
                                <Text
                                    style={{
                                        color: '#000',
                                        fontWeight: '500',
                                        fontSize: 15,
                                        marginBottom: 15,
                                    }}>
                                    The stars on the company page are cumulative. If a client is impressed and recommends your company, ask them to give you a star on the Good Stuff app. We do not have a 1-5 star ranking system
              </Text>
                            </View>
                            <View>
                                <Text
                                    style={{
                                        color: '#000',
                                        fontWeight: 'bold',
                                        fontSize: 17,
                                        marginBottom: 0,
                                        textDecorationLine: 'underline',
                                        color: '#32cd32'
                                    }}>
                                    Contests
              </Text>
                                <Text
                                    style={{
                                        color: '#000',
                                        fontWeight: '500',
                                        fontSize: 15,
                                        marginBottom: 15,
                                    }}>
                                    Coming Soon!
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

export default AppWorking1;
