import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    Image,
    ActivityIndicator,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Input from '../components/InputField';
import Fonts from '../assets/fonts';
import { connect, useDispatch, useSelector } from 'react-redux';
import { setUser } from '../store/actions/userSession';
import * as AuthServices from '../services';
import preferences from '../common/preferences';
import { translate } from '../language';
import {
    COLOR,
    IMAGE,
    TEXT_SIZES,
    MOBILE_WIDTH,
    SPACING_PERCENT,
    WP,
    HP,
    APP_NAME,
    RADIUS,
    TAB_ICON_SIZE,
    FONT_SIZES,
} from '../common/Config';
import { _Login } from "../store/actions/userSession";
import { isValidEmail } from "../utils/Validation";

import HeaderComponent from '../components/HeaderComponent';

const Login = (props) => {
    const { navigation, } = props;
    const { login_loading } = useSelector(state => state.userSession)
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    function validate() {
        if (email.length == 0) {
            setEmailError('Please enter email');
            return false;
        }
        if (isValidEmail(email) === false) {
            setEmailError('Please enter valid email');
            return false;
        }
        if (password.length == 0) {
            setPasswordError('Please enter password');
            return false;
        }
        if (password.length < 6) {
            setPasswordError('passward must be at least 6 characters');
            return false;
        }

        return true;
    }

    function onLoginPress() {
        setEmailError('');
        setPasswordError('');
        dispatch(_Login(email, password, navigation));
    }

    return (
        <ScrollView style={styles.container}>
            {/* headers */}
            <HeaderComponent NoIcon={true} title="Sign In" navigation={navigation} />
            {/* Logo  */}
            <View style={{ overflow: 'hidden', width: "90%", marginLeft: "auto", marginRight: "auto" }}>
                <Image source={IMAGE.Chiq_logo} style={{ width: "100%", height: HP(13) }} resizeMode="center" />
            </View>
            {/* Welcome Text  */}
            <View style={{ margin: WP(SPACING_PERCENT) }}>
                <Text style={{ fontSize: WP(7), fontWeight: 'bold' }}>Welcome</Text>
                <Text style={{ fontSize: WP(5), color: '#969696' }}>
                    Enter your phone number and email {'\n'}address to sign in...
                </Text>
            </View>
            {/* inputs contaner */}
            <View style={{ padding: WP(SPACING_PERCENT), paddingTop: 0 }}>
                <Input
                    InputIcon="person-outline"
                    placeholder={'email'}
                    keyboardType="email-address"
                    onChangeText={(txt) => {
                        setEmailError('')
                        setEmail(txt)
                    }}
                    editable={!login_loading}
                    value={email}
                    errorMessage={emailError}
                />
                <Input
                    InputIcon="lock-closed-outline"
                    placeholder={'Password'}
                    secureTextEntry={true}
                    onChangeText={(txt) => {
                        setPasswordError('')
                        setPassword(txt)
                    }}
                    containerStyle={{
                        marginTop: WP(SPACING_PERCENT * 1),
                    }}
                    editable={!login_loading}
                    value={password}
                    errorMessage={passwordError}
                />
                <View
                    style={{
                        marginTop: WP(SPACING_PERCENT),
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                    }}>
                    <Text
                        onPress={() => {
                            navigation.navigate("Forgot")
                        }}
                        style={{
                            fontSize: WP(4),
                            fontFamily: Fonts.Bold,
                            color: COLOR.primary,
                        }}>
                        FORGOT PASSWORD?
                    </Text>
                </View>
            </View>

            {/* button  */}
            <TouchableOpacity
                disabled={login_loading}
                onPress={() => {
                    if (validate()) {
                        // navigation.navigate('bottomTab');
                        onLoginPress()
                    }
                }}
                style={{
                    // marginTop: WP(SPACING_PERCENT * 2),
                    margin: WP(SPACING_PERCENT * 1),
                    backgroundColor: COLOR.primary,
                    height: WP(SPACING_PERCENT * 3),
                    borderRadius: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                {login_loading ? (
                    <ActivityIndicator animating={true} color={'white'} size="small" />
                ) : (
                    <Text
                        style={{
                            fontSize: WP(4),
                            fontFamily: Fonts.Bold,
                            color: 'white',
                        }}>
                        Sign In
                    </Text>
                )}
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('SignUp');
                }}
                style={{
                    margin: WP(SPACING_PERCENT * 1),
                    // marginTop: WP(SPACING_PERCENT * 1),
                    color: COLOR.primary,
                    height: WP(SPACING_PERCENT * 3),
                    borderRadius: 10,
                    alignItems: 'center',
                    borderWidth: 0.7,
                    borderColor: 'blue',
                    justifyContent: 'center',
                }}>
                <Text
                    style={{
                        color: 'blue',
                        fontSize: WP(4),
                        fontFamily: Fonts.Bold,
                    }}>
                    Register
                </Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    headerContainer: {
        flexDirection: 'row',
        padding: WP(SPACING_PERCENT),
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    headerText: {
        width: '100%',
        textAlign: 'center',
        fontSize: WP(SPACING_PERCENT),
        color: COLOR.primary,
        marginLeft: WP(-7),
        fontWeight: 'bold',
    },
});


export default Login;
