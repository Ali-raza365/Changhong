import React from 'react';
import color from 'color';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {useTheme, Portal, FAB} from 'react-native-paper';
import {useIsFocused, RouteProp} from '@react-navigation/native';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';

import Home from '../screens/Home';
import Inbox from '../screens/Inbox';
import Profile from '../screens/Profile';
import People from '../screens/People';
import { Text, View, TouchableOpacity } from 'react-native';

const Tab = createBottomTabNavigator();

function MyTabBar({ state, descriptors, navigation }) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View style={{ flexDirection: 'row' }}>
      {state.routes.map((route, index) => {
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
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1 }}
          >
            <Text style={{ color: isFocused ? '#673ab7' : '#222' }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}


type Props = {
  theme: any,
  route: RouteProp<StackNavigatorParamlist, 'FeedList'>;
};

const BottomTabs = (props: Props) => {
  const { theme } = props;

  return (
    <React.Fragment>
      <Tab.Navigator
        initialRouteName="Home"
        backBehavior="initialRoute"
        tabBarOptions={{
          activeTintColor: '#9D00FF',
          inactiveTintColor: theme.primary,
          keyboardHidesTabBar: true,
          labelStyle: {
            height: 27,
            fontSize: 12
          },
          style: {
            height: 60,
          }
        }}
        // tabBar={props => <MyTabBar {...props} />}
      >
        <Tab.Screen
          name="People"
          component={People}
          options={{
            tabBarIcon: ({focused, color}) => <IconFontAwesome name="users" size={18} color={color}/>,
          }}
        />
        <Tab.Screen
          name="Inbox"
          component={Inbox}
          options={{
            tabBarIcon: ({focused, color}) => <IconFontAwesome name="wechat" size={18} color={color} />,
          }}
        />
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({focused, color}) => <IconFontAwesome name="home" size={18} color={color} />,
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ({focused, color}) => <IconFontAwesome name="user" size={18} color={color} />,
          }}
        />
      </Tab.Navigator>
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  const { app } = state

  return {
    theme: app.theme
  };
};

export default connect(
  mapStateToProps,
  {},
)(BottomTabs);

