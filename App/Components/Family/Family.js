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
  SafeAreaView
} from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
//family Screen
import FA from 'react-native-vector-icons/FontAwesome';
import { _retrieveData } from '../../Backend/AsyncStore/AsyncFunc';
import { getData} from '../../Backend/Utility';

export default class Family extends Component {
  static navigationOptions = {
    header: null,
  }

  constructor(props) {
    super(props);
    this.state = {
      calls: [
        { id: 1, name: "Mark Doe", status: "Sana Francisco", image: "https://bootdey.com/img/Content/avatar/avatar7.png" },
        { id: 2, name: "Clark Man", status: "Sana Francisco", image: "https://bootdey.com/img/Content/avatar/avatar6.png" },
        { id: 3, name: "Jaden Boor", status: "Sana Francisco", image: "https://bootdey.com/img/Content/avatar/avatar5.png" },
        { id: 4, name: "Srick Tree", status: "Sana Francisco", image: "https://bootdey.com/img/Content/avatar/avatar4.png" },
        { id: 5, name: "Erick Doe", status: "Sana Francisco", image: "https://bootdey.com/img/Content/avatar/avatar3.png" },

      ],
      data_user: null,
      imgUrl: '',
    };
  }

  componentDidMount (){
    this.userData();
  }

  userData = async () => {
    await _retrieveData('user').then(async result => {
      console.log('uuuuuuuuu', result);
      let res = await getData('users', result);
      this.setState({
        data_user: res,
        imgUrl: res.profile_picture,
      });
    });

  };

  

  renderItem = ({ item }) => {
    return (
      <TouchableOpacity>
        <View style={styles.row}>

          <Image source={{ uri: item.image }} style={styles.pic} />

          <View style={{}}>

            <View style={styles.nameContainer}>
              <Text style={styles.nameTxt} numberOfLines={1} ellipsizeMode="tail">{item.name}</Text>
              <Text style={styles.mblTxt}>Mobile</Text>
            </View>

            <View style={styles.msgContainer}>
              <Text style={styles.msgTxt}>{item.status}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#F5F5F5', }} >
        <View style={{ marginBottom: responsiveHeight(1.5) }}>
          <Text style={styles.welcome}>My Family</Text>
          <FA name="chevron-left" size={26} color={'#32cd32'} onPress={() => this.props.navigation.goBack()} style={styles.menu} />
          
           <Image source={{ uri: this.state.imgUrl}} style={styles.menu1} /> 
           
        </View>
        <FlatList
          extraData={this.state}
          data={this.state.calls}
          keyExtractor={(item) => {
            return item.id;
          }}
          renderItem={this.renderItem} />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#DCDCDC',
    backgroundColor: 'white',

    marginBottom: 1,

    padding: 10,
  },
  pic: {
    borderRadius: 30,
    width: 60,
    height: 60,
  },
  nameContainer: {
    flexDirection: 'row',

    justifyContent: 'space-between',
    width: 280,
    // borderBottomWidth: 1,
  },
  nameTxt: {
    marginLeft: 15,
    fontWeight: '600',
    color: '#222',
    fontSize: responsiveFontSize(2.4),
    width: 170,
  },
  mblTxt: {
    fontWeight: '200',
    color: '#777',
    fontSize: responsiveFontSize(1.6),
    left: 40,




  },
  msgContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  msgTxt: {
    fontWeight: '400',
    color: '#727171',
    fontSize: responsiveFontSize(2),
    marginLeft: 15,
    fontWeight: '900',
    alignSelf: 'flex-end',
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
    marginTop: responsiveHeight(2.6),
    marginLeft: '4%',
    position: 'absolute'

  },
  menu1: {
    width: 10,
    height: 50,
    borderRadius: 42,
    marginTop: responsiveHeight(1.8),
    marginLeft: '85%',
    position: 'absolute',
  },
}); 