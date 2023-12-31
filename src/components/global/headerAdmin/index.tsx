import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {HeightSize} from '~/theme/size';
import {TextFont, TextStyle} from '~/theme/textStyle';

type HeaderAdminProps = {
  title?: string;
};
const HeaderAdmin = ({title}: HeaderAdminProps) => {
  return (
    <View
      style={{
        width: '100%',
        height: HeightSize(56),
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text
        style={{
          ...TextFont.GRegular,
          ...TextStyle.text4XL,
        }}>
        {title}
      </Text>
    </View>
  );
};

export default HeaderAdmin;

const styles = StyleSheet.create({});
