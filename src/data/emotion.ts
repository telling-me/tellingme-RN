import {ImageSourcePropType} from 'react-native';

// Emotion Icons
import EmotionAngry from '~/assets/icons/EmotionAngry.svg';
import EmotionComplicated from '~/assets/icons/EmotionComplicated.svg';
import EmotionExcited from '~/assets/icons/EmotionExcited.svg';
import EmotionHappy from '~/assets/icons/EmotionHappy.svg';
import EmotionLethargic from '~/assets/icons/EmotionLethargic.svg';
import EmotionLonely from '~/assets/icons/EmotionLonely.svg';
import EmotionMeh from '~/assets/icons/EmotionMeh.svg';
import EmotionProud from '~/assets/icons/EmotionProud.svg';
import EmotionRelaxed from '~/assets/icons/EmotionRelaxed.svg';
import EmotionSad from '~/assets/icons/EmotionSad.svg';
import EmotionThrilled from '~/assets/icons/EmotionThrilled.svg';
import EmotionTired from '~/assets/icons/EmotionTired.svg';

export interface IEmotionData {
  description: string;
  icon: ImageSourcePropType;
  membership: boolean;
}

export const EmotionList: Record<string, IEmotionData> = {
  '1': {
    icon: EmotionHappy,
    description: '행복해요',
    membership: false,
  },
  '2': {
    icon: EmotionProud,
    description: '뿌듯해요',
    membership: false,
  },
  '3': {
    icon: EmotionMeh,
    description: '그저 그래요',
    membership: false,
  },
  '4': {
    icon: EmotionTired,
    description: '피곤해요',
    membership: false,
  },
  '5': {
    icon: EmotionSad,
    description: '슬퍼요',
    membership: false,
  },
  '6': {
    icon: EmotionAngry,
    description: '화나요',
    membership: false,
  },
  '7': {
    icon: EmotionExcited,
    description: '설레요',
    membership: true,
  },
  '8': {
    icon: EmotionThrilled,
    description: '신나요',
    membership: true,
  },
  '9': {
    icon: EmotionRelaxed,
    description: '편안해요',
    membership: true,
  },
  '10': {
    icon: EmotionLethargic,
    description: '무기력해요',
    membership: true,
  },
  '11': {
    icon: EmotionLonely,
    description: '외로워요',
    membership: true,
  },
  '12': {
    icon: EmotionComplicated,
    description: '복잡해요',
    membership: true,
  },
};
