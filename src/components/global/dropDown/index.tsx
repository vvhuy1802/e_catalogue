import {
  Image,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {images} from '~/assets';
import {selectCurrentDropDown} from '~/redux/reducers/globalSlice';
import {HeightSize, WidthSize} from '~/theme/size';

type DropDownComponentProps = {
  style?: StyleProp<ViewStyle>;
  onPress: (item: any) => void;
  isShow: boolean;
};
const DropDownComponent = ({
  style,
  onPress,
  isShow,
}: DropDownComponentProps) => {
  const dataDropDown = [
    {
      id: 1,
      name: 'man',
      title: 'Men',
      img: images.home.DropDownMan,
    },
    {
      id: 2,
      name: 'woman',
      title: 'Woman',
      img: images.home.DropDownWoman,
    },
    {
      id: 3,
      name: 'boy',
      title: 'Boy',
      img: images.home.DropDownBoy,
    },
    {
      id: 4,
      name: 'girl',
      title: 'Girl',
      img: images.home.DropDownGirl,
    },
  ];
  const currentDropDown = useSelector(selectCurrentDropDown);
  return (
    isShow && (
      <Pressable
        onPress={() => onPress(currentDropDown)}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
        }}>
        <View
          style={[
            {
              width: HeightSize(160),
              backgroundColor: '#F0EEE8',
              borderRadius: 20,
              position: 'absolute',
              marginTop: HeightSize(150),
              marginLeft: WidthSize(32),
            },
            style,
          ]}>
          {dataDropDown.map((item, index) => {
            return item.id !== currentDropDown.id ? (
              <Pressable
                onPress={() => {
                  onPress(item);
                }}
                key={index}
                style={{
                  padding: HeightSize(8),
                  width: HeightSize(160),
                }}>
                <Image
                  source={item.img}
                  style={{
                    width: HeightSize(64),
                    height: HeightSize(64),
                    borderRadius: 40,
                  }}
                />
              </Pressable>
            ) : null;
          })}
        </View>
      </Pressable>
    )
  );
};

export default DropDownComponent;

const styles = StyleSheet.create({});
