import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {images} from '~/assets';
import ContainerImage from '~/components/global/containerImage';
import HeaderProduct from '~/components/global/headerProduct';
import {StackNavigationProp} from '@react-navigation/stack';
import {OrderStackParamList} from '~/types';
import {useNavigation} from '@react-navigation/native';
import {TextFont, TextStyle} from '~/theme/textStyle';
import {width} from '~/theme/size';

const EditAddress = () => {
  const navigation =
    useNavigation<StackNavigationProp<OrderStackParamList, 'EditAddress'>>();

  return (
    <ContainerImage
      style={{flex: 1}}
      resizeMode="cover"
      source={images.home.BackgroundHome}>
      <HeaderProduct
        onPressBack={() => navigation.goBack()}
        title=""
        showBag={false}
        children={
          <Text
            style={{
              ...TextStyle.text3XL,
              ...TextFont.GRegular,
            }}>
            Edit Address
          </Text>
        }
      />
      <Pressable
        onPress={() => navigation.navigate('AddAddress')}
        style={{
          width: '100%',
          backgroundColor: 'red',
          paddingVertical: 10,
          alignItems: 'center',
        }}>
        <Text>Add new address</Text>
      </Pressable>
    </ContainerImage>
  );
};

export default EditAddress;

const styles = StyleSheet.create({});
