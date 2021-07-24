import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import './style.scss'

const NotFoundPage: FC = () => {
  return (
    <div id="not-found">
      <div>
        <h1>Something went wrong</h1>

        <h2>
          Go <Link to="/">home</Link>
        </h2>
      </div>
    </div>
  )
}

export default NotFoundPage
