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

type Props = {
  route: RouteProp<StyleIdeaStackParamList, 'AllImage'>;
};
const ShowAllImage = ({route}: Props) => {
  const navigationStyleIdea =
    useNavigation<StackNavigationProp<StyleIdeaStackParamList, 'AllImage'>>();
  const onGoBack = () => {
    navigationStyleIdea.goBack();
  };
  return (
    <ContainerImage
      isOpacity={true}
      style={{flex: 1}}
      resizeMode="cover"
      source={images.home.BackgroundHome}>
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
            height: HeightSize(40),
            borderTopRightRadius: 36,
            borderBottomRightRadius: 36,
            backgroundColor: '#EFEFE8',
            marginTop: HeightSize(2),
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
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          {route.params.arrayImages.map((item, index) => {
            return (
              <FullWidthImage
                style={{
                  marginTop: HeightSize(10),
                }}
                source={item.url}
                key={index}
              />
            );
          })}
        </View>
      </ScrollView>
    </ContainerImage>
  );
};

export default ShowAllImage;
