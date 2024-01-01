import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {HeightSize, WidthSize} from '~/theme/size';
import {TextFont, TextStyle} from '~/theme/textStyle';
import {IconSvg} from '../iconSvg';
import {useNavigation} from '@react-navigation/native';

type HeaderAdminProps = {
  title?: string;
};
const HeaderAdmin = ({title}: HeaderAdminProps) => {
  const navigation = useNavigation<any>();
  return (
    <View
      style={{
        width: '100%',
        height: HeightSize(56),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <IconSvg
        onPress={() => {
          navigation.openDrawer();
        }}
        style={{
          marginLeft: WidthSize(16),
        }}
        icon="IconMenuBrown"
      />
      <View
        style={{
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          zIndex: -1,
        }}>
        <Text
          style={{
            ...TextFont.GRegular,
            ...TextStyle.text4XL,
          }}>
          {title}
        </Text>
      </View>
    </View>
  );
};

export default HeaderAdmin;

const styles = StyleSheet.create({});
