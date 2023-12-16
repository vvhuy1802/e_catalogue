import {
  Alert,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {selectDemoImage} from '~/redux/reducers/globalSlice';
import path from 'path';
import Svg, {Path} from 'react-native-svg';
import ContainerView from '~/components/global/containerView';
import {HeightSize, width, WidthSize} from '~/theme/size';

const Favorite = () => {
  // const images = {
  //   image: {
  //     assets: [
  //       {
  //         fileSize: 2386884,
  //         height: 2000,
  //         uri: 'file:///var/mobile/Containers/Data/Application/0C7BFADA-7975-4D17-A86E-F2CF337025A2/tmp/DCF517BA-6263-4476-BE67-74102E7C93CC.jpg',
  //         type: 'image/jpg',
  //         fileName: 'DCF517BA-6263-4476-BE67-74102E7C93CC.jpg',
  //         width: 1499,
  //       },
  //     ],
  //   },
  //   width: 414,
  //   height: 552.368245496998,
  //   retangles: [
  //     {minX: 141.3333282470703, minY: 200, maxX: 316, maxY: 402, info: 'Heloo'},
  //   ],
  // };
  return (
    <ContainerView
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
      }}>
      {/* <Pressable
        onLongPress={e => {
          //check if the click is inside the rectangle
          const x = e.nativeEvent.locationX;
          const y = e.nativeEvent.locationY;
          console.log('x', x);
          console.log('y', y);
          images.retangles.forEach(retangle => {
            if (
              retangle.minX < x &&
              retangle.maxX > x &&
              retangle.minY < y &&
              retangle.maxY > y
            ) {
              Alert.alert('Rectangle', retangle.info);
            }
          });
        }}
        style={{
          width: WidthSize(images.width),
          height: HeightSize(images.height),
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Svg
          style={{
            position: 'absolute',
            zIndex: 1,
            width: WidthSize(images.width),
            height: HeightSize(images.height),
          }}>
          {images.retangles.map(
            (
              retangle: {
                minX: any;
                minY: any;
                maxX: any;
                maxY: any;
                info?: any;
              },
              index: React.Key | null | undefined,
            ) => (
              <Path
                key={index}
                d={`M${WidthSize(retangle.minX)},${WidthSize(
                  retangle.minY,
                )} L ${WidthSize(retangle.maxX)},${WidthSize(
                  retangle.minY,
                )} L ${WidthSize(retangle.maxX)},${WidthSize(
                  retangle.maxY,
                )} L ${WidthSize(retangle.minX)},${WidthSize(
                  retangle.maxY,
                )} L ${WidthSize(retangle.minX)},${WidthSize(retangle.minY)}`}
                stroke="#EF6556"
                strokeWidth={4}
                fill={'none'}
              />
            ),
          )}
        </Svg>
        <ImageBackground
          style={{
            width: '100%',
            height: HeightSize(images.height),
          }}
          resizeMode="contain"
          source={{uri: images.image.assets[0].uri}}
        />
      </Pressable> */}
    </ContainerView>
  );
};

export default Favorite;

const styles = StyleSheet.create({});
