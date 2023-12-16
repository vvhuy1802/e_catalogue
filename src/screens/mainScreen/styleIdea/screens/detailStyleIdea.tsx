import {
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {images} from '~/assets';
import ContainerImage from '~/components/global/containerImage';
import {IconSvg} from '~/components/global/iconSvg';
import {HeightSize, WidthSize, height, width} from '~/theme/size';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {StyleIdeaStackParamList} from '~/types';
import {TextFont, TextStyle} from '~/theme/textStyle';
import FullWidthImage from '~/components/global/fullWidthImage';
import PrimaryHeart from '~/components/global/primaryHeart';

const DetailStyleIdea = () => {
  const navigationStyleIdea =
    useNavigation<
      StackNavigationProp<StyleIdeaStackParamList, 'StyleDetail'>
    >();
  const onGoBack = () => {
    navigationStyleIdea.goBack();
  };
  const data = [
    {
      id: 1,
      title: 'T-shirt Ahweh Yerah',
      category: 'T-shirt',
      img: 'https://static.zara.net/photos///2023/I/0/3/p/1716/345/806/2/w/1024/1716345806_6_1_1.jpg',
      price: '178.000 VND',
    },
    {
      id: 2,
      title: 'T-shirt Ahweh Yerah',
      category: 'T-shirt',
      img: 'https://static.zara.net/photos///2023/I/0/3/p/1716/345/806/2/w/1024/1716345806_6_1_1.jpg',
      price: '178.000 VND',
    },
    {
      id: 3,
      title: 'T-shirt Ahweh Yerah',
      category: 'T-shirt',
      img: 'https://static.zara.net/photos///2023/I/0/3/p/1716/345/806/2/w/1024/1716345806_6_1_1.jpg',
      price: '178.000 VND',
    },
    {
      id: 4,
      title: 'T-shirt Ahweh Yerah',
      category: 'T-shirt',
      img: 'https://static.zara.net/photos///2023/I/0/3/p/1716/345/806/2/w/1024/1716345806_6_1_1.jpg',
      price: '178.000 VND',
    },
  ];
  return (
    <ContainerImage
      isOpacity={true}
      style={{flex: 1}}
      resizeMode="cover"
      source={images.home.BackgroundHome}>
      <ScrollView
        style={{}}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[1]}>
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

          <PrimaryHeart
            styleView={{
              marginRight: WidthSize(20),
              width: WidthSize(44),
              height: WidthSize(44),
            }}
            widthIcon={WidthSize(20)}
            heightIcon={WidthSize(20)}
          />
        </View>
        <View
          style={{
            marginTop: HeightSize(44),
            paddingHorizontal: WidthSize(32),
          }}>
          <Text
            style={{
              ...TextStyle.SM,
              ...TextFont.SBold,
              color: '#3B302180',
            }}>
            by Mark Jason
          </Text>
          <Text
            style={{
              ...TextStyle.text3_5XL,
              ...TextFont.GRegular,
              marginTop: HeightSize(8),
              color: '#3B3021',
              width: width / 2,
            }}>
            Modern living look design
          </Text>
        </View>

        <FullWidthImage
          style={{
            marginTop: HeightSize(28),
          }}
          source={images.home.ImageHotLook}>
          <IconSvg
            onPress={() => {
              console.log('ha');
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
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
            // top: -HeightSize(40),
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
            {data.map((item, index) => {
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
                        {item.title}
                      </Text>
                      <Text
                        style={{
                          ...TextStyle.SM,
                          ...TextFont.SMedium,
                          color: '#CCCCD0',
                        }}>
                        {item.category}
                      </Text>
                    </View>
                    <Text
                      style={{
                        ...TextStyle.Base,
                        ...TextFont.SBold,
                        color: '#3B3021',
                      }}>
                      {item.price}
                    </Text>
                  </View>
                  <PrimaryHeart />
                </View>
              );
            })}
          </View>
          <View
            style={{
              marginTop: HeightSize(64),
            }}>
            <Text
              style={{
                ...TextStyle.XL,
                ...TextFont.SBold,
                color: '#3B3021',
              }}>
              Mark Jason
              <Text
                style={{
                  ...TextStyle.Base,
                  ...TextFont.SRegular,
                  color: '#3B3021',
                }}>
                {' '}
                ‘s another ideas
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </ContainerImage>
  );
};

export default DetailStyleIdea;

const styles = StyleSheet.create({});
