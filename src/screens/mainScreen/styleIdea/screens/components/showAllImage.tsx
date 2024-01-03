import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import ContainerImage from '~/components/global/containerImage';
import {images} from '~/assets';
import {StyleIdeaStackParamList} from '~/types';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {IconSvg} from '~/components/global/iconSvg';
import {HeightSize} from '~/theme/size';
import {StackNavigationProp} from '@react-navigation/stack';
import FullWidthImage from '~/components/global/fullWidthImage';
import {getUrl} from '~/utils';
import HeaderProduct from '~/components/global/headerProduct';

type Props = {
  route: RouteProp<StyleIdeaStackParamList, 'AllImage'>;
};
const ShowAllImage = ({route}: Props) => {
  const navigationStyleIdea =
    useNavigation<StackNavigationProp<StyleIdeaStackParamList, 'AllImage'>>();
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
          navigationStyleIdea.goBack();
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

export default ShowAllImage;
