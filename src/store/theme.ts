import { defineStore } from 'pinia';
import type { ThemeState } from '@/types/themeTypes';

export const useThemeStore = defineStore<'theme', ThemeState>('theme', {
    state: (): ThemeState => ({
      theme: 'light',
    }),
    actions: {
      toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light'; 
        document.documentElement.setAttribute('data-theme', this.theme); 
        localStorage.setItem('theme', this.theme); 
      },
      setTheme(theme: 'light' | 'dark') { 
        this.theme = theme;
        document.documentElement.setAttribute('data-theme', this.theme);
        localStorage.setItem('theme', theme); 
      },
      loadThemeFromLocalStorage() {
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme) {
          this.theme = storedTheme as 'light' | 'dark'; 
          document.documentElement.setAttribute('data-theme', this.theme);
        }
      },
    },
  });