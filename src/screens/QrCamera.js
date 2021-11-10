import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity
} from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { RNCamera } from 'react-native-camera';
import BarcodeScanner from 'react-native-scan-barcode';

import {
    COLOR,
    PLATFORM,
    WP,
    SPACING_PERCENT
} from '../common/Config'
import Icon from 'react-native-vector-icons/Ionicons';

import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

import { _BarcodeScan, _BarcodeScanImageUpload } from '../store/actions/Voucher'
import LoadingComponent from '../components/LoadingComponent';
import { chechPermissionStatus } from '../utils/PermissionsManager';
const QRScanner = ({ navigation }) => {
    const [ref, setRef] = useState(null);
    const [qrcode, setqrCode] = useState(true)

    const { barcode_loading, barcodeData, barcode_image_upload_loading } = useSelector(state => state.voucher)
    const dispatch = useDispatch()

    // Requesting IOS Camera Permission
    const _requestingIOSCameraPermission = async () => {
        await request(PERMISSIONS.IOS.CAMERA)
            .then((result) => {
                switch (result) {
                    case RESULTS.UNAVAILABLE:
                        console.log('This feature is not available (on this device / in this context)');
                        break;
                    case RESULTS.DENIED:
                        console.log('The permission has not been requested / is denied but requestable');
                        break;
                    case RESULTS.LIMITED:
                        console.log('The permission is limited: some actions are possible');
                        break;
                    case RESULTS.GRANTED:
                        console.log('The permission is granted');
                        // setTimeout(() => {
                        //      ref.reactivate();
                        // }, 3000);
                        break;
                    case RESULTS.BLOCKED:
                        console.log('The permission is denied and not requestable anymore');
                        break;
                }
            })
            .catch((err) => {
                alert(err);
            })
    }

    // Requesting ANDROID Camera Permission
    const _requestingAndroidCameraPermission = async () => {
        await request(PERMISSIONS.ANDROID.CAMERA)
            .then((result) => {
                switch (result) {
                    case RESULTS.UNAVAILABLE:
                        console.log('This feature is not available (on this device / in this context)');
                        break;
                    case RESULTS.DENIED:
                        console.log('The permission has not been requested / is denied but requestable');
                        break;
                    case RESULTS.LIMITED:
                        console.log('The permission is limited: some actions are possible');
                        break;
                    case RESULTS.GRANTED:
                        console.log('The permission is granted');
                        break;
                    case RESULTS.BLOCKED:
                        console.log('The permission is denied and not requestable anymore');
                        break;
                }
            })
            .catch((err) => {
                alert(err);
            })
    }

    useEffect(() => {
        if (PLATFORM === 'android')
            _requestingAndroidCameraPermission();
        else
            _requestingIOSCameraPermission();
    }, []);

    useEffect(() => {
        setqrCode(!qrcode)
    }, [])

    // useEffect(() => {
    //     if (barcodeData) {
    //         onClickCamera(barcodeData)
    //     }
    // }, [barcodeData])


    const onClickCamera = (data) => {
        const options = {
            mediaType: 'photo',
            quality: 0.5,
            // includeBase64: true,
            maxWidth: 300,
            maxHeight: 300,
            cameraType: 'back'
        }
        launchCamera(options, response => {
            if (response.uri) {
                console.log(data, "sssssssssssssssssssssssss")

                let image = {
                    uri: response.uri,
                    type: response.type,
                    name: response.fileName,
                }
                const requestBody = new FormData()
                requestBody.append('voucher_id', data)
                requestBody.append('image', image)
                dispatch(_BarcodeScanImageUpload(requestBody, navigation))
                // alert('Photo is send to Admin')
            } else {
                alert('something went wrong')
            }
        })
    }
    useEffect(() => {
        chechPermissionStatus()
        // onSuccess({ data: "D113HGF1" })
    }, [])
    const onSuccess = (data) => {

        //    onClickCamera()
        try {
            // if (type === 'QR_CODE') {
            console.log(data, "QRCodeScanner")
            dispatch(_BarcodeScan(data.data, navigation));

            // }
        } catch (error) {
            alert(error);
        }
    };
    if (barcode_loading || barcode_image_upload_loading) {
        return <LoadingComponent />
    }
    return (
        <View style={Styles._mainContainer}>
            {qrcode}
            <View style={Styles._preview}>
                <Icon
                    onPress={() => {
                        navigation.goBack()
                    }}
                    name="chevron-back-outline"
                    color="#fff"
                    style={{ paddingLeft: WP(2) }}
                    size={WP(10)}
                />
                <TouchableOpacity
                    onPress={() => {
                        navigation.push('Manually');
                    }}
                    style={{
                        width: WP('45%'),
                        flexDirection: 'row',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        marginTop: WP(-4),
                        paddingHorizontal: WP(SPACING_PERCENT / 2),
                        backgroundColor: COLOR.primary,
                        height: WP(SPACING_PERCENT * 2.5),
                        borderRadius: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                    <Text
                        style={{
                            fontSize: WP(4),
                            color: 'white',
                        }}>
                        Add Manually
                    </Text>
                </TouchableOpacity>
            </View>
            {qrcode ?
                <BarcodeScanner
                    onBarCodeRead={(q) => onSuccess(q)}
                    style={{ flex: 1 }}
                    torchMode={'off'}
                    cameraType={'back'}
                /> : <BarcodeScanner
                    onBarCodeRead={(q) => onSuccess(q)}
                    style={{ flex: 1 }}
                    torchMode={'off'}
                    cameraType={'back'}
                />}

        </View>
    );
}

const Styles = StyleSheet.create({
    _mainContainer: {
        flex: 1,
    },
    _preview: {
        position: "absolute",
        top: 0,
        left: 0,
        // left: WP(3),
        zIndex: 10,
        width: "100%",
        // flexDirection: "row",
        paddingVertical: WP(SPACING_PERCENT / 2),
        // alignItems: 'center',
        // justifyContent: 'center',
    },

})

export default QRScanner;