import styled, {css} from 'styled-components/native';
import {IAtomViewStyle} from './type';

export const AtomView = styled.View<IAtomViewStyle>`
  ${({_width}) =>
    _width != null
      ? css`
          width: ${_width};
        `
      : css`
          width: 100%;
        `};

  ${({_height}) =>
    _height != null &&
    css`
      height: ${_height};
    `};

  ${({_margin}) =>
    _margin != null &&
    css`
      margin: ${_margin};
    `};

  ${({_padding}) =>
    _padding != null &&
    css`
      padding: ${_padding};
    `};

  ${({theme, flex}) =>
    flex === 'start'
      ? theme.common.flexStart
      : flex === 'end'
      ? theme.common.flexEnd
      : flex === 'between'
      ? theme.common.flexBetween
      : flex === 'center' && theme.common.flexCenter};

  ${({_alignItems}) =>
    _alignItems === 'start'
      ? css`
          align-items: flex-start;
        `
      : _alignItems === 'end'
      ? css`
          align-items: flex-end;
        `
      : _alignItems === 'stretch'
      ? css`
          align-items: stretch;
        `
      : _alignItems === 'center' &&
        css`
          align-items: center;
        `};

  ${({direction}) =>
    direction != null &&
    css`
      flex-direction: ${direction};
    `};

  ${({wrap}) =>
    wrap === 'wrap' &&
    css`
      flex-wrap: wrap;
    `};

  ${({flexOption}) =>
    flexOption != null &&
    css`
      flex: ${flexOption};
    `};

  ${({align}) =>
    align === 'left'
      ? css`
          text-align: left;
        `
      : align === 'right'
      ? css`
          text-align: right;
        `
      : align === 'center' &&
        css`
          text-align: center;
        `};

  ${({_gap}) =>
    _gap != null &&
    css`
      gap: ${_gap};
    `};

  ${({_overflow}) =>
    _overflow != null &&
    css`
      overflow: ${_overflow};
    `};
`;
