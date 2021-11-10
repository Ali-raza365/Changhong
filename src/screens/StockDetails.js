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
import HeaderComponent from '../components/HeaderComponent';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Tabs from '../components/Tabs';
import SearchInput from '../components/SearchComponent';
import { _AddToCart, _PushIntoCart, _RemoveToCart } from '../store/actions/stockaction';

// const [data, setdata] = useState([{ productName: 'TV', qty: '10', icon: 'tv', },
// { productName: 'AC', qty: '10', icon: 'tv' },
// { productName: 'AC', qty: '10', icon: 'tv' },
// { productName: 'AC', qty: '10', icon: 'tv' },
// { productName: 'AC', qty: '10', icon: 'tv' },
// { productName: 'Refrigerator', qty: '10', icon: 'tv' }]);

const StockDetails = (props) => {
    const { theme, navigation, route } = props;
    const { _data, name, slug } = route.params;
    const [active, setactive] = useState(0);
    const dispatch = useDispatch()
    const [handleExtraData, setHandleExtraDara] = useState(false);
    const [data, setdata] = useState([..._data]);
    const [total, setTotal] = useState(0);
    const [searchText, setsearchText] = useState('')
    const [searchArry, setsearchArry] = useState([])
    const { cartarray } = useSelector(state => state.stock)

    const onChangeText = (ind) => {
        console.log('sadas', ind);
        setactive(ind);
    };
    useEffect(() => {
        if (_data) {
            console.log("data useEffect")
            console.log("", slug)
            let newarr = _data.map((item) => {
                if (slug == "e-commerce") {
                    return {
                        ...item,
                        stock: item.e_commerce ? item.e_commerce : 0,
                        Quantity: 0
                    }
                } else if (slug == "zsm") {
                    return {
                        ...item,
                        stock: item.zsm ? item.zsm : 0,
                        Quantity: 0
                    }
                } else if (slug == "moder-trade") {
                    return {
                        ...item,
                        stock: item.moder_trade ? item.moder_trade : 0,
                        Quantity: 0
                    }
                } else if (slug == "key-accounts") {
                    return {
                        ...item,
                        stock: item.key_accounts ? item.key_accounts : 0,
                        Quantity: 0
                    }
                } else if (slug == "top-dealers") {
                    return {
                        ...item,
                        stock: item.top_dealers ? item.top_dealers : 0,
                        Quantity: 0
                    }
                } else {
                    return {
                        ...item,
                        stock: 30,
                        Quantity: 0
                    }
                }
            })
            if (cartarray.length !== 0) {
                let arr = []
                newarr.map((a) => {
                    let flag = cartarray.filter((cart) => {
                        if (a.id == cart.id) {
                            arr.push(cart)
                            return true
                        }
                    })
                    console.log({ flag })
                    if (flag.length == 0) {
                        arr.push(a)
                    }
                })
                setdata(arr)
                let t = arr.map(function (a) { return { p: a.price, q: a.Quantity } }).reduce(function (total, current) {
                    return +total + +current.p * current.q;
                }, 0)
                setTotal(t)

            } else {
                setdata(newarr)
            }

        }

    }, [_data])

    // useEffect(() => {
    //     if (cartarray.length !== 0) {
    //         let arr = []
    //         data.map((a) => {
    //             let flag = cartarray.filter((cart) => {
    //                 if (a.id == cart.id) {
    //                     arr.push(cart)
    //                     return true
    //                 }
    //             })
    //             console.log({ flag })
    //             if (flag.length == 0) {
    //                 arr.push(a)
    //             }
    //         })
    //         setdata(arr)
    //         let t = data.map(function (a) { return { p: a.price, q: a.Quantity } }).reduce(function (total, current) {
    //             return +total + +current.p * current.q;
    //         }, 0)
    //         setTotal(t)

    //     }
    // }, [cartarray])

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

    return (
        <View style={{ backgroundColor: COLOR.whiteColor, flex: 1 }}>
            <HeaderComponent
                navigation={navigation}
                title={name}
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
                ListFooterComponent={() => {
                    return (
                        <View style={{ marginBottom: WP(20), }}>
                        </View>
                    )
                }}
                extraData={handleExtraData}
                keyExtractor={(item, index) => 'home-item' + index.toString()}
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
                            {name === 'TV' &&
                                <IconFontAwesome
                                    name={"tv"}
                                    size={WP(10)}
                                    color={COLOR.red}
                                />}
                            {name === 'AC' &&
                                <Image
                                    resizeMode="contain"
                                    style={{ padding: WP(6), width: 0, height: 0 }}

                                    source={IMAGE.ac}
                                />}
                            {name === 'Refrigerator' &&
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
                                    Quantity : {item.stock}
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
                                            console.log('remove click', 7 > item.Quantity, item.stock);
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
            {data.length !== 0 && <TouchableOpacity

                disabled={total == 0 ? true : false}
                onPress={() => {
                    let arr = []
                    data.map((product) => {
                        if (product.Quantity !== 0) {
                            arr.push({ ...product, icontype: name })
                            return product
                        }
                    })
                    dispatch(_PushIntoCart(arr))
                    navigation.navigate("StockDetailsTotal", { _data: arr, name })
                }}
                style={{
                    // marginTop: WP(SPACING_PERCENT * 2),
                    margin: WP(SPACING_PERCENT * 1),
                    flexDirection: "row",
                    paddingHorizontal: WP(SPACING_PERCENT),
                    backgroundColor: COLOR.primary,
                    height: WP(SPACING_PERCENT * 3),
                    borderRadius: 10,
                    opacity: total == 0 ? 0.7 : 1,
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}
            >
                <Text style={{
                    fontSize: WP(4),
                    color: 'white'
                }}>Confirm</Text>
                <Text style={{
                    fontSize: WP(4),
                    color: 'white'
                }}>Rs {total}</Text>
            </TouchableOpacity>}
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

export default connect(mapStateToProps, {})(StockDetails);
