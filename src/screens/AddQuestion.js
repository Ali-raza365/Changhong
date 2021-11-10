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
import { connect, useDispatch } from 'react-redux';
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
import * as ApiServices from '../services/index';
import LoadingComponent from '../components/LoadingComponent';
import { _GETQuestion } from '../store/actions/question';
const AddQuestion = ({ navigation }) => {
    const [loading, setloading] = useState(false)
    const [title, settitle] = useState("")
    const [Des, setDes] = useState("")

    const dispatch = useDispatch()
    function validate() {
        if (title.length == 0) {
            alert('Please enter title');
            return false;
        }
        if (title.length < 5) {
            alert('The title must be at least 5 characters.');
            return false;
        }
        if (Des.length == 0) {
            setEmailError('Please enter Description');
            return false;
        }
        if (Des.length < 8) {
            alert('The Description must be at least 5 characters.');
            return false;
        }

        return true;
    }

    const addQuestion = () => {
        setloading(true)
        let body = {
            title,
            message: Des
        }
        ApiServices._AskQuestion(body).then((data) => {
            if (data.errors) {
                alert(Object.values(data.errors)[0])
            } else {
                alert("your question has been sent")
                navigation.goBack();
                dispatch(_GETQuestion())
            }
        }).catch(err => {
            console.log(err, "")
            setloading(false)
        }).finally(() => {
            setloading(false)
        })
    }
    if (loading) {
        return <LoadingComponent />
    }
    return (
        <View style={{ flex: 1, backgroundColor: COLOR.whiteColor, justifyContent: 'center', alignItems: 'center' }}>
            <HeaderComponent
                navigation={navigation}
                title="New Question"
                containerStyle={{ backgroundColor: COLOR.primary, position: "absolute", top: 0, width: "100%", zIndex: 10 }}
                titleStyle={{ color: COLOR.whiteColor }}
                iconStyle={{ color: COLOR.whiteColor }}
            />

            <TextInput
                style={styles.input}
                onChangeText={(text) => {
                    settitle(text)
                }}
                value={title}
                placeholderStyle={{
                    fontWeight: "800",
                }}
                underlineColorAndroid="transparent"
                placeholderTextColor="#000"
                placeholder="Title"

            />
            <View style={styles.textAreaContainer} >
                <TextInput
                    style={[styles.textArea, { textAlignVertical: 'top' }]}
                    placeholderStyle={{
                        fontWeight: "800",
                        justifyContent: "flex-start"
                    }}
                    onChangeText={(text) => {
                        setDes(text)
                    }}
                    value={Des}
                    underlineColorAndroid="transparent"
                    placeholder="Description"
                    placeholderTextColor="#000"
                    numberOfLines={10}
                    multiline={true}
                />
            </View>
            <TouchableOpacity
                onPress={() => {
                    if (validate()) {
                        addQuestion()
                    }
                }}
                style={{
                    width: WP('90%'),
                    backgroundColor: COLOR.primary,
                    height: WP(SPACING_PERCENT * 3),
                    borderRadius: 10,
                    position: 'absolute',
                    flexDirection: 'row',
                    zIndex: 10,
                    bottom: WP(SPACING_PERCENT),
                    // left: WP(SPACING_PERCENT * 4),
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                <Text
                    style={{
                        fontSize: WP(5),
                        fontWeight: '700',
                        color: 'white',
                        marginLeft: WP(3),
                    }}>
                    Submit
                </Text>
            </TouchableOpacity>
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
        marginTop: WP(8),
        borderColor: "#000",
        borderWidth: 1,
        // backgroundColor: "red",
        padding: 5,
        width: WP("90%"),
        borderWidth: 2,
        justifyContent: "flex-start"
    },
    textArea: {
        height: 150,
        fontSize: WP(4.5),
        // backgroundColor: "green",
        // alignItems: "flex-start",
        // justifyContent: "flex-start"
    }
});
export default AddQuestion;
