import {FlatList, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {HeightSize, WidthSize, width} from '~/theme/size';
import {TextFont, TextStyle} from '~/theme/textStyle';
import {images} from '~/assets';
import PrimaryHeart from '~/components/global/primaryHeart';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {ProductDetailStackParamList} from '~/types';
import axios from 'axios';
import {getUrl} from '~/utils';

type Props = {
  store: StoreResponse;
  currentProduct: string;
};
export type StoreProduct = {
  id: number;
  name: string;
  description: string;
  image: string;
  minPrice: number;
  maxPrice: number;
  category: {
    id: number;
    name: string;
    description: string;
    image: string;
  };
};
export type StoreResponse = {
  id: number;
  name: string;
  description: string;
  address: number;
  logo_image: string;
  cover_image: string;
  approved: boolean;
  products: Array<StoreProduct>;
  followers: [];
};
const Seller = ({store, currentProduct}: Props) => {
  const navigation =
    useNavigation<
      StackNavigationProp<ProductDetailStackParamList, 'ProductDetailScreen'>
    >();

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
        <Pressable
          onPress={() => {
            navigation.navigate('StoreScreen', {
              store: store as StoreResponse,
            });
          }}>
          <Text
            style={{
              ...TextFont.SBold,
              color: '#3B3021',
            }}>
            View info
          </Text>
        </Pressable>
      </View>
      <View style={{marginTop: HeightSize(23), alignItems: 'center'}}>
        <Image
          style={{
            width: WidthSize(80),
            height: WidthSize(80),
            borderRadius: 100,
          }}
          source={getUrl(store?.logo_image || '')}
        />
        <Text
          style={{
            ...TextStyle.XL,
            ...TextFont.SMedium,
            color: '#3B3021',
            marginTop: HeightSize(16),
          }}>
          {store?.name}
        </Text>
        <Text
          style={{
            ...TextFont.SRegular,
            color: '#C3C3C3',
            marginTop: HeightSize(8),
          }}>
          {store?.description}
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
            {store?.products?.length}{' '}
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
            {store?.followers?.length}{' '}
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
          showsHorizontalScrollIndicator={false}
          data={store?.products
            ?.slice(0, 4)
            ?.filter(item => item.id !== parseInt(currentProduct))}
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
                  navigation.push('ProductDetailScreen', {
                    productId: item.id.toString(),
                  });
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
                  source={getUrl(item.image)}
                  style={{
                    width: width / 2 - WidthSize(60),
                    height: width / 2,
                    alignSelf: 'center',
                    borderRadius: 16,
                  }}
                  resizeMode="contain"
                />
                <Text
                  numberOfLines={1}
                  style={{
                    width: width / 2 - WidthSize(60),
                    marginTop: HeightSize(14),
                    color: '#3B3021',
                    ...TextStyle.Base,
                    ...TextFont.SMedium,
                  }}>
                  {item.name}
                </Text>
                <Text
                  style={{
                    color: '#CCCBD3',
                    ...TextStyle.SM,
                    ...TextFont.SMedium,
                  }}>
                  {item.category.name}
                </Text>
                <Text
                  style={{
                    color: '#3B3021',
                    ...TextStyle.Base,
                    ...TextFont.SBold,
                    marginTop: HeightSize(16),
                    marginBottom: HeightSize(15),
                  }}>
                  {item.minPrice}
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
    </View>
  );
};

export default Seller;

const styles = StyleSheet.create({});
