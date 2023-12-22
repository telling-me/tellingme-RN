import React from 'react';
import {ImageSourcePropType} from 'react-native';
import {WithLocalSvg} from 'react-native-svg';

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

import {EmotionList} from '~/data/emotion';

const EmotionIcon = ({
  emotion = '1',
  width = '24px',
  height = '24px',
}: {
  emotion: string | undefined;
  width?: string;
  height?: string;
}) => {
  return (
    <>
      <WithLocalSvg
        asset={EmotionList[emotion as string].icon as ImageSourcePropType}
        width={width}
        height={height}
      />
    </>
  );
};

export default EmotionIcon;
