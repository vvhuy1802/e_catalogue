import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {images} from '~/assets';
import BlurBackground from '~/components/global/blurBackground';
import {HeightSize, WidthSize} from '~/theme/size';
import {TextStyle, TextFont} from '~/theme/textStyle';
import FastImage from 'react-native-fast-image';

const PopularSearch = () => {
  const temp = [
    {
      id: 1,
      title: 'Bucket hat',
    },
    {
      id: 2,
      title: 'Loafers',
    },
    {
      id: 3,
      title: 'Shacket',
    },
    {
      id: 4,
      title: 'Low-Rise Jeans',
    },
    {
      id: 5,
      title: 'Wide-Leg Pants',
    },
  ];
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
          Popular searches
        </Text>
        <View
          style={{
            marginTop: HeightSize(16),
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'flex-start',
            gap: WidthSize(16),
          }}>
          {temp.map((item, index) => {
            return (
              <View
                key={index}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: '#EFEFE8',
                  borderRadius: 12,
                }}>
                <Text
                  style={{
                    ...TextStyle.Base,
                    ...TextFont.SRegular,
                    color: '#3B3021',
                    paddingVertical: HeightSize(12),
                    paddingHorizontal: WidthSize(20),
                  }}>
                  {item.title}
                </Text>
              </View>
            );
          })}
        </View>
      </View>
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
          {dataList.map((item, index) => {
            return (
              <View
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
              </View>
            );
          })}
        </View>
      </View>
    </>
  );
};

export default PopularSearch;

const styles = StyleSheet.create({});
