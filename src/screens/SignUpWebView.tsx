import React, {useEffect, useRef, useState} from 'react';
import WebView from 'react-native-webview';
import {Alert, BackHandler} from 'react-native';
import {WebViewNativeEvent} from 'react-native-webview/lib/WebViewTypes';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../../App';
import {apis} from '~/api/apis';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from 'react-native-config';

export type SignUpScreenProps = StackScreenProps<RootStackParamList, 'SignUp'>;

const SignUpWebView = ({route, navigation}: SignUpScreenProps) => {
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
  }, [navState?.canGoBack]);

  const postWebViewState = () => {
    ref.current?.postMessage(
      JSON.stringify({
        socialId: route.params.socialId,
        socialLoginType: route.params.socialLoginType,
        device: 'android',
      }),
    );
  };

  const handleMessage = (message: any) => {
    const data = JSON.parse(message.nativeEvent.data);

    switch (data?.event) {
      case 'signUpComplete':
        // 회원가입 후 로그인 하기
        apis
          .checkUserInfo(
            route.params.socialLoginType,
            route.params.token as string,
            'manual',
            '',
          )
          .then(res => {
            AsyncStorage.setItem('socialId', res.data.socialId);
            AsyncStorage.setItem('accessToken', res.data.accessToken);
            AsyncStorage.setItem(
              'socialLoginType',
              route.params.socialLoginType,
            );
            navigation.navigate('Main', {
              accessToken: res.data.accessToken,
              refreshToken: res.data.refreshToken,
            });
          })
          .catch(err => {
            if (err.response.status === 404) {
              navigation.navigate('SignUp', {
                socialId: err.response.data.socialId,
                socialLoginType: err.response.data.socialLoginType,
                token: route.params.token,
              });
            } else {
              Alert.alert('로그인에 실패했습니다.');
            }
          });
        break;
      case 'login':
        navigation.navigate('Login');
        break;
      default:
        navigation.navigate('Login');
        break;
    }
  };

  return (
    <WebView
      source={{uri: `${url}/signup`}}
      ref={ref}
      onNavigationStateChange={e => setNavState(e)}
      onLoadStart={postWebViewState}
      onMessage={handleMessage}
    />
  );
};

export default SignUpWebView;
