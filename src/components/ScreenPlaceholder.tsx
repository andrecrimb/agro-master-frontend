import React, { PropsWithChildren } from 'react'
import styled from 'styledComponents'
import { Typography } from '@material-ui/core'
import { SvgIconProps } from '@material-ui/core/SvgIcon'

//#region Interfaces and Props
type Props = {
  icon?: React.ComponentType<SvgIconProps>
  description?: string
  iconSize?: string
  titleFontSize?: string
  descriptionSize?: string
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
//#endregion

const ScreenPlaceholder: React.FC<PropsWithChildren<Props>> = ({
  children,
  description,
  icon: Icon,
  iconSize,
  titleFontSize,
  descriptionSize
}) => {
  return (
    <ContainerWrapper>
      {Icon && (
        <Icon
          style={{
            fontSize: iconSize ? iconSize : '3.8rem',
            color: '#000',
            opacity: 0.3
          }}
        />
      )}
      <TextWrapper>
        <Typography align="center" variant="h4" style={{ fontSize: titleFontSize }}>
          {children}
        </Typography>
        <Typography align="center" variant="h5" style={{ fontSize: descriptionSize }}>
          {description}
        </Typography>
      </TextWrapper>
    </ContainerWrapper>
  )
}

export default ScreenPlaceholder
