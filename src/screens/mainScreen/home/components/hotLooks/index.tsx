import {FlatList, ImageBackground, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {IconSvg} from '~/components/global/iconSvg';
import {HeightSize, WidthSize} from '~/theme/size';
import {TextStyle, TextFont} from '~/theme/textStyle';
import {images} from '~/assets';
import BlurBackground from '~/components/global/blurBackground';
import PrimaryHeart from '~/components/global/primaryHeart';

const HotLooks = () => {
  const data = [
    {
      id: 1,
      img: '',
      saveCount: 1028,
      title: 'Summer Vibe',
    },
    {
      id: 2,
      img: '',
      saveCount: 1028,
      title: 'Summer Vibe',
    },
    {
      id: 3,
      img: '',
      saveCount: 1028,
      title: 'Summer Vibe',
    },
    {
      id: 4,
      img: '',
      saveCount: 1028,
      title: 'Summer Vibe',
    },
    {
      id: 5,
      img: '',
      saveCount: 1028,
      title: 'Summer Vibe',
    },
  ];
  return (
    <View
      style={{
        marginTop: HeightSize(50),
        paddingBottom: HeightSize(50),
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingLeft: WidthSize(30),
        }}>
        <Text
          style={{
            color: '#3B3021',
            ...TextStyle.XXXL,
            ...TextFont.GRegular,
          }}>
          Hot looks
        </Text>
      </View>
      <View
        style={{
          marginTop: HeightSize(20),
        }}>
        <FlatList
          data={data}
          style={{}}
          horizontal
          contentContainerStyle={{
            paddingHorizontal: WidthSize(30),
            gap: WidthSize(20),
          }}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => {
            return (
              <ImageBackground
                source={images.home.ImageHotLook}
                resizeMode="cover"
                imageStyle={{borderRadius: 24}}
                style={{
                  width: WidthSize(220),
                  height: HeightSize(296),
                  alignItems: 'flex-end',
                  justifyContent: 'flex-end',
                }}>
                <PrimaryHeart
                  styleView={{
                    position: 'absolute',
                    width: HeightSize(36),
                    height: HeightSize(36),
                    top: HeightSize(12),
                    right: WidthSize(12),
                  }}
                  widthIcon={HeightSize(16)}
                  heightIcon={HeightSize(16)}
                />
                <View
                  style={{
                    height: HeightSize(60),
                    width: WidthSize(220),
                    backgroundColor: '#D8D2C414',
                  }}>
                  <BlurBackground
                    // blurType="light"
                    blurAmount={15}
                    style={{
                      borderBottomLeftRadius: 20,
                      borderBottomRightRadius: 20,
                    }}
                  />
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      paddingHorizontal: WidthSize(20),
                    }}>
                    <Text
                      style={{
                        color: 'white',
                        ...TextFont.SRegular,
                        ...TextStyle.SM,
                      }}>
                      {item.saveCount}
                      {' people saved'}
                    </Text>
                    <Text
                      style={{
                        color: '#3B3021',
                        ...TextFont.SMedium,
                        ...TextStyle.Base,
                      }}>
                      {item.title}
                    </Text>
                  </View>
                </View>
              </ImageBackground>
            );
          }}
        />
      </View>
    </View>
  );
};

export default HotLooks;

const styles = StyleSheet.create({});
