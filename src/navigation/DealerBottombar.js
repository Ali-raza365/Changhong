import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View, Text,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
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
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/Ionicons';


import { Home, People, Menu, QrCamera } from '../screens'
import AsyncStorage from '@react-native-community/async-storage';
import preferences from '../common/preferences';



const windowWidth = Dimensions.get('screen').width;

const Tab = createBottomTabNavigator();


function MyTabBar({ state, descriptors, navigation }) {

    // const [IsSaleMan, setIsSaleMan] = useState(false)
    const focusedOptions = descriptors[state.routes[state.index].key].options;
    let screen = [...state.routes]
    screen.pop();

    if (focusedOptions.tabBarVisible === false) {
        return null;
    }

    const iconsName = ['home', 'menu',]

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "center" }}>
            {screen.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };
                return (
                    <TouchableOpacity
                        key={index}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        activeOpacity={1}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        // onLongPress={onLongPress}
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            padding: WP(SPACING_PERCENT),
                            backgroundColor: COLOR.whiteColor,
                        }}
                    >
                        <Icon name={iconsName[index]} size={WP(TAB_ICON_SIZE)} color={isFocused ? COLOR.primary : COLOR.lightGrey} />
                        <Text style={{ color: isFocused ? '#673ab7' : '#222' }}>
                            {label}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}



export default function BottomTabs() {
    const navigation = useNavigation()

    return (
        <Tab.Navigator
            tabBarOptions={{
                activeTintColor: COLOR.primary,
                inactiveTintColor: COLOR.lightGrey,
                tabBarLabelPosition: "below-icon",
                style: {
                    // padding: WP(SPACING_PERCENT),
                    height: WP(20),
                    paddingBottom: WP(3)
                },
            }
            }
            tabBar={props => <MyTabBar {...props} />}
        >
            <Tab.Screen
                name="home"
                component={Home}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ focused, color }) =>
                        <Icon name="home" size={WP(TAB_ICON_SIZE)} color={color} />,
                }}
            />
            <Tab.Screen
                name="Menu"
                component={Menu}
                options={{
                    tabBarIcon: ({ focused, color }) =>
                        <Icon name="menu-outline" size={WP(TAB_ICON_SIZE)} color={color} />,
                }}
            />
            <Tab.Screen
                name="BrCode"
                component={QrCamera}
                options={{
                    tabBarLabel: '',
                    tabBarVisible: false,
                    tabBarIcon: (props) => (
                        <Icon name="qr-code-outline" size={WP(12)} color={'#fff'}{...props} />
                    ),
                    tabBarButton: (props) => (
                        console.log(props),
                        <TabbarButton {...props} />
                    )
                }}
            />
        </Tab.Navigator>
    );
}