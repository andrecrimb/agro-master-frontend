import React from 'react'
import { muiTheme } from 'theme'
import { Fade, IconButton, Toolbar, Typography } from '@material-ui/core'
import {
  DetailsDrawerContentGridArea,
  DetailsDrawerHeaderGridArea,
  DetailsDrawerTabsGridArea,
  DetailsDrawerWrapperGrid
} from 'components/GridLayout'
import HeaderTabs from 'components/HeaderTabs'
import useUrlSearch from 'hooks/useUrlSearch'
import { TabItem } from 'types/common'
import styled from 'styledComponents'
import { CloseRounded as CloseIcon } from '@material-ui/icons'

const HeaderTitle = styled(Typography)`
  && {
    font-weight: normal;
  }
`

const RightWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  > * + * {
    margin-left: 10px;
  }
`

const StyledToolbar = styled(Toolbar)`
  &.MuiToolbar-root {
    justify-content: space-between;
  }
`

type Props = {
  tabs: TabItem[]
  header: {
    title: string
    highlightTitle: string
    RightActions: React.ReactNode
  }
}

const DetailsDrawerWrapper: React.FC<Props> = ({
  tabs,
  header: { title, highlightTitle, RightActions }
}) => {
  const { params, setParams } = useUrlSearch(
    {
      params: ['drawerTab'],
      formatValues: {
        drawerTab: v => {
          console.log(v)
          return v && v < tabs.length ? v : 0
        }
      }
    },
    [tabs]
  )

  const tabsIndexLabel = React.useMemo(
    () => tabs.map((item, index) => ({ label: item.label, value: index })),
    [tabs]
  )

  const onClose = () => {
    setParams({ drawerTab: null, drawer: null, id: null })
  }

  const onTabChange = value => {
    setParams({ drawerTab: value })
  }

  return (
    <Fade in>
      <DetailsDrawerWrapperGrid role="article">
        <DetailsDrawerHeaderGridArea>
          <StyledToolbar variant="dense">
            <HeaderTitle variant="h6">
              {`${title} `}
              <span style={{ color: muiTheme.palette.primary.main }}> ({highlightTitle})</span>
            </HeaderTitle>
            <RightWrapper>
              {RightActions}
              <span>
                <IconButton onClick={onClose}>
                  <CloseIcon aria-label="close-drawer" />
                </IconButton>
              </span>
            </RightWrapper>
          </StyledToolbar>
        </DetailsDrawerHeaderGridArea>
        <DetailsDrawerTabsGridArea>
          <HeaderTabs
            orientation="vertical"
            value={params.drawerTab}
            tabs={tabsIndexLabel}
            onChange={onTabChange}
          />
        </DetailsDrawerTabsGridArea>
        <DetailsDrawerContentGridArea>
          {tabs[params.drawerTab] && tabs[params.drawerTab].component}
        </DetailsDrawerContentGridArea>
      </DetailsDrawerWrapperGrid>
    </Fade>
  )
}

export default DetailsDrawerWrapper
