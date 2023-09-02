import React, {useEffect, useRef, useState} from 'react';
import WebView from 'react-native-webview';
import {BackHandler} from 'react-native';
import {WebViewNativeEvent} from 'react-native-webview/lib/WebViewTypes';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../../App';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from 'react-native-config';

export type MainScreenProps = StackScreenProps<RootStackParamList, 'Main'>;

const MainWebView = ({route, navigation}: MainScreenProps) => {
  const ref = useRef<WebView>(null);
  const url = Config.APP_WEBVIEW_URL;
  const [navState, setNavState] = useState<WebViewNativeEvent>();

  useEffect(() => {
    const canGoBack = navState?.canGoBack;

    const onPress = () => {
      if (canGoBack) {
        ref?.current?.goBack();
        return true;
      } else {
        return false;
      }
    };

    BackHandler.addEventListener('hardwareBackPress', onPress);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onPress);
    };
  }, [navState?.canGoBack, navigation]);

  const postWebViewState = () => {
    ref.current?.postMessage(
      JSON.stringify({
        accessToken: route.params.accessToken,
        refreshToken: route.params.refreshToken,
        device: 'android',
      }),
    );
  };
  const postWebViewRefresh = () => {
    ref.current?.postMessage(JSON.stringify('refresh'));
  };

  const handleMessage = (message: any) => {
    const data = JSON.parse(message.nativeEvent.data);

    if (data === 'logout') {
      AsyncStorage.removeItem('socialId');
      AsyncStorage.removeItem('accessToken');
      AsyncStorage.removeItem('socialLoginType');
      navigation.reset({routes: [{name: 'Login'}]});
    } else if (data === 'withdraw') {
      AsyncStorage.removeItem('socialId');
      AsyncStorage.removeItem('accessToken');
      AsyncStorage.removeItem('socialLoginType');
      navigation.reset({routes: [{name: 'Login'}]});
    }
  };

  return (
    <WebView
      source={{uri: `${url}/app/main`}}
      ref={ref}
      onNavigationStateChange={e => setNavState(e)}
      onLoadStart={postWebViewState}
      onMessage={handleMessage}
      onLoadEnd={postWebViewRefresh}
    />
  );
};

export default MainWebView;
