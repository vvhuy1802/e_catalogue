import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {StyleRoomStackParamList} from '~/types';
import {images} from '~/assets';
import ContainerImage from '~/components/global/containerImage';
import HeaderAdmin from '~/components/global/headerAdmin';
import {HeightSize} from '~/theme/size';
import FullWidthImage from '~/components/global/fullWidthImage';
import {getUrl} from '~/utils';
import HeaderProduct from '~/components/global/headerProduct';
import {StackNavigationProp} from '@react-navigation/stack';

type Props = {
  route: RouteProp<StyleRoomStackParamList, 'AllImage'>;
};
const AllImage = ({route}: Props) => {
  const navigation =
    useNavigation<StackNavigationProp<StyleRoomStackParamList>>();
  return (
    <ContainerImage
      isOpacity={true}
      style={{flex: 1}}
      resizeMode="cover"
      source={images.home.BackgroundHome}>
      <HeaderProduct
        isShowBottomBarWhenBack={false}
        title="Images"
        onPressBack={() => {
          navigation.goBack();
        }}
        showBag={false}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          gap: HeightSize(16),
        }}
        style={{
          marginTop: HeightSize(32),
        }}>
        {route.params.imgs.map((img, index) => {
          return <FullWidthImage key={img.id} source={getUrl(img.image)} />;
        })}
      </ScrollView>
    </ContainerImage>
  );
};

export default AllImage;

const styles = StyleSheet.create({});
