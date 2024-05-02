import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow:{
        'CUSTOM-2' : '0px 0px 3px 1px rgb(33 37 41 / 0.2)',
        'CUSTOM-3' : '4px 4px 0px 0px rgba(187,187,187)',
        'CUSTOM-4' : '2px 2px 0px 0px rgba(187,187,187)'
      },
      colors: {
        'custom-blue': '#007bff',
        'CUSTOM-RED': '#F45B69',
        'CUSTOM-DARK-BLUE' : '#52489c',
        'CUSTOM-LIGHT-BLUE': '#59c3c3',
        'CUSTOM-BLUE': '#4062bb',
        'CUSTOM-GREY': '#F7F9F9',
        'CUSTOM-GREY-LIGHT': '#6B728E',
        'PRIMARY-900': '#0B1632',
        'PRIMARY-800': '#1B2D5C',
        'PRIMARY-700': '#2D478A',
        'PRIMARY-600': '#3654A2',
        'PRIMARY-500': '#4062BB',
        'PRIMARY-400': '#7591D2' ,
        'PRIMARY-300': '#9BB0E0',
        'PRIMARY-200': '#C2D0ED',
        'PRIMARY-100': '#D6DFF3',
        'SECONDARY-900': '#441318',
        'SECONDARY-800': '#7A2931',
        'SECONDARY-700': '#B5414C',
        'SECONDARY-600': '#D44E5A',
        'SECONDARY-500': '#F45B69',
        'SECONDARY-400': '#FB8086' ,
        'SECONDARY-300': '#FFA1A3',
        'SECONDARY-200': '#FFC1C1',
        'SECONDARY-100': '#FFE0E0',
        'NEUTRAL-900': '#212529',
        'NEUTRAL-800': '#343A40',
        'NEUTRAL-700': '#495057',
        'NEUTRAL-600': '#6C757D',
        'NEUTRAL-500': '#ADB5BD',
        'NEUTRAL-400': '#CED4DA' ,
        'NEUTRAL-300': '#D9D9D9',
        'NEUTRAL-200': '#E9ECEF',
        'NEUTRAL-100': '#F8F9FA',
        'STATE-RED-DARKEN' : '#D13A2F',
        'STATE-RED-BASE' : '#F04438',
        'STATE-RED-LIGHTEN': '#F97262',
        'STATE-YELLOW-DARKEN' : '#DEA900',
        'STATE-YELLOW-BASE' : '#FFC300',
        'STATE-YELLOW-LIGHTEN': '#FFD755',
        'STATE-GREEN-DARKEN' : '#2AB22A',
        'STATE-GREEN-BASE' : '#53D34F',
        'STATE-GREEN-LIGHTEN': '#95E390',
        'STATE-BLUE-DARKEN' : '#006EDE',
        'STATE-BLUE-BASE' : '#328EFF',
        'STATE-BLUE-LIGHTEN': '#7DB6FF',
        'TEXT-1': '#0F0A0A',
        'TEXT-2': '#262424',
        'TEXT-3': '#696969',
        'TEXT-4': '#B9BBBB',
        'TEXT-5': '#FFFFFF',
      },
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
      fontFamily: {
        sans: ['Roboto', 'Helvetica', 'Arial', 'sans-serif'],
        serif: ['Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
        mono: ['Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
        poppins : ['Poppins','sans-serif']
      },
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [
    // ...
    require('tailwind-scrollbar')({ preferredStrategy: 'pseudoelements' , nocompatible: true}),
  ],
};
export default config;
