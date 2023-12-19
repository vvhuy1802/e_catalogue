import {FlatList, ImageBackground, Text, View} from 'react-native';
import React from 'react';
import {HeightSize, WidthSize} from '~/theme/size';
import BlurBackground from '~/components/global/blurBackground';
import {TextFont, TextStyle} from '~/theme/textStyle';
import {useSelector} from 'react-redux';
import {
  selectAllCategories,
  selectLoadingGetAllCategories,
} from '~/redux/reducers/productSlice';
import {getUrl} from '~/utils';

const CardCategorySlide = () => {
  const allCategories = useSelector(selectAllCategories);
  const loadingGetCategories = useSelector(selectLoadingGetAllCategories);

  return (
    <View
      style={{
        marginTop: HeightSize(30),
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: WidthSize(30),
        }}>
        <Text
          style={{
            color: '#3B3021',
            ...TextStyle.XXXL,
            ...TextFont.GRegular,
          }}>
          Category
        </Text>
      </View>
      <FlatList
        style={{
          marginTop: HeightSize(20),
          paddingRight: HeightSize(20),
          height: WidthSize(200),
        }}
        data={loadingGetCategories === 'fulfilled' ? allCategories : []}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: WidthSize(30),
          gap: WidthSize(20),
        }}
        renderItem={({item}) => (
          <ImageBackground
            source={getUrl(item.imgage)}
            imageStyle={{borderRadius: 20}}
            style={{
              width: WidthSize(150),
              height: WidthSize(200),
              justifyContent: 'flex-end',
            }}>
            <View
              style={{
                height: HeightSize(44),
                width: WidthSize(150),
                justifyContent: 'center',
                backgroundColor: '#D8D2C414',
              }}>
              <BlurBackground
                // blurType="light"
                blurAmount={15}
                style={{
                  borderBottomLeftRadius: 20,
                  borderBottomRightRadius: 20,
                }}
              />
              <Text
                style={{
                  color: '#3B3021',
                  marginLeft: WidthSize(16),
                  ...TextFont.SMedium,
                  ...TextStyle.LG,
                }}>
                {item.name}
              </Text>
            </View>
          </ImageBackground>
        )}
      />
    </View>
  );
};

export default CardCategorySlide;
