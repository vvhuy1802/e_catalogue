import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {HeightSize, WidthSize} from '~/theme/size';
import {Icon} from 'react-native-paper';
import {IconSvg} from '~/components/global/iconSvg';
import {TextFont, TextStyle} from '~/theme/textStyle';
import {images} from '~/assets';

const PopularChoice = () => {
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
    <View
      style={{
        marginTop: HeightSize(50),
        paddingLeft: WidthSize(30),
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            color: '#3B3021',
            ...TextStyle.XXXL,
            ...TextFont.GRegular,
          }}>
          Popular choice
        </Text>
        <View
          style={{
            width: WidthSize(80),
            height: HeightSize(40),
            backgroundColor: '#EFEFE8',
            borderTopLeftRadius: 36,
            borderBottomLeftRadius: 36,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <IconSvg
            icon="IconArrowRightBlack"
            width={WidthSize(32)}
            height={WidthSize(32)}
          />
        </View>
      </View>
      <View
        style={{
          marginTop: HeightSize(20),
          paddingRight: WidthSize(30),
          gap: HeightSize(20),
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
              <View
                style={{
                  backgroundColor: 'white',
                  borderRadius: 100,
                  width: HeightSize(44),
                  height: HeightSize(44),
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <IconSvg
                  icon="IconHeartGray"
                  width={HeightSize(20)}
                  height={HeightSize(20)}
                />
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default PopularChoice;

const styles = StyleSheet.create({});
