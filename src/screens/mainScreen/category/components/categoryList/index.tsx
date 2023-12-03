import {View, Text} from 'react-native';
import React from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {HeightSize, WidthSize} from '~/theme/size';
import FastImage from 'react-native-fast-image';
import {images} from '~/assets';
import {TextFont, TextStyle} from '~/theme/textStyle';

const CategoryList = () => {
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
            source={images.category.MenClothing}
          />
          <Text
            style={{
              position: 'absolute',
              left: WidthSize(28),
              color: '#3B3021',
              ...TextStyle.XL,
              ...TextFont.SBold,
            }}>
            Clothing
          </Text>
        </View>

        <View
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
            source={images.category.MenSuits}
          />
          <Text
            style={{
              position: 'absolute',
              left: WidthSize(28),
              color: '#3B3021',
              ...TextStyle.XL,
              ...TextFont.SBold,
            }}>
            Suits
          </Text>
        </View>

        <View
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
            source={images.category.MenAccessories}
          />
          <Text
            style={{
              position: 'absolute',
              left: WidthSize(28),
              color: '#3B3021',
              ...TextStyle.XL,
              ...TextFont.SBold,
            }}>
            Accessories
          </Text>
        </View>
      </View>
    </>
  );
};

export default CategoryList;
