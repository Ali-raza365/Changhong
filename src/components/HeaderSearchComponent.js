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

const HeaderComponent = ({ navigation, title, containerStyle, iconStyle, titleStyle }) => {
    return (
        <View style={[styles.headerContainer, containerStyle]}>
            <Icon name="chevron-back-outline" style={[{ color: COLOR.whiteColor }, iconStyle && iconStyle]} size={WP(8)} onPress={() => {
                console.log("goBack")
                navigation.goBack()
            }} />
            <Text style={styles.headerText}>{title}</Text>
            <Icon name="search" style={[{ color: COLOR.whiteColor }, iconStyle && iconStyle]} size={WP(8)} onPress={() => {
                console.log("goBack")
                // navigation.goBack()
            }} />
        </View>
    );
};
const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        padding: WP(SPACING_PERCENT - 2),
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: COLOR.primary
    },
    headerText: {
        // width: "100%",
        // textAlign: "center",
        fontSize: WP(SPACING_PERCENT),
        color: COLOR.offWhite,
        // marginLeft: WP(-7),
        fontWeight: "bold",
    }
})
export default HeaderComponent;
