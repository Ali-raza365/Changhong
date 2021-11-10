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
    ClippingRectangle,
    RefreshControl
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
import Tabs from '../components/Tabs';
import { useDispatch, useSelector } from 'react-redux';
import { _GETFAQ, _GETQuestion } from '../store/actions/question';
import LoadingComponent from '../components/LoadingComponent';

const Question = (props) => {
    const { theme, navigation } = props;
    const [active, setactive] = useState(0)
    const [refreshing, setRefreshing] = useState(false);

    const { FAQ, Faq_loading, QNA, qna_loading } = useSelector(state => state.questions)
    const dispatch = useDispatch()

    useEffect(() => {
        getfaqs()
        getquestions()
    }, [])
    const onRefresh = () => {
        getfaqs()
        getquestions()
    };

    const getfaqs = () => {
        dispatch(_GETFAQ())
    }
    const getquestions = () => {
        dispatch(_GETQuestion())
    }



    const ontabChanges = (ind) => {
        console.log("sadas", ind);
        setactive(ind)
    }

    // if (Faq_loading || qna_loading) {
    //     return <LoadingComponent />
    // }

    return (
        <>
            <HeaderSearchComponent
                navigation={navigation}
                title="Questions" />
            <Tabs totalTabs="2"
                ontabChanges={ontabChanges}
                Tabs={[
                    { title: 'Your Questions' },
                    { title: 'FAQs' },
                ]} />
            {(Faq_loading || qna_loading) && <LoadingComponent containerStyle={{ position: 'absolute', zIndex: 99, flex: 1, width: '100%', height: '100%' }}></LoadingComponent>}
            {active == 0 && <View style={{ backgroundColor: COLOR.whiteColor, flex: 1 }}>
                <FlatList
                    refreshControl={
                        <RefreshControl
                            //refresh control used for the Pull to Refresh
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                    data={QNA}
                    contentContainerStyle={{
                        backgroundColor: COLOR.whiteColor,
                    }}
                    keyExtractor={(item, index) => 'home-item' + index.toString()}
                    ListFooterComponent={() => {
                        return (
                            <View style={{ marginBottom: WP(20), backgroundColor: COLOR.primary }}>
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
                        console.log('renderItem', item)
                        return (
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate("ShowQuestion", { item: item && { title: item.subject, details: item.message, id: item.id } })
                                }}
                                accessible={true}
                                style={{
                                    margin: WP(2.5),
                                    padding: WP(3),
                                    // marginRight: WP(SPACING_PERCENT),
                                    width: WP('95%'),
                                    // height: WP(35),
                                    borderRadius: 10,
                                    elevation: 15,
                                    flexDirection: 'row',
                                    backgroundColor: COLOR.whiteColor,
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}>
                                <View style={{ paddingHorizontal: WP(3) }}>
                                    <Text
                                        style={{
                                            lineHeight: WP(SPACING_PERCENT),
                                            fontSize: WP(4.5),
                                            color: COLOR.primary,
                                            fontWeight: 'bold',
                                        }}>
                                        {item.subject}
                                    </Text>
                                    <Text
                                        numberOfLines={1}
                                        ellipsizeMode='tail'
                                        style={{
                                            lineHeight: WP(SPACING_PERCENT),
                                            marginTop: WP(2),
                                            width: WP(73)
                                        }}>
                                        {item.message}
                                    </Text>
                                </View>
                                <Icon
                                    name="chevron-forward-outline"
                                    onPress={() => {
                                        console.log("forward icon cicked");
                                    }}
                                    size={WP(8)}
                                    style={{ paddingLeft: WP(2) }}
                                    color={COLOR.gray}
                                />
                            </TouchableOpacity>
                        );
                    }}
                />
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('AddQuestion');
                    }}
                    // navigation.navigate("Menu")

                    // accessible={true}
                    style={{
                        position: 'absolute',
                        //     top: -WP(11.5),
                        bottom: WP(5),
                        right: WP(5),
                        width: WP(17),
                        height: WP(17),
                        borderRadius: WP(10),
                        backgroundColor: COLOR.primary,
                        elevation: 5,
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingTop: WP(2)
                    }}>
                    <Icon name="help-circle-outline" size={WP(8)} color={COLOR.whiteColor} />
                    <Text style={{ color: COLOR.whiteColor, marginTop: WP(-1.5) }}>ASK</Text>
                </TouchableOpacity>
            </View>}
            {active == 1 && (
                <View style={{ backgroundColor: COLOR.whiteColor, flex: 1 }}>
                    <FlatList
                        refreshControl={
                            <RefreshControl
                                //refresh control used for the Pull to Refresh
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />
                        }
                        data={FAQ}
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
                        ListFooterComponent={() => {
                            return (
                                <View style={{ marginBottom: WP(SPACING_PERCENT) }}>

                                </View>
                            )
                        }}
                        renderItem={({ item, index }) => {
                            return (
                                <TouchableOpacity
                                    onPress={() => {
                                        navigation.navigate("ShowQuestion", { item: item && { title: item.title, details: item.details, id: null } })

                                    }}
                                    accessible={true}
                                    style={{
                                        margin: WP(2.5),
                                        padding: WP(3),
                                        // marginRight: WP(SPACING_PERCENT),
                                        width: WP('95%'),
                                        // height: WP(35),
                                        borderRadius: 10,
                                        elevation: 15,
                                        flexDirection: 'row',
                                        backgroundColor: COLOR.whiteColor,
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                    }}>
                                    <View style={{ paddingHorizontal: WP(3) }}>
                                        <Text
                                            numberOfLines={1}
                                            ellipsizeMode='tail'
                                            style={{

                                                lineHeight: WP(SPACING_PERCENT),
                                                fontSize: WP(4.5),
                                                color: COLOR.primary,
                                                fontWeight: 'bold',
                                                width: WP(70)
                                            }}>
                                            {item.title}
                                        </Text>
                                        <Text
                                            numberOfLines={1}
                                            ellipsizeMode='tail'
                                            style={{
                                                lineHeight: WP(SPACING_PERCENT),
                                                marginTop: WP(2),
                                                width: WP(70)
                                            }}>
                                            {item.details}
                                        </Text>
                                    </View>
                                    <Icon
                                        name="chevron-forward-outline"
                                        onPress={() => {
                                            console.log("forward icon cicked");
                                        }}
                                        size={WP(8)}
                                        style={{ paddingLeft: WP(2) }}
                                        color={COLOR.gray}
                                    />
                                </TouchableOpacity>
                            );
                        }}
                    />
                </View>
            )}
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

export default connect(mapStateToProps, {})(Question);
