import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ActivityIndicator,
} from 'react-native';
import firebase from 'firebase';
import {GiftedChat} from 'react-native-gifted-chat';
import {_retrieveData} from '../../Backend/AsyncStore/AsyncFunc';
import {addToArray, getData} from '../../Backend/Utility';
import FA from 'react-native-vector-icons/FontAwesome';
import AIcon from 'react-native-vector-icons/AntDesign';
import EIcon from 'react-native-vector-icons/Entypo';
import FIcon from 'react-native-vector-icons/FontAwesome5';
import MTIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {SearchBar} from 'react-native-elements';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

export default class Chat extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    // Create and Reset initial State Longitude (lng) and Latitude (lat)
    this.state = {
      data: null,
      friendID: this.props.navigation.state.params.id,
      friendName: this.props.navigation.state.params.name,
      current_user: '',
      messages: [],
    };
  }
  componentDidMount = async () => {
    await _retrieveData('user').then(result =>
      this.setState({current_user: result}),
    );
  };

  componentWillMount() {
    this.getMessages();
  }

  async getMessages() {
    let messages = await getData(
      'chats',
      this.state.current_user,
      this.state.friendID,
    );
    if (messages) await this.setState({messages: messages});
    else return 0;
    let that = this;

    firebase
      .firestore()
      .collection('chats')
      .doc(this.state.current_user)
      .onSnapshot(function(doc) {
        that.setState({messages: doc.data()[this.state.friendID].reverse()});
      });
  }
  async onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
    messages[0].createdAt = Date.parse(messages[0].createdAt);
    await addToArray(
      'chats',
      this.state.current_user,
      this.state.friendID,
      messages[0],
    );
    messages[0].user._id = 2;
    await addToArray(
      'chats',
      this.state.friendID,
      this.state.current_user,
      messages[0],
    );
    messages[0].user._id = 1;

    await addToArray(
      'users',
      this.state.current_user,
      'chatted',
      this.state.friendID,
    );
    await addToArray(
      'users',
      this.state.friendID,
      'chatted',
      this.state.current_user,
    );
  }

  render() {
    console.log('this', this.state.current_user,this.state.friendID);
    return (
      <SafeAreaView style={{flex: 1}}>
        <Text style={styles.welcome}>{this.state.friendName}</Text>
        <FA
          name="chevron-left"
          size={26}
          color={'#32cd32'}
          onPress={() => this.props.navigation.goBack()}
          style={styles.menu}
        />
        <Image
          source={{uri: 'https://randomuser.me/api/portraits/men/85.jpg'}}
          style={styles.menu1}
        />
        <GiftedChat
          messages={this.state.messages}
          isAnimated={true}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: 1,
          }}
        />
      </SafeAreaView>
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
    fontSize: responsiveFontSize(3.8),
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 7,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  menu1: {
    width: 10,
    height: 50,
    borderRadius: 42,
    marginTop: responsiveHeight(1.2),
    marginLeft: '85%',
    position: 'absolute',
  },
  menu: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: responsiveHeight(2.6),
    marginLeft: '4%',
    position: 'absolute',
  },
});
