import React from 'react'
import { PageHeaderGridArea } from 'components/GridLayout'
import { Toolbar, Typography } from '@material-ui/core'
import styled from 'styledComponents'

type Props = {
  title: string
}

const StyledToolbar = styled(Toolbar)`
  &.MuiToolbar-root {
    justify-content: space-between;
  }
  h5 {
    font-size: 1.15rem;
  }
`

const PageHeader: React.FC<Props> = ({ title }) => {
  return (
    <PageHeaderGridArea>
      <StyledToolbar variant="dense">
        <Typography color="textPrimary" variant="h5">
          {title}
        </Typography>
      </StyledToolbar>
    </PageHeaderGridArea>
  )
}

export default PageHeader
