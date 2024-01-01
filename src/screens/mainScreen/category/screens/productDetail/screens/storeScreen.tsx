import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useContext, useEffect} from 'react';
import {images} from '~/assets';
import ContainerImage from '~/components/global/containerImage';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {ProductDetailStackParamList} from '~/types';
import {HeightSize, WidthSize, width} from '~/theme/size';
import {TextFont, TextStyle} from '~/theme/textStyle';
import PrimaryHeart from '~/components/global/primaryHeart';
import {IconSvg} from '~/components/global/iconSvg';
import {getUrl} from '~/utils';
import axios from 'axios';
import Config from '~/config';
import {userInfoService} from '~/services/service/userInfo.service';
import {StoreResponse} from '../../../components/productDetail/Seller';
import {ProductStackContext} from '~/utils/context';

type Props = {
  route: RouteProp<ProductDetailStackParamList, 'StoreScreen'>;
};

const StoreScreen = ({route}: Props) => {
  const navigation =
    useNavigation<
      StackNavigationProp<ProductDetailStackParamList, 'StoreScreen'>
    >();
  const onGoBack = () => {
    navigation.goBack();
  };
  const {store, setStore} = useContext(ProductStackContext);

  const [isFollow, setIsFollow] = React.useState(false);
  useEffect(() => {
    axios
      .get(`${Config.API_URL}/user-info/store/follow?storeId=${store.id}`)
      .then(
        (res: {
          data: Array<{
            storeId: number;
            userId: number;
          }>;
        }) => {
          res.data.map(item => {
            if (item.storeId === store.id) setIsFollow(true);
          });
        },
      );
  }, []);

  // useEffect(() => {
  //   axios
  //     .get(
  //       `https://e-catalogue.abcdavid.top/product/store?id=${route.params.store.id}}`,
  //     )
  //     .then(res => {
  //       setStore(res.data);
  //     });
  // }, [isFollow]);

  const handleFollow = (follow: boolean) => {
    userInfoService
      .followStore({
        storeId: store.id,
        follow: follow,
      })
      .then(res => {
        axios
          .get(
            `https://e-catalogue.abcdavid.top/product/store?id=${route.params.store.id}}`,
          )
          .then(res => {
            setStore(res.data);
          });
      });
  };

  return (
    <ContainerImage
      // isOpacity={true}
      style={{flex: 1}}
      resizeMode="cover"
      source={images.home.BackgroundHome}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingRight: HeightSize(20),
        }}>
        <Pressable
          onPress={onGoBack}
          style={{
            width: HeightSize(80),
            height: HeightSize(50),
            borderTopRightRadius: 36,
            borderBottomRightRadius: 36,
            backgroundColor: '#EFEFE8',
            marginTop: HeightSize(3),
            justifyContent: 'center',
            paddingLeft: HeightSize(20),
            zIndex: 99,
          }}>
          <IconSvg
            icon="IconArrowLeftBlack"
            width={HeightSize(32)}
            height={HeightSize(32)}
          />
        </Pressable>
        <Pressable
          style={{
            width: HeightSize(50),
            height: HeightSize(50),
            backgroundColor: '#EFEFE8',
            borderRadius: 36,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {isFollow ? (
            <IconSvg
              onPress={() => {
                handleFollow(false);
                setIsFollow(false);
              }}
              icon="IconFollowedBrown"
            />
          ) : (
            <IconSvg
              onPress={() => {
                handleFollow(true);
                setIsFollow(true);
              }}
              icon="IconFollowBrown"
            />
          )}
        </Pressable>
      </View>
      <ScrollView
        style={{
          marginTop: HeightSize(10),
        }}
        showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
          }}>
          <Image
            style={{
              width: HeightSize(150),
              height: HeightSize(150),
              borderRadius: 100,
              alignSelf: 'center',
            }}
            source={getUrl(store.logo_image)}
          />
          <View
            style={{
              alignItems: 'center',
              marginTop: HeightSize(20),
            }}>
            <Text
              numberOfLines={1}
              style={{
                ...TextFont.GRegular,
                ...TextStyle.text4XL,
                width: width - HeightSize(100),
                textAlign: 'center',
              }}>
              {store.name}
            </Text>
          </View>
          <View
            style={{
              marginTop: HeightSize(20),
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>
            <View
              style={{
                alignItems: 'center',
              }}>
              <Text
                style={{
                  ...TextFont.GRegular,
                  ...TextStyle.XXL,
                  color: '#3B3021',
                }}>
                5.0
              </Text>
              <Text
                style={{
                  ...TextFont.SRegular,
                  ...TextStyle.Base,
                  color: '#3B3021',
                }}>
                Reviews
              </Text>
            </View>
            <View
              style={{
                alignItems: 'center',
              }}>
              <Text
                style={{
                  ...TextFont.GRegular,
                  ...TextStyle.XXL,
                  color: '#3B3021',
                }}>
                {store.products.length}
              </Text>
              <Text
                style={{
                  ...TextFont.SRegular,
                  ...TextStyle.Base,
                  color: '#3B3021',
                }}>
                Product
              </Text>
            </View>
            <View
              style={{
                alignItems: 'center',
              }}>
              <Text
                style={{
                  ...TextFont.GRegular,
                  ...TextStyle.XXL,
                  color: '#3B3021',
                }}>
                {store.followers.length}
              </Text>
              <Text
                style={{
                  ...TextFont.SRegular,
                  ...TextStyle.Base,
                  color: '#3B3021',
                }}>
                Followers
              </Text>
            </View>
          </View>

          <View
            style={{
              paddingHorizontal: HeightSize(16),
              marginTop: HeightSize(20),
            }}>
            <Text
              style={{
                ...TextFont.SRegular,
                ...TextStyle.SM,
                color: '#3B3021',
                marginTop: HeightSize(10),
                textAlign: 'center',
                paddingHorizontal: HeightSize(50),
              }}>
              {store.description}
            </Text>

            <View
              style={{
                marginTop: HeightSize(40),
              }}>
              <FlatList
                nestedScrollEnabled={true}
                scrollEnabled={false}
                data={store.products}
                numColumns={2}
                columnWrapperStyle={{
                  gap: WidthSize(16),
                }}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  gap: WidthSize(16),
                }}
                style={{
                  alignSelf: 'center',
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
                        {item.name}
                      </Text>
                      <Text
                        numberOfLines={1}
                        style={{
                          color: '#CCCBD3',
                          ...TextStyle.SM,
                          ...TextFont.SMedium,
                          width: width / 2 - WidthSize(96),
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
        </View>
      </ScrollView>
    </ContainerImage>
  );
};

export default StoreScreen;

const styles = StyleSheet.create({});
