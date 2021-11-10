import React, { Component, useEffect } from 'react';
import {
      View,
      Text,
      StyleSheet,
      Image,
      TouchableOpacity,
      TextInput,

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
import Icon from 'react-native-vector-icons/Ionicons';

const SearchInput = ({ placeholder, containerStyle, inputStyle, onChangeText, bgcolorr }) => {
      return (
            <View style={[{ backgroundColor: COLOR.primary, width: '100%', }, bgcolorr]}>
                  <View style={[styles.searchContainer, containerStyle]}>
                        <TextInput
                              style={[{}, inputStyle]}
                              placeholder={placeholder}
                              width='100%'
                              fontSize={WP(4)}
                              paddingHorizontal={WP(SPACING_PERCENT)}
                              onChangeText={(txt) => onChangeText(txt)}
                        />
                        <Icon

                              name="search"
                              size={WP(8)}
                              color={COLOR.primary}
                        />
                  </View>
            </View>
      );
};

// define your styles
const styles = StyleSheet.create({
      searchContainer: {
            width: "95%",
            marginLeft: "auto",
            marginRight: "auto",
            marginVertical: WP(SPACING_PERCENT),
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            height: WP(12),
            backgroundColor: COLOR.whiteColor,
            borderRadius: WP(2),
            paddingHorizontal: WP(SPACING_PERCENT + 1)
      },
});

//make this component available to the app
export default SearchInput;
