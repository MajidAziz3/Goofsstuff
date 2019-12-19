import React from 'react'
import { TouchableOpacity, Image, View, Text, Platform, Dimensions, StyleSheet, ScrollView, ActivityIndicator, TextInput, SafeAreaView } from 'react-native'
import Marker, { Position, ImageFormat } from 'react-native-image-marker'
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
import FA from 'react-native-vector-icons/FontAwesome';
import { getData, uploadImage, uploadUserImage } from '../../Backend/Utility';
import { _retrieveData } from '../../Backend/AsyncStore/AsyncFunc';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import EIcon from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import AntDesign from 'react-native-vector-icons/AntDesign';
import ImagePicker from 'react-native-image-picker';
import Entypo from 'react-native-vector-icons/Entypo';


import Picker from 'react-native-image-picker'
import { uploadVisionImage } from '../../Backend/Utility';
const icon = require('../../Assets/icon.jpeg')
// const iconTP = require('./tpimage.png')
const bg = require('../../Assets/bg.png')
const base64Bg = require('../../Assets/base64bg').default

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20
    },
    op: {

        justifyContent: 'flex-end',
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: '#ffffff',
        padding: 10
    },
    btn: {
        padding: 10,
        borderRadius: 6,
        backgroundColor: '#32cd32',
        margin: 5,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15

    },
    btnOp: {
        padding: 10,
        borderRadius: 3,
        backgroundColor: '#1A1AA1',
        margin: 5,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: 15,
        color: 'white'
    },
    preview: {
        width,
        height: 300,
        flex: 1,
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
        marginTop: responsiveHeight(1.2),
        marginLeft: '85%',
        position: 'absolute',
      },
      welcome: {
        fontSize: responsiveFontSize(3.8),
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 7,
      },
})

const textBgStretch = ['', 'stretchX', 'stretchY']

export default class Login extends React.Component {
    static navigationOptions = {
        header: null,
      };
    constructor(props) {
        super(props)
        this.state = {
            uri: '',
            image: bg,
            marker: icon,
            markImage: false,
            base64: false,
            useTextShadow: true,
            useTextBgStyle: true,
            textBgStretch: 0,
            saveFormat: ImageFormat.png,
            loading: false,
            uploadText: '',
            preview:false,
            data_user: [],
        }
    }

    componentDidMount = async () => {
        await _retrieveData('user').then(async result => {
          await getData('users', result).then(res =>
            this.setState({
              data_user: res,
              loading: false,
            }),
          );
        });
      };

    _switch = () => {
        this.setState({
            markImage: !this.state.markImage
        })
    }

    _switchBg = () => {
        this.setState({
            base64: !this.state.base64
        }, () => {
            this.setState({
                image: this.state.base64 ? base64Bg : bg
            })
        })
    }

    _switchBase64Res = () => {
        this.setState({
            saveFormat: this.state.saveFormat === ImageFormat.base64 ? ImageFormat.png : ImageFormat.base64
        })
    }
    async Upload_Image() {
        let iteratorNum = 0;
        await _retrieveData('user').then(async item => {
            var fileName = this.state.uri.replace(/^.*[\\\/]/, '')
          await uploadVisionImage(
            this.state.uri,
            'image/png',
            fileName,
            fileName,
            'VisionBoard',
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
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ marginBottom: 10 }}>
                <Text style={styles.welcome}>Vision Board</Text>
                <Ionicon
                  name="ios-menu"
                  size={35}
                  color={'#32cd32'}
                  onPress={() => this.props.navigation.openDrawer()}
                  style={styles.menu}
                />
                    <Image
                      source={{
                        uri: this.state.data_user.profile_picture,
                      }}
                      style={styles.menu1}
                    />
                  
              </View>
                <ScrollView style={styles.container}>


                    <View>
                        <TouchableOpacity
                            style={[styles.btn, { backgroundColor: '#32cd32' }]}
                            onPress={() => this._pickImage('image')}
                        >
                            <View style={{ flexDirection: 'row' }}>
                                <FA name="upload" size={18} color='white' style={{ marginRight: 10 }} />
                                <Text style={styles.text}>Upload Image</Text>
                            </View>
                        </TouchableOpacity>

                    </View>
                    <View style={{ borderRadius: 10, width: '96%', backgroundColor: "", height: responsiveHeight(12), justifyContent: 'space-between', elevation: 1, alignSelf: 'center' }}>
                        <TextInput
                            multiline={true}
                            numberOfLines={6}
                            onChangeText={(text) => this.setState({ uploadText: text })}
                            style={{ textAlignVertical: "top", fontSize: responsiveFontSize(2), height: '100%', width: '100%', paddingHorizontal: 10 }}
                            placeholder={'Post Something'} />

                    </View>
                    <View style={styles.op}>

                        <TouchableOpacity
                            style={styles.btn}
                            onPress={() => {this._markByPosition(Position.center),
                            this.setState({preview:true})}}
                        >
                            <View style={{ flexDirection: 'row' }}>
                                <FA name="eye" size={18} color='white' style={{ marginRight: 10 }} />
                                <Text style={styles.text}>Preview</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.btn} onPress={()=>{

                            if(this.state.preview == false)
                            {
                                alert('Please preview image first')
                            }
                            else
                            {
                                this.Upload_Image()
                            }
                            
                        }}>
                            <View style={{ flexDirection: 'row' }}>
                                <FA name="save" size={18} color='white' style={{ marginRight: 10 }} />
                                <Text style={styles.text}>Save</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View
                        style={{ flex: 1 }}
                    >
                        {
                            this.state.show
                                ? <Image source={{ uri: this.state.uri }} resizeMode='contain' style={styles.preview} />
                                : null
                        }
                    </View>
                </ScrollView>
                {
                    this.state.loading &&
                    <View style={{
                        position: 'absolute',
                        width,
                        height,
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <ActivityIndicator size='large' />
                        <Text style={{ color: 'white' }}>loading...</Text>
                    </View>
                }
            </SafeAreaView>

        )
    }

    _showLoading = () => {
        this.setState({
            loading: true
        })
    }

    _markByPosition = (type) => {
        this.setState({type:type})
        this._showLoading()
        if (this.state.markImage) {
            Marker.markImage({
                src: this.state.image,
                markerSrc: this.state.markImage,
                position: type,
                scale: 1,
                markerScale: 1,
                quality: 100,
                saveFormat: this.state.saveFormat
            }).then((path) => {
                this.setState({
                    uri: this.state.saveFormat === ImageFormat.base64 ? path : Platform.OS === 'android' ? 'file://' + path : path,
                    show: true,
                    loading: false
                })
            }).catch((err) => {
                alert(err)
                this.setState({loading:false})
            })
        } else {
            Marker.markText({
                src: this.state.image,
                text: this.state.uploadText,
                position: type,
                color: '#000000',
                fontName: 'Arial-BoldItalicMT',
                fontSize: 150,
                fontWeight: 'bold',
                scale: 1,
                quality: 100,
                saveFormat: this.state.saveFormat
            })
                .then((path) => {
                    this.setState({
                        show: true,
                        uri: this.state.saveFormat === ImageFormat.base64 ? path : Platform.OS === 'android' ? 'file://' + path : path,
                        loading: false
                    })
                }).catch((err) => {
                    alert(err)
                    this.setState({loading:false})
                })
        }
    }

    _mark = () => {
        this._showLoading()
        if (this.state.markImage) {
            Marker.markImage({
                src: this.state.image,
                markerSrc: this.state.marker,
                X: 100,
                Y: 150,
                scale: 1,
                markerScale: 0.5,
                quality: 100,
                saveFormat: this.state.saveFormat
            }).then((path) => {
                this.setState({
                    uri: this.state.saveFormat === ImageFormat.base64 ? path : Platform.OS === 'android' ? 'file://' + path : path,
                    show: true,
                    loading: false
                })
            }).catch((err) => {
            })
        } else {
            Marker.markText({
                src: this.state.image,
                text: 'text marker \n muiltline text',
                X: 30,
                Y: 30,
                color: '#FF0',
                fontName: 'Arial-BoldItalicMT',
                fontSize: 44,
                shadowStyle: this.state.useTextShadow ? {
                    dx: 10.5,
                    dy: 20.8,
                    radius: 20.9,
                    color: '#0000FF'
                } : null,
                textBackgroundStyle: this.state.useTextBgStyle ? {
                    type: textBgStretch[this.state.textBgStretch],
                    paddingX: 10,
                    paddingY: 10,
                    color: '#0f0'
                } : null,
                scale: 1,
                quality: 100,
                saveFormat: this.state.saveFormat
            }).then((path) => {
                this.setState({
                    show: true,
                    uri: this.state.saveFormat === ImageFormat.base64 ? path : Platform.OS === 'android' ? 'file://' + path : path,
                    loading: false
                })
            }).catch((err) => {
            })
        }
    }

    _pickImage = (type) => {
        let options = {
            title: 'title',
            takePhotoButtonTitle: 'camera',
            chooseFromLibraryButtonTitle: 'gallery',
            cancelButtonTitle: 'cancel',
            quality: 0.5,
            mediaType: 'photo',
            maxWidth: 2000,
            noData: true,
            maxHeight: 2000,
            dateFormat: 'yyyy-MM-dd HH:mm:ss',
            storageOptions: {
                skipBackup: true,
                path: 'imagePickerCache'
            },
            allowsEditing: false
        }
        Picker.showImagePicker(options, (response) => {
            if (response.didCancel) {
            } else if (response.error) {
            } else if (response.customButton) {
                // this.showCamera();
            } else {
                // You can display the image using either:
                // const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};
                const uri = response.uri
                this.setState({fileName:response.fileName})
                if (type === 'image') {
                    this.setState({
                        image: uri
                    })
                } else {
                    this.setState({
                        marker: uri
                    })
                }
            }
        })
    }
}