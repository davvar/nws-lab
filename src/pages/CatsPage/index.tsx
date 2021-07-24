import './style.scss';

import React, { FC } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { queryParams } from '../../common/helpers/queryParams';
import { DualRingLoader } from '../../components/Loaders/DualRingLoader';
import { Images, ResponsiveImageGrid } from '../../components/ResponsiveImageGrid';
import { Toolbar } from '../../layout/Toolbar';
import { useAppDispatch, useAppSelector } from '../../store';
import { catsSelector, getCats, ICat, loadMoreCats } from '../../store/cats';

const CatsPage: FC = () => {
  const location = useLocation()
  const history = useHistory()
  const shouldLoadMore = React.useRef(false)
  const dispatch = useAppDispatch()
  const { cats, status, loadingMore: loadingMoreCats } = useAppSelector(catsSelector)

  React.useEffect(() => {
    if (shouldLoadMore.current) {
      dispatch(loadMoreCats(queryParams.stringToObj()))
      shouldLoadMore.current = false
    } else {
      dispatch(getCats(queryParams.stringToObj()))
    }
  }, [dispatch, location])


  const normalizeCatsData = (cats: ICat[] = []): Images => cats?.map(({ url }) => ({ src: url }))

  const handleLoadMore = () => {
    if (!loadingMoreCats) {
      history.push({ search: queryParams.append({ page: +queryParams.get('page')! + 1 }) })
      shouldLoadMore.current = true
    }
  }

  if (status === 'loading') {
    return (
      <div className="cat-loading-container">
        <DualRingLoader />
      </div>
    )
  }

  return (
    <div>
      <Toolbar />
      <ResponsiveImageGrid images={normalizeCatsData(cats)} />
      <div className="load-more-container">
        <button
          disabled={loadingMoreCats}
          onClick={handleLoadMore}
          className="load-more-container__btn"
        >
          {loadingMoreCats ? 'Loading...' : 'Load More'}
        </button>
      </div>
    </div>
  )
}

export default CatsPage
