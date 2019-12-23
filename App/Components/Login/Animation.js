
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image } from 'react-native';
import FastImage from 'react-native-fast-image'
import img from '../../Assets/animation.gif';
import { _retrieveData } from '../../Backend/AsyncStore/AsyncFunc';
import { connectFirebase } from '../../Backend/Connection/FirebaseConnection';


export default class Animation extends Component {
    static navigationOptions = {
        header: null,
    };
    componentDidMount = async () => {
        await _retrieveData('user').then(user =>
            this.setState({
                value: user,
            }),
        );

        connectFirebase();
        if (Platform.OS === 'android') {
            SplashScreen.close({
                animationType: SplashScreen.animationType.scale,
                duration: 850,
                delay: 500,
            });
        }


        setTimeout(() => {
            if (this.state.value == '' || this.state.value == undefined) {
                this.props.navigation.navigate('MainAuth');
            } else {
                this.props.navigation.navigate('App');
            }
        }, 7000);
    }

    render() {
        return (
            <View style={styles.container}>

                <Image source={img} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
