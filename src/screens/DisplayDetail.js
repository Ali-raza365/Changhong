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
    PermissionsAndroid,
} from 'react-native';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
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
    PLATFORM,
} from '../common/Config';
import HeaderSearchComponent from '../components/HeaderSearchComponent';
import Icon from 'react-native-vector-icons/Ionicons';
import Tabs from '../components/Tabs';
import { TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import LoadingComponent from '../components/LoadingComponent';
import { _GetBrandList, _GetCompetitorList, _GetDisplay } from '../store/actions/displayAction';

import * as ApiServices from '../services/index';
import AsyncStorage from '@react-native-community/async-storage';
import preferences from '../common/preferences';
import { RefreshControl } from 'react-native';



const DisplayDetail = (props) => {
    const { theme, navigation, route } = props;
    const { shopId, title } = route.params;
    const [usertype, setUsertype] = useState(null)
    const [active, setactive] = useState(0);
    const [selectType, setSelectType] = useState("");
    const [handleExtraData, setHandleExtraDara] = useState(false);
    const [photo, setPhoto] = useState("")
    const [loading, setLoading] = useState(false)
    const [searchText, setsearchText] = useState('')
    const [searchArry, setsearchArry] = useState([])
    const [selectArry, setselectArry] = useState([])
    const [refreshing, setRefreshing] = useState(false);

    const [data, setdata] = useState({
        displayArray: [],
        brandArray: [],
        competitorsArray: [],
    })

    const dispatch = useDispatch()
    const { displays, display_loading, display_brand_loading, displaybrand, display_competitors_loading, displaycompetitors } = useSelector(state => state.Display)


    const onRefresh = () => {
        //Clear old data of the list
        getDisplay()
        getDisplayBrand()
        getDisplayCompetitors()
    };
    useEffect(() => {
        // SetUserType()
        getDisplay()
        getDisplayBrand()
        getDisplayCompetitors()
    }, [])


    const onSelectType = (type) => {
        console.log(type, selectType, "onselect")
        if (type == selectType) {
            setSelectType("")
            getDisplay()
            setselectArry([])
            return false
        }
        setSelectType(type)
        let arr = data.displayArray.filter((item) => {
            if (item.subcategory.name === type) {
                return { ...item }
            }
        })
        setselectArry(arr)
    }


    useEffect(() => {
        if (displays.length !== 0) {
            let arr = displays.map((it) => { return { ...it, qty: 0 } })
            setdata({
                ...data,
                displayArray: arr,
            });
        }
    }, [displays])

    useEffect(() => {
        if (displaybrand.length !== 0) {
            let arr = displaybrand.map((it) => { return { ...it, qty: 0 } })
            setdata({
                ...data,
                brandArray: arr,
            });
        }
    }, [displaybrand])

    useEffect(() => {
        if (displaycompetitors.length !== 0) {
            let arr = displaycompetitors.map((it) => { return { ...it, qty: 0 } })
            setdata({
                ...data,
                competitorsArray: arr,
            });
        }
    }, [displaycompetitors])

    const saveDisplayDetails = () => {

        setLoading(true);

        let arr = Object.values(data)[active];
        let Quantity = [];
        let ModelNo = [];
        let SubType = [];
        let TypeId = [];
        let detail = {};
        let type = active + 1
        console.log({ type })
        if (type == "1") {
            if (selectType !== "") {
                selectArry.map((product) => {
                    if (product.qty !== 0) {
                        ModelNo.push(product.model_number)
                        Quantity.push(product.qty)
                        SubType.push(product.subcategory.name)
                        return product
                    }
                })
            } else {
                arr.map((product) => {
                    if (product.qty !== 0) {
                        ModelNo.push(product.model_number)
                        Quantity.push(product.qty)
                        SubType.push(product.subcategory.name)
                        return product
                    }
                })
            }

            detail = {
                shop_id: shopId,
                type: active + 1,
                quantity: Quantity,
                model_number: ModelNo,
                sub_type: SubType,
            }
        } else if (type == "2" || type == "3") {
            arr.map((product) => {
                if (product.qty !== 0) {
                    Quantity.push(product.qty)
                    TypeId.push(product.id)
                    return product
                }
            })
            detail = {
                shop_id: shopId,
                type: (active + 1),
                quantity: Quantity,
                type_id: TypeId
            }
        }
        console.log(detail)
        ApiServices._SaveDisplayApi(detail)
            .then((response) => {
                console.log(response)
                if (response.errors) {
                    alert(Object.values(response.errors)[0])
                }
                else if (response.success) {
                    alert(response.success.message)
                }
            })
            .catch((error) => {
                console.log(error)
                alert(error)
            })
            .finally(() => {
                setLoading(false);
            })
    }
    const SetUserType = async () => {

        const data = await AsyncStorage.getItem(preferences.KEYS.ACCESS_TOKEN);
        if (data) {
            let t = JSON.parse(data)
            if (t.type) {
                setUsertype(t.type)
            }
        } else {
            alert("Something went wrong")
            navigation.reset({
                index: 0,
                routes: [{
                    name: "Auth"
                }]
            })
        }
    }

    const getDisplay = () => {
        dispatch(_GetDisplay())
    }
    const getDisplayBrand = () => {
        dispatch(_GetBrandList())
    }
    const getDisplayCompetitors = () => {
        dispatch(_GetCompetitorList())
    }
    const Subtract = (arrName, index) => {
        let arr = Object.values(data)[active];

        arr = arr.map((item) => {
            if (item.id == index) {
                if (+item.qty >= 1) {
                    return {
                        ...item,
                        qty: +item.qty - 1,
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
        setdata({
            ...data,
            [arrName]: arr
        });
        if (searchText !== "") {
            let searcharr = searchArry.map((item) => {
                if (item.id == index) {
                    if (+item.qty >= 1) {
                        return {
                            ...item,
                            qty: +item.qty - 1,
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
            setsearchArry(searcharr)
        }
        if (selectType !== "") {
            let selectarr = selectArry.map((item) => {
                if (item.id == index) {
                    if (+item.qty >= 1) {
                        return {
                            ...item,
                            qty: +item.qty - 1,
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
            setselectArry([...selectarr])
        }
    };
    const add = (arrName, index) => {
        let arr = Object.values(data)[active];

        arr = arr.map((item) => {
            if (item.id == index) {
                return {
                    ...item,
                    qty: +item.qty + 1,
                }
            } else {
                return {
                    ...item,
                }
            }
        })
        setHandleExtraDara(!handleExtraData);
        setdata({
            ...data,
            [arrName]: arr
        });
        if (searchText !== "") {
            let searcharr = searchArry.map((item) => {
                if (item.id == index) {
                    return {
                        ...item,
                        qty: +item.qty + 1,
                    }
                } else {
                    return {
                        ...item,
                    }
                }
            })
            setsearchArry(searcharr)
        }
        if (selectType !== "") {
            let selectarr = selectArry.map((item) => {
                if (item.id == index) {
                    return {
                        ...item,
                        qty: +item.qty + 1,
                    }
                } else {
                    return {
                        ...item,
                    }
                }
            })
            setselectArry([...selectarr])
        }
    };


    const ontabChanges = (ind) => {
        console.log('sadas', ind);
        setactive(ind);
    };

    const _onCameraClick = async () => {
        if (PLATFORM === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                    {
                        title: "Camera Permission",
                        message:
                            "Canhhong wants camera access so that you can easily capture  image",
                        buttonNegative: "Cancel",
                        buttonPositive: "Allow"
                    }
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    launchCamera({
                        mediaType: 'photo',
                        quality: 0.5,
                        includeBase64: true,
                        maxWidth: 300,
                        maxHeight: 300,
                        cameraType: 'back'
                    }, (response) => {
                        if (response.didCancel) {
                            console.log("User cancel the operation");
                        }
                        else if (response.errorCode) {
                            alert('Camera is not available. Please check camera permission');
                        }
                        else {
                            console.log(
                                { shopId, type: active + 1, }
                            )
                            var photo = {
                                uri: response.uri,
                                type: response.type,
                                name: response.fileName,
                            };
                            // console.log(response, "sadsadsad")
                            setLoading(true);
                            const requestBody = new FormData()
                            requestBody.append('shop_id', shopId)
                            requestBody.append('type', active + 1)
                            requestBody.append('image', photo)
                            // fetch(
                            //     'https://changhong.arspsoft.com/api/display-image-save',
                            //     {
                            //         method: 'post',
                            //         body: requestBody,
                            //         headers: {
                            //             'Content-Type': 'multipart/form-data',
                            //         },
                            //     }
                            // ).then((res) => {
                            //     let responseJson = res.json();
                            //     console.log("_UploadDisplayImageApi responseJson ", responseJson);

                            // }).catch((err) => { console.log(err) })

                            // setLoading(false);
                            ApiServices._UploadDisplayImageApi(requestBody)
                                .then((response) => {
                                    // console.log(response)
                                    alert(response.success.message)
                                })
                                .catch((error) => { console.log(error) })
                                .finally(() => {
                                    setLoading(false);
                                })
                        }
                    });
                }
                else {
                    console.log("Camera permission denied");
                }
            }
            catch (err) {
                console.warn(err);
            }
        }
        else {
            launchCamera({
                mediaType: 'photo',
                quality: 0.5,
                includeBase64: true,
                maxWidth: 300,
                maxHeight: 300,
                cameraType: 'back'
            }, (response) => {
                if (response.didCancel) {
                    console.log("User cancel the operation");
                }
                else if (response.errorCode) {
                    alert('Camera is not available. Please check camera permission');
                }
                else {
                    console.log(
                        { shopId, type: active + 1, }, "else"
                    )
                    setLoading(true);
                    const requestBody = new FormData()
                    requestBody.append('shop_id', shopId)
                    requestBody.append('type', active + 1)
                    requestBody.append('image', response)
                    ApiServices._UploadDisplayImageApi(requestBody)
                        .then((response) => {
                            // console.log(response)
                            alert(response.success.message)
                        })
                        .catch((error) => { console.log(error) })
                        .finally(() => {
                            setLoading(false);
                        })
                    // if(response.type == 'image/png')
                    //     dispatch(_onAPImageUpload(response));
                    // else
                    //     alert('Only .PNG Images are allowed');

                }
            });
        }

    }

    const onClickCamera = () => {
        const options = {
            noData: true,
        }
        launchCamera(options, response => {
            if (response.uri) {
                setLoading(true);
                const requestBody = new FormData()
                requestBody.append('shop_id', shopId)
                requestBody.append('type', active + 1)
                requestBody.append('image', response)
                ApiServices._UploadDisplayImageApi(requestBody)
                    .then((response) => {
                        console.log(response)
                        alert(response.success.message)
                    })
                    .catch((error) => { console.log(error) })
                    .finally(() => {
                        setLoading(false);
                    })
                // setPhoto(response.uri)
            }
        })

        console.log("Camera clicked",)
    }

    const onSearchTextChange = (searchtext) => {
        setsearchText(searchtext)
        let searchArr = []
        if (selectArry.length !== 0) {
            searchArr = [...selectArry]
            console.log("vvvvv")
        } else {
            console.log("sdfsd")
            searchArr = [...data.displayArray]

        }
        // let searchArr = [...data.displayArray]
        let display_searched = [];

        searchArr.forEach((item, index) => {
            if (item.name.toLowerCase().includes(searchtext.trim().toLowerCase()))
                display_searched.push(item);
        });
        setsearchArry(display_searched)
    }

    // if (display_loading || loading || display_brand_loading || display_competitors_loading) {
    //     return <LoadingComponent />
    // }
    return (
        <>
            <HeaderSearchComponent navigation={navigation} title={title} />
            <View style={styles.imagesContainer}>
                <TouchableOpacity
                    onPress={() => { _onCameraClick() }}
                    style={styles.Topbtn}
                >
                    <Text style={styles.TopbtnText}>Camera</Text>
                </TouchableOpacity>
                <View style={styles.verticalLine} />
                <TouchableOpacity
                    onPress={() => { navigation.navigate('PhotoGallery', { type: (active + 1) }) }}
                    style={styles.Topbtn}>
                    <Text style={styles.TopbtnText}>Photo Gallery</Text>
                </TouchableOpacity>
            </View>
            <Tabs
                totalTabs="3"
                containerStyle={{ paddingTop: WP(SPACING_PERCENT / 2) }}
                ontabChanges={ontabChanges}
                Tabs={[{ title: 'Display' }, { title: 'Branding' }, { title: 'Competitors' }]}
            />
            {(display_loading || loading || display_brand_loading || display_competitors_loading) && <LoadingComponent containerStyle={{ position: 'absolute', zIndex: 99, flex: 1, width: '100%', height: '100%' }} />}
            <View style={{ backgroundColor: COLOR.whiteColor, flex: 1 }}>
                {active == 0 && (
                    <>
                        <View style={styles.filterContainer}>
                            <TouchableOpacity
                                onPress={() => {
                                    onSelectType("Refrigerator")
                                }}
                                style={[styles.filterbtn, { backgroundColor: selectType == "Refrigerator" ? COLOR.red : COLOR.primary }]}>
                                <Text style={styles.filterbtnText}>REF</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    onSelectType("AC")
                                }}
                                style={[styles.filterbtn, { backgroundColor: selectType == "AC" ? COLOR.red : COLOR.primary }]}>
                                <Text style={styles.filterbtnText}>AC</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    onSelectType("TV")
                                }}
                                style={[styles.filterbtn, { backgroundColor: selectType == "TV" ? COLOR.red : COLOR.primary }]}>
                                <Text style={styles.filterbtnText}>LED</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ paddingVertical: WP(SPACING_PERCENT / 2), width: '100%' }}>
                            <TextInput
                                placeholder='Search'
                                value={searchText}
                                onChangeText={(txt) => onSearchTextChange(txt)}
                                style={{
                                    width: '95%', backgroundColor: COLOR.offWhite,
                                    marginHorizontal: 10, paddingLeft: WP(5),
                                    borderRadius: WP(RADIUS),
                                    fontSize: WP(TEXT_SIZES.info_2)
                                }}
                            />
                        </View>
                        <FlatList
                            refreshControl={
                                <RefreshControl
                                    //refresh control used for the Pull to Refresh
                                    refreshing={refreshing}
                                    onRefresh={onRefresh}
                                />
                            }
                            data={searchText == '' ? selectType !== "" ? selectArry : data.displayArray : searchArry}
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
                                console.log('renderItem', item.subcategory.name)
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
                                            justifyContent: 'space-between',
                                            flexDirection: 'row',
                                            backgroundColor: COLOR.whiteColor,
                                            alignItems: 'center',
                                        }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <IconFontAwesome
                                                name={"tv"}
                                                size={WP(8)}
                                                color={COLOR.blackColor}
                                            />
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
                                                {/* <Text
                                                            style={{ lineHeight: WP(SPACING_PERCENT), fontSize: WP(3) }}>
                                                            32 "" 42"
                                                       </Text> */}
                                            </View>
                                        </View>
                                        {/* {item.productName == '3D Logo' && <View style={styles.dot} />} */}
                                        <View
                                            accessible={true}
                                            style={{
                                                // position: 'absolute',
                                                // right: WP(2),
                                                flexDirection: 'column',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}>
                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-around',
                                                    alignItems: 'center',
                                                    // marginTop: WP(2),
                                                    // width: WP(20),
                                                    // backgroundColor: COLOR.primary,
                                                }}>
                                                <Icon
                                                    onPress={() => {
                                                        Subtract("displayArray", item.id);
                                                        // console.log('remove click');
                                                    }}
                                                    name="remove-circle"
                                                    size={WP(8)}
                                                    color={COLOR.primary}
                                                />
                                                <Text style={{
                                                    borderWidth: 1,
                                                    borderColor: COLOR.primary,
                                                    textAlign: 'center',
                                                    borderRadius: 2,
                                                    padding: 1,
                                                    width: WP(6),
                                                    height: WP(6),
                                                }}
                                                >{item.qty}</Text>
                                                <Icon
                                                    onPress={() => {
                                                        add("displayArray", item.id);
                                                        // console.log('add click')
                                                    }}
                                                    name="add-circle"
                                                    size={WP(8)}
                                                    color={COLOR.primary}
                                                />
                                            </View>
                                        </View>
                                    </View>
                                );
                            }}
                        />
                    </>

                )}
                {active == 1 && (
                    <FlatList
                        refreshControl={
                            <RefreshControl
                                //refresh control used for the Pull to Refresh
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />
                        }
                        data={data.brandArray ? data.brandArray : []}
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
                                            {item.name}
                                        </Text>
                                    </View>
                                    {item.productName == '3D Logo' && <View style={styles.dot} />}
                                    <View
                                        accessible={true}
                                        style={{
                                            // position: 'absolute',
                                            // right: WP(2),
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}>
                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                justifyContent: 'space-around',
                                                alignItems: 'center',
                                                // marginTop: WP(2),
                                                // width: WP(20),
                                                // backgroundColor: COLOR.primary,
                                            }}>
                                            <Icon
                                                onPress={() => {
                                                    Subtract("brandArray", item.id);
                                                    // console.log('remove click');
                                                }}
                                                name="remove-circle"
                                                size={WP(8)}
                                                color={COLOR.primary}
                                            />
                                            <Text style={{
                                                borderWidth: 1,
                                                borderColor: COLOR.primary,
                                                textAlign: 'center',
                                                borderRadius: 2,
                                                padding: 1,
                                                width: WP(6),
                                                height: WP(6),
                                            }}
                                            >{item.qty}</Text>
                                            <Icon
                                                onPress={() => {
                                                    add("brandArray", item.id);
                                                    // console.log('add click')
                                                }}
                                                name="add-circle"
                                                size={WP(8)}
                                                color={COLOR.primary}
                                            />
                                        </View>
                                    </View>
                                </View>
                            );
                        }}
                    />
                )}
                {active == 2 && (
                    <FlatList
                        refreshControl={
                            <RefreshControl
                                //refresh control used for the Pull to Refresh
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />
                        }
                        data={data.competitorsArray
                            ? data.competitorsArray : []
                        }
                        contentContainerStyle={{
                            backgroundColor: COLOR.whiteColor,
                            marginBottom: WP(10)
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
                                            {item.name}
                                        </Text>
                                    </View>
                                    {/* {item.productName == '3D Logo' && <View style={styles.dot} />} */}
                                    <View
                                        accessible={true}
                                        style={{
                                            // position: 'absolute',
                                            // right: WP(2),
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}>
                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                justifyContent: 'space-around',
                                                alignItems: 'center',
                                                // marginTop: WP(2),
                                                // width: WP(20),
                                                // backgroundColor: COLOR.primary,
                                            }}>
                                            <Icon
                                                onPress={() => {
                                                    Subtract("competitorsArray", item.id);
                                                    // console.log('remove click');
                                                }}
                                                name="remove-circle"
                                                size={WP(8)}
                                                color={COLOR.primary}
                                            />
                                            <Text style={{
                                                borderWidth: 1,
                                                borderColor: COLOR.primary,
                                                textAlign: 'center',
                                                borderRadius: 2,
                                                padding: 1,
                                                width: WP(6),
                                                height: WP(6),
                                            }}
                                            >{item.qty}</Text>
                                            <Icon
                                                onPress={() => {
                                                    add("competitorsArray", item.id);
                                                    // console.log('add click')
                                                }}
                                                name="add-circle"
                                                size={WP(8)}
                                                color={COLOR.primary}
                                            />
                                        </View>
                                    </View>
                                </View>
                            );
                        }}
                    />
                )}
            </View>
            <View
                style={styles.btnContainer}
            >
                <TouchableOpacity
                    onPress={() => {
                        let arr = Object.values(data)[active];
                        let t = arr.map(function (a) { return { q: a.qty } }).reduce(function (total, current) {
                            return +total + current.q;
                        }, 0)
                        if (t) {
                            saveDisplayDetails()
                        } else {
                            alert(" Quantity is required")
                        }
                    }}
                    style={{
                        width: WP('50%'),
                        backgroundColor: COLOR.primary,
                        height: WP(SPACING_PERCENT * 2.5),
                        borderRadius: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                    <Text
                        style={{
                            fontSize: WP(5),
                            fontWeight: '600',
                            color: 'white',
                        }}>
                        Save
                    </Text>
                </TouchableOpacity>
            </View>
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
    filterContainer: {
        width: '100%',
        padding: WP(1),
        // backgroundColor: 'red',
        flexDirection: 'row',
    },
    filterbtn: {
        padding: WP(2),
        paddingHorizontal: WP(SPACING_PERCENT),
        backgroundColor: COLOR.primary,
        marginHorizontal: WP(2),
        borderRadius: WP(RADIUS),
    },
    filterbtnText: {
        color: COLOR.whiteColor,
    }
});

const mapStateToProps = (state) => {
    const { app } = state;

    return {
        theme: app.theme,
    };
};

export default connect(mapStateToProps, {})(DisplayDetail);
