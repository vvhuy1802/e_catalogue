import React, {useCallback, useState} from 'react';
import {
  Image,
  ImageBackground,
  ImageStyle,
  Pressable,
  StyleProp,
  Text,
  View,
} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {HeightSize, WidthSize} from '~/theme/size';

export default function FullWidthImage(props: {
  source: any;
  ratio?: number;
  style?: StyleProp<ImageStyle>;
  children?: any;
  retangles?: {
    size: {
      widthImage: number;
      heightImage: number;
    };
    shapes: Array<{
      minX: number;
      minY: number;
      maxX: number;
      maxY: number;
      info: any;
    }>;
  };
  onPress?: (e: any) => void;
  onPressIn?: (e: any) => void;
  onPressOut?: (e: any) => void;
}) {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [visible, setVisible] = useState(false);

  const onLayout = useCallback(
    (event: any) => {
      const containerWidth = event.nativeEvent.layout.width;
      if (props.ratio) {
        setWidth(containerWidth);
        setHeight(containerWidth * props.ratio);
      } else if (typeof props.source === 'number') {
        const source = Image.resolveAssetSource(props.source);
        setWidth(containerWidth);
        setHeight((containerWidth * source.height) / source.width);
      } else if (typeof props.source === 'object') {
        Image.getSize(props.source.uri, (w, h) => {
          setWidth(containerWidth);
          setHeight((containerWidth * h) / w);
        });
      }
    },
    [props.ratio, props.source],
  );

  return (
    <Pressable
      onPress={() => {
        setVisible(!visible);
      }}
      onPressIn={props.onPressIn}
      onPressOut={props.onPressOut}
      onLayout={onLayout}>
      <ImageBackground
        source={props.source}
        style={[{width, height}, props.style]}
        resizeMode="contain">
        {props.children}
      </ImageBackground>
      {props.retangles && (
        // <Svg
        //   style={[
        //     {
        //       position: 'absolute',
        //       zIndex: 1,
        //       width: width,
        //       height: height,
        //     },
        //     props.style,
        //   ]}>
        //   {props.retangles.shapes.map(
        //     (
        //       retangle: {
        //         minX: number;
        //         minY: number;
        //         maxX: number;
        //         maxY: number;
        //         info?: string;
        //       },
        //       index: React.Key | null | undefined,
        //     ) => (
        //       <Path
        //         key={index}
        //         d={`M${WidthSize(retangle.minX)},${WidthSize(
        //           retangle.minY,
        //         )} L ${WidthSize(retangle.maxX)},${WidthSize(
        //           retangle.minY,
        //         )} L ${WidthSize(retangle.maxX)},${WidthSize(
        //           retangle.maxY,
        //         )} L ${WidthSize(retangle.minX)},${WidthSize(
        //           retangle.maxY,
        //         )} L ${WidthSize(retangle.minX)},${WidthSize(retangle.minY)}`}
        //         stroke="#EF6556"
        //         strokeWidth={4}
        //         fill={'none'}
        //       />
        //     ),
        //   )}
        // </Svg>

        <View
          style={[
            {
              display: visible ? 'flex' : 'none',
              position: 'absolute',
              zIndex: 1,
              width: width,
              height: height,
            },
            props.style,
          ]}>
          {
            <View
              style={{
                position: 'absolute',
                zIndex: 1,
                width: width,
                height: height,
              }}>
              {props.retangles.shapes.map(
                (
                  retangle: {
                    minX: number;
                    minY: number;
                    maxX: number;
                    maxY: number;
                    info?: string;
                  },
                  index: React.Key | null | undefined,
                ) => (
                  <Pressable
                    key={index}
                    onPress={() => {
                      console.log(retangle.info);
                    }}
                    style={{
                      position: 'absolute',
                      zIndex: 1,
                      width: WidthSize(retangle.maxX - retangle.minX),
                      height: WidthSize(retangle.maxY - retangle.minY),
                      left: WidthSize(retangle.minX),
                      top: WidthSize(retangle.minY),
                      backgroundColor: 'rgba(0, 0, 0, 0.3)',
                      borderRadius: 8,
                    }}>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: WidthSize(12),
                        textAlign: 'center',
                        padding: WidthSize(10),
                      }}>
                      {retangle.info}
                    </Text>
                  </Pressable>
                ),
              )}
            </View>
          }
        </View>
      )}
    </Pressable>
  );
}
