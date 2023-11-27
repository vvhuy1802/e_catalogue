import {FlatList, ImageBackground, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {HeightSize, WidthSize} from '~/theme/size';
import {images} from '~/assets';
import BlurBackground from '~/components/global/blurBackground';
import {TextFont, TextStyle} from '~/theme/textStyle';

const CardCategorySlide = () => {
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
    <View
      style={{
        marginTop: HeightSize(30),
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: WidthSize(30),
        }}>
        <Text
          style={{
            color: '#3B3021',
            ...TextStyle.XXXL,
            ...TextFont.GRegular,
          }}>
          Category
        </Text>
      </View>
      <FlatList
        style={{
          marginTop: HeightSize(20),
          paddingRight: HeightSize(20),
        }}
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: WidthSize(30),
          gap: WidthSize(20),
        }}
        renderItem={({item}) => (
          <ImageBackground
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
        )}
      />
    </View>
  );
};

export default CardCategorySlide;
