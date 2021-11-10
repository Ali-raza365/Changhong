/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    FlatList,
    Image,
    TouchableOpacity,
    RefreshControl

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
} from '../common/Config';
import { AllVoucher } from '../store/actions/Voucher';
import LoadingComponent from '../components/LoadingComponent';
import { chechPermissionStatus } from '../utils/PermissionsManager';


const Home = (props) => {
    const { theme, navigation } = props;
    const [refreshing, setRefreshing] = useState(false);

    const { all_vouchers_loading, vouchers } = useSelector(state => state.voucher)
    const dispatch = useDispatch()
    useEffect(() => {
        // getallvouchers()
        chechPermissionStatus()
    }, [])

    const getallvouchers = () => {
        dispatch(AllVoucher())
    }
    const onRefresh = () => {
        getallvouchers()
    };

    if (all_vouchers_loading) {
        return <LoadingComponent />
    }
    return (
        <>
            <View style={{
                flex: 1,
                backgroundColor: COLOR.whiteColor,
            }} >
                <FlatList
                    refreshControl={
                        <RefreshControl
                            //refresh control used for the Pull to Refresh
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                    data={vouchers}
                    contentContainerStyle={{
                        // flex: 1,
                    }}
                    keyExtractor={(item, index) => 'home-item' + index.toString()}
                    ListFooterComponent={() => {
                        return (
                            <View style={{ marginBottom: WP(20), }}>
                            </View>
                        )
                    }}
                    ListHeaderComponent={() => {
                        return (
                            <>
                                {/* <View style={{ overflow: 'hidden', width: "85%", marginLeft: "auto", marginRight: "auto" }}>
                                    <Image source={IMAGE.logo} style={{ width: "100%", height: HP(13) }} resizeMode="contain" />
                                </View> */}
                                <View style={{ overflow: 'hidden', }}>
                                    <Image source={IMAGE.earth} style={{}} />
                                </View>
                                {/* <Text
                                    // onPress={() => {
                                    //     navigation.navigate('Auth', {
                                    //         screen: 'WelcomeScr',
                                    //         params: { user: 'jane' },
                                    //     });
                                    // }}
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        color: COLOR.primary,
                                        fontSize: WP(4.5),
                                        fontWeight: 'bold',
                                        paddingVertical: WP(SPACING_PERCENT),
                                        paddingHorizontal: WP(SPACING_PERCENT),
                                    }}>
                                    Changhong Outlet, DHA
                                </Text> */}
                                <Text
                                    style={{
                                        color: COLOR.primary,
                                        fontSize: WP(4),
                                        fontWeight: 'bold',
                                        paddingTop: WP(2),
                                        lineHeight: WP(6),
                                        // paddingVertical: WP(SPACING_PERCENT),
                                        paddingHorizontal: WP(SPACING_PERCENT),
                                    }}>
                                    Step # 1 Scan QR code. {"\n"}

                                    Step # take & upload a picture
                                </Text>
                                <Text
                                    style={{
                                        color: COLOR.primary,
                                        fontSize: WP(4.5),
                                        fontWeight: 'bold',
                                        paddingVertical: WP(SPACING_PERCENT),
                                        paddingHorizontal: WP(SPACING_PERCENT),
                                    }}>
                                    Recently Submitted Vouchers
                                </Text>
                            </>
                        );
                    }}
                    ListEmptyComponent={() => {
                        return (
                            <View
                                style={{
                                    flex: 1,
                                    height: WP('90%'),
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                <IconMaterialC
                                    name="view-list-outline"
                                    color={COLOR.primary}
                                    size={WP(30)}
                                    onPress={() => {
                                        console.log('goBack');
                                        navigation.goBack();
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
                    ItemSeparatorComponent={() => {
                        return (
                            <View
                                style={{
                                    height: 15,
                                    backgroundColor: '#ffff',
                                }}
                            />
                        );
                    }}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity
                                style={{
                                    margin: WP(2.5),
                                    // marginRight: WP(SPACING_PERCENT),
                                    width: WP('95%'),
                                    height: WP(30),
                                    borderRadius: 10,
                                    elevation: 15,
                                    backgroundColor: COLOR.whiteColor,
                                }}>
                                <Text
                                    style={{
                                        color: COLOR.primary,
                                        fontWeight: 'bold',
                                        padding: WP(SPACING_PERCENT),
                                        fontSize: WP(4.5),
                                    }}>
                                    {item.order_number}
                                </Text>
                                <View style={{
                                    flexDirection: 'row',
                                    padding: WP(SPACING_PERCENT),
                                    borderTopColor: COLOR.blackColor,
                                    alignItems: 'center',
                                    borderTopWidth: 1,
                                    borderStyle: 'dashed',
                                    borderRadius: 1,
                                    justifyContent: "space-between",
                                }}>
                                    <View >
                                        {/* <Text style={{ lineHeight: WP(SPACING_PERCENT), fontWeight: "600" }}>Incentive  </Text> */}
                                        <Text style={{ lineHeight: WP(SPACING_PERCENT + 2), fontWeight: "600" }}>Created At:{new Date(item.created_at).toLocaleDateString()} </Text>
                                    </View>
                                    <View>
                                        <Text style={{ lineHeight: WP(SPACING_PERCENT + 2), fontWeight: "600" }}>RS {item.pay_amount}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        );
                    }}
                />
            </View>
        </>
    );
};

const styles = StyleSheet.create({});

const mapStateToProps = (state) => {
    const { app } = state;

    return {
        theme: app.theme,
    };
};

export default connect(mapStateToProps, {})(Home);
