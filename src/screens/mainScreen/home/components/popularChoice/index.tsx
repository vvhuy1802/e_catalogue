import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {HeightSize, WidthSize} from '~/theme/size';
import {Icon} from 'react-native-paper';
import {IconSvg} from '~/components/global/iconSvg';
import {TextFont, TextStyle} from '~/theme/textStyle';
import {images} from '~/assets';
import PrimaryHeart from '~/components/global/primaryHeart';
import axios from 'axios';
import {getUrl} from '~/utils';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {PRODUCTSTACK} from '~/constants/routeNames';
import {HomeStackParamList} from '~/types';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '~/app/store';
import {SetDirectionBottomBar} from '~/redux/reducers/globalSlice';

type PopularChoiceProps = {
  data: any;
};
const PopularChoice = ({data}: PopularChoiceProps) => {
  const navigation =
    useNavigation<StackNavigationProp<HomeStackParamList, 'OrderStack'>>();
  const dispatch = useDispatch<AppDispatch>();
  return (
    <View
      style={{
        marginTop: HeightSize(50),
        paddingLeft: WidthSize(30),
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            color: '#3B3021',
            ...TextStyle.XXXL,
            ...TextFont.GRegular,
          }}>
          Popular choice
        </Text>
      </View>
      <View
        style={{
          marginTop: HeightSize(20),
          paddingRight: WidthSize(30),
          gap: HeightSize(20),
        }}>
        {data?.map((item: any, index: number) => {
          return (
            <Pressable
              onPress={() => {
                dispatch(SetDirectionBottomBar('down'));
                navigation.navigate('Category', {
                  screen: PRODUCTSTACK,
                  params: {
                    screen: 'ProductDetailScreen',
                    params: {
                      productId: item.id.toString(),
                      isShowBottomBarWhenBack: 'yes',
                    },
                  },
                });
              }}
              key={index}
              style={{
                width: '100%',
                height: HeightSize(110),
                padding: WidthSize(10),
                backgroundColor: '#F0EFE9',
                flexDirection: 'row',
                alignItems: 'center',
                borderRadius: 20,
              }}>
              <Image
                source={getUrl(item?.img)}
                style={{
                  width: HeightSize(90),
                  height: HeightSize(90),
                  borderRadius: 20,
                }}
              />
              <View
                style={{
                  marginLeft: WidthSize(20),
                  justifyContent: 'space-between',
                  flex: 1,
                  height: '100%',
                  marginRight: WidthSize(10),
                }}>
                <View>
                  <Text
                    style={{
                      ...TextStyle.Base,
                      ...TextFont.SMedium,
                      color: '#3B3021',
                    }}>
                    {item?.title || ''}
                  </Text>
                  <Text
                    style={{
                      ...TextStyle.SM,
                      ...TextFont.SMedium,
                      color: '#CCCCD0',
                    }}>
                    {item?.category || ''}
                  </Text>
                </View>
                <Text
                  style={{
                    ...TextStyle.Base,
                    ...TextFont.SBold,
                    color: '#3B3021',
                  }}>
                  ${item?.price || ''}
                </Text>
              </View>
              <PrimaryHeart />
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

export default PopularChoice;

const styles = StyleSheet.create({});
