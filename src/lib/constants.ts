import { Colors } from '@convex/notes/mutations'

export const ROUTES = {
  login: '/',
  home: '/home',
} as const

export const TAB_VALUES = {
  LOGIN: 'login',
  REGISTER: 'register',
} as const

export const COLORS_MAP: Record<Colors, string> = {
  Sunset: '#FF6B6B',
  Ocean: '#4ECDC4',
  Sky: '#45B7D1',
  Mint: '#96CEB4',
  Lavender: '#A8E6CF',
  Peach: '#FFB5A3',
  Cream: '#F8F8F2',
  Steel: '#6C7B7F',
}
