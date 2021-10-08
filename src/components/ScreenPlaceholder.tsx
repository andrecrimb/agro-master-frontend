import React from 'react'
import styled from 'styledComponents'
import { Typography } from '@material-ui/core'
import { SvgIconProps } from '@material-ui/core/SvgIcon'
import { FolderOpen as EmptyIcon } from '@material-ui/icons'
import i18n from 'i18n'

//#region Interfaces and Props
type Props = {
  withAbsoluteWrapper?: boolean
  Icon?: React.ComponentType<SvgIconProps>
  description?: string
  title?: string
  iconSize?: string
}
//#endregion

//#region Styles
const ContainerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  h4 {
    margin-bottom: 0.6rem;
    font-size: 1rem;
    opacity: 0.4;
    margin-top: 1rem;
  }
  h5 {
    font-size: 0.8rem;
    opacity: 0.4;
    line-height: 160%;
  }
`
const TextWrapper = styled.div`
  margin-bottom: 20px;
  padding: 0 16px;
`
const Wrapper = styled.div`
  top: 0;
  left: 0;
  right: 0;
  bottom: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
`
//#endregion

const ScreenPlaceholder: React.FC<Props> = ({
  title = i18n.t('empty_list'),
  description,
  Icon = EmptyIcon,
  iconSize,
  withAbsoluteWrapper = true
}) => {
  return (
    <Wrapper style={{ position: withAbsoluteWrapper ? 'absolute' : '' }}>
      <ContainerWrapper>
        <Icon
          style={{
            fontSize: iconSize ? iconSize : '3.8rem',
            color: '#000',
            opacity: 0.3
          }}
        />
        <TextWrapper>
          <Typography align="center" variant="h4">
            {title}
          </Typography>
          <Typography align="center" variant="h5">
            {description}
          </Typography>
        </TextWrapper>
      </ContainerWrapper>
    </Wrapper>
  )
}

export default ScreenPlaceholder
