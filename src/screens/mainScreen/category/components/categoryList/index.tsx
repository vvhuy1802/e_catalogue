import {View, Text, Pressable, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {HeightSize, WidthSize} from '~/theme/size';
import FastImage from 'react-native-fast-image';
import {images} from '~/assets';
import {TextFont, TextStyle} from '~/theme/textStyle';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {CategoryStackParamList} from '~/types';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch} from '~/app/store';
import {
  SetDirectionBottomBar,
  selectCurrentDropDown,
} from '~/redux/reducers/globalSlice';
import {selectAllCategories} from '~/redux/reducers/productSlice';
import {ProductCategoryResponse} from '~/types/product';
import {getUrl} from '~/utils';
import {getProductsByCategory} from '~/redux/actions/productAction';

const CategoryList = () => {
  const navigation =
    useNavigation<StackNavigationProp<CategoryStackParamList>>();
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
    dispatch(getProductsByCategory(category.id));
    navigation.navigate('DetailCategoryScreen', {
      category: category,
    });
  };
  return (
    <>
      <View
        style={{
          height: '100%',
          marginHorizontal: WidthSize(32),
          marginTop: HeightSize(28),
        }}>
        <View
          style={{
            justifyContent: 'center',
            height: HeightSize(110),
            marginBottom: HeightSize(28),
            borderRadius: WidthSize(20),
          }}>
          <FastImage
            style={{flex: 1}}
            resizeMode="cover"
            source={images.category.CategoryMenNew}
          />
          <Text
            style={{
              position: 'absolute',
              left: WidthSize(28),
              color: 'white',
              ...TextStyle.XL,
              ...TextFont.SBold,
            }}>
            New now
          </Text>
        </View>

        <View
          style={{
            marginTop: HeightSize(28),
          }}>
          {currentCategory?.children.map((item, index) => {
            return (
              <Pressable
                onPress={() => handleNavigate(item)}
                key={index}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  overflow: 'hidden',
                  height: HeightSize(110),
                  backgroundColor: '#F0EFE9',
                  borderRadius: WidthSize(20),
                  marginBottom: HeightSize(20),
                }}>
                <Image
                  style={{
                    width: WidthSize(110),
                    height: '100%',
                    alignSelf: 'flex-end',
                    position: 'absolute',
                    right: 0,
                    bottom: 0,
                  }}
                  resizeMode="contain"
                  source={getUrl(item.image)}
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

export default CategoryList;
