'use client';

import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { getTheme } from './theme';

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider theme={getTheme('light')}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
} 