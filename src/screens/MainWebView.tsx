import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {useTheme} from 'styled-components';
import WebView from 'react-native-webview';
import {
  BackHandler,
  Pressable,
  View,
  StyleSheet,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import {WebViewNativeEvent} from 'react-native-webview/lib/WebViewTypes';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList, getToken} from '../../App';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from 'react-native-config';
import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import Share, {ShareSingleOptions, Social} from 'react-native-share';
import {AtomText} from '~/components/atoms/styled';
import ViewShot from 'react-native-view-shot';
import ShareAnswerModule, {
  ShareAnswerModuleProps,
} from '~/components/modules/ShareAnswerModule';
import ShareMyLibraryModule from '~/components/modules/ShareMyLibraryModule';
import {IData} from '~/components/modules/library/Week';
import Toast from 'react-native-toast-message';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import messaging from '@react-native-firebase/messaging';

// api
import {apis} from '~/api/apis';
import PushNotificationModal from '~/components/modules/PushNotificationModal';

export type MainScreenProps = StackScreenProps<RootStackParamList, 'Main'>;

const MainWebView = ({route, navigation}: MainScreenProps) => {
  const ref = useRef<WebView>(null);
  const url = Config.APP_WEBVIEW_URL;
  const [navState, setNavState] = useState<WebViewNativeEvent>();
  const [answerData, setAnswerData] = useState<ShareAnswerModuleProps>();
  const [questionData, setQuestionData] = useState<ShareAnswerModuleProps>();
  const [myLibraryData, setMyLibraryData] = useState<IData[]>([]);
  const [myLibraryDate, setMyLibraryDate] = useState<string>('');
  const [displayOn, setDisplayOn] = useState<boolean>(false);
  const [notificationOn, setNotificationOn] = useState<boolean>(false); // fcm
  const [shareType, setShareType] = useState<string>('');
  const [shareEvent, setShareEvent] = useState<string>('');
  const theme = useTheme();

  const subscribeFcmToken = async () => {
    getToken().then(fcmToken => apis.updateUserPushToken(fcmToken));
  };

  useEffect(() => {
    //fcm useEffect
    AsyncStorage.getItem('notification_push').then(res => {
      if (res !== 'true') {
        // 한 번도 보지 않은 사람들에게만 띄움
        setNotificationOn(true);
      }
    });
    subscribeFcmToken(); // login 시 fcm token update
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('[Remote Message] ', JSON.stringify(remoteMessage));
    });
    return unsubscribe;
  }, []);

  const showSuccessToast = (text: string) => {
    Toast.show({
      type: 'success',
      text1: text,
    });
  };

  const showErrorToast = (text: string) => {
    Toast.show({
      type: 'error',
      text1: text,
    });
  };

  useEffect(() => {
    const onPress = () => {
      if (navState?.canGoBack) {
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
  }, [navState, navigation]);

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

    switch (data?.event) {
      case 'logout':
        AsyncStorage.removeItem('socialId');
        AsyncStorage.removeItem('accessToken');
        AsyncStorage.removeItem('socialLoginType');
        navigation.reset({routes: [{name: 'Login'}]});
        break;
      case 'withdraw':
        AsyncStorage.removeItem('socialId');
        AsyncStorage.removeItem('accessToken');
        AsyncStorage.removeItem('socialLoginType');
        navigation.reset({routes: [{name: 'Login'}]});
        break;
      case 'share':
        setShareEvent('share');
        handlePresentModalPress();
        apis.getMyAnswer(data?.date as string).then(res => {
          setAnswerData(res.data);
        });

        apis.getQuestion(data?.date as string).then(res => {
          setQuestionData(res.data);
        });
        break;
      case 'share_mylibrary':
        setShareEvent('share_mylibrary');
        handlePresentModalPress();
        console.log(data.date);
        apis
          .getMyAnswerList(
            (new Date(data?.date).getMonth() + 1).toString(),
            new Date(data?.date).getFullYear().toString(),
          )
          .then(res => {
            setMyLibraryData(res.data);
            setMyLibraryDate(data?.date);
          });
        break;
    }
  };

  // snapPoints
  const snapPoints = useMemo(() => ['25%'], []);

  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const viewShotRef = useRef<ViewShot>(null);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  // permission check - camera
  async function hasAndroidPermission() {
    const getCheckPermissionPromise = () => {
      if (Number(Platform.Version) >= 33) {
        return Promise.all([
          PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          ),
          PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
          ),
        ]).then(
          ([hasReadMediaImagesPermission, hasReadMediaVideoPermission]) =>
            hasReadMediaImagesPermission && hasReadMediaVideoPermission,
        );
      } else {
        return PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        );
      }
    };

    const hasPermission = await getCheckPermissionPromise();
    if (hasPermission) {
      return true;
    }
    const getRequestPermissionPromise = () => {
      if (Number(Platform.Version) >= 33) {
        return PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
        ]).then(
          statuses =>
            statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES] ===
              PermissionsAndroid.RESULTS.GRANTED &&
            statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO] ===
              PermissionsAndroid.RESULTS.GRANTED,
        );
      } else {
        return PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        ).then(status => status === PermissionsAndroid.RESULTS.GRANTED);
      }
    };

    return await getRequestPermissionPromise();
  }

  // share 하기
  useEffect(() => {
    const captureAndShare = async () => {
      const uri = await viewShotRef.current?.capture?.();

      if (uri) {
        const shareOptions: ShareSingleOptions = {
          backgroundImage: `${uri}`,
          backgroundBottomColor: theme.colors.side.side100,
          backgroundTopColor: theme.colors.side.side100,
          social: Share.Social.INSTAGRAM_STORIES as Social,
          appId: '314518827793677',
        };

        try {
          await Share.shareSingle(shareOptions).then(res => {
            res.success === true && setDisplayOn(false);
          });
        } catch (error) {
          showErrorToast('인스타그램이 설치되어있지 않습니다.');
          setDisplayOn(false);
        }
      }
    };

    const captureAndSave = async () => {
      const uri = await viewShotRef.current?.capture?.();

      const onSave = async () => {
        if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
          showErrorToast('갤러리 권한이 없습니다.');
          setDisplayOn(false);
          return;
        }

        if (uri) {
          await CameraRoll.save(uri as string).then(() =>
            showSuccessToast('저장되었습니다.'),
          );
        }
        setDisplayOn(false);
      };
      onSave();
    };

    const captureAndOther = async () => {
      const uri = await viewShotRef.current?.capture?.();
      try {
        await Share.open({
          title: '공유하기',
          message: '공유하기',
          url: uri,
          type: 'image/jpeg',
        }).then(() => {
          showSuccessToast('공유되었습니다.');
          setDisplayOn(false);
        });
      } catch (error) {
        setDisplayOn(false);
      }
    };

    if (displayOn) {
      setTimeout(() => {
        switch (shareType) {
          case 'image':
            captureAndSave();
            break;
          case 'story':
            captureAndShare();
            break;
          case 'other':
            captureAndOther();
            break;
          default:
            break;
        }
      }, 500);
    }
  }, [displayOn]);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        pressBehavior="close"
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    ),
    [],
  );

  return (
    <>
      {displayOn && (
        <ViewShot ref={viewShotRef}>
          {shareEvent === 'share' && (
            <ShareAnswerModule {...questionData} {...answerData} />
          )}
          {shareEvent === 'share_mylibrary' && (
            <ShareMyLibraryModule datas={myLibraryData} date={myLibraryDate} />
          )}
        </ViewShot>
      )}

      <View style={styles.container}>
        <WebView
          source={{uri: `${url}/app/main`}}
          ref={ref}
          onNavigationStateChange={e => setNavState(e)}
          onLoadStart={postWebViewState}
          onMessage={handleMessage}
          onLoadEnd={postWebViewRefresh}
        />
        <BottomSheetModalProvider>
          <BottomSheetModal
            ref={bottomSheetModalRef}
            snapPoints={snapPoints}
            index={0}
            backdropComponent={renderBackdrop}>
            <View style={styles.shareBottomSheet}>
              <Pressable
                style={styles.shareBottomPressable}
                onPress={() => {
                  setShareType('image');
                  setDisplayOn(true);
                }}>
                <AtomText typo="b1" textColor="gray8">
                  이미지로 저장하기
                </AtomText>
              </Pressable>

              <Pressable
                style={styles.shareBottomPressable}
                onPress={() => {
                  setShareType('story');
                  setDisplayOn(true);
                }}>
                <AtomText typo="b1" textColor="gray8">
                  인스타 스토리로 공유하기
                </AtomText>
              </Pressable>

              <Pressable
                style={styles.shareBottomPressable}
                onPress={() => {
                  setShareType('other');
                  setDisplayOn(true);
                }}>
                <AtomText typo="b1" textColor="gray8">
                  다른 방법으로 공유하기
                </AtomText>
              </Pressable>
            </View>
          </BottomSheetModal>
        </BottomSheetModalProvider>
      </View>
      <PushNotificationModal
        isVisible={notificationOn}
        setVisible={setNotificationOn}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  shareBottomSheet: {
    flex: 1,
  },
  shareBottomPressable: {
    paddingHorizontal: 28,
    paddingVertical: 20,
  },
});

export default MainWebView;
