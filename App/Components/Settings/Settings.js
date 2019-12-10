
import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, Dimensions, TextInput, FlatList, Picker, TouchableOpacity, ScrollView, Modal, TouchableHighlight, SafeAreaView } from 'react-native';
import { Thumbnail, Button } from 'native-base';
import Icon from 'react-native-vector-icons/EvilIcons';
import EIcon from 'react-native-vector-icons/Entypo';
import FIcon from 'react-native-vector-icons/FontAwesome5';
import AIcon from 'react-native-vector-icons/AntDesign';
import { CheckBox } from 'react-native-elements'

import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
import { placeholder } from '@babel/types';
import Ionicon from 'react-native-vector-icons/Ionicons';

import SwitchToggle from 'react-native-switch-toggle';


export default class Settings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            datasource: [1, 2, 3, 5, 5],
            flag1: false,
            flag2: false,
            flag3: false,
            flag4: false,
            flag5: false,
            flag6: false,
            modalVisible: false,
            switchOn1: false,
            switchOn2: false,
            switchOn3: false,
        }

    }

    onPress1 = () => {
        this.setState({ switchOn1: !this.state.switchOn1 });
    }
    onPress2 = () => {
        this.setState({ switchOn2: !this.state.switchOn2 });
    }
    onPress3 = () => {
        this.setState({ switchOn3: !this.state.switchOn3 });
    }
    toggleModal(visible) {
        this.setState({ modalVisible: visible });
    }
    render() {
        const Custom_checkBox = (color, flag) => {
            return <CheckBox

                checked={flag}
                checkedIcon='check'

                uncheckedIcon='close'
                checkedColor='white'//green
                uncheckedColor={color}
                size={25}
                iconType='antdesign'
                onPress={() => { flag = !flag }}

                containerStyle={{ backgroundColor: color, width: 30, height: 30, borderRadius: 30, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 0, shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.2, shadowRadius: 1.41, elevation: 10, }}

            />
        }
        // const uri = "https://facebook.github.io/react-native/docs/assets/favicon.png";
        const uri = <Icon name="location" size={40} color="#900" />;
        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.welcome}>Account Settings</Text>
                <Ionicon name="ios-menu" size={35} color={'#32cd32'} onPress={() => this.props.navigation.openDrawer()} style={styles.menu} />
                <Image source={{ uri: 'https://randomuser.me/api/portraits/men/85.jpg' }} style={styles.menu1} />



                <ScrollView style={styles.container1}>
                    <View style={styles.bodyContainer}>

                        <View style={{ padding: 5, marginBottom: 5, backgroundColor: 'white', width: '100%', height: '25%', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.2, shadowRadius: 1.41, elevation: 3, borderRadius: 5 }}>

                            <View style={{ backgroundColor: 'white', height: '33%', flexDirection: 'row', }}>

                                <View style={{ paddingHorizontal: 5, width: '30%', height: '100%', justifyContent: 'center', }}>
                                    <Text style={{ fontSize: responsiveFontSize(2), color: '#000000', }}>
                                        Username
                                </Text>
                                </View>

                                <TextInput placeholder='Salomon24' style={{ fontSize: 12, marginTop: 10, padding: 5, justifyContent: 'center', backgroundColor: 'white', width: '65%', height: '65%', shadowColor: 'black', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.2, shadowRadius: 1.41, elevation: 5, borderRadius: 10 }}>

                                </TextInput>

                            </View>
                            <View style={{ backgroundColor: 'white', height: '33%', flexDirection: 'row', }}>

                                <View style={{ paddingHorizontal: 5, width: '30%', height: '100%', justifyContent: 'center', }}>
                                    <Text style={{ fontSize: responsiveFontSize(2), color: '#000000', }}>
                                        Display Name
                                </Text>
                                </View>

                                <TextInput placeholder='Aurellen Salomon' style={{ fontSize: 12, marginTop: 10, padding: 5, justifyContent: 'center', backgroundColor: 'white', width: '65%', height: '65%', shadowColor: 'black', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.2, shadowRadius: 1.41, elevation: 5, borderRadius: 10 }}>

                                </TextInput>

                            </View>
                            <View style={{ backgroundColor: 'white', height: '33%', flexDirection: 'row', }}>

                                <View style={{ paddingHorizontal: 5, width: '30%', height: '100%', justifyContent: 'center', }}>
                                    <Text style={{ fontSize: responsiveFontSize(2), color: '#000000', }}>
                                        Password
                                </Text>
                                </View>


                                <TextInput placeholder='********' secureTextEntry={true} style={{ fontSize: 12, marginTop: 10, padding: 5, justifyContent: 'center', backgroundColor: 'white', width: '65%', height: '65%', shadowColor: 'black', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.2, shadowRadius: 1.41, elevation: 5, borderRadius: 10 }}>

                                </TextInput>

                            </View>
                        </View>
                        <View style={{ padding: 5, backgroundColor: "white", width: '100%', height: responsiveHeight(15), borderRadius: 10 }}>

                            <View style={{ backgroundColor: 'white', width: '100%', height: '50%', flexDirection: 'row', shadowColor: 'green', justifyContent: 'space-evenly' }}>

                                <View style={{ marginHorizontal: 0, backgroundColor: 'white', width: '35%', height: '90%', justifyContent: 'center' }}>
                                    <Text style={{ fontSize: responsiveFontSize(1.8), color: '#000000', }}>
                                        Background Color
                                </Text>
                                </View>
                                <View style={{ backgroundColor: 'white', width: '59%', height: '90%', flexDirection: 'row', justifyContent: 'space-evenly', top: 0 }}>



                                    <CheckBox

                                        checked={this.state.flag1}
                                        checkedIcon='check'

                                        uncheckedIcon='close'
                                        checkedColor='white'//green
                                        uncheckedColor='#87ea7e'
                                        size={25}
                                        iconType='antdesign'
                                        onPress={() => { this.setState({ flag1: !this.state.flag1 }) }}

                                        containerStyle={{ backgroundColor: '#87ea7e', width: 30, height: 30, borderRadius: 30, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 0, shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.2, shadowRadius: 1.41, elevation: 10, }}

                                    />
                                    <CheckBox

                                        checked={this.state.flag2}
                                        checkedIcon='check'

                                        uncheckedIcon='close'
                                        checkedColor='white'//green
                                        uncheckedColor='#000'
                                        size={25}
                                        iconType='antdesign'
                                        onPress={() => { this.setState({ flag2: !this.state.flag2 }) }}

                                        containerStyle={{ backgroundColor: '#000', width: 30, height: 30, borderRadius: 30, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 0, shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.2, shadowRadius: 1.41, elevation: 10, }}

                                    />

                                    <CheckBox

                                        checked={this.state.flag3}
                                        checkedIcon='check'

                                        uncheckedIcon='close'
                                        checkedColor='white'//green
                                        uncheckedColor='#ff00ea'
                                        size={25}
                                        iconType='antdesign'
                                        onPress={() => { this.setState({ flag3: !this.state.flag3 }) }}

                                        containerStyle={{ backgroundColor: '#ff00ea', width: 30, height: 30, borderRadius: 30, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 0, shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.2, shadowRadius: 1.41, elevation: 10, }}

                                    />
                                    <CheckBox

                                        checked={this.state.flag4}
                                        checkedIcon='check'

                                        uncheckedIcon='close'
                                        checkedColor='white'//green
                                        uncheckedColor='#24851b'
                                        size={25}
                                        iconType='antdesign'
                                        onPress={() => { this.setState({ flag4: !this.state.flag4 }) }}

                                        containerStyle={{ backgroundColor: '#24851b', width: 30, height: 30, borderRadius: 30, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 0, shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.2, shadowRadius: 1.41, elevation: 10, }}

                                    />

                                    <CheckBox

                                        checked={this.state.flag5}
                                        checkedIcon='check'

                                        uncheckedIcon='close'
                                        checkedColor='white'//green
                                        uncheckedColor='#0c6bf0'
                                        size={25}
                                        iconType='antdesign'
                                        onPress={() => { this.setState({ flag5: !this.state.flag5 }) }}

                                        containerStyle={{ backgroundColor: '#0c6bf0', width: 30, height: 30, borderRadius: 30, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 0, shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.2, shadowRadius: 1.41, elevation: 10, }}

                                    />
                                    <CheckBox

                                        checked={this.state.flag6}
                                        checkedIcon='check'

                                        uncheckedIcon='close'
                                        checkedColor='white'//green
                                        uncheckedColor='#ff0000'
                                        size={25}
                                        iconType='antdesign'
                                        onPress={() => { this.setState({ flag6: !this.state.flag6 }) }}

                                        containerStyle={{ backgroundColor: '#ff0000', width: 30, height: 30, borderRadius: 30, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 0, shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.2, shadowRadius: 1.41, elevation: 10, }}

                                    />

                                </View>

                            </View>

                            <View style={{ backgroundColor: "white", width: '100%', height: '50%', flexDirection: 'row' }}>

                                <View style={{ marginHorizontal: 0, justifyContent: 'center', alignItems: 'flex-end', backgroundColor: 'white', width: '35%', height: '80%', }}>
                                    <Text style={{ fontSize: responsiveFontSize(2.2), color: '#000000', }}>
                                        Font
                            </Text>
                                </View>
                                <View style={{ marginHorizontal: 10, top: 0, height: '80%', backgroundColor: 'white', width: '60%', justifyContent: 'center', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.2, shadowRadius: 1.41, elevation: 5, borderRadius: 5 }}>
                                    <Picker

                                        style={{ width: '100%', height: '100%', color: '#000000', fontSize: 12 }}

                                    >
                                        <Picker.Item label="Arial" value="Arial" />
                                        <Picker.Item label="Bold" value="Bold" />
                                        <Picker.Item label="Italic" value="Italic" />
                                        <Picker.Item label="Oblique" value="Oblique" />
                                    </Picker>
                                </View>

                            </View>

                        </View>
                        <View style={{ backgroundColor: 'white', top: 0, height: responsiveHeight(6), width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={{ marginHorizontal: 8, fontSize: responsiveFontSize(1.8), color: '#000000', }}>
                                {'Daily Affirmation Push Notification'}
                            </Text>
                            <SwitchToggle
                                containerStyle={{
                                    marginTop: 5,
                                    width: 40,
                                    height: 25,
                                    borderRadius: 30,
                                    padding: 1,
                                    marginRight: 10,

                                }}
                                backgroundColorOn='#32cd32'
                                backgroundColorOff='#d3d4d3'
                                circleStyle={{
                                    width: 25,
                                    height: 25,
                                    borderRadius: 27.5,
                                    backgroundColor: '#d6d3d3', // rgb(102,134,205)
                                }}
                                switchOn={this.state.switchOn1}
                                onPress={this.onPress1}
                                circleColorOff='#e5e1e0'
                                circleColorOn='#e5e1e0'
                                duration={500}
                            />

                        </View>
                        <View style={{ backgroundColor: 'white', top: 0, height: responsiveHeight(6), width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={{ marginHorizontal: 8, fontSize: responsiveFontSize(1.8), color: '#000000', }}>
                                {'Daily Healthy Self Notification'}
                            </Text>
                            <SwitchToggle
                                containerStyle={{
                                    marginTop: 5,
                                    width: 40,
                                    height: 25,
                                    borderRadius: 30,
                                    padding: 1,
                                    marginRight: 10,

                                }}
                                backgroundColorOn='#32cd32'
                                backgroundColorOff='#d3d4d3'
                                circleStyle={{
                                    width: 25,
                                    height: 25,
                                    borderRadius: 27.5,
                                    backgroundColor: '#d6d3d3', // rgb(102,134,205)
                                }}
                                switchOn={this.state.switchOn2}
                                onPress={this.onPress2}
                                circleColorOff='#e5e1e0'
                                circleColorOn='#e5e1e0'
                                duration={500}
                            />

                        </View>
                        <View style={{ backgroundColor: 'white', top: 0, height: responsiveHeight(6), width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={{ marginHorizontal: 8, fontSize: responsiveFontSize(1.8), color: '#000000', }}>
                                {'Daily Kindness To Others Notification'}
                            </Text>
                            <SwitchToggle
                                containerStyle={{
                                    marginTop: 5,
                                    width: 40,
                                    height: 25,
                                    borderRadius: 30,
                                    padding: 1,
                                    marginRight: 10,

                                }}
                                backgroundColorOn='#32cd32'
                                backgroundColorOff='#d3d4d3'
                                circleStyle={{
                                    width: 25,
                                    height: 25,
                                    borderRadius: 27.5,
                                    backgroundColor: '#d6d3d3', // rgb(102,134,205)
                                }}
                                switchOn={this.state.switchOn3}
                                onPress={this.onPress3}
                                circleColorOff='#e5e1e0'
                                circleColorOn='#e5e1e0'
                                duration={500}
                            />

                        </View>



                        <TouchableOpacity style={{ marginTop: 5, backgroundColor: "white", width: '100%', height: '8%', justifyContent: 'center', alignItems: 'center', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.2, shadowRadius: 1.41, elevation: 4, borderRadius: 10 }}>
                            <TouchableOpacity>
                                <Text style={{ fontSize: responsiveFontSize(2.2), color: '#000000', }}>
                                    Help & Support
                            </Text>

                            </TouchableOpacity>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ marginTop: 5, paddingHorizontal: 20, backgroundColor: "white", width: '100%', height: '8%', borderRadius: 5, flexDirection: 'row', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.2, shadowRadius: 1.41, elevation: 1, borderRadius: 5 }}>

                            <View style={{ backgroundColor: 'white', width: '80%', height: '100%', justifyContent: 'center' }}>
                                <Text style={{ fontSize: responsiveFontSize(2.2), color: '#000000', }}>
                                    Licences
                            </Text>

                            </View>
                            <View style={{ backgroundColor: 'white', width: '20%', height: '100%', alignItems: 'flex-end', justifyContent: 'center' }}>
                                <EIcon name="chevron-right" size={25} color="#000000" />

                            </View>
                        </TouchableOpacity>

                        <View style={{ marginTop: 2, paddingHorizontal: 20, backgroundColor: "white", width: '100%', height: '15%', borderRadius: 5, shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.2, shadowRadius: 1.41, elevation: 2, borderRadius: 5 }}>

                            <TouchableOpacity style={{ flexDirection: 'row', width: '100%', height: '50%' }}>

                                <View style={{ backgroundColor: 'white', width: '80%', height: '100%', justifyContent: 'center' }}>
                                    <Text style={{ fontSize: responsiveFontSize(2.2), color: '#000000', }}>
                                        Privacy  Policy
                          </Text>

                                </View>
                                <View style={{ backgroundColor: 'white', width: '20%', height: '100%', alignItems: 'flex-end', justifyContent: 'center' }}>
                                    <EIcon name="chevron-right" size={25} color="#000000" />

                                </View>

                            </TouchableOpacity>
                            <TouchableOpacity style={{ flexDirection: 'row', width: '100%', height: '50%' }}>

                                <View style={{ backgroundColor: 'white', width: '80%', height: '100%', justifyContent: 'center' }}>
                                    <Text style={{ fontSize: responsiveFontSize(2.2), color: '#000000', }}>
                                        Terms of Services
                          </Text>

                                </View>
                                <View style={{ backgroundColor: 'white', width: '20%', height: '100%', alignItems: 'flex-end', justifyContent: 'center' }}>
                                    <EIcon name="chevron-right" size={25} color="#000000" />

                                </View>

                            </TouchableOpacity>
                        </View>
                        <Text style={{ fontSize: responsiveFontSize(2), color: '#000000', alignSelf: 'center', marginTop: 10 }}>
                            Version 1.0.0.1
                          </Text>

                    </View>
                    <TouchableOpacity style={{ marginTop: 1, marginBottom: 5, backgroundColor: "white", width: '100%', height: responsiveHeight(6), justifyContent: 'center', alignItems: 'center', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.2, shadowRadius: 1.41, elevation: 2, borderRadius: 10 }}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                            <Text style={{ fontSize: responsiveFontSize(2), color: '#ff0000', }}>
                                Log Out
                            </Text>

                        </TouchableOpacity>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ marginBottom: 5, backgroundColor: "white", width: '100%', height: responsiveHeight(6), justifyContent: 'center', alignItems: 'center', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.2, shadowRadius: 1.41, elevation: 2, borderRadius: 10 }} onPress={() => this.toggleModal(true)}>
                        <TouchableOpacity>
                            <Text style={{ fontSize: responsiveFontSize(2), color: '#ff0000', }}>
                                Delete Account
                            </Text>

                        </TouchableOpacity>
                    </TouchableOpacity>



                </ScrollView>



                <Modal animationType={"slide"} transparent={false} transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => { console.log("Modal has been closed.") }}

                >

                    <View style={styles.modal}>
                        <View style={{ height: '30%', width: '100%', justifyContent: 'center' }}>
                            <Text style={{ fontSize: responsiveFontSize(2.5), color: 'white' }}>
                                Confrim?
                   </Text>
                        </View>
                        <View style={{ height: '20%', width: '100%', justifyContent: 'center' }}>
                            <Text style={{ fontSize: responsiveFontSize(2), color: 'white' }}>
                                Are you sure to update your setting?
                   </Text>
                        </View>
                        <View style={{ padding: 5, height: '40%', width: '100%', justifyContent: 'flex-end', flexDirection: 'row', alignItems: 'center' }}>

                            <TouchableHighlight onPress={() => {
                                this.toggleModal(!this.state.modalVisible)
                            }} style={{ marginEnd: 10, backgroundColor: 'white', height: 50, width: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 30 }}>
                                <AIcon name="close" size={25} color='#0d4d28' style={{}} />
                            </TouchableHighlight>
                            <TouchableHighlight style={{ backgroundColor: 'white', height: 50, width: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 30 }}>
                                <AIcon name="check" size={25} color='#0d4d28' style={{}} />
                            </TouchableHighlight>

                        </View>



                    </View>
                </Modal>


            </SafeAreaView>
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
        height: responsiveHeight(100),
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
        marginTop: responsiveHeight(1.2),
        marginLeft: '85%',
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
