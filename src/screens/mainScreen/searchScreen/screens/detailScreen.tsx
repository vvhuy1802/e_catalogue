import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {SearchStackParamList} from '~/types';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '~/app/store';
import {SetDirectionBottomBar} from '~/redux/reducers/globalSlice';
import {SEARCHSCREEN} from '~/constants/routeNames';

type Props = {
  route: RouteProp<SearchStackParamList, 'DetailSearchScreen'>;
};
const DetailScreen = ({route}: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation =
    useNavigation<
      StackNavigationProp<SearchStackParamList, 'DetailSearchScreen'>
    >();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      }}>
      <Pressable
        onPress={() => {
          // dispatch(SetDirectionBottomBar('up'));
          navigation.navigate(SEARCHSCREEN);
        }}>
        <Text>{route.params.searchQuery}</Text>
      </Pressable>
    </View>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({});
