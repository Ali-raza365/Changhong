
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Image,
  TextInput
} from 'react-native';
import Fonts from "../assets/fonts";
import { connect } from 'react-redux';

const Header = (props) => {
    const { theme } = props

    return (
        <View>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginHorizontal: 15,
                marginVertical: 10
            }}>
                <TextInput
                    style={{
                        flex: 1,
                        backgroundColor: theme.inputBackground,
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                        borderRadius: 18,
                        height: 36,
                        fontFamily: Fonts.Regular,
                        color: theme.text
                    }}
                    placeholder='Search for people...'
                    placeholderTextColor={theme.textPlaceholder}
                />
                <Image
                    source={{
                        uri: 'https://randomuser.me/api/portraits/women/90.jpg',
                    }}
                    style={{
                        marginLeft: 15,
                        width: 36,
                        height: 36,
                        borderRadius: 36,
                    }}
                    resizeMode="contain"
                />
            </View>
            <View
                style={{
                    height: 1,
                    backgroundColor: theme.border
                }}
            />
        </View>
    )
}

const mapStateToProps = state => {
    const { app } = state
  
    return {
      theme: app.theme
    };
  };
  
  export default connect(
    mapStateToProps,
    {},
  )(Header);