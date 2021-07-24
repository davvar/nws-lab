import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { queryParams } from '../../common/helpers/queryParams'
import { ICatsQueryParams } from '../../store/cats'
import './style.scss'

const PAGE_SIZES = [10, 20, 50]
export const Toolbar = () => {
  const history = useHistory()

  useEffect(() => {
    const params: ICatsQueryParams = queryParams.stringToObj()
    if (!params.limit) {
      history.push({
        search: queryParams.append({ limit: PAGE_SIZES[0] }),
      })
    }
  }, [history])

  return (
    <div id="toolbar">
      <span style={{ marginRight: 5 }}> page size </span>
      <select
        defaultValue={queryParams.get('limit') || PAGE_SIZES[0]}
        onChange={({ target }) =>
          history.push({ search: queryParams.append({ limit: target.value }) })
        }
      >
        {PAGE_SIZES.map((size) => (
          <option key={size}>{size}</option>
        ))}
      </select>
    </div>
  )
}
