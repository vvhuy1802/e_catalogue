import {FlatList, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {HeightSize, WidthSize, width} from '~/theme/size';
import {TextFont, TextStyle} from '~/theme/textStyle';
import {images} from '~/assets';
import {IconSvg} from '~/components/global/iconSvg';

const Seller = () => {
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
    {
      id: 7,
      title: 'T-shirt Ahweh Yer',
      type: 'Coats',
      price: '$180',
      image: images.home.ImagePopular,
    },
  ];
  return (
    <View
      style={{
        marginTop: HeightSize(32),
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            ...TextFont.GRegular,
            ...TextStyle.text3_5XL,
            color: '#3B3021',
          }}>
          Sellers
        </Text>
        <Text
          style={{
            ...TextFont.SBold,
            color: '#3B3021',
          }}>
          View info
        </Text>
      </View>
      <View style={{marginTop: HeightSize(23), alignItems: 'center'}}>
        <Image
          style={{
            width: WidthSize(80),
            height: WidthSize(80),
            borderRadius: 100,
          }}
          source={images.home.CategoryMen}
        />
        <Text
          style={{
            ...TextStyle.XL,
            ...TextFont.SMedium,
            color: '#3B3021',
            marginTop: HeightSize(16),
          }}>
          Ahweh Yerth
        </Text>
        <Text
          style={{
            ...TextFont.SRegular,
            color: '#C3C3C3',
            marginTop: HeightSize(8),
          }}>
          Las Vegas Neveda
        </Text>
        <View
          style={{
            flexDirection: 'row',
            marginTop: HeightSize(22),
            gap: WidthSize(20),
          }}>
          <Text
            style={{
              ...TextFont.SRegular,
              color: '#836E44',
            }}>
            4.9{' '}
            <Text
              style={{
                ...TextStyle.SM,
                color: '#3B3021',
              }}>
              Reviews
            </Text>
          </Text>
          <Text
            style={{
              ...TextFont.SRegular,
              color: '#836E44',
            }}>
            200{' '}
            <Text
              style={{
                ...TextStyle.SM,
                color: '#3B3021',
              }}>
              Products
            </Text>
          </Text>
          <Text
            style={{
              ...TextFont.SRegular,
              color: '#836E44',
            }}>
            1.5M{' '}
            <Text
              style={{
                ...TextStyle.SM,
                color: '#3B3021',
              }}>
              Followers
            </Text>
          </Text>
        </View>
      </View>
      <View
        style={{
          marginTop: HeightSize(26),
        }}>
        <Text
          style={{
            ...TextFont.GRegular,
            ...TextStyle.XXL,
            color: '#3B3021',
          }}>
          Other product of Shop
        </Text>

        <FlatList
          data={dataListItems}
          nestedScrollEnabled={true}
          horizontal={true}
          contentContainerStyle={{
            gap: WidthSize(16),
          }}
          style={{
            marginTop: HeightSize(20),
          }}
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
                <View
                  style={{
                    position: 'absolute',
                    backgroundColor: 'white',
                    borderRadius: 100,
                    width: WidthSize(36),
                    height: WidthSize(36),
                    bottom: HeightSize(12),
                    right: HeightSize(16),
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <IconSvg
                    icon="IconHeartGray"
                    width={WidthSize(16)}
                    height={WidthSize(16)}
                  />
                </View>
              </Pressable>
            );
          }}
        />
      </View>
    </View>
  );
};

export default Seller;

const styles = StyleSheet.create({});
