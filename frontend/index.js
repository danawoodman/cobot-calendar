import Application from './components/application'
import apiDate from './lib/api-date-string'
import lastDate from './lib/last-date-of-month'
import React from 'react'
import ReactDOM from 'react-dom'
import 'isomorphic-fetch'

const COBOT_SUBDOMAIN = process.env.COBOT_SUBDOMAIN
const COBOT_TOKEN = process.env.COBOT_TOKEN
const REFRESH_INTERVAL = process.env.REFRESH_INTERVAL
const target = document.getElementById('app')

let events = []

function fetchEvents(from, to, cb) {

  console.log('Fetching events', { from, to })

  return fetch(`https://${COBOT_SUBDOMAIN}.cobot.me/api/bookings?from=${from}&to=${to}`, {
    headers: { 'Authorization': `Bearer ${COBOT_TOKEN}` },
  })
    .then((resp) => resp.json())
    .then((resp) => cb(resp))
    .catch((err) => console.error(err))
}

function updateEvents(from, to) {

  console.log('Updating events')

  fetchEvents(from, to, (resp) => {
    console.log('Events list updated:', resp)
    if (resp && resp.length) {
      events = resp
      renderApplication()
    }
  })
}

function refresh() {

  console.log('Refreshing application')

  // TODO get today to last day of current month
  const today = new Date()
  const from = apiDate(today)
  const to = apiDate(lastDate(today))

  updateEvents(from, to)

  setTimeout(() => refresh(), REFRESH_INTERVAL)
}


function renderApplication() {

  console.log('Rendering application')
  console.log('COBOT_TOKEN', COBOT_TOKEN)

  ReactDOM.render(
    <Application
      events={events}
      refresh={refresh}
    />,
    target
  )
}

// Render the application, refreshing periodically:
refresh()
