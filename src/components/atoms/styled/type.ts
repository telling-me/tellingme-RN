import {ColorType, TextTypoType} from '~/type/common';

export interface IAtomTextStyle {
  typo?: TextTypoType;
  textColor?: ColorType;
  _margin?: string;
  _width?: string;
  ellipsis?: boolean;
  wordBreak?: 'break-all' | 'break-word' | 'keep-all' | 'normal';
  textAlign?:
    | 'start'
    | 'end'
    | 'left'
    | 'right'
    | 'center'
    | 'justify'
    | 'match-parent';
}

export interface IAtomText extends IAtomTextStyle {
  text: string;
}

export interface IAtomViewStyle {
  flex?: 'start' | 'end' | 'between' | 'center';
  flexOption?: string;
  direction?: 'column' | 'row' | 'column-reverse' | 'row-reverse';
  _alignItems?: 'start' | 'end' | 'center' | 'stretch';
  wrap?: 'wrap' | 'nowrap';
  _width?: string;
  _margin?: string;
  _padding?: string;
  _height?: string;
  align?: 'left' | 'center' | 'right';
  _gap?: string;
  _overflow?: 'hidden' | 'visible' | 'auto' | 'overlay';
}
