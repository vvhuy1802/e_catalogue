import {View, Text, ScrollView, StyleProp, ViewStyle} from 'react-native';
import React from 'react';
import {useSharedValue} from 'react-native-reanimated';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '~/app/store';
import {SetDirectionBottomBar} from '~/redux/reducers/globalSlice';
import {HeightSize} from '~/theme/size';

type CustomScrollViewProps = {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
};

const CustomScrollView: React.FC<CustomScrollViewProps> = ({
  children,
  style,
  contentContainerStyle,
}) => {
  const lastContentOffset = useSharedValue(0);
  const isScrolling = useSharedValue(false);
  const translateY = useSharedValue(0);
  const dispatch = useDispatch<AppDispatch>();
  return (
    <ScrollView
      scrollEventThrottle={16}
      onScroll={event => {
        if (
          lastContentOffset.value > event.nativeEvent.contentOffset.y &&
          isScrolling.value
        ) {
          if (translateY.value === 100) {
            translateY.value = 0;
            dispatch(SetDirectionBottomBar('up'));
            console.log('scrolling up');
          }
        } else if (
          lastContentOffset.value < event.nativeEvent.contentOffset.y &&
          isScrolling.value
        ) {
          if (translateY.value === 0) {
            translateY.value = 100;
            dispatch(SetDirectionBottomBar('down'));
            console.log('scrolling down');
          }
        }
        lastContentOffset.value = event.nativeEvent.contentOffset.y;
      }}
      onScrollBeginDrag={() => {
        isScrolling.value = true;
      }}
      onScrollEndDrag={() => {
        isScrolling.value = false;
      }}
      style={[
        {
          flex: 1,
        },
        style,
      ]}
      contentContainerStyle={contentContainerStyle}
      showsVerticalScrollIndicator={false}>
      {children}
    </ScrollView>
  );
};

export default CustomScrollView;
