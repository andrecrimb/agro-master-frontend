import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import translationPT from 'assets/locales/pt-BR.json'

i18n.use(initReactI18next).init({
  resources: {
    'pt-BR': {
      translation: translationPT
    }
  },
  lng: 'pt-BR',
  preload: ['pt-BR'],
  fallbackLng: 'pt-BR',
  react: { useSuspense: false }
})

export default i18n
