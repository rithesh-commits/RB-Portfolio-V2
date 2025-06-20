import { create } from 'zustand'

interface LanguageState {
  language: 'te' | 'en'
  toggleLanguage: () => void
}

export const useLanguage = create<LanguageState>((set) => ({
  language: 'te',
  toggleLanguage: () => set((state) => ({
    language: state.language === 'te' ? 'en' : 'te'
  }))
})) 