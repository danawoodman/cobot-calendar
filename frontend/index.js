import _ from 'lodash'
import Application from './components/application'
import apiDate from './lib/api-date-string'
import lastDate from './lib/last-date-of-month'
import React from 'react'
import ReactDOM from 'react-dom'
import 'isomorphic-fetch'

const COBOT_SUBDOMAIN = process.env.COBOT_SUBDOMAIN
const COBOT_TOKEN = process.env.COBOT_TOKEN
const REFRESH_INTERVAL = process.env.REFRESH_INTERVAL
const NUMBER_OF_MONTHS = process.env.NUMBER_OF_MONTHS
const target = document.getElementById('app')
const today = new Date()

function constructMonthObject(months) {
  return [ ...Array(months).keys() ].reduce((all, curr) => {
    const day = curr === 0 ? today.getDate() : 1
    const month = today.getMonth() + curr
    const year = today.getFullYear()
    all[new Date(year, month, day)] = []
    return all
  }, {})
}

// Create a month entry for every month to show.
let months = constructMonthObject(NUMBER_OF_MONTHS)

function fetchEvents(from, to, cb) {

  console.log('Fetching events', { from, to })

  return fetch(`https://${COBOT_SUBDOMAIN}.cobot.me/api/bookings?from=${from}&to=${to}`, {
    headers: { 'Authorization': `Bearer ${COBOT_TOKEN}` },
  })
    .then((resp) => resp.json())
    .then((resp) => cb(resp))
    .catch((err) => console.error(err))
}

function updateEvents() {

  console.log('Updating events', months)

  _.map(months, (events, month) => {

    console.log('Getting events for month:', month)

    month = new Date(month)
    const from = apiDate(month)
    const to = apiDate(lastDate(month))

    fetchEvents(from, to, (resp) => {
      console.log('Events list updated:', resp)
      if (resp && resp.length) {
        months[month] = resp
        renderApplication()
      }
    })
  })

}

function refresh() {
  console.log('Refreshing application')
  updateEvents()
  setTimeout(() => refresh(), REFRESH_INTERVAL)
}


function renderApplication() {
  console.log('Rendering application')
  console.log('months', months)
  ReactDOM.render(
    <Application
      months={months}
      refresh={refresh}
    />,
    target
  )
}

// Render the application, refreshing periodically:
refresh()
