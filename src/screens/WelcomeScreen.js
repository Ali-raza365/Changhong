import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableOpacity, Image } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
const windowWidth = Dimensions.get('screen').width;
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
    FONT_SIZES
} from '../common/Config';
const WelcomeScreen = ({ navigation }) => {
    return (
        <View style={styles.Container}>
            <View style={{ overflow: 'hidden', width: "90%", marginLeft: "auto", marginRight: "auto" }}>
                <Image source={IMAGE.Chiq_logo} style={{ width: "100%", height: HP(13) }} resizeMode="contain" />
            </View>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate("Login")
                }}
                style={{
                    margin: WP(SPACING_PERCENT - 2),
                    backgroundColor: COLOR.primary,
                    height: WP(SPACING_PERCENT * 3),
                    borderRadius: 10,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Text style={{
                    fontSize: WP(4),
                    color: 'white'
                }}>Sales</Text>

            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate("SelectBrand")
                }}
                style={{
                    margin: WP(SPACING_PERCENT - 2),
                    backgroundColor: COLOR.primary,
                    height: WP(SPACING_PERCENT * 3),
                    borderRadius: 10,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Text style={{
                    fontSize: WP(4),
                    color: 'white'
                }}>Stock</Text>

            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate("TrainerTabs")
                }}
                style={{
                    margin: WP(SPACING_PERCENT - 2),
                    backgroundColor: COLOR.primary,
                    height: WP(SPACING_PERCENT * 3),
                    borderRadius: 10,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Text style={{
                    fontSize: WP(4),
                    color: 'white'
                }}>Trainer</Text>

            </TouchableOpacity>
        </View>
    );
};
const styles = StyleSheet.create({
    Container: {
        height: '100%',
        width: '100%',
        backgroundColor: 'white',
        // alignItems: 'center',
        justifyContent: 'center',
    },
})
export default WelcomeScreen;
