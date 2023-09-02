import {MouseEventHandler} from 'react';
import {ColorType, TextTypoType} from '~/type/common';

export type ButtonType =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'fourth'
  | 'noFilled'
  | 'logo';

export interface IAtomButtonStyle {
  buttonType: ButtonType;
  text?: string;
  typo?: TextTypoType;
  textColor?: ColorType;
  _active?: boolean;
  _width?: string;
  _height?: string;
  _margin?: string;
  _padding?: string;
  _disabled?: boolean;
  _onClick?: MouseEventHandler<HTMLButtonElement>;
}

export interface IAtomButton extends IAtomButtonStyle {}

export interface IAtomIconButtonStyle extends IAtomButtonStyle {}
