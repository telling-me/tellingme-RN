/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React, {useState} from 'react';
import type {PropsWithChildren} from 'react';
import LottieView from 'lottie-react-native';
import {ThemeProvider} from 'styled-components';
import {Theme} from './src/styles/DefaultTheme';
import {WebView} from 'react-native-webview';
import FullWebView from './src/screens/FullWebView';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
const Stack = createStackNavigator();

function App(): JSX.Element {
  const [isSplash, setIsSplash] = useState(true);

  StatusBar.setBackgroundColor(Theme.colors.side.side100);
  StatusBar.setBarStyle('dark-content');

  return isSplash ? (
    <ThemeProvider theme={Theme}>
      <SafeAreaView style={styles.splashSafeAreaView}>
        <StatusBar />
        <LottieView
          style={styles.splashView}
          source={require('./src/assets/animations/Splash.json')}
          autoPlay
          loop={false}
          resizeMode="cover"
          onAnimationFinish={() => {
            setIsSplash(false);
          }}
        />
      </SafeAreaView>
    </ThemeProvider>
  ) : (
    <ThemeProvider theme={Theme}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Home" component={FullWebView} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  splashSafeAreaView: {
    backgroundColor: Colors.lighter,
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  splashView: {
    width: '100%',
    height: '100%',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
