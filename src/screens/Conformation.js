import React, { useEffect } from 'react';

import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Image,
    TouchableOpacity,
    BackHandler,
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
const Confirmation = ({ navigation }) => {
    const backAction = () => {
        navigation.navigate("StockReport");
        return true
    };

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", backAction);

        return () =>
            BackHandler.removeEventListener("hardwareBackPress", backAction);
    }, []);
    return (
        <View style={{ flex: 1, backgroundColor: COLOR.whiteColor, justifyContent: 'center', alignItems: 'center' }}>
            <HeaderComponent
                navigation={navigation}
                title="Confirmation"
                // onRest={true}
                screen="StockReport"
                containerStyle={{ backgroundColor: COLOR.primary, position: "absolute", top: 0, width: "100%", zIndex: 10 }}
                titleStyle={{ color: COLOR.whiteColor }}
                iconStyle={{ color: COLOR.whiteColor }}
            />
            <Icon name="checkmark-circle" size={WP(40)} color={COLOR.primary} />
            <Text
                style={{
                    fontSize: WP(5),
                    marginVertical: WP(SPACING_PERCENT / 2),
                    textAlign: 'center',
                    lineHeight: WP(SPACING_PERCENT + 2),
                    fontWeight: '600',
                }}>
                Your order is confirmed sucessfully.{"\n"}
                Admin will contact you soon.
            </Text>
        </View>
    );
};
const styles = StyleSheet.create({
    Container: {
        height: '100%',
        width: '100%',
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
    },
})
export default Confirmation;
