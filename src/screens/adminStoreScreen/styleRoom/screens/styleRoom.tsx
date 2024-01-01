import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
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
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {selectStoreInfo} from '~/redux/reducers/productSlice';
import {AppDispatch} from '~/app/store';
import {getStyleByStore} from '~/redux/actions/categoryAction';
import {selectAllStyleByStore} from '~/redux/reducers/categorySlice';

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

  const storeInfo = useSelector(selectStoreInfo);
  const dispatch = useDispatch<AppDispatch>();
  const Storestyles = useSelector(selectAllStyleByStore);
  useEffect(() => {
    dispatch(getStyleByStore(storeInfo.id));
  }, []);
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
            marginBottom: HeightSize(50),
          }}>
          {Storestyles.length !== 0 ? (
            <CustomListView
              widthView={width / 2 - WidthSize(40)}
              data={Storestyles}
              onPress={item => {
                navigation.navigate('DetailStyleRoomScreenAdminStore', {
                  styleRoom: item,
                });
              }}
            />
          ) : null}
        </ScrollView>
      </View>
    </ContainerImage>
  );
};

export default StyleRoom;
