import React, { useEffect, useState } from 'react';

import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Image,
    TouchableOpacity,
    TextInput
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
import LoadingComponent from '../components/LoadingComponent';
import * as ApiServices from '../services/index';



const ShowQuestion = ({ navigation, route }) => {

    const { item } = route.params
    console.log(item)
    const [data, setdata] = useState(null)
    const [Answer, setAnswer] = useState([])
    const [loading, setloading] = useState(false)

    useEffect(() => {
        if (item) {
            setdata(item)
            console.log({ conservation: item.id })
            if (item.id) {
                GetAnswer(item.id)
            }
        } else {
            setdata(null)
        }
    }, [])

    const GetAnswer = (id) => {
        setloading(true)
        // console.log(id)
        ApiServices._GetAnswerApi(id)
            .then(response => {
                if (response.errors) {
                    alert(Object.values(response.errors)[0])
                } else {
                    console.log(response.success.data)
                    if (response.success.data !== []) {
                        console.log({ qna: response.success.data })
                        let ans = response.success.data.filter((item) => {
                            // console.log(item)
                            if (item.user_id == null) {
                                console.log({ ans: item })
                                return {
                                    ...item
                                }
                            }
                        })
                        setAnswer([...ans])
                    }
                }


            })
            .catch(error => { console.log(error) })
            .finally(() => { setloading(false) })
    }


    if (loading) {
        return <LoadingComponent />
    }

    return (
        <View style={{ flex: 1, backgroundColor: COLOR.whiteColor, justifyContent: 'flex-start', alignItems: 'center' }}>
            <HeaderComponent
                navigation={navigation}
                title="Your Question"
                containerStyle={{ backgroundColor: COLOR.primary, position: "absolute", top: 0, width: "100%", zIndex: 10 }}
                titleStyle={{ color: COLOR.whiteColor }}
                iconStyle={{ color: COLOR.whiteColor }}
            />
            {data && <View style={[styles.textAreaContainer, { marginTop: WP(SPACING_PERCENT * 5), }]} >
                <Text style={styles.QNAtitle}>
                    {data.title}
                </Text>
                <Text style={styles.QNA}>
                    {data.details}
                </Text>
            </View>

            }
            {Answer.length !== 0 && <View style={styles.textAreaContainer} >
                <Text style={styles.QNAtitle}> Answer:</Text>
                <Text style={styles.QNA}>
                    {Answer.length !== 0 && Answer[0].message}
                </Text>
            </View>}
        </View>
    );
};
const styles = StyleSheet.create({
    input: {
        height: 40,
        // margin: 12,
        marginLeft: "auto",
        marginRight: "auto",
        borderWidth: 2,
        padding: 10,
        fontSize: WP(4.5),
        borderRadius: WP(2),
        width: WP("90%")
    },
    textAreaContainer: {
        marginVertical: WP(SPACING_PERCENT / 2),
        borderColor: COLOR.gray,
        borderRadius: WP(2),
        padding: 5,
        width: WP("95%"),
        borderWidth: 1,
        justifyContent: "flex-start",
        minHeight: 80,
        fontSize: WP(4.5),
    },
    QNAtitle: {
        padding: WP(2),
        fontSize: WP(5.5),
        color: COLOR.primary,
        fontWeight: "bold",
    },
    QNA: {
        padding: WP(2),
        lineHeight: WP(SPACING_PERCENT + 2),
        fontSize: WP(5.2),
        color: COLOR.blackColor,
        fontWeight: "bold",
    }
});
export default ShowQuestion;
