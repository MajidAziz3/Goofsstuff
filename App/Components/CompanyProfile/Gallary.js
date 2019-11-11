import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Alert,
    ScrollView,
    FlatList, TextInput, BackHandler, RecyclerViewBackedScrollView
} from 'react-native';
import { Left, Thumbnail } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ETIcon from 'react-native-vector-icons/Entypo';
import EIcon from 'react-native-vector-icons/EvilIcons';
import AIcon from 'react-native-vector-icons/AntDesign';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
import Ionicon from 'react-native-vector-icons/Ionicons';
import ImageView from 'react-native-image-view';
///Company Profile  5th Screen
const uri = "https://facebook.github.io/react-native/docs/assets/favicon.png";
class Gallary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            datasource: [1, 2, 3, 1, 2, 3],
            datasource2: [1, 2,]
        }
    }
    render() {
        return (

            <View style={styles.container}>
                <View style={{marginBottom:10}}>
              <Text style={styles.welcome}>Company Profile</Text>
        <Ionicon name="ios-menu" size={35} color={'#32cd32'} onPress={() => this.props.navigation.openDrawer()} style={styles.menu} />
        <Image source ={{uri:'https://randomuser.me/api/portraits/men/85.jpg'}} style={styles.menu1}/>
        </View>
        <ScrollView>
                <View style={{ backgroundColor: 'white', height: responsiveHeight(40), width: responsiveWidth(100) }}>
                    <Image source={require('../../Assets/watch.jpg')} style={{ width: '100%', height: '100%', borderRadius: 0 }} />
                </View>

                <View style={{ backgroundColor: 'white', height: responsiveHeight(30), width: responsiveWidth(100), borderRadius: 20, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.5, shadowRadius: 2, elevation: 1, }}>

                    <View style={{ alignSelf: 'center',top:15,backgroundColor: 'white' ,justifyContent: 'center', alignItems: 'flex-start', width: '90%', height: '25%', }}>
                        <Text style={{ fontSize: responsiveFontSize(3), color: '#404040' }}>
                           ABC Company
                        </Text>
                    </View>

                    <View style={{ paddingHorizontal:5,alignSelf: 'center', top:5,backgroundColor: 'white', justifyContent: 'flex-start', alignItems: 'flex-start', width: '90%', height: '15%', }}>
                        <Text style={{ fontSize: responsiveFontSize(2), color: '#7e7474' }}>
                            Aurellien's Family
                        </Text>
                    </View>
                    <View style={{ alignSelf: 'center', top:1,backgroundColor: 'white', justifyContent: 'flex-start', alignItems: 'flex-start', width: '90%', height: '15%',flexDirection:'row' }}>
                        <View style={{paddingHorizontal:5, backgroundColor:'white',width:'60%',height:'100%'}}>
                        <Text style={{ fontSize: responsiveFontSize(1.8), color: '#7e7474' }}>
                           9:00 AM-5:00 PM
                        </Text>
                            </View>
                            <View style={{backgroundColor:'white',width:'40%',height:'100%',flexDirection:'row',justifyContent:'flex-end',alignItems:'center',}}>
                            <View style={{flexDirection:'row',height:'100%',width:'80%',alignItems:'center',justifyContent:'space-evenly'}}>
                            <ETIcon name="star" size={25} color='#40d240' style={{ }} />
                            <ETIcon name="star" size={25} color='#40d240' style={{ }} />
                            <ETIcon name="star" size={25} color='#40d240' style={{}} />
                            <ETIcon name="star" size={25} color='#40d240' style={{  }} />
                            <ETIcon name="star" size={25} color='#bdc3bd' style={{ }} />
                            </View>
                            </View>
                    </View>


                   

                    <View style={{ padding:5,alignSelf: 'center',top:5, backgroundColor: 'white', width: '90%', height: '30%' }}>
                   <Text numberOfLines={3} style={{ fontSize: responsiveFontSize(1.8), color: '#7e7474' }}>
                   SimpleText is the native text editor for the Apple classic Mac OS. SimpleText allows editing including text formatting, fonts, and sizes. It was developed to integrate the features included in the different versions of TeachText that were created by various software development groups within Appl
                        </Text>
                        </View> 




                </View> 
                </ScrollView>
            </View>


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
        fontWeight:'bold',
        textAlign: 'center',
        margin:7,
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



});
export default Gallary;