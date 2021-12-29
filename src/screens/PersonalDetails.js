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
    TextInput
} from 'react-native';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconMaterialC from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fonts from '../assets/fonts';
import { connect, useDispatch, useSelector } from 'react-redux';
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
import DropDownPicker from 'react-native-dropdown-picker';
import Input from '../components/InputField';

import HeaderComponent from '../components/HeaderComponent';
import { _Withdraw } from '../store/actions/Wallet';
import { ActivityIndicator } from 'react-native-paper';
import * as ApiServices from '../services/index';
import LoadingComponent from '../components/LoadingComponent';



const PersonalDetails = ({ navigation, route }) => {


    const [loading, setLoading] = useState(false)
    const [username, setUsername] = useState("")
    const [cnic, setCnic] = useState('')
    const [card, setCard] = useState('')
    const [iban, setIban] = useState('')

    const [usernameError, setUsernameError] = useState('')
    const [cnicError, setCnicError] = useState('')
    const [cardError, setCardError] = useState('')
    const [ibanError, setIbanError] = useState('')


    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
    ]);

    useEffect(() => {
        getBankList()
        // setLoading(false)
    }, [])

    const getBankList = () => {
        setLoading(true)

        ApiServices._GetBankListApi()
            .then((response) => {
                let arr = [];
                console.log(response)
                if (response.Success) {
                    response.Success.data ?
                        response.Success.data.map(bank => {
                            arr.push({ label: bank.name, value: bank.name })
                            return bank.name;
                        }) : []
                    setItems(arr)
                }
            })
            .catch((error) => {
                console.log(error)
                alert(error)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    const { wallet_Loading } = useSelector(state => state.wallet)
    const dispatch = useDispatch()

    function validate() {
        if (username.length == 0) {
            setUsernameError('Please enter your account name');
            return false;
        }
        if (cnic.length == 0) {
            setCnicError('Please enter account number');
            return false;
        }
        if (card.length == 0) {
            setCardError('Please enter account number');
            return false;
        }
        if (iban.length == 0) {
            setIbanError('Please enter IBAN number');
            return false;
        }
        if (!value) {
            alert('Please select Bank');
            return false;
        }
        return true;
    }

    const onWithdraw = () => {
        console.log("bank", value)
        let details = {
            amount: route.params.amount,
            account_name: username,
            account_number: card,
            payment_type: value,
            cnic_number: cnic,
            iban_no: iban,
        }
        console.log(details)
        dispatch(_Withdraw(details, navigation))
    }



    if (loading) {
        return <LoadingComponent />
    }

    return (
        <View style={{ flex: 1, backgroundColor: COLOR.whiteColor, justifyContent: 'flex-start', }}>
            <HeaderComponent
                navigation={navigation}
                title="Enter your personal details"
                containerStyle={{ backgroundColor: COLOR.primary, position: "absolute", top: 0, width: "100%", zIndex: 10 }}
                titleStyle={{ color: COLOR.whiteColor }}
                iconStyle={{ color: COLOR.whiteColor }}
            />
            <View style={{ marginTop: WP(SPACING_PERCENT * 5), margin: WP(SPACING_PERCENT) }}>
                <Text style={{ fontSize: WP(7), fontWeight: 'bold' }}> Personal Details</Text>
            </View>
            <View style={[{ paddingHorizontal: WP(5) }]} >

                <Input
                    containerStyle={{ marginVertical: WP(3) }}
                    InputIcon="person-outline"
                    placeholder={'Enter Account Name'}
                    keyboardType="email-address"
                    onChangeText={(txt) => {
                        setUsernameError("")
                        setUsername(txt)
                    }}
                    editable={!wallet_Loading}
                    value={username}
                    errorMessage={usernameError}
                />
                <Input
                    containerStyle={{ marginVertical: WP(3) }}

                    customIcon="idcard"
                    placeholder={'Enter CNIC'}
                    keyboardType="numeric"
                    onChangeText={(txt) => {
                        setCnicError("")
                        setCnic(txt)
                    }}
                    editable={!wallet_Loading}
                    value={cnic}
                    errorMessage={cnicError}
                >
                </Input>
                <Input
                    containerStyle={{ marginVertical: WP(3) }}
                    InputIcon="card-outline"
                    placeholder={'Enter Account No'}
                    keyboardType="numeric"
                    onChangeText={(txt) => {
                        setCardError("")
                        setCard(txt)
                    }}
                    editable={!wallet_Loading}
                    value={card}
                    errorMessage={cardError}
                />
                <Input
                    containerStyle={{ marginVertical: WP(3) }}
                    InputIcon="globe-outline"
                    placeholder={'Enter IBAN NO'}
                    keyboardType="email-address"
                    onChangeText={(txt) => {
                        setIbanError("")
                        setIban(txt)
                    }}
                    editable={!wallet_Loading}
                    value={iban}
                    errorMessage={ibanError}
                />
                <DropDownPicker
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    defaultNull
                    placeholder="Select Bank... (Optional)"
                    placeholderStyle={{ fontWeight: 'bold' }}
                    containerStyle={{ height: 40, marginVertical: WP(SPACING_PERCENT) }}
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
            </View>
            <TouchableOpacity
                onPress={() => {
                    if (validate()) {
                        // alert( request has been send to finance')
                        onWithdraw()
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
                {wallet_Loading ? (
                    <ActivityIndicator animating={true} color={'white'} size="small" />
                ) : (
                    <Text style={{
                        fontSize: WP(4),
                        fontFamily: Fonts.Bold,
                        color: 'white'
                    }}>Submit</Text>
                )}
            </TouchableOpacity>
        </View>
    );
};
const styles = StyleSheet.create({

});
export default PersonalDetails;
