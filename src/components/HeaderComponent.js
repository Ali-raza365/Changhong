import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';

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
    FONT_SIZES
} from '../common/Config';
import Icon from 'react-native-vector-icons/Ionicons';

const HeaderComponent = ({ navigation, NoIcon, screen, onRest, title, containerStyle, iconStyle, titleStyle }) => {
    return (
        <View style={[styles.headerContainer, containerStyle]}>
            {NoIcon ? <Text></Text> : <Icon name="chevron-back-outline" size={WP(8)}
                style={[{}, iconStyle]}
                onPress={

                    () => {
                        if (onRest) {
                            navigation.reset({
                                index: 0,
                                routes: [{
                                    name: screen
                                }]
                            })
                        } else {
                            if (screen) {
                                navigation.navigate(screen);
                            } else {
                                navigation.goBack()
                            }

                        }

                        console.log("goBack")

                    }} />}
            <Text style={[styles.headerText, titleStyle]}>{title}</Text>
        </View>
    );
};
const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        padding: WP(SPACING_PERCENT),
        alignItems: 'center',
        justifyContent: 'flex-start',
        position: 'relative'
    },
    headerText: {
        position: "absolute",
        zIndex: -2,
        width: WP("100%"),
        justifyContent: 'center',
        textAlign: "center",
        backgroundColor: "transparent",
        fontSize: WP(SPACING_PERCENT),
        color: COLOR.primary,
        // marginLeft: WP(-7),
        fontWeight: "bold",
    }
})
export default HeaderComponent;
