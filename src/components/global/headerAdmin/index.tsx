import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {HeightSize, WidthSize} from '~/theme/size';
import {TextFont, TextStyle} from '~/theme/textStyle';
import {IconSvg} from '../iconSvg';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '~/app/store';
import {SetDirectionBottomBar} from '~/redux/reducers/globalSlice';

type HeaderAdminProps = {
  title?: string;
  isShow?: boolean;
};
const HeaderAdmin = ({title, isShow = true}: HeaderAdminProps) => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch<AppDispatch>();

  return (
    <View
      style={{
        width: '100%',
        height: HeightSize(56),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      {isShow ? (
        <IconSvg
          onPress={() => {
            navigation.openDrawer();
          }}
          style={{
            marginLeft: WidthSize(16),
          }}
          icon="IconMenuBrown"
        />
      ) : (
        <Pressable
          onPress={() => {
            dispatch(SetDirectionBottomBar('up'));
            navigation.goBack();
          }}
          style={{
            width: HeightSize(80),
            height: HeightSize(50),
            borderTopRightRadius: 36,
            borderBottomRightRadius: 36,
            backgroundColor: '#EFEFE8',
            marginTop: HeightSize(3),
            justifyContent: 'center',
            paddingLeft: HeightSize(20),
            zIndex: 99,
          }}>
          <IconSvg
            icon="IconArrowLeftBlack"
            width={HeightSize(32)}
            height={HeightSize(32)}
          />
        </Pressable>
      )}
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
