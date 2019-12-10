import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Alert,
    ScrollView,
    FlatList, TextInput,
    SafeAreaView,
    TouchableHighlight,
    Modal,
    ActivityIndicator
} from 'react-native';
import { Left } from 'native-base';
import Icon from 'react-native-vector-icons/EvilIcons';
import EIcon from 'react-native-vector-icons/Entypo';
import FIcon from 'react-native-vector-icons/FontAwesome5';
import { SearchBar } from 'react-native-elements';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
import Ionicon from 'react-native-vector-icons/Ionicons';
import { getAllOfCollection } from '../../Backend/Utility';
import SearchInput, { createFilter } from 'react-native-search-filter';
import AIcon from 'react-native-vector-icons/AntDesign';



//frineds Screen
const uri = "https://randomuser.me/api/portraits/men/27.jpg";
const KEYS_TO_FILTERS = ['name'];
export default class FriendsList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: true,
            searchTerm: '',
            modalVisible: false,
            loading: true
        };
    }

    componentDidMount = async () => {
        await getAllOfCollection('users').then(result => {
            console.log('data', result);
            this.setState({ data: result, loading: false });
        });
    };

    toggleModal(visible) {
        this.setState({ modalVisible: visible });
    }

    searchUpdated(term) {
        this.setState({ searchTerm: term })
    }

    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "82%",
                    backgroundColor: "#CED0CE",
                    marginLeft: "18%"
                }}
            />
        );
    };

    renderItem = ({ item }) => {
        console.log("Daataaaa:", item)
        return (


            <View style={styles.box}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('FriendsProfile', { id: item.userId, name: item.name })}>
                    <Image style={styles.image} source={item.profile_picture == null ? { uri: 'https://static-s.aa-cdn.net/img/ios/981028611/e05febed124ce8b8178b07e4f857ea6f?v=1' } : { uri: item.profile_picture }} />
                </TouchableOpacity>
                <View style={styles.boxContent}>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('FriendsProfile', { id: item.userId, name: item.name })}>
                            <Text style={styles.title}>{item.name}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.button]} onPress={() => this.props.navigation.navigate('Chat', { id: item.userId, name: item.name })}>
                            <Ionicon name="ios-chatboxes" size={28} color={'#32cd32'} style={styles.menu} />
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.button]} onPress={() => this.toggleModal(true)}>
                            <Ionicon name="md-person-add" size={28} color={'#32cd32'} style={styles.menu} />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.description}>{item.bio}</Text>
                </View>
            </View>
        );
    }

    render() {

        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#F5F5F5' }} >
                <View style={{ marginBottom: 10 }}>
                    <Text style={styles.welcome}> Friends</Text>
                    <Ionicon name="ios-menu" size={35} color={'#32cd32'} onPress={() => this.props.navigation.openDrawer()} style={styles.menu} />
                    <Image source={{ uri: 'https://randomuser.me/api/portraits/men/85.jpg' }} style={styles.menu1} />
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
                        onChangeText={(term) => { this.searchUpdated(term) }}
                        style={styles.searchInput}
                        placeholder="Type a message to search"
                        clearIcon={this.state.searchTerm !== '' && <EIcon name="cross" size={30} color={'#32cd32'} />}
                        clearIconViewStyles={{ position: 'absolute', top: 4, right: 22 }}
                    />

                    {/* <SearchBar
                        placeholder="Type something..."
                        onChangeText={this.updateSearch}
                        // value={search}
                        round
                        lightTheme

                        leftIconContainerStyle={{ backgroundColor: '#3fee4a', borderRadius: 20, height: 30, left: -12 }}

                        inputContainerStyle={{ backgroundColor: 'white', width: '90%', paddingLeft: 5 }} searchIcon={<TouchableOpacity><Icon name="search" size={30} color='white' style={{ marginLeft: 0 }} /></TouchableOpacity>}
                        containerStyle={{ backgroundColor: '#F5F5F5', width: '100%', padding: 5, paddingLeft: 50, }}
                    /> */}

                </View>



                {this.state.searchTerm == '' ? (
                    this.state.loading ? (
                        <ActivityIndicator
                            size={'large'}
                            color="#32cd32"
                            style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}
                        />
                    ) : (
                            <FlatList
                                data={this.state.data}
                                ItemSeparatorComponent={this.renderSeparator}
                                keyExtractor={(item) => {
                                    return item.id;
                                }}
                                renderItem={this.renderItem} />
                        )

                ) : (
                        this.state.loading ? (
                            <ActivityIndicator
                                size={'large'}
                                color="#32cd32"
                                style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}
                            />
                        ) : (
                                <ScrollView>
                                    {this.state.data.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS)).map(item => {
                                        return (
                                            <View style={styles.box}>
                                                <TouchableOpacity onPress={() => this.props.navigation.navigate('FriendsProfile', { id: item.userId, name: item.name })}>
                                                    <Image style={styles.image} source={item.profile_picture == null ? { uri: 'https://static-s.aa-cdn.net/img/ios/981028611/e05febed124ce8b8178b07e4f857ea6f?v=1' } : { uri: item.profile_picture }} />
                                                </TouchableOpacity>
                                                <View style={styles.boxContent}>
                                                    <View style={{ flexDirection: 'row' }}>
                                                        <TouchableOpacity onPress={() => this.props.navigation.navigate('FriendsProfile', { id: item.userId, name: item.name })}>
                                                            <Text style={styles.title}>{item.name}</Text>
                                                        </TouchableOpacity>

                                                        <TouchableOpacity style={[styles.button]} onPress={() => this.props.navigation.navigate('Chat', { id: item.userId, name: item.name })}>
                                                            <Ionicon name="ios-chatboxes" size={28} color={'#32cd32'} style={styles.menu} />
                                                        </TouchableOpacity>

                                                        <TouchableOpacity style={[styles.button]} onPress={() => this.toggleModal(true)}>
                                                            <Ionicon name="md-person-add" size={28} color={'#32cd32'} style={styles.menu} />
                                                        </TouchableOpacity>
                                                    </View>
                                                    <Text style={styles.description}>{item.bio}</Text>
                                                </View>
                                            </View>

                                        )
                                    })}
                                </ScrollView>
                            )

                    )}



                <Modal animationType={"slide"} transparent={false} transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => { console.log("Modal has been closed.") }}

                >

                    <View style={styles.modal}>
                        <View style={{ height: '50%', width: '100%', justifyContent: 'center' }}>
                            <Text style={{ fontSize: responsiveFontSize(2), color: 'white' }}>
                                Friend Request Sent!
                   </Text>
                        </View>
                        <View style={{ padding: 5, height: '40%', width: '100%', justifyContent: 'flex-end', flexDirection: 'row', alignItems: 'center' }}>

                            <TouchableHighlight onPress={() => {
                                this.toggleModal(!this.state.modalVisible)
                            }} style={{ marginEnd: 10, backgroundColor: 'white', height: 50, width: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 30 }}>
                                <AIcon name="close" size={25} color='#0d4d28' style={{}} />
                            </TouchableHighlight>

                        </View>



                    </View>
                </Modal>

            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    searchInput: {
        padding: 10,
        borderColor: '#CCC',
        borderWidth: 1,
        width: '100%',
        backgroundColor: 'white',
        width: responsiveWidth(80),
        color: 'black'
    },
    emailItem: {
        borderBottomWidth: 0.5,
        borderColor: 'rgba(0,0,0,0.3)',
        padding: 10
    },
    row: {
        flexDirection: 'row',
        backgroundColor: 'white',
        height: responsiveHeight(12),
        // marginTop: 1,
        width: responsiveWidth(100),

        // paddingBottom:2,

    },
    seacrhbarContainter: {
        backgroundColor: '#F5F5F5',
        height: responsiveHeight(8),
        width: responsiveWidth(100),
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',

    },

    imageContainer: {
        width: '20%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    hoursContainer: {
        height: '50%',
        width: '20%',
        justifyContent: 'center',
    },
    pic: {
        borderRadius: responsiveHeight(8),
        width: responsiveHeight(8),
        height: responsiveHeight(8),

    },
    nameContainer: {
        width: '80%',
        justifyContent: 'center',
        paddingHorizontal: 10,
        // backgroundColor:'red',
        // shadowOffset: { width: 0, height: 1 },
        // shadowOpacity: 0.2,
        // shadowRadius: 1.41,
        // elevation: 1,
        borderBottomWidth: .1
    },
    nameTxt: {
        // marginLeft: 15,
        fontWeight: '600',
        color: '#222',
        fontSize: responsiveFontSize(2.4),
        width: 170,
    },

    msgContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    msgTxt: {
        fontWeight: '400',
        color: '#727171',
        fontSize: responsiveFontSize(1.7),
        // marginLeft: 15,
        fontWeight: '900',
        // alignSelf:'flex-end',
    },
    posttxt: {
        fontWeight: '400',
        color: '#3529b4',
        fontSize: responsiveFontSize(1.7),
        // marginLeft: 15,
        fontWeight: '900',

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
        position: 'absolute'

    },
    modal: {
        //  margin:5,
        top: responsiveHeight(40),
        width: responsiveWidth(90),
        height: responsiveHeight(15),
        borderRadius: 15,
        padding: 10,
        paddingHorizontal: 20,
        alignSelf: 'center',

        backgroundColor: '#32cd32',
        // padding: 100
    },
    menu1: {
        width: 10, height: 50, borderRadius: 42,
        marginTop: responsiveHeight(1.2),
        marginLeft: '85%',
        position: 'absolute'
    },
    image: {
        width: 100,
        height: 100,
    },
    box: {
        padding: 20,
        marginTop: 5,
        marginBottom: 5,
        backgroundColor: 'white',
        flexDirection: 'row',
    },
    boxContent: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginLeft: 10,
        marginTop: 20
    },
    title: {
        fontSize: 18,
        color: "#151515",

    },
    description: {
        fontSize: 15,
        color: "#646464",
    },
    buttons: {
        flexDirection: 'row',
    },
    button: {
        height: 35,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        borderRadius: 10,
        width: 50,
        marginRight: 15,
        marginTop: 5,
    },
    icon: {
        width: 20,
        height: 20,
    },
    view: {
        backgroundColor: "#FF1493",
    },
    profile: {
        backgroundColor: "#32cd32",
    },
    message: {
        backgroundColor: "#32cd32",
    },
}); 