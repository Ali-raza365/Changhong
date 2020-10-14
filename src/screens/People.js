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
  Image,
  TextInput
} from 'react-native';
import HeaderSearchComponent from '../components/HeaderSearchComponent'
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconMaterialC from 'react-native-vector-icons/MaterialCommunityIcons';
import Fonts from "../assets/fonts";
import { connect } from 'react-redux';

const People = (props) => {
  const { theme } = props
  return (
    <>
      <HeaderSearchComponent />
      <FlatList
        data={[1, 2, 4, 5, 6]}
        contentContainerStyle={{
          flexGrow: 1,
          // paddingVertical: 15,
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
        renderItem={({ item, index }) => {
          return (
            <View
              style={{
                marginHorizontal: 20,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: 15,
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
            </View>
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
)(People);

