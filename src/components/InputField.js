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
import AntDesign from 'react-native-vector-icons/AntDesign';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

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

const Input = (props) => {
     const {
          theme, label, labelExtra, required, value, errorMessage, containerStyle, secureTextEntry,
          inputStyle, multiline, InputIcon, navigation, iconStyle, customIcon, children
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
                                   color="#969696"
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
                    backgroundColor: COLOR.offWhite,
                    borderRadius: WP(3),
                    alignItems: 'center',
               }}>
                    {InputIcon && <Icon name={InputIcon}
                         style={[{ paddingLeft: WP(SPACING_PERCENT / 2), color: COLOR.darkGray }, iconStyle]}
                         size={30} />}
                    {customIcon && <AntDesign name={customIcon}
                         style={[{ paddingLeft: WP(SPACING_PERCENT / 2), color: COLOR.darkGray }, iconStyle]}
                         size={30} />}
                    <TextInput
                         height={40}
                         underlineColorAndroid="transparent"
                         autoCapitalize="none"
                         autoCorrect={false}
                         {...props}
                         style={[{
                              fontSize: 16,
                              padding: 0,
                              paddingTop: (Platform.OS == 'android' || multiline) ? WP(SPACING_PERCENT / 2) : 0,
                              flex: 1,
                              marginLeft: WP(4),
                              textAlignVertical: 'top',
                              // fontFamily: Fonts.Regular
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
                                   color={COLOR.darkGray}
                                   size={20}
                              />
                         </TouchableOpacity>
                    }
               </View>
               {(errorMessage.length > 0) &&
                    <Text style={{
                         marginTop: 2,
                         marginLeft: 5,
                         color: "blue",
                         fontSize: WP(4),
                         fontFamily: Fonts.Regular,
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