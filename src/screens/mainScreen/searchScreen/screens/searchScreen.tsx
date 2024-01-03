import {
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React from 'react';
import {images} from '~/assets';
import ContainerImage from '~/components/global/containerImage';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {HomeStackParamList, SearchStackParamList} from '~/types';
import {HeightSize, WidthSize} from '~/theme/size';
import HistorySearch from '../components/history';
import CustomScrollView from '~/components/global/customScrollView';
import PopularSearch from '../components/popularSearch';
import SearchBar from '../components/searchBar';

const SearchScreen = () => {
  const navigation = useNavigation<StackNavigationProp<HomeStackParamList>>();
  const navigationSearch =
    useNavigation<StackNavigationProp<SearchStackParamList, 'SearchScreen'>>();

  return (
    <ContainerImage
      // isOpacity={true}
      onPress={() => {
        Keyboard.dismiss();
      }}
      style={{flex: 1}}
      resizeMode="cover"
      source={images.home.BackgroundHome}>
      <SearchBar navigation={navigationSearch} />
      <CustomScrollView>
        <Pressable
          style={{
            flex: 1,
            paddingLeft: WidthSize(32),
            paddingRight: WidthSize(24),
            paddingBottom: HeightSize(40),
          }}>
          <HistorySearch navigation={navigation} />
          <PopularSearch />
        </Pressable>
      </CustomScrollView>
    </ContainerImage>
  );
};

export default SearchScreen;
