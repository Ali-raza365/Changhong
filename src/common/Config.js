import React from 'react';
import { Platform, Dimensions } from 'react-native';
import {
    widthPercentageToDP,
    heightPercentageToDP,
} from 'react-native-responsive-screen';

// import AntIcon from 'react-native-vector-icons/AntDesign';
// import FontistoIcon from 'react-native-vector-icons/Fontisto';
// import MatComIcon from 'react-native-vector-icons/MaterialCommunityIcons';
// import IonIcon from 'react-native-vector-icons/Ionicons';
// import FeatherIcon from 'react-native-vector-icons/Feather';
// import MatIcons from 'react-native-vector-icons/MaterialIcons';

//CONSTANTS USED IN APP
export const APP_NAME = 'ChangHong';
export const PLATFORM = "android";
export const WP = widthPercentageToDP;
export const HP = heightPercentageToDP;
export const MOBILE_WIDTH = Dimensions.get('window').width;
export const MOBILE_HEIGHT = Dimensions.get('window').height;
export const RADIUS = 3;
export const SPACING = 12;
export const SPINNER_SIZE = 32;
export const FONT = 'TenorSans';
export const BUTTON_HEIGHT = 5;
export const INPUT_HEIGHT = 6;
export const SCREEN_ICON_SIZE = 6;
export const HOME_TAB_ICON_SIZE = 6;
export const TAB_ICON_SIZE = 6;

export const light = {
    name: 'light',
    background: '#FDFDFD',
    inputBackground: '#00000011',
    messageLeftBackground: '#F6F6F7',
    messageRightBackground: '#E7D6F1',

    text: 'black',
    textSecondry: '#00000033',
    textPlaceholder: '#00000055',

    purple: '#9D00FF',
    primary: 'black',
    card: '#FFFFFF',
    border: '#F2F2F2',
    notification: 'grey',
};
export const dark = {
    name: 'dark',
    background: '#242225',
    inputBackground: '#ffffff11',
    messageLeftBackground: '#2E2C30',
    messageRightBackground: '#4A4050',

    text: 'white',
    textSecondry: '#ffffff44',
    textPlaceholder: '#ffffff66',

    purple: '#9D00FF',

    primary: 'white',

    card: '#3D3B3E',
    border: '#4D4B4D',
    notification: 'grey',
};

export const COLOR = {
    whiteColor: '#ffffff',
    primary: '#1A0F66',
    primaryOrange: '#E3562A',
    offWhite: '#F6F6F6',
    offBlack: '#78746D',
    borderColor: 'gray',
    blackColor: '#000000',
    lightGrey: '#BEBAB3',
    deepBlue: '#2E3A59',
    headerBlack: '#3C3A36',
    setup2: '#E3DDDD',
    offblue: '#F3F8FF',
    gray: '#6C6C6C',
    darkGray: '#767676',
    red: '#BE0000',
    success: '#0F993E',
    DarkRed: '#91150D',
};


export const ICON = {
    task: require('../assets/images/tasks1.png'),
}
export const IMAGE = {
    map: require('../assets/images/splash.jpg'),
    // map: require('../assets/images/map.png'),
    newlogo: require('../assets/images/splash.jpg'),
    Chiq_logo: require('../assets/images/splash.jpg'),
    new_Chiq_logo: require('../assets/images/new-chiq-logo.png'),
    // Chiq_logo: require('../assets/images/CHiQ_Logo1.png'),
    ac: require('../assets/images/air-conditioner.png'),
    fridge: require('../assets/images/fridge.png'),
    earth: require('../assets/images/splash.jpg'),
    // earth: require('../assets/images/earth.jpg'),
    logo: require('../assets/images/Logo_New.png')

    //     splash_icon: require('../assets/images/logo.png'),
    //     intro_backimage: require('../assets/images/intro_background.png'),
    //     intr0_1: require('../assets/images/intro_1.png'),
    //     intr0_2: require('../assets/images/intro_2.png'),
    //     intr0_3: require('../assets/images/intro_3.png'),
    //     intr0_4: require('../assets/images/intro_4.png'),
    //     logo_with_label: require('../assets/images/logoLable.png'),
    //     facebook_logo: require('../assets/images/facebook.png'),
    //     twitter_logo: require('../assets/images/twitter.png'),
    //     back_btn: require('../assets/images/back_btn.png'),
    //     otp_logo: require('../assets/images/OTP.png'),
    //     otp_background: require('../assets/images/OTPback.png'),
    //     Emj_happy: require('../assets/images/happy.png'),
    //     avatar: require('../assets/images/face.png'),
    //     camera: require('../assets/images/camera.png'),
    //     cameraIcon: require('../assets/images/camerIcon.png'),
    //     profileImage: require('../assets/images/profile.png'),
    //     tick: require('../assets/images/check.png'),
    //     nextBtn: require('../assets/images/nextBtn.png'),
    //     closeIcon: require('../assets/images/closeIcon.png'),
    //     image_icon: require('../assets/images/picture.png'),
    //     video_icon: require('../assets/images/media.png'),
    //     gif_icon: require('../assets/images/gif.png'),
    //     link_icon: require('../assets/images/link.png'),
    //     logowhite: require('../assets/images/logoWhite.png'),
};

//FONT SIZES USED IN APP
export const FONT_SIZES = {
    h1: 28,
    h2: 22,
    h3: 18,
    info_1: 16,
    info_2: 14,
};

//FONT SIZES USED IN APP
export const TEXT_SIZES = {
    h1: 7,
    h2: 6,
    h3: 5,
    info_1: 4,
    info_2: 3.5,
};

export const SPACING_PERCENT = 5;
