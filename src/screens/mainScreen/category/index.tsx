import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import ContainerImage from '~/components/global/containerImage';
import {images} from '~/assets';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '~/app/store';
import {SetCurrentDropDown} from '~/redux/reducers/globalSlice';
import {HeightSize} from '~/theme/size';
import CustomScrollView from '~/components/global/customScrollView';
import DropDownComponent from '~/components/global/dropDown';
import DropDown from '../home/components/dropDown';
import HeaderSearch from '~/components/global/headerSearch';
import CategoryList from './components/categoryList';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {HomeStackParamList} from '~/types';
import {DETAILSEARCHSCREEN, SEARCHSTACK} from '~/constants/routeNames';

const Category = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<StackNavigationProp<HomeStackParamList>>();

  const [isShowDropDown, setIsShowDropDown] = useState<boolean>(false);

  const dataCategory = [
    {
      id: '1',
      name: 'Clothing',
    },
  ];

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
          <DropDown setIsShow={setIsShowDropDown} />
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
