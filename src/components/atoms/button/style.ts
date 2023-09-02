import styled, {css} from 'styled-components/native';
import {IAtomButtonStyle, IAtomIconButtonStyle} from './type';

export const ButtonWrapper = styled.Pressable<IAtomButtonStyle>`
  ${({_width}) => _width !== undefined && `width: ${_width};`}
  ${({_height}) => _height !== undefined && `height: ${_height};`}
  ${({_margin}) => _margin !== undefined && `margin: ${_margin};`}
  ${({_padding}) => _padding !== undefined && `padding: ${_padding};`}

  ${props =>
    props.buttonType === 'primary' &&
    css`
      background-color: ${props => props.theme.colors.primary.primary100};

      &:hover {
        background-color: ${props => props.theme.colors.primary.primary100};
        box-shadow: ${props => props.theme.shadow.shadow1};
      }

      &:active {
        background-color: ${props => props.theme.colors.primary.primary300};
      }

      &:disabled {
        background-color: ${props => props.theme.colors.gray.gray2};
        box-shadow: none;
      }
    `}

  ${props =>
    props.buttonType === 'secondary' &&
    css`
      background-color: ${props => props.theme.colors.primary.primary25};

      &:hover {
        background-color: ${props => props.theme.colors.primary.primary25};
        box-shadow: ${props => props.theme.shadow.shadow1};
      }

      &:active {
        background-color: ${props => props.theme.colors.primary.primary300};
      }

      &:disabled {
        background-color: ${props => props.theme.colors.gray.gray1};
        box-shadow: none;
      }
    `}

${props =>
    props.buttonType === 'tertiary' &&
    css`
      background-color: ${props => props.theme.colors.side.side200};

      &:hover {
        background-color: ${props => props.theme.colors.side.side200};
        box-shadow: ${props => props.theme.shadow.shadow1};
      }

      &:active {
        background-color: ${props => props.theme.colors.secondary.secondary300};
      }

      &:disabled {
        background-color: ${props => props.theme.colors.gray.gray1};
        box-shadow: none;
      }
    `}

${props =>
    props.buttonType === 'fourth' &&
    css`
      background-color: ${props => props.theme.colors.secondary.secondary200};

      &:hover {
        background-color: ${props => props.theme.colors.secondary.secondary200};
        box-shadow: ${props => props.theme.shadow.shadow1};
      }

      &:active {
        background-color: ${props => props.theme.colors.secondary.secondary700};
      }

      &:disabled {
        background-color: ${props => props.theme.colors.secondary.secondary25};
        box-shadow: none;
      }
    `}

${props =>
    props.buttonType === 'logo' &&
    css`
      background: ${props => props.theme.gradient.default_gradient()};
      box-shadow: ${({theme}) => theme.shadow.shadow2};
    `}

${props =>
    props.buttonType === 'noFilled' &&
    css`
      padding: 0;
    `}
`;

export const IconButtonWrapper = styled.Pressable<IAtomIconButtonStyle>``;
