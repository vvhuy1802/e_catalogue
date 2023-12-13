import {
  Image,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import React, {useState} from 'react';
import {HeightSize, height, width} from '~/theme/size';
import {IconSvg} from '../iconSvg';
import {TextFont, TextStyle} from '~/theme/textStyle';
import {useDispatch, useSelector} from 'react-redux';
import {
  SetCurrentDropDown,
  selectCurrentDropDown,
} from '~/redux/reducers/globalSlice';
import {images} from '~/assets';
import {AppDispatch} from '~/app/store';
import Animated, {Layout} from 'react-native-reanimated';

type Props = {
  style?: StyleProp<ViewStyle>;
};
const Cart = ({style}: Props) => {
  const currentDropDown = useSelector(selectCurrentDropDown);
  const dispatch = useDispatch<AppDispatch>();
  const [isShowDropDown, setIsShowDropDown] = useState<boolean>(false);
  const dataDropDown = [
    {
      id: 1,
      name: 'man',
      title: 'Men',
      img: images.home.DropDownMan,
    },
    {
      id: 2,
      name: 'woman',
      title: 'Woman',
      img: images.home.DropDownWoman,
    },
    {
      id: 3,
      name: 'boy',
      title: 'Boy',
      img: images.home.DropDownBoy,
    },
    {
      id: 4,
      name: 'girl',
      title: 'Girl',
      img: images.home.DropDownGirl,
    },
  ];
  return (
    <>
      <View
        style={[
          {
            marginTop: HeightSize(10),
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            height: HeightSize(30),
            paddingHorizontal: HeightSize(20),
          },
          style,
        ]}>
        <Pressable
          onPress={() => setIsShowDropDown(!isShowDropDown)}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <IconSvg
            icon="IconDropDown"
            width={HeightSize(16)}
            height={HeightSize(16)}
          />
          <Text
            style={{
              color: '#3B3021',
              ...TextStyle.Base,
              ...TextFont.SBold,
              marginLeft: HeightSize(8),
            }}>
            {currentDropDown.title}
          </Text>
        </Pressable>
        <View
          style={{
            width: HeightSize(24),
            height: HeightSize(28),
            justifyContent: 'flex-end',
            alignItems: 'center',
            marginLeft: HeightSize(24),
          }}>
          <IconSvg
            icon="IconBagBlack"
            width={HeightSize(20)}
            height={HeightSize(20)}
          />
          <View
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: HeightSize(14),
              height: HeightSize(14),
              borderRadius: 10,
              backgroundColor: 'white',
              padding: HeightSize(2),
            }}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#433229',
                borderRadius: 10,
              }}>
              <Text
                style={{
                  color: 'white',
                  ...TextStyle.SuperXS,
                  ...TextFont.SLight,
                }}>
                2
              </Text>
            </View>
          </View>
        </View>
      </View>
      {isShowDropDown && (
        <Pressable
          onPress={() => {
            setIsShowDropDown(false);
          }}
          style={[
            {
              position: 'absolute',
              width: width,
              height: height,
              zIndex: 1,
            },
            {
              paddingTop: HeightSize(40),
              paddingRight: HeightSize(70),
              flexDirection: 'row',
              justifyContent: 'flex-end',
              paddingHorizontal: HeightSize(20),
            },
            style,
          ]}>
          <Animated.View
            //make this view appear and disappear fade in fade out
            layout={Layout.stiffness(100).damping(10).duration(300)}
            style={{
              width: HeightSize(150),
              height: HeightSize(180),
              backgroundColor: 'white',
              borderRadius: 10,
              shadowColor: '#433229',
              shadowOffset: {
                width: 0,
                height: 5,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              gap: HeightSize(10),
              paddingVertical: HeightSize(10),
            }}>
            {dataDropDown.map((item, index) => {
              return (
                item.id !== currentDropDown.id && (
                  <>
                    <View
                      key={index}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        paddingHorizontal: HeightSize(10),
                      }}>
                      <Pressable
                        onPress={() => {
                          dispatch(SetCurrentDropDown(item));
                          setIsShowDropDown(false);
                        }}
                        key={index}
                        style={{
                          alignItems: 'center',
                          flexDirection: 'row',
                        }}>
                        <Image
                          source={item.img}
                          style={{
                            width: HeightSize(40),
                            height: HeightSize(40),
                          }}
                        />
                        <Text
                          style={{
                            color: '#3B3021',
                            ...TextStyle.Base,
                            ...TextFont.SBold,
                            marginLeft: HeightSize(8),
                            textAlign: 'center',
                          }}>
                          {item.title}
                        </Text>
                      </Pressable>
                    </View>
                    {index !== dataDropDown.length - 1 && (
                      <View
                        style={{
                          width: '100%',
                          height: 1,
                          backgroundColor: '#E5E5E5',
                        }}
                      />
                    )}
                  </>
                )
              );
            })}
          </Animated.View>
        </Pressable>
      )}
    </>
  );
};

export default Cart;

const styles = StyleSheet.create({});
