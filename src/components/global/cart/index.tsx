import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import React from 'react';
import {HeightSize} from '~/theme/size';
import {IconSvg} from '../iconSvg';
import {TextFont, TextStyle} from '~/theme/textStyle';

type Props = {
  style?: StyleProp<ViewStyle>;
};
const Card = ({style}: Props) => {
  return (
    <View
      style={[
        {
          marginTop: HeightSize(5),
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          height: HeightSize(30),
          paddingHorizontal: HeightSize(20),
        },
        style,
      ]}>
      <View
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
          Men
        </Text>
      </View>
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
  );
};

export default Card;

const styles = StyleSheet.create({});
