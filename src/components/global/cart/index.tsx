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
import {HeightSize, WidthSize, height, width} from '~/theme/size';
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
import FastImage from 'react-native-fast-image';

type Props = {
  style?: StyleProp<ViewStyle>;
  haveDropDownList?: boolean;
  onCartPress?: () => void;
};
const Cart = ({style, onCartPress, haveDropDownList = true}: Props) => {
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
      title: 'Women',
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
            paddingHorizontal: HeightSize(24),
            alignItems: 'center',
          },
          style,
        ]}>
        {haveDropDownList ? (
          <Pressable
            onPress={() => setIsShowDropDown(!isShowDropDown)}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <IconSvg
              icon="IconDropDown"
              width={HeightSize(20)}
              height={HeightSize(20)}
            />
            <Text
              style={{
                color: '#3B3021',
                ...TextStyle.LG,
                ...TextFont.SBold,
                marginLeft: HeightSize(8),
              }}>
              {currentDropDown.title}
            </Text>
          </Pressable>
        ) : null}

        <Pressable
          onPress={onCartPress}
          style={{
            width: HeightSize(24),
            height: HeightSize(36),
            justifyContent: 'flex-end',
            alignItems: 'center',
            marginLeft: HeightSize(24),
          }}>
          <IconSvg icon="IconBagBlack" />
          <View
            style={{
              position: 'absolute',
              top: HeightSize(4),
              right: -HeightSize(8),
              width: HeightSize(20),
              height: HeightSize(20),
              borderRadius: 10,
              backgroundColor: '#F9F6E8',
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
                  ...TextStyle.XS,
                  ...TextFont.SMedium,
                }}>
                2
              </Text>
            </View>
          </View>
        </Pressable>
      </View>
      {/* {isShowDropDown && ( */}
      <Pressable
        key={currentDropDown.id}
        onPress={() => {
          setIsShowDropDown(false);
        }}
        style={[
          {
            display: isShowDropDown ? 'flex' : 'none',
            position: 'absolute',
            width: width,
            height: height,
            zIndex: 1,
          },
          {
            paddingTop: HeightSize(60),
            paddingRight: HeightSize(70),
            flexDirection: 'row',
            justifyContent: 'flex-end',
            paddingHorizontal: HeightSize(20),
          },
          style,
        ]}>
        <View
          style={{
            position: 'absolute',
            top: HeightSize(60),
            right: HeightSize(20),
            width: WidthSize(150),
            backgroundColor: 'white',
            borderRadius: 10,
            shadowColor: '#433229',
            shadowOffset: {
              width: 0,
              height: 5,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
          }}>
          {dataDropDown.map((item, index) => {
            return (
              item.id !== currentDropDown.id && (
                <View key={index}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                      paddingHorizontal: HeightSize(10),
                      paddingVertical: HeightSize(10),
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
                      <FastImage
                        source={item.img}
                        style={{
                          width: HeightSize(50),
                          height: HeightSize(50),
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
                </View>
              )
            );
          })}
        </View>
      </Pressable>
      {/* )} */}
    </>
  );
};

export default Cart;

const styles = StyleSheet.create({});
