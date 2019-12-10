import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  SafeAreaView,
} from 'react-native';
import {_retrieveData} from '../../Backend/AsyncStore/AsyncFunc';
import {getData, addToArray} from '../../Backend/Utility';
import firebase from 'firebase';

export default class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          id: 3,
          image: 'https://bootdey.com/img/Content/avatar/avatar7.png',
          name: 'March SoulLaComa',
          text:
            'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.',
          attachment: 'https://lorempixel.com/100/100/nature/6/',
        },
        {
          id: 2,
          image: 'https://bootdey.com/img/Content/avatar/avatar6.png',
          name: 'John DoeLink',
          text: "Have requested to join group 'Cricket Match on 24-12-2019' ",
          attachment: 'https://lorempixel.com/100/100/nature/5/',
        },
        {
          id: 4,
          image: 'https://bootdey.com/img/Content/avatar/avatar2.png',
          name: 'Finn DoRemiFaso',
          text: 'Wants to be your friend',
          attachment: '',
        },
        {
          id: 5,
          image: 'https://bootdey.com/img/Content/avatar/avatar3.png',
          name: 'Maria More More',
          text:
            'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.',
          attachment: '',
        },
        {
          id: 1,
          image: 'https://bootdey.com/img/Content/avatar/avatar1.png',
          name: 'Frank Odalthh',
          text:
            'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.',
          attachment: 'https://lorempixel.com/100/100/nature/4/',
        },
        {
          id: 6,
          image: 'https://bootdey.com/img/Content/avatar/avatar4.png',
          name: 'Clark June Boom!',
          text:
            'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.',
          attachment: '',
        },
        {
          id: 7,
          image: 'https://bootdey.com/img/Content/avatar/avatar5.png',
          name: 'The googler',
          text:
            'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.',
          attachment: '',
        },
      ],
      friend_request: null,
    };
  }

  componentDidMount = async () => {
    await _retrieveData('user').then(async result =>
      firebase
        .firestore()
        .collection('friendRequest')
        .onSnapshot(
          async () =>
            await getData('friendRequest', result).then(data =>
              data.request.map(item => {
                this.setState({
                  friend_request: item,
                });
              }),
            ),
        ),
    );
  };

  friends = async item => {
    _retrieveData('user').then(async result => {
      await getData('users', result).then(
        async check =>
          await addToArray('friends', item.userId, 'request', {
            userId: result,
            name: check.name,
            profile_pic: check.profile_picture,
          }).then(async () => {
            await addToArray('friends', result, 'request', {
              userId: item.userId,
              name: item.name,
              profile_pic: item.profile_pic,
            });
          }),
      );
    });
  };

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          <TouchableOpacity>
            <Image
              source={{
                uri: 'https://bootdey.com/img/Content/avatar/avatar4.png',
              }}
              style={styles.avatar}
            />
          </TouchableOpacity>
          <View style={styles.content}>
            <View style={styles.mainContent}>
              <TouchableOpacity style={styles.text}>
                <Text style={styles.name}>
                  {this.state.friend_request && this.state.friend_request.name}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.text}
                onPress={() => {
                  this.state.friend_request &&
                    this.friends(this.state.friend_request);
                }}>
                <Text>{'Accept'}</Text>
              </TouchableOpacity>
              <Text style={styles.timeAgo}>2 hours ago</Text>
            </View>
          </View>
        </View>

        <FlatList
          style={styles.root}
          data={this.state.data}
          extraData={this.state}
          ItemSeparatorComponent={() => {
            return <View style={styles.separator} />;
          }}
          keyExtractor={item => {
            return item.id;
          }}
          renderItem={item => {
            const Notification = item.item;
            let attachment = <View />;

            let mainContentStyle;
            if (Notification.attachment) {
              mainContentStyle = styles.mainContent;
              attachment = (
                <Image
                  style={styles.attachment}
                  source={{uri: Notification.attachment}}
                />
              );
            }
            return (
              <View style={styles.container}>
                <TouchableOpacity>
                  <Image
                    source={{uri: Notification.image}}
                    style={styles.avatar}
                  />
                </TouchableOpacity>
                <View style={styles.content}>
                  <View style={mainContentStyle}>
                    <TouchableOpacity style={styles.text}>
                      <Text style={styles.name}>{Notification.name}</Text>
                    </TouchableOpacity>
                    <View style={styles.text}>
                      <Text>{Notification.text}</Text>
                    </View>
                    <Text style={styles.timeAgo}>2 hours ago</Text>
                  </View>
                  {attachment}
                </View>
              </View>
            );
          }}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#FFFFFF',
  },
  container: {
    padding: 16,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#FFFFFF',
    alignItems: 'flex-start',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  text: {
    marginBottom: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  content: {
    flex: 1,
    marginLeft: 16,
    marginRight: 0,
  },
  mainContent: {
    marginRight: 60,
  },
  img: {
    height: 50,
    width: 50,
    margin: 0,
  },
  attachment: {
    position: 'absolute',
    right: 0,
    height: 50,
    width: 50,
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
  },
  timeAgo: {
    fontSize: 12,
    color: '#696969',
  },
  name: {
    fontSize: 16,
    color: '#1E90FF',
  },
});
