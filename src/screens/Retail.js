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
    RefreshControl,
    TouchableOpacity,
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
import HeaderSearchComponent from '../components/HeaderSearchComponent';
import Tabs from '../components/Tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { AllVoucher } from '../store/actions/Voucher';
import LoadingComponent from '../components/LoadingComponent';


const Home = ({ navigation }) => {
    const [active, setactive] = useState(0)
    const [refreshing, setRefreshing] = useState(false);


    const ontabChanges = (ind) => {
        console.log("sadas", ind);
        setactive(ind)
    }
    const { all_vouchers_loading, vouchers } = useSelector(state => state.voucher)
    const dispatch = useDispatch()
    useEffect(() => {
        getallvouchers()
    }, [])

    const getallvouchers = () => {
        dispatch(AllVoucher())
    }
    const onRefresh = () => {
        //Clear old data of the list
        getallvouchers()
    };
    // if (all_vouchers_loading) {
    //     return <LoadingComponent />
    // }

    return (
        <View style={{ backgroundColor: COLOR.whiteColor, flex: 1 }}>
            <HeaderSearchComponent
                navigation={navigation}
                title="My Retail" />
            <Tabs totalTabs="4"
                ontabChanges={ontabChanges}
                Tabs={[
                    { title: 'Draft' },
                    { title: 'Submitted' },
                    { title: 'Confirmed' },
                    { title: 'Rejected' },
                ]} />
            {all_vouchers_loading && <LoadingComponent containerStyle={{ position: 'absolute', zIndex: 99, flex: 1, width: '100%', height: '100%' }} />}
            {active == 0 &&

                <FlatList
                    refreshControl={
                        <RefreshControl
                            //refresh control used for the Pull to Refresh
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                    // data={vouchers ? vouchers : []}

                    data={vouchers ? vouchers.filter((item) => { return item.status == "processing" }) : []}
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
                    ListEmptyComponent={() => {
                        return (
                            <View
                                style={{
                                    flex: 1,
                                    // width: '100%',
                                    height: WP("180%"),
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
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        padding: WP(SPACING_PERCENT),
                                        borderTopColor: COLOR.blackColor,
                                        alignItems: 'center',
                                        borderTopWidth: 1,
                                        borderStyle: 'dashed',
                                        borderRadius: 1,
                                        justifyContent: 'space-between',
                                    }}>
                                    <View>

                                        <Text
                                            style={{
                                                lineHeight: WP(SPACING_PERCENT + 2),
                                                fontWeight: '600',
                                            }}>
                                            Created At: {new Date(item.created_at).toLocaleDateString()}
                                        </Text>
                                    </View>
                                    <View>
                                        <Text
                                            style={{
                                                lineHeight: WP(SPACING_PERCENT + 2),
                                                fontWeight: '600',
                                            }}>
                                            RS {item.pay_amount}
                                        </Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        );
                    }}
                />}
            {active == 1 &&
                <FlatList
                    refreshControl={
                        <RefreshControl
                            //refresh control used for the Pull to Refresh
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                    data={vouchers ? vouchers.filter((item) => { return item.status == "pending" }) : []}
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
                    ListEmptyComponent={() => {
                        return (
                            <View
                                style={{
                                    flex: 1,
                                    // width: '100%',
                                    height: WP("180%"),
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
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        padding: WP(SPACING_PERCENT),
                                        borderTopColor: COLOR.blackColor,
                                        alignItems: 'center',
                                        borderTopWidth: 1,
                                        borderStyle: 'dashed',
                                        borderRadius: 1,
                                        justifyContent: 'space-between',
                                    }}>
                                    <View>

                                        <Text
                                            style={{
                                                lineHeight: WP(SPACING_PERCENT + 2),
                                                fontWeight: '600',
                                            }}>
                                            Created At: {new Date(item.created_at).toLocaleDateString()}
                                        </Text>
                                    </View>
                                    <View>
                                        <Text
                                            style={{
                                                lineHeight: WP(SPACING_PERCENT + 2),
                                                fontWeight: '600',
                                            }}>
                                            RS {item.pay_amount}
                                        </Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        );
                    }}
                />}
            {active == 2 &&
                <FlatList
                    refreshControl={
                        <RefreshControl
                            //refresh control used for the Pull to Refresh
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                    data={vouchers ? vouchers.filter((item) => { return item.status == "completed" }) : []}
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
                    ListEmptyComponent={() => {
                        return (
                            <View
                                style={{
                                    flex: 1,
                                    // width: '100%',
                                    height: WP("180%"),
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
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        padding: WP(SPACING_PERCENT),
                                        borderTopColor: COLOR.blackColor,
                                        alignItems: 'center',
                                        borderTopWidth: 1,
                                        borderStyle: 'dashed',
                                        borderRadius: 1,
                                        justifyContent: 'space-between',
                                    }}>
                                    <View>

                                        <Text
                                            style={{
                                                lineHeight: WP(SPACING_PERCENT + 2),
                                                fontWeight: '600',
                                            }}>
                                            Created At: {new Date(item.created_at).toLocaleDateString()}
                                        </Text>
                                    </View>
                                    <View>
                                        <Text
                                            style={{
                                                lineHeight: WP(SPACING_PERCENT + 2),
                                                fontWeight: '600',
                                            }}>
                                            RS {item.pay_amount}
                                        </Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        );
                    }}
                />}
            {active == 3 &&
                <FlatList
                    refreshControl={
                        <RefreshControl
                            //refresh control used for the Pull to Refresh
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                    data={vouchers ? vouchers.filter((item) => { return item.status == "declined" }) : []}
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
                    ListEmptyComponent={() => {
                        return (
                            <View
                                style={{
                                    flex: 1,
                                    // width: '100%',
                                    height: WP("180%"),
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
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        padding: WP(SPACING_PERCENT),
                                        borderTopColor: COLOR.blackColor,
                                        alignItems: 'center',
                                        borderTopWidth: 1,
                                        borderStyle: 'dashed',
                                        borderRadius: 1,
                                        justifyContent: 'space-between',
                                    }}>
                                    <View>

                                        <Text
                                            style={{
                                                lineHeight: WP(SPACING_PERCENT + 2),
                                                fontWeight: '600',
                                            }}>
                                            Created At: {new Date(item.created_at).toLocaleDateString()}
                                        </Text>
                                    </View>
                                    <View>
                                        <Text
                                            style={{
                                                lineHeight: WP(SPACING_PERCENT + 2),
                                                fontWeight: '600',
                                            }}>
                                            RS {item.pay_amount}
                                        </Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        );
                    }}
                />}
            {/* <TouchableOpacity
                        onPress={() => {
                              // navigation.navigate("Menu")
                        }}
                        accessible={true}
                        style={{
                              position: 'absolute',
                              //     top: -WP(11.5),
                              bottom: WP(5),
                              right: WP(5),
                              width: WP(15),
                              height: WP(15),
                              borderRadius: WP(10),
                              backgroundColor: COLOR.primary,
                              elevation: 5,
                              alignItems: 'center',
                              justifyContent: 'center'
                        }}>
                        <Icon name="qr-code-outline" size={WP(7)} color={COLOR.whiteColor} />
                  </TouchableOpacity> */}
        </View>
    );
};

const styles = StyleSheet.create({});



export default Home;
