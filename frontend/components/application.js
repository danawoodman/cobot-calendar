import _ from 'lodash'
import Calendar from './calendar'
import moment from 'moment'
import React from 'react'

export default function Application({ months, refresh }) {
  return (
    <div className='container-fluid m-5'>
      <h1 className='display-3 text-center mb-5'>Calendar</h1>
      <div className='row'>
        {
          _.map(months, (events, month) => (
            <div key={month} className='col'>
              <h2>{moment(new Date(month)).format('MMMM')}</h2>
              <Calendar events={events} />
            </div>
          ))
        }
      </div>
      <p className='btn-group btn-group-sm mt-5 float-right'>
        <button
          className='btn btn-outline-primary'
          onClick={refresh}
        >
          Refresh
        </button>
        <a
          className='btn btn-outline-primary'
          href='https://www.cobot.me/oauth/authorize?response_type=code&client_id=b92a2ce04f5372173f16ea069e58d1ce&redirect_uri=http://localhost:6868/auth/callback&scope=read'
        >
          Login to Cobot
        </a>
      </p>
    </div>
  )
}
