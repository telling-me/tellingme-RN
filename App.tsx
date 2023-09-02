/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React, {useState} from 'react';

import {ThemeProvider} from 'styled-components';
import {Theme} from './src/styles/DefaultTheme';

import LottieView from 'lottie-react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import Login from './src/screens/Login';
import MainWebView from '~/screens/MainWebView';
import SignUpWebView from '~/screens/SignUpWebView';

const Stack = createStackNavigator();

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Main: {accessToken: string; refreshToken: string};
  SignUp: {socialId: string; socialLoginType: string; token: string};
};

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
          }}
          initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Main" component={MainWebView} />
          <Stack.Screen name="SignUp" component={SignUpWebView} />
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
