import React from 'react';
import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import 'react-native-gesture-handler';

import ActionButton from 'react-native-circular-action-menu';
import {createStackNavigator} from 'react-navigation-stack';
import {
  createDrawerNavigator,
  DrawerNavigatorItems,
} from 'react-navigation-drawer';
import {
  createBottomTabNavigator,
  createMaterialTopTabNavigator,
} from 'react-navigation-tabs';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FA from 'react-native-vector-icons/FontAwesome';
import {
  Platform,
  Dimensions,
  Text,
  View,
  ScrollView,
  Image,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import Login from '../Components/Login/Login';
import AuthLoadingScreen from '../Components/Login/AuthLoadingScreen';
import Signup from '../Components/Login/Signup';
import CommunityBoard from '../Components/Home/CommunityBoard';
import GoodNews from '../Components/Home/GoodNews';
import Watch from '../Components/Home/Watch';
import ChatList from '../Components/Message/ChatList';
import Chat from '../Components/Message/Chat';
import Notification from '../Components/Notification/Notification';
import Settings from '../Components/Settings/Settings';
import UploadEvents from '../Components/Upload/UploadEvent';
import UploadNews from '../Components/Upload/UploadNews';
import UploadVideo from '../Components/Upload/UploadVideo';
import CompanyProfile from '../Components/CompanyProfile/CompanyProfile';
import FamilyList from '../Components/Family/FamilyList';
import FriendsList from '../Components/Friends/FriendList';
import InviteFriend from '../Components/Friends/InviteFriend';
import GreatNews from '../Components/GreatNews/GreatNews';
import Video from '../Components/Video/Video';
import GroupList from '../Components/Groups/GroupsList';
import Aboutus from '../Components/Aboutus/Aboutus';
import BuildTheHouse from '../Components/Aboutus/BuildTheHouse';
import privacyPolicy from '../Components/Privacypolicy/Privacypolicy';
import UserProfile from '../Components/UserProfile/UserProfile';
import CustomDrawer from './CustomDrawer';
import Feed from '../Components/CompanyProfile/Feed';
import Gallary from '../Components/CompanyProfile/Gallary';
import ClientOfWeek from '../Components/CompanyProfile/ClientOfWeek';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import Family from '../Components/Family/Family';
import Forms from '../Components/Forms/Forms';
import AddCompany from '../Components/CompanyProfile/AddCompany';
import EditCompany from '../Components/CompanyProfile/EditCompany';
import AddUserlist from '../Components/Adduser/AddUserList';
import AddGroup from '../Components/Groups/AddGroup';
import EditGroup from '../Components/Groups/EditGroup';
import GroupDetails from '../Components/Groups/GroupDetails';
import UserGallery from '../Components/UserProfile/UserGallery';
import InviteToFamily from '../Components/Family/InviteFriendsTofamily';
import MainAuth from '../Components/Login/MainAuth';
import TermsandCondition from '../Components/Login/TermsandConditions';
import House from '../Components/Login/House';
import CommunityEvent from '../Components/Home/CommunityEvent';
import JobInfo from '../Components/Home/JobInfo';
import AppWorking from '../Components/Login/AppWorking';
import CommunityGuide from '../Components/Login/CommunityGuide';
import VisionBoard from '../Components/UserProfile/VisionBoard';
import AppWorking1 from '../Components/Login/AppWorking1';
import House1 from '../Components/Login/House1';
import FriendsProfile from '../Components/UserProfile/FriendsProfile';
import LearnMore from '../Components/Home/LearnMore';
import MoreVisionBoard from '../Components/UserProfile/MoreVisionBoard';
import MoreGallery from '../Components/UserProfile/MoreGallery';

import TCI from '../Components/Login/TermsandConditionIni';
import House1Ini from '../Components/Login/House1Ini';
import AppUser from '../Components/Friends/AppUser';
import Animation from '../Components/Login/Animation'

var width = Dimensions.get('window').width;
console.disableYellowBox = true;

const FriendStack = createStackNavigator({
  FriendsList: FriendsList,
  FriendsProfile: FriendsProfile,
  AppUser: AppUser,
  Chat: Chat,
});
const AuthStack = createStackNavigator({
  Animation:Animation,
  Login: Login,
  Signup: Signup,
  MainAuth: MainAuth,
  TCI: TCI,
  House1Ini: House1Ini,
});
const FamilyStack = createStackNavigator({
  FamilyList: FamilyList,
  Family: Family,
  InviteToFamily: InviteToFamily,
});
const UserProfileStack = createStackNavigator({
  UserProfile: UserProfile,
  UserGallery: UserGallery,
  Family: Family,
  VisionBoard: VisionBoard,
  MoreVisionBoard: MoreVisionBoard,
  MoreGallery: MoreGallery,
});
const CompanyStack = createStackNavigator({
  Feed: Feed,
  EditCompany: EditCompany,
  AddCompany: AddCompany,
  AddUserlist: AddUserlist,
});
const GroupStack = createStackNavigator({
  Groups: GroupList,
  GroupDetails: GroupDetails,
  EditGroup: EditGroup,
  AddGroup: AddGroup,
  AddUserlist: AddUserlist,
});

const CommunityStack = createStackNavigator({
  CommunityEvent: CommunityEvent,
  JobInfo: JobInfo,
});

const ChatStack = createStackNavigator({
  ChatList: ChatList,
  Chat: Chat,
});

const WatchStack = createStackNavigator({
  Watch: Watch,
  LearnMore: LearnMore,
});
WatchStack.navigationOptions = ({navigation}) => {
  let tabBarVisible = true;

  let routeName = navigation.state.routes[navigation.state.index].routeName;

  if (routeName == 'LearnMore') {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};

const HomeTabs = createMaterialTopTabNavigator(
  {
    Home: {
      screen: GoodNews,
      navigationOptions: {
        tabBarLabel: 'Good News',
      },
    },
    Watch: {
      screen: WatchStack,
      navigationOptions: {
        tabBarLabel: 'Watch',
      },
    },

    CommunityBoard: {
      screen: CommunityBoard,
      navigationOptions: {
        tabBarLabel: 'Community',
      },
    },
  },
  {
    swipeEnabled: false,
    tabBarOptions: {
      activeTintColor: '#32cd32',
      inactiveTintColor: 'gray',

      indicatorStyle: {
        backgroundColor: '#32cd32',
      },
      style: {
        width: '100%',
        position: 'absolute',
        zIndex: 1,
        backgroundColor: '#ffffff',
        marginTop: Platform.OS === 'android' ? 65 : 110,
      },
    },
  },
);

const CompanyProfileTabs = createMaterialTopTabNavigator(
  {
    Feed: {
      screen: Feed,
      navigationOptions: {
        tabBarLabel: 'Feed',
      },
    },
    Gallary: {
      screen: Gallary,
      navigationOptions: {
        tabBarLabel: 'Gallary',
      },
    },

    ClientOfWeek: {
      screen: ClientOfWeek,
      navigationOptions: {
        tabBarLabel: 'Client',
      },
    },
  },
  {
    swipeEnabled: false,
    tabBarOptions: {
      activeTintColor: '#32cd32',
      inactiveTintColor: 'gray',

      indicatorStyle: {
        backgroundColor: '#32cd32',
      },
      style: {
        width: '100%',
        position: 'absolute',
        zIndex: 1,
        backgroundColor: '#ffffff',
        marginTop: responsiveHeight(85),
      },
    },
  },
);

const TabsNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeTabs,
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon: ({tintColor}) => (
          <Icon name="home" color={tintColor} size={24} />
        ),
      },
    },
    Messages: {
      screen: ChatStack,
      navigationOptions: () => ({
        tabBarIcon: ({tintColor}) => (
          <Ionicons name="ios-chatboxes" color={tintColor} size={24} />
        ),
      }),
    },
    UploadEvents: {
      screen: Forms,
      navigationOptions: ({navigation}) => ({
        tabBarLabel: ' ',
        mode: 'modal',
        tabBarIcon: () => (
          <View
            style={{
              alignItems: 'center',
              height: 70,
              width: 70,
              borderRadius: 70,
              backgroundColor: '#ffffff',
              marginBottom: 10,
            }}>
            <Icon
              name="pluscircle"
              color={'#32cd32'}
              size={50}
              style={{marginTop: 5}}
            />
          </View>
          // <View style={{
          //     alignItems: 'center', width: 90, height: 90,
          //     borderRadius: 90, backgroundColor: '#ffffff', marginBottom: 5,
          // }}>

          //     <ActionButton buttonColor="#32cd32" position={'center'} outRangeScale='0.75' radius='60' >
          //         <ActionButton.Item buttonColor='#9b59b6' title="New Task" onPress={() => console.log("notes tapped!")}>
          //             <Ionicons name="ios-videocam" style={{  fontSize: 20,height: 22,color: 'white',}} />
          //         </ActionButton.Item>
          //         <ActionButton.Item buttonColor='#3498db' title="Notifications" onPress={() => { }}>
          //             <FA name="newspaper-o" style={{  fontSize: 20,height: 22,color: 'white',}} />
          //         </ActionButton.Item>
          //         <ActionButton.Item buttonColor='#1abc9c' title="All Tasks" onPress={() => { }}>
          //             <FA name="calendar" style={{  fontSize: 20,height: 22,color: 'white',}} />
          //         </ActionButton.Item>
          //     </ActionButton>

          // </View>
        ),
      }),
    },
    Notification: {
      screen: Notification,
      navigationOptions: () => ({
        tabBarIcon: ({tintColor}) => (
          <FA name="bell-o" color={tintColor} size={24} />
        ),
      }),
    },
    Settings: {
      screen: Settings,
      navigationOptions: () => ({
        tabBarIcon: ({tintColor}) => (
          <Ionicons name="ios-settings" color={tintColor} size={24} />
        ),
      }),
    },
  },
  {
    tabBarOptions: {
      activeTintColor: '#32cd32',
      inactiveTintColor: 'gray',
      style: {
        backgroundColor: '#ffffff',
        height: 55,
      },
    },
  },
);

const AppDrawerNavigator = createDrawerNavigator(
  {
    Homedrawer: {
      screen: TabsNavigator,
    },
    Groups: {
      screen: GroupStack,
    },
    UserProfile: {
      screen: UserProfileStack,
    },
    Friend: {
      screen: FriendStack,
    },
    InviteFriend: {
      screen: InviteFriend,
    },
    CompanyProfile: {
      screen: CompanyStack,
    },
    Family: {
      screen: FamilyStack,
    },
    Video: {
      screen: Video,
    },
    GreatNews: {
      screen: GreatNews,
    },
    Aboutus: {
      screen: Aboutus,
    },
    BuildTheHouse: {
      screen: BuildTheHouse,
    },
    privacyPolicy: {
      screen: privacyPolicy,
    },
    CommunityStack: {
      screen: CommunityStack,
    },

    TermsandCondition: {screen: TermsandCondition},
    House: {screen: House1},
    AppWorking: {screen: AppWorking1},

    CommunityGuide: {screen: CommunityGuide},
  },
  {
    contentComponent: CustomDrawer,
    drawerWidth: width / 1.25,
  },
);

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppDrawerNavigator,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthLoading',
    },
  ),
);
