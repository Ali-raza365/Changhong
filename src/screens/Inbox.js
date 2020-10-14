/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  FlatList,
  Image, TouchableOpacity
} from 'react-native';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconMaterialC from 'react-native-vector-icons/MaterialCommunityIcons';
import Fonts from "../assets/fonts";
import { connect } from 'react-redux';

const Inbox = (props) => {
  const { navigation, theme } = props

  return (
    <>
      <FlatList
        data={[1, 2, 4, 5, 6]}
        contentContainerStyle={{
          flexGrow: 1,
          paddingVertical: 15,
        }}
        keyExtractor={(item, index) => 'home-item' + index.toString()}
        ItemSeparatorComponent={() => {
          return (
            <View
              style={{
                height: 1,
                backgroundColor: theme.border,
              }}
            />
          );
        }}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Chat')
              }}
              style={{
                marginHorizontal: 20,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 15,
                }}>
                <Image
                  source={{
                    uri: 'https://randomuser.me/api/portraits/women/90.jpg',
                  }}
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 30,
                  }}
                  resizeMode="contain"
                />
                <Text
                  style={{
                    marginLeft: 15,
                    color: theme.text,
                    fontSize: 16,
                    fontFamily: Fonts.Bold
                  }}>
                  Emily Deo
                </Text>
              </View>
              <Text
                style={{
                  color: theme.text,
                  marginTop: 15,
                  fontFamily: Fonts.Regular
                }}>
                This is just a simple message chat message. Let's put some
                words.
              </Text>

              <View
                style={{
                  marginVertical: 15,
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                }}>
                <Text
                  style={{
                    color: theme.textSecondry,
                    fontFamily: Fonts.Regular
                  }}>
                  Yesterday 10:34
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({});

const mapStateToProps = state => {
  const { app } = state

  return {
    theme: app.theme
  };
};

export default connect(
  mapStateToProps,
  {},
)(Inbox);

