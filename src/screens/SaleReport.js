import React, { useState, useEffect } from 'react';
import {
    StyleSheet, View, Text,
    RefreshControl,
    ScrollView,
    Platform, TouchableOpacity
} from 'react-native';
import HeaderComponent from '../components/HeaderComponent';
import { VictoryBar, VictoryChart, VictoryTheme, VictoryArea, VictoryLabel, VictoryVoronoiContainer } from "victory-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { useDispatch, useSelector } from 'react-redux';
import { _GETAllCourses } from '../store/actions/question';
import LoadingComponent from '../components/LoadingComponent';

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
    FONT_SIZES
} from '../common/Config';
import { _GETSale } from '../store/actions/stockaction';
const SaleReport = ({ navigation }) => {
    const dispatch = useDispatch()
    const [date, setDate] = useState();
    const [data, setdata] = useState({
        sale: [],
        days: [],
        target: "7"
    });
    const [format, setFormat] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [refreshing, setRefreshing] = useState(false);

    const [show, setShow] = useState(false);
    const { salereport, sale_loading, } = useSelector(state => state.stock)
    useEffect(() => {
        var d = new Date();
        formateDate(d)
        getsaleReport()
    }, [])

    const onRefresh = () => {
        //Clear old data of the list
        getsaleReport()
    };
    const formateDate = (d) => {
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var monthName = months[d.getMonth()];
        var datestring = d.getDate() + " " + (monthName) + " " + d.getFullYear()
        // let today = d.getDate() + " " + (monthName)
        // console.log(today)
        // let index = salereport.days && salereport.days.indexOf(today.toString())
        // console.log(index)
        setDate(datestring)
    }

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        // console.log(currentDate)
        setShow(Platform.OS === 'ios');
        formateDate(currentDate)
        setFormat(currentDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };
    const getsaleReport = () => {
        dispatch(_GETSale())
    }
    useEffect(() => {
        if (salereport.length !== 0) {
            let days = salereport.length !== 0 ? salereport.days.split(',') : []
            let sale = salereport.length !== 0 ? salereport.sale.split(',') : []
            let target = salereport.sale_target
            let arr = sale.map((sa, index) => {
                let outputstr = sa.replace(/'/g, '');
                if (sa !== "") {
                    return +outputstr
                } else {
                    return 0
                }
            })
            setdata({
                days,
                sale: arr,
                target
            })
            console.log({ arr, days, target, })
        }
    }, [salereport])

    if (sale_loading) {
        return <LoadingComponent />
    }

    return (
        <ScrollView
            refreshControl={
                <RefreshControl
                    //refresh control used for the Pull to Refresh
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }
            style={styles.Container}>
            <HeaderComponent
                navigation={navigation}
                containerStyle={{ backgroundColor: COLOR.primary }}
                iconStyle={{ color: COLOR.whiteColor }}
                titleStyle={{ color: COLOR.whiteColor }}
                title="Sales Report" />
            <View style={{ backgroundColor: COLOR.primary, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                <TouchableOpacity style={styles.btnContainer}
                    onPress={() => {
                        // showDatepicker()
                    }}
                >
                    <Text style={styles.btn}>{date}</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.chartContainer}>
                <Text style={styles.chartTitle}>Store's Sales Chart</Text>

                <View style={styles.ChartColorContainer}>
                    <View style={styles.colorScale}>
                        <Text style={styles.Textt}>Sale  </Text>
                        <View style={{ width: WP(5), height: WP(5), backgroundColor: "#6b90a8" }} />
                    </View>
                    <View style={styles.colorScale}>
                        <Text style={styles.Textt}>Target Sale  </Text>
                        <View style={{ width: WP(5), height: WP(5), backgroundColor: "#c43a31" }} />
                        <Text style={styles.Textt}>  {salereport && salereport.sale_target && salereport.sale_target}</Text>
                    </View>
                </View>


                <VictoryChart
                    theme={VictoryTheme.material}
                // domainPadding={10}
                >
                    <VictoryBar
                        alignment="start"
                        style={{ data: { fill: "#c43a31" } }}
                        data={
                            data.sale.length !== 0 ? data.sale.map((sa, index) => {
                                return { x: index + 1, y: sa }
                            }) :
                                [{ y: 2 },
                                { y: 3 },
                                { y: 5 },
                                { y: 1 },
                                { y: 4 },
                                { y: 5 },]
                        }
                    />
                </VictoryChart>


                {/* <VictoryChart
                    height={WP(90)}
                // theme={VictoryTheme.material}
                >
                    <VictoryArea
                        interpolation="natural"
                        domain={{ x: [0, 1], y: data.target ? data.target == 0 ? [0, 50] : data.target : [0, 50] }}
                        // containerComponent={<VictoryVoronoiContainer angle={90} />}
                        categories={{ x: data ? data.days : ["sale"] }}
                        style={{ data: { fill: 'lightblue', stroke: 'cyan', strokeWidth: 3, fillOpacity: 0.4 } }}

                        // labels={({ datum }) => datum.y}
                        data={
                            data.sale.length !== 0 ? data.sale.map((sa, index) => {
                                // console.log(index, sa)
                                if (sa !== "") {
                                    return { x: index + 1, y: sa }
                                } else {
                                    return { x: index + 1, y: sa ? sa : 0 }
                                }
                            })
                                :
                                [
                                    { x: 1, y: 2, },
                                ]
                        }
                    />
                </VictoryChart> */}
                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={format}
                        mode={mode}
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                    />
                )}
            </View>
        </ScrollView>
    );
};
const styles = StyleSheet.create({
    Container: {
        height: '100%',
        width: WP("100%")
        // backgroundColor: 'red',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    btnContainer: {
        backgroundColor: COLOR.whiteColor,
        width: WP(40),
        textAlign: "center",
        borderRadius: 10,
        padding: WP(2),
        marginBottom: WP(2),
    }, btn: {
        textTransform: "uppercase",
        textAlign: "center",
        fontSize: WP(SPACING_PERCENT),
        color: COLOR.primary,
        fontWeight: "600",
    },
    chartContainer: {

        backgroundColor: 'rgba(0,0,0,0.9)',
        marginTop: WP(SPACING_PERCENT),
        marginHorizontal: WP(SPACING_PERCENT / 2),
        borderRadius: WP(RADIUS)
    },
    chartTitle: {
        color: '#E5E5E5',
        alignSelf: 'center',
        fontSize: WP(TEXT_SIZES.h2),
        paddingVertical: WP(SPACING_PERCENT / 2),
        fontWeight: 'bold',
    },
    ChartColorContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: WP(SPACING_PERCENT / 2),
    },
    colorScale: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    Textt: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: WP('4')

    }
})
export default SaleReport;


// import React from "react";
// import { StyleSheet, View } from "react-native";
// import { VictoryBar, VictoryChart, VictoryTheme } from "victory-native";

// const data = [
//       { quarter: 1, earnings: 13000 },
//       { quarter: 2, earnings: 16500 },
//       { quarter: 3, earnings: 14250 },
//       { quarter: 4, earnings: 19000 }
// ];

// export default class SaleReport extends React.Component {
//       render() {
//             return (
//                   <View style={styles.container}>
//                         <VictoryChart width={350} theme={VictoryTheme.material}>
//                               <VictoryBar data={data} x="quarter" y="earnings" />
//                         </VictoryChart>
//                   </View>
//             );
//       }
// }

// const styles = StyleSheet.create({
//       container: {
//             flex: 1,
//             justifyContent: "center",
//             alignItems: "center",
//             backgroundColor: "#f5fcff"
//       }
// })