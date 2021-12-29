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
import IconFontAwesome from 'react-native-vector-icons/FontAwesome5';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Icon from 'react-native-vector-icons/Ionicons';
import EntIcon from 'react-native-vector-icons/Entypo';
import AntIcon from 'react-native-vector-icons/AntDesign';

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
import AsyncStorage from '@react-native-community/async-storage';
import LoadingComponent from '../components/LoadingComponent';
import preferences from '../common/preferences';

// const data = [
//     {
//         title: "My Retail",
//         color: "#28A5D5",
//         screen: "MyRetail",
//         icon: <Fontisto name='shopping-store' color={COLOR.whiteColor} size={WP(8)} />,
//     },
//     {
//         title: "Sales Report",
//         color: "#FCA360",
//         screen: "SaleReport",
//         icon: <EntIcon name='bar-graph' color={COLOR.whiteColor} size={WP(8)} />,
//     },
//     {
//         title: "Wallet",
//         color: "#FEC443",
//         screen: "Wallet",
//         icon: <IconFontAwesome name='wallet' color={COLOR.whiteColor} size={WP(8)} />,
//     },
//     {
//         title: "E-Learning",
//         color: "#3BCF3E",
//         screen: "E_Learning",
//         icon: <EntIcon name='graduation-cap' color={COLOR.whiteColor} size={WP(8)} />,
//     },
//     {
//         title: "Ask a Question",
//         color: "#1DA520",
//         screen: "Question",
//         icon: <AntIcon name='questioncircleo' color={COLOR.whiteColor} size={WP(8)} />,
//     },
//     {
//         title: "Stock Report",
//         color: "#9B59B6",
//         screen: "StockReport",
//         icon: <EntIcon name='bar-graph' color={COLOR.whiteColor} size={WP(8)} />,
//     },
//     {
//         title: "MRP",
//         color: "#34495E",
//         screen: "MRP",
//         icon: <EntIcon name='bar-graph' color={COLOR.whiteColor} size={WP(8)} />,
//     },
//     {
//         title: "Display",
//         color: "#16A085",
//         screen: "Display",
//         icon: <FontAwesome5 name='tv' color={COLOR.whiteColor} size={WP(8)} />,
//     },
//     {
//         title: "Logout",
//         color: COLOR.red,
//         screen: "logout",
//         icon: <Icon name='log-out-outline' color={COLOR.whiteColor} size={WP(8)} />,
//     },

// ]

const saleMan = [
    {
        title: 'My Retail',
        color: '#28A5D5',
        screen: 'MyRetail',
        icon: (
            <Fontisto name="shopping-store" color={COLOR.whiteColor} size={WP(8)} />
        ),
    },
    {
        title: 'Sales Report',
        color: '#FCA360',
        screen: 'SaleReport',
        icon: <EntIcon name="bar-graph" color={COLOR.whiteColor} size={WP(8)} />,
    },
    {
        title: 'Wallet',
        color: '#FEC443',
        screen: 'Wallet',
        icon: (
            <IconFontAwesome name="wallet" color={COLOR.whiteColor} size={WP(8)} />
        ),
    },
    {
        title: 'E-Learning',
        color: '#3BCF3E',
        screen: 'E_Learning',
        icon: (
            <EntIcon name="graduation-cap" color={COLOR.whiteColor} size={WP(8)} />
        ),
    },
    {
        title: 'Ask a Question',
        color: '#1DA520',
        screen: 'Question',
        icon: (
            <AntIcon name="questioncircleo" color={COLOR.whiteColor} size={WP(8)} />
        ),
    },
    // {
    //     title: "Stock Report",
    //     color: "#9B59B6",
    //     screen: "StockReport",
    //     icon: <EntIcon name='bar-graph' color={COLOR.whiteColor} size={WP(8)} />,
    // },
    {
        title: 'MRP',
        color: '#34495E',
        screen: 'MRP',
        icon: <EntIcon name="bar-graph" color={COLOR.whiteColor} size={WP(8)} />,
    },
    // {
    //     title: "Display",
    //     color: "#16A085",
    //     screen: "Display",
    //     icon: <FontAwesome5 name='tv' color={COLOR.whiteColor} size={WP(8)} />,
    // },
    {
        title: 'Logout',
        color: COLOR.red,
        screen: 'logout',
        icon: <Icon name="log-out-outline" color={COLOR.whiteColor} size={WP(8)} />,
    },
];

const dealer = [
    {
        title: 'My Retail',
        color: '#28A5D5',
        screen: 'MyRetail',
        icon: (
            <Fontisto name="shopping-store" color={COLOR.whiteColor} size={WP(8)} />
        ),
    },
    {
        title: 'Sales Report',
        color: '#FCA360',
        screen: 'SaleReport',
        icon: <EntIcon name="bar-graph" color={COLOR.whiteColor} size={WP(8)} />,
    },
    {
        title: 'Wallet',
        color: '#FEC443',
        screen: 'Wallet',
        icon: (
            <IconFontAwesome name="wallet" color={COLOR.whiteColor} size={WP(8)} />
        ),
    },
    {
        title: 'E-Learning',
        color: '#3BCF3E',
        screen: 'E_Learning',
        icon: (
            <EntIcon name="graduation-cap" color={COLOR.whiteColor} size={WP(8)} />
        ),
    },
    {
        title: 'Ask a Question',
        color: '#1DA520',
        screen: 'Question',
        icon: (
            <AntIcon name="questioncircleo" color={COLOR.whiteColor} size={WP(8)} />
        ),
    },
    {
        title: 'Stock Report',
        color: '#9B59B6',
        screen: 'StockReport',
        icon: <EntIcon name="bar-graph" color={COLOR.whiteColor} size={WP(8)} />,
    },
    {
        title: 'MRP',
        color: '#34495E',
        screen: 'MRP',
        icon: <EntIcon name="bar-graph" color={COLOR.whiteColor} size={WP(8)} />,
    },
    // {
    //     title: "Display",
    //     color: "#16A085",
    //     screen: "Display",
    //     icon: <FontAwesome5 name='tv' color={COLOR.whiteColor} size={WP(8)} />,
    // },
    {
        title: 'Logout',
        color: COLOR.red,
        screen: 'logout',
        icon: <Icon name="log-out-outline" color={COLOR.whiteColor} size={WP(8)} />,
    },
];

const Home = (props) => {
    const { theme, navigation } = props;
    const [screen, setscreen] = useState([]);
    const [loading, setloading] = useState(false);
    const onLogout = () => {
        preferences
            .clearAuthSession()
            .then(() => {
                navigation.reset({
                    index: 0,
                    routes: [
                        {
                            name: 'Auth',
                        },
                    ],
                });
            })
            .catch((err) => {
                alert(err);
            });
    };
    useEffect(() => {
        checkuserScreen();
    }, []);

    if (loading) {
        return <LoadingComponent />;
    }
    const checkuserScreen = async () => {
        setloading(true);
        const data = await AsyncStorage.getItem(preferences.KEYS.ACCESS_TOKEN);
        if (data) {
            let t = JSON.parse(data);
            if (t.type == '1') {
                setscreen([...saleMan]);
            }
            if (t.type == '3') {
                setscreen([...dealer]);
            }
            // setscreen([...dealer])
            setloading(false);
        } else {
            alert('Something went wrong');
            setloading(false);
            navigation.reset({
                index: 0,
                routes: [
                    {
                        name: 'Auth',
                    },
                ],
            });
        }
    };
    return (
        <>

            {/* <Text
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
            <FlatList
                data={screen}
                numColumns={2}
                contentContainerStyle={{
                    alignItems: 'center',
                    // justifyContent: 'space-around',
                    // backgroundColor: COLOR.whiteColor,
                    // paddingVertical: 15,
                    paddingBottom: WP(SPACING_PERCENT * 2),
                }}
                keyExtractor={(item, index) => 'home-item' + index.toString()}
                ListHeaderComponent={() => {
                    return (
                        <>
                            <View style={{ width: "100%", }}>
                                <Image source={IMAGE.Chiq_logo} style={{ height: HP(30) }} resizeMode="contain" />
                            </View>
                        </>
                    );
                }}
                // ItemSeparatorComponent={() => {
                //         return (
                //                 <View
                //                         style={{
                //                                 height: 15,
                //                                 backgroundColor: '#ffff',
                //                         }}
                //                 />
                //         );
                // }}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity
                            onPress={() => {
                                if (item.screen === 'logout') {
                                    onLogout();
                                } else {
                                    navigation.navigate(item.screen);
                                }
                            }}
                            style={{
                                margin: WP(3),
                                width: WP('45%'),
                                height: WP(25),
                                borderRadius: 10,
                                elevation: 15,
                                backgroundColor: item.color,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            {item.icon}
                            <Text
                                style={{
                                    color: COLOR.whiteColor,
                                    fontSize: WP(TEXT_SIZES.info_1),
                                    fontWeight: '800',
                                    paddingTop: WP(SPACING_PERCENT / 2),
                                }}>
                                {item.title}
                            </Text>
                        </TouchableOpacity>
                    );
                }}
            />
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
