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
    TouchableOpacity,
    RefreshControl
} from 'react-native';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconMaterialC from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/Ionicons';
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
} from '../common/Config';
import HeaderComponent from '../components/HeaderComponent';
import { useDispatch, useSelector } from 'react-redux';
import { getTransactionHistory } from '../store/actions/Wallet';
import LoadingComponent from '../components/LoadingComponent';
const TransactionHistory = (props) => {
    const { theme, navigation } = props;

    useEffect(() => {
        getTransHistory()
    }, [])
    const [refreshing, setRefreshing] = useState(false);

    const { Wallet_History_loading, Transactions } = useSelector(state => state.wallet)
    const dispatch = useDispatch()
    const getTransHistory = () => {
        dispatch(getTransactionHistory())

    }
    const onRefresh = () => {
        getTransHistory()
    };

    if (Wallet_History_loading) {
        return <LoadingComponent />
    }
    return (
        <View style={{ flex: 1, backgroundColor: COLOR.whiteColor }}>
            <HeaderComponent
                navigation={navigation}
                containerStyle={{ backgroundColor: COLOR.primary }}
                iconStyle={{ color: COLOR.whiteColor }}
                titleStyle={{ color: COLOR.whiteColor }}
                title="Transaction History"
            />
            <FlatList
                refreshControl={
                    <RefreshControl
                        //refresh control used for the Pull to Refresh
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
                data={Transactions}
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
                renderItem={({ item, index }) => {
                    console.log(item)
                    return (
                        <TouchableOpacity
                            onPress={() => {
                                // navigation.navigate("Display")
                            }}
                            accessible={true}
                            style={{
                                position: 'relative',
                                margin: WP(2.5),
                                padding: WP(3),
                                width: WP('95%'),
                                borderRadius: 10,
                                elevation: 15,
                                flexDirection: 'row',
                                backgroundColor: COLOR.whiteColor,
                                alignItems: 'center',
                            }}>
                            <FontAwesome5
                                name="file-invoice-dollar"
                                size={WP(8)}
                                color={COLOR.primary}
                            />
                            <View style={{ paddingHorizontal: WP(3) }}>
                                <Text
                                    style={{
                                        lineHeight: WP(SPACING_PERCENT),
                                        fontSize: WP(4.5),
                                        color: COLOR.primary,
                                        fontWeight: 'bold',
                                    }}>
                                    {new Date(item.created_at).toLocaleDateString()}
                                </Text>

                            </View>

                            <View
                                accessible={true}
                                style={{
                                    position: 'absolute',
                                    right: WP(2),
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                <Text style={{ fontSize: WP(4.5), color: COLOR.gray }}>
                                    Rs {item.amount}
                                </Text>
                                <Text
                                    style={{
                                        lineHeight: WP(SPACING_PERCENT),
                                        fontSize: WP(3.5),
                                        color: item.status == "completed" ? COLOR.success : item.status == "rejected" ? COLOR.red : COLOR.primary

                                    }}>
                                    {item.status}
                                </Text>
                            </View>
                        </TouchableOpacity>
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

export default TransactionHistory;
