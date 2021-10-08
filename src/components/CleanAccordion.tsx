import React, { PropsWithChildren } from 'react'
import styled from 'styledComponents'
import {
  Typography,
  Accordion,
  AccordionSummary as MUIAccordionSummary,
  AccordionDetails,
  withStyles,
  AccordionActions
} from '@material-ui/core'
import { ExpandMoreRounded as ExpandMoreIcon } from '@material-ui/icons'
import { muiTheme } from 'theme'

type Props = {
  id: string
  header: React.ReactNode
  childrenPadding?: boolean
  defaultExpanded?: boolean
  actions?: React.ReactNode
}

const Header = styled(Typography)`
  && {
    text-transform: uppercase;
    font-size: 0.75rem;
    font-weight: 500;
    color: ${muiTheme.palette.grey[600]};
    letter-spacing: 0.3px;
  }
`

const AccordionSummary = withStyles({
  root: {
    backgroundColor: 'whitesmoke',
    '&$expanded': {
      minHeight: '48px'
    }
  },
  content: {
    '&$expanded': {
      margin: '12px 0'
    }
  },
  expanded: {}
})(MUIAccordionSummary)

const CleanAccordion: React.FC<PropsWithChildren<Props>> = ({
  header,
  id,
  children,
  childrenPadding = true,
  defaultExpanded = true,
  actions
}) => {
  return (
    <Accordion square defaultExpanded={defaultExpanded}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={id + '-content'}
        id={id + '-header'}
      >
        <Header variant="h1">{header}</Header>
      </AccordionSummary>
      <AccordionDetails style={{ padding: !childrenPadding ? 0 : '', overflow: 'auto' }}>
        {children}
      </AccordionDetails>
      {actions ? <AccordionActions>{actions}</AccordionActions> : null}
    </Accordion>
  )
}

export default CleanAccordion
