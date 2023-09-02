declare module 'react-native-config' {
  export interface NativeConfig {
    APP_API_URL?: string;
    APP_WEBVIEW_URL?: string;
    KAKAO_REST_API_KEY?: string;
    KAKAO_REDIRECT_REST_API_KEY?: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
