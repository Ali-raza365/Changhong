import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Animated,
    ScrollView,
    Image,
    Dimensions,

} from 'react-native';
import { assets } from '../../react-native.config';
import { COLOR, IMAGE, SPACING_PERCENT, WP } from '../common/Config';

const { width, height } = Dimensions.get('window');

const total = "4"
const anime = [
    { title: 'Tab1', data: 'dsfd' },
    { title: 'Tab2', data: 'dsfd' },
    { title: 'Tab3', data: 'dsfd' },
    { title: 'Tab4', data: 'dsfd' },
]
export default class Animation extends React.Component {
    state = {
        active: 0,
        tabs: {},
        xTabOne: 0,
        xTabTwo: 0,
        xTabThree: 0,
        translateX: new Animated.Value(0),
    };
    handleSlide = (type) => {
        console.log(type)
        let {
            active,
            translateX,
        } = this.state;
        Animated.spring(translateX, {
            toValue: type,
            duration: 100,
        }).start();
        if (active === 0) {
            console.log("Animation ", active)
        } else if (active === 1) {
            console.log("Animation ", active)
        } else if (active === 2) {
            console.log("Animation ", active)
        }
    };
    render() {
        console.log(`${width / 2}%`, width, total)
        let {
            xTabOne,
            xTabTwo,
            xTabThree,
            translateX,
            tabs,
            active,
        } = this.state;
        return (
            <View style={{ flex: 1 }}>
                <View
                    style={{
                        backgroundColor: COLOR.whiteColor,
                        width: '90%',
                        marginTop: WP(SPACING_PERCENT),
                        marginLeft: 'auto',
                        marginRight: 'auto',
                    }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            // marginTop: 10,
                            // marginBottom: 20,
                            height: 36,
                            position: 'relative',
                        }}>
                        <Animated.View
                            style={{
                                position: 'absolute',
                                width: (width / total) - 10,
                                height: '100%',
                                top: 0,
                                left: 0,
                                backgroundColor: COLOR.red,
                                borderRadius: 15,
                                transform: [
                                    {
                                        translateX,
                                    },
                                ],
                            }}
                        />
                        {anime.map((item, index) => {
                            return (
                                <TouchableOpacity
                                    key={index}
                                    style={{
                                        flex: 1,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        // borderWidth: 1,
                                        // borderColor: '#007aff',
                                        borderRadius: 4,
                                        borderRightWidth: 0,
                                        borderTopRightRadius: 0,
                                        borderBottomRightRadius: 0,
                                    }}
                                    onLayout={(event) =>

                                        this.setState({
                                            [item.title]: event.nativeEvent.layout.x
                                        })
                                    }
                                    onPress={() =>
                                        this.setState({ active: index }, () => { this.handleSlide(this.state[item.title]) })
                                    }>
                                    <Text
                                        style={{
                                            fontWeight: 'bold',
                                            color: active === index ? '#fff' : COLOR.blackColor,
                                        }}>
                                        {item.title}
                                    </Text>
                                </TouchableOpacity>
                            )
                        })}

                        {/* <TouchableOpacity
                                          style={{
                                                flex: 1,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                borderWidth: 1,
                                                borderColor: '#007aff',
                                                borderRadius: 4,
                                                borderLeftWidth: 0,
                                                borderTopLeftRadius: 0,
                                                borderBottomLeftRadius: 0,
                                          }}
                                          onLayout={(event) =>
                                                this.setState({
                                                      xTabTwo: event.nativeEvent.layout.x,
                                                })
                                          }
                                          onPress={() =>
                                                this.setState({ active: 1 }, () => this.handleSlide(xTabTwo))
                                          }>
                                          <Text
                                                style={{
                                                      color: active === 1 ? '#fff' : '#007aff',
                                                }}>
                                                Tab Two
                                          </Text>
                                    </TouchableOpacity> */}
                        {/* <TouchableOpacity
                                          style={{
                                                flex: 1,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                borderWidth: 1,
                                                borderColor: '#007aff',
                                                borderRadius: 4,
                                                borderLeftWidth: 0,
                                                borderTopLeftRadius: 0,
                                                borderBottomLeftRadius: 0,
                                          }}
                                          onLayout={(event) =>
                                                this.setState({
                                                      xTabThree: event.nativeEvent.layout.x,
                                                })
                                          }
                                          onPress={() =>
                                                this.setState({ active: 2 }, () => this.handleSlide(xTabThree))
                                          }>
                                          <Text
                                                style={{
                                                      color: active === 2 ? '#fff' : '#007aff',
                                                }}>
                                                Tab Three
                                          </Text>
                                    </TouchableOpacity> */}
                    </View>
                </View>
            </View>
        );
    }
}
