import React, { PropsWithChildren } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styledComponents'
import { muiTheme } from 'theme'

type Props = {
  to: string
}

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  :hover {
    text-decoration: underline;
    color: ${muiTheme.palette.secondary.main};
  }
`

const CellLink: React.FC<PropsWithChildren<Props>> = ({ to, children }) => {
  return <StyledLink to={to}>{children}</StyledLink>
}

export default CellLink
