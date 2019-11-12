import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import firebase from 'firebase';
import {GiftedChat} from 'react-native-gifted-chat';
import {_retrieveData} from '../../Backend/AsyncStore/AsyncFunc';
import {addToArray, getData} from '../../Backend/Utility';

export default class Chat extends Component {
  constructor(props) {
    super(props);
    // Create and Reset initial State Longitude (lng) and Latitude (lat)
    this.state = {
      data: null,
      friendID: this.props.navigation.state.params.id,
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
    // console.log(this.state.friendID);
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
  }

  render() {
    // console.log("receiver",this.state.friendID);
    // console.log("sender",this.state.current_user);
    return (
      <GiftedChat
        messages={this.state.messages}
        isAnimated={true}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: 1,
        }}
      />
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
