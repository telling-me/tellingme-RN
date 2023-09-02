import styled, {css} from 'styled-components/native';
import {ColorType} from '~/type/common';
import useChangeColor from '~/utils/useChangeColor';
import {IAtomTextStyle} from './type';

export const AtomText = styled.Text<IAtomTextStyle>`
  ${({_width}) => _width != null && `width: ${_width}`};
  ${({_margin}) => _margin != null && `margin: ${_margin}`};
  ${({textAlign}) => textAlign != null && `text-align: ${textAlign}`};
  ${({wordBreak}) => wordBreak != null && `word-break: ${wordBreak}`};
  ${({theme, typo}) =>
    typo === 'h1_b' ||
    typo === 'h1' ||
    typo === 'h2_b' ||
    typo === 'h2' ||
    typo === 'h3_b' ||
    typo === 'h3' ||
    typo === 'h4_b' ||
    typo === 'h4' ||
    typo === 'h5_b' ||
    typo === 'h5' ||
    typo === 'h6_b' ||
    typo === 'h6'
      ? theme.typo.title[typo]
      : typo === 'b1_b' || typo === 'b1' || typo === 'b2_b' || typo === 'b2'
      ? theme.typo.body[typo]
      : (typo === 'c_b' || typo === 'c') && theme.typo.caption[typo]};
  ${({textColor}) =>
    css`
      color: ${useChangeColor(textColor as ColorType)};
    `};
  ${({ellipsis}) =>
    (ellipsis ?? false) &&
    css`
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    `};
`;
