import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ContainerView from '~/components/global/containerView';
import {images} from '~/assets';
import ContainerImage from '~/components/global/containerImage';

const HomeScrren = () => {
  return (
    <ContainerView>
      <SafeAreaView style={{flex: 1}}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
          }}>
          <Text style={{color: 'black'}}>HomeScrren</Text>
        </View>
      </SafeAreaView>
    </ContainerView>
  );
};

export default HomeScrren;

const styles = StyleSheet.create({});
