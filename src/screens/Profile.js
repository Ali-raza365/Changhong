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
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconMaterialC from 'react-native-vector-icons/MaterialCommunityIcons';
import Fonts from "../assets/fonts";
import { connect } from 'react-redux';
import { setUser } from "../store/actions/userSession";
import preferences from '../common/preferences';
import { setTheme } from "../store/actions/app";

const Profile = (props) => {
  const { theme } = props

  return (
    <>
      <View
        style={{
          flex: 1,
        }}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 20,
          }}>
          <Image
            source={{ uri: 'https://randomuser.me/api/portraits/women/82.jpg' }}
            style={{
              width: 250,
              height: 270,
              borderRadius: 20,
            }}
            resizeMode="cover"
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 10,
            }}>
            <View
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: theme.border,
              }}
            />
            <IconMaterialC
              name="video"
              size={14}
              color={theme.border}
              style={{ marginLeft: 5 }}
            />
          </View>
          <Text
            style={{
              color: theme.text,
              fontSize: 18,
              fontFamily: Fonts.Bold
            }}>
            Emily Deo
          </Text>
        </View>
        <View
          style={{
            marginTop: 20,
            height: 1,
            backgroundColor: theme.border,
          }}
        />
        <View
          style={{
            marginHorizontal: 20,
            marginVertical: 20,
          }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <IconMaterialC name="home" size={20} color={theme.text} />
            <Text
              style={{
                marginLeft: 5,
                color: theme.text,
                fontSize: 16,
                fontFamily: Fonts.Regular
              }}>
              Lives in los Angeles
            </Text>
          </View>
          <View
            style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
            <IconMaterialC name="hamburger" size={20} color={theme.text} />
            <Text
              style={{
                marginLeft: 5,
                color: theme.text,
                fontSize: 16,
                fontFamily: Fonts.Regular
              }}>
              Eat Sandwiches
            </Text>
          </View>
        </View>
        <View
          style={{
            height: 1,
            backgroundColor: theme.border,
          }}
        />

        <View style={{
          marginHorizontal: 20,
          marginVertical: 20
        }}>
          <Text
            onPress={() => {
              preferences.clearAuthSession().then(() => {
                props.setUser(null)
              })
            }}
            style={{
              color: theme.text,
            }}>Logout</Text>
          <Text
            onPress={() => {
              props.setTheme(theme.name === 'light' ? 'dark' : 'light')
            }}
            style={{
              marginTop: 10,
              color: theme.text,
            }}>Theme: {theme.name}</Text>
        </View>
      </View>
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
  {
    setTheme,
    setUser
  },
)(Profile);
