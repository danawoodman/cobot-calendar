import Calendar from './calendar'
import moment from 'moment'
import React from 'react'

export default function Application({ events, refresh }) {
  return (
    <div className='container mt-5 mb-5'>
      <h1>Calendar</h1>
      <hr />
      <h2>{moment().format('MMMM')}</h2>
      <Calendar events={events} />
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
