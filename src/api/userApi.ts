import {API} from './api';

type SocialLoginType = 'kakao' | 'apple';

export interface IUserData {
  name: string;
  email: string;
}
export interface ILoginData {
  name: string;
  email: string;
}
export interface ITest {
  result: string;
}
export interface INewsLetterData {
  email: string;
  name: string;
  funnel: string;
}
export interface IKakaoTokenData {
  client_id: string;
  redirect_uri: string;
  code: string;
}
export interface IJoinResponseDto {
  birthDate: string | null;
  gender: string | null;
  job: number;
  jobInfo: string;
  nickname: string;
  purpose: string;
  socialId: string;
  socialLoginType: SocialLoginType;
}
export interface IUserInfoDto {
  birthDate: string | null;
  gender: string | null;
  job: number;
  jobInfo: string;
  mbti: string | null;
  nickname: string;
  purpose: string;
}
export const userApi = {
  signup: async (joinResponseDto: IJoinResponseDto) => {
    return await API.post('/api/oauth/join', joinResponseDto, {
      headers: {'Content-Type': 'application/json'},
    });
  },
  test: async () => {
    const data = await API.get('/');
    return data;
  },
  newsLetter: async (newsLetterData: INewsLetterData) => {
    return await API.post('/api/newsLetter', newsLetterData, {
      headers: {'Content-Type': 'application/json'},
    });
  },
  unsubscribeNewsLetter: async (email: string) =>
    await API.delete('/api/newsLetter', {data: {email}}),
  checkUserInfo: async (
    loginType: string,
    oauthToken: string | null,
    isAuto: string,
    socialId: string | null,
  ) => {
    return await API.post(
      `/api/oauth/${loginType}/${isAuto}`,
      {socialId},
      {
        headers: {'Content-Type': 'application/json', oauthToken},
      },
    );
  },
  checkNickname: async (nickname: string) => {
    return await API.post(
      '/api/oauth/nickname',
      {nickname},
      {
        headers: {'Content-Type': 'application/json'},
      },
    );
  },
  getUserInfo: async () => {
    return await API.get('/api/user');
  },
  getUserPush: async () => {
    return await API.get('/api/user/push');
  },
  getUserNoti: async () => {
    return await API.get('/api/user/notification');
  },
  postUserNoti: async () => {
    return await API.post(
      '/api/user/update/notification',
      {},
      {
        headers: {'Content-Type': 'application/json'},
      },
    );
  },
  patchUserInfo: async (userInfoDto: IUserInfoDto) => {
    return await API.patch('/api/user/update', userInfoDto);
  },
  deleteUser: async (code: string, socialType: string) => {
    // kakao일때는 ''로 보내야함
    return await API.post(
      `/api/oauth/withdraw/${socialType}`,
      {
        authorizationCode: code,
      },
      {
        headers: {'Content-Type': 'application/json'},
      },
    );
  },
  logout: async () => {
    return await API.post(
      '/api/oauth/logout',
      {},
      {
        headers: {'Content-Type': 'application/json'},
      },
    );
  },
  getUserPushToken: async () => {
    return await API.get('/api/user/pushToken');
  },
  updatePush: async (allowNotification: boolean, pushToken: string) => {
    return await API.post(
      '/api/user/update/push',
      {allowNotification, pushToken},
      {
        headers: {'Content-Type': 'application/json'},
      },
    );
  },
  updateUserPushToken: async (pushToken: string) => {
    return await API.post(
      '/api/user/update/pushToken',
      {pushToken},
      {
        headers: {'Content-Type': 'application/json'},
      },
    );
  },
};
