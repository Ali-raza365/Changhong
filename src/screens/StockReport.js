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
} from 'react-native';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconMaterialC from 'react-native-vector-icons/MaterialCommunityIcons';
import Fonts from '../assets/fonts';
import { connect } from 'react-redux';
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
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Tabs from '../components/Tabs';
import LoadingComponent from '../components/LoadingComponent';
import { useDispatch, useSelector } from 'react-redux';
import { _GETStocks } from '../store/actions/stockaction';

const StockReport = (props) => {
    const { theme, navigation } = props;
    const [active, setactive] = useState(0);
    const [data, setdata] = useState({
        changhong: [],
        chiq: [],
    });
    const ontabChanges = (ind) => {
        console.log('sadas', ind);
        setactive(ind);
    };
    const dispatch = useDispatch();
    const { stocks, stock_loading } = useSelector((state) => state.stock);

    useEffect(() => {
        getStock();
    }, []);

    useEffect(() => {
        if (stocks.length !== 0) {
            let chang = [];
            let arrchiq = [];
            stocks.shop_stock.map((it) => {
                console.log(it.slug);
                if (it.slug == 'changhong-ruba') {
                    chang = [...it.subs];
                }
                if (it.slug == 'chiq') {
                    arrchiq = [...it.subs];
                }
            });
            setdata({
                ...data,
                changhong: chang,
                chiq: arrchiq,
            });
        }
    }, [stocks]);

    const getStock = () => {
        dispatch(_GETStocks());
    };

    if (stock_loading) {
        return <LoadingComponent />;
    }
    console.log(stocks);

    // const data = [
    //     { productName: 'TV', qty: '10', icon: 'tv' },
    //     { productName: 'AC', qty: '10', icon: 'tv' },
    //     { productName: 'Refrigerator', qty: '10', icon: 'tv' },
    // ];

    return (
        <View style={{ backgroundColor: COLOR.whiteColor, flex: 1 }}>
            <HeaderSearchComponent navigation={navigation} title="Stock Report" />
            <Tabs
                totalTabs="2"
                ontabChanges={ontabChanges}
                Tabs={[{ title: 'Changhong' }, { title: 'Chiq' }]}
            />
            {active == 0 && (
                <FlatList
                    data={data.changhong}
                    // data={[, , , , , , , , , , , , , , , ,]}
                    contentContainerStyle={{
                        backgroundColor: COLOR.whiteColor,
                    }}
                    keyExtractor={(item, index) => 'home-item' + index.toString()}
                    ListFooterComponent={() => {
                        return <View style={{ marginBottom: WP(20) }}></View>;
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
                                onPress={() => {
                                    navigation.navigate('StockDetails', {
                                        _data: item.products,
                                        name: item.name,
                                        slug: stocks.shop_channel ? stocks.shop_channel.slug : null,
                                    });
                                }}
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
                                    flexDirection: 'row',
                                    backgroundColor: COLOR.whiteColor,
                                    // justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}>
                                {item.name === 'TV' && (
                                    <IconFontAwesome
                                        name={'tv'}
                                        size={WP(10)}
                                        color={COLOR.red}
                                    />
                                )}
                                {item.name === 'AC' && (
                                    <Image
                                        resizeMode="contain"
                                        style={{ padding: WP(6), width: 0, height: 0 }}
                                        source={IMAGE.ac}
                                    />
                                )}
                                {item.name === 'Refrigerator' && (
                                    <Image
                                        resizeMode="contain"
                                        style={{ padding: WP(6), width: 0, height: 0 }}
                                        source={IMAGE.fridge}
                                    />
                                )}
                                <View style={{ paddingHorizontal: WP(3) }}>
                                    <Text
                                        style={{
                                            lineHeight: WP(SPACING_PERCENT),
                                            fontSize: WP(5.5),
                                            color: COLOR.primary,
                                            fontWeight: 'bold',
                                            marginTop: WP(3),
                                        }}>
                                        {item.name}
                                    </Text>
                                    <Text
                                        style={{ lineHeight: WP(SPACING_PERCENT), fontSize: WP(3) }}>
                                        {/* {item.qty + ' Models'} */}
                                    </Text>
                                </View>
                                <Icon
                                    name="chevron-forward-outline"
                                    onPress={() => {
                                        navigation.navigate('StockDetails', {
                                            _data: item.products,
                                            name: item.name,
                                            slug: stocks.shop_channel
                                                ? stocks.shop_channel.slug
                                                : null,
                                        });
                                    }}
                                    size={WP(8)}
                                    style={{ position: 'absolute', right: WP(2) }}
                                    color={COLOR.gray}
                                />
                            </TouchableOpacity>
                        );
                    }}
                />
            )}
            {active == 1 && (
                <FlatList
                    data={data.chiq}
                    contentContainerStyle={{
                        backgroundColor: COLOR.whiteColor,
                    }}
                    keyExtractor={(item, index) => 'home-item' + index.toString()}
                    ListFooterComponent={() => {
                        return <View style={{ marginBottom: WP(20) }}></View>;
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
                                onPress={() => {
                                    navigation.navigate('StockDetails', {
                                        _data: item.products,
                                        name: item.name,
                                        slug: stocks.shop_channel ? stocks.shop_channel.slug : null,
                                    });
                                }}
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
                                    flexDirection: 'row',
                                    backgroundColor: COLOR.whiteColor,
                                    // justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}>
                                {item.name === 'TV' && (
                                    <IconFontAwesome
                                        name={'tv'}
                                        size={WP(10)}
                                        color={COLOR.red}
                                    />
                                )}
                                {item.name === 'AC' && (
                                    <Image
                                        resizeMode="contain"
                                        style={{ padding: WP(6), width: 0, height: 0 }}
                                        source={IMAGE.ac}
                                    />
                                )}
                                {item.name === 'Refrigerator' && (
                                    <Image
                                        resizeMode="contain"
                                        style={{ padding: WP(6), width: 0, height: 0 }}
                                        source={IMAGE.fridge}
                                    />
                                )}
                                <View style={{ paddingHorizontal: WP(3) }}>
                                    <Text
                                        style={{
                                            lineHeight: WP(SPACING_PERCENT),
                                            fontSize: WP(5.5),
                                            color: COLOR.primary,
                                            fontWeight: 'bold',
                                            marginTop: WP(3),
                                        }}>
                                        {item.name}
                                    </Text>
                                    <Text
                                        style={{ lineHeight: WP(SPACING_PERCENT), fontSize: WP(3) }}>
                                        {/* {item.qty + ' Models'} */}
                                    </Text>
                                </View>
                                <Icon
                                    name="chevron-forward-outline"
                                    onPress={() => {
                                        navigation.navigate('StockDetails', {
                                            _data: item.products,
                                            name: item.name,
                                            slug: stocks.shop_channel
                                                ? stocks.shop_channel.slug
                                                : null,
                                        });
                                    }}
                                    size={WP(8)}
                                    style={{ position: 'absolute', right: WP(2) }}
                                    color={COLOR.gray}
                                />
                            </TouchableOpacity>
                        );
                    }}
                />
            )}
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

export default connect(mapStateToProps, {})(StockReport);
