//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import { WelcomeScreen, Login, SignUp, Forgot, } from '../screens'
// create a component
const AuthStack = () => {

    const Stack = createStackNavigator();
    return (

        <Stack.Navigator headerMode="none" initialRouteName='Auth'>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="WelcomeScr" component={WelcomeScreen} />
            <Stack.Screen name="Forgot" component={Forgot} />
        </Stack.Navigator>
    );
};




//make this component available to the app
export default AuthStack;
