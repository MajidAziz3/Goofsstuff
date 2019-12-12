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
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import Ionicon from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Foundation from 'react-native-vector-icons/Foundation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  Container,
  Header,
  Content,
  Tab,
  Tabs,
  TabHeading,
  ScrollableTab,
  Badge,
} from 'native-base';

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
      page: 0,
    };
  }

  componentDidMount = async () => {
    await _retrieveData('user').then(
      async result =>
        await firebase
          .firestore()
          .collection('friendRequest')
          .onSnapshot(
            async () =>
              await getData('friendRequest', result).then(data => {
                this.setState({
                  friend_request: data.request,
                });
              }),
          ),
    );
  };

  friends = async itm => {
    console.log('ddtttddttt', itm);
    let data1 = await this.state.friend_request;
    this.setState({friend_request: []});
    console.log('Before Delete 2', data1);
    let data2 = data1.filter(item => item.userId !== itm.item.userId);

    await this.setState({friend_request: data2});

    await _retrieveData('user').then(async result => {
      await firebase
        .firestore()
        .collection('friendRequest')
        .doc(result)
        .update({request: this.state.friend_request});
      await getData('users', result).then(
        async check =>
          await addToArray('friends', itm.userId, 'request', {
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
        <View style={{marginBottom: responsiveHeight(1.5)}}>
          <Text style={styles.welcome1}>Notifications</Text>
          <Ionicon
            name="ios-menu"
            size={35}
            color={'#32cd32'}
            onPress={() => this.props.navigation.openDrawer()}
            style={styles.menu}
          />
          <Image
            source={{uri: 'https://randomuser.me/api/portraits/men/85.jpg'}}
            style={styles.menu1}
          />
        </View>
        <Container>
          <Tabs
            initialPage={0}
            onChangeTab={({i}) => this.setState({page: i})}
            renderTabBar={() => (
              <ScrollableTab style={{backgroundColor: '#fff'}} />
            )}>
            <Tab
              tabStyle={{backgroundColor: '#fff'}}
              activeTabStyle={{
                borderBottomColor: '#32cd32',
                borderBottomWidth: 8,
              }}
              heading={
                <TabHeading
                  style={
                    this.state.page === 0
                      ? styles.activeTabStyle
                      : styles.tabStyle
                  }>
                  <EvilIcons name="user" size={45} />
                </TabHeading>
              }>
              <FlatList
                style={styles.root}
                data={this.state.friend_request}
                keyExtractor={item => {
                  return item.id;
                }}
                renderItem={item => {
                  return (
                    <View style={styles.container}>
                      <TouchableOpacity>
                        <Image
                          source={{
                            uri: item.item.profile_pic,
                          }}
                          style={styles.avatar}
                        />
                      </TouchableOpacity>
                      <View style={styles.content}>
                        <View style={styles.mainContent}>
                          <TouchableOpacity style={styles.text}>
                            <Text style={styles.name}>{item.item.name}</Text>
                          </TouchableOpacity>
                          <View style={{flexDirection: 'row'}}>
                            <TouchableOpacity
                              style={styles.text2}
                              onPress={() => {
                                this.state.friend_request && this.friends(item);
                              }}>
                              <Text
                                style={{
                                  textAlign: 'center',
                                  color: 'white',
                                  alignSelf: 'center',
                                  marginTop: 15,
                                }}>
                                Accept
                              </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              style={styles.text3}
                              onPress={() => {
                                item && this.friends(item);
                              }}>
                              <Text
                                style={{
                                  textAlign: 'center',
                                  color: 'white',
                                  alignSelf: 'center',
                                  marginTop: 15,
                                }}>
                                Reject
                              </Text>
                            </TouchableOpacity>
                          </View>
                          <Text style={styles.timeAgo}>2 hours ago</Text>
                        </View>
                      </View>
                    </View>
                  );
                }}
              />
            </Tab>
            <Tab
              tabStyle={{backgroundColor: 'white'}}
              activeTabStyle={{backgroundColor: 'white'}}
              heading={
                <TabHeading
                  style={
                    this.state.page === 1
                      ? styles.activeTabStyle
                      : styles.tabStyle
                  }>
                  <FontAwesome name="users" size={40} />
                </TabHeading>
              }>
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

                  return (
                    <View style={styles.container}>
                      <TouchableOpacity>
                        <Image
                          source={{uri: Notification.image}}
                          style={styles.avatar}
                        />
                      </TouchableOpacity>
                      <View style={styles.content}>
                        <View style={styles.mainContent}>
                          <TouchableOpacity style={styles.text}>
                            <Text style={styles.name}>{Notification.name}</Text>
                          </TouchableOpacity>
                          <View style={styles.text}>
                            <Text>{Notification.text}</Text>
                          </View>
                          <Text style={styles.timeAgo}>2 hours ago</Text>
                        </View>
                      </View>
                    </View>
                  );
                }}
              />
            </Tab>
            <Tab
              tabStyle={{backgroundColor: '#fff'}}
              activeTabStyle={{backgroundColor: '#fff'}}
              heading={
                <TabHeading
                  style={
                    this.state.page === 2
                      ? styles.activeTabStyle
                      : styles.tabStyle
                  }>
                  <Foundation name="torsos-male-female" size={30} />
                </TabHeading>
              }
            />
            <Tab
              tabStyle={{backgroundColor: '#fff'}}
              activeTabStyle={{backgroundColor: '#fff'}}
              heading={
                <TabHeading
                  style={
                    this.state.page === 3
                      ? styles.activeTabStyle
                      : styles.tabStyle
                  }>
                  <MaterialIcons name="event" size={35} />
                </TabHeading>
              }>
              <Text>Events</Text>
            </Tab>
          </Tabs>
        </Container>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#FFFFFF',
  },
  welcome1: {
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
    position: 'absolute',
  },
  menu1: {
    width: 10,
    height: 50,
    borderRadius: 42,
    marginTop: responsiveHeight(1.2),
    marginLeft: '85%',
    position: 'absolute',
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
  text2: {
    marginBottom: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#32cd32',
    elevation: 5,
    width: '40%',
    height: 38,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text3: {
    left: 20,
    marginBottom: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: 'red',
    elevation: 5,
    width: '40%',
    height: 38,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
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
    color: '#32cd32',
  },
  tabStyle: {backgroundColor: 'transparent'},
  activeTabStyle: {backgroundColor: '#32cd32'},
});
