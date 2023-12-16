import {Image, Pressable, Text, View} from 'react-native';
import React from 'react';
import {IconSvg} from '~/components/global/iconSvg';
import {WidthSize, HeightSize} from '~/theme/size';
import {TextStyle, TextFont} from '~/theme/textStyle';
import {
  SetDirectionBottomBar,
  selectCurrentDropDown,
} from '~/redux/reducers/globalSlice';
import {useDispatch, useSelector} from 'react-redux';
import {HomeStackParamList} from '~/types';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {AppDispatch} from '~/app/store';

type DropDownProps = {
  setIsShow: (isShow: boolean) => void;
};
const DropDown = ({setIsShow}: DropDownProps) => {
  const currentDropDown = useSelector(selectCurrentDropDown);
  const navigationCategory =
    useNavigation<StackNavigationProp<HomeStackParamList>>();
  const dispatch = useDispatch<AppDispatch>();
  return (
    <View
      style={{
        width: '100%',
        height: HeightSize(80),
        marginTop: HeightSize(28),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: WidthSize(32),
        paddingRight: WidthSize(24),
      }}>
      <Pressable onPress={() => setIsShow(true)}>
        <View
          style={{
            width: HeightSize(160),
            height: HeightSize(80),
            backgroundColor: '#F0EEE8',
            borderRadius: 40,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: HeightSize(8),
          }}>
          <Image
            source={currentDropDown.img}
            style={{
              width: HeightSize(64),
              height: HeightSize(64),
              borderRadius: 40,
            }}
          />
          <View
            style={{
              width: HeightSize(64),
              height: HeightSize(64),
              borderRadius: 40,
              backgroundColor: 'white',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <IconSvg
              icon="IconDropDown"
              width={HeightSize(32)}
              height={HeightSize(32)}
            />
          </View>
        </View>
      </Pressable>

      <Pressable
        onPress={() => {
          dispatch(SetDirectionBottomBar('down'));
          navigationCategory.navigate('OrderStack', {
            screen: 'MyBag',
          });
        }}
        style={{
          width: HeightSize(76),
          height: HeightSize(76),
          borderRadius: 40,
          backgroundColor: '#F1EFE9',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <IconSvg icon="IconBagBlack" />

        <View
          style={{
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
            width: WidthSize(16),
            height: WidthSize(16),
            borderRadius: 100,
            backgroundColor: '#433229',
            borderWidth: 2,
            borderColor: 'F9F6E8',
            top: HeightSize(15),
            right: HeightSize(20),
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
      </Pressable>
    </View>
  );
};

export default DropDown;
