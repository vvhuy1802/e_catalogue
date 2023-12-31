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
import {HeightSize, WidthSize, height, width} from '~/theme/size';
import {TextFont, TextStyle} from '~/theme/textStyle';

export default function FullWidthImage(props: {
  widthNeed?: number;
  source: any;
  ratio?: number;
  style?: StyleProp<ImageStyle>;
  imageStyle?: StyleProp<ImageStyle>;
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
  const [widthImg, setWidthImg] = useState(0);
  const [heightImg, setHeightImg] = useState(0);
  const [visible, setVisible] = useState(false);

  const onLayout = useCallback(
    (event: any) => {
      const containerWidth = props.widthNeed
        ? props.widthNeed
        : event.nativeEvent.layout.width;
      if (props.ratio) {
        setWidthImg(containerWidth);
        setHeightImg(containerWidth * props.ratio);
      } else if (typeof props.source === 'number') {
        const source = Image.resolveAssetSource(props.source);
        setWidthImg(containerWidth);
        setHeightImg((containerWidth * source.height) / source.width);
      } else if (typeof props.source === 'object') {
        Image.getSize(props.source.uri, (w, h) => {
          setWidthImg(containerWidth);
          setHeightImg((containerWidth * h) / w);
        });
      }
    },
    [props.ratio, props.source, props.widthNeed],
  );

  const renderTriangle = (top: number, left: number, rotate: string) => {
    return (
      <View
        style={{
          position: 'absolute',
          top: top,
          left: left,
          width: 0,
          height: 0,
          backgroundColor: 'transparent',
          borderStyle: 'solid',
          borderLeftWidth: 10,
          borderRightWidth: 10,
          borderBottomWidth: 10,
          borderLeftColor: 'transparent',
          borderRightColor: 'transparent',
          borderBottomColor: '#ffffffB3',
          transform: [{rotate: rotate}],
        }}
      />
    );
  };

  const renderInfoBox = (retangle: {
    minX: number;
    minY: number;
    maxX: number;
    maxY: number;
    info?: string;
  }) => {
    let left = WidthSize((retangle.maxX - retangle.minX) / 2 - 50);
    let top = WidthSize((retangle.maxY - retangle.minY) / 2);
    let topTriangle = -WidthSize(10);
    let leftTriangle = WidthSize(40);
    let rotate = '0deg';
    if (WidthSize(retangle.maxX) < WidthSize(80)) {
      left = WidthSize((retangle.maxX - retangle.minX) / 2 + 10);
      top = WidthSize((retangle.maxY - retangle.minY) / 2 - 10);
      topTriangle = WidthSize(30);
      leftTriangle = -WidthSize(15);
      rotate = '-90deg';
    }

    return (
      <View
        style={{
          backgroundColor: '#ffffffB3',
          position: 'absolute',
          width: WidthSize(100),
          height: HeightSize(60) + WidthSize(20),
          left: left,
          top: top,
          borderRadius: 8,
        }}>
        {renderTriangle(topTriangle, leftTriangle, rotate)}
        <View
          style={{
            padding: WidthSize(10),
            borderRadius: 8,
          }}>
          <Text
            numberOfLines={1}
            style={{
              color: '#3B3021',
              ...TextFont.SMedium,
              ...TextStyle.SM,
              width: WidthSize(80),
            }}>
            {retangle.info}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              color: '#3B3021',
              ...TextFont.SMedium,
              ...TextStyle.SM,
              width: WidthSize(80),
            }}>
            Price
          </Text>
          <Text
            numberOfLines={1}
            style={{
              color: '#3B3021',
              ...TextFont.SMedium,
              ...TextStyle.SM,
              width: WidthSize(80),
            }}>
            Size
          </Text>
        </View>
      </View>
    );
  };

  return (
    <>
      {props.onPress && props.onPressIn && props.onPressOut ? (
        <Pressable
          onPress={() => {
            setVisible(!visible);
          }}
          onPressIn={props.onPressIn}
          onPressOut={props.onPressOut}
          onLayout={onLayout}>
          <ImageBackground
            source={props.source}
            imageStyle={props.imageStyle}
            style={[
              {
                width: widthImg,
                height: heightImg,
              },
              props.style,
            ]}
            resizeMode="contain">
            {props.children}
            {props.retangles && (
              <View
                style={[
                  {
                    display: visible ? 'flex' : 'none',
                    position: 'absolute',
                    zIndex: 1,
                    width: widthImg,
                    height: heightImg,
                  },
                  props.style,
                ]}>
                {
                  <View
                    style={{
                      position: 'absolute',
                      zIndex: 1,
                      width: widthImg,
                      height: heightImg,
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
                            console.log(
                              retangle,
                              (retangle.maxX + retangle.minX) / 2,
                              (retangle.maxY + retangle.minY) / 2,
                            );
                          }}
                          style={{
                            position: 'absolute',
                            zIndex: 1,
                            width: WidthSize(retangle.maxX - retangle.minX),
                            height: WidthSize(retangle.maxY - retangle.minY),
                            left: WidthSize(retangle.minX),
                            top: WidthSize(retangle.minY),
                          }}>
                          {renderInfoBox(retangle)}
                        </Pressable>
                      ),
                    )}
                  </View>
                }
              </View>
            )}
          </ImageBackground>
        </Pressable>
      ) : (
        <View onLayout={onLayout}>
          <ImageBackground
            source={props.source}
            imageStyle={props.imageStyle}
            style={[
              {
                width: widthImg,
                height: heightImg,
              },
              props.style,
            ]}
            resizeMode="contain">
            {props.children}
          </ImageBackground>
        </View>
      )}
    </>
  );
}
