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
import { TabItem } from 'types/common'
import styled from 'styledComponents'
import { CloseRounded as CloseIcon } from '@material-ui/icons'
import { useQueryParams, NumberParam, StringParam } from 'use-query-params'

const HeaderTitle = styled(Typography)`
  && {
    font-weight: normal;
    font-size: 0.95rem;
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
    min-height: 42px;
  }
`

type Props = {
  tabs: TabItem[]
  header: {
    title: string
    highlightTitle?: string
    RightActions?: React.ReactNode
  }
}

const DetailsDrawerWrapper: React.FC<Props> = ({
  tabs,
  header: { title, highlightTitle, RightActions }
}) => {
  const [search, setSearch] = useQueryParams({
    drawerTab: NumberParam,
    id: NumberParam,
    drawer: StringParam
  })

  const drawerTab = search.drawerTab && +search.drawerTab < tabs.length ? search.drawerTab : 0

  const tabsIndexLabel = React.useMemo(
    () => tabs.map((item, index) => ({ label: item.label, value: index })),
    [tabs]
  )

  const onClose = () => setSearch({ drawerTab: undefined, drawer: undefined, id: undefined })
  const onTabChange = value => setSearch({ drawerTab: value })

  return (
    <Fade in>
      <DetailsDrawerWrapperGrid role="article">
        <DetailsDrawerHeaderGridArea>
          <StyledToolbar variant="dense">
            <HeaderTitle variant="h6">
              {`${title} `}
              {highlightTitle ? (
                <span style={{ color: muiTheme.palette.primary.main }}> {highlightTitle}</span>
              ) : null}
            </HeaderTitle>
            <RightWrapper>
              {RightActions}
              <span>
                <IconButton size="small" onClick={onClose}>
                  <CloseIcon aria-label="close-drawer" />
                </IconButton>
              </span>
            </RightWrapper>
          </StyledToolbar>
        </DetailsDrawerHeaderGridArea>
        {tabs.length > 1 ? (
          <DetailsDrawerTabsGridArea>
            <HeaderTabs
              orientation="vertical"
              value={drawerTab}
              tabs={tabsIndexLabel}
              onChange={onTabChange}
            />
          </DetailsDrawerTabsGridArea>
        ) : null}
        <DetailsDrawerContentGridArea>
          {tabs[drawerTab] && tabs[drawerTab].component}
        </DetailsDrawerContentGridArea>
      </DetailsDrawerWrapperGrid>
    </Fade>
  )
}

export default DetailsDrawerWrapper
