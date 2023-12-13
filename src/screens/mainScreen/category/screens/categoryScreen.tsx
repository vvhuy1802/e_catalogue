import {StyleSheet, View} from 'react-native';
import React from 'react';
import ContainerImage from '~/components/global/containerImage';
import {images} from '~/assets';
import {HeightSize} from '~/theme/size';
import CustomScrollView from '~/components/global/customScrollView';
import HeaderSearch from '~/components/global/headerSearch';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {HomeStackParamList} from '~/types';
import {SEARCHSTACK} from '~/constants/routeNames';
import Cart from '~/components/global/cart';
import CategoryList from '../components/categoryList';

const Category = () => {
  const navigation = useNavigation<StackNavigationProp<HomeStackParamList>>();
  return (
    <ContainerImage
      // isOpacity={true}
      style={{flex: 1}}
      resizeMode="cover"
      source={images.home.BackgroundHome}>
      <View
        style={{
          flex: 1,
        }}>
        <CustomScrollView
          style={{
            marginTop: HeightSize(10),
          }}>
          <Cart />
          <HeaderSearch
            title="Category"
            onPress={() => {
              navigation.navigate(SEARCHSTACK, {
                screen: 'SearchScreen',
              });
            }}
          />
          <CategoryList />
        </CustomScrollView>
      </View>
    </ContainerImage>
  );
};

export default Category;

const styles = StyleSheet.create({});
