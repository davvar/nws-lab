import React, { FC } from 'react'
import { NavLink } from 'react-router-dom'
import { capitalize } from '../../common/helpers'
import { queryParams } from '../../common/helpers/queryParams'
import { useAppSelector } from '../../store'
import { categoriesSelector } from '../../store/categories'
import './style.scss'

export const LeftSidebar: FC = () => {
  const { categories } = useAppSelector(categoriesSelector)

  return (
    <div id="left-sidebar">
      {categories.map(({ name, id }) => (
        <NavLink
          key={id}
          activeClassName="active-link"
          isActive={() => queryParams.get('category_id') === '' + id}
          to={() => ({
            pathname: '/cats',
            search: queryParams.append({ category_id: id, page: 1 }),
          })}
        >
          {capitalize(name)}
        </NavLink>
      ))}
    </div>
  )
}
