import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {RootCategory} from '~/types/category';
import axios from 'axios';
import {images} from '~/assets';
import ContainerImage from '~/components/global/containerImage';
import HeaderAdmin from '~/components/global/headerAdmin';
import {HeightSize, WidthSize} from '~/theme/size';
import CategoryItem from './components/category';

const Category = () => {
  const [categories, setCategories] = useState<Array<RootCategory>>();

  useEffect(() => {
    axios
      .get('https://e-catalogue.abcdavid.top/product/category/all')
      .then(res => {
        setCategories(res.data);
      });
  }, []);

  return (
    <ContainerImage
      // isOpacity={true}
      style={{flex: 1}}
      resizeMode="cover"
      source={images.home.BackgroundHome}>
      <HeaderAdmin title="Categories" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            gap: HeightSize(16),
            marginTop: HeightSize(32),
            paddingHorizontal: WidthSize(16),
          }}>
          {categories?.map((category, index) => {
            return <CategoryItem category={category} key={index} level={0} />;
          })}
        </View>
      </ScrollView>
    </ContainerImage>
  );
};

export default Category;

const styles = StyleSheet.create({});
