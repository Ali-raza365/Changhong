import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    Dimensions,
} from 'react-native';
import HeaderComponent from '../../components/HeaderComponent';
const windowWidth = Dimensions.get('screen').width;
// windowWidth - 20
const windowHeight = Dimensions.get('window').height;
import { Stopwatch } from 'react-native-stopwatch-timer'

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
    ICON,
} from '../../common/Config';
import { _EndTraining } from '../../store/actions/traningAction';
import { useSelector, useDispatch } from 'react-redux';
import LoadingComponent from '../../components/LoadingComponent';
import * as ApiServices from '../../services/index';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { chechPermissionStatus } from '../../utils/PermissionsManager';

const Timer = ({ navigation, route }) => {
    const { start_time, start_date, id } = route.params
    const [starttime, setStartTime] = useState(null)
    const [start, setStart] = useState(false)
    const [loading, setLoading] = useState(false);


    const dispatch = useDispatch()
    const { traning_Time_loading } = useSelector(state => state.training)

    const endtraning = async () => {
        // setReset(true)
        setStart(false)

        // console.log({ id, start, traning_Time_loading, reset })
        await dispatch(_EndTraining(
            id
            , navigation))
        onClickCamera()
        //   navigation.navigate('TrainingConfirmation');
        // resetTimer()
    }


    const calculatetime = (date, st) => {

        // let dt = date.split('-');
        // let st = "20:55"
        // let fdate = dt[1] + '/' + dt[2] + '/' + dt[0];
        // let today = new Date().toLocaleDateString();
        // console.log(today)

        let timeStart = new Date(st)
        // new Date(today + " " + st);
        let timeEnd = new Date()

        let difference = timeEnd - timeStart;
        // let diff_result = new Date(difference);

        // let hourDiff = diff_result.getHours();
        console.log(difference, timeEnd, timeStart)
        return difference
    }

    useEffect(() => {
        chechPermissionStatus()
    }, [])

    useEffect(() => {
        console.log({ start_time, start_date })

        if (start_time !== null) {

            let mili = calculatetime(start_date, start_time)
            if (mili) {
                setStartTime(mili)
            } else {
                setStartTime(1)
            }
        } else {
            setStartTime(1)
        }
        setStart(true)
    }, [start_time])

    const onClickCamera = () => {
        const options = {
            mediaType: 'photo',
            quality: 0.5,
            // includeBase64: true,
            maxWidth: 300,
            maxHeight: 300,
            cameraType: 'back'
        }
        try {
            launchCamera(options, response => {
                console.log(response)
                if (response) {
                    let image = {
                        uri: response.uri,
                        type: response.type,
                        name: response.fileName,
                    }
                    trainingImage(image)
                } else {
                    alert('Something went wrong')
                    chechPermissionStatus()
                }
            })
        } catch (error) {
            console.log(error)
        }

    }
    const trainingImage = (image) => {
        setLoading(true)
        const requestBody = new FormData()
        requestBody.append('training_id', id)
        requestBody.append('image', image)
        ApiServices._EndTrainingUploadImageApi(requestBody)
            .then((res) => {
                console.log('res', res)
                if (res.errors) {
                    alert(res.errors)
                }
                if (res.success) {
                    alert(res.success.message)
                    // navigation.navigate('TrainerTabs');
                }
            })
            .catch((err) => {
                console.log('err', err)
                alert(err)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    const StopwatchOptions = {
        container: {
            // backgroundColor: '#000',
            // padding: 5,
            // borderRadius: 5,
            // width: 220,
        },
        text: {
            fontSize: WP(10),
            color: COLOR.primary,
            marginLeft: 7,
        }
    };

    console.log(starttime)
    if (traning_Time_loading || loading || !starttime) {
        return <LoadingComponent />
    }
    return (
        <View style={styles.Container}>
            <HeaderComponent
                title="IT Training"
                navigation={navigation}
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
            <Text
                style={{
                    marginTop: WP(SPACING_PERCENT * 3),
                    color: COLOR.primary,
                    fontSize: WP(5),
                    fontWeight: 'bold',
                    padding: WP(10),
                }}>
                Timer
            </Text>
            <View
                style={{
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    width: WP('75%'),
                    height: WP('75%'),
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: WP(50),
                    shadowColor: '#000',
                    shadowOffset: {
                        width: 0,
                        height: 4,
                    },
                    shadowOpacity: 0.32,
                    shadowRadius: 5.46,
                    borderWidth: 1,
                    borderColor: COLOR.primary,
                    // elevation: 9,

                    // backgroundColor: COLOR.gray,
                }}>
                <Stopwatch start={start}
                    options={StopwatchOptions}
                    startTime={starttime}
                // getTime={this.getFormattedTime}
                />
            </View>
            <TouchableOpacity
                onPress={() => {
                    endtraning()
                    console.log("end clicked")

                }}
                style={{
                    width: WP('90%'),
                    marginVertical: WP(SPACING_PERCENT),
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    flexDirection: 'row',
                    paddingHorizontal: WP(SPACING_PERCENT),
                    backgroundColor: COLOR.primary,
                    borderRadius: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                <Text
                    style={{
                        fontSize: WP(5),
                        color: 'white',
                        padding: WP(5),
                    }}>
                    End Training
                </Text>
            </TouchableOpacity>
        </View>
    );
};
const styles = StyleSheet.create({
    Container: {
        height: '100%',
        width: '100%',
        // backgroundColor: 'red',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
});
export default Timer;
