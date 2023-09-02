import {userApi} from './userApi';
import {questionApi} from './questionApi';
import {answerApi} from './answerApi';

export const apis = {
  ...userApi,
  ...questionApi,
  ...answerApi,
};
