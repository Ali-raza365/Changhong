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
    Alert
} from 'react-native';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconMaterialC from 'react-native-vector-icons/MaterialCommunityIcons';
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

import HeaderComponent from '../components/HeaderComponent';
import Icon from 'react-native-vector-icons/Ionicons';
import * as ApiServices from '../services/index';
import { launchCamera, launchImageLibrary, showImagePicker } from 'react-native-image-picker';
import { useSelector, useDispatch } from 'react-redux';
import LoadingComponent from '../components/LoadingComponent';
import { _BarcodeScanImageUpload } from '../store/actions/Voucher';
import { chechPermissionStatus } from '../utils/PermissionsManager';


const BarCodeSuccess = ({ navigation, route }) => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch()
    const { barcode_loading, barcodeData, barcode_image_upload_loading } = useSelector(state => state.voucher)


    // useEffect(() => {
    //     if (barcodeData) {
    //         // onClickCamera(barcodeData)
    //     }
    // }, [barcodeData])

    // const backAction = () => {
    //     navigation.reset({
    //         index: 0,
    //         routes: [{
    //             name: "TrainerTabs"
    //         }]
    //     })
    //     return true
    // };

    const onClickCamera = () => {
        const options = {
            mediaType: 'photo',
            quality: 1,
            // maxWidth: 600,
            // maxHeight: 600,
            // includeBase64: true,
            cameraType: 'back'
        }
        launchCamera(options, response => {
            if (response.uri) {
                console.log(response)
                let image = {
                    uri: response.uri,
                    type: response.type,
                    name: response.fileName,
                }
                const requestBody = new FormData()
                requestBody.append('voucher_id', barcodeData)
                requestBody.append('image', image)
                dispatch(_BarcodeScanImageUpload(requestBody, navigation))
                // alert('Photo is send to Admin')
            } else {
                // alert('something went wrong')
                chechPermissionStatus()
            }
        })
    }


    // useEffect(() => {
    //     BackHandler.addEventListener("hardwareBackPress", backAction);
    //     return () =>
    //         BackHandler.removeEventListener("hardwareBackPress", backAction);
    // }, []);

    if (barcode_image_upload_loading) {
        return <LoadingComponent />
    }

    return (
        <View style={{ flex: 1, backgroundColor: COLOR.whiteColor, justifyContent: 'center', alignItems: 'center' }}>
            <HeaderComponent
                navigation={navigation}
                // screen="TrainerTabs"
                // onRest={true}
                title="Confirmation"
                containerStyle={{ backgroundColor: COLOR.primary, position: "absolute", top: 0, width: "100%", zIndex: 10 }}
                titleStyle={{ color: COLOR.whiteColor }}
                iconStyle={{ color: COLOR.whiteColor }}
            />
            <Icon name="checkmark-circle" size={WP(40)} color={COLOR.primary} />
            <Text
                style={{
                    fontSize: WP(5),
                    marginVertical: WP(SPACING_PERCENT / 2),
                    textAlign: 'center',
                    lineHeight: WP(SPACING_PERCENT + 2),
                    fontWeight: '600',
                }}>
                Your Barcode is {"\n"}
                Scan sucessfully.
            </Text>
            <TouchableOpacity
                onPress={() => {
                    onClickCamera()
                    // navigation.navigate('TrainerTabs');
                }}
                style={{
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
                <Text
                    style={{
                        fontSize: WP(4),
                        color: 'white',
                    }}>
                    Take picture
                    {/* {item.check_in ? "End" : "Start"} */}
                </Text>
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
export default BarCodeSuccess;
