import React from 'react';
import {View} from 'react-native';
import Modal from 'react-native-modal';
import {AtomText} from '../atoms/styled/AtomText';
import styled from 'styled-components/native';
import {WithLocalSvg} from 'react-native-svg';
import {AtomButton} from '../atoms/button';
import {apis} from '~/api/apis';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getToken} from '../../../App';

// icons
import BellRinging from '~/assets/icons/BellRinging.svg';

const PushNotificationModal = ({
  isVisible,
  setVisible,
}: {
  isVisible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <Modal
      isVisible={isVisible}
      hideModalContentWhileAnimating={true}
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <CardView>
        <View style={{gap: 8}}>
          <AtomText typo="b1" textColor="gray7" style={{textAlign: 'center'}}>
            하루 한번 정오에 알림을 드려도 될까요?
          </AtomText>
          <AtomText typo="b2" textColor="gray7" style={{textAlign: 'center'}}>
            매일 기록을 잊지 않게 해드릴게요!
          </AtomText>
        </View>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <WithLocalSvg asset={BellRinging} width={87} height={97} />
        </View>
        <AtomButton
          buttonType={'secondary'}
          text="좋아요"
          _padding="18px 32px"
          textColor="logo"
          _onClick={() => {
            getToken().then(token => {
              apis.updatePush(true, token);
              setVisible(false);
            });
          }}
        />
        <AtomButton
          buttonType={'noFilled'}
          text="괜찮아요"
          textColor="gray5"
          _onClick={() => {
            AsyncStorage.setItem('notification_push', 'true');
            setVisible(false);
          }}
        />
      </CardView>
    </Modal>
  );
};

const CardView = styled.View`
  width: 325px;
  height: 362px;
  padding: 32px 28px;
  background-color: ${({theme}) => theme.colors.side.side100};
  border-radius: 24px;

  display: flex;
  justify-content: space-between;
  gap: 20px;
`;

export default PushNotificationModal;
