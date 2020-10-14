import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Input from '../components/InputField';
import Fonts from "../assets/fonts";
import { connect } from 'react-redux';
import { setUser } from "../store/actions/userSession";
import * as AuthServices from '../services'
import preferences from '../common/preferences';
import { translate } from '../language';
import { setTheme, setLanguage } from "../store/actions/app";

const Login = (props) => {
  const { navigation, theme, language, setLanguage} = props

  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('pietroex')
  const [password, setPassword] = useState('ciao')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  function validate() {
    if (email.length == 0) {
      setEmailError('Please enter username')
      return false
    }
    if (email.length == 0) {
      setPasswordError('Please enter password')
      return false
    }

    return true
  }

  function onLoginPress() {
    setLoading(true)
    setEmailError('')
    setPasswordError('')
    AuthServices.login(email, password).then(response => {
      console.log('AuthServices.login-response', response)
      preferences.setAuthSession({
        accessToken: response.token,
      }).then(() => {
        props.setUser(response)
      })
    }).catch(error => {
      console.log('AuthServices.login-error', error)
      setEmailError('')
      if (error.response.status == 401) {
        setPasswordError('Username or password is incorrect')
      } else {
        setPasswordError('Something went wrong')
      }
    }).finally(() => {
      setLoading(false)
    })

  }

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{
        flexGrow: 1,
      }}
    >
      <View style={{
        flex: 1,
        marginVertical: 50,
        marginHorizontal: 25,
        justifyContent: 'center'
      }}>
        <View style={{
          alignItems: 'center'
        }}>
          <Text style={{
            fontSize: 20,
            fontFamily: Fonts.Bold,
            color: theme.text
          }}>Log In</Text>
          <Text style={{
            fontSize: 16,
            marginTop: 5,
            fontFamily: Fonts.Regular,
            color: theme.text
          }}>Let's get to work</Text>
        </View>
        <Input
          placeholder={'Username'}
          keyboardType="email-address"
          onChangeText={setEmail}
          containerStyle={{
            marginTop: 30
          }}
          editable={!loading}
          value={email}
          errorMessage={emailError}
        />

        <Input
          placeholder={'Password'}
          secureTextEntry={true}
          onChangeText={setPassword}
          containerStyle={{
            marginTop: 20
          }}
          editable={!loading}
          value={password}
          errorMessage={passwordError}
        />
        <View style={{
          marginTop: 20,
          flexDirection: 'row',
          justifyContent: 'flex-end'
        }}>
          <Text style={{
            fontSize: 13,
            fontFamily: Fonts.Bold,
            color: theme.text
          }}>FORGOT PASSWORD?</Text>
        </View>
        <TouchableOpacity
          disabled={loading}
          onPress={() => {
            if (validate()) {
              onLoginPress()
            }
          }}
          style={{
            marginTop: 25,
            backgroundColor: '#F54B66',
            height: 40,
            borderRadius: 20,
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {loading ? (
            <ActivityIndicator animating={true} color={'white'} size='small' />
          ) : (
              <Text style={{
                fontSize: 16,
                fontFamily: Fonts.Bold,
                color: 'white'
              }}>LOGIN</Text>
            )}
        </TouchableOpacity>

        <View style={{
          flexDirection: 'row',
          marginTop: 25,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Text style={{
            color: '#90A1AC',
            fontSize: 15,
            width: 100,
          }}>{translate('language')}:</Text>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center'
          }}>
            <Text
              onPress={() => {
                setLanguage('en')
              }}
              style={{
                color: language?.languageTag == 'en' ? 'white' : '#90A1AC',
                fontSize: 15,
                padding: 5,
                backgroundColor: language?.languageTag == 'en' ? '#00a2fd' : undefined,
                borderRadius: 5,
                overflow: "hidden"
              }}
            >EN</Text>
            <View style={{ backgroundColor: '#90A1AC', height: 16, width: 1, marginHorizontal: 5 }} />
            <Text
              onPress={() => {
                setLanguage('es')
              }}
              style={{
                color: language?.languageTag == 'es' ? 'white' : '#90A1AC',
                fontSize: 15,
                padding: 5,
                backgroundColor: language?.languageTag == 'es' ? '#00a2fd' : undefined,
                borderRadius: 5,
                overflow: "hidden"
              }}>ES</Text>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView >
  );
};

const styles = StyleSheet.create({});

const mapStateToProps = state => {
  const { app } = state

  return {
    theme: app.theme,
    language: app.language
  };
};

export default connect(
  mapStateToProps,
  {
    setTheme,
    setLanguage,
    setUser
  },
)(Login);
