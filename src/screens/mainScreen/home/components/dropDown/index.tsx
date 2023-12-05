import {Image, Pressable, Text, View} from 'react-native';
import React from 'react';
import {IconSvg} from '~/components/global/iconSvg';
import {WidthSize, HeightSize} from '~/theme/size';
import {TextStyle, TextFont} from '~/theme/textStyle';
import {images} from '~/assets';
import {selectCurrentDropDown} from '~/redux/reducers/globalSlice';
import {useSelector} from 'react-redux';

type DropDownProps = {
  setIsShow: (isShow: boolean) => void;
};
const DropDown = ({setIsShow}: DropDownProps) => {
  const currentDropDown = useSelector(selectCurrentDropDown);

  return (
    <>
      <Pressable
        onPress={() => setIsShow(true)}
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

        <View
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
              top: HeightSize(17),
              right: WidthSize(15),
              width: WidthSize(16),
              height: WidthSize(16),
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
                  ...TextStyle.XS,
                  ...TextFont.SLight,
                }}>
                2
              </Text>
            </View>
          </View>
        </View>
      </Pressable>
    </>
  );
};

export default DropDown;
