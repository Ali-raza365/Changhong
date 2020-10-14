/* eslint-disable react-native/no-inline-styles */
import React, { Component, useState } from 'react';

import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Platform,
} from 'react-native';
import Fonts from "../assets/fonts";
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

const Input = (props) => {
    const {
        theme, label, labelExtra, required, value, errorMessage, containerStyle, secureTextEntry,
        inputStyle, multiline
    } = props

    const [showPassword, setShowPassword] = useState(false)

    return (
        <View style={[containerStyle]}>
            {(typeof label == 'string' && label.length > 0) &&
                <View style={{
                    flexDirection: 'row',
                }}>
                    <Text style={{
                        fontSize: 16,
                        marginLeft: 5,
                        fontFamily: Fonts.Regular,
                        color: theme.text
                    }}>
                        {label}
                    </Text>
                    {labelExtra &&
                        <Text style={{
                            marginTop: 3.5,
                            maxWidth: 200,
                            fontSize: 11,
                            marginLeft: 5,
                            color: theme.textSecondry,
                            fontFamily: Fonts.Regular
                        }}>
                            ({labelExtra})
                        </Text>
                    }
                    {required == true &&
                        <IconMaterial
                            name="asterisk"
                            color="#f44336"
                            size={10}
                            style={{
                                marginTop: 4.5,
                                marginLeft: 5
                            }}
                        />
                    }
                </View>
            }

            <View style={{
                marginTop: 3,
                flexDirection: 'row',
                backgroundColor: theme.inputBackground,
                borderColor: theme.border,
                borderWidth: 1,
                borderRadius: 20,
                alignItems: 'center',
            }}>
                <TextInput
                    height={40}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholderTextColor={theme.textPlaceholder}
                    {...props}
                    style={[{
                        fontSize: 16,
                        color: theme.text,
                        padding: 0,
                        paddingTop: (Platform.OS == 'android' || multiline) ? 8 : 0,
                        flex: 1,
                        marginLeft: 15,
                        textAlignVertical: 'top',
                        fontFamily: Fonts.Regular
                    }, inputStyle]}
                    secureTextEntry={secureTextEntry && !showPassword}
                />
                {secureTextEntry == true &&
                    <TouchableOpacity
                        onPress={() => setShowPassword(!showPassword)}
                        style={{
                            paddingHorizontal: 10
                        }}
                    >
                        <IconMaterial
                            name={showPassword ? "eye" : "eye-off"}
                            color={theme.textPlaceholder}
                            size={20}
                        />
                    </TouchableOpacity>
                }
            </View>
            {(typeof errorMessage == 'string' && errorMessage.length > 0) &&
                <Text style={{
                    marginTop: 2,
                    marginLeft: 5,
                    color: "#f44336",
                    fontSize: 12,
                    fontFamily: Fonts.Regular
                }}>{errorMessage}</Text>
            }
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
  )(Input);