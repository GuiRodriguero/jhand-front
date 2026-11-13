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
        pagination: {
          label: 'Paginação',
          previous: 'Página anterior',
          next: 'Próxima página',
        },
      },
      sessionType: {
        label: 'Tipo de jogo',
        CASH_GAME: 'Cash',
        TOURNAMENT: 'Torneio',
      },
      sidebar: {
        navigation: 'Navegação principal',
        hands: 'Mãos',
        sessions: 'Sessões',
        preFlopChart: 'Tabela Pre Flop',
        equityCalculator: 'Calculadora de Equity',
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
        description:
          'Ranges de abertura (RFI) ilustrativos para mesas 6-max. Escolha um pincel e clique ou arraste sobre as mãos para editar.',
        matrixLabel: 'Matriz de mãos iniciais',
        positions: 'Posição',
        brush: {
          label: 'Pincel',
          raise: 'Raise',
          call: 'Call',
          mixed: 'Raise 50% / Call 50%',
          fold: 'Fold (apagar)',
        },
        stats: {
          title: 'Resumo do range',
          combos: '{{combos}} de {{total}} combos',
          percentage: '{{percentage}} das mãos',
        },
        button: {
          reset: 'Restaurar padrão',
          clear: 'Limpar tudo',
        },
      },
      equityCalculator: {
        title: 'Calculadora de Equity',
        description:
          'Clique num espaço e escolha a carta no baralho. O próximo espaço vazio é selecionado automaticamente.',
        hero: 'Herói',
        villain: 'Vilão',
        board: 'Board',
        flop: 'Flop',
        turn: 'Turn',
        river: 'River',
        deck: 'Baralho',
        slotLabel: '{{group}} — carta {{index}}',
        tie: 'Empate',
        scenarios: '{{total}} cenários avaliados',
        monteCarlo: 'Pré-flop: estimativa por simulação de Monte Carlo.',
        incomplete: 'Escolha as 2 cartas do herói e as 2 do vilão para calcular.',
        invalidBoard: 'O board precisa ter 0, 3, 4 ou 5 cartas, preenchidas em ordem.',
        error: 'Não foi possível calcular a equity. Tente novamente.',
        calculating: 'Calculando...',
        button: {
          swap: 'Trocar herói e vilão',
          clear: 'Limpar tudo',
        },
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
          totalPot: 'Pote',
          netProfit: 'Lucro (BB)',
          details: 'Detalhes',
        },
      },
      sessions: {
        title: 'Sessões',
        table: {
          sessionId: 'Sessão',
          startTime: 'Data',
          handCount: 'Mãos',
          bigBlind: 'Blind',
          finishPosition: 'Colocação',
          buyIn: 'Buy-in',
          prize: 'Prêmio',
          netProfit: 'Resultado',
        },
        detail: {
          back: 'Voltar para sessões',
          notFound: 'Sessão não encontrada.',
          summary: '{{handCount}} mãos · {{duration}}',
          handsPerHour: '{{count}} mãos/h',
          viewHands: 'Ver mãos da sessão',
          stats: {
            netProfit: 'Resultado',
            netProfitInBb: 'Resultado (BB)',
            bbPer100: 'BB/100',
            vpipPfr: 'VPIP / PFR',
            finishPosition: 'Colocação',
            buyIn: 'Buy-in',
            prize: 'Prêmio',
          },
          chart: {
            cashTitle: 'Resultado acumulado',
            tournamentTitle: 'Stack',
            unitLabel: 'Unidade do gráfico',
            dollars: '$',
            chips: 'Fichas',
            bigBlinds: 'BB',
            pointLabel: 'Mão {{index}} · {{time}}',
            ariaLabel:
              '{{title}} ao longo de {{count}} mãos. Use as setas para percorrer as mãos; clique numa mão para abri-la.',
          },
          highlights: {
            best: 'Mão mais lucrativa',
            worst: 'Mão menos lucrativa',
            viewHand: 'Ver mão',
          },
          positions: {
            title: 'Resultado por posição',
            position: 'Posição',
            hands: 'Mãos',
            netProfit: 'Resultado',
            netProfitInBb: 'BB',
          },
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
        pagination: {
          label: 'Pagination',
          previous: 'Previous page',
          next: 'Next page',
        },
      },
      sessionType: {
        label: 'Game type',
        CASH_GAME: 'Cash',
        TOURNAMENT: 'Tournament',
      },
      sidebar: {
        navigation: 'Main navigation',
        hands: 'Hands',
        sessions: 'Sessions',
        preFlopChart: 'Pre Flop Chart',
        equityCalculator: 'Equity Calculator',
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
        description:
          'Illustrative opening ranges (RFI) for 6-max tables. Pick a brush and click or drag over the hands to edit.',
        matrixLabel: 'Starting hands matrix',
        positions: 'Position',
        brush: {
          label: 'Brush',
          raise: 'Raise',
          call: 'Call',
          mixed: 'Raise 50% / Call 50%',
          fold: 'Fold (erase)',
        },
        stats: {
          title: 'Range summary',
          combos: '{{combos}} of {{total}} combos',
          percentage: '{{percentage}} of hands',
        },
        button: {
          reset: 'Reset to default',
          clear: 'Clear all',
        },
      },
      equityCalculator: {
        title: 'Equity Calculator',
        description: 'Click a slot and pick the card from the deck. The next empty slot is selected automatically.',
        hero: 'Hero',
        villain: 'Villain',
        board: 'Board',
        flop: 'Flop',
        turn: 'Turn',
        river: 'River',
        deck: 'Deck',
        slotLabel: '{{group}} — card {{index}}',
        tie: 'Tie',
        scenarios: '{{total}} scenarios evaluated',
        monteCarlo: 'Pre-flop: Monte Carlo simulation estimate.',
        incomplete: 'Pick the 2 hero cards and the 2 villain cards to calculate.',
        invalidBoard: 'The board must have 0, 3, 4 or 5 cards, filled in order.',
        error: 'Could not calculate the equity. Please try again.',
        calculating: 'Calculating...',
        button: {
          swap: 'Swap hero and villain',
          clear: 'Clear all',
        },
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
          totalPot: 'Pot',
          netProfit: 'Net Profit (BB)',
          details: 'Details',
        },
      },
      sessions: {
        title: 'Sessions',
        table: {
          sessionId: 'Session',
          startTime: 'Date',
          handCount: 'Hands',
          bigBlind: 'Blind',
          finishPosition: 'Placement',
          buyIn: 'Buy-in',
          prize: 'Prize',
          netProfit: 'Result',
        },
        detail: {
          back: 'Back to sessions',
          notFound: 'Session not found.',
          summary: '{{handCount}} hands · {{duration}}',
          handsPerHour: '{{count}} hands/h',
          viewHands: 'View session hands',
          stats: {
            netProfit: 'Result',
            netProfitInBb: 'Result (BB)',
            bbPer100: 'BB/100',
            vpipPfr: 'VPIP / PFR',
            finishPosition: 'Placement',
            buyIn: 'Buy-in',
            prize: 'Prize',
          },
          chart: {
            cashTitle: 'Cumulative result',
            tournamentTitle: 'Stack',
            unitLabel: 'Chart unit',
            dollars: '$',
            chips: 'Chips',
            bigBlinds: 'BB',
            pointLabel: 'Hand {{index}} · {{time}}',
            ariaLabel:
              '{{title}} over {{count}} hands. Use the arrow keys to move between hands; click a hand to open it.',
          },
          highlights: {
            best: 'Most profitable hand',
            worst: 'Least profitable hand',
            viewHand: 'View hand',
          },
          positions: {
            title: 'Result by position',
            position: 'Position',
            hands: 'Hands',
            netProfit: 'Result',
            netProfitInBb: 'BB',
          },
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
