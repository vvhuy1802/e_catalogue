import React, {useCallback, useState} from 'react';
import {
  Image,
  ImageBackground,
  ImageStyle,
  StyleProp,
  View,
} from 'react-native';

export default function FullWidthImage(props: {
  source: any;
  ratio?: number;
  style?: StyleProp<ImageStyle>;
  children?: any;
}) {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

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
    <View onLayout={onLayout}>
      <ImageBackground
        source={props.source}
        style={[{width, height}, props.style]}
        resizeMode="contain">
        {props.children}
      </ImageBackground>
    </View>
  );
}
