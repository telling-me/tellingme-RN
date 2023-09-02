import React, {useEffect, useState} from 'react';
import {
  Alert,
  Pressable,
  SafeAreaView,
  StyleSheet,
  View,
  Animated,
  Easing,
  Image,
  ActivityIndicator,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {apis} from '~/api/apis';
import {RootStackParamList} from '../../App';
import {useTheme} from 'styled-components/native';
import {AtomText} from '~/components/atoms/styled';

// third party
import * as KakaoLogin from '@react-native-seoul/kakao-login';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StackScreenProps} from '@react-navigation/stack';
import {appleAuthAndroid} from '@invertase/react-native-apple-authentication';
import 'react-native-get-random-values';
import {v4 as uuid} from 'uuid';
import {WithLocalSvg} from 'react-native-svg';

// icons
import Apple from '~/assets/icons/Apple.svg';
import Kakao from '~/assets/icons/Kakao.svg';
import Logo from '~/assets/icons/Logo.svg';
import Circle from '~/assets/icons/Circle.svg';
import Config from 'react-native-config';

export type LoginScreenProps = StackScreenProps<RootStackParamList, 'Home'>;

const kakaoLogin = ({navigation}: LoginScreenProps) => {
  KakaoLogin.login()
    .then(data => {
      apis
        .checkUserInfo('kakao', data.accessToken, 'manual', '')
        .then(res => {
          AsyncStorage.setItem('socialId', res.data.socialId);
          AsyncStorage.setItem('accessToken', res.data.accessToken);
          AsyncStorage.setItem('socialLoginType', 'kakao');
          navigation.navigate('Main', {
            accessToken: res.data.accessToken,
            refreshToken: res.data.refreshToken,
          });
        })
        .catch(err => {
          console.log(data);
          if (err.response.status === 404) {
            navigation.navigate('SignUp', {
              socialId: err.response.data.socialId,
              socialLoginType: err.response.data.socialLoginType,
              token: data.accessToken,
            });
          } else {
            Alert.alert('로그인에 실패했습니다.');
          }
        });
    })
    .catch(error => {
      if (error.code === 'E_CANCELLED_OPERATION') {
        Alert.alert('Login Cancel', error.message);
      } else {
        Alert.alert(`Login Fail(code:${error.code})`, error.message);
      }
    });
};

const AppleLogin = async ({navigation}: LoginScreenProps) => {
  // Generate secure, random values for state and nonce
  const rawNonce = uuid();
  const state = uuid();
  const url = Config.APP_WEBVIEW_URL;

  // Configure the request
  appleAuthAndroid.configure({
    clientId: 'com.Client.tellingMe',
    redirectUri: `${url}/oauth/apple`,
    responseType: appleAuthAndroid.ResponseType.ALL,
    scope: appleAuthAndroid.Scope.ALL,
    nonce: rawNonce,
    state,
  });

  // Open the browser window for user sign in
  const response = await appleAuthAndroid.signIn();

  apis
    .checkUserInfo('apple', response.id_token as string, 'manual', '')
    .then(res => {
      AsyncStorage.setItem('socialId', res.data.socialId);
      AsyncStorage.setItem('accessToken', res.data.accessToken);
      AsyncStorage.setItem('socialLoginType', 'apple');
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
          token: response.id_token as string,
        });
      } else {
        Alert.alert('로그인에 실패했습니다.');
      }
    });
};

const Login = ({navigation}: LoginScreenProps) => {
  // true : 로그인 화면, false : 자동로그인
  const [isLogin, setIsLogin] = useState(false);
  const rotationValue = new Animated.Value(0);
  const translateYValue = new Animated.Value(0);
  const floatingDistance = 5; // 조정하여 원하는 떠다니는 거리 설정
  const rotation = rotationValue.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
  });
  const theme = useTheme();

  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      async function checkLogin() {
        const socialId = await AsyncStorage.getItem('socialId');
        const userToken = await AsyncStorage.getItem('accessToken');
        const socialLoginType = await AsyncStorage.getItem('socialLoginType');

        if (userToken && socialLoginType && socialId) {
          apis
            .checkUserInfo(socialLoginType, '', 'auto', socialId)
            .then(res => {
              navigation.reset({
                routes: [
                  {
                    name: 'Main',
                    params: {
                      accessToken: res.data.accessToken,
                      refreshToken: res.data.refreshToken,
                    },
                  },
                ],
              });
            })
            .catch(_err => {
              Alert.alert('자동 로그인에 실패했습니다.');
              setIsLogin(true);
            });
        } else {
          setIsLogin(true);
        }
      }
      checkLogin();

      return () => {
        setIsLogin(false);
      };
    }, []),
  );

  useEffect(() => {
    const startRotation = () => {
      rotationValue.setValue(0);
      Animated.loop(
        Animated.timing(rotationValue, {
          toValue: 360,
          duration: 8000, // Adjust the duration as needed
          easing: Easing.linear,
          useNativeDriver: true,
          isInteraction: false,
        }),
      ).start(() => {
        startRotation(); // Restart the rotation after each completion
      });
    };

    const startFloating = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(translateYValue, {
            toValue: floatingDistance,
            duration: 500,
            easing: Easing.inOut(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.timing(translateYValue, {
            toValue: 0,
            duration: 1000,
            easing: Easing.inOut(Easing.quad),
            useNativeDriver: true,
          }),
        ]),
      ).start(() => startFloating());
    };

    startRotation();
    startFloating();
  }, [isLogin]);

  const rotateAniStyle = {
    transform: [{rotate: rotation}],
  };
  const floatAniStyle = {
    transform: [{translateY: translateYValue}],
  };

  return (
    <SafeAreaView style={styles.Background}>
      <>
        <View style={styles.LogoBackground}>
          <Animated.View style={[styles.Center, rotateAniStyle]}>
            <WithLocalSvg asset={Circle} width={325} height={325} />
          </Animated.View>
          <Image
            source={require('~/assets/images/Bubble.png')}
            style={[styles.Center, styles.Bubble]}
          />
          <WithLocalSvg
            style={styles.Center}
            asset={Logo}
            width={234}
            height={98}
          />
          <View style={styles.BubbleView}>
            <Animated.View style={[styles.Center, styles.S1, floatAniStyle]}>
              <Image source={require('~/assets/images/Bubble1.png')} />
            </Animated.View>
            <Animated.View style={[styles.Center, styles.S2, floatAniStyle]}>
              <Image source={require('~/assets/images/Bubble2.png')} />
            </Animated.View>
            <Animated.View style={[styles.Center, styles.S3, floatAniStyle]}>
              <Image source={require('~/assets/images/Bubble3.png')} />
            </Animated.View>
            <Animated.View style={[styles.Center, styles.S4, floatAniStyle]}>
              <Image source={require('~/assets/images/Bubble4.png')} />
            </Animated.View>
          </View>
          <View style={styles.LogoTitleView}>
            <AtomText typo="b1" textColor="logo">
              하루 한 번,
            </AtomText>
            <View style={styles.LogoBottomTextView}>
              <AtomText typo="b1" textColor="logo">
                질문에 답변하며
              </AtomText>
              <AtomText typo="b1_b" textColor="logo">
                나를 깨닫는 시간
              </AtomText>
            </View>
          </View>
        </View>
        <View style={styles.LoginModal}>
          <View style={styles.LoginTitle}>
            <AtomText typo="h5" textColor="gray_black">
              하루 한 번,
            </AtomText>
            <AtomText typo="h5" textColor="gray_black">
              질문에 답변하며
            </AtomText>
            <AtomText typo="h5_b" textColor="gray_black">
              나를 깨닫는 시간
            </AtomText>
          </View>
          <View style={styles.LoginButtonView}>
            {appleAuthAndroid.isSupported && (
              <Pressable
                style={styles.AppleButton}
                onPress={() => {
                  AppleLogin({navigation});
                }}>
                <View style={styles.LoginView}>
                  <WithLocalSvg asset={Apple} width={18} height={18} />
                  <AtomText typo="b1" textColor="white">
                    Apple로 계속하기
                  </AtomText>
                </View>
              </Pressable>
            )}
            <Pressable
              style={styles.KakaoButton}
              onPress={() => {
                kakaoLogin({navigation});
              }}>
              <View style={styles.LoginView}>
                <WithLocalSvg
                  asset={Kakao}
                  width={18}
                  height={18}
                  fill={'#ffffff'}
                />
                <AtomText typo="b1" textColor="black">
                  카카오로 계속하기
                </AtomText>
              </View>
            </Pressable>
          </View>
        </View>
      </>
      {!isLogin && (
        <View style={[styles.Center, styles.Bg]}>
          <ActivityIndicator size="large" color={theme.colors.logo} />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Background: {
    height: '100%',
    backgroundColor: '#FFFDFA',
  },
  LogoBackground: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    bottom: 50,
  },
  LogoTitleView: {display: 'flex', gap: 8, alignItems: 'center', top: 138},
  LogoBottomTextView: {display: 'flex', flexDirection: 'row', gap: 4},
  Bubble: {},
  Center: {
    position: 'absolute',
  },
  Bg: {
    width: '100%',
    height: '100%',
    backgroundColor: '#a8a8a879',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  BubbleView: {
    position: 'relative',
  },
  S1: {
    top: 110,
    left: -170,
  },
  S2: {top: 50, left: 110},
  S3: {top: -120, left: -155},
  S4: {top: -80, left: 117},
  LoginModal: {
    width: '100%',
    borderTopLeftRadius: 42,
    borderTopRightRadius: 42,
    backgroundColor: 'white',
    paddingTop: 40,
    paddingBottom: 80,
    paddingHorizontal: 25,
    shadowOffset: {width: 0, height: 4},
    shadowColor: '#000000',
    elevation: 20,
    shadowOpacity: 0.64,

    position: 'absolute',
    bottom: 0,

    display: 'flex',
    gap: 72,
  },
  LoginTitle: {display: 'flex', gap: 6},
  LoginButtonView: {
    display: 'flex',
    gap: 12,
  },
  KakaoButton: {
    width: '100%',
    height: 46,
    backgroundColor: '#fee500',
    borderRadius: 8,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  AppleButton: {
    width: '100%',
    height: 46,
    backgroundColor: '#000000',
    borderRadius: 8,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  LoginView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
});

export default Login;
