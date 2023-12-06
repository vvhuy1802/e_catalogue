import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {IconSvg} from '~/components/global/iconSvg';
import {HeightSize, WidthSize} from '~/theme/size';
import {TextStyle, TextFont} from '~/theme/textStyle';

type HeaderSearchProps = {
  title: string;
  onPress: () => void;
};

const HeaderSearch: React.FC<HeaderSearchProps> = ({title, onPress}) => {
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
      <Pressable
        onPress={onPress}
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
      </Pressable>
    </View>
  );
};

export default HeaderSearch;

const styles = StyleSheet.create({});
