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
} from '../../common/Config';

import HeaderComponent from '../../components/HeaderComponent';
import Icon from 'react-native-vector-icons/Ionicons';
import * as ApiServices from '../../services/index';
// import { launchCamera, launchImageLibrary, showImagePicker } from 'react-native-image-picker';
import * as ImagePicker from "react-native-image-picker"
import LoadingComponent from '../../components/LoadingComponent';


const TrainingConfirmation = ({ navigation, route }) => {
    const [loading, setLoading] = useState(false);
    // const { tranID } = route.params

    const backAction = () => {
        navigation.reset({
            index: 0,
            routes: [{
                name: "TrainerTabs"
            }]
        })
        return true
    };

    const calculatetime = () => {
        let valuestart = "11:00:00 AM"
        //create date format       
        let timeStart = new Date("10/24/2021 " + valuestart);
        let timeEnd = new Date()

        let difference = timeEnd - timeStart;
        let diff_result = new Date(difference);

        let hourDiff = diff_result.getHours();
        console.log(hourDiff, difference, timeEnd)

        // var time_start = new Date();
        // var time_end = new Date();
        // var value_start = "06:00:00".split(':');
        // var value_end = "23:00:00".split(':');

        // time_start.setHours(value_start[0], value_start[1], "00", 0)
        // time_end.setHours(value_end[0], value_end[1], "00", 0)

        // let mil = time_end - time_start // millisecond 
        // console.log(mil)
    }


    const onClickCamera = (data) => {
        const options = {
            title: 'Load Photo',
            customButtons: [
                { name: 'button_id_1', title: 'CustomButton 1' },
                { name: 'button_id_2', title: 'CustomButton 2' }
            ],
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        // ImagePicker.showImagePicker(options, (response) => {
        //     console.log('Response = ', response);

        //     if (response.didCancel) {
        //         console.log('User cancelled image picker');
        //     } else if (response.error) {
        //         console.log('ImagePicker Error: ', response.error);
        //     } else if (response.customButton) {
        //         console.log('User tapped custom button: ', response.customButton);
        //         Alert.alert(response.customButton);
        //     } else {
        //         console.log(response)
        //         // You can also display the image using data:
        //         // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        //         //   setImageSource(response.uri);
        //     }
        // });
    }

    // const trainingImage = (image) => {
    //     setLoading(true)
    //     const requestBody = new FormData()
    //     requestBody.append('training_id',
    //         tranID ? tranID :
    //             "3")
    //     requestBody.append('image', image)
    //     ApiServices._EndTrainingUploadImageApi(requestBody)
    //         .then((res) => {
    //             console.log('res', res)
    //             if (res.errors) {
    //                 alert(res.errors)
    //             }
    //             if (res.success) {
    //                 alert(res.success.message)
    //                 navigation.navigate('TrainerTabs');
    //             }
    //         })
    //         .catch((err) => {
    //             console.log('err', err)

    //         })
    //         .finally(() => {
    //             setLoading(false)

    //         })
    // }
    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", backAction);
        return () =>
            BackHandler.removeEventListener("hardwareBackPress", backAction);
    }, []);

    if (loading) {
        return <LoadingComponent />
    }

    return (
        <View style={{ flex: 1, backgroundColor: COLOR.whiteColor, justifyContent: 'center', alignItems: 'center' }}>
            <HeaderComponent
                navigation={navigation}
                screen="TrainerTabs"
                onRest={true}
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
                Your training is {"\n"}
                completed sucessfully.
            </Text>
            <TouchableOpacity
                onPress={() => {
                    // onClickCamera()
                    // calculatetime()
                    navigation.navigate('TrainerTabs');
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
                    Okay
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
export default TrainingConfirmation;
