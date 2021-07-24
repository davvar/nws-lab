import React, { Suspense } from 'react'
import { Switch, Route } from 'react-router-dom'
import './App.scss'
import { FullScreenLoader } from './components/Loaders/FullScreenLoader'
import { LeftSidebar } from './layout'
import { useAppDispatch, useAppSelector } from './store'
import { categoriesSelector, getCategories } from './store/categories'

const CatsPage = React.lazy(() => import('./pages/CatsPage'))
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage'))
const HomePage = React.lazy(() => import('./pages/HomePage'))

const App = () => {
  const dispatch = useAppDispatch()
  const categories = useAppSelector(categoriesSelector)

  React.useEffect(() => {
    dispatch(getCategories())
  }, [dispatch])

  if (categories.status === 'loading') {
    return <FullScreenLoader />
  }

  return (
    <div id="app">
      <LeftSidebar />

      <div className="content">
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/cats" component={CatsPage} />
            <Route path="*" component={NotFoundPage} />
          </Switch>
        </Suspense>
      </div>
    </div>
  )
}

export default App
