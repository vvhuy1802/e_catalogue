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

type V = {
  id: number;
  size: string;
  color: string;
  image: string;
  price: number;
  quantity: number;
  product: {
    id: number;
    name: string;
    description: string;
    image: string;
    minPrice: number;
    maxPrice: number;
    store: {
      id: number;
      name: string;
      description: string;
      address: number;
      logo_image: string;
      cover_image: string;
      approved: boolean;
    };
  };
};
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
      variant: V;
    }>;
  };
  onPress?: (e: any) => void;
  onPressIn?: (e: any) => void;
  onPressOut?: (e: any) => void;
}) {
  const [widthImg, setWidthImg] = useState(0);
  const [heightImg, setHeightImg] = useState(0);
  const [visible, setVisible] = useState(true);

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
    variant?: V;
  }) => {
    let left = 0;
    let top = 0;
    let topTriangle = 0;
    let leftTriangle = 0;
    let rotate = '0deg';
    if (retangle.minX > widthImg / 2) {
      if (retangle.maxX - widthImg / 2 > WidthSize(115)) {
        left = WidthSize(-110);
        top = WidthSize(-(HeightSize(60) - WidthSize(20)));
        topTriangle = (HeightSize(60) + WidthSize(20)) / 2 - 5;
        leftTriangle = WidthSize(95);
        rotate = '90deg';
      } else {
        left = WidthSize(15);
        top = WidthSize(-(HeightSize(60) - WidthSize(20)));
        topTriangle = (HeightSize(60) + WidthSize(20)) / 2 - 5;
        leftTriangle = -WidthSize(15);
        rotate = '-90deg';
      }
    } else {
      if (WidthSize(115) - retangle.maxX > 0) {
        left = WidthSize(5);
        top = WidthSize(-(HeightSize(60) - WidthSize(20)));
        topTriangle = (HeightSize(60) + WidthSize(20)) / 2 - 5;
        leftTriangle = WidthSize(-15);
        rotate = '-90deg';
      } else {
        left = WidthSize(-WidthSize(100) - 15);
        top = WidthSize(-(HeightSize(60) - WidthSize(20)));
        topTriangle = (HeightSize(60) + WidthSize(20)) / 2 - 5;
        leftTriangle = WidthSize(100) - 5;
        rotate = '90deg';
      }
    }

    return retangle.variant ? (
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
            {retangle.variant.product?.name}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              color: '#3B3021',
              ...TextFont.SMedium,
              ...TextStyle.SM,
              width: WidthSize(80),
            }}>
            Price: ${retangle.variant?.price}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              color: '#3B3021',
              ...TextFont.SMedium,
              ...TextStyle.SM,
              width: WidthSize(80),
            }}>
            Size: {retangle.variant?.size}
          </Text>
        </View>
      </View>
    ) : null;
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
                          variant?: V;
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
