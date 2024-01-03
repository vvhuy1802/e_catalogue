import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {IconSvg} from '~/components/global/iconSvg';
import {HeightSize, WidthSize} from '~/theme/size';
import {TextStyle, TextFont} from '~/theme/textStyle';
import {StackNavigationProp} from '@react-navigation/stack';
import {SearchStackParamList} from '~/types';
import {DETAILSEARCHSCREEN} from '~/constants/routeNames';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch} from '~/app/store';
import {
  SetDirectionBottomBar,
  selectCurrentDropDown,
} from '~/redux/reducers/globalSlice';
import {AppProvider} from '~/app/appProvider';

type Props = {
  navigation: StackNavigationProp<SearchStackParamList, 'SearchScreen'>;
};
const SearchBar = ({navigation}: Props) => {
  const [textSearch, setTextSearch] = React.useState<string>('');
  const currentDropDown = useSelector(selectCurrentDropDown);
  const dispatch = useDispatch<AppDispatch>();
  const handleSearch = async () => {
    if (textSearch.trim() === '') return;
    AppProvider.setHistorySearch(textSearch);
    dispatch(SetDirectionBottomBar('down'));
    navigation.navigate(DETAILSEARCHSCREEN, {
      searchQuery: textSearch,
    });
  };

  return (
    <View
      style={{
        paddingTop: HeightSize(26),
        paddingLeft: WidthSize(32),
      }}>
      <View
        style={{
          paddingRight: WidthSize(24),
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          height: HeightSize(56),
        }}>
        <View
          style={{
            flex: 1,
            height: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#EFEFE8',
            borderRadius: 12,
            paddingLeft: WidthSize(20),
          }}>
          <IconSvg
            icon="IconSearchBrown"
            width={WidthSize(20)}
            height={WidthSize(20)}
          />
          <TextInput
            style={{
              flex: 1,
              height: '100%',
              marginLeft: WidthSize(16),
              color: 'black',
              ...TextFont.SMedium,
              paddingRight: WidthSize(20),
            }}
            value={textSearch}
            onChangeText={setTextSearch}
            onEndEditing={handleSearch}
            placeholder={`Search in ${currentDropDown.title}`}
            placeholderTextColor="#CCCCD0"
          />
        </View>
        <Pressable
          onPress={() => {
            navigation.goBack();
            dispatch(SetDirectionBottomBar('up'));
          }}>
          <Text
            style={{
              color: '#3B3021',
              marginLeft: WidthSize(24),
              ...TextStyle.Base,
              ...TextFont.SBold,
            }}>
            Cancel
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({});
