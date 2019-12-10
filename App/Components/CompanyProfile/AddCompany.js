import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  TextInput,
  FlatList,
  Picker,
  TouchableOpacity,
  ScrollView,
  Modal,
  TouchableHighlight,
  SafeAreaView,
} from 'react-native';
import {Thumbnail, Button} from 'native-base';
import Icon from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EIcon from 'react-native-vector-icons/Entypo';
import FIcon from 'react-native-vector-icons/FontAwesome5';
import AIcon from 'react-native-vector-icons/AntDesign';
import {CheckBox} from 'react-native-elements';

import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {placeholder} from '@babel/types';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {Company_Profile} from '../../Backend/Create/Company_profile';
import {_retrieveData} from '../../Backend/AsyncStore/AsyncFunc';
import {getData, uploadImage} from '../../Backend/Utility';

import ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';

export default class AddCompany extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      datasource: [1, 2],
      flag1: false,
      flag2: false,
      flag3: false,
      flag4: false,
      flag5: false,
      flag6: false,
      modalVisible: false,
      company_name: '',
      location: '',
      opening: '',
      closing_time: '',
      days: '',
      Descriptions: '',
      admins: [],
      members: [],
      address: '',
      phone: '',
      rating: [],
      photo: null,
      imageType: null,
      ImageName: null,
      ImageUrl: null,
    };
  }
  toggleModal(visible) {
    this.setState({modalVisible: visible});
  }

  handleChoosePhoto = () => {
    var options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, response => {
      let source = response;
      //let source = { uri: 'data:image/jpeg;base64,' + response.data };
      this.setState(
        {
          photo: source.uri,
          imageType: source.type,
        },
        async () => {
          await ImageResizer.createResizedImage(
            this.state.photo,
            Dimensions.get('window').width,
            Dimensions.get('window').height / 3,
            'JPEG',
            50,
          ).then(resizedImage => {
            this.setState({
              ImageName: resizedImage.name,
              ImageUrl: resizedImage.uri,
            });
          });
        },
      );
    });
  };

  async Upload_Image() {
    let iteratorNum = 0;
    await _retrieveData('user').then(async item => {
      console.log('refffffffff', item);
      await uploadImage(
        this.state.ImageUrl,
        this.state.imageType,
        this.state.ImageName,
        this.state.ImageName,
        'Company_Profile',
        item,
      );
    });
    let that = this;

    let refreshId = setInterval(function() {
      iteratorNum += 1;
      _retrieveData('imageUploadProgress').then(data => {
        that.setState({uploadProgress: data});
        if (Number(data) >= 100) {
          clearInterval(refreshId);
          alert('Uploaded', 'Profile is updated', [
            {text: 'OK', onPress: () => that.props.navigation.goBack()},
          ]);
        }
        if (data == '-1') {
          clearInterval(refreshId);
          alert('goes wrong', 'Something went wrong', [
            {text: 'OK', onPress: () => that.props.navigation.goBack()},
          ]);
        }
        if (iteratorNum == 120) {
          clearInterval(refreshId);
          alert(
            'To Long TIme',
            'Picture uploading taking too long. Please upload a low resolution picture',
            [{text: 'OK', onPress: () => that.props.navigation.goBack()}],
          );
        }
      });
    }, 1000);
  }

  render() {
    // const uri = "https://facebook.github.io/react-native/docs/assets/favicon.png";
    const uri = <Icon name="location" size={40} color="#900" />;

    const {
      company_name,
      location,
      opening,
      closing_time,
      days,
      Descriptions,
      admins,
      members,
      phone,
      rating,
    } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.welcome}>Add Company</Text>
        <FIcon
          name="chevron-left"
          size={25}
          color={'#32cd32'}
          onPress={() => this.props.navigation.goBack()}
          style={styles.menu}
        />

        <ScrollView style={styles.container1}>
          <View style={styles.bodyContainer}>
            <View
              style={{
                padding: 5,
                marginBottom: 5,
                backgroundColor: 'white',
                width: '100%',
                height: responsiveHeight(40),
                shadowOffset: {width: 0, height: 1},
                shadowOpacity: 0.2,
                shadowRadius: 1.41,
                elevation: 3,
                borderRadius: 5,
              }}>
              <View
                style={{
                  backgroundColor: 'white',
                  height: '12.5%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    paddingHorizontal: 5,
                    width: '40%',
                    height: '100%',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: responsiveFontSize(1.8),
                      color: '#000000',
                    }}>
                    Company Name
                  </Text>
                </View>

                <TextInput
                  value={company_name}
                  onChangeText={company_name => this.setState({company_name})}
                  placeholder="Company Name"
                  style={{
                    fontSize: 12,
                    marginTop: 3,
                    padding: 5,
                    justifyContent: 'center',
                    backgroundColor: 'white',
                    width: '60%',
                    height: '80%',
                    shadowColor: 'black',
                    shadowOffset: {width: 0, height: 1},
                    shadowOpacity: 0.2,
                    shadowRadius: 1.41,
                    elevation: 5,
                    borderRadius: 10,
                  }}
                />
              </View>

              <View
                style={{
                  backgroundColor: 'white',
                  height: '12.5%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    paddingHorizontal: 5,
                    width: '40%',
                    height: '100%',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: responsiveFontSize(1.8),
                      color: '#000000',
                    }}>
                    Location
                  </Text>
                </View>

                <TextInput
                  value={location}
                  onChangeText={location => this.setState({location})}
                  placeholder="Location"
                  style={{
                    fontSize: 12,
                    marginTop: 3,
                    padding: 5,
                    justifyContent: 'center',
                    backgroundColor: 'white',
                    width: '60%',
                    height: '80%',
                    shadowColor: 'black',
                    shadowOffset: {width: 0, height: 1},
                    shadowOpacity: 0.2,
                    shadowRadius: 1.41,
                    elevation: 5,
                    borderRadius: 10,
                  }}
                />
              </View>

              <View
                style={{
                  backgroundColor: 'white',
                  height: '12.5%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    paddingHorizontal: 5,
                    width: '40%',
                    height: '100%',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: responsiveFontSize(1.8),
                      color: '#000000',
                    }}>
                    Phone Number
                  </Text>
                </View>

                <TextInput
                  value={phone}
                  onChangeText={phone => this.setState({phone})}
                  placeholder="+92xxxxxxxxxxxx"
                  style={{
                    fontSize: 12,
                    marginTop: 3,
                    padding: 5,
                    justifyContent: 'center',
                    backgroundColor: 'white',
                    width: '60%',
                    height: '80%',
                    shadowColor: 'black',
                    shadowOffset: {width: 0, height: 1},
                    shadowOpacity: 0.2,
                    shadowRadius: 1.41,
                    elevation: 5,
                    borderRadius: 10,
                  }}
                />
              </View>

              <View
                style={{
                  backgroundColor: 'white',
                  height: '12.5%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    paddingHorizontal: 5,
                    width: '40%',
                    height: '100%',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: responsiveFontSize(1.8),
                      color: '#000000',
                    }}>
                    Opening Hours
                  </Text>
                </View>

                <TextInput
                  value={opening}
                  onChangeText={opening => this.setState({opening})}
                  placeholder="9:00 Am"
                  style={{
                    fontSize: 12,
                    marginTop: 3,
                    padding: 5,
                    justifyContent: 'center',
                    backgroundColor: 'white',
                    width: '60%',
                    height: '80%',
                    shadowColor: 'black',
                    shadowOffset: {width: 0, height: 1},
                    shadowOpacity: 0.2,
                    shadowRadius: 1.41,
                    elevation: 5,
                    borderRadius: 10,
                  }}
                />
              </View>
              <View
                style={{
                  backgroundColor: 'white',
                  height: '12.5%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    paddingHorizontal: 5,
                    width: '40%',
                    height: '100%',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: responsiveFontSize(1.8),
                      color: '#000000',
                    }}>
                    Closing Hours
                  </Text>
                </View>

                <TextInput
                  value={closing_time}
                  onChangeText={closing_time => this.setState({closing_time})}
                  placeholder="5:00 Pm"
                  style={{
                    fontSize: 12,
                    marginTop: 3,
                    padding: 5,
                    justifyContent: 'center',
                    backgroundColor: 'white',
                    width: '60%',
                    height: '80%',
                    shadowColor: 'black',
                    shadowOffset: {width: 0, height: 1},
                    shadowOpacity: 0.2,
                    shadowRadius: 1.41,
                    elevation: 5,
                    borderRadius: 10,
                  }}
                />
              </View>

              <View
                style={{
                  backgroundColor: 'white',
                  height: '12.5%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    paddingHorizontal: 5,
                    width: '40%',
                    height: '100%',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: responsiveFontSize(1.8),
                      color: '#000000',
                    }}>
                    Day
                  </Text>
                </View>

                <TextInput
                  value={days}
                  onChangeText={days => this.setState({days})}
                  placeholder="Mon-Fri"
                  style={{
                    fontSize: 12,
                    marginTop: 3,
                    padding: 5,
                    justifyContent: 'center',
                    backgroundColor: 'white',
                    width: '60%',
                    height: '80%',
                    shadowColor: 'black',
                    shadowOffset: {width: 0, height: 1},
                    shadowOpacity: 0.2,
                    shadowRadius: 1.41,
                    elevation: 5,
                    borderRadius: 10,
                  }}
                />
              </View>

              <View
                style={{
                  backgroundColor: 'white',
                  height: '25%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    paddingHorizontal: 5,
                    width: '40%',
                    height: '100%',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: responsiveFontSize(1.8),
                      color: '#000000',
                    }}>
                    Description
                  </Text>
                </View>

                <TextInput
                  value={Descriptions}
                  onChangeText={Descriptions => this.setState({Descriptions})}
                  placeholder="Some Sample text "
                  multiline={true}
                  style={{
                    textAlignVertical: 'top',
                    fontSize: 12,
                    marginTop: 3,
                    padding: 5,
                    justifyContent: 'center',
                    backgroundColor: 'white',
                    width: '60%',
                    height: '90%',
                    shadowColor: 'black',
                    shadowOffset: {width: 0, height: 1},
                    shadowOpacity: 0.2,
                    shadowRadius: 1.41,
                    elevation: 5,
                    borderRadius: 10,
                  }}
                />
              </View>
            </View>

            <View
              style={{
                marginTop: 5,
                height: responsiveHeight(10),
                flexDirection: 'row',
                shadowOffset: {width: 0, height: 1},
                shadowOpacity: 0.2,
                shadowRadius: 1.41,
                elevation: 5,
                backgroundColor: 'white',
                borderRadius: 10,
              }}>
              <View
                style={{
                  backgroundColor: 'white',
                  width: '80%',
                  height: '100%',
                  justifyContent: 'center',
                  borderRadius: 10,
                }}>
                <Text style={{left: 20, fontSize: 14, color: '#7e7a7a'}}>
                  Upload Company Image
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: 'white',
                  flexDirection: 'row',
                  width: '20%',
                  height: '100%',
                  alignItems: 'center',
                  borderRadius: 10,
                  // marginLeft:20,
                }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: 'white',
                    width: '26%',
                    height: '30%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 10,
                    marginLeft: 25,
                  }}
                  onPress={() => this.handleChoosePhoto()}>
                  <EIcon name="camera" size={20} color="#7e7a7a" />
                </TouchableOpacity>
              </View>
            </View>

            <View
              style={{
                backgroundColor: 'white',
                height: responsiveHeight(45),
                marginTop: 5,
                shadowOffset: {width: 0, height: 1},
                shadowOpacity: 0.2,
                shadowRadius: 1.41,
                elevation: 5,
                borderRadius: 10,
              }}>
              <View
                style={{
                  backgroundColor: 'white',
                  height: '20%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    fontSize: responsiveFontSize(2.6),
                    color: '#000',
                    alignSelf: 'center',
                  }}>
                  Company Admins
                </Text>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('AddUserlist')}
                  style={{left: responsiveWidth(15)}}>
                  <FIcon name="plus" size={20} color="#60ce28" />
                </TouchableOpacity>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: 'white',
                  height: '25%',
                  width: responsiveWidth(100),
                }}>
                <View
                  style={{
                    width: '20%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={{
                      uri: 'https://randomuser.me/api/portraits/men/85.jpg',
                    }}
                    style={{
                      borderRadius: responsiveHeight(8),
                      width: responsiveHeight(8),
                      height: responsiveHeight(8),
                    }}
                  />
                </View>

                <View
                  style={{
                    width: '80%',
                    justifyContent: 'center',
                    paddingHorizontal: 10,
                    borderBottomWidth: 0.1,
                  }}>
                  <Text
                    style={{
                      fontWeight: '600',
                      color: '#222',
                      fontSize: responsiveFontSize(2.4),
                      width: 170,
                    }}
                    numberOfLines={1}>
                    Mark Doe
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: 'white',
                  height: '25%',
                  width: responsiveWidth(100),
                }}>
                <View
                  style={{
                    width: '20%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={{
                      uri: 'https://randomuser.me/api/portraits/men/85.jpg',
                    }}
                    style={{
                      borderRadius: responsiveHeight(8),
                      width: responsiveHeight(8),
                      height: responsiveHeight(8),
                    }}
                  />
                </View>

                <View
                  style={{
                    width: '80%',
                    justifyContent: 'center',
                    paddingHorizontal: 10,
                    borderBottomWidth: 0.1,
                  }}>
                  <Text
                    style={{
                      fontWeight: '600',
                      color: '#222',
                      fontSize: responsiveFontSize(2.4),
                      width: 170,
                    }}
                    numberOfLines={1}>
                    Mark Doe
                  </Text>
                </View>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: 'white',
                  height: '25%',
                  width: responsiveWidth(100),
                }}>
                <View
                  style={{
                    width: '20%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={{
                      uri: 'https://randomuser.me/api/portraits/men/85.jpg',
                    }}
                    style={{
                      borderRadius: responsiveHeight(8),
                      width: responsiveHeight(8),
                      height: responsiveHeight(8),
                    }}
                  />
                </View>

                <View
                  style={{
                    width: '80%',
                    justifyContent: 'center',
                    paddingHorizontal: 10,
                    borderBottomWidth: 0.1,
                  }}>
                  <Text
                    style={{
                      fontWeight: '600',
                      color: '#222',
                      fontSize: responsiveFontSize(2.4),
                      width: 170,
                    }}
                    numberOfLines={1}>
                    Mark Doe
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View
            style={{
              marginTop: 0,
              backgroundColor: 'white',
              width: '100%',
              height: responsiveHeight(7),
              justifyContent: 'center',
              alignItems: 'center',
              shadowOffset: {width: 0, height: 1},
              shadowOpacity: 0.2,
              shadowRadius: 1.41,
              elevation: 2,
              borderRadius: 10,
            }}>
            <TouchableOpacity
              onPress={() => {
                _retrieveData('user').then(result =>
                  getData('users', result).then(user => {
                    let data = admins;
                    data.push(result);
                    this.setState({admins: result, members: result});
                    Company_Profile(
                      company_name,
                      location,
                      opening,
                      closing_time,
                      days,
                      Descriptions,
                      admins,
                      members,
                      phone,
                      rating,
                      user.email,
                    ).then(() => {
                      setTimeout(async () => {
                        await this.Upload_Image();
                      }, 3000);
                    });
                  }),
                );
              }}>
              <Text style={{fontSize: responsiveFontSize(2), color: '#ff0000'}}>
                Create Company
              </Text>
            </TouchableOpacity>
          </View>

          {/* <View style={{ marginTop: 5, backgroundColor: "white", width: '100%', height: responsiveHeight(10), justifyContent: 'center', alignItems: 'center', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.2, shadowRadius: 1.41, elevation: 2, borderRadius: 10 }} >
                        <TouchableOpacity>
                            <Text style={{ fontSize: responsiveFontSize(2), color: '#ff0000', }}>
                                Add New Company
                            </Text>

                        </TouchableOpacity>
                    </View> */}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  container1: {
    marginTop: 10,

    paddingLeft: 2,
    paddingRight: 2,
  },

  menu: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: responsiveHeight(1.8),
    marginLeft: '4%',
    position: 'absolute',
  },
  menu1: {
    width: 10,
    height: 50,
    borderRadius: 42,
    marginTop: responsiveHeight(2.8),
    marginLeft: '90%',
    position: 'absolute',
  },
  welcome: {
    fontSize: responsiveFontSize(3.6),
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 7,
  },
  bodyContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    height: responsiveHeight(100),
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    marginBottom: 5,
    width: responsiveWidth(100),
  },
  modal: {
    //  margin:5,
    top: responsiveHeight(30),
    width: responsiveWidth(90),
    height: responsiveHeight(25),
    borderRadius: 15,
    padding: 10,
    paddingHorizontal: 20,
    alignSelf: 'center',

    backgroundColor: '#32cd32',
    // padding: 100
  },
});
