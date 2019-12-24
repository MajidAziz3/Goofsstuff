
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, SafeAreaView, Image, ScrollView, TouchableOpacity,FlatList, ActivityIndicator } from 'react-native';
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
import { getData, uploadImage, uploadUserImage, getDocByKeyValue } from '../../Backend/Utility';
import { _retrieveData } from '../../Backend/AsyncStore/AsyncFunc';

export default class LearnMore extends Component {
    static navigationOptions = {
        header: null,
    }
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            video: false,
            data_user: '',
            user_id: this.props.navigation.state.params.user_id,
            speakerData: [],
            speakerWatch: [],
        }
    }
    componentDidMount = async () => {
        await _retrieveData('user').then(async result => {
            await getData('users', result).then(res =>
                this.setState({
                    data_user: res.profile_picture,
                }),
            );
        });
        console.log("SPEAKER DATA>>>", this.state.user_id)
        await getData('users', this.state.user_id).then(res =>
            this.setState({ speakerData: res, loading: false })
        );
        this.getPostData(this.state.user_id);

    };

    getPostData(val) {
        getDocByKeyValue("Watch", "user_id", val).then(res =>
            this.setState({
                speakerWatch: res,
            }, console.log("POSSSTSS>>>>", res)),
        );
    };

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={{ marginBottom: responsiveHeight(1.5) }}>
                    <Text style={styles.welcome1}>About Speaker</Text>
                    <FA name="chevron-left" size={26} color={'#32cd32'} onPress={() => this.props.navigation.goBack()} style={styles.menu} />
                    <Image source={{ uri: this.state.data_user }} style={styles.menu1} />
                </View>

                {this.state.loading ? (
                    <ActivityIndicator
                        size={'large'}
                        color="#32cd32"
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            flex: 1,
                        }}
                    />
                ) : (
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
                                            {this.state.speakerData.name}
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
                                                {this.state.speakerData.location}
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
                                                {this.state.speakerData.email}
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
                                        <Text style={{
                                            left: 1,
                                            fontSize: responsiveFontSize(1.8),
                                            fontWeight: 'bold',
                                            color: '#7e7474',
                                        }}>
                                            About Speaker
                                        </Text>
                                        <Text
                                            numberOfLines={3}
                                            style={{
                                                flex: 1,
                                                flexGrow: 1,
                                                fontSize: responsiveFontSize(1.8),
                                                color: '#7e7474',
                                                marginTop: 4
                                            }}>
                                            {this.state.speakerData.bio}
                                        </Text>
                                    </View>

                                </View>

                            </View>

                            <FlatList
                                data={this.state.speakerWatch}
                                keyExtractor={item => item.id}
                                renderItem={({ item, index }) => (
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
                                                        item.videoUrl,
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
                                        </View>
                                    </View>

                                )}
                            />


                        </ScrollView>
                    )}
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
