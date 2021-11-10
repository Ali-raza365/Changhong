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
    ActivityIndicator
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Input from '../components/InputField';
import Fonts from "../assets/fonts";
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from "../store/actions/userSession";
import * as AuthServices from '../services'
import preferences from '../common/preferences';
import { translate } from '../language';
import Icon from 'react-native-vector-icons/Ionicons';
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
    FONT_SIZES
} from '../common/Config';
import { assets } from '../../react-native.config';
import { _Register } from "../store/actions/userSession";

import HeaderComponent from '../components/HeaderComponent';
import { isValidEmail, } from '../utils/Validation';
import DropDownPicker from 'react-native-dropdown-picker';


const SignUp = (props) => {
    // console.log("sdasdas")
    const { navigation, } = props;
    const { register_loading } = useSelector(state => state.userSession)
    const dispatch = useDispatch()

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'FSM', value: '1' },
        // { label: 'TRAINER', value: '2' },
        { label: 'BUSINESS OWNER', value: '3' },
        // { label: 'DISPLAY', value: '4' }
    ]);

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [card, setCard] = useState('')
    const [password, setPassword] = useState('')

    const [usernameError, setUsernameError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [phoneError, setPhoneError] = useState('')
    const [cardError, setCardError] = useState('')



    function validate() {
        if (username.length == 0) {
            setUsernameError('Please enter username');
            return false;
        }
        if (email.length == 0) {
            setEmailError('Please enter email');
            return false;
        }
        if (isValidEmail(email) === false) {
            setEmailError('Please enter valid email');
            return false;
        }
        if (card.length == 0) {
            setCardError('Please enter CNIC');
            return false;
        }
        if (phone.length == 0) {
            setPhoneError('Please enter Phone number');
            return false;
        }
        if (value.length == 0) {
            alert('please select user type');
            return false;
        }
        if (password.length == 0) {
            setPasswordError('Please enter password');
            return false;
        }
        if (password.length < 8) {
            setPasswordError('passward must be at least 8 characters');
            return false;
        }
        return true;
    }

    function onRegisterPress() {
        setEmailError('');
        setPasswordError('');
        let details = {
            name: username,
            email: email,
            phone: phone,
            cnic: card,
            password: password,
            type: +value,
            user_id: value
        }
        dispatch(_Register(details, navigation));
    }


    return (<ScrollView style={styles.container}>
        {/* headers */}
        <HeaderComponent title="Sign Up" navigation={navigation} />
        {/* Welcome Text  */}
        <View style={{ margin: WP(SPACING_PERCENT), }}>
            <Text style={{ fontSize: WP(7), fontWeight: 'bold' }}>Create Account</Text>
            <Text style={{ fontSize: WP(4), color: "#969696", marginTop: WP(SPACING_PERCENT - 2) }}>Enter your Name, Email, password for {"\n"}
                sign up. <Text style={{ color: COLOR.primary }}
                    onPress={() => {
                        navigation.navigate("Login")
                    }}

                >Already have an account</Text>
            </Text>

        </View>
        {/* inputs contaner */}
        <View style={{ padding: WP(SPACING_PERCENT), paddingTop: 0 }}>
            <Input
                InputIcon="person-outline"
                placeholder={'Username'}
                keyboardType="email-address"
                onChangeText={(txt) => {
                    setUsernameError("")
                    setUsername(txt)
                }}
                editable={!register_loading}

                value={username}
                errorMessage={usernameError}
            />
            <Input
                InputIcon="mail-outline"
                containerStyle={{
                    marginTop: WP(SPACING_PERCENT * 1)
                }}
                placeholder={'abc@gmail.com'}
                keyboardType="email-address"
                onChangeText={(txt) => {
                    setEmailError("")
                    setEmail(txt)
                }}
                editable={!register_loading}
                value={email}
                errorMessage={emailError}
            />
            <Input
                InputIcon="card-outline"
                placeholder={'34123-1234567-1'}
                keyboardType="phone-pad"
                onChangeText={(txt) => {
                    setCardError("")
                    setCard(txt)
                }}
                containerStyle={{
                    marginTop: WP(SPACING_PERCENT * 1)
                }}
                editable={!register_loading}
                value={card}
                errorMessage={cardError}
            />
            <Input
                InputIcon="call-outline"
                placeholder={'+92 334 1234123'}
                containerStyle={{
                    marginTop: WP(SPACING_PERCENT * 1)
                }}
                keyboardType='phone-pad'
                onChangeText={(txt) => {
                    setPhoneError("")
                    setPhone(txt)
                }}
                editable={!register_loading}
                value={phone}
                errorMessage={phoneError}
            />
            <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                defaultNull
                placeholder="Select user Type..."
                placeholderStyle={{ fontWeight: 'bold' }}
                containerStyle={{ height: 40, marginTop: WP(SPACING_PERCENT) }}
                itemStyle={{ alignItems: 'center' }}
                labelStyle={{ fontWeight: 'bold', fontSize: 14, color: '#000' }}
                // style={{
                //      borderTopLeftRadius: 10, borderTopRightRadius: 10,
                //      borderBottomLeftRadius: 10, borderBottomRightRadius: 10
                // }}
                // dropDownStyle={{
                //      borderBottomLeftRadius: 20, borderBottomRightRadius: 20
                // }}
                onChangeItem={item => console.log(item.label, item.value)}
            />
            <Input
                InputIcon="lock-closed-outline"
                placeholder={'*********'}
                secureTextEntry={true}
                onChangeText={(txt) => {
                    setPasswordError("")
                    setPassword(txt)
                }}
                containerStyle={{
                    marginTop: WP(SPACING_PERCENT * 1)
                }}
                editable={!register_loading}
                value={password}
                errorMessage={passwordError}
            />
            {/* <View style={{
                    marginTop: WP(SPACING_PERCENT),
                    flexDirection: 'row',
                    justifyContent: 'flex-end'
               }}>
                    <Text style={{
                         fontSize: WP(4),
                         fontFamily: Fonts.Bold,
                         color: COLOR.primary
                    }}>FORGOT PASSWORD?</Text>
               </View> */}
        </View>



        {/* button  */}
        <TouchableOpacity
            disabled={register_loading}
            onPress={() => {
                if (validate()) {
                    // navigation.navigate("bottomTab")
                    onRegisterPress()
                }
            }}
            style={{
                margin: WP(SPACING_PERCENT),
                backgroundColor: COLOR.primary,
                height: WP(SPACING_PERCENT * 3),
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            {register_loading ? (
                <ActivityIndicator animating={true} color={'white'} size='small' />
            ) : (
                <Text style={{
                    fontSize: WP(4),
                    fontFamily: Fonts.Bold,
                    color: 'white'
                }}>Sign Up</Text>
            )}
        </TouchableOpacity>
        <TouchableOpacity

            onPress={() => {
                navigation.navigate("Login")
            }}
            style={{

                margin: WP(SPACING_PERCENT * 1),
                color: COLOR.primary,
                height: WP(SPACING_PERCENT * 3),
                borderRadius: 10,
                alignItems: 'center',
                borderWidth: 0.7,
                borderColor: "blue",
                justifyContent: 'center'
            }}
        >
            <Text style={{
                color: "blue",
                fontSize: WP(4),
                fontFamily: Fonts.Bold,
            }}>Sign In</Text>
        </TouchableOpacity>
    </ScrollView>)
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
});


export default SignUp