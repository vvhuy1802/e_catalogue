import {FlatList, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {HeightSize, WidthSize, width} from '~/theme/size';
import {images} from '~/assets';
import {TextFont, TextStyle} from '~/theme/textStyle';
import {IconSvg} from '~/components/global/iconSvg';
import PrimaryHeart from '~/components/global/primaryHeart';

const MayULike = () => {
  const dataListItems = [
    {
      id: 1,
      title: 'T-shirt Ahweh Yer',
      type: 'Coats',
      price: '$180',
      image: images.home.ImagePopular,
    },
    {
      id: 2,
      title: 'T-shirt Ahweh Yer',
      type: 'Coats',
      price: '$180',
      image: images.home.ImagePopular,
    },
    {
      id: 3,
      title: 'T-shirt Ahweh Yer',
      type: 'Coats',
      price: '$180',
      image: images.home.ImagePopular,
    },
    {
      id: 4,
      title: 'T-shirt Ahweh Yer',
      type: 'Coats',
      price: '$180',
      image: images.home.ImagePopular,
    },
    {
      id: 5,
      title: 'T-shirt Ahweh Yer',
      type: 'Coats',
      price: '$180',
      image: images.home.ImagePopular,
    },
    {
      id: 6,
      title: 'T-shirt Ahweh Yer',
      type: 'Coats',
      price: '$180',
      image: images.home.ImagePopular,
    },
  ];
  return (
    <View style={{}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          height: HeightSize(134),
        }}>
        <Image
          source={images.category.products.LineLeftPrd}
          style={{
            width: WidthSize(160),
            height: HeightSize(160),
            position: 'absolute',
            left: -WidthSize(90),
          }}
          resizeMode="contain"
        />
        <Text
          style={{
            ...TextFont.GRegular,
            ...TextStyle.XXL,
            color: '#3B3021',
            flex: 1,
            textAlign: 'center',
          }}>
          Maybe you like
        </Text>
        <Image
          source={images.category.products.LineRightPrd}
          style={{
            width: WidthSize(160),
            height: HeightSize(160),
            position: 'absolute',
            right: -WidthSize(90),
          }}
          resizeMode="contain"
        />
      </View>
      <FlatList
        nestedScrollEnabled={true}
        scrollEnabled={false}
        data={dataListItems}
        numColumns={2}
        columnWrapperStyle={{
          gap: WidthSize(16),
        }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          gap: WidthSize(16),
          alignItems: 'center',
        }}
        style={{}}
        renderItem={({item, index}) => {
          return (
            <Pressable
              onPress={() => {
                //   dispatch(SetDirectionBottomBar('down'));
                //   navigation.navigate('ProductDetailScreen', {
                //     productId: item.id.toString(),
                //   });
              }}
              key={index}
              style={{
                width: width / 2 - WidthSize(40),
                borderRadius: 16,
                backgroundColor: '#F1EFE9',
                paddingHorizontal: HeightSize(10),
                paddingTop: HeightSize(10),
              }}>
              <Image
                source={item.image}
                style={{
                  width: width / 2 - WidthSize(60),
                  height: width / 2 - WidthSize(60),
                  alignSelf: 'center',
                  borderRadius: 16,
                }}
                resizeMode="contain"
              />
              <Text
                style={{
                  marginTop: HeightSize(14),
                  color: '#3B3021',
                  ...TextStyle.Base,
                  ...TextFont.SMedium,
                }}>
                {item.title}
              </Text>
              <Text
                style={{
                  color: '#CCCBD3',
                  ...TextStyle.SM,
                  ...TextFont.SMedium,
                }}>
                {item.type}
              </Text>
              <Text
                style={{
                  color: '#3B3021',
                  ...TextStyle.Base,
                  ...TextFont.SBold,
                  marginTop: HeightSize(16),
                  marginBottom: HeightSize(15),
                }}>
                {item.price}
              </Text>
              <PrimaryHeart
                styleView={{
                  position: 'absolute',
                  width: WidthSize(36),
                  height: WidthSize(36),
                  bottom: HeightSize(12),
                  right: HeightSize(16),
                }}
                widthIcon={WidthSize(16)}
                heightIcon={WidthSize(16)}
              />
            </Pressable>
          );
        }}
      />
    </View>
  );
};

export default MayULike;

const styles = StyleSheet.create({});
