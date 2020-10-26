import React from 'react'

export const ProgressBar = ({pct}) => {
  return (
    <div className="progress my-2">
      <div className="progress-bar bg-success" 
          role="progressbar" 
          style={{width: `${pct}%`}}>
        {pct}%
      </div>
    </div>
  )
}
