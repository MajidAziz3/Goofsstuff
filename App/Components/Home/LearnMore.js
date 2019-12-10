
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, SafeAreaView, Image, ScrollView, TouchableOpacity } from 'react-native';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize,
} from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ETIcon from 'react-native-vector-icons/Entypo';
import EIcon from 'react-native-vector-icons/EvilIcons';
import FA from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AIcon from 'react-native-vector-icons/AntDesign';
import VideoPlayer from 'react-native-video-controls';

export default class LearnMore extends Component {
    static navigationOptions = {
        header: null,
      }
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            video: false,
        }
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={{marginBottom: responsiveHeight(1.5)}}>
        <Text style={styles.welcome1}>About Speaker</Text>
                <FA name="chevron-left" size={26} color={'#32cd32'} onPress={() => this.props.navigation.goBack()} style={styles.menu} />
                <Image source={{ uri: 'https://randomuser.me/api/portraits/men/85.jpg' }} style={styles.menu1} />
        </View>
                <ScrollView>
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>


                        <View
                            style={{
                                backgroundColor: 'white',
                                height: responsiveHeight(30),
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
                                    Speaker Name
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
                                    Location:
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

                    <View
                        style={{
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 2 },
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
                            marginTop: 10,
                        }}>
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
                                        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
                                }}
                                navigator={this.props.navigator}
                                disableBack={true}
                                disableVolume={true}
                                disableFullscreen={true}
                                paused={true}
                            />
                        </View>

                        <View
                            style={{
                                height: '15%',
                                flexDirection: 'row',
                                paddingHorizontal: 5,
                                backgroundColor: 'white',
                                justifyContent: 'space-evenly',
                            }}>

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
                                    <EIcon
                                        name="like"
                                        size={25}
                                        color={this.state.hit_like ? '#32cd32' : '#7e7a7a'}
                                    />
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
                                    <AIcon name="heart" size={20} color={this.state.hit_favorite ? '#32cd32' : null} onPress={() => {
                                        this.favoritePost(item.post_id);
                                        this.setState({
                                            hit_favorite: !this.state.hit_favorite,
                                        });
                                    }} />
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
                    <View
                        style={{
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 2 },
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
                            marginTop: responsiveHeight(7),
                        }}>
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
                                        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
                                }}
                                navigator={this.props.navigator}
                                disableBack={true}
                                disableVolume={true}
                                disableFullscreen={true}
                                paused={true}
                            />
                        </View>

                        <View
                            style={{
                                height: '15%',
                                flexDirection: 'row',
                                paddingHorizontal: 5,
                                backgroundColor: 'white',
                                justifyContent: 'space-evenly',
                            }}>

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
                                    <EIcon
                                        name="like"
                                        size={25}
                                        color={this.state.hit_like ? '#32cd32' : '#7e7a7a'}
                                    />
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
                                    <AIcon name="heart" size={20} color={this.state.hit_favorite ? '#32cd32' : null} onPress={() => {
                                        this.favoritePost(item.post_id);
                                        this.setState({
                                            hit_favorite: !this.state.hit_favorite,
                                        });
                                    }} />
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
                    <View
                        style={{
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 2 },
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
                            marginTop: responsiveHeight(7),
                        }}>
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
                                        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
                                }}
                                navigator={this.props.navigator}
                                disableBack={true}
                                disableVolume={true}
                                disableFullscreen={true}
                                paused={true}
                            />
                        </View>

                        <View
                            style={{
                                height: '15%',
                                flexDirection: 'row',
                                paddingHorizontal: 5,
                                backgroundColor: 'white',
                                justifyContent: 'space-evenly',
                            }}>

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
                                    <EIcon
                                        name="like"
                                        size={25}
                                        color={this.state.hit_like ? '#32cd32' : '#7e7a7a'}
                                    />
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
                                    <AIcon name="heart" size={20} color={this.state.hit_favorite ? '#32cd32' : null} onPress={() => {
                                        this.favoritePost(item.post_id);
                                        this.setState({
                                            hit_favorite: !this.state.hit_favorite,
                                        });
                                    }} />
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
                    <View
                        style={{
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 2 },
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
                            marginTop: responsiveHeight(7),
                        }}>
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

                        <View
                            style={{
                                height: '15%',
                                flexDirection: 'row',
                                paddingHorizontal: 5,
                                backgroundColor: 'white',
                                justifyContent: 'space-evenly',
                            }}>

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
                                    <EIcon
                                        name="like"
                                        size={25}
                                        color={this.state.hit_like ? '#32cd32' : '#7e7a7a'}
                                    />
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
                                    <AIcon name="heart" size={20} color={this.state.hit_favorite ? '#32cd32' : null} onPress={() => {
                                        this.favoritePost(item.post_id);
                                        this.setState({
                                            hit_favorite: !this.state.hit_favorite,
                                        });
                                    }} />
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
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    welcome1: {
        fontSize: responsiveFontSize(3.8),
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 7,
    },
    menu: {
    
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginTop: responsiveHeight(2.6),
        marginLeft: '4%',
        position: 'absolute'
    
    },
    menu1: {
        width: 10, height: 50, borderRadius: 42,
        marginTop: responsiveHeight(1.2),
        marginLeft: '85%',
        position: 'absolute'
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
