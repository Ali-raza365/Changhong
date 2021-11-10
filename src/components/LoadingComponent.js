
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
    View,
    ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import { COLOR } from '../common/Config';

const Loading = (props) => {
    const { theme, containerStyle } = props

    return (
        <View style={[{
            flex: 1,
            backgroundColor: "#f5f5f5",
            alignItems: 'center',
            justifyContent: 'center'
        }, containerStyle]}>
            <ActivityIndicator animating={true} color={COLOR.primary} size='large' />
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