
import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, Dimensions, TextInput, FlatList, Picker, TouchableOpacity, ScrollView, Modal, TouchableHighlight } from 'react-native';
import { Thumbnail, Button } from 'native-base';
import Icon from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EIcon from 'react-native-vector-icons/Entypo';
import FIcon from 'react-native-vector-icons/FontAwesome';
import AIcon from 'react-native-vector-icons/AntDesign';
import { CheckBox } from 'react-native-elements'

import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
import { placeholder } from '@babel/types';
import Ionicon from 'react-native-vector-icons/Ionicons';




export default class EditCompany extends Component {
    static navigationOptions = {
        header: null,
      }

    constructor(props) {
        super(props);
        this.state = {
            datasource: [1, 2,],
            flag1: false,
            flag2: false,
            flag3: false,
            flag4: false,
            flag5: false,
            flag6: false,
            modalVisible: false,
        }

    }
    toggleModal(visible) {
        this.setState({ modalVisible: visible });
    }
    

    render() {

        // const uri = "https://facebook.github.io/react-native/docs/assets/favicon.png";
        const uri = <Icon name="location" size={40} color="#900" />;

        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>Edit Company</Text>
                <FIcon name="chevron-left" size={25} color={'#32cd32'} onPress={() => this.props.navigation.goBack()} style={styles.menu} />
                



                <ScrollView style={styles.container1}>
                    <View style={styles.bodyContainer}>

                        <View style={{ padding: 5, marginBottom: 5, backgroundColor: 'white', width: '100%', height: responsiveHeight(40), shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.2, shadowRadius: 1.41, elevation: 3, borderRadius: 5 }}>

                            <View style={{ backgroundColor: 'white', height: '15%', flexDirection: 'row', justifyContent: 'space-between' }}>

                                <View style={{ paddingHorizontal: 5, width: '40%', height: '100%', justifyContent: 'center', }}>
                                    <Text style={{ fontSize: responsiveFontSize(1.8), color: '#000000', }}>
                                        Company Name
                                </Text>
                                </View>

                                <TextInput placeholder='Company Name' style={{ fontSize: 12, marginTop: 3, padding: 5, justifyContent: 'center', backgroundColor: 'white', width: '60%', height: '80%', shadowColor: 'black', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.2, shadowRadius: 1.41, elevation: 5, borderRadius: 10 }}>

                                </TextInput>

                            </View>

                            <View style={{ backgroundColor: 'white', height: '15%', flexDirection: 'row', justifyContent: 'space-between', }}>

                                <View style={{ paddingHorizontal: 5, width: '40%', height: '100%', justifyContent: 'center', }}>
                                    <Text style={{ fontSize: responsiveFontSize(1.8), color: '#000000', }}>
                                        Location
</Text>
                                </View>

                                <TextInput placeholder='Location' style={{ fontSize: 12, marginTop: 3, padding: 5, justifyContent: 'center', backgroundColor: 'white', width: '60%', height: '80%', shadowColor: 'black', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.2, shadowRadius: 1.41, elevation: 5, borderRadius: 10 }}>

                                </TextInput>

                            </View>

                            <View style={{ backgroundColor: 'white', height: '15%', flexDirection: 'row', justifyContent: 'space-between', }}>

                                <View style={{ paddingHorizontal: 5, width: '40%', height: '100%', justifyContent: 'center', }}>
                                    <Text style={{ fontSize: responsiveFontSize(1.8), color: '#000000', }}>
                                        Opening Hours
</Text>
                                </View>

                                <TextInput placeholder='9:00 Am' style={{ fontSize: 12, marginTop: 3, padding: 5, justifyContent: 'center', backgroundColor: 'white', width: '60%', height: '80%', shadowColor: 'black', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.2, shadowRadius: 1.41, elevation: 5, borderRadius: 10 }}>

                                </TextInput>

                            </View>
                            <View style={{ backgroundColor: 'white', height: '15%', flexDirection: 'row', justifyContent: 'space-between', }}>

                                <View style={{ paddingHorizontal: 5, width: '40%', height: '100%', justifyContent: 'center', }}>
                                    <Text style={{ fontSize: responsiveFontSize(1.8), color: '#000000', }}>
                                        Closing Hours
</Text>
                                </View>

                                <TextInput placeholder='5:00 Pm' style={{ fontSize: 12, marginTop: 3, padding: 5, justifyContent: 'center', backgroundColor: 'white', width: '60%', height: '80%', shadowColor: 'black', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.2, shadowRadius: 1.41, elevation: 5, borderRadius: 10 }}>

                                </TextInput>

                            </View>


                            <View style={{ backgroundColor: 'white', height: '15%', flexDirection: 'row', justifyContent: 'space-between', }}>

                                <View style={{ paddingHorizontal: 5, width: '40%', height: '100%', justifyContent: 'center', }}>
                                    <Text style={{ fontSize: responsiveFontSize(1.8), color: '#000000', }}>
                                        Day
</Text>
                                </View>

                                <TextInput placeholder='Mon-Fri' style={{ fontSize: 12, marginTop: 3, padding: 5, justifyContent: 'center', backgroundColor: 'white', width: '60%', height: '80%', shadowColor: 'black', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.2, shadowRadius: 1.41, elevation: 5, borderRadius: 10 }}>

                                </TextInput>

                            </View>


                            <View style={{ backgroundColor: 'white', height: '25%', flexDirection: 'row', justifyContent: 'space-between', }}>

                                <View style={{ paddingHorizontal: 5, width: '40%', height: '100%', justifyContent: 'center', }}>
                                    <Text style={{ fontSize: responsiveFontSize(1.8), color: '#000000', }}>
                                        Description
</Text>
                                </View>

                                <TextInput placeholder='Some Sample text ' multiline={true} style={{ fontSize: 12, marginTop: 3, padding: 5, justifyContent: 'center', backgroundColor: 'white', width: '60%', height: '90%', shadowColor: 'black', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.2, shadowRadius: 1.41, elevation: 5, borderRadius: 10 }}>

                                </TextInput>

                            </View>




                        </View>

                        <View style={{ marginTop: 5, height: responsiveHeight(10), flexDirection: 'row', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.2, shadowRadius: 1.41, elevation: 5, backgroundColor: 'white', borderRadius: 10 }}>

                            <View style={{ backgroundColor: 'white', width: '80%', height: '100%', justifyContent: 'center', borderRadius: 10 }}>
                                <Text style={{ left: 20, fontSize: 14, color: '#7e7a7a', }}>
                                    Upload Video
</Text>
                            </View>
                            <View style={{ backgroundColor: 'white', flexDirection: 'row', width: '20%', height: '100%', alignItems: 'center', borderRadius: 10 }}>
                                <TouchableOpacity style={{ backgroundColor: 'white', width: '26%', height: '60%', justifyContent: "center", alignItems: 'center', borderRadius: 10 }}>
                                    <EIcon name="camera" size={20} color='#7e7a7a' />
                                </TouchableOpacity>
                                <TouchableOpacity style={{ left: 8, backgroundColor: 'white', width: '25%', height: '60%', justifyContent: "center", alignItems: 'flex-start', borderRadius: 10 }}>
                                    <EIcon name="attachment" size={20} color='#7e7a7a' />
                                </TouchableOpacity>

                            </View>

                        </View>

                        <View style={{ backgroundColor: 'white', height: responsiveHeight(45), marginTop: 5, shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.2, shadowRadius: 1.41, elevation: 5, borderRadius: 10 }}>
                            <View style={{ backgroundColor: 'white', height: '20%', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: responsiveFontSize(2.6), color: '#000', }}>
                                    Company Admins
</Text>
                            </View>

                            <View style={{ flexDirection: 'row', backgroundColor: 'white', height: '25%', width: responsiveWidth(100), }}>

                                <View style={{ width: '20%', justifyContent: 'center', alignItems: 'center' }}>
                                    <Image source={{ uri: 'https://randomuser.me/api/portraits/men/85.jpg' }} style={{ borderRadius: responsiveHeight(8), width: responsiveHeight(8), height: responsiveHeight(8), }} />
                                </View>

                                <View style={{ width: '80%', justifyContent: 'center', paddingHorizontal: 10, borderBottomWidth: .1 }}>
                                    <Text style={{ fontWeight: '600', color: '#222', fontSize: responsiveFontSize(2.4), width: 170, }} numberOfLines={1}>
                                        Mark Doe
        </Text>

                                </View>


                            </View>
                            <View style={{ flexDirection: 'row', backgroundColor: 'white', height: '25%', width: responsiveWidth(100), }}>

                                <View style={{ width: '20%', justifyContent: 'center', alignItems: 'center' }}>
                                    <Image source={{ uri: 'https://randomuser.me/api/portraits/men/85.jpg' }} style={{ borderRadius: responsiveHeight(8), width: responsiveHeight(8), height: responsiveHeight(8), }} />
                                </View>

                                <View style={{ width: '80%', justifyContent: 'center', paddingHorizontal: 10, borderBottomWidth: .1 }}>
                                    <Text style={{ fontWeight: '600', color: '#222', fontSize: responsiveFontSize(2.4), width: 170, }} numberOfLines={1}>
                                        Mark Doe
        </Text>

                                </View>


                            </View>

                            <View style={{ flexDirection: 'row', backgroundColor: 'white', height: '25%', width: responsiveWidth(100), }}>

                                <View style={{ width: '20%', justifyContent: 'center', alignItems: 'center' }}>
                                    <Image source={{ uri: 'https://randomuser.me/api/portraits/men/85.jpg' }} style={{ borderRadius: responsiveHeight(8), width: responsiveHeight(8), height: responsiveHeight(8), }} />
                                </View>

                                <View style={{ width: '80%', justifyContent: 'center', paddingHorizontal: 10, borderBottomWidth: .1 }}>
                                    <Text style={{ fontWeight: '600', color: '#222', fontSize: responsiveFontSize(2.4), width: 170, }} numberOfLines={1}>
                                        Mark Doe
        </Text>

                                </View>


                            </View>





                        </View>

                    </View>

                    <View style={{ marginTop: 0, backgroundColor: "white", width: '100%', height: responsiveHeight(6), justifyContent: 'center', alignItems: 'center', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.2, shadowRadius: 1.41, elevation: 2, borderRadius: 10 }}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                            <Text style={{ fontSize: responsiveFontSize(2), color: '#ff0000', }}>
                                Delete Company
                            </Text>

                        </TouchableOpacity>
                    </View>

                    <View style={{ marginTop: 5, backgroundColor: "white", width: '100%', height: responsiveHeight(6), justifyContent: 'center', alignItems: 'center', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.2, shadowRadius: 1.41, elevation: 2, borderRadius: 10 }} >
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('AddCompany')}>
                            <Text style={{ fontSize: responsiveFontSize(2), color: '#ff0000', }}>
                                Add New Company
                            </Text>

                        </TouchableOpacity>
                    </View>




                </ScrollView>


            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    container1: {
        marginTop: 10,

        paddingLeft: 2,
        paddingRight: 2,
    },

    menu: {

        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginTop: responsiveHeight(1.8),
        marginLeft: '4%',
        position: 'absolute'

    },
    menu1: {
        width: 10, height: 50, borderRadius: 42,
        marginTop: responsiveHeight(2.8),
        marginLeft: '90%',
        position: 'absolute'
    },
    welcome: {
        fontSize: responsiveFontSize(3.6),
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 7,
    },
    bodyContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        height: responsiveHeight(100),
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        marginBottom: 5,
        width: responsiveWidth(100),
    },
    modal: {
        //  margin:5,
        top: responsiveHeight(30),
        width: responsiveWidth(90),
        height: responsiveHeight(25),
        borderRadius: 15,
        padding: 10,
        paddingHorizontal: 20,
        alignSelf: 'center',

        backgroundColor: '#32cd32',
        // padding: 100
    },





});
