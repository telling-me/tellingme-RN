import {useTheme} from 'styled-components';
import {ColorType} from '~/type/common';

const useChangeColor = (color: ColorType) => {
  const theme = useTheme();
  return Object.keys(theme.colors.primary).includes(color)
    ? theme.colors.primary[color]
    : Object.keys(theme.colors.secondary).includes(color)
    ? theme.colors.secondary[color]
    : Object.keys(theme.colors.gray).includes(color)
    ? theme.colors.gray[color]
    : Object.keys(theme.colors.error).includes(color)
    ? theme.colors.error[color]
    : Object.keys(theme.colors.side).includes(color)
    ? theme.colors.side[color as keyof typeof theme.colors.side]
    : color === 'logo'
    ? theme.colors.logo
    : color === 'white'
    ? '#ffffff'
    : color === 'black'
    ? '#000000'
    : color === 'gradient' && theme.gradient;
};

export default useChangeColor;
