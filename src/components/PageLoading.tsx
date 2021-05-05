import React from 'react'
import styled from 'styledComponents'
import { CircularProgress, Fade } from '@material-ui/core'

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`

const PageLoading: React.FC = () => {
  return (
    <Wrapper aria-label="page-loading">
      <Fade in style={{ transitionDelay: '500ms' }}>
        <CircularProgress size={30} color="secondary" />
      </Fade>
    </Wrapper>
  )
}

export default PageLoading
