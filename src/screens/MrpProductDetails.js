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

    const { product } = route.params
    console.log(product)
    const [data, setdata] = useState("true")
    const [Answer, setAnswer] = useState([])
    const [loading, setloading] = useState(false)

    useEffect(() => {
        if (product) {
            setdata(product)
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
        <ScrollView style={{ flex: 1, backgroundColor: COLOR.whiteColor, }}>
            <HeaderComponent
                navigation={navigation}
                title={data ? data.name ? data.name : "Product Details" : "Product Details"}
                containerStyle={{ backgroundColor: COLOR.primary, position: "absolute", top: 0, width: "100%", zIndex: 10 }}
                titleStyle={{ color: COLOR.whiteColor }}
                iconStyle={{ color: COLOR.whiteColor }}
            />
            {data && data.photo &&
                <View style={{ overflow: 'hidden', width: "95%", borderRadius: 7, marginTop: WP(SPACING_PERCENT * 5), marginLeft: "auto", marginRight: "auto" }}>
                    <Image source={{ uri: data.photo ? data.photo : `data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxEHBhURBxMSEhISERQVEBIXFRASEhIQFREXFxUTFRcYHiggGCYlGx8VITEhJSkrLi4uGB8zODMtNygtLjcBCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAaAAEAAwEBAQAAAAAAAAAAAAAAAgMEAQUH/8QAMRABAAEDAgQEBAQHAAAAAAAAAAECAxEhMQQSE0FRYXGBInKRsSMyQsEFFDM0RGOh/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/APtIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA5M4jVyK4nuCQAAAAAAAAAAAAAAAAAAAAAAAAAAAIXp+BXRb5qcu8ROkJ2oxbgFfSmNjFUeK9yZxuCmm5PNiV7PTPNe92gAAAAAAAAAAAAAAAAAAAAAAHKvy6KZnO69RMaghfnExHkXbkxpHZHiJ/G9MOTdiqfiiP8AsAlTemmnEFuea5qjzUz2mPd2maaYnEzt4Anw+tz2aWfhI0loAAAAAAAAAAAAAAAAAAAAAAAV16VrEa6eaAUV2orqzE7ofy8/pmJaYt+KURjYGKbFUdkZomN4n6PQAU8LGLXuuAAAAAAAAAAAAAAAAAAAAAAGezxPVtzOMTEZx5YBoFM38W6ZxmaojEexRenqct2MTO2uYkFwrv3OlRnfWI+qN6/0rkRjfefDXALhTcv8l6KYjfGZ8M7HEX+jjEZ3z5RHcFwhcuxbt5n280aK66qvipxHrGY9gWiib1U3Zi3TE8uO+N10bag6AAAAAAAAAAAAAAAAAA8+miY4SKqd4iYmPGmZlvmcRqhReprt81M6RvuDPiaKbdWJmKaYifLNO6c1dfiKZozinMzOJj2XTciLfNnTGcuV3qbcRNc4zsCHGf0o+aPuhxFHUvzH+uceuWi5XFujNexzx1OXvjPsDHGaqIqq3m5T9IjCdVM3r9XLjERy6xPffDVM8sZns5buRcpzRsDJETXwtOIzNFWseOEqrvPep6c1bxzRicRC6niaKqsRPpvunzx1OXvjPsDHVNMcTX1JqjbGM+Hk20zmnRG7di1Hx9y3di7HwfuCYAAAAAAAAAAAAAAAAAKOMqxYxG9Wke6vh55b804mImImIny0lpqoiqYmrtt6k0RNcTO8bAxU6xFvwrnPyxqnxE9S9MYmcU407VT3aYtxFzmxr4u00RTMzT33Bku19T+H5nyifWJWz/fR8k/dZ0aeSYxpM5mNdy5YpuzmuM/UEOMqxZxG9UxCHDVYvVU4mM6xE7+Eros004xH5c430ylNETXmd4+wMEZjhYmrHLFWsfq3af8ANj5P3TjhqInSPvLtyxTdqzXGfqCvi881HLvz6LrfNj8TGfLKE2KZoiJjSNt0rdqLUfBGM+oJgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/9k=` }} style={{ width: "100%", aspectRatio: 1 }} resizeMode="stretch" />
                </View>
            }

            {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.QNAtitle}> ModelNo:</Text>
                <Text style={styles.QNA}>
                    {data && data.model_number && data.model_number}
                </Text>
            </View> */}
            <View style={styles.textAreaContainer} >
                <Text style={styles.QNAtitle}>Description:</Text>
                <Text style={styles.QNA}>
                    {data && data.details && data.details}
                </Text>
            </View>

        </ScrollView>
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
        // borderWidth: 1,
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
