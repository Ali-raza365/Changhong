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
import HeaderComponent from '../components/HeaderComponent';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Tabs from '../components/Tabs';
import SearchInput from '../components/SearchComponent';
import { _StockOrder } from '../store/actions/stockaction';
import LoadingComponent from '../components/LoadingComponent';
import { useDispatch, useSelector } from 'react-redux';
import { _AddToCart, _PushIntoCart, _RemoveToCart } from '../store/actions/stockaction';


const StockDetailsTotal = (props) => {
    const { theme, navigation, route } = props;
    const [active, setactive] = useState(0);
    const { _data, name } = route.params;
    const { stock_order_loading, cartarray } = useSelector(state => state.stock)
    const [data, setdata] = useState([...cartarray]);
    const dispatch = useDispatch()
    const [handleExtraData, setHandleExtraDara] = useState(false);
    const [total, setTotal] = useState(0);
    const [searchText, setsearchText] = useState('')
    const [searchArry, setsearchArry] = useState([])

    const onChangeText = (ind) => {
        console.log('sadas', ind);
        setactive(ind);
    };

    const StockOrder = () => {
        let productIds = []
        let Quantity = []
        data.map((product) => {
            if (product.Quantity !== 0) {
                productIds.push(product.id)
                Quantity.push(product.Quantity)
                return product

            }
        })
        console.log({ Quantity, productIds })
        let detail = {
            product_id: productIds,
            quantity: Quantity
        }
        console.log(detail)
        dispatch(_StockOrder(detail, navigation))
    }
    const onSearchTextChange = (searchtext) => {
        setsearchText(searchtext)
        let searchArr = [...data]
        let display_searched = [];
        searchArr.forEach((item, index) => {
            if (item.name.toLowerCase().includes(searchtext.trim().toLowerCase()))
                display_searched.push(item);
        });
        setsearchArry(display_searched)
    }


    useEffect(() => {
        if (cartarray) {
            setdata(cartarray);
            let t = cartarray.map(function (a) { return { p: a.price, q: a.Quantity } }).reduce(function (total, current) {
                return +total + +current.p * current.q;
            }, 0)
            setTotal(t)
        }
    }, [cartarray])
    const Subtract = (id) => {
        let arr = data;


        arr = arr.map((item) => {
            if (item.id == id) {
                if (+item.Quantity >= 1) {
                    return {
                        ...item,
                        Quantity: +item.Quantity - 1,
                    }
                } else {
                    return {
                        ...item,
                    }
                }
            } else {
                return {
                    ...item,
                }
            }
        })
        setHandleExtraDara(!handleExtraData);
        setdata(arr)

        if (searchText !== "") {
            let newarr = searchArry.map((item) => {
                if (item.id == id) {
                    if (+item.Quantity >= 1) {
                        return {
                            ...item,
                            Quantity: +item.Quantity - 1,
                        }
                    } else {
                        return {
                            ...item,
                        }
                    }
                } else {
                    return {
                        ...item,
                    }
                }
            })
            setsearchArry([...newarr])
        }

        let t = arr.map(function (a) { return { p: a.price, q: a.Quantity } }).reduce(function (total, current) {
            return +total + +current.p * current.q;
        }, 0)
        setTotal(t)
        dispatch(_RemoveToCart(id))

    }

    const add = (id) => {
        let arr = data;

        arr = arr.map((item) => {
            if (item.id == id) {
                return {
                    ...item,
                    Quantity: +item.Quantity + 1,
                }
            } else {
                return {
                    ...item,
                }
            }
        })
        setHandleExtraDara(!handleExtraData);
        setdata(arr)
        if (searchText !== "") {
            let searcharr = searchArry.map((item) => {
                if (item.id == id) {
                    return {
                        ...item,
                        Quantity: +item.Quantity + 1,
                    }
                } else {
                    return {
                        ...item,
                    }
                }
            })
            setsearchArry(searcharr)
        }

        let t = arr.map(function (a) { return { p: a.price, q: a.Quantity } }).reduce(function (total, current) {
            return +total + +current.p * current.q;
        }, 0)
        setTotal(t)
        dispatch(_AddToCart(id))

    }


    if (stock_order_loading) {
        return <LoadingComponent />
    }

    return (
        <View
            style={{
                backgroundColor: COLOR.whiteColor,
                flex: 1,
            }}
        >
            <HeaderComponent
                navigation={navigation}
                title={"Total"}
                containerStyle={{ backgroundColor: COLOR.primary }}
                titleStyle={{ color: COLOR.whiteColor }}
                iconStyle={{ color: COLOR.whiteColor }}
            />
            <SearchInput placeholder="Search..." onChangeText={onSearchTextChange} />
            <FlatList
                data={searchText == '' ? data : searchArry}
                contentContainerStyle={{
                    backgroundColor: COLOR.whiteColor,
                }}
                extraData={handleExtraData}
                keyExtractor={(item, index) => 'home-item' + index.toString()}
                ListFooterComponent={() => {
                    return (
                        <>
                            <View
                                style={{
                                    width: '90%',
                                    marginTop: WP(SPACING_PERCENT),
                                    marginLeft: "auto",
                                    marginRight: "auto",
                                    borderColor: COLOR.darkGray,
                                    borderWidth: 0.7,
                                    paddingHorizontal: WP(SPACING_PERCENT),
                                }}></View>
                            <View
                                style={{
                                    width: '90%',
                                    // marginTop: WP(SPACING_PERCENT),
                                    marginLeft: "auto",
                                    marginRight: "auto",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    // borderColor: COLOR.darkGray,
                                    // borderWidth: 0.7,
                                    paddingVertical: WP(SPACING_PERCENT),
                                }}>
                                <Text style={{
                                    color: COLOR.DarkRed,
                                    fontWeight: "600",
                                    fontSize: WP(4.4)
                                }}>Sub Total</Text>
                                <Text
                                    style={{
                                        fontWeight: "600",
                                        fontSize: WP(4.4)
                                    }}
                                >Rs {total}
                                </Text>
                            </View>
                            <TouchableOpacity
                                disabled={total == 0 ? true : false}
                                onPress={() => {
                                    // if (validate()) {
                                    StockOrder()
                                    // navigation.navigate('Conformation',);
                                    // onLoginPress()
                                    // }
                                }}
                                style={{
                                    opacity: total == 0 ? 0.7 : 1,
                                    margin: WP(SPACING_PERCENT * 1),
                                    flexDirection: 'row',
                                    paddingHorizontal: WP(SPACING_PERCENT),
                                    backgroundColor: COLOR.primary,
                                    height: WP(SPACING_PERCENT * 3),
                                    borderRadius: 10,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                <Text
                                    style={{
                                        fontSize: WP(4),
                                        color: 'white',
                                    }}>
                                    Confirm
                                </Text>
                            </TouchableOpacity>
                        </>
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
                        <View
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
                            {item.icontype === 'TV' &&
                                <IconFontAwesome
                                    name={"tv"}
                                    size={WP(10)}
                                    color={COLOR.red}
                                />}
                            {item.icontype === 'AC' &&
                                <Image
                                    resizeMode="contain"
                                    style={{ padding: WP(6), width: 0, height: 0 }}

                                    source={IMAGE.ac}
                                />}
                            {item.icontype === 'Refrigerator' &&
                                <Image
                                    resizeMode="contain"
                                    style={{ padding: WP(6), width: 0, height: 0 }}

                                    source={IMAGE.fridge}
                                />}
                            <View style={{ paddingHorizontal: WP(3) }}>
                                <Text
                                    style={{
                                        lineHeight: WP(SPACING_PERCENT),
                                        fontSize: WP(4.5),
                                        color: COLOR.primary,
                                        fontWeight: 'bold',
                                        marginTop: WP(3),
                                    }}>
                                    {item.name}
                                </Text>
                                <Text
                                    style={{ lineHeight: WP(SPACING_PERCENT), fontSize: WP(3) }}>
                                    Quantity : {item.stock == null ? 0 : item.stock}
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
                                <Text style={{ fontSize: WP(5) }}>Rs {item.price}</Text>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-around',
                                        alignItems: 'center',
                                        marginTop: WP(2),
                                        width: WP(20),
                                    }}>
                                    <Icon
                                        onPress={() => {
                                            Subtract(item.id)
                                            // console.log('remove click');
                                        }}
                                        name="remove-circle-outline"
                                        size={WP(6)}
                                        color={COLOR.gray}
                                    />
                                    <Text>{item.Quantity}</Text>
                                    <Icon
                                        onPress={() => {
                                            if (item.stock) {
                                                if (item.stock > item.Quantity) {
                                                    console.log('add click')
                                                    add(item.id)
                                                } else {
                                                    alert("Product not available in this quantity.")
                                                }
                                            } else {
                                                alert("Product not available in this quantity.")
                                            }
                                        }}
                                        name="add-circle-outline"
                                        size={WP(6)}
                                        color={COLOR.DarkRed}
                                    />
                                </View>
                            </View>
                        </View>
                    );
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
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
});

const mapStateToProps = (state) => {
    const { app } = state;

    return {
        theme: app.theme,
    };
};

export default connect(mapStateToProps, {})(StockDetailsTotal);
