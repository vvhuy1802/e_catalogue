import {ImageBackground, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {images} from '~/assets';
import BlurBackground from '~/components/global/blurBackground';
import {HeightSize, WidthSize} from '~/theme/size';
import {TextStyle, TextFont} from '~/theme/textStyle';
import FastImage from 'react-native-fast-image';
import {useDispatch, useSelector} from 'react-redux';
import {selectAllCategories} from '~/redux/reducers/productSlice';
import {AppDispatch} from '~/app/store';
import {
  SetDirectionBottomBar,
  selectCurrentDropDown,
} from '~/redux/reducers/globalSlice';
import {ProductCategoryResponse} from '~/types/product';
import {getUrl} from '~/utils';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {CategoryStackParamList, HomeStackParamList} from '~/types';
import {DETAILCATEGORYSCREEN} from '~/constants/routeNames';

const PopularSearch = () => {
  const navigation = useNavigation<StackNavigationProp<HomeStackParamList>>();
  const dispatch = useDispatch<AppDispatch>();
  const categories = useSelector(selectAllCategories);
  const currentDropDown = useSelector(selectCurrentDropDown);
  const [currentCategory, setCurrentCategory] =
    useState<ProductCategoryResponse>();
  useEffect(() => {
    setCurrentCategory(undefined);
    categories.map(item => {
      if (item.name === currentDropDown.title) {
        setCurrentCategory(item);
      }
    });
  }, [currentDropDown]);
  const handleNavigate = (category: ProductCategoryResponse) => {
    dispatch(SetDirectionBottomBar('down'));
    navigation.navigate('Category', {
      screen: 'DetailCategoryScreen',
      params: {
        category: category,
      },
    });
  };
  return (
    <>
      <View
        style={{
          marginTop: HeightSize(40),
        }}>
        <Text
          style={{
            color: '#3B3021',
            ...TextStyle.XL,
            ...TextFont.SBold,
          }}>
          Category
        </Text>

        <View
          style={{
            marginTop: HeightSize(28),
          }}>
          {currentCategory?.children.map((item, index) => {
            return (
              <Pressable
                onPress={() => handleNavigate(item)}
                key={item.id}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  overflow: 'hidden',
                  height: HeightSize(110),
                  backgroundColor: '#F0EFE9',
                  borderRadius: WidthSize(20),
                  marginBottom: HeightSize(20),
                }}>
                <FastImage
                  style={{
                    width: WidthSize(110),
                    height: '100%',
                    alignSelf: 'flex-end',
                    position: 'absolute',
                    right: 0,
                    bottom: 0,
                  }}
                  resizeMode="contain"
                  source={getUrl(item.image) as any}
                />
                <Text
                  style={{
                    position: 'absolute',
                    left: WidthSize(28),
                    color: '#3B3021',
                    ...TextStyle.XL,
                    ...TextFont.SBold,
                  }}>
                  {item.name}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>
    </>
  );
};

export default PopularSearch;

const styles = StyleSheet.create({});
