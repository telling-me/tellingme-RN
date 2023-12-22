import React, {useEffect, useState} from 'react';
import styled, {useTheme} from 'styled-components/native';
import {AtomText} from '~/components/atoms/styled';
import {Shadow} from 'react-native-shadow-2';
import {WithLocalSvg} from 'react-native-svg';
import {View} from 'react-native';
import Week, {IData} from './library/Week';
// icon
import Logo from '~/assets/icons/Logo.svg';

export interface ILibraryData {
  exist: boolean;
  data: IData;
}

const ShareMyLibraryModule = ({
  datas,
  date,
}: {
  datas: IData[];
  date: string;
}) => {
  const theme = useTheme();
  const month = new Date(date).getMonth() + 1;

  const [day, setDay] = useState<ILibraryData[]>(
    new Array(31).fill(null).map(() => ({
      exist: false,
      data: {emotion: 0, title: '', phrase: '', date: [0, 0, 0], content: ''},
    })),
  );

  useEffect(() => {
    if (datas !== null || datas !== undefined) {
      const answerDay = new Array(31).fill(null).map(() => ({
        exist: false,
        data: {emotion: 0, title: '', phrase: '', date: [0, 0, 0], content: ''},
      }));
      datas?.forEach((answer: IData) => {
        answerDay[answer?.date[2] - 1].exist = true;
        answerDay[answer?.date[2] - 1].data = answer;
      });
      setDay([...answerDay]);
    }
  }, [datas]);

  return (
    <Background>
      <Shadow
        style={{borderRadius: 24}}
        offset={[0, 4]}
        startColor="#00000014"
        safeRender>
        <CardView>
          <View style={{marginBottom: 28}}>
            <AtomText typo="h5" _margin="0 0 8px 0">
              {month}월 한 달 동안
            </AtomText>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <AtomText typo="h5">총&nbsp;</AtomText>
              <AtomText typo="h5_b" textColor="logo">
                {datas?.length}
              </AtomText>
              <AtomText typo="h5">권을 채웠어요!</AtomText>
            </View>
          </View>
          <View
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              flexGrow: 1,
            }}>
            {Array.from({length: 5})
              .fill(0)
              .map((_, idx: number) => {
                return (
                  <Week
                    key={`${idx}`}
                    data={day.slice(idx * 7, idx * 7 + 7)}
                    week={idx + 1}
                  />
                );
              })}
          </View>
        </CardView>
      </Shadow>
      <CardAbsoluteFooter>
        <WithLocalSvg
          asset={Logo}
          width={70}
          height={28}
          color={theme.colors.gray.gray3}
        />
        <FooterText>@tellingme.io</FooterText>
      </CardAbsoluteFooter>
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
`;

const CardAbsoluteFooter = styled.View`
  position: absolute;
  bottom: 16px;

  align-items: center;
`;

const FooterText = styled.Text`
  font-family: 'NanumSquareRoundOTFR';
  font-size: 10px;
  font-weight: 700;
  line-height: 11px;
  color: ${({theme}) => theme.colors.gray.gray3};
  margin-top: 4px;
`;

export default ShareMyLibraryModule;
