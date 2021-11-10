//import liraries
import React, { Component, useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
} from 'react-native';
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
import { connect, useDispatch, useSelector } from 'react-redux';

import HeaderSearchComponent from '../components/HeaderSearchComponent';
import IconMaterialC from 'react-native-vector-icons/MaterialCommunityIcons';
import LoadingComponent from '../components/LoadingComponent';
import { _GetDisplayGallery } from '../store/actions/displayAction';
import { RefreshControl } from 'react-native';

// create a component
const PhotoGallery = ({ navigation, route }) => {

    const { type } = route.params;
    const [dumyData, setdumyData] = useState([
        {
            image:
                'https://images.unsplash.com/photo-1514395659518-2e1c59302e99?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGFwcGxlJTIwbGFwdG9wfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60',
        },
        {
            image:
                'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y2FtZXJhfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60',
        },
        {
            image:
                'https://images.unsplash.com/photo-1552525892-bed17eb33e0b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fGlwaG9uZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60',
        },
        {
            image:
                'https://images.unsplash.com/photo-1483478550801-ceba5fe50e8e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bW9iaWxlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60',
        },
        {
            image: `https://images.unsplash.com/photo-1542435503-956c469947f6?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZGVza3RvcHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60`,
        },
        {
            image:
                'https://media.istockphoto.com/photos/women-in-business-anonymous-young-businesswoman-using-a-mobile-phone-picture-id1306500269?b=1&k=20&m=1306500269&s=170667a&w=0&h=esIKlcYNbkJwH4J-kwf-e6bRnZbjlXxKQYDCprQPWNo=',
        },
        {
            image:
                'https://images.unsplash.com/photo-1591815302525-756a9bcc3425?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGlwaG9uZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60',
        },
        {
            image:
                'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8bGFwdG9wfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60',
        },
        {
            image:
                'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGxhcHRvcHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60',
        },
        {
            image:
                'https://images.unsplash.com/photo-1607462109225-6b64ae2dd3cb?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8Y2FtZXJhfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60',
        },
    ])
    const [refreshing, setRefreshing] = useState(false);
    const dispatch = useDispatch()
    const { displayGallery, gallery_loading } = useSelector(state => state.Display)
    const getphotGallery = () => {
        dispatch(_GetDisplayGallery(type))
    }
    useEffect(() => {
        if (type) {
            getphotGallery()
        }
    }, [type])
    const onRefresh = () => {
        //Clear old data of the list
        getphotGallery()
    };
    console.log({ displayGallery })
    if (gallery_loading) {
        return <LoadingComponent />
    }
    return (
        <View style={styles.container}>
            <HeaderSearchComponent navigation={navigation} title="Photo Gallery" />
            <FlatList
                data={displayGallery}
                // data={dumyData}
                refreshControl={
                    <RefreshControl
                        //refresh control used for the Pull to Refresh
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
                numColumns={2}
                contentContainerStyle={{
                    backgroundColor: COLOR.whiteColor,
                }}
                keyExtractor={(item, index) => 'home-item' + index.toString()}
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
                    console.log('renderItem', item.image)
                    return (
                        <Image
                            style={{
                                width: WP('40%'),
                                height: WP(50),
                                marginVertical: WP(SPACING_PERCENT / 2),
                                marginLeft: 'auto',
                                marginRight: 'auto',
                                borderRadius: WP(5),
                            }}
                            source={{ uri: item.image }}
                            resizeMode="cover"
                            onPress={() => {
                                {
                                    /* navigation.navigate(item.screen) */
                                    console.log('sadsdsad');
                                }
                            }}></Image>
                    );
                }}
            />
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR.whiteColor,
    },
});

//make this component available to the app
export default PhotoGallery;
