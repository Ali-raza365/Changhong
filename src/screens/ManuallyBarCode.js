/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Image,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconMaterialC from 'react-native-vector-icons/MaterialCommunityIcons';
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
    ActivityIndicator,
} from '../common/Config';
import HeaderSearchComponent from '../components/HeaderSearchComponent';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Tabs from '../components/Tabs';
import HeaderComponent from '../components/HeaderComponent';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { AddVoucher, _GetBarcodeDetail } from '../store/actions/Voucher';
import LoadingComponent from '../components/LoadingComponent';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import BarcodeScanner from 'react-native-scan-barcode';

const Manually = (props) => {
    const { theme, navigation } = props;
    const [active, setactive] = useState(true);
    const [data, setdata] = useState({
        barcode: '8558',
        user_id: '',
        user_name: '',
        product_price: '',
        model_number: '',
        shop_user_id: '',
        incentive: '',
        shop_name: '',
        pay_amount: '',
        voucher_number: '',
        payment_status: '',
        quantity: '1',
        mobile_number: '',
        address: '',
        created_date: new Date().toLocaleDateString(),
        created_by: '',
        dealer: '',
    });

    const { add_voucher_loading, barcode_Details_loading, barcode_details } =
        useSelector((state) => state.voucher);

    const dispatch = useDispatch();

    const onSuccess = (data) => {
        console.log(data);
        if (data) {
            dispatch(_GetBarcodeDetail(data.data, navigation));
        } else {
            alert('barcode not found');
        }
    };

    if (barcode_Details_loading) {
        return <LoadingComponent />;
    }

    return (
        <>
            <HeaderComponent
                navigation={navigation}
                title="Add Manually"
                containerStyle={{
                    backgroundColor: COLOR.primary,
                    position: 'absolute',
                    top: 0,
                    width: '100%',
                    zIndex: 10,
                }}
                titleStyle={{ color: COLOR.whiteColor }}
                iconStyle={{ color: COLOR.whiteColor }}
            />

            <BarcodeScanner
                onBarCodeRead={(q) => onSuccess(q)}
                style={{ flex: 1 }}
                torchMode={'off'}
                cameraType={'back'}
            />
        </>
        // }
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        // marginTop: WP(SPACING_PERCENT),
        paddingHorizontal: WP(SPACING_PERCENT),
        borderColor: COLOR.gray,
        borderBottomColor: COLOR.gray,
        borderBottomWidth: 0.7,
        // backgroundColor: '#254852'
    },
    label: {
        fontWeight: '700',
        fontSize: WP(4),
    },
    inputfield: {
        maxWidth: '55%',
        textAlign: 'center',
    },
    btnContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: '#fff',
    },
    btn: {
        width: '95%',
        backgroundColor: '#1A0F66',
        padding: WP(SPACING_PERCENT / 1.2),
        margin: 10,
        borderRadius: WP(RADIUS),
        alignItems: 'center',
        justifyContent: 'center',
    },
});



export default Manually;
