import React, { useState } from 'react';
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

const { width } = Dimensions.get('window');

// const totalTabs = "4"
// const anime = [
//       { title: 'Tab1', data: 'dsfd' },
//       { title: 'Tab2', data: 'dsfd' },
//       { title: 'Tab3', data: 'dsfd' },
//       { title: 'Tab4', data: 'dsfd' },
// ]
export default function Tabs(props) {
      const { totalTabs, Tabs, ontabChanges, containerStyle, innerStyle, tabStyle } = props
      const [active, setactive] = useState(0)
      const [tabs, setTabs] = useState({})
      const [translateX, settranslateX] = useState(new Animated.Value(0),)

      const handleSlide = (type, index) => {
            console.log(type)
            Animated.spring(translateX, {
                  toValue: type,
                  duration: 100,
            }).start();
            ontabChanges(index)
      };
      return (
            <>
                  <View style={[{
                        backgroundColor: COLOR.primary,
                        paddingVertical: WP(SPACING_PERCENT)
                  }, containerStyle]}>
                        <View
                              style={[{
                                    width: '90%',
                                    backgroundColor: COLOR.whiteColor,
                                    borderRadius: 15,
                                    marginLeft: 'auto',
                                    marginRight: 'auto', height: 36,
                              }, innerStyle]}>
                              <View
                                    style={{
                                          flexDirection: 'row',
                                          height: 36,
                                          position: 'relative',
                                    }}>
                                    <Animated.View
                                          style={[{
                                                position: 'absolute',
                                                width: (width / totalTabs) - 10,
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
                                          }, tabStyle]}
                                    />
                                    {Tabs && Tabs.map((item, index) => {
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

                                                            setTabs({
                                                                  ...tabs,
                                                                  [item.title]: event.nativeEvent.layout.x
                                                            })
                                                      }
                                                      onPress={() => {
                                                            setactive(index)
                                                                  , handleSlide(tabs[item.title], index)
                                                      }}>
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
            </>
      );
}

