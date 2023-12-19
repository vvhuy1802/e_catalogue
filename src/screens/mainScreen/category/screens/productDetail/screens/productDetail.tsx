import {
  Animated,
  FlatList,
  ImageBackground,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useRef} from 'react';
import {images} from '~/assets';
import ContainerImage from '~/components/global/containerImage';
import HeaderProduct from '~/components/global/headerProduct';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '~/app/store';
import {CategoryStackParamList, ProductDetailStackParamList} from '~/types';
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

type Props = {
  route: RouteProp<ProductDetailStackParamList, 'ProductDetailScreen'>;
};
const ProductDetail = ({route}: Props) => {
  const navigation =
    useNavigation<StackNavigationProp<CategoryStackParamList>>();
  const dispatch = useDispatch<AppDispatch>();
  const onGoBack = () => {
    dispatch(SetDirectionBottomBar('up'));
    navigation.goBack();
  };

  const dataTemp = [
    {id: 1, name: 'T-Shirt', image: images.home.ImageHotLook},
    {id: 2, name: 'T-Shirt', image: images.home.ImageHotLook},
    {id: 3, name: 'T-Shirt', image: images.home.ImageHotLook},
    {id: 4, name: 'T-Shirt', image: images.home.ImageHotLook},
    {id: 5, name: 'T-Shirt', image: images.home.ImageHotLook},
    {id: 6, name: 'T-Shirt', image: images.home.ImageHotLook},
    {id: 7, name: 'T-Shirt', image: images.home.ImageHotLook},
    {id: 8, name: 'T-Shirt', image: images.home.ImageHotLook},
  ];

  const imageRef = useRef<ScrollView>();
  useEffect(() => {
    imageRef.current?.scrollTo({
      x: 0,
      y: 0,
      animated: true,
    });
  }, []);
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  const dataSize = [
    {id: 1, size: 'XS'},
    {id: 2, size: 'S'},
    {id: 3, size: 'S'},
    {id: 4, size: 'M'},
    {id: 5, size: 'L'},
    {id: 6, size: 'XL'},
    {id: 7, size: 'XXL'},
  ];

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

  const handleOnScroll = (event: any) => {
    const layoutHeight = event.nativeEvent.layoutMeasurement.height;
    const contentOffsetY = event.nativeEvent.contentOffset.y;
    const currentIndex = Math.round(contentOffsetY / layoutHeight);
    setCurrentImageIndex(currentIndex);
  };

  const [isAddToBag, setIsAddToBag] = React.useState(false);
  const addToBagRef = useRef(new Animated.Value(0));
  const moveTopRef = useRef(new Animated.Value(0));
  const insets = useSafeAreaInsets();

  const handleAddToBag = () => {
    setIsAddToBag(true);
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
          addToBagRef.current.setValue(0);
          moveTopRef.current.setValue(0);
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
        {dataTemp.map((item, index) => {
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
  }, [currentImageIndex]);

  return (
    <ContainerImage
      // isOpacity={true}
      style={{flex: 1}}
      resizeMode="cover"
      source={images.home.BackgroundHome}>
      <Animated.Image
        source={dataTemp[currentImageIndex].image}
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
      <HeaderProduct title="Products" onPressBack={onGoBack} />
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
              {dataTemp.map((item, index) => {
                return (
                  <View key={index}>
                    <ImageBackground
                      key={index}
                      source={item.image}
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
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingHorizontal: HeightSize(22),
                  }}>
                  <View
                    style={{
                      width: HeightSize(24),
                      height: HeightSize(24),
                      backgroundColor: '#83878D',
                      borderRadius: 100,
                    }}
                  />
                  <View
                    style={{
                      width: HeightSize(48),
                      height: HeightSize(48),
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 100,
                      borderWidth: HeightSize(2),
                      borderColor: '#000000',
                    }}>
                    <View
                      style={{
                        width: HeightSize(36),
                        height: HeightSize(36),
                        backgroundColor: '#000000',
                        borderRadius: 100,
                      }}
                    />
                  </View>
                  <View
                    style={{
                      width: HeightSize(24),
                      height: HeightSize(24),
                      backgroundColor: '#401D0B',
                      borderRadius: 100,
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
              T-shirt Ahweh Yerth
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

          <View style={{marginTop: HeightSize(20)}}>
            <FlatList
              data={dataSize}
              contentContainerStyle={{
                gap: WidthSize(12),
              }}
              renderItem={({item, index}) => {
                return (
                  <View
                    style={{
                      width: WidthSize(65),
                      height: HeightSize(57),
                      borderRadius: 28,
                      backgroundColor: '#EFEFE8',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        color: '#3B3021',
                        ...TextStyle.Base,
                        ...TextFont.SRegular,
                      }}>
                      {item.size}
                    </Text>
                  </View>
                );
              }}
              keyExtractor={(item, index) => index.toString()}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            />
          </View>

          <View style={{marginTop: HeightSize(20)}}>
            <Text>
              {formatText(
                `Embark on a journey of discovery with the Ahweh Yerth Exploration Tee the perfect companion for adventurers and dreamers alike. Crafted from a blend of breathable cotton and eco-friendly fibers, this shirt is as comfortable as it is stylish. The design features a mesmerizing interplay of celestial elements and earthly landscapes, symbolizing the harmony between the cosmos and our planet. The celestial patterns intertwine with mountain silhouettes and lush forests, creating a visual narrative of exploration and connection.`,
              )}{' '}
              <Text
                onPress={handleShowMore}
                style={{
                  ...TextFont.SBold,
                  color: '#3B3021',
                }}>
                {showMore ? 'Show less' : '... Show more'}
              </Text>
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
            Cost
          </Text>
        </View>
        <Pressable
          onPress={() => {
            isAddToBag ? null : handleAddToBag();
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
    </ContainerImage>
  );
};

export default ProductDetail;
