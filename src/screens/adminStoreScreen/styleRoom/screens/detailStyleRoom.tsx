import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import {images} from '~/assets';
import ContainerImage from '~/components/global/containerImage';
import HeaderProduct from '~/components/global/headerProduct';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {StyleRoomStackParamList} from '~/types';
import axios from 'axios';
import FullWidthImage from '~/components/global/fullWidthImage';
import {IconSvg} from '~/components/global/iconSvg';
import PrimaryHeart from '~/components/global/primaryHeart';
import {HeightSize, WidthSize, width} from '~/theme/size';
import {TextStyle, TextFont} from '~/theme/textStyle';
import {getUrl} from '~/utils';

type Props = {
  route: RouteProp<StyleRoomStackParamList, 'DetailStyleRoomScreenAdminStore'>;
};
const DetailStyleRoom = ({route}: Props) => {
  const navigation =
    useNavigation<StackNavigationProp<StyleRoomStackParamList>>();
  const styleIdea = route.params.styleRoom;
  const handlePressImage = useCallback((e: any) => {
    const x = WidthSize(e.nativeEvent.locationX);
    const y = HeightSize(e.nativeEvent.locationY);
    console.log(x, y);
    styleIdea.rectangles.forEach(retangle => {
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

  return (
    <ContainerImage
      isOpacity={true}
      style={{flex: 1}}
      resizeMode="cover"
      source={images.home.BackgroundHome}>
      <HeaderProduct
        isShowBottomBarWhenBack={false}
        title="Detail Style Room"
        onPressBack={() => {
          navigation.goBack();
        }}
        showBag={false}
      />
      <ScrollView
        style={{}}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[1]}
        stickyHeaderHiddenOnScroll={true}>
        <View
          style={{
            paddingHorizontal: WidthSize(32),
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
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
          <Text
            onPress={() => {
              navigation.navigate('EditStyleRoomScreenAdminStore', {
                size: {
                  width: styleIdea.width,
                  height: styleIdea.height,
                },
                mainImage: styleIdea.mainImage,
                rectangles: styleIdea.rectangles.map(item => {
                  return {
                    id: Math.random(),
                    minX: item.minX,
                    minY: item.minY,
                    maxX: item.maxX,
                    maxY: item.maxY,
                    product: item.variant.product,
                    variant: item.variant,
                  };
                }),
                listImage: styleIdea.images.map(item => {
                  return {
                    id: item.id,
                    image: item.image,
                    isFromEdit: true,
                  };
                }),
                name: styleIdea.name,
                id: styleIdea.id,
              });
            }}
            suppressHighlighting={true}
            style={{
              ...TextStyle.LG,
              ...TextFont.SBold,
              marginTop: HeightSize(8),
              color: '#3B3021',
            }}>
            Edit
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
          <IconSvg
            onPress={() => {
              const imgs = [
                {
                  id: Math.random(),
                  image: styleIdea.mainImage,
                },
                ...styleIdea.images,
              ];
              navigation.navigate('AllImage', {
                imgs: imgs,
              });
            }}
            style={{
              position: 'absolute',
              right: WidthSize(20),
              top: HeightSize(20),
            }}
            icon="IconExpandWhite"
          />
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
                <View
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
                    source={getUrl(item.variant.image)}
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
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </ContainerImage>
  );
};

export default DetailStyleRoom;

const styles = StyleSheet.create({});
