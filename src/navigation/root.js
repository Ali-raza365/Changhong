import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { enableScreens } from 'react-native-screens';
import { connect } from 'react-redux';
import _ from 'lodash';

import Login from '../screens/Login';
import Chat from '../screens/Chat';
import LoadingComponent from '../components/LoadingComponent';
import preferences from '../common/preferences';
import * as ApiServices from '../services';
import PermissionsManager from '../utils/PermissionsManager';
import AuthStack from './AuthStack';
import BottomTabs from './bottomTabs';
import DealerBottomTab from './DealerBottombar';
import TrainerBottomTabs from './TrainerBottomTabs';
import DisplayBottomTabs from './DisplayBottomTabs';
import {
    Animation,
    Display,
    E_Learning,
    MRP,
    MRPDetail,
    Question,
    Retail,
    SaleReport,
    Conformation,
    StockDetails,
    StockReport,
    StockTotal,
    Wallet,
    SelectBrand,
    Timer,
    TrainingConfirmation,
    Manually,
    AddQuestion,
    PhotoGallery,
    ShowQuestion,
    PersonalDetails,
    TransactionHistory,
    DisplayDetail,
    SplashScreen,
    ManuallyBarCode,
    QrCamera,
    Forgot,
    BarCodeSuccess,
    PdfViewer,
    MrpProductDetails,
} from '../screens';

const Stack = createStackNavigator();
enableScreens();
const RootNavigator = (props) => {
    const { theme, user, setLanguage } = props;
    const [loading, setLoading] = useState(true);
    const [isActive, setisActive] = useState(true)


    // async function onMount() {
    //      PermissionsManager.chechPermissionStatus();
    //      preferences
    //           .getLocalization()
    //           .then((languageTag) => {
    //                setLanguage(languageTag);
    //                ApiServices.ipService().then((response) => {
    //                     if (response.country_code == 'EC') {
    //                          setLanguage('es');
    //                     }
    //                });
    //           })
    //           .catch((error) => {
    //                console.log('RootStack', 'getLocalization-error', error);
    //           });

    //      try {
    //           setLoading(true);

    //           const savedSession = await preferences.getAuthSession();
    //           const userSession = await ApiServices.verifySession();
    //           // preferences.setAuthSession({
    //           //   accessToken: userSession.session.jwt,
    //           // })
    //           props.setUser(userSession);
    //      } catch (error) {
    //      } finally {
    //           setLoading(false);
    //      }
    // }

    // useEffect(() => {

    // }, [])
    return (
        <NavigationContainer>
            <Stack.Navigator headerMode="none" >
                <Stack.Screen name="splash" component={SplashScreen} />
                <Stack.Screen name="Auth" component={AuthStack} />
                <Stack.Screen name="bottomTab" component={BottomTabs} />
                <Stack.Screen name="DealerBottomTab" component={DealerBottomTab} />
                <Stack.Screen name="DisplayBottomTab" component={DisplayBottomTabs} />
                <Stack.Screen name="BrCode" component={QrCamera} />
                <Stack.Screen name="BarCodeSuccess" component={BarCodeSuccess} />
                <Stack.Screen name="Manually" component={Manually} />
                <Stack.Screen name="MyRetail" component={Retail} />
                <Stack.Screen name="SaleReport" component={SaleReport} />
                <Stack.Screen name="Wallet" component={Wallet} />
                <Stack.Screen name="PersonalDetails" component={PersonalDetails} />
                <Stack.Screen name="TransactionHistory" component={TransactionHistory} />
                <Stack.Screen name="E_Learning" component={E_Learning} />
                <Stack.Screen name="PdfViewer" component={PdfViewer} />
                <Stack.Screen name="Question" component={Question} />
                <Stack.Screen name="AddQuestion" component={AddQuestion} />
                <Stack.Screen name="ShowQuestion" component={ShowQuestion} />
                <Stack.Screen name="Display" component={Display} />
                <Stack.Screen name="DisplayDetail" component={DisplayDetail} />
                <Stack.Screen name="StockReport" component={StockReport} />
                <Stack.Screen name="StockDetails" component={StockDetails} />
                <Stack.Screen name="StockDetailsTotal" component={StockTotal} />
                <Stack.Screen name="Conformation" component={Conformation} />
                <Stack.Screen name="MRP" component={MRP} />
                <Stack.Screen name="MRPDetail" component={MRPDetail} />
                <Stack.Screen name="MrpProductDetails" component={MrpProductDetails} />
                <Stack.Screen name="SelectBrand" component={SelectBrand} />
                <Stack.Screen name="PhotoGallery" component={PhotoGallery} />
                <Stack.Screen name="TrainerTabs" component={TrainerBottomTabs} />
                <Stack.Screen name="Timer" component={Timer} />
                <Stack.Screen
                    name="TrainingConfirmation"
                    component={TrainingConfirmation}
                />

                {/* <Stack.Screen name="TrainerTabs" component={TrainerBottomTabs} /> */}
                {/* <Stack.Screen name="Auth" component={AuthStack} /> */}
                {/* <Stack.Screen name="MyRetail" component={Animation} /> */}
            </Stack.Navigator>
        </NavigationContainer>
    );
};


export default RootNavigator

