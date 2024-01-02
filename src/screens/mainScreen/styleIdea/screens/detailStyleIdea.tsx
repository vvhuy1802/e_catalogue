import {
  Alert,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import {images} from '~/assets';
import ContainerImage from '~/components/global/containerImage';
import {IconSvg} from '~/components/global/iconSvg';
import {HeightSize, WidthSize, height, width} from '~/theme/size';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {HomeStackParamList, StyleIdeaStackParamList} from '~/types';
import {TextFont, TextStyle} from '~/theme/textStyle';
import FullWidthImage from '~/components/global/fullWidthImage';
import PrimaryHeart from '~/components/global/primaryHeart';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch} from '~/app/store';
import {SetDirectionBottomBar} from '~/redux/reducers/globalSlice';
import {StyleIdeaResponse} from '~/types/styleIdea';
import axios from 'axios';
import {getUrl} from '~/utils';
import {StoreResponse} from '../../category/components/productDetail/Seller';
import {getStyleByStore} from '~/redux/actions/categoryAction';
import {selectAllStyleByStore} from '~/redux/reducers/categorySlice';
import CustomListView from '~/components/global/customListView';
import {useFavorite} from '../../favorite/hooks/useFavorite';
import {PRODUCTSTACK} from '~/constants/routeNames';

type Props = {
  route: RouteProp<StyleIdeaStackParamList, 'StyleDetail'>;
};
const DetailStyleIdea = ({route}: Props) => {
  const navigationStyleIdea =
    useNavigation<
      StackNavigationProp<StyleIdeaStackParamList, 'StyleDetail'>
    >();
  const navigation =
    useNavigation<StackNavigationProp<HomeStackParamList, 'OrderStack'>>();
  const dispatch = useDispatch<AppDispatch>();
  const onGoBack = () => {
    dispatch(SetDirectionBottomBar('up'));
    navigationStyleIdea.goBack();
  };

  const [styleIdea, setStyleIdea] = React.useState<StyleIdeaResponse>();
  const styleStore = useSelector(selectAllStyleByStore);
  useEffect(() => {
    axios
      .get(
        `https://e-catalogue.abcdavid.top/product/style?id=${route.params.styleId}`,
      )
      .then(res => {
        setStyleIdea(res.data);
        dispatch(getStyleByStore(res.data.store.id));
      });
  }, []);

  const handlePressImage = useCallback((e: any) => {
    const x = WidthSize(e.nativeEvent.locationX);
    const y = HeightSize(e.nativeEvent.locationY);
    console.log(x, y);
    styleIdea?.rectangles.forEach(retangle => {
      if (
        retangle.minX < x &&
        retangle.maxX > x &&
        retangle.minY < y &&
        retangle.maxY > y
      ) {
        Alert.alert('Rectangle', retangle.variant.product.name);
      }
    });
  }, []);
  console.log(styleStore);
  const {addFavorite} = useFavorite();
  return (
    <ContainerImage
      isOpacity={true}
      style={{flex: 1}}
      resizeMode="cover"
      source={images.home.BackgroundHome}>
      {styleIdea?.id ? (
        <ScrollView
          style={{}}
          showsVerticalScrollIndicator={false}
          stickyHeaderIndices={[1]}
          stickyHeaderHiddenOnScroll={true}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: HeightSize(10),
            }}>
            <Pressable
              onPress={onGoBack}
              style={{
                width: HeightSize(80),
                height: HeightSize(40),
                borderTopRightRadius: 36,
                borderBottomRightRadius: 36,
                backgroundColor: '#EFEFE8',
                marginTop: HeightSize(2),
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

            <PrimaryHeart
              styleView={{
                marginRight: WidthSize(20),
                width: WidthSize(44),
                height: WidthSize(44),
              }}
              widthIcon={WidthSize(20)}
              heightIcon={WidthSize(20)}
              onPress={() => {
                addFavorite(styleIdea.id, 'idea', '5');
              }}
            />
          </View>
          <View
            style={{
              paddingHorizontal: WidthSize(32),
            }}>
            <Text
              style={{
                marginTop: HeightSize(28),

                ...TextStyle.SM,
                ...TextFont.SBold,
                color: '#3B302180',
              }}>
              by {styleIdea?.store.name}
            </Text>
            <Text
              style={{
                ...TextStyle.text3_5XL,
                ...TextFont.GRegular,
                marginTop: HeightSize(8),
                color: '#3B3021',
                width: width / 2,
              }}>
              {styleIdea.name}
            </Text>
          </View>

          <FullWidthImage
            onPress={(e: any) => {
              handlePressImage(e);
            }}
            onPressIn={() => {}}
            onPressOut={() => {}}
            style={{
              marginTop: HeightSize(28),
            }}
            retangles={{
              size: {
                widthImage: styleIdea.width,
                heightImage: styleIdea.height,
              },
              shapes: styleIdea.rectangles,
            }}
            source={getUrl(styleIdea.mainImage)}>
            <Pressable
              onPress={() => {
                const imgs = [
                  {
                    id: Math.random(),
                    image: styleIdea.mainImage,
                  },
                  ...styleIdea.images,
                ];
                navigationStyleIdea.navigate('AllImage', {
                  imgs: imgs,
                });
              }}
              style={{
                position: 'absolute',
                right: WidthSize(5),
                top: HeightSize(5),
                zIndex: 99,
                padding: HeightSize(15),
              }}>
              <IconSvg
                onPress={() => {
                  const imgs = [
                    {
                      id: Math.random(),
                      image: styleIdea.mainImage,
                    },
                    ...styleIdea.images,
                  ];
                  navigationStyleIdea.navigate('AllImage', {
                    imgs: imgs,
                  });
                }}
                icon="IconExpandWhite"
              />
            </Pressable>
          </FullWidthImage>
          <View
            style={{
              paddingHorizontal: WidthSize(32),
              paddingTop: HeightSize(28),
              backgroundColor: 'white',
              // borderTopLeftRadius: 40,
              // borderTopRightRadius: 40,
            }}>
            <Text
              style={{
                ...TextFont.SBold,
                ...TextStyle.XL,
                color: '#3B3021',
              }}>
              Items in this look
            </Text>
            <View
              style={{
                marginTop: HeightSize(16),
                gap: HeightSize(16),
              }}>
              {styleIdea.rectangles.map((item, index) => {
                return (
                  <Pressable
                    onPress={() => {
                      navigation.navigate('Category', {
                        screen: PRODUCTSTACK,
                        params: {
                          screen: 'ProductDetailScreen',
                          params: {
                            productId: item.variant.product.id.toString(),
                            isShowBottomBarWhenBack: 'no',
                          },
                        },
                      });
                    }}
                    key={index}
                    style={{
                      width: '100%',
                      height: HeightSize(110),
                      padding: WidthSize(10),
                      backgroundColor: '#F0EFE9',
                      flexDirection: 'row',
                      alignItems: 'center',
                      borderRadius: 20,
                    }}>
                    <Image
                      source={images.home.ImagePopular}
                      style={{
                        width: HeightSize(90),
                        height: HeightSize(90),
                        borderRadius: 20,
                      }}
                    />
                    <View
                      style={{
                        marginLeft: WidthSize(20),
                        justifyContent: 'space-between',
                        flex: 1,
                        height: '100%',
                        marginRight: WidthSize(10),
                      }}>
                      <View>
                        <Text
                          style={{
                            ...TextStyle.Base,
                            ...TextFont.SMedium,
                            color: '#3B3021',
                          }}>
                          {item.variant.product.name}
                        </Text>
                        <Text
                          style={{
                            ...TextStyle.SM,
                            ...TextFont.SMedium,
                            color: '#CCCCD0',
                          }}>
                          {item.variant.size}
                        </Text>
                      </View>
                      <Text
                        style={{
                          ...TextStyle.Base,
                          ...TextFont.SBold,
                          color: '#3B3021',
                        }}>
                        {item.variant.price}
                      </Text>
                    </View>
                    <PrimaryHeart />
                  </Pressable>
                );
              })}
            </View>
          </View>
        </ScrollView>
      ) : null}
    </ContainerImage>
  );
};

export default DetailStyleIdea;

const styles = StyleSheet.create({});
