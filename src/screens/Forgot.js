import React, { useEffect, useState } from 'react';

import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Image,
    TouchableOpacity,
    BackHandler,
} from 'react-native';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconMaterialC from 'react-native-vector-icons/MaterialCommunityIcons';
import Fonts from '../assets/fonts';
import { connect } from 'react-redux';
import Input from '../components/InputField';
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
import HeaderSearchComponent from '../components/HeaderSearchComponent';
import HeaderComponent from '../components/HeaderComponent';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Tabs from '../components/Tabs';
import SearchInput from '../components/SearchComponent';
import { ActivityIndicator } from 'react-native-paper';
import { isValidEmail } from '../utils/Validation';
import * as ApiServices from '../services/index';
import LoadingComponent from '../components/LoadingComponent';



const Forgot = ({ navigation }) => {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState("");
    function validate() {
        if (email.length == 0) {
            setEmailError('Please enter email');
            return false;
        }
        if (isValidEmail(email) === false) {
            setEmailError('Please enter valid email');
            return false;
        }
        return true;
    }


    function onLoginPress() {
        setEmailError('');
        setLoading(true)
        ApiServices._ForgotPasswordApi(email)
            .then((res) => {
                console.log('res', res)
                if (res.errors) {
                    alert(res.errors)
                }
                if (res.success) {
                    alert(res.success.message)
                }
            })
            .catch((err) => {
                console.log('err', err)

            })
            .finally(() => {
                setLoading(false)

            })

    }
    if (loading) {
        return <LoadingComponent />
    }
    return (
        <View style={{ flex: 1, backgroundColor: COLOR.whiteColor, justifyContent: 'flex-start', alignItems: 'center' }}>
            <HeaderComponent
                navigation={navigation}
                title="Forgot Password"
                // onRest={true}
                containerStyle={{ backgroundColor: COLOR.primary, position: "absolute", top: 0, width: "100%", zIndex: 10 }}
                titleStyle={{ color: COLOR.whiteColor }}
                iconStyle={{ color: COLOR.whiteColor }}
            />
            <View style={{ margin: WP(SPACING_PERCENT), marginTop: WP(30) }}>
                <Text style={{ fontSize: WP(7), fontWeight: 'bold' }}>Forgot your password</Text>
                <Text style={{ fontSize: WP(5), color: '#969696' }}>
                    Enter your email address to forgot your password...
                </Text>
            </View>
            <View style={{ padding: WP(SPACING_PERCENT), paddingTop: 0, width: "100%", }}>
                <Input
                    containerStyle={{ width: "100%", }}
                    // InputIcon="person-outline"
                    placeholder={'email'}
                    keyboardType="email-address"
                    onChangeText={(txt) => {
                        setEmailError('')
                        setEmail(txt)
                    }}

                    editable={!loading}
                    value={email}
                    errorMessage={emailError}
                />
            </View>
            <TouchableOpacity
                disabled={loading}
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
                    width: "95%",
                    position: 'absolute',
                    bottom: WP(5),
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                {loading ? (
                    <ActivityIndicator animating={true} color={'white'} size="small" />
                ) : (
                    <Text
                        style={{
                            fontSize: WP(4),
                            fontFamily: Fonts.Bold,
                            color: 'white',
                        }}>
                        Forgot Password
                    </Text>
                )}
            </TouchableOpacity>
        </View>
    );
};
const styles = StyleSheet.create({
    Container: {
        height: '100%',
        width: '100%',
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
    },
})
export default Forgot;
