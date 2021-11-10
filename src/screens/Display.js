/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    FlatList,
    Image,
    ImageBackground,
    TouchableOpacity,
    ClippingRectangle,
    RefreshControl,
} from 'react-native';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
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
} from '../common/Config';
import HeaderSearchComponent from '../components/HeaderSearchComponent';
import Icon from 'react-native-vector-icons/Ionicons';
import Tabs from '../components/Tabs';
import LoadingComponent from '../components/LoadingComponent';
import { _GetShops } from '../store/actions/displayAction';
import preferences from '../common/preferences';
import HeaderComponent from '../components/HeaderComponent';

const Display = (props) => {
    const { theme, navigation } = props;
    const [active, setactive] = useState(0);
    const [handleExtraData, setHandleExtraDara] = useState(false);
    const [photo, setPhoto] = useState("");
    const [refreshing, setRefreshing] = useState(false);


    const dispatch = useDispatch()
    const { shops, shop_loading } = useSelector(state => state.Display)

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
    const onRefresh = () => {
        getshop()
    };


    const onChangeText = (ind) => {
        console.log('sadas', ind);
        setactive(ind);
    };

    const getshop = () => {
        dispatch(_GetShops())
    }
    useEffect(() => {
        getshop()


    }, [])

    // console.log({ shops })

    if (shop_loading) {
        return <LoadingComponent />
    }

    return (
        <>
            <Icon name="log-out-outline" size={WP(9)}
                style={[{
                    position: 'absolute',
                    right: WP(2),
                    top: WP(5),
                    zIndex: 10,
                }]}
                color={COLOR.whiteColor}
                onPress={() => {
                    onLogout()
                }} />
            <HeaderComponent navigation={navigation}
                titleStyle={{ color: COLOR.whiteColor }}
                iconStyle={{ color: COLOR.whiteColor }}
                containerStyle={{ backgroundColor: COLOR.primary }} title="Display" />
            <FlatList
                data={shops ? shops : []}
                // data={data}
                refreshControl={
                    <RefreshControl
                        //refresh control used for the Pull to Refresh
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
                contentContainerStyle={{
                    backgroundColor: COLOR.whiteColor,
                    flex: 1,
                }}
                ListFooterComponent={() => {
                    return (
                        <View style={{ marginBottom: WP(20), }}>
                        </View>
                    )
                }}
                extraData={handleExtraData}
                keyExtractor={(item, index) => 'home-item' + index.toString()}
                ListEmptyComponent={() => {
                    return (
                        <View
                            style={{
                                flex: 1,
                                // width: '100%',
                                height: WP('180%'),
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <IconMaterialC
                                name="view-list-outline"
                                color={COLOR.primary}
                                size={WP(30)}
                                onPress={() => {
                                    console.log('goBack');
                                    // navigation.goBack();
                                }}
                            />
                            <Text
                                style={{
                                    fontSize: WP(5),
                                    fontWeight: 'bold',
                                    color: COLOR.primary,
                                    textAlign: 'center',
                                }}>
                                No record to show
                            </Text>
                        </View>
                    );
                }}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity
                            onPress={() => { navigation.navigate('DisplayDetail', { shopId: item.id, title: item.shop_name }) }}
                            // accessible={true}
                            style={{
                                position: 'relative',
                                margin: WP(2.5),
                                padding: WP(3),
                                width: WP('95%'),
                                borderRadius: 10,
                                justifyContent: 'space-between',
                                elevation: 15,
                                flexDirection: 'row',
                                backgroundColor: COLOR.whiteColor,
                                alignItems: 'center',
                            }}>
                            <View style={{ paddingHorizontal: WP(3) }}>
                                <Text
                                    style={{
                                        lineHeight: WP(SPACING_PERCENT),
                                        fontSize: WP(4.5),
                                        color: COLOR.primary,
                                        fontWeight: 'bold',
                                        marginTop: WP(3),
                                    }}>
                                    {item.shop_name}
                                </Text>
                            </View>
                            <Icon
                                onPress={() => { navigation.navigate('DisplayDetail', { shopId: item.id, title: item.shop_name }) }}
                                name="chevron-forward-sharp"
                                size={WP(8)}
                                color={COLOR.primary}
                            />
                        </TouchableOpacity>
                    );
                }}
            />
        </>
    );
};

const styles = StyleSheet.create({
    imagesContainer: {
        width: '100%',
        height: WP(15),
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: COLOR.primary,
        padding: 10,
    },
    Topbtn: {
        height: '100%',
        width: '40%',
        // backgroundColor: '#782',
        alignItems: 'center',
        justifyContent: 'center',
    },
    TopbtnText: {
        fontSize: WP(TEXT_SIZES.info_1),
        color: COLOR.whiteColor,
    },
    verticalLine: {
        height: '100%',
        backgroundColor: '#ffff',
        width: 1.5,
    },
    btnContainer: {
        width: '100%',
        flexDirection: 'row',
        backgroundColor: COLOR.whiteColor,
        position: 'absolute',
        zIndex: 10,
        bottom: 0,
        padding: WP(SPACING_PERCENT / 2),
        justifyContent: 'space-around',
        paddingBottom: WP(SPACING_PERCENT),

        // left: WP(SPACING_PERCENT * 4),
    },
    icons: {
        margin: WP(2),
        width: WP(5),
        height: WP(5),
        borderColor: COLOR.red,
        borderWidth: 1,
        borderRadius: WP(50),
        alignItems: 'center',
        justifyContent: 'center',
    },
    dot: {
        width: WP(2), height: WP(2), borderRadius: WP(2), backgroundColor: 'red',
        position: 'absolute',
        top: WP(1),
        right: WP(2),
    },
});

const mapStateToProps = (state) => {
    const { app } = state;

    return {
        theme: app.theme,
    };
};

export default connect(mapStateToProps, {})(Display);
