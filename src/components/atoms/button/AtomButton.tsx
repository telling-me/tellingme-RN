import React from 'react';
import {ButtonWrapper} from './style';
import {IAtomButton} from './type';
import {AtomText} from '../styled';

const AtomButton = ({
  buttonType = 'primary',
  text,
  typo,
  textColor,
  _width,
  _height,
  _margin,
  _padding,
  _active,
  _disabled = false,
  _onClick,
}: IAtomButton) => {
  return (
    <ButtonWrapper
      buttonType={buttonType}
      _active={_active}
      _width={_width}
      _height={_height}
      _margin={_margin}
      _padding={_padding}
      disabled={_disabled}
      _onClick={e => {
        if (_onClick === undefined) {
          return;
        }
        _onClick(e);
      }}>
      <AtomText typo={typo} textColor={textColor}>
        {text}
      </AtomText>
    </ButtonWrapper>
  );
};

export default AtomButton;
