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
} from '../../common/Config';
import SearchComponent from '../../components/SearchComponent';
import Tabs from '../../components/Tabs';
import HeaderComponent from '../../components/HeaderComponent';
import { useDispatch, useSelector } from 'react-redux';
import LoadingComponent from '../../components/LoadingComponent';
import { _GetTrainingHistory } from '../../store/actions/traningAction';

const TrainingHistory = (props) => {
    const { theme, navigation } = props;
    const dispatch = useDispatch()
    const { traningHistory, traning_history_loading, } = useSelector(state => state.training)
    const [refreshing, setRefreshing] = useState(false);


    useEffect(() => {
        gettranings()
    }, [])


    const gettranings = () => {
        dispatch(_GetTrainingHistory())
    }
    const onRefresh = () => {
        gettranings()
    };




    if (traning_history_loading) {
        return <LoadingComponent />
    }




    return (
        <View style={{ flex: 1, backgroundColor: COLOR.whiteColor }}>
            <HeaderComponent
                title="History"
                navigation={navigation}
                titleStyle={{ color: COLOR.whiteColor }}
                iconStyle={{ color: COLOR.whiteColor }}
                containerStyle={{ backgroundColor: COLOR.primary }}
            />
            <FlatList
                refreshControl={
                    <RefreshControl
                        //refresh control used for the Pull to Refresh
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
                data={traningHistory}
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
                                backgroundColor: COLOR.whiteColor,
                            }}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}>
                                <Image source={ICON.task} style={{}} resizeMode="contain" />
                                <View style={{ paddingHorizontal: WP(3) }}>
                                    <Text
                                        style={{
                                            lineHeight: WP(SPACING_PERCENT),
                                            fontSize: WP(4),
                                            fontWeight: 'bold',
                                            // marginTop: WP(3),
                                        }}>
                                        {item.shop ? item.shop.shop_name : ""}
                                    </Text>
                                    <Text
                                        style={{
                                            lineHeight: WP(SPACING_PERCENT),
                                            color: COLOR.darkGray,
                                            fontSize: WP(3),
                                        }}>
                                        {item.shop && new Date(item.shop.created_at).toLocaleString()}
                                    </Text>
                                    <Text
                                        style={{ lineHeight: WP(SPACING_PERCENT), fontSize: WP(3) }}>
                                        <Icon
                                            name="location-sharp"
                                            size={WP(4)}
                                            // style={{ position: 'absolute', right: WP(2) }}
                                            color={COLOR.gray}
                                        />{' '}
                                        {item.shop ? item.shop.address : ""}
                                    </Text>
                                </View>
                            </View>

                            <Text
                                numberOfLines={2}
                                ellipsizeMode="tail"
                                style={{
                                    lineHeight: WP(4),
                                    fontSize: WP(3),
                                    paddingHorizontal: WP(SPACING_PERCENT / 2),
                                }}>
                                {item.shop ? item.shop.shop_details : ""}
                                {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit. Congue
                                        habitant orci cursus pellentesque pharetra, cursus lobortis
                                        feugiat. Facilisi cras phasellus urna, nisl dui, ut. */}
                            </Text>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    padding: WP(4),
                                    justifyContent: 'space-between',
                                }}>
                                <Text
                                    style={{
                                        position: 'absolute',
                                        right: WP(2),
                                        fontWeight: WP(5),
                                        fontWeight: '700',
                                        color: item.status !== 0 ? COLOR.success : COLOR.red,
                                    }}>
                                    {item.status !== 0 ? 'Completed' : 'Canceled'}
                                </Text>
                            </View>
                        </View>
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

export default TrainingHistory;
