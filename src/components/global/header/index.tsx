import {Text, View, Image} from 'react-native';
import React from 'react';
import {HeightSize, WidthSize} from '~/theme/size';
import {TextStyle, TextFont} from '~/theme/textStyle';
import {images} from '~/assets';

const Header = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'flex-end',
        height: HeightSize(56),
      }}>
      <Image
        source={images.global.AppLogo}
        style={{
          width: WidthSize(50),
          height: WidthSize(50),
        }}
      />
      <Text
        style={{
          marginLeft: WidthSize(10),
          color: '#3B3021',
          ...TextStyle.XL,
          ...TextFont.SBold,
          zIndex: 1,
        }}>
        NewStyle
      </Text>
    </View>
  );
};

export default Header;
