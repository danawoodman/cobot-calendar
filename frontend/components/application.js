import _ from 'lodash'
import Calendar from './calendar'
import moment from 'moment'
import React from 'react'

export default function Application({ months, refresh }) {
  return (
    <div className='container mt-5 mb-5'>
      <h1>Calendar</h1>
      <hr />
      {
        _.map(months, (events, month) => (
          <div key={month}>
            <h2>{moment(new Date(month)).format('MMMM')}</h2>
            <Calendar events={events} />
          </div>
        ))
      }
      <p>
        <button
          className='btn btn-primary'
          onClick={refresh}
        >
          Refresh
        </button>
      </p>
      <p className='text-muted'>
        <small>
          <a href='https://www.cobot.me/oauth/authorize?response_type=code&client_id=b92a2ce04f5372173f16ea069e58d1ce&redirect_uri=http://localhost:6868/auth/callback&scope=read'>Login to Cobot</a>
        </small>
      </p>
    </div>
  )
}
