
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';

const Loading = (props) => {
    const { theme } = props

    return (
        <View style={{
            flex: 1,
            backgroundColor: theme.background,
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <ActivityIndicator animating={true} color={theme.text} size='large'/>
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
  )(Loading);