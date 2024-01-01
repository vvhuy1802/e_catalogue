import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {HeightSize, WidthSize} from '~/theme/size';
import {TextStyle, TextFont} from '~/theme/textStyle';
import {getUrl} from '~/utils';
import {RootCategory} from '~/types/category';
import {IconSvg} from '~/components/global/iconSvg';

type Props = {
  category: RootCategory;
  height?: number;
  marginLeft?: number;
  level?: number;
};
const CategoryItem = ({
  category,
  height = HeightSize(110),
  marginLeft = 0,
  level = 0,
}: Props) => {
  const [isShowItem, setIsShowItem] = React.useState(false);
  return (
    <View>
      <Pressable
        onPress={() => setIsShowItem(!isShowItem)}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          overflow: 'hidden',
          height: height,
          backgroundColor: '#F0EFE9',
          borderRadius: 20,
          marginLeft: marginLeft * level,
        }}>
        <View
          style={{
            width: WidthSize(110),
            height: '100%',
            alignSelf: 'flex-end',
            position: 'absolute',
            right: 0,
            bottom: 0,
            alignItems: 'flex-end',
            justifyContent: 'center',
          }}>
          {category.image ? (
            <Image
              style={{
                width: '100%',
                height: '100%',
              }}
              resizeMode="contain"
              source={getUrl(category.image)}
            />
          ) : (
            <IconSvg
              style={{
                marginRight: HeightSize(32),
              }}
              width={HeightSize(32)}
              height={HeightSize(32)}
              icon="IconAddImageBrown"
            />
          )}
        </View>
        <View
          style={{
            position: 'absolute',
            left: HeightSize(32),
            flexDirection: 'row',
          }}>
          {level < 2 ? (
            <IconSvg
              width={HeightSize(32)}
              height={HeightSize(32)}
              icon={isShowItem ? 'IconArrowDownBlack' : 'IconArrowRightBlack'}
            />
          ) : null}
          <Text
            style={{
              color: '#3B3021',
              ...TextStyle.XL,
              ...TextFont.SBold,
            }}>
            {category.name}
          </Text>
        </View>
      </Pressable>
      <View
        style={{
          marginTop: HeightSize(10),
        }}>
        {isShowItem &&
          category.children.length > 0 &&
          category.children.map((item, index) => (
            <CategoryItem
              key={index}
              category={item}
              marginLeft={HeightSize(32)}
              level={level + 1}
            />
          ))}
      </View>
    </View>
  );
};

export default CategoryItem;

const styles = StyleSheet.create({});
