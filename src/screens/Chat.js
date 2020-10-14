/* eslint-disable react-native/no-inline-styles */
import React, {useState, useCallback, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
} from 'react-native';
import moment from 'moment';
import {GiftedChat, Bubble} from 'react-native-gifted-chat';
import Fonts from "../assets/fonts";
import { connect } from 'react-redux';

const Chat = (props) => {
  const { theme } = props
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
      {
        _id: 2,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 15,
          marginHorizontal: 15,
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
          John Deo
        </Text>
      </View>
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1,
        }}
        alignTop={true}
        showAvatarForEveryMessage={false}
        renderAvatar={(props) => null}
        renderBubble={(props) => {
          let marginLeft = 0;
          let marginRight = 0;

          if (props.position == 'left') {
            marginRight = 20;
          } else {
            marginLeft = 20;
          }

          return (
            <View style={{marginRight: marginRight, marginLeft: marginLeft}}>
              <Bubble
                {...props}
                wrapperStyle={{
                  left: {
                    borderRadius: 25,
                    backgroundColor: theme.messageLeftBackground,
                  },
                  right: {
                    borderRadius: 25,
                    backgroundColor: theme.messageRightBackground,
                  },
                }}
                renderMessageText={({currentMessage}) => (
                  <Text
                    style={{
                      marginHorizontal: 15,
                      marginTop: 10,
                      fontSize: 16,
                      fontFamily: Fonts.Regular,
                      color: theme.text
                    }}>
                    {currentMessage.text}
                  </Text>
                )}
                renderTime={({currentMessage}) => {
                  const time = moment(currentMessage.createdAt).calendar(null, {
                    sameDay: '[Today], LT',
                    nextDay: 'dddd, LT',
                    nextWeek: 'dddd, LT',
                    lastDay: '[Yesterday], LT',
                    lastWeek: 'dddd, LT',
                    sameElse: 'MMM D, YYYY [at] LT',
                  });

                  return (
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        marginHorizontal: 15,
                        marginBottom: 10,
                      }}>
                      <Text
                        style={{
                          fontSize: 12,
                          color: theme.textSecondry,
                          fontFamily: Fonts.Regular
                        }}>
                        {time}
                      </Text>
                    </View>
                  );
                }}
              />
            </View>
          );
        }}
      />
    </View>
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
)(Chat);

