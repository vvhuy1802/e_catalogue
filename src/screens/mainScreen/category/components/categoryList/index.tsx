import {View, Text, Pressable} from 'react-native';
import React from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {HeightSize, WidthSize} from '~/theme/size';
import FastImage from 'react-native-fast-image';
import {images} from '~/assets';
import {TextFont, TextStyle} from '~/theme/textStyle';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {CategoryStackParamList} from '~/types';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '~/app/store';
import {SetDirectionBottomBar} from '~/redux/reducers/globalSlice';

const CategoryList = () => {
  const navigation =
    useNavigation<StackNavigationProp<CategoryStackParamList>>();
  const dispatch = useDispatch<AppDispatch>();
  const dataList = [
    {
      id: 1,
      name: 'Clothing',
      img: images.category.MenClothing,
    },
    {
      id: 2,
      name: 'Suits',
      img: images.category.MenSuits,
    },
    {
      id: 3,
      name: 'Accessories',
      img: images.category.MenAccessories,
    },
  ];
  const handleNavigate = (categoryId: string) => {
    dispatch(SetDirectionBottomBar('down'));
    navigation.navigate('DetailCategoryScreen', {
      categoryId: categoryId,
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
          {dataList.map((item, index) => {
            return (
              <Pressable
                onPress={() => handleNavigate(item.name)}
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
                  source={item.img}
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
