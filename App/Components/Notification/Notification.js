import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Alert,
    ScrollView,
    FlatList,
} from 'react-native';
import { Left } from 'native-base';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
import Ionicon from 'react-native-vector-icons/Ionicons';

//Notification Screen
const uri = "https://facebook.github.io/react-native/docs/assets/favicon.png";
export default class Notifications extends Component {

    constructor(props) {
        super(props);
        this.state = {
            calls: [
                { id: 1, name: "Mark Doe", status: "Sana Francisco", image: "https://bootdey.com/img/Content/avatar/avatar7.png" },
                { id: 2, name: "Clark Man", status: "Sana Francisco", image: "https://bootdey.com/img/Content/avatar/avatar6.png" },
                { id: 3, name: "Jaden Boor", status: "Sana Francisco", image: "https://bootdey.com/img/Content/avatar/avatar5.png" },
                { id: 4, name: "Srick Tree", status: "Sana Francisco", image: "https://bootdey.com/img/Content/avatar/avatar4.png" },
                { id: 5, name: "Erick Doe", status: "Sana Francisco", image: "https://bootdey.com/img/Content/avatar/avatar3.png" },
                { id: 6, name: "Erick Doe", status: "Sana Francisco", image: "https://bootdey.com/img/Content/avatar/avatar4.png" },
                { id: 7, name: "Erick Doe", status: "Sana Francisco", image: "https://bootdey.com/img/Content/avatar/avatar6.png" },


            ]
        };
    }

    renderItem = ({ item }) => {
        return (

            <View style={styles.row}>

                <View style={styles.imageContainer}>
                    <Image source={{ uri: item.image }} style={styles.pic} />
                </View>

                <View style={styles.nameContainer}>
                    <Text style={styles.nameTxt} numberOfLines={1} ellipsizeMode="tail">
                        Mark Doe
                    </Text>
                    <Text style={styles.posttxt}>
                        post an event
                    </Text>
                </View>
                <View style={styles.hoursContainer}>
                    <Text style={styles.msgTxt}>
                        1h ago
                        </Text>
                </View>

            </View>
        );
    }

    render() {

        return (
            <View style={{ flex: 1 ,backgroundColor: '#F5F5F5'}} >
              <View style={{marginBottom:10}}>
                <Text style={styles.welcome}>Notifications</Text>
        <Ionicon name="ios-menu" size={35} color={'#32cd32'} onPress={() => this.props.navigation.openDrawer()} style={styles.menu} />
        <Image source ={{uri:'https://randomuser.me/api/portraits/men/85.jpg'}} style={styles.menu1}/>
               </View>

                <FlatList
                    extraData={this.state}
                    data={this.state.calls}
                    keyExtractor={(item) => {
                        return item.id;
                    }}
                    renderItem={this.renderItem} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        backgroundColor: 'white',
        height: responsiveHeight(15),
        marginTop: 1, width: responsiveWidth(100),
        // shadowOffset: { width: 0, height: 1 }, 
        // shadowOpacity: 0.2, 
        // shadowRadius: 1.41, 
        // elevation: 1, 
        paddingBottom:2,
    },
    imageContainer: {
        width: '20%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    hoursContainer: {
        height: '100%',
        width: '20%',
        justifyContent: 'center',
        // borderBottomWidth:.3
    },
    pic: {
        borderRadius: 10,
        width: '70%',
        height: '60%',
    },
    nameContainer: {
        width: '60%',
        justifyContent: 'center',
        paddingHorizontal: 10,
        // borderBottomWidth: 1,
        // borderBottomWidth:.2

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
        color: '#9aa69f',
        fontSize: responsiveFontSize(1.9),
        // marginLeft: 15,
        fontWeight: '900',
        // alignSelf:'flex-end',
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
      fontSize: responsiveFontSize(3.8),
      fontWeight:'bold',
      textAlign: 'center',
      margin:7,
    },
}); 