import React from 'react'
import { LinearProgress } from '@material-ui/core'

const LineLoading = () => {
  return (
    <div style={{ position: 'absolute', zIndex: 3, left: 0, right: 0, top: 0 }}>
      <LinearProgress color="secondary" />
    </div>
  )
}

export default LineLoading
