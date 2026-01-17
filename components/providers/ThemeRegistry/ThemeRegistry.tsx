'use client';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

import useDarkMode from '@/hooks/useDarkMode';
import theme from '@/config/theme';


import NextAppDirEmotionCacheProvider from './EmotionCache';

type ThemeRegistryProps = {
  children: React.ReactNode;
};

/**
 * Function representing the ThemeRegistry component.
 *
 * @returns ThemeRegistry component
 */
export default function ThemeRegistry({ children }: ThemeRegistryProps) {
  const [isDarkMode] = useDarkMode();

  const finalTheme = theme(isDarkMode);

  return (
    <NextAppDirEmotionCacheProvider options={{ key: 'mui', prepend: true }}>
      <ThemeProvider theme={finalTheme}>
        <CssBaseline />



        {children}
      </ThemeProvider>
    </NextAppDirEmotionCacheProvider>
  );
}
