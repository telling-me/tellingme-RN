import React from 'react';
import {View} from 'react-native';
import styled from 'styled-components/native';
import {AtomText} from '~/components/atoms/styled';
import {ILibraryData} from '../ShareMyLibraryModule';
import useChangeColor from '~/utils/useChangeColor';

// icons
import LibraryProp1 from '~/assets/icons/LibraryProp1.svg';
import LibraryProp2 from '~/assets/icons/LibraryProp2.svg';
import {WithLocalSvg} from 'react-native-svg';
import {ColorType} from '~/type/common';

export interface IData {
  content: string;
  date: number[];
  emotion: number;
  phrase: string;
  title: string;
}

const Week = ({data, week}: {data: ILibraryData[]; week: number}) => {
  return (
    <LibraryWeekWrapper>
      <View style={{width: 33, justifyContent: 'center', gap: 2}}>
        <AtomText typo="c_b" textColor="side500" style={{alignSelf: 'center'}}>
          week
        </AtomText>
        <WeekBox>
          <AtomText typo="b2" textColor="side500">
            {week}
          </AtomText>
        </WeekBox>
      </View>
      <LibraryWrapper>
        <BookWrapper>
          {data.map((answer: ILibraryData, idx: number) => {
            console.log(answer.exist, answer);
            if (week === 5) {
              return (
                <>
                  {answer.exist && (
                    <Book
                      key={`${week}_${idx}`}
                      _backgroundColor={
                        answer.exist
                          ? `emotion${answer.data.emotion}00`
                          : 'side100'
                      }
                    />
                  )}
                </>
              );
            }
            return (
              <Book
                key={`${week}_${idx}`}
                _backgroundColor={
                  answer.exist ? `emotion${answer.data.emotion}00` : 'side100'
                }
              />
            );
          })}
          {week === 5 && (
            <>
              <View
                style={{
                  width: 36,
                  height: 44,
                  justifyContent: 'flex-end',
                }}>
                <WithLocalSvg asset={LibraryProp2} />
              </View>
              <View style={{width: 35, height: 44, justifyContent: 'flex-end'}}>
                <WithLocalSvg asset={LibraryProp1} />
              </View>
            </>
          )}
        </BookWrapper>
        <BookStand />
      </LibraryWrapper>
    </LibraryWeekWrapper>
  );
};

const LibraryWeekWrapper = styled(View)`
  flex-direction: row;
  gap: 24px;
`;

const WeekBox = styled(View)`
  background-color: ${({theme}) => theme.colors.side.side200};
  border-radius: 8px;

  padding: 4px 12px;
  width: max-content;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const BookWrapper = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  gap: 4;
  padding: 0 0 0 16px;
`;

const LibraryWrapper = styled(View)`
  width: 'max-content';
  display: flex;
`;

const BookStand = styled(View)`
  background-color: ${({theme}) => theme.colors.sub.sub100};

  width: 186px;
  height: 8px;
`;

const Book = styled(View)<{_backgroundColor: string}>`
  border-radius: 4px;

  width: 18px;
  height: 44px;
  background-color: ${({_backgroundColor}) =>
    useChangeColor(_backgroundColor as ColorType)};
`;

export default Week;
