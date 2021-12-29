/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    FlatList,
    Image,
    TouchableOpacity,
    Linking,
    RefreshControl,
    Dimensions
} from 'react-native';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconMaterialC from 'react-native-vector-icons/MaterialCommunityIcons';
import Fonts from '../assets/fonts';
import { connect } from 'react-redux';
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
    FONT_SIZES,
} from '../common/Config';
import { useDispatch, useSelector } from 'react-redux';
import HeaderComponent from '../components/HeaderComponent';
import LoadingComponent from '../components/LoadingComponent';
import Pdf from 'react-native-pdf';
import { ActivityIndicatorComponent } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

const resources = {
    file: Platform.OS === 'ios' ? 'downloadedDocument.pdf' : '/sdcard/Download/downloadedDocument.pdf',
    url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    base64: 'JVBERi0xLjMKJcfs...',
};


const PdfViewer = (props) => {
    const { theme, navigation, route } = props;
    const { uri } = route.params;
    // const [load, setload] = useState(true)
    // const [progress, setProgress] = useState(0)
    // console.log(uri, "uuuuuuurrrrrrrrrrrriiiiiiii")
    const source = { uri: 'http://samples.leanpub.com/thereactnativebook-sample.pdf', cache: true };
    //const source = require('./test.pdf');  // ios only
    //const source = {uri:'bundle-assets://test.pdf' };
    //const source = {uri:'file:///sdcard/test.pdf'};
    //const source = {uri:"data:application/pdf;base64,JVBERi0xLjcKJc..."};
    //const source = {uri:"content://com.example.blobs/xxxxxxxx-...?offset=0&size=xxx"};
    //const source = {uri:"blob:xxxxxxxx-...?offset=0&size=xxx"};
    var progress = 0;
    useEffect(() => {

    }, [])
    return (
        uri ? <>
            <HeaderComponent navigation={navigation}
                titleStyle={{ color: COLOR.whiteColor }}
                iconStyle={{ color: COLOR.whiteColor }}
                containerStyle={{ backgroundColor: COLOR.primary }} title={`${uri.title}.pdf`} />

            <View style={styles.container}>

                {uri.file &&
                    <Pdf
                        source={{ uri: uri.file }}
                        onLoadComplete={(numberOfPages, filePath) => {
                            console.log(`Number of pages: ${numberOfPages}`);
                        }}
                        onPageChanged={(page, numberOfPages) => {
                            console.log(`Current page: ${page}`);
                        }}
                        renderActivityIndicator={() => {
                            console.log(progress);
                            return <View>
                                <ActivityIndicator animating={true} color={COLOR.primary} size='large' />
                                <Text style={{ color: COLOR.primary, fontSize: WP(5), paddingTop: WP(3) }}> loading {Math.floor(progress)}</Text>
                            </View>
                        }}
                        onError={(error) => {
                            console.log(error, "sdasd");

                            alert('Error: File not in PDF format or corrupted.')
                            // navigation.goBack();
                        }}
                        onLoadProgress={(percent) => {
                            console.log(`Link pressed: ${percent * 1000}`);
                            progress = percent * 100;
                            // setProgress(percent)
                            // return <LoadingComponent />
                        }}

                        // onPressLink={(uri) => {
                        //     console.log(`Link pressed: ${uri}`);
                        // }}
                        style={styles.pdf} />}
            </View>

        </> :
            <>
                <HeaderComponent navigation={navigation}
                    titleStyle={{ color: COLOR.whiteColor }}
                    iconStyle={{ color: COLOR.whiteColor }}
                    containerStyle={{ backgroundColor: COLOR.primary }} title={`Error`} />
                <View style={[styles.container, { justifyContent: "center" }]} >
                    <Text style={{
                        fontSize: WP(5),
                    }}>File not found</Text>
                </View>
            </>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '98%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 25,
    },
    pdf: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    }
});

const mapStateToProps = (state) => {
    const { app } = state;

    return {
        theme: app.theme,
    };
};

export default PdfViewer
