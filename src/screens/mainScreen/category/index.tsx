import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import ContainerImage from '~/components/global/containerImage';
import {images} from '~/assets';
import {useSharedValue} from 'react-native-reanimated';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '~/app/store';
import {
  SetCurrentDropDown,
  SetDirectionBottomBar,
} from '~/redux/reducers/globalSlice';
import {HeightSize} from '~/theme/size';
import CustomScrollView from '~/components/global/customScrollView';
import DropDownComponent from '~/components/global/dropDown';
import DropDown from '../home/components/dropDown';
import HeaderSearch from '~/components/global/headerSearch';
import CategoryList from './components/categoryList';

const Category = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [isShowDropDown, setIsShowDropDown] = useState<boolean>(false);

  const dataCategory = [
    {
      id: '1',
      name: 'Clothing',
    },
  ];

  return (
    <ContainerImage
      isOpacity={true}
      style={{flex: 1}}
      resizeMode="cover"
      source={images.home.BackgroundHome}>
      <View
        style={{
          flex: 1,
        }}>
        <CustomScrollView>
          <DropDown setIsShow={setIsShowDropDown} />
          <HeaderSearch title="Category" onPress={() => {}}></HeaderSearch>
          <CategoryList />
        </CustomScrollView>
      </View>
      <DropDownComponent
        isShow={isShowDropDown}
        onPress={(item: any) => {
          dispatch(SetCurrentDropDown(item));
          setIsShowDropDown(false);
        }}
      />
    </ContainerImage>
  );
};

export default Category;

const styles = StyleSheet.create({});
