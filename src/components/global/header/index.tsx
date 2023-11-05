import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {HeightSize, WidthSize} from '~/theme/size';
import LottieView from 'lottie-react-native';
import {animations} from '~/assets';

const Header = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        height: HeightSize(56),
      }}>
      <View
        style={{
          width: WidthSize(50),
          height: WidthSize(50),
        }}>
        <LottieView
          source={animations.Splash}
          autoPlay={true}
          loop={false}
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      </View>
      <Text
        style={{
          fontSize: WidthSize(15),
          marginLeft: WidthSize(10),
          color: 'blue',
          fontWeight: 'bold',
          zIndex: 1,
        }}>
        E-Catalogue
      </Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({});
