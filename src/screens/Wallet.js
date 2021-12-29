import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import HeaderComponent from '../components/HeaderComponent';
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
import Icon from 'react-native-vector-icons/Ionicons';
import { ActivityIndicator } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { _getBalance, } from '../store/actions/Wallet';
import * as ApiServices from '../services/index';
import LoadingComponent from '../components/LoadingComponent';


const Wallet = ({ navigation }) => {
    const [loading, setloading] = useState(false);
    const [amount, setAmount] = useState("");
    const [amountError, setAmountError] = useState("");
    // const [balance, setBalance] = useState("0");
    const dispatch = useDispatch()
    const { balance_loading, balance } = useSelector(state => state.wallet)

    useEffect(() => {
        dispatch(_getBalance())
        // setloading(true)
        // ApiServices._GetWalletBalance().then((data) => {
        //      setBalance(data.success.balance)
        // }).catch(err => {
        //      console.log(err)
        //      setloading(false)
        // }).finally(() => {
        //      setloading(false)
        // })
    }, [])

    function Check() {
        console.log({ amount, balance })
        if (amount.length === 0) {
            setAmountError('Please enter amount');
            return false;
        }
        if (amount == 0) {
            setAmountError('Please enter amount');
            return false;
        }
        if (+amount > +balance) {
            alert('You do not have enough balance');
            return false;
        }
        if (+amount < 1000) {
            alert('withdrawal amount must be at least 1000 Rs');
            return false;
        }

        return true;
    }

    if (balance_loading) {
        return <LoadingComponent />
    }
    return (
        <View style={styles.Container}>
            <HeaderComponent
                navigation={navigation}
                containerStyle={{ backgroundColor: COLOR.primary }}
                iconStyle={{ color: COLOR.whiteColor }}
                titleStyle={{ color: COLOR.whiteColor }}
                title="Wallet"
            />
            <ScrollView>

                <View style={{ alignItems: 'center', backgroundColor: COLOR.whiteColor }}>
                    <View>
                        <View
                            style={{
                                marginTop: WP(SPACING_PERCENT * 3),
                                width: WP(50),
                                height: WP(50),
                                marginBottom: WP(SPACING_PERCENT / 2),
                                borderRadius: WP(50),
                                backgroundColor: COLOR.primary,
                                elevation: 5,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                            <Icon name="card" size={WP(20)} color={COLOR.whiteColor} />
                        </View>
                        <Text
                            style={{
                                fontSize: WP(5),
                                marginVertical: WP(SPACING_PERCENT / 2),
                                textAlign: 'center',
                                fontWeight: '700',
                            }}>
                            Accumulated Balance
                        </Text>
                        <Text
                            style={{ textAlign: 'center', fontSize: WP(9), fontWeight: '700' }}>
                            {balance} <Text style={{ fontSize: WP(4), fontWeight: '700' }}>PKR</Text>{' '}
                        </Text>
                    </View>
                </View>
                <View style={styles.btnContainer}>
                    <Input
                        // InputIcon="call-outline"
                        placeholder={'Enter Amount'}
                        containerStyle={{
                            marginTop: WP(SPACING_PERCENT * 1),
                            // height: WP(SPACING_PERCENT * 3),
                            // width: WP("90%"),
                        }}
                        keyboardType="phone-pad"
                        onChangeText={(txt) => {
                            setAmountError("")
                            setAmount(txt)

                        }
                        }
                        editable={!balance_loading}
                        value={amount}
                        errorMessage={amountError}
                    />
                    <TouchableOpacity
                        disabled={balance_loading}
                        onPress={() => {
                            if (Check()) {
                                navigation.navigate("PersonalDetails", { amount })
                                setAmount("")
                            }
                        }}
                        style={{
                            marginTop: WP(SPACING_PERCENT * 1),
                            backgroundColor: COLOR.primary,
                            height: WP(SPACING_PERCENT * 3),
                            borderRadius: 10,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>


                        <Text
                            style={{
                                fontSize: WP(4),
                                color: 'white',
                                fontWeight: 'bold',
                            }}>
                            Withdraw
                        </Text>

                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate("TransactionHistory")
                        }}
                        style={{
                            marginTop: WP(SPACING_PERCENT * 1),
                            height: WP(SPACING_PERCENT * 3),
                            borderRadius: 10,
                            alignItems: 'center',
                            borderWidth: 1,
                            borderColor: COLOR.gray,
                            justifyContent: 'center',
                        }}>
                        <Text
                            style={{
                                color: COLOR.gray,
                                fontSize: WP(4),
                            }}>
                            Transection History
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};
const styles = StyleSheet.create({
    Container: {
        height: '100%',
        width: WP('100%'),
    },
    btnContainer: {
        backgroundColor: COLOR.whiteColor,
        padding: WP(4),
        marginBottom: WP(2),
    },
    btn: {
        textTransform: 'uppercase',
        textAlign: 'center',
        fontSize: WP(SPACING_PERCENT),
        color: COLOR.primary,
        fontWeight: '600',
    },
});
export default Wallet;
