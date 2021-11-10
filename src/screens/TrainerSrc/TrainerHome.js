/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    Linking,
    PermissionsAndroid,
    Platform,
    View,
    Text,
    StatusBar,
    FlatList,
    Image,
    TouchableOpacity,
    ToastAndroid,
    RefreshControl
} from 'react-native';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconMaterialC from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import Geolocation from 'react-native-geolocation-service';
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
import { useDispatch, useSelector } from 'react-redux';
import LoadingComponent from '../../components/LoadingComponent';
import { _GetTrainingList, _StartTraining } from '../../store/actions/traningAction';
import { chechPermissionStatus } from '../../utils/PermissionsManager';
import preferences from '../../common/preferences';

const TrainerHome = (props) => {
    const { theme, navigation } = props;
    const [forceLocation, setForceLocation] = useState(true);
    const [highAccuracy, setHighAccuracy] = useState(true);
    const [locationDialog, setLocationDialog] = useState(true);
    const [significantChanges, setSignificantChanges] = useState(false);
    const [observing, setObserving] = useState(false);
    const [foregroundService, setForegroundService] = useState(false);
    const [useLocationManager, setUseLocationManager] = useState(false);
    const [location, setLocation] = useState(null);
    const [refreshing, setRefreshing] = useState(false);

    const dispatch = useDispatch()
    const { traningList, traning_loading, traning_Time_loading } = useSelector(state => state.training)

    const onLogout = () => {

        preferences.clearAuthSession().then(() => {
            navigation.reset({
                index: 0,
                routes: [{
                    name: "Auth"
                }]
            })
        }).catch(err => {
            alert(err)
        })

    }
    useEffect(() => {
        chechPermissionStatus()
        getLocation()
        gettranings()
    }, [])

    const onRefresh = () => {
        getLocation()
        gettranings()
    };

    const gettranings = () => {
        dispatch(_GetTrainingList())
    }
    const starttranings = (id, start) => {
        console.log("starttranings")
        let details = {
            training_id: id,
            lat: location.latitude,
            long: location.longitude,
        }
        dispatch(_StartTraining(details, navigation))
        // navigation.navigate('Timer');
    }


    const hasLocationPermission = async () => {
        if (Platform.OS === 'ios') {
            const hasPermission = await hasPermissionIOS();
            return hasPermission;
        }

        if (Platform.OS === 'android' && Platform.Version < 23) {
            return true;
        }

        const hasPermission = await PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );

        if (hasPermission) {
            return true;
        }

        const status = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );

        if (status === PermissionsAndroid.RESULTS.GRANTED) {
            return true;
        }

        if (status === PermissionsAndroid.RESULTS.DENIED) {
            ToastAndroid.show(
                'Location permission denied by user.',
                ToastAndroid.LONG,
            );
        } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
            ToastAndroid.show(
                'Location permission revoked by user.',
                ToastAndroid.LONG,
            );
        }

        return false;
    };

    const getLocation = async () => {
        const hasPermission = await hasLocationPermission();

        if (!hasPermission) {
            return;
        }

        Geolocation.getCurrentPosition(
            (position) => {
                setLocation(position.coords);
                console.log(position);
            },
            (error) => {
                Alert.alert(`Code ${error.code}`, error.message);
                setLocation(null);
                console.log(error);
            },
            {
                accuracy: {
                    android: 'high',
                    ios: 'best',
                },
                // enableHighAccuracy: highAccuracy,
                timeout: 15000,
                maximumAge: 10000,
                distanceFilter: 0,
                forceRequestLocation: forceLocation,
                forceLocationManager: useLocationManager,
                showLocationDialog: locationDialog,
            },
        );
    };
    const hasPermissionIOS = async () => {
        const openSetting = () => {
            Linking.openSettings().catch(() => {
                Alert.alert('Unable to open settings');
            });
        };
        const status = await Geolocation.requestAuthorization('whenInUse');

        if (status === 'granted') {
            return true;
        }

        if (status === 'denied') {
            Alert.alert('Location permission denied');
        }

        if (status === 'disabled') {
            Alert.alert(
                `Turn on Location Services to allow "${appConfig.displayName}" to determine your location.`,
                '',
                [
                    { text: 'Go to Settings', onPress: openSetting },
                    { text: "Don't Use Location", onPress: () => { } },
                ],
            );
        }

        return false;
    };

    if (traning_loading || traning_Time_loading) {
        return <LoadingComponent />
    }


    return (
        <View style={{ flex: 1, backgroundColor: COLOR.whiteColor }}>
            <View style={{ overflow: 'hidden', width: "85%", paddingTop: WP(9), marginLeft: "auto", backgroundColor: COLOR.whiteColor, marginRight: "auto" }}>
                <Image source={IMAGE.logo} style={{ width: "100%", height: HP(10) }} resizeMode="center" />
            </View>
            <View
                style={{
                    position: 'absolute',
                    top: 0,
                    paddingVertical: WP(SPACING_PERCENT),
                    paddingHorizontal: WP(SPACING_PERCENT),
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: "100%",
                }}>
                {/* <Text
                    onPress={() => {
                        navigation.navigate('Timer', { start_time: null, start_date: null, id: "4f5" });
                    }}
                    style={{
                        color: COLOR.primary,
                        fontSize: WP(4.5),
                        fontWeight: 'bold',
                    }}>  Changhong Outlet, DHA</Text> */}
                <View></View>
                <Icon name="log-out-outline" size={WP(9)}
                    style={[{ fontWeight: 'bold' }]}
                    color={COLOR.primary}

                    onPress={() => {
                        onLogout()
                    }} />
            </View>
            <Text
                style={{
                    color: COLOR.primary,
                    fontSize: WP(5),
                    fontWeight: 'bold',
                    backgroundColor: COLOR.whiteColor,
                    // marginVertical: WP(SPACING_PERCENT),
                    paddingHorizontal: WP(SPACING_PERCENT),
                }}>
                Trainings
            </Text>
            <FlatList
                refreshControl={
                    <RefreshControl
                        //refresh control used for the Pull to Refresh
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
                data={traningList}
                contentContainerStyle={{
                    backgroundColor: COLOR.whiteColor,
                }}
                keyExtractor={(item, index) => 'home-item' + index.toString()}
                ListFooterComponent={() => {
                    return (
                        <View style={{ marginBottom: WP(20), }}>
                        </View>
                    )
                }}
                renderItem={({ item, index }) => {
                    console.log(item)
                    return (
                        <View
                            accessible={true}
                            style={{
                                position: 'relative',
                                margin: WP(2.5),
                                padding: WP(3),
                                // marginRight: WP(SPACING_PERCENT),
                                width: WP('95%'),
                                // height: WP(35),
                                borderRadius: 10,
                                elevation: 15,
                                // flexDirection: 'row',
                                backgroundColor: COLOR.whiteColor,
                                // justifyContent: 'space-between',
                                // alignItems: 'center',
                            }}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}>
                                <Image source={ICON.task} style={{}} resizeMode="contain" />
                                <View style={{ paddingHorizontal: WP(3) }}>
                                    <Text
                                        style={{
                                            lineHeight: WP(SPACING_PERCENT),
                                            fontSize: WP(4),
                                            fontWeight: 'bold',
                                            // marginTop: WP(3),
                                        }}>
                                        {item.shop ? item.shop.shop_name : ""}
                                    </Text>
                                    <Text
                                        style={{
                                            lineHeight: WP(SPACING_PERCENT),
                                            color: COLOR.darkGray,
                                            fontSize: WP(3),
                                        }}>
                                        {item.shop && new Date(item.shop.created_at).toLocaleString()}
                                    </Text>
                                    <Text
                                        style={{ lineHeight: WP(SPACING_PERCENT), fontSize: WP(3) }}>
                                        <Icon
                                            name="location-sharp"
                                            size={WP(4)}
                                            // style={{ position: 'absolute', right: WP(2) }}
                                            color={COLOR.gray}
                                        />{' '}
                                        {item.shop ? item.shop.address : ""}
                                    </Text>
                                </View>

                            </View>

                            <Text
                                numberOfLines={2}
                                ellipsizeMode="tail"
                                style={{
                                    lineHeight: WP(4),
                                    fontSize: WP(3),
                                    paddingHorizontal: WP(SPACING_PERCENT / 2),
                                }}>
                                {item.shop ? item.shop.shop_details : ""}
                                {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit. Congue
                                habitant orci cursus pellentesque pharetra, cursus lobortis
                                feugiat. Facilisi cras phasellus urna, nisl dui, ut. */}
                            </Text>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>

                                <TouchableOpacity
                                    onPress={() => {
                                        // if (item.check_in) {
                                        //     navigation.navigate('Timer', { start_time: 0, id: item.id });
                                        // } else {
                                        // let d = new Date(item.check_in);
                                        // console.log(d.getMilliseconds())
                                        if (item.check_in == null) {
                                            starttranings(item.id)
                                        } else {
                                            console.log("else", item.check_in)
                                            navigation.navigate('Timer', { start_time: item.updated_at, start_date: item.date, id: item.id });
                                        }
                                        // }

                                    }}
                                    style={{
                                        width: WP('40%'),
                                        marginVertical: WP(SPACING_PERCENT / 2),
                                        // margin: WP(SPACING_PERCENT * 1),
                                        flexDirection: 'row',
                                        paddingHorizontal: WP(SPACING_PERCENT),
                                        backgroundColor: COLOR.primary,
                                        height: WP(SPACING_PERCENT * 2),
                                        borderRadius: 10,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                    <Text
                                        style={{
                                            fontSize: WP(4),
                                            color: 'white',
                                        }}>
                                        {item.check_in ? item.check_in == null ? "Start" : "In Progress" : "Start"}
                                        {/* Start */}
                                        {/* {item.check_in ? "End" : "Start"} */}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    );
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({});

const mapStateToProps = (state) => {
    const { app } = state;

    return {
        theme: app.theme,
    };
};

export default TrainerHome;
