import React, { Component, Fragment } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  FlatList, TextInput, BackHandler, RecyclerViewBackedScrollView, SafeAreaView
} from 'react-native';
import { Left, Thumbnail } from 'native-base';
import ImageView from 'react-native-image-view';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import EIcon from 'react-native-vector-icons/EvilIcons';
import FIcon from 'react-native-vector-icons/FontAwesome';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
import { getData, uploadImage, uploadUserImage } from '../../Backend/Utility';
import { _retrieveData } from '../../Backend/AsyncStore/AsyncFunc';

///ProfileScreen 2 5th Screen
import Ionicon from 'react-native-vector-icons/Ionicons';
const images = [
  {
    source: {
      uri: 'https://picsum.photos/id/1060/536/354?blur=2'
    },
    title: 'Paris',
    width: 806,
    height: 720,
  },
];
const uri = "https://randomuser.me/api/portraits/men/36.jpg";
const imageList = [{
  src: 'https://scontent.cdninstagram.com/vp/3fc240dca41408d36cc23f504fe1174e/5C66EC32/t51.2885-15/e35/s320x320/43817886_246662336018913_6991265436514516630_n.jpg',
  width: 320,
  height: 320
}, {
  src: 'https://scontent.cdninstagram.com/vp/f1d729fe57fa4ddc7c18fa346609cdb8/5C838862/t51.2885-15/e35/s320x320/44348158_2491449144206376_3633417851169311676_n.jpg',
  width: 320,
  height: 167
}, {
  src: 'https://scontent.cdninstagram.com/vp/b0f56148b7f7d06ff186a51853888b2f/5C84ACC0/t51.2885-15/e35/s320x320/44724241_2191160064490130_1438494317224719529_n.jpg',
  width: 320,
  height: 240
}, {
  src: 'https://scontent.cdninstagram.com/vp/dcda7878c4a828f0c850b73dc5c6587d/5C728976/t51.2885-15/e35/p320x320/43158355_534503580355624_1875160473904621159_n.jpg',
  width: 320,
  height: 400
}
];
class MoreVisionBoard extends Component {
  static navigationOptions = {
    header: null,
  }
  constructor(props) {
    super(props);
    this.state = {

      datasource: [1, 2, 3, 1, 2, 3],
      datasource2: [1, 2,],
      
      VisionBoard: [],
      userId: '',
      data_user: [],
      displayIMG: false,
      showImage: null,
      imageFooter: null,
    }
  }

  componentDidMount = async () => {

    await _retrieveData('user').then(async result => {
      await getData('users', result).then(res =>
        this.setState({
          data_user: res,
          userId: res.userId,
          loading: false,
        }),
      );
    });
    this.getVisionBoardData();
  };

  getVisionBoardData = async () => {
    await getData('VisionBoard', this.state.userId).then(res =>
      this.setState({
        VisionBoard: res,
      }),
    );
    console.log("Vision Board", this.state.VisionBoard)

  }
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ marginBottom: 2 }}>
          <Text style={styles.welcome}>Vision Board</Text>
          <FIcon name="chevron-left" size={25} color={'#32cd32'} onPress={() => this.props.navigation.goBack()} style={styles.menu} />
          <Image source={{ uri: 'https://randomuser.me/api/portraits/men/85.jpg' }} style={styles.menu1} />
        </View>
        <ScrollView style={styles.container}>

          <View>

            <FlatList
              data={this.state.VisionBoard.vision}
              keyExtractor={item => item.id}
              renderItem={({ item, index }) => (
                <View
                  style={{
                    paddingVertical: 5,
                    flexDirection: 'row',
                    backgroundColor: 'white',
                    flexWrap: 'wrap',
                    justifyContent: 'space-evenly',
                  }}>
                  {this.state.showImage &&
                    <ImageView
                      images={[
                        {
                          source: {
                            uri: this.state.showImage
                          },

                          width: 1200,
                          height: 800,
                        },
                      ]}

                      isVisible={this.state.displayIMG}
                      isSwipeCloseEnabled={false}
                      onClose={() => {
                        this.setState({ displayIMG: false }, () => {
                          this.setState({ showImage: null }, () => {
                            this.setState({ itemFooter: null })
                          })
                        });
                      }}
                     />}
                  <TouchableOpacity
                    style={{
                      height: responsiveHeight(30),
                      width: responsiveHeight(40),
                    }}
                    onPress={() => {
                      this.setState({ displayIMG: true }, () => {
                        this.setState({ showImage: item }, () => {
                          this.setState({ imageFooter: item.description })
                        })
                      });
                    }}>
                    <Image
                      source={{
                        uri: item,
                      }}
                      style={{ height: '100%', width: '100%' }}
                    />
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>


        </ScrollView>


      </SafeAreaView>


    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    width: responsiveWidth(100),
    height: responsiveHeight(100),
    marginBottom: 10

  },
  profileContainer: {
    width: responsiveWidth(100),
    height: responsiveHeight(22),
    backgroundColor: 'white',



  },
  menu: {

    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: responsiveHeight(2.4),
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
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 7,
  },



});

export default MoreVisionBoard;