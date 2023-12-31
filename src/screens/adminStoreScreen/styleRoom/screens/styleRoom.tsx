import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {images} from '~/assets';
import ContainerImage from '~/components/global/containerImage';
import CustomListView from '~/components/global/customListView';
import {IconSvg} from '~/components/global/iconSvg';
import {WidthSize, HeightSize, width} from '~/theme/size';
import {TextStyle, TextFont} from '~/theme/textStyle';
import {
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';
import {useNavigation} from '@react-navigation/native';
import {StyleRoomStackParamList} from '~/types';
import {StackNavigationProp} from '@react-navigation/stack';
import HeaderAdmin from '~/components/global/headerAdmin';

const StyleRoom = () => {
  const navigation =
    useNavigation<StackNavigationProp<StyleRoomStackParamList>>();

  const openImagePicker = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode == 'camera_unavailable') {
        console.log('Camera not available on device');
      } else if (response.errorCode == 'permission') {
        console.log('Permission not satisfied');
      } else if (response.errorCode == 'others') {
        console.log(response.errorMessage);
      } else if (response.assets) {
        Image.getSize(response?.assets[0].uri as any, (w, h) => {
          const widthImg = width;
          const heightImg = WidthSize((width * h) / w);
          navigation.navigate('AddStyleRoomScreenAdminStore', {
            imageAdding: response,
            widthImgage: widthImg,
            heightImage: heightImg,
          });
        });
      } else {
        console.log('error');
      }
    });
  };
  const stylelist = [
    {
      id: 1,
      img: 'https://images2.thanhnien.vn/528068263637045248/2023/7/24/huu-anh-zoner-2-4-16901664385181453210496.jpg',
    },
    {
      id: 2,
      img: 'https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg',
    },
    {
      id: 3,
      img: 'https://imgupscaler.com/images/samples/anime-after.webp',
    },
    {
      id: 4,
      img: 'https://pixlr.com/images/index/ai-image-generator-two.webp',
    },
    {
      id: 5,
      img: 'https://cdn.pixabay.com/photo/2023/06/29/03/02/ai-generated-8095540_1280.jpg',
    },
    {
      id: 6,
      img: 'https://db53ipnarc8vy.cloudfront.net/task-category1.png',
    },
  ];

  return (
    <ContainerImage
      isOpacity={true}
      style={{flex: 1}}
      resizeMode="cover"
      source={images.home.BackgroundHome}>
      <HeaderAdmin title="Style Room" />

      <View
        style={{
          paddingHorizontal: WidthSize(32),
          paddingVertical: HeightSize(16),
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
            Your Style Room
          </Text>
          <IconSvg onPress={openImagePicker} icon="IconBrushBrown" />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            marginTop: HeightSize(16),
          }}>
          <CustomListView
            widthView={width / 2 - WidthSize(40)}
            data={stylelist}
            onPress={item => {
              console.log(item);
            }}
          />
        </ScrollView>
      </View>
    </ContainerImage>
  );
};

export default StyleRoom;
