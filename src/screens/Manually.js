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
import AsyncStorage from '@react-native-community/async-storage';
import preferences from '../common/preferences';

const Manually = (props) => {
    const { theme, navigation } = props;
    const [data, setdata] = useState({
        barcode: '',
        user_id: '',
        user_name: '',
        product_price: '0',
        model_number: '',
        shop_user_id: '',
        incentive: '0',
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
    const [ref, setRef] = useState(null);
    const [photo, setPhoto] = useState('');
    const [user, setUser] = useState(null);
    const { add_voucher_loading, barcode_Details_loading, barcode_details } =
        useSelector((state) => state.voucher);

    const dispatch = useDispatch();

    const onClickCamera = () => {
        const options = {
            noData: true,
        };
        launchCamera(options, (response) => {
            console.log(response);
            if (response.uri) {
                // let arr = [...dumyData, { image: response.uri }]
                setPhoto(response);
                // alert('Photo is successfully uploaded');
                // setPhoto(response.uri)
            }
        });
        console.log('Camera clicked');
    };

    function check() {
        if (!data.barcode) {
            alert('Please enter barcode');
            return false;
        }
        if (!photo) {
            alert('Please enter invoice_photo');
            return false;
        }
        if (!data.model_number) {
            alert('Please enter model number');
            return false;
        }
        if (!data.voucher_number) {
            alert('Please enter voucher number');
            return false;
        }
        if (!data.shop_name) {
            alert('Please enter shop name');
            return false;
        }
        if (!data.product_price) {
            alert('Please enter price');
            return false;
        }
        if (!data.incentive) {
            alert('Please enter incentive');
            return false;
        }
        if (!data.user_name) {
            alert('Please enter your Name');
            return false;
        }
        if (!data.mobile_number) {
            alert('Please enter your Mobile number');
            return false;
        }
        if (!data.address) {
            alert('Please enter your address');
            return false;
        }
        if (!data.dealer) {
            alert('Please enter your dealer name');
            return false;
        }
        if (!data.created_by) {
            alert('Please enter created_by');
            return false;
        }
        return true;
    }

    const calculatePrcetage = (a, b) => {
        let c = (parseFloat(+b) * parseFloat(+a)) / 100;
        console.log(c, "percent")
        return parseFloat(c)

    }

    const onSuccess = () => {
        console.log(data);
        if (data.barcode) {
            dispatch(_GetBarcodeDetail(data.barcode));

        } else {
            alert('please enter barcode to get details');
        }
    };
    useEffect(() => {
        if (barcode_details) {
            console.log("barcode_details", barcode_details.length, barcode_details)
            // let prc = calculatePrcetage(barcode_details.product_price, barcode_details.incentive)
            setdata({ ...data, ...barcode_details });
        }
    }, [barcode_details]);

    useEffect(() => {
        getUser()
    }, []);




    const onSubmit = () => {
        console.log(add_voucher_loading);
        if (check()) {
            let detail = {
                ...data,
                invoice_photo: {
                    uri: photo.uri,
                    type: photo.type,
                    name: photo.fileName,
                }
            };
            console.log({ detail });
            dispatch(AddVoucher(detail, navigation));
        }
    };

    const getUser = async () => {
        const userdata = await AsyncStorage.getItem(preferences.KEYS.ACCESS_TOKEN);
        if (userdata) {
            let t = JSON.parse(userdata)
            if (t.user) {
                console.log(t.user.email, "sdfsdfsdfsd")
                let dealer = {
                    created_by: t.user.name,
                    dealer: t.user.shop_name,
                }
                setdata({ ...data, ...dealer, })
            }
        } else {
            alert("Something went wrong")
            navigation.reset({
                index: 0,
                routes: [{
                    name: "Auth"
                }]
            })
        }
    }
    if (add_voucher_loading || barcode_Details_loading) {
        return <LoadingComponent />;
    }
    // console.log(data);
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

            <>
                <ScrollView
                    style={{
                        marginTop: WP(SPACING_PERCENT * 3.5),
                        backgroundColor: COLOR.whiteColor,
                    }}>
                    <View style={styles.inputContainer}>
                        <Text style={[styles.label, { paddingVertical: 10 }]}>Image</Text>
                        {photo == '' ? (
                            <FontAwesome
                                onPress={() => {
                                    onClickCamera();
                                }}
                                name="camera"
                                size={WP(TAB_ICON_SIZE)}
                                color="#1A0F66"
                            />
                        ) : (
                            <TouchableOpacity
                                style={{ padding: WP(SPACING_PERCENT / 2) }}
                                onPress={() => {
                                    onClickCamera();
                                }}>
                                <Image
                                    source={{ uri: photo.uri }}
                                    style={{ width: 40, height: 40 }}
                                    resizeMode="stretch"
                                />
                            </TouchableOpacity>
                        )}
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={[styles.label, { width: "55%" }]}>Barcode</Text>
                        <TextInput
                            style={[styles.inputfield, { width: "25%" }]}
                            placeholder="Barcode"
                            value={data.barcode}
                            onChangeText={(txt) => {
                                setdata({ ...data, barcode: txt });
                            }}
                        />
                        <TouchableOpacity
                            style={{
                                backgroundColor: COLOR.primary,
                                padding: WP(2),
                                borderRadius: WP(RADIUS),
                            }}
                            onPress={() => {
                                onSuccess();
                                //     alert(' your request has been sent')
                                //     navigation.navigate('bottomTab')
                            }}>
                            <Text style={{ color: '#fff', fontSize: WP(TEXT_SIZES.info_1) }}>
                                Get Detail
                            </Text>
                        </TouchableOpacity>
                        {/* <Text style={styles.label}>Name</Text> */}
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Model Number</Text>
                        <TextInput
                            value={data.model_number}
                            onChangeText={(txt) => {
                                setdata({ ...data, model_number: txt });
                            }}
                            style={styles.inputfield}
                            placeholder="EA 021425"
                        />
                        {/* <Text style={styles.label}>Name</Text> */}
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Voucher Number</Text>
                        <TextInput
                            value={data.voucher_number}
                            onChangeText={(txt) => {
                                setdata({ ...data, voucher_number: txt });
                            }}
                            style={styles.inputfield}
                            placeholder=" 021425"
                        />
                        {/* <Text style={styles.label}>Name</Text> */}
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Shop</Text>
                        <TextInput
                            style={styles.inputfield}
                            placeholder="Metro Thoker "
                            value={data.shop_name}
                            onChangeText={(txt) => {
                                setdata({ ...data, shop_name: txt });
                            }}
                        />
                        {/* <Text style={styles.label}>Name</Text> */}
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Product Quantity</Text>
                        <TextInput
                            editable={false}
                            value={'1'}
                            keyboardType="numeric"
                            style={styles.inputfield}
                            placeholder="0"
                        />
                        {/* <Text style={styles.label}>Name</Text> */}
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Price</Text>
                        <TextInput
                            style={styles.inputfield}
                            keyboardType="numeric"
                            placeholder="0"
                            value={data.product_price}
                            onChangeText={(txt) => {
                                setdata({ ...data, product_price: txt });
                            }}
                        />
                        {/* <Text style={styles.label}>Name</Text> */}
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Incentive</Text>
                        <TextInput
                            style={styles.inputfield}
                            placeholder="0%"
                            editable={false}
                            value={((data.incentive / 100) * data.product_price).toString()}
                            keyboardType="numeric"
                            onChangeText={(text) => {
                                text = text.split('$').join('')
                                setdata({ ...data, incentive: text });
                            }}
                        />
                        {/* <Text style={styles.label}>Name</Text> */}
                    </View>
                    <View style={[styles.inputContainer, { backgroundColor: '#F6F6F6' }]}>
                        <Text
                            style={[styles.label, { paddingVertical: WP(SPACING_PERCENT) }]}>
                            End User Info
                        </Text>
                        {/* <Text style={styles.label}>Name</Text> */}
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Name</Text>
                        <TextInput
                            style={styles.inputfield}
                            placeholder="Name"
                            value={data.user_name}
                            onChangeText={(txt) => {
                                setdata({ ...data, user_name: txt });
                            }}
                        />
                        {/* <Text style={styles.label}>Name</Text> */}
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Mobile Number</Text>
                        <TextInput
                            style={styles.inputfield}
                            value={data.mobile_number}
                            onChangeText={(txt) => {
                                setdata({ ...data, mobile_number: txt });
                            }}
                            keyboardType="numeric"
                            placeholder="0123 1212123"
                        />
                        {/* <Text style={styles.label}>Name</Text> */}
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Address</Text>
                        <TextInput
                            value={data.address}
                            onChangeText={(txt) => {
                                setdata({ ...data, address: txt });
                            }}
                            style={styles.inputfield}
                            placeholder="Address"
                        />
                    </View>
                    <View style={[styles.inputContainer, { backgroundColor: '#F6F6F6' }]}>
                        <Text
                            style={[styles.label, { paddingVertical: WP(SPACING_PERCENT) }]}>
                            More Info
                        </Text>
                        {/* <Text style={styles.label}>Name</Text> */}
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Dealer</Text>
                        <TextInput
                            style={styles.inputfield}
                            value={data.dealer}
                            onChangeText={(txt) => {
                                setdata({ ...data, dealer: txt });
                            }}
                            placeholder="Metro Habib Cash & Carry Pakistan"
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Created By</Text>
                        <TextInput
                            value={data.created_by}
                            onChangeText={(txt) => {
                                setdata({ ...data, created_by: txt });
                            }}
                            style={styles.inputfield}
                            placeholder="Rana Iftkhar"
                        />
                    </View>
                    <View
                        style={[
                            styles.inputContainer,
                            { paddingBottom: WP(SPACING_PERCENT * 4) },
                        ]}>
                        <Text style={styles.label}>Created Date</Text>
                        <TextInput
                            editable={false}
                            value={new Date().toLocaleDateString()}
                            style={styles.inputfield}
                            placeholder="22/08/2021"
                        />
                    </View>
                </ScrollView>
                <View style={styles.btnContainer}>
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={() => {
                            onSubmit();
                            //     alert(' your request has been sent')
                            //     navigation.navigate('bottomTab')
                        }}>
                        <Text style={{ color: '#fff', fontSize: WP(TEXT_SIZES.info_1) }}>
                            Submit
                        </Text>
                    </TouchableOpacity>
                </View>
            </>

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

const mapStateToProps = (state) => {
    const { app } = state;

    return {
        theme: app.theme,
    };
};

export default Manually;
