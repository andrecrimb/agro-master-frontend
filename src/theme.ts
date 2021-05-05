import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import createBreakpoints from '@material-ui/core/styles/createBreakpoints'

const breakpoints = createBreakpoints({})

const muiTheme = createMuiTheme({
  palette: {
    type: 'light',
    text: {
      primary: '#2E2E2E'
    },
    background: {
      default: '#fff',
      paper: '#fff'
    },
    primary: {
      contrastText: '#fff',
      dark: '#31854A',
      light: '#489A60',
      main: '#369151'
    },
    secondary: {
      contrastText: '#fff',
      dark: '#006DE4',
      light: '#248CFF',
      main: '#007AFF'
    }
  },
  overrides: {
    MuiAvatar: {
      root: {
        fontSize: '1.2rem'
      },
      colorDefault: {
        color: '#424242',
        textTransform: 'capitalize'
      }
    },
    MuiListItemText: {
      multiline: {
        marginTop: 0,
        marginBottom: 0
      }
    },
    MuiPaper: {
      rounded: {
        borderRadius: '8px'
      }
    },
    MuiBadge: {
      badge: {
        height: '14px',
        minWidth: '16px',
        fontSize: '0.5rem'
      },
      dot: {
        height: '6px',
        minWidth: '6px'
      }
    },
    MuiAppBar: {
      colorDefault: {
        backgroundColor: '#fff'
      },
      root: { boxShadow: 'none', borderBottom: '1px solid rgba(0, 0, 0, 0.14)' }
    },
    MuiExpansionPanel: {
      root: {
        boxShadow: 'none',
        // borderBottom: '1px solid rgba(252, 252, 252, 0.1)',
        borderTop: '1px solid rgba(252, 252, 252, 0.1)',
        '&:first-child': {
          borderTop: 'none'
        },
        '&:before': {
          display: 'none'
        },
        '&$expanded': {
          margin: 'auto'
        }
      }
    },
    MuiExpansionPanelSummary: {
      root: {
        minHeight: '38px'
      }
    },
    MuiExpansionPanelDetails: {
      root: {
        padding: '20px 24px 24px'
      }
    },
    MuiMenuItem: {
      root: {
        fontSize: '0.8rem',
        lineHeight: '100%'
      }
    },
    MuiFilledInput: {
      input: {
        padding: '22px 12px 10px'
      }
    },
    MuiFormHelperText: {
      root: {
        fontSize: '0.7em'
      }
    },
    MuiFormLabel: {
      root: {
        fontSize: '0.8rem'
      }
    },
    MuiOutlinedInput: {
      input: {
        padding: '16px 14px'
      }
    },
    MuiInputBase: {
      root: {
        fontSize: '0.8rem',
        lineHeight: '0.9em'
      },
      input: {
        padding: '4px 0 4px'
      }
    },
    MuiInputLabel: {
      outlined: {
        transform: 'translate(14px, 18px) scale(1)'
      }
    },
    MuiIconButton: {
      root: {
        padding: '7px'
      },
      colorInherit: {
        color: '#2E2E2E',
        backgroundColor: '#E2EFE6'
      }
    },
    MuiTooltip: {
      tooltip: {
        whiteSpace: 'pre-wrap'
      }
    },
    MuiTab: {
      root: {
        minHeight: '38px',
        fontSize: '0.6125rem',
        [breakpoints.down('md')]: {
          fontSize: '0.6125rem'
        },
        [breakpoints.up('md')]: {
          fontSize: '0.6125rem'
        }
      }
    },
    MuiListSubheader: {
      root: {
        lineHeight: '38px',
        fontSize: '0.675rem'
      }
    },
    MuiLinearProgress: {
      root: {
        height: '2px'
      }
    },
    MuiTabs: {
      indicator: {
        height: '0.13rem'
      },
      root: {
        minHeight: '38px'
      }
    },
    MuiTypography: {
      colorTextSecondary: {
        lineHeight: '180%'
      },
      subtitle1: {
        fontSize: '0.8rem'
      },
      caption: {
        fontSize: '0.6rem'
      },
      body1: {
        fontSize: '0.75rem',
        lineHeight: '1.1',
        wordBreak: 'break-word'
      },
      body2: {
        fontSize: '0.675rem',
        lineHeight: '1.1'
      },
      h6: {
        fontSize: '0.9rem'
      }
    },
    MuiTable: {
      root: {
        borderCollapse: 'separate'
      }
    },
    MuiAccordionSummary: {
      root: {
        minHeight: '40px'
      }
    },
    MuiTablePagination: {
      select: {
        display: 'flex',
        alignItems: 'center'
      },
      input: {
        fontSize: '0.7rem'
      },
      toolbar: {
        height: '44px',
        minHeight: '44px'
      }
    },
    MuiListItemIcon: {
      root: {
        marginRight: '6px'
      }
    },
    MuiTableRow: {
      head: {
        height: '34px'
      },
      root: {
        height: '38px'
      },
      footer: {
        height: '34px'
      }
    },
    MuiTableCell: {
      root: {
        padding: '2px 14px 2px 14px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
      },
      body: {
        fontSize: '0.7rem'
      },
      head: {
        textTransform: 'uppercase',
        padding: '0px 14px 0px 14px !important',
        fontSize: '0.62rem',
        borderBottom: 'none',
        color: 'rgba(255, 255, 255, 0.3)',
        whiteSpace: 'nowrap'
      },
      stickyHeader: {
        // backgroundColor: dark.tableHeader
      }
    },
    MuiSvgIcon: {
      root: {
        fontSize: '24px'
      }
    },
    MuiCheckbox: {
      root: {
        padding: '6px;'
      }
    },
    MuiButton: {
      sizeLarge: {
        padding: '7px 20px',
        fontSize: '0.73rem'
      },
      outlined: {
        padding: '4px 14px'
      },
      root: {
        letterSpacing: '1px',
        padding: '5px 14px',
        fontWeight: 500,
        fontSize: '0.65rem'
      },
      contained: {
        fontWeight: 400,
        boxShadow: 'none'
      }
    },
    MuiSnackbar: {
      anchorOriginBottomCenter: {
        bottom: '22px'
      }
    },
    MuiChip: {
      deleteIcon: {
        width: '18px',
        height: '18px'
      },
      label: {
        paddingLeft: '10px',
        paddingRight: '10px'
      },
      root: {
        fontSize: '0.62rem',
        height: '26px'
      },
      avatar: {
        width: '26px',
        height: '26px'
      }
    },
    MuiDialog: {
      paper: {
        minHeight: '150px'
      }
    },
    MuiDialogTitle: {
      root: {
        padding: '14px 20px 12px'
      }
    },
    MuiDialogContent: {
      root: {
        padding: '0 20px 10px',
        '&:first-child': {
          paddingTop: '20px'
        }
      }
    },
    MuiDialogContentText: {
      root: {
        whiteSpace: 'pre-line'
      }
    }
  }
})
export { muiTheme }
