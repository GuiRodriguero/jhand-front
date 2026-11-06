import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

export const resources = {
  pt: {
    translation: {
      app: {
        name: 'JHand',
      },
      default: {
        success: 'Sucesso!',
        loading: 'Carregando...',
        emptyResult: 'Nenhum resultado encontrado',
        errorResult: 'Não foi possível carregar os dados. Tente novamente.',
        close: 'Fechar',
        notifications: 'Notificações',
      },
      sidebar: {
        navigation: 'Navegação principal',
        hands: 'Mãos',
        preFlopChart: 'Tabela Pre Flop',
        settings: 'Configurações',
        dashboard: 'Painel',
      },
      dashboard: {
        stats: {
          vpip: 'VPIP %',
          pfr: 'PFR %',
          totalHands: 'Total de Mãos',
          netProfit: 'Lucro Líquido',
        },
        bankroll: {
          title: 'Evolução da Banca',
        },
      },
      preFlopChart: {
        title: 'Tabela Pre Flop',
      },
      equityCalculator: {
        title: 'Calculadora de Equity',
      },
      handResult: {
        filters: {
          title: 'Filtros',
          handId: 'Hand ID',
          sessionId: 'Sessão',
          heroCards: 'Cartas do Herói',
          heroCardsSlot: 'Carta {{index}}',
          heroCardsRank: 'Valor',
          heroCardsSuit: 'Naipe',
          handRank: 'Mão',
          button: {
            clear: 'Limpar',
            apply: 'Aplicar filtros',
          },
        },
        table: {
          sessionId: 'Sessão',
          position: 'Posição',
          cards: 'Cartas',
          board: 'Board',
          dateTime: 'Data / Hora',
          handRank: 'Mão',
          netProfit: 'Lucro',
          details: 'Detalhes',
        },
        pagination: {
          label: 'Paginação',
          previous: 'Página anterior',
          next: 'Próxima página',
        },
      },
      settings: {
        title: 'Configurações',
        description: 'Gerencie suas integrações e preferências locais da aplicação.',
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
      app: {
        name: 'JHand',
      },
      default: {
        success: 'Success!',
        loading: 'Loading...',
        emptyResult: 'No results found',
        errorResult: 'Could not load the data. Please try again.',
        close: 'Close',
        notifications: 'Notifications',
      },
      sidebar: {
        navigation: 'Main navigation',
        hands: 'Hands',
        preFlopChart: 'Pre Flop Chart',
        settings: 'Settings',
        dashboard: 'Dashboard',
      },
      dashboard: {
        stats: {
          vpip: 'VPIP %',
          pfr: 'PFR %',
          totalHands: 'Total Hands',
          netProfit: 'Net Profit',
        },
        bankroll: {
          title: 'Bankroll Evolution',
        },
      },
      preFlopChart: {
        title: 'Pre Flop Chart',
      },
      equityCalculator: {
        title: 'Equity Calculator',
      },
      handResult: {
        filters: {
          title: 'Filters',
          handId: 'Hand ID',
          sessionId: 'Session',
          heroCards: 'Hero Cards',
          heroCardsSlot: 'Card {{index}}',
          heroCardsRank: 'Rank',
          heroCardsSuit: 'Suit',
          handRank: 'Hand Rank',
          button: {
            clear: 'Clear',
            apply: 'Apply filters',
          },
        },
        table: {
          sessionId: 'Session',
          position: 'Position',
          cards: 'Cards',
          board: 'Board',
          dateTime: 'Date / Time',
          handRank: 'Hand Rank',
          netProfit: 'Net Profit',
          details: 'Details',
        },
        pagination: {
          label: 'Pagination',
          previous: 'Previous page',
          next: 'Next page',
        },
      },
      settings: {
        title: 'Settings',
        description: 'Manage your integrations and local application preferences.',
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

// Keeps <html lang> in sync with the active language (screen readers rely on it).
i18n.on('languageChanged', (lng) => {
  document.documentElement.lang = lng;
});

void i18n.use(initReactI18next).init({
  resources,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});
