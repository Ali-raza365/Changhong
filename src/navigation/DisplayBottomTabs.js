import React, { useEffect } from 'react';
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
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';


import { Home, People, Menu, TrainerHome, TrainingHistory, E_Learning, Display } from '../screens'

const windowWidth = Dimensions.get('screen').width;

const Tab = createBottomTabNavigator();


function MyTabBar({ state, descriptors, navigation }) {
    const focusedOptions = descriptors[state.routes[state.index].key].options;
    let screen = [...state.routes]
    screen.pop();

    if (focusedOptions.tabBarVisible === false) {
        return null;
    }

    const iconsName = ['home', 'menu', 'chatbubble-ellipses-outline', 'person-outline', 'notifications-outline']

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "center" }}>
            <TouchableOpacity style={{
                position: 'absolute',
                top: -WP(11.5),
                width: WP(15),
                height: WP(15),
                borderRadius: WP(10),
                backgroundColor: COLOR.primaryOrange,
                left: windowWidth / 2.4,
                elevation: 5,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Icon name='add' size={WP(TAB_ICON_SIZE) + 8} color={COLOR.whiteColor} />

            </TouchableOpacity>
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

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (

                    <TouchableOpacity
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        activeOpacity={1}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        // onLongPress={onLongPress}
                        style={{
                            flex: 1,

                            // padding: WP(SPACING_PERCENT),
                            backgroundColor: COLOR.pr
                        }}
                    >
                        <Icon name={iconsName[index]} size={WP(TAB_ICON_SIZE)} color={isFocused ? COLOR.primary : COLOR.lightGrey} />
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}



export default function BottomTabs() {
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

        // tabBar={props => <MyTabBar {...props} />}
        >
            <Tab.Screen
                name="Home"
                component={Display}
                options={{
                    tabBarIcon: ({ focused, color }) =>
                        <Icon name="home" size={WP(TAB_ICON_SIZE)} color={color} />,
                }}
            />
            <Tab.Screen
                name="E Learning"
                component={E_Learning}
                options={{
                    tabBarIcon: ({ focused, color }) =>
                        <Icon
                            name="school-outline"
                            size={WP(TAB_ICON_SIZE)}
                            color={color}
                        />
                }}
            />

        </Tab.Navigator>
    );
}