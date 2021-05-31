import { createGlobalStyle } from '../styledComponents'
import { muiTheme } from '../theme'

const GlobalStyles = createGlobalStyle`
  html {
    /* font-family: 'Roboto'; */
  }

 /* Splitter Region */
  .splitter-layout > .layout-splitter:hover {
    background-color: ${muiTheme.palette.secondary.main};
  }
  .splitter-layout.layout-changing > .layout-splitter {
    background-color: ${muiTheme.palette.secondary.main};
  }
`

export default GlobalStyles
