import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {images} from '~/assets';
import ContainerImage from '~/components/global/containerImage';
import HeaderAdmin from '~/components/global/headerAdmin';
import {HeightSize, width} from '~/theme/size';
import {TextFont, TextStyle} from '~/theme/textStyle';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
const Revenue = () => {
  const data = {
    labels: ['Swim', 'Bike', 'Run'], // optional
    data: [0.4, 0.6, 0.8],
  };
  const datas = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
    ],
    // legend: ['Rainy Days'],
  };
  const chartConfig = {
    backgroundGradientFrom: 'transparent',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: 'transparent',
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(59, 48, 33, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };

  return (
    <ContainerImage
      isOpacity={true}
      style={{flex: 1}}
      resizeMode="cover"
      source={images.home.BackgroundHome}>
      <HeaderAdmin title="Revenue" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            marginTop: HeightSize(32),
            paddingHorizontal: HeightSize(16),
          }}>
          <Text
            style={{
              ...TextFont.SBold,
              ...TextStyle.XXL,
              color: '#3B3021',
            }}>
            Total Today
          </Text>
          <ProgressChart
            data={data}
            width={width - HeightSize(32)}
            height={220}
            strokeWidth={16}
            radius={32}
            chartConfig={chartConfig}
            hideLegend={false}
          />
        </View>
        <View
          style={{
            marginTop: HeightSize(32),
            paddingHorizontal: HeightSize(16),
          }}>
          <Text
            style={{
              ...TextFont.SBold,
              ...TextStyle.XXL,
              color: '#3B3021',
            }}>
            Top 5 Product
          </Text>
        </View>
        <View
          style={{
            marginTop: HeightSize(32),
            paddingHorizontal: HeightSize(16),
          }}>
          <Text
            style={{
              ...TextFont.SBold,
              ...TextStyle.XXL,
              color: '#3B3021',
            }}>
            Half Year Revenue
          </Text>
          <LineChart
            data={datas}
            width={width - HeightSize(32)}
            height={220}
            chartConfig={chartConfig}
            style={{
              marginTop: HeightSize(16),
            }}
          />
        </View>
      </ScrollView>
    </ContainerImage>
  );
};

export default Revenue;

const styles = StyleSheet.create({});
