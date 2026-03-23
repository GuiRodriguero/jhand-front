import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

export const resources = {
  pt: {
    translation: {
      default: {
        success: 'Sucesso!',
      },
      sidebar: {
        settings: 'Configurações',
        dashboard: 'Painel',
      },
      settings: {
        upload: {
          title: 'Importação Manual (Em Lote)',
          description:
            'Selecione a pasta do PokerStars no seu computador. O JHand fará a varredura automática buscando apenas arquivos de histórico de mãos (.txt) para processamento.',
          selectFolder: 'Clique para selecionar a pasta de HandHistory',
          filesFound: '{{count}} arquivos .txt encontrados',
          btnProcessing: 'Processando Mãos...',
          btnSync: 'Sincronizar com Banco',
          successToast: 'Mãos importadas e processadas com sucesso!',
          errorToast: 'Falha na importação do histórico de mãos.',
        },
      },
    },
  },
  en: {
    translation: {
      default: {
        success: 'Success!',
      },
      sidebar: {
        settings: 'Settings',
        dashboard: 'Dashboard',
      },
      settings: {
        upload: {
          title: 'Manual Batch Import',
          description:
            'Select your PokerStars folder. JHand will automatically scan for hand history files (.txt) to process.',
          selectFolder: 'Click to select the HandHistory folder',
          filesFound: '{{count}} .txt files found',
          btnProcessing: 'Processing Hands...',
          btnSync: 'Sync with Database',
          successToast: 'Hands imported and processed successfully!',
          errorToast: 'Failed importing hand history.',
        },
      },
    },
  },
} as const;

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
