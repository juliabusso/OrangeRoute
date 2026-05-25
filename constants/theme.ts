/**
 * Below are the colors that are used in the app.
 */

import { Platform } from 'react-native';

const tintColorLight = '#FF6B00';
const tintColorDark = '#FF8C42';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#FFF4E6',

    primary: '#FF6B00',

    input: '#FFFFFF',

    border: '#FF6B00',

    placeholder: '#666',

    tint: tintColorLight,

    icon: '#687076',

    tabIconDefault: '#687076',

    tabIconSelected: tintColorLight,
  },

  dark: {
    text: '#ECEDEE',

    background: '#151718',

    primary: '#FF8C42',

    input: '#1E1E1E',

    border: '#FF8C42',

    placeholder: '#AAA',

    tint: tintColorDark,

    icon: '#9BA1A6',

    tabIconDefault: '#9BA1A6',

    tabIconSelected: tintColorDark,
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },

  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },

  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",

    serif: "Georgia, 'Times New Roman', serif",

    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",

    mono:
      "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});