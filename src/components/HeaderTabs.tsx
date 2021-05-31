import React from 'react'
import styled from 'styledComponents'
import { Tab, Tabs } from '@material-ui/core'
import { TabProps } from '@material-ui/core/Tab'
import { TabsProps } from '@material-ui/core/Tabs'

export interface Props extends TabsProps {
  tabs: TabProps[]
  onChange: (value) => void
}

const StyledTabs = styled(Tabs)``
const StyledTab = styled(Tab)`
  &.MuiTab-root {
    min-height: 44px;
    min-width: 100px;
  }
`

const HeaderTabs: React.FC<Props> = ({ tabs, onChange, ...otherProps }) => {
  if (!tabs.length) {
    return null
  }

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    onChange(newValue)
  }

  return (
    <StyledTabs
      variant="scrollable"
      scrollButtons="auto"
      textColor="primary"
      indicatorColor="primary"
      {...otherProps}
      onChange={handleChange}
    >
      {tabs.map(tabItem => (
        <StyledTab orientation={otherProps.orientation} key={`tab_${tabItem.label}`} {...tabItem} />
      ))}
    </StyledTabs>
  )
}

export default HeaderTabs
