import {
  Animated,
  FlatList,
  ImageBackground,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {images} from '~/assets';
import ContainerImage from '~/components/global/containerImage';
import HeaderProduct from '~/components/global/headerProduct';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '~/app/store';
import {
  CategoryStackParamList,
  Normalized,
  ProductDetailStackParamList,
} from '~/types';
import {SetDirectionBottomBar} from '~/redux/reducers/globalSlice';
import {HeightSize, WidthSize, width} from '~/theme/size';
import {IconSvg} from '~/components/global/iconSvg';
import BlurBackground from '~/components/global/blurBackground';
import {TextFont, TextStyle} from '~/theme/textStyle';
import Review from '../../../components/productDetail/Review';
import Seller from '../../../components/productDetail/Seller';
import MayULike from '../../../components/productDetail/MayULike';
import PrimaryHeart from '~/components/global/primaryHeart';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ProductById, Variant} from '~/types/product';
import {productService} from '~/services/service/product.service';
import {getUrl} from '~/utils';
import {NormalizeColor} from '~/types/color';
import FastImage from 'react-native-fast-image';
import {addProductToCart, getCartUser} from '~/redux/actions/orderAction';
import {NormalizeSize} from '~/types/size';

type Props = {
  route: RouteProp<ProductDetailStackParamList, 'ProductDetailScreen'>;
};

const ProductDetail = ({route}: Props) => {
  const navigation =
    useNavigation<StackNavigationProp<CategoryStackParamList>>();
  const productId = route.params.productId;
  const dispatch = useDispatch<AppDispatch>();
  const onGoBack = () => {
    dispatch(SetDirectionBottomBar('up'));
    navigation.goBack();
  };

  const [dataProduct, setDataProduct] = React.useState<ProductById>();
  const [loading, setLoading] = React.useState(false);
  const [currentVariant, setCurrentVariant] = useState<Variant>();
  const [normalizeVariant, setNormalizeVariant] =
    useState<Normalized<string, Array<Variant>>>();
  const [variantAddToCart, setVariantAddToCart] = useState<Variant>();

  const [listImage, setListImage] = useState<any>([]);
  const [isShowModal, setIsShowModal] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await productService.getProductById(Number(productId)).then(res => {
        setLoading(false);
        console.log(res.data);
        setDataProduct(res.data);
      });
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (dataProduct) {
      const imgs = [];
      const normalizeVariant: Normalized<string, Array<Variant>> = {
        ids: [],
        entities: {},
      };
      imgs.push(dataProduct.image);
      Promise.all([
        dataProduct.variants.map((item: Variant) => {
          imgs.push(item.image);
          if (!normalizeVariant.ids.includes(item.color)) {
            normalizeVariant.ids.push(item.color);
            normalizeVariant.entities[item.color] = [];
          }
          normalizeVariant.entities[item.color].push(item);
        }),
        imgs.push(...dataProduct.images),
      ]);
      setListImage(imgs);
      setNormalizeVariant(normalizeVariant);
    }
  }, [dataProduct]);

  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState('');
  const [size, setSize] = useState('');

  useEffect(() => {
    if (size !== '' && color !== '') {
      setVariantAddToCart(
        normalizeVariant?.entities[color].find(
          (item: Variant) => item.size.toLocaleLowerCase() === size,
        ),
      );
    } else {
      setVariantAddToCart(undefined);
    }
  }, [size, color]);

  const imageRef = useRef<ScrollView>();
  useEffect(() => {
    imageRef.current?.scrollTo({
      x: 0,
      y: 0,
      animated: true,
    });
  }, []);
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  const [showMore, setShowMore] = React.useState(false);
  const handleShowMore = () => {
    setShowMore(!showMore);
  };

  const formatText = (text: string) => {
    if (showMore) {
      return text;
    } else {
      return text.slice(0, 200);
    }
  };

  useEffect(() => {
    if (normalizeVariant && currentImageIndex !== 0) {
      normalizeVariant.ids.map((item: string) => {
        if (
          normalizeVariant.entities[item].filter(
            (item: Variant) => item.image === listImage[currentImageIndex],
          ).length > 0
        ) {
          setCurrentVariant(
            normalizeVariant.entities[item].filter(
              (item: Variant) => item.image === listImage[currentImageIndex],
            )[0],
          );
        }
      });
    } else {
      setCurrentVariant(undefined);
    }
  }, [currentImageIndex]);

  const handleOnScroll = (event: any) => {
    const layoutHeight = event.nativeEvent.layoutMeasurement.height;
    const contentOffsetY = event.nativeEvent.contentOffset.y;
    const currentIndex = Math.round(contentOffsetY / layoutHeight);
    setCurrentImageIndex(currentIndex);
  };

  const scrollToIndex = (index: number) => {
    imageRef.current?.scrollTo({
      x: 0,
      y: index * WidthSize(456),
      animated: false,
    });
  };

  const [isAddToBag, setIsAddToBag] = React.useState(false);
  const addToBagRef = useRef(new Animated.Value(0));
  const moveTopRef = useRef(new Animated.Value(0));
  const insets = useSafeAreaInsets();

  const handleAddToBag = () => {
    setIsAddToBag(true);
    const param = {
      product_variant: variantAddToCart?.id!,
      quantity: quantity,
    };
    dispatch(addProductToCart(param));

    Animated.timing(addToBagRef.current, {
      toValue: 1,
      duration: 900,
      useNativeDriver: false,
    }).start(() => {
      setTimeout(() => {
        Animated.timing(addToBagRef.current, {
          toValue: 2,
          duration: 700,
          useNativeDriver: false,
        }).start(() => {
          setIsAddToBag(false);
          dispatch(getCartUser());
          addToBagRef.current.setValue(0);
          moveTopRef.current.setValue(0);
          setQuantity(1);
        });
      }, 300);
      Animated.timing(moveTopRef.current, {
        toValue: 1,
        duration: 800,
        useNativeDriver: false,
      }).start();
    });
  };

  const renderDots = useCallback(() => {
    return (
      <View
        style={{
          position: 'absolute',
          width: WidthSize(8),
          left: WidthSize(12),
          top: WidthSize(350) / 2,
          alignItems: 'center',
          justifyContent: 'center',
          gap: HeightSize(8),
        }}>
        {listImage.map((item: any, index: number) => {
          return (
            <View
              key={index}
              style={{
                width: WidthSize(8),
                height: WidthSize(8),
                borderRadius: 100,
                backgroundColor:
                  index === currentImageIndex ? '#836E44' : 'transparent',
                borderWidth: 2,
                borderColor: '#836E44',
              }}
            />
          );
        })}
      </View>
    );
  }, [currentImageIndex, listImage]);

  const handleHideModal = () => {
    setIsShowModal(false);
    setQuantity(1);
  };

  return (
    <ContainerImage
      // isOpacity={true}
      style={{flex: 1}}
      resizeMode="cover"
      source={images.home.BackgroundHome}>
      <Animated.Image
        source={getUrl(variantAddToCart?.image as any)}
        resizeMode="cover"
        style={{
          display: isAddToBag ? 'flex' : 'none',
          position: 'absolute',
          alignSelf: 'center',
          marginTop: addToBagRef.current.interpolate({
            inputRange: [0, 1, 2],
            outputRange: [
              HeightSize(110),
              HeightSize(285 + insets.top),
              HeightSize(285 + insets.top),
            ],
          }),
          width: addToBagRef.current.interpolate({
            inputRange: [0, 1, 2],
            outputRange: [
              WidthSize(350),
              WidthSize(350 * 0.15),
              WidthSize(350 * 0.15),
            ],
          }),
          height: addToBagRef.current.interpolate({
            inputRange: [0, 1, 2],
            outputRange: [
              WidthSize(350),
              WidthSize(350 * 0.15),
              WidthSize(350 * 0.15),
            ],
          }),
          top: moveTopRef.current.interpolate({
            inputRange: [0, 1],
            outputRange: [HeightSize(64), -HeightSize(270)],
          }),
          borderRadius: 999,
          zIndex: 99,
          right: addToBagRef.current.interpolate({
            inputRange: [0, 1, 2],
            outputRange: [
              width / 2 - WidthSize(350) / 2,
              width / 2 - WidthSize(350 * 0.15) / 2,
              WidthSize(20),
            ],
          }),
          opacity: addToBagRef.current.interpolate({
            inputRange: [0, 1, 2],
            outputRange: [1, 0.8, 0],
          }),
        }}
      />
      <HeaderProduct
        isShowBottomBarWhenBack={false}
        title="Products"
        onPressBack={onGoBack}
      />
      <ScrollView nestedScrollEnabled={true}>
        <View
          style={{
            flex: 1,
            paddingHorizontal: HeightSize(32),
            paddingBottom: HeightSize(100),
            paddingTop: HeightSize(22),
          }}>
          <View
            style={{
              width: WidthSize(350),
              height: WidthSize(456),
              alignSelf: 'center',
            }}>
            <ScrollView
              style={{
                width: WidthSize(350),
                height: WidthSize(456),
                borderRadius: 40,
              }}
              ref={imageRef as any}
              onScroll={event => handleOnScroll(event)}
              scrollEventThrottle={16}
              pagingEnabled
              showsVerticalScrollIndicator={false}>
              {listImage.map((item: any, index: number) => {
                return (
                  <View key={index}>
                    <ImageBackground
                      key={index}
                      source={getUrl(item)}
                      resizeMode="cover"
                      style={{
                        width: WidthSize(350),
                        height: WidthSize(456),
                      }}
                    />
                  </View>
                );
              })}
            </ScrollView>

            {renderDots()}
            <PrimaryHeart
              styleView={{
                position: 'absolute',
                width: WidthSize(44),
                height: WidthSize(44),
                top: WidthSize(20),
                right: WidthSize(20),
              }}
              widthIcon={WidthSize(20)}
              heightIcon={WidthSize(20)}
            />
            <View
              style={{
                width: HeightSize(188),
                height: HeightSize(60),
                position: 'absolute',
                bottom: HeightSize(12),
                left: WidthSize(350) / 2 - HeightSize(188) / 2,
                borderRadius: 12,
              }}>
              <BlurBackground
                blurType="light"
                blurAmount={12}
                style={{
                  width: HeightSize(188),
                  height: HeightSize(60),
                  borderRadius: 12,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    width: HeightSize(188),
                    height: HeightSize(60),
                    paddingHorizontal: HeightSize(22),
                  }}>
                  <FlatList
                    data={normalizeVariant?.ids}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: HeightSize(20),
                    }}
                    style={{
                      maxWidth: HeightSize(188),
                      maxHeight: HeightSize(60),
                    }}
                    keyExtractor={(item, index) => index.toString()}
                    pagingEnabled
                    renderItem={({item, index}) => {
                      return (
                        <View key={index}>
                          {normalizeVariant?.entities[item].filter(
                            (item: Variant) =>
                              item.color === currentVariant?.color,
                          ).length! > 0 ? (
                            <View
                              style={{
                                width: HeightSize(48),
                                height: HeightSize(48),
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 100,
                                borderWidth: 2,
                                borderColor:
                                  NormalizeColor.entities[
                                    item.toLocaleLowerCase()
                                  ],
                              }}>
                              <View
                                style={{
                                  width: HeightSize(36),
                                  height: HeightSize(36),
                                  backgroundColor:
                                    NormalizeColor.entities[
                                      item.toLocaleLowerCase()
                                    ],
                                  borderRadius: 100,
                                }}
                              />
                            </View>
                          ) : (
                            <Pressable
                              onPress={() => {
                                scrollToIndex(
                                  listImage.findIndex(
                                    (img: any) =>
                                      img ===
                                      normalizeVariant?.entities[item][0].image,
                                  ),
                                );
                              }}
                              style={{
                                width: HeightSize(24),
                                height: HeightSize(24),
                                backgroundColor:
                                  NormalizeColor.entities[
                                    item.toLocaleLowerCase()
                                  ],
                                borderRadius: 100,
                              }}
                            />
                          )}
                        </View>
                      );
                    }}
                  />
                </View>
              </BlurBackground>
            </View>
          </View>

          <View
            style={{
              marginTop: HeightSize(40),
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                color: '#3B3021',
                ...TextStyle.text3_5XL,
                ...TextFont.GRegular,
                flex: 1,
              }}>
              {dataProduct?.name}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <IconSvg
                icon="IconStarYellow"
                width={WidthSize(20)}
                height={WidthSize(20)}
              />
              <Text
                style={{
                  color: '#3B3021',
                  ...TextStyle.Base,
                  ...TextFont.SBold,
                  marginLeft: WidthSize(4),
                }}>
                4.5
              </Text>
            </View>
          </View>

          {/* <View style={{marginTop: HeightSize(20)}}>
            <FlatList
              data={dataProduct?.variants}
              contentContainerStyle={{
                gap: WidthSize(12),
              }}
              renderItem={({item, index}) => {
                return (
                  <Pressable
                    onPress={() => {
                      item.id === currentVariant?.id
                        ? null
                        : (setCurrentVariant(item), scrollToIndex(index));
                    }}
                    style={{
                      width: WidthSize(65),
                      height: HeightSize(57),
                      borderRadius: 28,
                      backgroundColor:
                        currentVariant?.id === item.id ? '#836E44' : '#EFEFE8',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        color:
                          currentVariant?.id === item.id ? 'white' : '#3B3021',
                        ...TextStyle.Base,
                        ...TextFont.SRegular,
                      }}>
                      {item.size}
                    </Text>
                  </Pressable>
                );
              }}
              keyExtractor={(item, index) => index.toString()}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            />
          </View> */}

          <View style={{marginTop: HeightSize(20)}}>
            <Text>
              {formatText(dataProduct?.description || 'No description')}{' '}
              {dataProduct?.description?.length! > 200 ? (
                <Text
                  onPress={handleShowMore}
                  style={{
                    ...TextFont.SBold,
                    color: '#3B3021',
                  }}>
                  {showMore ? 'Show less' : '... Show more'}
                </Text>
              ) : null}
            </Text>
          </View>
          <Review />
          <Seller />
          <MayULike />
        </View>
      </ScrollView>
      <View
        style={{
          width: width,
          position: 'absolute',
          paddingHorizontal: WidthSize(32),
          bottom: HeightSize(20),
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            backgroundColor: 'white',
            paddingHorizontal: WidthSize(28),
            paddingVertical: HeightSize(20),
            borderRadius: 16,
          }}>
          <Text
            style={{
              ...TextFont.SBold,
              ...TextStyle.XL,
              color: '#3B3021',
            }}>
            {currentVariant?.price}$
          </Text>
        </View>
        <Pressable
          onPress={() => {
            // isAddToBag ? null : handleAddToBag();
            setIsShowModal(true);
          }}
          style={{
            width: WidthSize(198),
            backgroundColor: '#836E44',
            borderRadius: 16,
            paddingHorizontal: WidthSize(28),
            paddingVertical: HeightSize(20),
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              ...TextFont.SBold,
              ...TextStyle.XL,
              color: 'white',
            }}>
            Add to bag
          </Text>
          <IconSvg icon="IconBagWhite" />
        </Pressable>
      </View>
      <Modal
        visible={isShowModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsShowModal(false)}>
        <Pressable
          onPress={handleHideModal}
          style={{
            flex: 1,
            justifyContent: 'flex-end',
          }}>
          <Pressable
            style={{
              backgroundColor: 'white',
              width: width,
              padding: WidthSize(16),
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
              elevation: 10,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
            }}>
            <View
              style={{
                flexDirection: 'row',
                borderBottomWidth: 1,
                borderBottomColor: '#EFEFE8',
                paddingBottom: HeightSize(16),
              }}>
              <FastImage
                source={
                  getUrl(
                    variantAddToCart?.image
                      ? variantAddToCart?.image
                      : (dataProduct?.image as any),
                  ) as any
                }
                style={{
                  width: WidthSize(150),
                  height: WidthSize(150),
                  borderRadius: 16,
                }}
                resizeMode="cover"
              />
              <View
                style={{
                  marginLeft: WidthSize(16),
                  justifyContent: 'space-between',
                  flex: 1,
                }}>
                <Text
                  style={{
                    color: '#3B3021',
                    ...TextFont.SBold,
                    ...TextStyle.XXL,
                  }}>
                  {variantAddToCart?.price}$
                </Text>
                <Text
                  style={{
                    color: '#3B3021',
                    ...TextFont.SLight,
                    ...TextStyle.Base,
                  }}>
                  Storage : {variantAddToCart?.quantity}
                </Text>
              </View>
              <IconSvg onPress={handleHideModal} icon="IconCloseBoldBrown" />
            </View>
            <View
              style={{
                marginTop: HeightSize(16),
                borderBottomWidth: 1,
                borderBottomColor: '#EFEFE8',
                paddingBottom: HeightSize(16),
              }}>
              <Text
                style={{
                  color: '#3B3021',
                  ...TextFont.SMedium,
                  ...TextStyle.Base,
                }}>
                Color
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: HeightSize(12),
                  gap: WidthSize(12),
                }}>
                {normalizeVariant?.ids.map((item: string, index: number) => {
                  return (
                    <Pressable
                      disabled={
                        normalizeVariant?.entities[item]?.find(
                          (v: Variant) => v.size.toLocaleLowerCase() === size,
                        )?.quantity! > 0
                          ? false
                          : size !== ''
                          ? true
                          : false
                      }
                      onPress={() => {
                        if (color !== item) {
                          setColor(item);
                        } else {
                          setColor('');
                        }
                      }}
                      key={index}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: WidthSize(8),
                        borderWidth: 1,
                        borderColor: item === color ? '#3B3021' : '#EFEFE8',
                        borderRadius: 8,
                        padding: HeightSize(8),
                        backgroundColor:
                          normalizeVariant?.entities[item]?.find(
                            (v: Variant) => v.size.toLocaleLowerCase() === size,
                          )?.quantity! > 0
                            ? 'white'
                            : size !== ''
                            ? '#EFEFE8'
                            : 'white',
                      }}>
                      <View
                        style={{
                          width: WidthSize(20),
                          height: WidthSize(20),
                          backgroundColor:
                            NormalizeColor.entities[item.toLocaleLowerCase()],
                          borderRadius: 100,
                          elevation: 10,
                          shadowColor: '#000',
                          shadowOffset: {
                            width: 0,
                            height: 2,
                          },
                          shadowOpacity: 0.25,
                        }}
                      />
                      <Text
                        style={{
                          ...TextFont.SRegular,
                          ...TextStyle.Base,
                          color:
                            normalizeVariant?.entities[item]?.find(
                              (v: Variant) =>
                                v.size.toLocaleLowerCase() === size,
                            )?.quantity! > 0
                              ? '#3B3021'
                              : size !== ''
                              ? 'gray'
                              : '#3B3021',
                        }}>
                        {item}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>
            <View
              style={{
                marginTop: HeightSize(16),
                borderBottomWidth: 1,
                borderBottomColor: '#EFEFE8',
                paddingBottom: HeightSize(16),
              }}>
              <Text
                style={{
                  color: '#3B3021',
                  ...TextFont.SMedium,
                  ...TextStyle.Base,
                }}>
                Size
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: HeightSize(12),
                  gap: WidthSize(12),
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: WidthSize(12),
                    flexWrap: 'wrap',
                  }}>
                  {NormalizeSize.ids.map((item, index) => {
                    return (
                      <Pressable
                        disabled={
                          normalizeVariant?.entities[color]?.find(
                            (v: Variant) => v.size.toLocaleLowerCase() === item,
                          )?.quantity! > 0
                            ? false
                            : color !== ''
                            ? true
                            : false
                        }
                        onPress={() => {
                          if (size !== item) {
                            setSize(item);
                          } else {
                            setSize('');
                          }
                        }}
                        key={index}
                        style={{
                          borderWidth: 1,
                          borderColor: item === size ? '#3B3021' : '#EFEFE8',
                          borderRadius: 8,
                          paddingVertical: HeightSize(8),
                          paddingHorizontal: WidthSize(24),
                          backgroundColor:
                            normalizeVariant?.entities[color]?.find(
                              (v: Variant) =>
                                v.size.toLocaleLowerCase() === item,
                            )?.quantity! > 0
                              ? 'white'
                              : color !== ''
                              ? '#EFEFE8'
                              : 'white',
                        }}>
                        <Text
                          style={{
                            ...TextFont.SRegular,
                            ...TextStyle.Base,
                            color:
                              normalizeVariant?.entities[color]?.find(
                                (v: Variant) =>
                                  v.size.toLocaleLowerCase() === item,
                              )?.quantity! > 0
                                ? '#3B3021'
                                : color !== ''
                                ? 'gray'
                                : '#3B3021',
                          }}>
                          {NormalizeSize.entities[item]}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
              </View>
            </View>
            <View
              style={{
                marginTop: HeightSize(16),
                paddingBottom: HeightSize(16),
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  color: '#3B3021',
                  ...TextFont.SMedium,
                  ...TextStyle.Base,
                }}>
                Quantity
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: HeightSize(12),
                  gap: WidthSize(12),
                }}>
                <Pressable
                  onPress={() => {
                    if (quantity > 1) {
                      setQuantity(quantity - 1);
                    }
                  }}
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingHorizontal: HeightSize(8),
                    borderWidth: 1,
                    borderColor: '#EFEFE8',
                    borderRadius: 8,
                  }}>
                  <IconSvg icon="IconMinusBrown" />
                </Pressable>
                <View
                  style={{
                    width: WidthSize(48),
                    height: HeightSize(48),
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: 1,
                    borderColor: '#EFEFE8',
                    borderRadius: 8,
                  }}>
                  <Text
                    style={{
                      color: '#3B3021',
                      ...TextFont.SRegular,
                      ...TextStyle.Base,
                    }}>
                    {quantity}
                  </Text>
                </View>
                <Pressable
                  onPress={() => {
                    if (quantity < variantAddToCart?.quantity!) {
                      setQuantity(quantity + 1);
                    }
                  }}
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingHorizontal: HeightSize(8),
                    borderWidth: 1,
                    borderColor: '#EFEFE8',
                    borderRadius: 8,
                  }}>
                  <IconSvg icon="IconAddBrown" />
                </Pressable>
              </View>
            </View>
            <TouchableOpacity
              disabled={variantAddToCart?.quantity! > 0 ? false : true}
              activeOpacity={0.8}
              style={{
                backgroundColor:
                  variantAddToCart?.quantity! > 0 ? '#836E44' : 'gray',
                paddingVertical: HeightSize(16),
                borderRadius: 8,
                alignItems: 'center',
                justifyContent: 'center',
                marginHorizontal: WidthSize(16),
                marginTop: HeightSize(16),
              }}
              onPress={() => {
                setIsShowModal(false);
                handleAddToBag();
              }}>
              <Text
                style={{
                  color: 'white',
                  ...TextFont.SBold,
                  ...TextStyle.Base,
                }}>
                Add to bag
              </Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    </ContainerImage>
  );
};

export default ProductDetail;
