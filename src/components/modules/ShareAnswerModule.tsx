import React from 'react';
import styled, {useTheme} from 'styled-components/native';
import {AtomText} from '~/components/atoms/styled';
import {Shadow} from 'react-native-shadow-2';
import {WithLocalSvg} from 'react-native-svg';

// utils
import useFormatDateArrToStr from '~/utils/useFormatDateArrToStr';

// icon
import EmotionIcon from './EmotionIcon';
import Logo from '~/assets/icons/Logo.svg';

export interface ShareAnswerModuleProps {
  title?: string | undefined;
  phrase?: string | undefined;
  date?: string[] | undefined;
  emotion?: string | undefined;
  content?: string | undefined;
}

const ShareAnswerModule = ({
  title,
  phrase,
  date,
  emotion,
  content,
}: ShareAnswerModuleProps) => {
  const theme = useTheme();
  return (
    <Background>
      <Shadow
        style={{borderRadius: 24}}
        offset={[0, 4]}
        startColor="#00000014"
        safeRender>
        <CardView>
          <CardHeader>
            <EmotionIcon emotion={emotion} width="56px" height="56px" />
            <AtomText
              style={{textAlign: 'center'}}
              typo="b2_b"
              textColor="gray7">
              {title}
            </AtomText>
            <AtomText style={{textAlign: 'center'}} typo="c" textColor="gray5">
              {phrase}
            </AtomText>
            <AtomText style={{textAlign: 'center'}} typo="c" textColor="black">
              {content}
            </AtomText>
          </CardHeader>

          <CardFooter>
            <WithLocalSvg
              asset={Logo}
              width={53}
              height={22}
              color={theme.colors.gray.gray3}
            />
            <AtomText typo="c" textColor="gray5">
              {useFormatDateArrToStr(
                date?.map(v => Number(v)) as number[],
                '.',
              )}
            </AtomText>
          </CardFooter>
        </CardView>
      </Shadow>
    </Background>
  );
};

const Background = styled.View`
  width: 100%;
  height: 100%;
  background-color: ${({theme}) => theme.colors.side.side100};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CardView = styled.View`
  width: 302px;
  height: 478px;
  padding: 32px 28px;
  background-color: ${({theme}) => theme.colors.side.side100};
  border-radius: 24px;

  display: flex;
  justify-content: space-between;
  gap: 20px;
`;

const CardHeader = styled.View`
  width: 100%;
  display: flex;
  align-items: center;

  gap: 20px;
`;

const CardFooter = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export default ShareAnswerModule;
