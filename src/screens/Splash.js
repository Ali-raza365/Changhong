import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Dimensions, Image } from 'react-native';
import preferences from '../common/preferences'
const windowWidth = Dimensions.get('screen').width;
import database from '@react-native-firebase/database';
// windowWidth - 20
const windowHeight = Dimensions.get('window').height;
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
const SplashScreen = ({ navigation }) => {

    const [isActive, setisActive] = useState(null)


    useEffect(() => {

        preferences.getAuthSession().then((session) => {
            console.log("session", session);
            if (session) {
                let json = JSON.parse(session)
                if (json.type == "1") {
                    navigation.reset({
                        index: 0,
                        routes: [{
                            name: "bottomTab"
                        }]
                    })
                }
                else if (json.type == "3") {
                    navigation.reset({
                        index: 0,
                        routes: [{
                            name: "DealerBottomTab"
                        }]
                    })
                } else if (json.type == "2") {
                    navigation.reset({
                        index: 0,
                        routes: [{
                            name: "TrainerTabs"
                        }]
                    })
                } else if (json.type == "4") {
                    navigation.reset({
                        index: 0,
                        routes: [{
                            name: "DisplayBottomTab"
                        }]
                    })
                }
            } else {
                navigation.reset({
                    index: 0,
                    routes: [{
                        name: "Auth"
                    }]
                })
            }
        }).catch((error) => {
            console.log(error);
        })
    }, [isActive])
    return (
        <View style={styles.Container}>
            <View style={{ overflow: 'hidden', width: "100%", marginLeft: "auto", marginRight: "auto" }}>
                <Image source={IMAGE.new_Chiq_logo} style={{ width: "100%", height: HP(30) }} resizeMode="center" />
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    Container: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
})
export default SplashScreen;
