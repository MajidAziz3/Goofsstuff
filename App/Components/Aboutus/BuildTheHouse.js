
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import Entypo from 'react-native-vector-icons/Entypo';
import FA from 'react-native-vector-icons/FontAwesome'

export default class BuildTheHouse extends Component {
    render() {
        return (
            <View style={styles.container}>

<FA name="chevron-left" size={20} color={'#32cd32'} onPress={() => this.props.navigation.goBack()} style={styles.menu} />

                <View style={{ backgroundColor: 'white', height: responsiveHeight(15), width: responsiveWidth(100), alignSelf: 'center', justifyContent: 'space-around' }}>
                    <View style={styles.imageContainer}>
                        <Image source={require('../../Assets/goodstuff.png')} style={styles.imageStyle} />
                    </View>
                </View>
                <View style={{ backgroundColor: 'white', height: responsiveHeight(5), width: responsiveWidth(70), alignSelf: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: responsiveFontSize(2.5), fontWeight: 'bold', alignSelf: 'center', color: '#000' }}>
                        Build The House…
                </Text>
                </View>
                <View style={{ backgroundColor: 'white',flexWrap:'wrap',flexDirection:'row', padding:5, height: responsiveHeight(28), width: responsiveWidth(100),  }}>
                    <Text style={{textAlign:'center',flex:1, fontSize: responsiveFontSize(1.8),  color: '#000',textAlignVertical:'center' }}>
                    One night, after putting our children to bed, we sat on the couch and without even realizing, got on our phones and started scrolling. Every couple of minutes we would mention what we saw on social media or a news media, and most of it was crazy, bad or sad. We finally looked at each other and said “Is this the world we want our children to be raised in?”. In a world where we are inundated with the bad, wouldn’t it be nice to just see some good stuff? The next day while we were watching a message from Pastor Howard John Wesley, he said “ Social media is a tool like a hammer. It can be used to destroy or it can be used to build a house.” 
                </Text>
                </View>
                <View style={{ backgroundColor: 'white', height: responsiveHeight(5), width: responsiveWidth(70), alignSelf: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: responsiveFontSize(2.5), fontWeight: 'bold', alignSelf: 'center', color: '#000', }}>
                    We decided to build the house
                </Text>
                </View>
                <View style={{ backgroundColor: 'red', height: responsiveHeight(20), width: responsiveWidth(50), alignSelf: 'center',  }}>
                <Image source={require('../../Assets/watch.jpg')} style={styles.imageStyle} />
                </View>
                <View style={{ backgroundColor: 'white',padding:5, height: responsiveHeight(19), width: responsiveWidth(100), alignSelf: 'center',  }}>
                <Text style={{flex:1, fontSize: responsiveFontSize(2.4), color: 'rgb(53, 203, 53)',fontWeight:'bold',textAlign:'center' }}>
                We encourage you too to use the tools you have to build. Build your community, build the strength of your family, build yourself. Do all this while focusing on…. The good stuff. 

                    </Text>
                </View>
                


            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#fff',
    },
    menu: {

        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginTop: responsiveHeight(1.8),
        marginLeft: '4%',
       
    
      },
    imageContainer: {
        height: '85%', width: '90%',
        backgroundColor: 'white',
        alignSelf: 'center',

    },
    imageStyle: {
        height: '100%',
        width: "100%"
    },

});
