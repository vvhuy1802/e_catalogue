import {View, FlatList, ScrollView, Pressable} from 'react-native';
import {width, WidthSize, HeightSize, height} from '~/theme/size';
import FullWidthImage from '../fullWidthImage';
import React from 'react';
import {StyleIdeaResponse} from '~/types/styleIdea';
import {getUrl} from '~/utils';

type Props = {
  data: StyleIdeaResponse[];
  widthView: number;
  onPress?: (item: StyleIdeaResponse) => void;
};
const CustomListView = ({data, widthView, onPress}: Props) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        height: '100%',
      }}>
      <FlatList
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        data={data}
        keyExtractor={(item, index) => index.toString()}
        style={{
          width: widthView,
          height: height,
          marginBottom: HeightSize(32),
        }}
        contentContainerStyle={{
          paddingBottom: HeightSize(16),
        }}
        renderItem={({item, index}) =>
          index % 2 === 0 ? (
            <Pressable
              onPress={() => {
                onPress && onPress(item);
              }}>
              <FullWidthImage
                widthNeed={widthView}
                key={index}
                style={{
                  marginBottom: HeightSize(16),
                }}
                imageStyle={{
                  borderRadius: 20,
                }}
                source={getUrl(item.mainImage)}
              />
            </Pressable>
          ) : null
        }
      />
      <FlatList
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        data={data}
        keyExtractor={(item, index) => index.toString()}
        style={{
          width: widthView,
          height: height,
          marginBottom: HeightSize(32),
        }}
        contentContainerStyle={{
          paddingBottom: HeightSize(16),
          alignSelf: 'flex-end',
        }}
        renderItem={({item, index}) =>
          index % 2 === 1 ? (
            <Pressable
              onPress={() => {
                onPress && onPress(item);
              }}>
              <FullWidthImage
                widthNeed={widthView}
                key={index}
                style={{
                  marginBottom: HeightSize(16),
                }}
                imageStyle={{
                  borderRadius: 20,
                }}
                source={getUrl(item.mainImage)}
              />
            </Pressable>
          ) : null
        }
      />
    </View>
  );
};

export default CustomListView;
