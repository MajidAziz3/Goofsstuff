import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableHighlight,
  Button,
  TouchableOpacity,
  TextInput,
  Picker,
  ScrollView,
  Modal,
  Image,
  Alert,
  FlatList,
} from 'react-native';
import {CheckBox} from 'react-native-elements';
import Icon from 'react-native-vector-icons/EvilIcons';
import EIcon from 'react-native-vector-icons/Entypo';
import FA from 'react-native-vector-icons/FontAwesome';
import FIcon from 'react-native-vector-icons/FontAwesome5';
import AIcon from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import GlobalConst from '../../Backend/GlobalConst';
import DateTimePicker from 'react-native-modal-datetime-picker';
import ImagePicker from 'react-native-image-picker';
import SwitchToggle from 'react-native-switch-toggle';
import Entypo from 'react-native-vector-icons/Entypo';
import ImageResizer from 'react-native-image-resizer';

import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {News} from '../../Backend/Create/News';
import {Watch} from '../../Backend/Create/Watch';
import {Community_Event} from '../../Backend/Create/Community_Event';
import {Create_Job} from '../../Backend/Create/Job';
import {
  uploadImage,
  uploadVideo,
  uploadCommunityImage,
} from '../../Backend/Utility';
import {_retrieveData} from '../../Backend/AsyncStore/AsyncFunc';
import AsyncStorage from '@react-native-community/async-storage';

export default class Forms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDisplayed: false,
      isChecked: true,
      isDateTimePickerVisible: false,
      isDateTimePickerVisible: false,
      isDateTimePickerVisible: false,
      photo: null,
      firstNameFlage: false,
      phoneNFlage: false,
      emailFlage: false,
      locationFlage: false,
      switchOn: false,
      modalVisible: false,
      category: 'Sport',
      subcategory: 'Foot Ball',
      vedio_post: '',
      file: null,
      about_you: '',
      watch_like: [],
      watch_comments: [],
      lebal: [],
      location: '',
      watch_favorit: [],

      news_descriptions: '',
      file: [],
      onlyme: true,
      friends: false,
      Public: false,
      uploading_time: '',
      like: [],
      favorite: [],
      comments: [],
      company_name: '',

      dataSource: [
        {
          icon: 'https://bootdey.com/img/Content/avatar/avatar1.png',
          description: 'User 1',
        },
        {
          icon: 'https://bootdey.com/img/Content/avatar/avatar2.png',
          description: 'User 2',
        },
        {
          icon: 'https://bootdey.com/img/Content/avatar/avatar3.png',
          description: 'User 3',
        },
        {
          icon: 'https://bootdey.com/img/Content/avatar/avatar4.png',
          description: 'User 4',
        },
        {
          icon: 'https://bootdey.com/img/Content/avatar/avatar5.png',
          description: 'User 5',
        },
        {
          icon: 'https://bootdey.com/img/Content/avatar/avatar6.png',
          description: 'User 6',
        },
        {
          icon: 'https://bootdey.com/img/Content/avatar/avatar1.png',
          description: 'User 7',
        },
        {
          icon: 'https://bootdey.com/img/Content/avatar/avatar2.png',
          description: 'User 8',
        },
        {
          icon: 'https://bootdey.com/img/Content/avatar/avatar3.png',
          description: 'User 9',
        },
      ],
      Event_Category: 'Sport',
      event_sub_category: 'football',
      location_event: '',
      event_date: '',
      event_description: '',
      event_start_timing: '',
      phone_number: '',
      email_address: '',
      invite_friends: [],
      joining_members: [],
      title: '',
      img: null,
      ending_timing_event: '',
      company_atteeched: false,
      ImageUrl: null,

      job_category: '',
      img: null,
      job_title: '',
      email_address_job: '',
      job_description: '',
      job_compensation: '',
      about_job: '',
      phone_job: '',
      imageType: null,
      photo: null,
      ImageName: null,
      videoPath: null,
      videoType: null,
      videoName: null,
    };
  }

  handlechooseVideo = () => {
    const options = {
      title: 'Select video',
      mediaType: 'video',

      quality: 1,
    };

    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
      } else if (response.error) {
      } else if (response.customButton) {
      } else {
        this.setState({
          videoPath: response.uri,
          videoType: 'mp4',
          videoName: response.path,
        });
      }
    });
  };

  upload_Video_Watch = async () => {
    var parts = this.state.videoName.split('/');
    var lastSegment = parts.pop() || parts.pop(); // handle potential trailing slash
    let iteratorNum = 0;
    await _retrieveData('ref').then(async item => {
      await uploadVideo(
        this.state.videoPath,
        this.state.videoType,
        lastSegment,
        'video',
        'Watch',
        item,
      );
      console.log('i m here');
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
    AsyncStorage.removeItem('doc_id');
  };

  upload_Video = async () => {
    var parts = this.state.videoName.split('/');
    var lastSegment = parts.pop() || parts.pop(); // handle potential trailing slash
    let iteratorNum = 0;
    await _retrieveData('ref').then(async item => {
      await uploadVideo(
        this.state.videoPath,
        this.state.videoType,
        lastSegment,
        'video',
        'News',
        item,
      );
      console.log('i m here');
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
    AsyncStorage.removeItem('doc_id');
  };

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

  async Upload_Sport_Image() {
    let iteratorNum = 0;
    _retrieveData('user').then(async result => {
      await uploadCommunityImage(
        this.state.ImageUrl,
        this.state.imageType,
        this.state.ImageName,
        this.state.ImageName,
        'Sport',
        result,
        this.state.event_sub_category,
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

  async Upload_Image() {
    let iteratorNum = 0;
    await _retrieveData('ref').then(async item => {
      console.log('refffffffff', item);
      await uploadImage(
        this.state.ImageUrl,
        this.state.imageType,
        this.state.ImageName,
        this.state.ImageName,
        'News',
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

  componentDidMount() {
    const {addListener} = this.props.navigation;
    const {isDisplayed} = this.state;
    const self = this;

    this.listeners = [
      addListener('didFocus', () => {
        if (self.state.isDisplayed !== true) {
          self.setState({isDisplayed: true});
        }
      }),
      addListener('willBlur', () => {
        if (self.state.isDisplayed !== false) {
          self.setState({isDisplayed: false});
        }
      }),
    ];

    var that = this;
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    that.setState({
      //Setting the value of the date time
      uploading_time:
        date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec,
    });
  }

  updateCategory = category => {
    this.setState({category: category});
  };

  updateSubCategory = subcategory => {
    this.setState({subcategory: subcategory});
  };

  toggleModal(visible) {
    this.setState({modalVisible: visible});
  }

  showDateTimePicker = () => {
    this.setState({isDateTimePickerVisible: true});
  };

  hideDateTimePicker = () => {
    this.setState({isDateTimePickerVisible: false});
  };
  showDateTimePicker1 = () => {
    this.setState({isDateTimePickerVisible1: true});
  };

  hideDateTimePicker1 = () => {
    this.setState({isDateTimePickerVisible1: false});
  };
  showDateTimePicker2 = () => {
    this.setState({isDateTimePickerVisible2: true});
  };

  hideDateTimePicker2 = () => {
    this.setState({isDateTimePickerVisible2: false});
  };
  handleDatePicked = date => {
    this.hideDateTimePicker();
  };

  sentWatch = async () => {
    const {
      firstNameFlage,
      emailFlage,
      location,
      locationFlage,
      vedio_post,
      file,
      about_you,
      isChecked,
      watch_like,
      watch_comments,
      lebal,
      watch_favorit,
      uploading_time,
    } = this.state;
    if (
      firstNameFlage === false &&
      emailFlage === false &&
      locationFlage === false
    ) {
      alert('please select any check Box');
      return;
    }
    Watch(
      firstNameFlage,
      emailFlage,
      location,
      locationFlage,
      vedio_post,
      file,
      about_you,
      isChecked,
      watch_like,
      watch_comments,
      lebal,
      watch_favorit,
      uploading_time,
    ).then(() => {
      setTimeout(async () => {
        if (this.state.videoPath !== null) {
          await this.upload_Video_Watch();
        }
      }, 10000);
    });
  };

  hello() {
    console.log(
      'picker value',
      this.state.Event_Category,
      this.state.event_sub_category,
    );
    if (GlobalConst.STORAGE_KEYS.ScreenType == '2') {
      const {
        firstNameFlage,
        emailFlage,
        location,
        locationFlage,
        vedio_post,
        file,
        about_you,
        isChecked,
        watch_like,
        watch_comments,
        lebal,
        watch_favorit,
        uploading_time,
      } = this.state;

      return (
        <View>
          <View
            style={{
              backgroundColor: 'white',
              borderRadius: 20,
              height: responsiveHeight(70),
              paddingLeft: 15,
              paddingRight: 20,
              paddingTop: 10,
            }}>
            <View
              style={{
                backgroundColor: 'white',
                height: '10%',
                flexDirection: 'row',
              }}>
              <Entypo
                name="cross"
                size={30}
                style={{
                  left: 0,
                  right: 0,
                  position: 'absolute',
                }}
                color="#32cd32"
                onPress={() => this.props.navigation.navigate('Watch')}
              />
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                  height: '100%',
                }}>
                <Text
                  style={{
                    fontSize: responsiveFontSize(4),
                    fontWeight: 'bold',
                    color: '#32cd32',
                  }}>
                  Upload Video
                </Text>
              </View>
            </View>

            <View
              style={{
                backgroundColor: 'white',
                height: responsiveHeight(10),
                width: '100%',
              }}>
              <Text
                style={{
                  fontSize: responsiveFontSize(1.5),
                  // fontWeight: 'bold',
                  padding: 5,
                  color: '#000',

                  textAlign: 'center',
                }}>
                Want to have the 3 minutes of inspiration spotlight? Upload your
                video and complete the information below. If your message is
                chosen, you will receive an e-mail with the date your video will
                be displayed!
              </Text>
            </View>

            <View
              style={{
                marginTop: 0,
                backgroundColor: 'white',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View
                style={{
                  backgroundColor: 'white',
                  left: 10,
                  width: '100%',
                }}>
                <Text
                  style={{
                    fontSize: responsiveFontSize(1.1),
                    color: '#000',
                    textAlign: 'center',
                  }}>
                  Check what contact information would you like to be publicly
                  displayed with your video.
                </Text>
              </View>
            </View>

            <View
              style={{
                marginTop: 0,
                backgroundColor: 'white',
                height: '6%',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                alignItems: 'center',
              }}>
              <View
                style={{
                  backgroundColor: 'white',
                  width: '70%',
                  height: '90%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: responsiveFontSize(1.2),
                    // fontWeight: 'bold',
                    // padding: 5,
                    left: 10,
                    color: '#000',

                    textAlign: 'center',
                  }}>
                  First & Last Name
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: 'white',
                  width: '25%',
                  alignItems: 'flex-end',
                }}>
                <CheckBox
                  checked={firstNameFlage}
                  checkedIcon="check"
                  uncheckedIcon="close"
                  checkedColor="green"
                  uncheckedColor="#fff"
                  iconType="entypo"
                  onPress={() => {
                    this.setState({firstNameFlage: !firstNameFlage});
                  }}
                  containerStyle={{
                    backgroundColor: '#fff',
                    width: 20,
                    height: 20,
                    borderWidth: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                />
              </View>
            </View>

            {/* <View
              style={{
                marginTop: 0,
                backgroundColor: 'white',
                flexDirection: 'row',
                height: '6%',
                justifyContent: 'space-evenly',
                alignItems: 'center',
              }}>
              <View
                style={{
                  backgroundColor: 'white',
                  width: '70%',
                  height: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: responsiveFontSize(1.2),
                    // fontWeight: 'bold',
                    // padding: 5,
                    color: '#000',

                    textAlign: 'center',
                  }}>
                  Phone Number
                </Text>
              </View> */}
            {/* <View
                style={{
                  backgroundColor: 'white',
                  width: '25%',
                  alignItems: 'flex-end',
                }}>
                <CheckBox
                  checked={this.state.phoneNFlage}
                  checkedIcon="check"
                  uncheckedIcon="close"
                  checkedColor="green"
                  uncheckedColor="#fff"
                  size={15}
                  iconType="entypo"
                  onPress={() => {
                    this.setState({phoneNFlage: !this.state.phoneNFlage});
                  }}
                  containerStyle={{
                    backgroundColor: '#fff',
                    width: 20,
                    height: 20,
                    borderWidth: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                />
              </View>
            </View> */}

            <View
              style={{
                marginTop: 0,
                backgroundColor: 'white',
                height: '5%',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                alignItems: 'center',
              }}>
              <View
                style={{
                  backgroundColor: 'white',
                  width: '70%',
                  height: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: responsiveFontSize(1.2),
                    // fontWeight: 'bold',
                    // padding: 5,
                    color: '#000',

                    textAlign: 'center',
                  }}>
                  Email Address
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: 'white',
                  width: '25%',
                  alignItems: 'flex-end',
                }}>
                <CheckBox
                  checked={emailFlage}
                  checkedIcon="check"
                  uncheckedIcon="close"
                  checkedColor="green"
                  uncheckedColor="#fff"
                  size={15}
                  iconType="entypo"
                  onPress={() => {
                    this.setState({emailFlage: !emailFlage});
                  }}
                  containerStyle={{
                    backgroundColor: '#fff',
                    width: 20,
                    height: 20,
                    borderWidth: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                />
              </View>
            </View>

            <View
              style={{
                marginTop: 0,
                backgroundColor: 'white',
                height: '10%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#32cd32',
                  marginHorizontal: 10,
                  width: 40,
                  height: 40,
                  justifyContent: 'center',
                  alignItems: 'center',
                  shadowOffset: {width: 0, height: 1},
                  shadowOpacity: 0.2,
                  shadowRadius: 1.41,
                  elevation: 5,
                  borderRadius: 100,
                }}>
                <Icon name="location" size={30} color="white" />
              </TouchableOpacity>
              <TextInput
                value={location}
                onChangeText={location => this.setState({location})}
                placeholder="Location"
                style={{
                  fontSize: 12,
                  padding: 5,
                  borderRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '65%',
                  height: '60%',
                  shadowColor: 'black',
                  shadowOffset: {width: 0, height: 1},
                  shadowOpacity: 0.2,
                  shadowRadius: 1.41,
                  elevation: 2,
                  backgroundColor: 'white',
                }}></TextInput>
              <View style={{backgroundColor: 'white', width: '15%'}}>
                <CheckBox
                  checked={locationFlage}
                  checkedIcon="check"
                  uncheckedIcon="close"
                  checkedColor="green"
                  uncheckedColor="#fff"
                  size={15}
                  iconType="entypo"
                  onPress={() => {
                    this.setState({locationFlage: !locationFlage});
                  }}
                  containerStyle={{
                    backgroundColor: '#fff',
                    width: 20,
                    height: 20,
                    borderWidth: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                />
              </View>
            </View>

            <View
              style={{
                borderRadius: 10,
                width: '96%',
                backgroundColor: 'white',
                height: '20%',
                justifyContent: 'space-between',
                elevation: 1,
                alignSelf: 'center',
                marginTop: 10,
              }}>
              <TextInput
                value={vedio_post}
                onChangeText={vedio_post => this.setState({vedio_post})}
                multiline={true}
                numberOfLines={6}
                style={{
                  textAlignVertical: 'top',
                  fontSize: responsiveFontSize(2),
                  height: '100%',
                  width: '100%',
                  paddingHorizontal: 10,
                }}
                placeholder={
                  'Write a little about your video and what inspired you to share!'
                }
              />
            </View>

            <View
              style={{
                top: 3,
                height: '5%',
                width: '33%',
                alignSelf: 'flex-end',
                borderRadius: 10,
                marginRight: 10,
              }}>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  backgroundColor: '#32cd32',
                  width: '100%',
                  height: '100%',
                  borderRadius: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                  elevation: 1,
                }}
                onPress={() => {
                  this.handlechooseVideo();
                }}>
                <FA name="video-camera" size={18} color="white" style={{}} />

                <Text
                  style={{
                    marginLeft: 5,
                    fontSize: responsiveFontSize(1.8),
                    color: 'white',
                  }}>
                  Video
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                borderRadius: 10,
                width: '96%',
                backgroundColor: 'white',
                height: '20%',
                justifyContent: 'space-between',
                elevation: 1,
                alignSelf: 'center',
                marginTop: 10,
              }}>
              <TextInput
                value={about_you}
                onChangeText={about_you => this.setState({about_you})}
                multiline={true}
                numberOfLines={3}
                style={{
                  textAlignVertical: 'top',
                  fontSize: responsiveFontSize(2),
                  height: '100%',
                  width: '100%',
                  paddingHorizontal: 10,
                }}
                placeholder={'Tell viewers a little about you'}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              // marginTop: 2,
              alignItems: 'center',
              marginHorizontal: 20,
            }}>
            <CheckBox
              style={{top: responsiveHeight(4), left: 10}}
              onClick={() => {
                this.setState({
                  isChecked: !isChecked,
                });
              }}
              isChecked={isChecked}
              checked={isChecked}
            />
            <Text>
              I agree this video abides by the community guidelines, terms and
              conditions for The Good Stuff App
            </Text>
          </View>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              backgroundColor: '#32cd32',
              height: '10%',
              width: '95%',
              borderRadius: 15,
            }}
            onPress={() => {
              this.sentWatch();
            }}>
            <View
              style={{
                width: '40%',
                justifyContent: 'center',
                alignItems: 'flex-end',
              }}>
              <EIcon name="upload" size={30} color="white" />
            </View>
            <View
              style={{
                width: '60%',
                alignSelf: 'center',
                marginHorizontal: 20,
              }}
              onPress={() => {
                this.sentWatch();
                alert('pressed!');
              }}>
              <Text style={{fontSize: 16, color: 'white'}}>UPLOAD</Text>
            </View>
          </TouchableOpacity>
          {/* <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginHorizontal: 20,
              }}>
              <CheckBox
                style={{top: responsiveHeight(4), left: 10}}
                onClick={() =>
                  this.setState({
                    isChecked: !this.state.isChecked,
                  })
                }
                isChecked={this.state.isChecked}
              />
              <Text>
                I agree this video abides by the community guidelines, terms and
                conditions for The Good Stuff App
              </Text>
            </View> */}
        </View>
      );
    } else if (GlobalConst.STORAGE_KEYS.ScreenType == '4') {
      const {
        Event_Category,
        event_sub_category,
        location_event,
        event_date,
        event_description,
        event_start_timing,
        phone_number,
        email_address,
        invite_friends,
        joining_members,
        title,
        img,
        ending_timing_event,
        company_atteeched,
      } = this.state;
      return (
        <View style={{flex: 1}}>
          <View
            style={{
              backgroundColor: 'white',
              borderRadius: 20,
              height: responsiveHeight(93),
              paddingLeft: 20,
              paddingRight: 20,
              paddingTop: 0,
            }}>
            <View
              style={{
                backgroundColor: 'white',
                height: '7%',
                flexDirection: 'row',
              }}>
              <Entypo
                name="cross"
                size={30}
                style={{
                  left: 0,
                  right: 0,
                  position: 'absolute',
                }}
                color="#32cd32"
                onPress={() => this.props.navigation.navigate('CommunityBoard')}
              />
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                  height: '100%',
                }}>
                <Text
                  style={{
                    fontSize: responsiveFontSize(4),
                    fontWeight: 'bold',
                    color: '#32cd32',
                  }}>
                  Upload Event
                </Text>
              </View>
            </View>

            <ScrollView style={{marginBottom: 10}}>
              <View
                style={{
                  marginTop: 5,
                  backgroundColor: 'white',
                  height: '8%',
                  flexDirection: 'row',
                  padding: 0,
                }}>
                <View
                  style={{
                    width: '30%',
                    height: '100%',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: responsiveFontSize(2),
                      color: '#7e7a7a',
                      alignSelf: 'flex-start',
                    }}>
                    Title*
                  </Text>
                </View>
                <TextInput
                  value={title}
                  onChangeText={title => this.setState({title})}
                  placeholder="Training Hike"
                  style={{
                    fontSize: 12,
                    marginTop: 5,
                    padding: 5,
                    justifyContent: 'center',
                    backgroundColor: 'white',
                    width: '65%',
                    height: '70%',
                    shadowColor: 'black',
                    shadowOffset: {width: 0, height: 1},
                    shadowOpacity: 0.2,
                    shadowRadius: 1.41,
                    elevation: 2,
                    borderRadius: 5,
                  }}
                />
              </View>

              <View
                style={{
                  marginTop: 0,
                  backgroundColor: 'white',
                  height: '8%',
                  flexDirection: 'row',
                  padding: 0,
                }}>
                <View
                  style={{
                    width: '30%',
                    height: '100%',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: responsiveFontSize(2),
                      color: '#7e7a7a',
                      alignSelf: 'flex-start',
                    }}>
                    Phone#
                  </Text>
                </View>
                <TextInput
                  value={phone_number}
                  onChangeText={phone_number => this.setState({phone_number})}
                  placeholder="1234567"
                  style={{
                    fontSize: 12,
                    marginTop: 5,
                    padding: 5,
                    justifyContent: 'center',
                    backgroundColor: 'white',
                    width: '65%',
                    height: '70%',
                    shadowColor: 'black',
                    shadowOffset: {width: 0, height: 1},
                    shadowOpacity: 0.2,
                    shadowRadius: 1.41,
                    elevation: 2,
                    borderRadius: 5,
                  }}
                />
              </View>
              <View
                style={{
                  marginTop: 0,
                  backgroundColor: 'white',
                  height: '8%',
                  flexDirection: 'row',
                  padding: 0,
                }}>
                <View
                  style={{
                    width: '30%',
                    height: '100%',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: responsiveFontSize(2),
                      color: '#7e7a7a',
                      alignSelf: 'flex-start',
                    }}>
                    Email
                  </Text>
                </View>
                <TextInput
                  value={email_address}
                  onChangeText={email_address => this.setState({email_address})}
                  placeholder="user123@gmail.com"
                  style={{
                    fontSize: 12,
                    marginTop: 5,
                    padding: 5,
                    justifyContent: 'center',
                    backgroundColor: 'white',
                    width: '65%',
                    height: '70%',
                    shadowColor: 'black',
                    shadowOffset: {width: 0, height: 1},
                    shadowOpacity: 0.2,
                    shadowRadius: 1.41,
                    elevation: 2,
                    borderRadius: 5,
                  }}
                />
              </View>

              <View
                style={{
                  backgroundColor: 'white',
                  height: '8%',
                  flexDirection: 'row',
                  padding: 0,
                }}>
                <View
                  style={{
                    width: '30%',
                    height: '100%',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: responsiveFontSize(2),
                      color: '#7e7a7a',
                      alignSelf: 'flex-start',
                    }}>
                    Category*
                  </Text>
                </View>
                <View
                  style={{
                    marginTop: 5,
                    justifyContent: 'center',
                    width: '65%',
                    height: '70%',
                    shadowColor: 'black',
                    shadowOffset: {width: 0, height: 1},
                    shadowOpacity: 0.2,
                    shadowRadius: 1.41,
                    elevation: 1,
                    backgroundColor: 'white',
                    borderRadius: 5,
                  }}>
                  <Picker
                    selectedValue={this.state.Event_Category}
                    // onValueChange={this.updateCategory}
                    style={{height: '100%', width: '100%', color: '#7e7a7a'}}
                    // onValueChange={(itemValue, itemIndex) =>
                    onValueChange={(value, itemIndex) =>
                      this.setState({Event_Category: value})
                    }
                    //     this.setState({ language: itemValue })}
                  >
                    <Picker.Item label="Sports" value="Sport" />
                    <Picker.Item label="Event" value="Event" />
                  </Picker>
                </View>
              </View>

              <View
                style={{
                  backgroundColor: 'white',
                  height: '8%',
                  flexDirection: 'row',
                  padding: 0,
                }}>
                <View
                  style={{
                    width: '30%',
                    height: '100%',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: responsiveFontSize(2),
                      color: '#7e7a7a',
                      alignSelf: 'flex-start',
                    }}>
                    Sub Category*
                  </Text>
                </View>
                <View
                  style={{
                    marginTop: 5,
                    justifyContent: 'center',
                    width: '65%',
                    height: '70%',
                    shadowColor: 'black',
                    shadowOffset: {width: 0, height: 1},
                    shadowOpacity: 0.2,
                    shadowRadius: 1.41,
                    elevation: 1,
                    backgroundColor: 'white',
                    borderRadius: 5,
                  }}>
                  {this.state.Event_Category == 'Sport' ? (
                    <Picker
                      selectedValue={this.state.event_sub_category}
                      // onValueChange={this.updateSubCategory}
                      style={{
                        height: '100%',
                        width: '100%',
                        color: '#7e7a7a',
                      }}
                      onValueChange={(value, itemIndex) =>
                        this.setState({event_sub_category: value})
                      }
                      // onValueChange={(itemValue, itemIndex) =>
                      //     this.setState({ language: itemValue })}
                    >
                      <Picker.Item
                        label="Foot Ball"
                        value={
                          this.state.event_sub_category == 'birthday' ||
                          this.state.event_sub_category == 'Party' ||
                          this.state.event_sub_category == 'Other'
                            ? this.setState({event_sub_category: 'football'})
                            : 'football'
                        }
                      />
                      <Picker.Item label="Cricket" value="Cricket" />
                      <Picker.Item label="Base Ball" value="baseball" />
                    </Picker>
                  ) : (
                    <Picker
                      selectedValue={this.state.event_sub_category}
                      // onValueChange={this.updateSubCategory}
                      style={{
                        height: '100%',
                        width: '100%',
                        color: '#7e7a7a',
                      }}
                      onValueChange={(value, itemIndex) =>
                        this.setState({event_sub_category: value})
                      }>
                      <Picker.Item
                        label="Birth Day"
                        value={
                          this.state.event_sub_category === 'football'
                            ? this.setState({event_sub_category: 'birthday'})
                            : 'birthday'
                        }
                      />
                      <Picker.Item label="Party" value="Party" />
                      <Picker.Item label="Other" value="Other" />
                    </Picker>
                  )}
                </View>
              </View>

              <View
                style={{
                  marginTop: 0,
                  backgroundColor: 'white',
                  height: '8%',
                  flexDirection: 'row',
                }}>
                <View
                  style={{
                    width: '30%',
                    height: '100%',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: responsiveFontSize(2),
                      color: '#7e7a7a',
                      alignSelf: 'flex-start',
                    }}>
                    Upload Image
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={this.handleChoosePhoto}
                  style={{
                    fontSize: 12,
                    marginTop: 5,
                    padding: 5,
                    justifyContent: 'center',
                    backgroundColor: '#32cd32',
                    width: '65%',
                    height: '70%',
                    shadowColor: 'black',
                    shadowOffset: {width: 0, height: 1},
                    shadowOpacity: 0.2,
                    shadowRadius: 1.41,
                    elevation: 2,
                    borderRadius: 5,
                  }}>
                  <Text style={{color: 'white', textAlign: 'center'}}>
                    Select Image
                  </Text>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  height: '5%',
                  backgroundColor: 'white',
                  flexDirection: 'row',
                  marginTop: 5,
                }}>
                <View
                  style={{
                    width: '50%',
                    justifyContent: 'center',
                    marginHorizontal: 10,
                  }}>
                  <Text
                    style={{
                      fontSize: responsiveFontSize(2),
                      color: '#7e7a7a',
                      alignSelf: 'flex-start',
                    }}>
                    Date
                  </Text>
                </View>
                <View
                  style={{
                    width: '50%',
                    justifyContent: 'center',
                    backgroundColor: 'white',
                  }}>
                  <Text
                    style={{
                      fontSize: responsiveFontSize(2),
                      color: '#7e7a7a',
                      left: 20,
                    }}>
                    Time
                  </Text>
                </View>
              </View>

              <View
                style={{
                  height: '8%',
                  backgroundColor: 'white',
                  flexDirection: 'row',
                }}>
                <View
                  style={{
                    width: '30%',
                    justifyContent: 'center',
                    marginHorizontal: 10,
                    top: 8,
                  }}>
                  <Button
                    title="Select Date"
                    onPress={this.showDateTimePicker1}
                    color={'#32cd32'}
                  />
                  <DateTimePicker
                    mode="date"
                    isVisible={this.state.isDateTimePickerVisible1}
                    onConfirm={this.handleDatePicked}
                    onCancel={this.hideDateTimePicker}
                  />
                </View>
                <View
                  style={{
                    width: '70%',
                    backgroundColor: 'white',
                    height: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                  }}>
                  <View style={{width: '40%'}}>
                    <Text
                      style={{
                        fontSize: responsiveFontSize(1.6),
                        color: '#000',
                      }}>
                      Start Time
                    </Text>
                    <Button
                      title="Select Time"
                      onPress={this.showDateTimePicker}
                      color={'#32cd32'}
                    />
                    <DateTimePicker
                      mode="time"
                      isVisible={this.state.isDateTimePickerVisible}
                      onConfirm={this.handleDatePicked}
                      onCancel={this.hideDateTimePicker}
                    />
                  </View>
                  <View style={{width: '40%', alignItems: 'center'}}>
                    <Text
                      style={{
                        fontSize: responsiveFontSize(1.6),
                        color: '#000',
                      }}>
                      End Time
                    </Text>
                    <Button
                      title="Select Time"
                      onPress={this.showDateTimePicker2}
                      color={'#32cd32'}
                    />
                    <DateTimePicker
                      mode="time"
                      isVisible={this.state.isDateTimePickerVisible2}
                      onConfirm={this.handleDatePicked}
                      onCancel={this.hideDateTimePicker}
                    />
                  </View>
                </View>
              </View>

              <View
                style={{
                  height: '15%',
                  width: '95%',
                  alignSelf: 'center',
                  flexDirection: 'row',
                  padding: 0,
                  borderRadius: 10,
                  shadowColor: 'black',
                  shadowOffset: {width: 0, height: 1},
                  shadowOpacity: 0.2,
                  shadowRadius: 1.41,
                  elevation: 5,
                  backgroundColor: 'white',
                  marginTop: 20,
                }}>
                <TextInput
                  value={event_description}
                  onChangeText={event_description =>
                    this.setState({event_description})
                  }
                  placeholderTextColor="grey"
                  numberOfLines={7}
                  style={{
                    textAlignVertical: 'top',
                    fontSize: 12,
                    height: '90%',
                  }}
                  placeholder="Description..."></TextInput>
              </View>

              <View
                style={{
                  backgroundColor: 'white',
                  width: '100%',
                  height: '7%',
                  flexDirection: 'row',
                  top: 9,
                }}>
                <View
                  style={{
                    paddingHorizontal: 5,
                    backgroundColor: 'white',
                    width: '80%',
                    height: '100%',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: responsiveFontSize(2),
                      color: '#7e7a7a',
                      alignSelf: 'flex-start',
                    }}>
                    Attach Event to Company ?
                  </Text>
                </View>
                <TouchableOpacity
                  style={{
                    marginTop: 5,
                    marginHorizontal: 20,
                    borderRadius: 100,
                    backgroundColor: '#32cd32',
                    width: 30,
                    height: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <EIcon name="check" size={20} color="white" />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  marginTop: 15,
                  backgroundColor: 'white',
                  height: '12%',
                  flexDirection: 'row',
                  padding: 0,
                }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#32cd32',
                    marginHorizontal: 10,
                    width: 50,
                    height: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                    shadowOffset: {width: 0, height: 1},
                    shadowOpacity: 0.2,
                    shadowRadius: 1.41,
                    elevation: 5,
                    borderRadius: 100,
                  }}>
                  <Icon name="location" size={40} color="white" />
                </TouchableOpacity>
                <TextInput
                  value={location_event}
                  onChangeText={location_event =>
                    this.setState({location_event})
                  }
                  placeholder="Annapolia Rock"
                  style={{
                    fontSize: 12,
                    padding: 5,
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    width: '80%',
                    height: '65%',
                    shadowColor: 'black',
                    shadowOffset: {width: 0, height: 1},
                    shadowOpacity: 0.2,
                    shadowRadius: 1.41,
                    elevation: 2,
                    backgroundColor: 'white',
                  }}
                />
              </View>
              {/* <View
                style={{
                  backgroundColor: 'white',
                  height: '10%',
                  flexDirection: 'row',
                }}>
                <View
                  style={{
                    backgroundColor: 'white',
                    height: '100%',
                    width: '25%',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: responsiveFontSize(2.2),
                      color: '#000000',
                      top: 15,
                    }}>
                    Privacy
                  </Text>
                </View>

                <View
                  style={{
                    backgroundColor: 'white',
                    height: 180,
                    width: '75%',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    top: 0,
                  }}>
                  <View
                    style={{
                      flexDirection: 'column',
                      height: '100%',
                      width: '25%',
                      marginHorizontal: 0,
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity
                      style={{
                        width: 40,
                        height: 40,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'white',
                        borderRadius: 30,
                        shadowColor: 'black',
                        shadowOffset: {width: 0, height: 1},
                        shadowOpacity: 0.2,
                        shadowRadius: 1.41,
                        elevation: 5,
                      }}>
                      <Icon name="location" size={25} color="green" />
                    </TouchableOpacity>

                    <View
                      style={{
                        backgroundColor: 'white',
                        height: '30%',
                        width: '100%',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          fontSize: responsiveFontSize(1.5),
                          color: '#7e7a7a',
                        }}>
                        only me
                      </Text>
                    </View>
                  </View> */}

              {/* <View
                    style={{
                      left: -10,
                      flexDirection: 'column',
                      height: '100%',
                      width: '20%',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      top: 0,
                    }}>
                    <TouchableOpacity
                      style={{
                        width: 40,
                        height: 40,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'white',
                        borderRadius: 30,
                        shadowColor: 'black',
                        shadowOffset: {width: 0, height: 1},
                        shadowOpacity: 0.2,
                        shadowRadius: 1.41,
                        elevation: 5,
                      }}>
                      <FIcon name="user-friends" size={20} color="green" />
                    </TouchableOpacity>

                    <View
                      style={{
                        top: 0,
                        backgroundColor: 'white',
                        height: '30%',
                        width: '100%',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          fontSize: responsiveFontSize(1.5),
                          color: '#7e7a7a',
                        }}>
                        Friends
                      </Text>
                    </View>
                  </View> */}
              {/* 
                  <View
                    style={{
                      left: -15,
                      flexDirection: 'column',
                      height: '100%',
                      width: '20%',
                      marginHorizontal: 0,
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      top: 0,
                    }}>
                    <TouchableOpacity
                      style={{
                        width: 40,
                        height: 40,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'white',
                        borderRadius: 30,
                        shadowColor: 'black',
                        shadowOffset: {width: 0, height: 1},
                        shadowOpacity: 0.2,
                        shadowRadius: 1.41,
                        elevation: 5,
                      }}>
                      <Icon name="location" size={25} color="#32cd32" />
                    </TouchableOpacity>

                    <View
                      style={{
                        backgroundColor: 'white',
                        height: '30%',
                        width: '100%',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          fontSize: responsiveFontSize(1.5),
                          color: '#7e7a7a',
                        }}>
                        Public
                      </Text>
                    </View>
                  </View>
                </View> */}
            </ScrollView>

            <View
              style={{
                backgroundColor: 'white',
                height: '10%',
                padding: 2,
                marginBottom: 40,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: '#32cd32',
                  height: '90%',
                  width: '100%',
                  borderRadius: 15,
                }}>
                <TouchableOpacity
                  style={{
                    width: '40%',
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                  }}>
                  <EIcon name="upload" size={30} color="white" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    width: '60%',
                    alignSelf: 'center',
                    marginHorizontal: 20,
                  }}
                  onPress={() => {
                    // await this.upload_Image();
                    Community_Event(
                      Event_Category,
                      event_sub_category,
                      location_event,
                      event_date,
                      event_description,
                      event_start_timing,
                      phone_number,
                      email_address,
                      invite_friends,
                      joining_members,
                      title,
                      img,
                      ending_timing_event,
                      company_atteeched,
                    )
                    // .then(async () => {
                    //   await setTimeout(async () => {
                    //     await this.Upload_Sport_Image();
                    //   }, 300);
                    // });
                  }}>
                  <Text style={{fontSize: 16, color: 'white'}}>UPLOAD</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      );
    }

    ////Upload Jobs
    else if (GlobalConst.STORAGE_KEYS.ScreenType == '3') {
      const {
        job_category,
        img,
        job_title,
        email_address_job,
        job_description,
        job_compensation,
        about_job,
        phone_job,
        uploading_time,
        company_name,
      } = this.state;
      return (
        <View>
          <View
            style={{
              backgroundColor: 'white',
              borderRadius: 20,
              height: responsiveHeight(93),
              paddingLeft: 20,
              paddingRight: 20,
              paddingTop: 0,
            }}>
            <View
              style={{
                backgroundColor: 'white',
                height: '10%',
                flexDirection: 'row',
              }}>
              <Entypo
                name="cross"
                size={30}
                style={{
                  left: 0,
                  right: 0,
                  position: 'absolute',
                }}
                color="#32cd32"
                onPress={() => this.props.navigation.navigate('CommunityBoard')}
              />
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                  height: '100%',
                }}>
                <Text
                  style={{
                    fontSize: responsiveFontSize(4),
                    fontWeight: 'bold',
                    color: '#32cd32',
                  }}>
                  Upload Job
                </Text>
                <Text>Job posts are live for 30 days</Text>
              </View>
            </View>
            <ScrollView style={{backgroundColor: 'white'}}>
              <View
                style={{
                  marginTop: 5,
                  backgroundColor: 'white',
                  height: responsiveHeight(7),
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-evenly',
                }}>
                <View
                  style={{
                    width: '35%',
                    height: '100%',
                    // backgroundColor:'red',
                    justifyContent: 'center',
                    // alignItems:'center'
                  }}>
                  <Text
                    style={{
                      fontSize: responsiveFontSize(2),
                      color: '#7e7a7a',
                    }}>
                    Company Name*
                  </Text>
                </View>
                <TextInput
                  value={company_name}
                  onChangeText={company_name => this.setState({company_name})}
                  placeholder="Training Hike"
                  style={{
                    fontSize: 12,
                    // marginTop: 5,
                    padding: 5,
                    justifyContent: 'center',
                    backgroundColor: 'white',
                    width: '60%',
                    height: '80%',
                    shadowColor: 'black',
                    shadowOffset: {width: 0, height: 1},
                    shadowOpacity: 0.2,
                    shadowRadius: 1.41,
                    elevation: 2,
                    borderRadius: 5,
                  }}
                />
              </View>

              <View
                style={{
                  marginTop: 5,
                  backgroundColor: 'white',
                  height: responsiveHeight(7),
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-evenly',
                }}>
                <View
                  style={{
                    width: '35%',
                    height: '100%',
                    // backgroundColor:'red',
                    justifyContent: 'center',
                    // alignItems:'center'
                  }}>
                  <Text
                    style={{
                      fontSize: responsiveFontSize(2),
                      color: '#7e7a7a',
                    }}>
                    Phone Number *
                  </Text>
                </View>
                <TextInput
                  value={phone_job}
                  onChangeText={phone_job => this.setState({phone_job})}
                  placeholder="Phone Number"
                  style={{
                    fontSize: 12,
                    // marginTop: 5,
                    padding: 5,
                    justifyContent: 'center',
                    backgroundColor: 'white',
                    width: '60%',
                    height: '80%',
                    shadowColor: 'black',
                    shadowOffset: {width: 0, height: 1},
                    shadowOpacity: 0.2,
                    shadowRadius: 1.41,
                    elevation: 2,
                    borderRadius: 5,
                  }}
                />
              </View>

              <View
                style={{
                  marginTop: 5,
                  backgroundColor: 'white',
                  height: responsiveHeight(7),
                  flexDirection: 'row',

                  justifyContent: 'space-evenly',
                }}>
                <View
                  style={{
                    width: '35%',
                    height: '100%',
                    // backgroundColor:'red',
                    justifyContent: 'center',
                    // alignItems:'center'
                  }}>
                  <Text
                    style={{
                      fontSize: responsiveFontSize(2),
                      color: '#7e7a7a',
                    }}>
                    Email
                  </Text>
                </View>
                <TextInput
                  value={email_address_job}
                  onChangeText={email_address_job =>
                    this.setState({email_address_job})
                  }
                  placeholder="Email "
                  style={{
                    fontSize: 12,
                    // marginTop: 5,
                    padding: 5,
                    justifyContent: 'center',
                    backgroundColor: 'white',
                    width: '60%',
                    height: '80%',
                    shadowColor: 'black',
                    shadowOffset: {width: 0, height: 1},
                    shadowOpacity: 0.2,
                    shadowRadius: 1.41,
                    elevation: 2,
                    borderRadius: 5,
                  }}
                />
              </View>

              <View
                style={{
                  marginTop: 5,
                  backgroundColor: 'white',
                  height: responsiveHeight(7),
                  flexDirection: 'row',

                  justifyContent: 'space-evenly',
                }}>
                <View
                  style={{
                    width: '35%',
                    height: '100%',
                    // backgroundColor:'red',
                    justifyContent: 'center',
                    // alignItems:'center'
                  }}>
                  <Text
                    style={{
                      fontSize: responsiveFontSize(2),
                      color: '#7e7a7a',
                    }}>
                    Job Title
                  </Text>
                </View>
                <TextInput
                  value={job_title}
                  onChangeText={job_title => this.setState({job_title})}
                  placeholder="job Title "
                  style={{
                    fontSize: 12,
                    // marginTop: 5,
                    padding: 5,
                    justifyContent: 'center',
                    backgroundColor: 'white',
                    width: '60%',
                    height: '80%',
                    shadowColor: 'black',
                    shadowOffset: {width: 0, height: 1},
                    shadowOpacity: 0.2,
                    shadowRadius: 1.41,
                    elevation: 2,
                    borderRadius: 5,
                  }}
                />
              </View>

              <View
                style={{
                  marginTop: 5,
                  backgroundColor: 'white',
                  height: responsiveHeight(7),
                  flexDirection: 'row',

                  justifyContent: 'space-evenly',
                }}>
                <View
                  style={{
                    width: '35%',
                    height: '100%',
                    // backgroundColor:'red',
                    justifyContent: 'center',
                    // alignItems:'center'
                  }}>
                  <Text
                    style={{
                      fontSize: responsiveFontSize(2),
                      color: '#7e7a7a',
                    }}>
                    Job Category
                  </Text>
                </View>
                <View
                  style={{
                    padding: 5,
                    justifyContent: 'center',
                    backgroundColor: 'white',
                    width: '60%',
                    height: '80%',
                    shadowColor: 'black',
                    shadowOffset: {width: 0, height: 1},
                    shadowOpacity: 0.2,
                    shadowRadius: 1.41,
                    elevation: 2,
                    borderRadius: 5,
                  }}>
                  <Picker
                    selectedValue={this.state.category}
                    onValueChange={this.updateCategory}
                    style={{height: '100%', width: '100%', color: '#7e7a7a'}}
                    // onValueChange={(itemValue, itemIndex) =>
                    //     this.setState({ language: itemValue })}
                  >
                    <Picker.Item label="IT Section" value="Sport" />
                    <Picker.Item
                      label="Finance Department"
                      value="Finance Department"
                    />

                    <Picker.Item label="Marketing" value="Marketing" />

                    <Picker.Item label="Office Work" value="Office Work" />
                  </Picker>
                </View>
              </View>

              <View
                style={{
                  marginTop: 0,
                  backgroundColor: 'white',
                  height: '8%',
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                }}>
                <View
                  style={{
                    width: '35%',
                    height: '100%',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: responsiveFontSize(2),
                      color: '#7e7a7a',
                      alignSelf: 'flex-start',
                    }}>
                    Upload Image
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={this.handleChoosePhoto}
                  style={{
                    fontSize: 12,
                    marginTop: 5,
                    padding: 5,
                    justifyContent: 'center',
                    backgroundColor: '#32cd32',
                    width: '60%',
                    height: '70%',
                    shadowColor: 'black',
                    shadowOffset: {width: 0, height: 1},
                    shadowOpacity: 0.2,
                    shadowRadius: 1.41,
                    elevation: 2,
                    borderRadius: 5,
                  }}>
                  <Text style={{color: 'white', textAlign: 'center'}}>
                    Select Image
                  </Text>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  height: '15%',
                  width: '95%',
                  alignSelf: 'center',
                  flexDirection: 'row',
                  padding: 0,
                  borderRadius: 10,
                  shadowColor: 'black',
                  shadowOffset: {width: 0, height: 1},
                  shadowOpacity: 0.2,
                  shadowRadius: 1.41,
                  elevation: 5,
                  backgroundColor: 'white',
                  marginTop: 20,
                }}>
                <TextInput
                  value={job_description}
                  onChangeText={job_description =>
                    this.setState({
                      job_description,
                    })
                  }
                  placeholderTextColor="grey"
                  numberOfLines={7}
                  style={{
                    textAlignVertical: 'top',
                    fontSize: 12,
                    height: '90%',
                  }}
                  placeholder="Job Description..."
                />
              </View>

              <View
                style={{
                  marginTop: 10,
                  backgroundColor: 'white',
                  height: responsiveHeight(7),
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-evenly',
                }}>
                <View
                  style={{
                    width: '35%',
                    height: '100%',
                    // backgroundColor:'red',
                    justifyContent: 'center',
                    // alignItems:'center'
                  }}>
                  <Text
                    style={{
                      fontSize: responsiveFontSize(2),
                      color: '#7e7a7a',
                      flex: 1,
                      // textAlign:'center'
                    }}>
                    {'Job Compensation'}
                  </Text>
                </View>
                <TextInput
                  value={job_compensation}
                  onChangeText={job_compensation =>
                    this.setState({job_compensation})
                  }
                  placeholder=" Job  Compensation"
                  style={{
                    fontSize: 12,
                    // marginTop: 5,
                    padding: 5,
                    justifyContent: 'center',
                    backgroundColor: 'white',
                    width: '60%',
                    height: '80%',
                    shadowColor: 'black',
                    shadowOffset: {width: 0, height: 1},
                    shadowOpacity: 0.2,
                    shadowRadius: 1.41,
                    elevation: 2,
                    borderRadius: 5,
                  }}
                />
              </View>

              <View
                style={{
                  height: '15%',
                  width: '95%',
                  alignSelf: 'center',
                  flexDirection: 'row',
                  padding: 0,
                  borderRadius: 10,
                  shadowColor: 'black',
                  shadowOffset: {width: 0, height: 1},
                  shadowOpacity: 0.2,
                  shadowRadius: 1.41,
                  elevation: 5,
                  backgroundColor: 'white',
                  marginTop: 20,
                }}>
                <TextInput
                  value={about_job}
                  onChangeText={about_job =>
                    this.setState({
                      about_job,
                    })
                  }
                  placeholderTextColor="grey"
                  numberOfLines={7}
                  style={{
                    textAlignVertical: 'top',
                    fontSize: 12,
                    height: '90%',
                  }}
                  placeholder="about job..."
                />
              </View>

              {/* <View
                style={{
                  backgroundColor: 'white',
                  width: '100%',
                  height: responsiveHeight(8),
                  flexDirection: 'row',
                  alignItems: 'center',
                  top: 10,
                }}>
                <View
                  style={{
                    paddingHorizontal: 5,
                    backgroundColor: 'white',
                    width: '80%',
                    height: '100%',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: responsiveFontSize(2),
                      color: '#7e7a7a',
                      alignSelf: 'flex-start',
                    }}>
                    Attach Event to Company ?
                  </Text>
                </View>
                <SwitchToggle
                  containerStyle={{
                    // marginTop: 10,
                    width: 40,
                    height: 25,
                    borderRadius: 30,
                    padding: 1,
                    marginLeft: 20,
                  }}
                  backgroundColorOn="#32cd32"
                  backgroundColorOff="#d3d4d3"
                  circleStyle={{
                    width: 25,
                    height: 25,
                    borderRadius: 27.5,
                    backgroundColor: '#d6d3d3', // rgb(102,134,205)
                  }}
                  switchOn={this.state.switchOn}
                  onPress={() => {
                    this.setState({switchOn: !this.state.switchOn});
                  }}
                  circleColorOff="#e5e1e0"
                  circleColorOn="#e5e1e0"
                  duration={500}
                />
              </View> */}

              {/* <View
                style={{
                  backgroundColor: 'white',
                  height: '10%',
                  flexDirection: 'row',
                  top: 10,
                }}>
                <View
                  style={{
                    backgroundColor: 'white',
                    height: '100%',
                    width: '25%',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: responsiveFontSize(2.2),
                      color: '#000000',
                      top: 15,
                    }}>
                    Privacy
                  </Text>
                </View>

                <View
                  style={{
                    backgroundColor: 'white',
                    height: 180,
                    width: '75%',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    top: 0,
                  }}>
                  <View
                    style={{
                      flexDirection: 'column',
                      height: '100%',
                      width: '25%',
                      marginHorizontal: 0,
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity
                      style={{
                        width: 40,
                        height: 40,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'white',
                        borderRadius: 30,
                        shadowColor: 'black',
                        shadowOffset: {width: 0, height: 1},
                        shadowOpacity: 0.2,
                        shadowRadius: 1.41,
                        elevation: 5,
                      }}>
                      <Icon name="location" size={25} color="green" />
                    </TouchableOpacity>

                    <View
                      style={{
                        backgroundColor: 'white',
                        height: '30%',
                        width: '100%',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          fontSize: responsiveFontSize(1.5),
                          color: '#7e7a7a',
                        }}>
                        only me
                      </Text>
                    </View>
                  </View>

                  <View
                    style={{
                      left: -10,
                      flexDirection: 'column',
                      height: '100%',
                      width: '20%',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      top: 0,
                    }}>
                    <TouchableOpacity
                      style={{
                        width: 40,
                        height: 40,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'white',
                        borderRadius: 30,
                        shadowColor: 'black',
                        shadowOffset: {width: 0, height: 1},
                        shadowOpacity: 0.2,
                        shadowRadius: 1.41,
                        elevation: 5,
                      }}>
                      <FIcon name="user-friends" size={20} color="green" />
                    </TouchableOpacity>

                    <View
                      style={{
                        top: 0,
                        backgroundColor: 'white',
                        height: '30%',
                        width: '100%',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          fontSize: responsiveFontSize(1.5),
                          color: '#7e7a7a',
                        }}>
                        Friends
                      </Text>
                    </View>
                  </View>

                  <View
                    style={{
                      left: -15,
                      flexDirection: 'column',
                      height: '100%',
                      width: '20%',
                      marginHorizontal: 0,
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      top: 0,
                    }}>
                    <TouchableOpacity
                      style={{
                        width: 40,
                        height: 40,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'white',
                        borderRadius: 30,
                        shadowColor: 'black',
                        shadowOffset: {width: 0, height: 1},
                        shadowOpacity: 0.2,
                        shadowRadius: 1.41,
                        elevation: 5,
                      }}>
                      <Icon name="location" size={25} color="#32cd32" />
                    </TouchableOpacity>

                    <View
                      style={{
                        backgroundColor: 'white',
                        height: '30%',
                        width: '100%',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          fontSize: responsiveFontSize(1.5),
                          color: '#7e7a7a',
                        }}>
                        Public
                      </Text>
                    </View>
                  </View>
                </View>
              </View> */}

              <TouchableOpacity
                style={{
                  backgroundColor: 'white',
                  height: responsiveHeight(20),
                  width: responsiveWidth(70),
                  alignSelf: 'center',
                  justifyContent: 'center',
                  alignItems: 'flex-end',
                }}
                onPress={() => this.toggleModal(true)}>
                <Text
                  style={{
                    fontSize: responsiveFontSize(2.5),
                    color: '#32cd32',
                    fontWeight: 'bold',
                    textTransform: 'capitalize',
                  }}>
                  pay $10 for ads
                </Text>
              </TouchableOpacity>

              <Modal
                animationType={'slide'}
                transparent={false}
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={() => {}}>
                <View
                  style={{
                    top: responsiveHeight(30),
                    width: responsiveWidth(90),
                    height: responsiveHeight(25),
                    borderRadius: 15,
                    padding: 10,
                    paddingHorizontal: 20,
                    alignSelf: 'center',

                    backgroundColor: '#32cd32',
                  }}>
                  <View
                    style={{
                      height: '30%',
                      width: '100%',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: responsiveFontSize(2.5),
                        color: 'white',
                      }}>
                      Confrim?
                    </Text>
                  </View>
                  <View
                    style={{
                      height: '20%',
                      width: '100%',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{fontSize: responsiveFontSize(2), color: 'white'}}>
                      Are you sure to update your setting?
                    </Text>
                  </View>
                  <View
                    style={{
                      padding: 5,
                      height: '40%',
                      width: '100%',
                      justifyContent: 'flex-end',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <TouchableHighlight
                      onPress={() => {
                        this.toggleModal(!this.state.modalVisible);
                      }}
                      style={{
                        marginEnd: 10,
                        backgroundColor: 'white',
                        height: 50,
                        width: 50,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 30,
                      }}>
                      <AIcon
                        name="close"
                        size={25}
                        color="#0d4d28"
                        style={{}}
                      />
                    </TouchableHighlight>
                    <TouchableHighlight
                      style={{
                        backgroundColor: 'white',
                        height: 50,
                        width: 50,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 30,
                      }}>
                      <AIcon
                        name="check"
                        size={25}
                        color="#0d4d28"
                        style={{}}
                      />
                    </TouchableHighlight>
                  </View>
                </View>
              </Modal>
            </ScrollView>
            <View
              style={{
                backgroundColor: 'white',
                height: '10%',
                padding: 2,
                marginBottom: 40,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: '#32cd32',
                  height: '90%',
                  width: '100%',
                  borderRadius: 15,
                }}>
                <TouchableOpacity
                  style={{
                    width: '40%',
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                  }}>
                  <EIcon name="upload" size={30} color="white" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    width: '60%',
                    alignSelf: 'center',
                    marginHorizontal: 20,
                  }}
                  onPress={() =>
                    Create_Job(
                      job_category,
                      img,
                      job_title,
                      email_address_job,
                      job_description,
                      job_compensation,
                      about_job,
                      phone_job,
                      uploading_time,
                      company_name,
                    )
                  }>
                  <Text style={{fontSize: 16, color: 'white'}}>UPLOAD</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      );
    } else if (GlobalConst.STORAGE_KEYS.ScreenType == '5') {
      return (
        <View style={styles.container}>
          <View style={styles.formContent}>
            <View style={styles.inputContainer}>
              <FA
                style={[styles.icon, styles.inputIcon]}
                name={'search'}
                color={'#32cd32'}
                size={25}
              />
              <TextInput
                style={styles.inputs}
                ref={'txtPassword'}
                placeholder="Search"
                underlineColorAndroid="transparent"
                onChangeText={name_address => this.setState({name_address})}
              />
            </View>
          </View>

          <FlatList
            style={styles.notificationList}
            data={this.state.dataSource}
            renderItem={item => {
              return (
                <TouchableOpacity
                  style={styles.notificationBox}
                  onPress={() => this.props.navigation.navigate('Chat')}>
                  <Image
                    style={styles.image}
                    source={{
                      uri: 'https://randomuser.me/api/portraits/men/85.jpg',
                    }}
                  />
                  <View
                    style={{
                      width: '80%',
                      justifyContent: 'center',
                      paddingHorizontal: 10,
                      borderBottomWidth: 0.1,
                    }}>
                    <Text style={styles.nameTxt} numberOfLines={1}>
                      Mark Doe
                    </Text>
                  </View>

                  <Text style={styles.name}>{item.description}</Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      );
    } else {
      const {
        news_descriptions,
        file,
        onlyme,
        friends,
        Public,
        uploading_time,
        like,
        favorite,
        comments,
      } = this.state;
      return (
        <View>
          <View
            style={{
              backgroundColor: 'white',
              borderRadius: 20,
              height: responsiveHeight(80),
              paddingLeft: 20,
              paddingRight: 20,
              paddingTop: 10,
            }}>
            <View
              style={{
                backgroundColor: 'white',
                height: '10%',
                flexDirection: 'row',
              }}>
              <Entypo
                name="cross"
                size={30}
                style={{
                  left: 0,
                  right: 0,
                  position: 'absolute',
                }}
                color="#32cd32"
                onPress={() => this.props.navigation.navigate('Home')}
              />
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                  height: '100%',
                }}>
                <Text
                  style={{
                    fontSize: responsiveFontSize(4),
                    fontWeight: 'bold',
                    color: '#32cd32',
                    textAlign: 'center',
                  }}>
                  Upload News
                </Text>
              </View>
            </View>

            <View
              style={{
                borderRadius: 10,
                width: '96%',
                backgroundColor: '',
                height: '30%',
                justifyContent: 'space-between',
                elevation: 1,
                alignSelf: 'center',
                marginTop: 30,
              }}>
              <TextInput
                value={news_descriptions}
                onChangeText={news_descriptions =>
                  this.setState({news_descriptions})
                }
                multiline={true}
                numberOfLines={6}
                style={{
                  textAlignVertical: 'top',
                  fontSize: responsiveFontSize(2),
                  height: '100%',
                  width: '100%',
                  paddingHorizontal: 10,
                }}
                placeholder={
                  'You have the mic! Post something fun, inspirational and awesome....'
                }
              />
            </View>
            <View
              style={{
                top: 3,
                height: '10%',
                width: '96%',
                flexDirection: 'row',
                alignSelf: 'center',
                borderRadius: 10,
                elevation: 2,
                justifyContent: 'space-evenly',
              }}>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  backgroundColor: '#ffffff',
                  width: '33%',
                  height: '100%',
                  borderRadius: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                  elevation: 1,
                }}
                onPress={this.handleChoosePhoto}>
                <FA name="camera" size={18} color="#32cd32" style={{}} />

                <Text
                  style={{
                    marginLeft: 5,
                    fontSize: responsiveFontSize(1.8),
                    color: '#32cd32',
                  }}>
                  Image
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  backgroundColor: '#ffffff',
                  width: '33%',
                  height: '100%',
                  borderRadius: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                  elevation: 1,
                }}
                onPress={this.handlechooseVideo}>
                <FA name="video-camera" size={18} color="#32cd32" style={{}} />

                <Text
                  style={{
                    marginLeft: 5,
                    fontSize: responsiveFontSize(1.8),
                    color: '#32cd32',
                  }}>
                  Video
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  width: '33%',
                  backgroundColor: '#ffffff',
                  height: '100%',
                  borderRadius: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                  elevation: 1,
                }}
                onPress={() => {
                  alert('Posted');
                }}>
                <FA name="microphone" size={18} color="#32cd32" style={{}} />

                <Text
                  style={{
                    marginLeft: 5,
                    fontSize: responsiveFontSize(1.8),
                    color: '#32cd32',
                  }}>
                  Voice
                </Text>
              </TouchableOpacity>
            </View>

            {/* <View
              style={{
                marginTop: 55,
                backgroundColor: 'white',
                height: '10%',
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#32cd32',
                  marginHorizontal: 10,
                  width: 50,
                  height: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                  shadowOffset: {width: 0, height: 1},
                  shadowOpacity: 0.2,
                  shadowRadius: 1.41,
                  elevation: 10,
                  borderRadius: 50,
                }}>
                <Icon name="location" size={40} color="white" />
              </TouchableOpacity>
              <TextInput
                placeholder="Location"
                style={{
                  top: 3,
                  fontSize: 12,
                  padding: 5,
                  borderRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '75%',
                  height: '65%',
                  shadowColor: 'black',
                  shadowOffset: {width: 0, height: 1},
                  shadowOpacity: 0.2,
                  shadowRadius: 1.41,
                  elevation: 2,
                  backgroundColor: 'white',
                }}></TextInput>
            </View> */}
            <View
              style={{
                top: 10,
                marginTop: 55,
                backgroundColor: 'white',
                height: '10%',
                flexDirection: 'row',
              }}>
              <View
                style={{
                  left: 10,
                  backgroundColor: 'white',
                  height: '100%',
                  width: '20%',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{fontSize: responsiveFontSize(2.2), color: '#000000'}}>
                  Privacy
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: 'white',
                  height: '100%',
                  width: '80%',
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                }}>
                <View
                  style={{
                    flexDirection: 'column',
                    height: '100%',
                    width: '25%',
                    marginHorizontal: 0,
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    style={{
                      width: 40,
                      height: 40,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: onlyme ? '#32cd32' : 'white',
                      borderRadius: 30,
                      shadowColor: 'black',
                      shadowOffset: {width: 0, height: 1},
                      shadowOpacity: 0.2,
                      shadowRadius: 1.41,
                      elevation: 5,
                    }}
                    onPress={() => {
                      this.setState({
                        onlyme: true,
                        friends: false,
                        Public: false,
                      });
                    }}>
                    <Icon name="location" size={25} color="green" />
                  </TouchableOpacity>

                  <View
                    style={{
                      backgroundColor: 'white',
                      height: '30%',
                      width: '100%',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: responsiveFontSize(1.5),
                        color: '#7e7a7a',
                      }}>
                      only me
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    left: -10,
                    flexDirection: 'column',
                    height: '100%',
                    width: '20%',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    top: 0,
                  }}>
                  <TouchableOpacity
                    style={{
                      width: 40,
                      height: 40,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: friends ? '#32cd32' : 'white',
                      borderRadius: 30,
                      shadowColor: 'black',
                      shadowOffset: {width: 0, height: 1},
                      shadowOpacity: 0.2,
                      shadowRadius: 1.41,
                      elevation: 5,
                    }}
                    onPress={() => {
                      this.setState({
                        onlyme: false,
                        friends: true,
                        Public: false,
                      });
                    }}>
                    <FIcon name="user-friends" size={20} color="green" />
                  </TouchableOpacity>

                  <View
                    style={{
                      top: 0,
                      backgroundColor: 'white',
                      height: '30%',
                      width: '100%',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: responsiveFontSize(1.5),
                        color: '#7e7a7a',
                      }}>
                      Friends
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    left: -15,
                    flexDirection: 'column',
                    height: '100%',
                    width: '20%',
                    marginHorizontal: 0,
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    top: 0,
                  }}>
                  <TouchableOpacity
                    style={{
                      width: 40,
                      height: 40,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: Public ? '#32cd32' : 'white',
                      borderRadius: 30,
                      shadowColor: 'black',
                      shadowOffset: {width: 0, height: 1},
                      shadowOpacity: 0.2,
                      shadowRadius: 1.41,
                      elevation: 5,
                    }}
                    onPress={() => {
                      this.setState({
                        onlyme: false,
                        friends: false,
                        Public: true,
                      });
                    }}>
                    <Icon name="location" size={25} color="#32cd32" />
                  </TouchableOpacity>

                  <View
                    style={{
                      top: 0,
                      backgroundColor: 'white',
                      height: '30%',
                      width: '100%',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: responsiveFontSize(1.5),
                        color: '#7e7a7a',
                      }}>
                      Public
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <View
              style={{
                marginTop: responsiveHeight(12),
                backgroundColor: 'white',
                height: '12%',
                padding: 2,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: '#32cd32',
                  height: '90%',
                  width: '100%',
                  borderRadius: 15,
                }}>
                <TouchableOpacity
                  style={{
                    width: '40%',
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                  }}>
                  <EIcon name="upload" size={30} color="white" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    width: '60%',
                    alignSelf: 'center',
                    marginHorizontal: 20,
                  }}
                  onPress={async () => {
                    await News(
                      news_descriptions,
                      file,
                      onlyme,
                      friends,
                      Public,
                      uploading_time,
                      like,
                      favorite,
                      comments,
                    ).then(() => {
                      setTimeout(async () => {
                        if (this.state.videoPath !== null) {
                          await this.upload_Video();
                        } else {
                          await this.Upload_Image();
                        }
                      }, 10000);
                      //   // await this.Upload_Image();
                      this.props.navigation.navigate('Home');
                    });
                  }}>
                  <Text style={{fontSize: 16, color: 'white'}}>UPLOAD</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      );
    }
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>{this.hello()}</View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB',
  },
  formContent: {
    flexDirection: 'row',
    marginTop: 30,
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    borderBottomWidth: 1,
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    margin: 10,
  },
  icon: {
    width: 30,
    height: 30,
  },
  iconBtnSearch: {
    alignSelf: 'center',
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  inputIcon: {
    marginLeft: 15,
    justifyContent: 'center',
  },
  notificationList: {
    marginTop: 20,
    padding: 10,
  },
  notificationBox: {
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 5,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    borderRadius: 10,
  },
  image: {
    width: 45,
    height: 45,
    borderRadius: 20,
    marginLeft: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    marginLeft: 10,
    alignSelf: 'center',
  },
  nameTxt: {
    // marginLeft: 15,
    fontWeight: '600',
    color: '#222',
    fontSize: responsiveFontSize(2.4),
    width: 170,
  },
});
