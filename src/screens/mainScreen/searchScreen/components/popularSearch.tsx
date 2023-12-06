import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {images} from '~/assets';
import BlurBackground from '~/components/global/blurBackground';
import {HeightSize, WidthSize} from '~/theme/size';
import {TextStyle, TextFont} from '~/theme/textStyle';

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
  const data = [
    {
      id: 1,
      img: images.home.CategoryMen,
      title: `Men's`,
    },
    {
      id: 2,
      img: images.home.CategoryWomen,

      title: `Women's`,
    },
    {
      id: 3,
      img: images.home.CategoryKids,

      title: `Kids`,
    },
    {
      id: 4,
      img: images.home.CategoryUniSex,
      title: `Unisex`,
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
          Categories
        </Text>
        <View
          style={{
            marginTop: HeightSize(16),
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'flex-start',
            gap: WidthSize(16),
          }}>
          {data.map((item, index) => {
            return (
              <ImageBackground
                key={index}
                source={item.img}
                imageStyle={{borderRadius: 20}}
                style={{
                  width: WidthSize(150),
                  height: WidthSize(200),
                  justifyContent: 'flex-end',
                }}>
                <View
                  style={{
                    height: HeightSize(44),
                    width: WidthSize(150),
                    justifyContent: 'center',
                    backgroundColor: '#D8D2C414',
                  }}>
                  <BlurBackground
                    // blurType="light"
                    blurAmount={15}
                    style={{
                      borderBottomLeftRadius: 20,
                      borderBottomRightRadius: 20,
                    }}
                  />
                  <Text
                    style={{
                      color: '#3B3021',
                      marginLeft: WidthSize(16),
                      ...TextFont.SMedium,
                      ...TextStyle.LG,
                    }}>
                    {item.title}
                  </Text>
                </View>
              </ImageBackground>
            );
          })}
        </View>
      </View>
    </>
  );
};

export default PopularSearch;

const styles = StyleSheet.create({});
