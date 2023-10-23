import React from 'react';
import {SafeAreaView, StatusBar, useColorScheme, View} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Provider} from 'react-redux';
import {store} from './src/app/store';
import HomeScreen from './src/screens/home';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <Provider store={store}>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar backgroundColor={'transparent'} translucent={true} />
        <View className="flex w-screen h-screen justify-center items-center">
          <HomeScreen />
        </View>
      </SafeAreaView>
    </Provider>
  );
}

export default App;
