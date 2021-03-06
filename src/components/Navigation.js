import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Navigation () {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to='/login' activeClassName='active'>
            Log out
          </NavLink>
        </li>
        <li>
          <NavLink to='/' exact activeClassName='active'>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to='/add' activeClassName='active'>
            New Question
          </NavLink>
        </li>
        <li>
          <NavLink to='/leaderboard' activeClassName='active'>
            Leaderboard
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}