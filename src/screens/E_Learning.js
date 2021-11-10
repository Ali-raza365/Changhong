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
    Linking,
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
import { _AddFavoriteCourse, _AddIntoFinished, _GETAllCourses, _GetFavoriteCourse, _GetFinishedCourse } from '../store/actions/question';
import LoadingComponent from '../components/LoadingComponent';
import RNFetchBlob from 'rn-fetch-blob';
import IconMaterial from 'react-native-vector-icons/AntDesign';


const E_Learning = (props) => {
    const { theme, navigation } = props;
    const [active, setactive] = useState(0)
    const dispatch = useDispatch()
    const [refreshing, setRefreshing] = useState(false);

    const { Courses, course_loading, fav_course_loading, FavCourses, add_loading, finished_course_loading, FinishedCourses } = useSelector(state => state.questions)
    const ontabChanges = (ind) => {
        console.log("sadas", ind);
        setactive(ind)
    }

    console.log("current =>", Courses);

    useEffect(() => {
        getcourses()
        getFavioute()
        getFinished()
    }, [])

    const onRefresh = () => {
        getcourses()
        getFavioute()
        getFinished()
    };

    const getcourses = () => {
        dispatch(_GETAllCourses())
    }

    const getFavioute = () => {
        dispatch(_GetFavoriteCourse())
    }
    const getFinished = () => {
        dispatch(_GetFinishedCourse())
    }

    const onhertClick = (id) => {
        dispatch(_AddFavoriteCourse(id))
    }
    const onAddFinished = (id) => {
        dispatch(_AddIntoFinished(id))
    }

    const DownloadFile = async (url, id) => {
        onAddFinished(id)
        Linking.openURL(url)

        // let dirs =
        //      Platform.OS == 'ios'
        //           ? RNFetchBlob.fs.dirs.DocumentDir
        //           : RNFetchBlob.fs.dirs.DCIMDir;
        // console.log(dirs, 'document path');
        // RNFetchBlob.config({
        //      // response data will be saved to this path if it has access right.

        //      fileCache: true,
        //      path: dirs + "/changhong",
        // })
        //      .fetch(
        //           'GET',
        //           'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        //           {
        //                //some headers ..
        //           },
        //      )
        //      .then(res => {
        //           // the path should be dirs.DocumentDir + 'path-to-file.anything'
        //           console.log('The file saved to ', res.path());
        //      })
        //      .catch((err) => {
        //           alert(err);
        //           // setSaving(false);
        //      })
    }

    // useEffect(() => {
    //      if (active == 2) {
    //           getFavioute()
    //      }
    // }, [active])


    if (Courses.length == 0 && course_loading) {
        return <LoadingComponent />
    }

    return (
        <>
            <HeaderSearchComponent
                navigation={navigation}
                title="E Learning" />
            <Tabs totalTabs="3"
                ontabChanges={ontabChanges}
                Tabs={[
                    { title: 'Current' },
                    { title: 'Finished' },
                    { title: 'Favourites' },
                ]} />
            <View style={{
                backgroundColor: COLOR.whiteColor,
                flex: 1
            }}>
                {add_loading || fav_course_loading ? (<LoadingComponent />) : (
                    <>
                        {active == 0 &&
                            <FlatList
                                refreshControl={
                                    <RefreshControl
                                        //refresh control used for the Pull to Refresh
                                        refreshing={refreshing}
                                        onRefresh={onRefresh}
                                    />
                                }
                                data={Courses ? Courses.map((item) => {
                                    let favidarray = FavCourses.map((fav) => { return fav.elearning_id.toString() })
                                    let flag = false
                                    if (favidarray.includes(item.id.toString())) {

                                        flag = true
                                    }
                                    console.log({ favidarray, flag, id: item.id })
                                    return {
                                        ...item,
                                        heart: flag ? true : false
                                    }
                                }) : []}
                                contentContainerStyle={{
                                    backgroundColor: COLOR.whiteColor,
                                }}
                                ListFooterComponent={() => {
                                    return (
                                        <View style={{ marginBottom: WP(20), }}>
                                        </View>
                                    )
                                }}
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
                                        <TouchableOpacity
                                            onPress={() => { DownloadFile(item.file, item.id) }}
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
                                                // justifyContent: 'space-between',
                                                alignItems: 'center',
                                            }}>
                                            <Icon
                                                name="school-outline"
                                                size={WP(10)}
                                                color={COLOR.primary}
                                            />
                                            <View style={{ paddingHorizontal: WP(3), width: "80%", }}>
                                                <Text
                                                    style={{
                                                        lineHeight: WP(SPACING_PERCENT),
                                                        fontSize: WP(4.5),
                                                        color: COLOR.primary,
                                                        fontWeight: 'bold',

                                                    }}>
                                                    {item.title}
                                                </Text>
                                                <Text
                                                    style={{ lineHeight: WP(SPACING_PERCENT), marginTop: WP(2) }}>
                                                    Validity Time:{new Date(item.created_at).toLocaleDateString()}
                                                </Text>
                                            </View>
                                            <IconMaterial
                                                name={item.heart ? 'heart' : 'hearto'}
                                                onPress={() => {
                                                    onhertClick(item.id)
                                                }}
                                                size={WP(8)}
                                                // style={{ paddingLeft: WP(2) }}
                                                color={COLOR.red}
                                            />
                                        </TouchableOpacity>
                                    );
                                }}
                            />}
                        {active == 1 &&
                            <FlatList
                                refreshControl={
                                    <RefreshControl
                                        //refresh control used for the Pull to Refresh
                                        refreshing={refreshing}
                                        onRefresh={onRefresh}
                                    />
                                }
                                data={FinishedCourses ? FinishedCourses.map((item) => {
                                    let favidarray = FavCourses.map((fav) => { return fav.elearning_id.toString() })
                                    let flag = false
                                    if (favidarray.includes(item.id.toString())) {

                                        flag = true
                                    }
                                    console.log({ favidarray, flag, id: item.id })
                                    return {
                                        ...item,
                                        heart: flag ? true : false
                                    }
                                }) : []}
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
                                renderItem={({ item, index }) => {
                                    { console.log(item) }
                                    return (
                                        <TouchableOpacity
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
                                                // justifyContent: 'space-between',
                                                alignItems: 'center',
                                            }}>
                                            <Icon
                                                name="school-outline"
                                                size={WP(10)}
                                                color={COLOR.primary}
                                            />
                                            <View style={{ paddingHorizontal: WP(3), width: "80%", }}>
                                                <Text
                                                    style={{
                                                        lineHeight: WP(SPACING_PERCENT),
                                                        fontSize: WP(4.5),
                                                        color: COLOR.primary,
                                                        fontWeight: 'bold',

                                                    }}>
                                                    {item.elearning.title}
                                                </Text>
                                                <Text
                                                    style={{ lineHeight: WP(SPACING_PERCENT), marginTop: WP(2) }}>
                                                    Validity Time:{new Date(item.created_at).toLocaleDateString()}
                                                </Text>
                                            </View>
                                            {/* <IconMaterial
                                                            name={item.heart ? 'heart' : 'hearto'}
                                                            onPress={() => {
                                                                 onhertClick(item.id)
                                                            }}
                                                            size={WP(8)}
                                                            // style={{ paddingLeft: WP(2) }}
                                                            color={COLOR.red}
                                                       /> */}
                                        </TouchableOpacity>
                                    );
                                }}
                            />}
                        {active == 2 &&
                            <FlatList
                                refreshControl={
                                    <RefreshControl
                                        //refresh control used for the Pull to Refresh
                                        refreshing={refreshing}
                                        onRefresh={onRefresh}
                                    />
                                }
                                data={FavCourses ? FavCourses : []}
                                contentContainerStyle={{
                                    backgroundColor: COLOR.whiteColor,
                                }}
                                ListFooterComponent={() => {
                                    return (
                                        <View style={{ marginBottom: WP(20), }}>
                                        </View>
                                    )
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
                                    { console.log(item) }
                                    return (
                                        <TouchableOpacity
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
                                                // justifyContent: 'space-between',
                                                alignItems: 'center',
                                            }}>
                                            <Icon
                                                name="school-outline"
                                                size={WP(10)}
                                                color={COLOR.red}
                                            />
                                            <View style={{ paddingHorizontal: WP(3), width: "80%", }}>
                                                <Text
                                                    style={{
                                                        lineHeight: WP(SPACING_PERCENT),
                                                        fontSize: WP(4.5),
                                                        color: COLOR.primary,
                                                        fontWeight: 'bold',
                                                    }}>
                                                    {item.elearning ? item.elearning.title : item.title}
                                                </Text>
                                                <Text
                                                    style={{ lineHeight: WP(SPACING_PERCENT), marginTop: WP(2) }}>
                                                    Validity Time:  {item.elearning ? new Date(item.elearning.created_at).toLocaleDateString() : new Date(item.created_at).toLocaleDateString()}

                                                </Text>
                                            </View>
                                            <IconMaterial
                                                name="heart"
                                                onPress={() => {
                                                    onhertClick(item.elearning_id)
                                                }}
                                                size={WP(8)}
                                                // style={{ paddingLeft: WP(2) }}
                                                color={COLOR.red}
                                            />
                                        </TouchableOpacity>
                                    );
                                }}
                            />}
                    </>
                )}
            </View>
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

export default connect(mapStateToProps, {})(E_Learning);
