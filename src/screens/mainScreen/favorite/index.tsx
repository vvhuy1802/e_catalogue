import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {SetDirectionBottomBar} from '~/redux/reducers/globalSlice';
import {HeightSize, width, WidthSize} from '~/theme/size';
import {images} from '~/assets';
import ContainerImage from '~/components/global/containerImage';
import Cart from '~/components/global/cart';
import HeaderSearch from '~/components/global/headerSearch';
import {useCart} from '../profile/screens/profile/hooks/useCart';
import {TextStyle, TextFont} from '~/theme/textStyle';
import {AppDispatch} from '~/app/store';
import {getAllCollection} from '~/redux/actions/userInfoAction';
import {
  selectAllCollection,
  selectAllIdea,
  selectAllItem,
} from '~/redux/reducers/userInfo';
import PrimaryHeart from '~/components/global/primaryHeart';
import {getUrl} from '~/utils';
import {productService} from '~/services/service/product.service';
import {useIsFocused, useNavigation} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';
import {CategoryStackParamList, HomeStackParamList} from '~/types';
import {ProductById} from '~/types/product';
import {CATEGORY, PRODUCTDETAILSCREEN} from '~/constants/routeNames';
import {useFavorite} from './hooks/useFavorite';

const Favorite = () => {
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      dispatch(SetDirectionBottomBar('up'));
    }
  }, [isFocused]);
  const {handlePressCart} = useCart();

  const dispatch = useDispatch<AppDispatch>();
  const [currentTab, setCurrentTab] = useState<string>('All items');

  const allCollection = useSelector(selectAllCollection);
  const allItem = useSelector(selectAllItem);
  const allIdea = useSelector(selectAllIdea);
  const [items, setItems] = useState<Array<ProductById>>([]);

  useEffect(() => {
    const getData = async () => {
      await dispatch(getAllCollection());
      allItem.forEach(async item => {
        const dataProduct = (
          await productService.getProductById(Number(item.contentId))
        ).data;
        setItems(prev => [...prev, dataProduct]);
      });
    };
    getData();
  }, []);

  const navigation =
    useNavigation<StackNavigationProp<CategoryStackParamList>>();
  const navi =
    useNavigation<StackNavigationProp<HomeStackParamList, 'Favorite'>>();

  const {removeFavorite} = useFavorite();
  return (
    <ContainerImage
      // isOpacity={true}
      style={{flex: 1}}
      resizeMode="cover"
      source={images.home.BackgroundHome}>
      <Cart onCartPress={handlePressCart} haveDropDownList={false} />
      <HeaderSearch title={'Saved'} haveSearchButton={false} />

      <View
        style={{
          marginTop: HeightSize(32),
          height: HeightSize(30),
        }}>
        <FlatList
          data={['All items', 'All collection', 'Boards']}
          keyExtractor={item => item.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            gap: WidthSize(32),
            paddingHorizontal: WidthSize(32),
          }}
          renderItem={({item, index}) => (
            <Pressable
              onPress={() => {
                setCurrentTab(item);
              }}
              key={index}
              style={{}}>
              <Text
                style={{
                  color: currentTab === item ? '#3B3021' : '#CCCBD3',
                  ...TextStyle.Base,
                  ...TextFont.SBold,
                }}>
                {item}
              </Text>
              {currentTab === item && (
                <View
                  style={{
                    width: WidthSize(28),
                    height: HeightSize(2.5),
                    backgroundColor: '#836E44',
                    borderRadius: 8,
                    position: 'absolute',
                    bottom: 0,
                  }}
                />
              )}
            </Pressable>
          )}
        />
      </View>

      <ScrollView
        style={{
          marginTop: HeightSize(20),
          flex: 1,
          paddingHorizontal: WidthSize(32),
          marginBottom: HeightSize(100),
        }}>
        <View
          style={{
            marginTop: HeightSize(20),
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: WidthSize(16),
          }}>
          {currentTab === 'All items' && (
            <>
              {items.map((dataProduct, index) => {
                let id = dataProduct.id
                  ? allItem.find(
                      item => item.contentId == dataProduct.id.toString(),
                    )?.id
                  : '';
                return (
                  <Pressable
                    onPress={() => {
                      dispatch(SetDirectionBottomBar('down'));
                      navi.navigate('ProductStack', {
                        screen: PRODUCTDETAILSCREEN,
                        params: {
                          productId: dataProduct.id.toString(),
                        },
                      });
                    }}
                    key={index}
                    style={{
                      width: width / 2 - WidthSize(40),
                      borderRadius: 16,
                      backgroundColor: '#F1EFE9',
                      paddingHorizontal: HeightSize(10),
                      paddingTop: HeightSize(10),
                      elevation: 2,
                      shadowColor: '#000',
                      shadowOffset: {
                        width: 0,
                        height: 1,
                      },
                      shadowOpacity: 0.15,
                      shadowRadius: 2.22,
                    }}>
                    <Image
                      source={getUrl(dataProduct.image)}
                      style={{
                        width: width / 2 - WidthSize(60),
                        aspectRatio: 1,
                        height: undefined,
                        alignSelf: 'center',
                        borderRadius: 16,
                      }}
                      resizeMode="cover"
                    />
                    <Text
                      style={{
                        marginTop: HeightSize(14),
                        color: '#3B3021',
                        ...TextStyle.Base,
                        ...TextFont.SMedium,
                      }}>
                      {dataProduct.name}
                    </Text>
                    <Text
                      style={{
                        color: '#CCCBD3',
                        ...TextStyle.SM,
                        ...TextFont.SMedium,
                      }}>
                      {/* {dataProduct?.category.name
                        ? dataProduct?.category.name
                        : 'No type'} */}
                    </Text>
                    <Text
                      style={{
                        color: '#3B3021',
                        ...TextStyle.Base,
                        ...TextFont.SBold,
                        marginTop: HeightSize(16),
                        marginBottom: HeightSize(15),
                      }}>
                      {dataProduct?.minPrice
                        ? '$' + dataProduct?.minPrice
                        : 'No price'}
                    </Text>
                    <PrimaryHeart
                      isLiked={
                        dataProduct.id != undefined
                          ? allItem.find(
                              item =>
                                item.contentId == dataProduct.id.toString(),
                            ) != undefined
                          : false
                      }
                      styleView={{
                        position: 'absolute',
                        width: WidthSize(36),
                        height: WidthSize(36),
                        bottom: HeightSize(12),
                        right: HeightSize(16),
                      }}
                      widthIcon={WidthSize(16)}
                      heightIcon={WidthSize(16)}
                      onPress={async () => {
                        await removeFavorite(id || '');
                      }}
                    />
                  </Pressable>
                );
              })}
            </>
          )}

          {currentTab === 'All collection' && (
            <>
              {items.map((dataProduct, index) => {
                let id = dataProduct.id
                  ? allItem.find(
                      item => item.contentId == dataProduct.id.toString(),
                    )?.id
                  : '';
                return (
                  <Pressable
                    onPress={() => {
                      dispatch(SetDirectionBottomBar('down'));
                      navi.navigate('ProductStack', {
                        screen: PRODUCTDETAILSCREEN,
                        params: {
                          productId: dataProduct.id.toString(),
                        },
                      });
                    }}
                    key={index}
                    style={{
                      width: width / 2 - WidthSize(40),
                      borderRadius: 16,
                      backgroundColor: '#F1EFE9',
                      paddingHorizontal: HeightSize(10),
                      paddingTop: HeightSize(10),
                      elevation: 2,
                      shadowColor: '#000',
                      shadowOffset: {
                        width: 0,
                        height: 1,
                      },
                      shadowOpacity: 0.15,
                      shadowRadius: 2.22,
                    }}>
                    <Image
                      source={getUrl(dataProduct.image)}
                      style={{
                        width: width / 2 - WidthSize(60),
                        aspectRatio: 1,
                        height: undefined,
                        alignSelf: 'center',
                        borderRadius: 16,
                      }}
                      resizeMode="cover"
                    />
                    <Text
                      style={{
                        marginTop: HeightSize(14),
                        color: '#3B3021',
                        ...TextStyle.Base,
                        ...TextFont.SMedium,
                      }}>
                      {dataProduct.name}
                    </Text>
                    <Text
                      style={{
                        color: '#CCCBD3',
                        ...TextStyle.SM,
                        ...TextFont.SMedium,
                      }}>
                      {/* {dataProduct?.category.name
                        ? dataProduct?.category.name
                        : 'No type'} */}
                    </Text>
                    <Text
                      style={{
                        color: '#3B3021',
                        ...TextStyle.Base,
                        ...TextFont.SBold,
                        marginTop: HeightSize(16),
                        marginBottom: HeightSize(15),
                      }}>
                      {dataProduct?.minPrice
                        ? '$' + dataProduct?.minPrice
                        : 'No price'}
                    </Text>
                    <PrimaryHeart
                      isLiked={
                        dataProduct.id != undefined
                          ? allItem.find(
                              item =>
                                item.contentId == dataProduct.id.toString(),
                            ) != undefined
                          : false
                      }
                      styleView={{
                        position: 'absolute',
                        width: WidthSize(36),
                        height: WidthSize(36),
                        bottom: HeightSize(12),
                        right: HeightSize(16),
                      }}
                      widthIcon={WidthSize(16)}
                      heightIcon={WidthSize(16)}
                      onPress={async () => {
                        await removeFavorite(id || '');
                      }}
                    />
                  </Pressable>
                );
              })}
            </>
          )}
        </View>
      </ScrollView>
    </ContainerImage>
  );
};

export default Favorite;

const styles = StyleSheet.create({});
