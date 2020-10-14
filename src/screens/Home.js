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
} from 'react-native';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconMaterialC from 'react-native-vector-icons/MaterialCommunityIcons';
import Fonts from "../assets/fonts";
import { connect } from 'react-redux';

const imgMap = require('../assets/images/map.png');

const Home = (props) => {
  const { theme } = props

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
                height: 15,
                backgroundColor: '#00000000',
              }}
            />
          );
        }}
        renderItem={({item, index}) => {
          return (
            <View
              style={{
                borderRadius: 5,
                borderWidth: 1,
                borderColor: theme.border,
                marginHorizontal: 15,
                backgroundColor: theme.card
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginHorizontal: 15,
                  marginTop: 10,
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
                    fontFamily: Fonts.Regular
                  }}>
                  <Text
                    style={{
                      fontFamily: Fonts.Bold
                    }}>
                    Emily Deo
                  </Text>{' '}
                  is looking for Spaghetti
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginLeft: 60,
                  marginRight: 10,
                }}>
                <View
                  style={{
                    flex: 1,
                    height: 4,
                    borderRadius: 4,
                    backgroundColor: theme.border,
                  }}>
                  <View
                    style={{
                      width: '50%',
                      height: 4,
                      borderRadius: 4,
                      backgroundColor: theme.purple,
                    }}
                  />
                </View>
                <Text
                  style={{
                    marginLeft: 10,
                    fontSize: 12,
                    fontFamily: Fonts.Bold,
                    color: theme.text
                  }}>
                  RISING STAR
                </Text>
              </View>

              <View
                style={{
                  backgroundColor: '#00000011',
                  height: 1,
                  marginVertical: 10,
                }}
              />

              <Text
                style={{
                  color: theme.text,
                  marginHorizontal: 15,
                  fontFamily: Fonts.Regular
                }}>
                Who want to eat spaghetti with me?
              </Text>

              <Image
                source={imgMap}
                style={{
                  width: '100%',
                  height: 160,
                  marginVertical: 10,
                }}
                resizeMode="cover"
              />

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 5,
                  marginBottom: 15,
                  justifyContent: 'space-evenly',
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <IconMaterialC name="heart-outline" size={14} color={theme.text} />
                  <Text
                    style={{
                      marginLeft: 5,
                      color: theme.text,
                      fontSize: 12,
                      fontFamily: Fonts.Regular
                    }}>
                    Like
                  </Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <IconFontAwesome name="comment-o" size={14} color={theme.text} />
                  <Text
                    style={{
                      marginLeft: 5,
                      color: theme.text,
                      fontSize: 12,
                      fontFamily: Fonts.Regular
                    }}>
                    Comment
                  </Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <IconMaterialC name="email-outline" size={14} color={theme.text} />
                  <Text
                    style={{
                      marginLeft: 5,
                      color: theme.text,
                      fontSize: 12,
                      fontFamily: Fonts.Regular
                    }}>
                    Message
                  </Text>
                </View>
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
)(Home);

