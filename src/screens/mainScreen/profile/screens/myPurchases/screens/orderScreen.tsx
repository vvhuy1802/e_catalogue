import {StyleSheet, Text, View, useWindowDimensions} from 'react-native';
import React, {useCallback} from 'react';
import {images} from '~/assets';
import ContainerImage from '~/components/global/containerImage';
import HeaderAdmin from '~/components/global/headerAdmin';
import {Route, TabBar, TabView} from 'react-native-tab-view';
import {HeightSize, width} from '~/theme/size';
import {TextStyle, TextFont} from '~/theme/textStyle';
import CancelledScreen from '../components/cancelledScreen';
import DeliveredScreen from '../components/deliveredScreen';
import DeliveringScreen from '../components/deliveringScreen';
import PendingScreen from '../components/pendingScreen';

const MyPurchases = () => {
  const [index, setIndex] = React.useState(0);
  const initialRoutes = [
    {key: 'first', title: 'Pending'},
    {key: 'second', title: 'Delivering'},
    {key: 'third', title: 'Delivered'},
    {key: 'fourth', title: 'Cancelled'},
  ];
  const renderScene = ({route}: {route: Route}) => {
    switch (route.key) {
      case 'first': {
        return <PendingScreen />;
      }
      case 'second': {
        return <DeliveringScreen />;
      }
      case 'third': {
        return <DeliveredScreen />;
      }
      case 'fourth': {
        return <CancelledScreen />;
      }
      default:
        return null;
    }
  };
  const renderTabBar = useCallback(
    (props: any) => (
      <TabBar
        {...props}
        indicatorStyle={{
          backgroundColor: '#836E44',
          height: HeightSize(2),
          borderRadius: 8,
        }}
        indicatorContainerStyle={{
          bottom: 0,
          position: 'absolute',
          width: '100%',
          backgroundColor: '#EFEFE852',
          height: HeightSize(2),
          marginTop: HeightSize(50),
          borderRadius: 8,
        }}
        style={{
          backgroundColor: 'transparent',
          height: HeightSize(50),
        }}
        renderLabel={({route, focused}) => (
          <Text
            style={[
              {
                ...TextStyle.Base,
                ...TextFont.SMedium,
                color: focused ? '#836E44' : '#A5A5B5',
              },
            ]}>
            {route.title}
          </Text>
        )}
      />
    ),
    [index],
  );
  return (
    <ContainerImage
      isOpacity={true}
      style={{flex: 1}}
      resizeMode="cover"
      source={images.home.BackgroundHome}>
      <HeaderAdmin title="Order Screen" isShow={false} />
      <TabView
        navigationState={{index, routes: initialRoutes}}
        renderScene={renderScene}
        onIndexChange={index => {
          setIndex(index);
        }}
        renderTabBar={renderTabBar}
        initialLayout={{width}}
      />
    </ContainerImage>
  );
};

export default MyPurchases;

const styles = StyleSheet.create({});
