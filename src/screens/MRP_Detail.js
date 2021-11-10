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
import { useDispatch, useSelector } from 'react-redux';

import LoadingComponent from '../components/LoadingComponent';
import { _GETMRPProduct } from '../store/actions/mrp';

const MRPDetail = (props) => {
    const { theme, navigation, route } = props;
    const { ids, name } = route.params;
    const [active, setactive] = useState(0);
    const [handleExtraData, setHandleExtraDara] = useState(false);
    const [searchText, setsearchText] = useState('')
    const [searchArry, setsearchArry] = useState([])
    const { MRP_Product_loading, MRP_ProductList } = useSelector(state => state.MRP)
    const dispatch = useDispatch()
    const [data, setdata] = useState([{ productName: 'TV', qty: '10', icon: 'tv', },
    { productName: 'AC', qty: '10', icon: 'tv' },
    { productName: 'AC', qty: '10', icon: 'tv' },
    { productName: 'AC', qty: '10', icon: 'tv' },
    { productName: 'AC', qty: '10', icon: 'tv' },
    { productName: 'Refrigerator', qty: '10', icon: 'tv' }]);

    const onChangeText = (ind) => {
        console.log('sadas', ind);
        setactive(ind);
    };

    useEffect(() => {
        getmrpProd()
    }, [])


    const getmrpProd = () => {
        console.log({ ...ids }, "sdfdsf")
        dispatch(_GETMRPProduct({ ...ids }))
    }

    const onSearchTextChange = (searchtext) => {
        setsearchText(searchtext)

        let searchArr = [...MRP_ProductList]
        let display_searched = [];

        searchArr.forEach((item, index) => {
            if (item.name.toLowerCase().includes(searchtext.trim().toLowerCase()))
                display_searched.push(item);
        });
        setsearchArry(display_searched)
    }


    if (MRP_Product_loading) {
        return <LoadingComponent />
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
                data={searchText == '' ? MRP_ProductList : searchArry}
                contentContainerStyle={{
                    backgroundColor: COLOR.whiteColor,
                }}
                extraData={handleExtraData}
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
                                // height: 15,
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
                                    }}>
                                    {item.name}
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
                                <Text style={{ fontSize: WP(4.5), color: COLOR.gray }}>Rs {item.price}</Text>

                            </View>
                        </TouchableOpacity>
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

export default MRPDetail
