import React from 'react'
import { useLocation } from 'react-router-dom'
import { DrawerState, DrawerType } from 'types/common'

const useDetailsDrawerState = () => {
  const location = useLocation()

  const state: DrawerState = React.useMemo(() => {
    const searchParams = new URLSearchParams(location.search)
    const type = searchParams.get('drawer') as DrawerType | null
    const id = searchParams.get('id') ? parseInt(searchParams.get('id') as string) : null

    return { type, id, open: !!type }
  }, [location.search])

  return state
}

export default useDetailsDrawerState
