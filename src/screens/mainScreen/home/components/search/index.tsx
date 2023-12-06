import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {IconSvg} from '~/components/global/iconSvg';
import {HeightSize, WidthSize} from '~/theme/size';
import {TextStyle, TextFont} from '~/theme/textStyle';

type Props = {
  title?: string;
};
const SearchHomeScreen = ({title = 'Find the one \nyou prefer.'}: Props) => {
  return (
    <View
      style={{
        marginTop: HeightSize(30),
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingLeft: WidthSize(30),
      }}>
      <Text
        style={{
          ...TextStyle.text4XL,
          ...TextFont.GRegular,
          color: '#3B3021',
        }}>
        {title}
      </Text>
      <View
        style={{
          width: WidthSize(100),
          height: WidthSize(80),
          borderTopLeftRadius: WidthSize(36),
          borderBottomLeftRadius: WidthSize(36),
          backgroundColor: '#EFEFE8',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <IconSvg
          icon="IconSearchBrown"
          width={WidthSize(28)}
          height={WidthSize(28)}
        />
      </View>
    </View>
  );
};

export default SearchHomeScreen;

const styles = StyleSheet.create({});
