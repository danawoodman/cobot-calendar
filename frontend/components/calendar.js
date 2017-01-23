import moment from 'moment'
import React, { PropTypes as types } from 'react'

function Event({ event }) {

  const date = moment(event.from).format('M/D @ h:mm a')
  const durationMillis = new Date(event.to) - new Date(event.from)
  const duration = moment.duration(durationMillis).humanize()

  return (
    <tr>
      <td>{date}</td>
      <td>{duration}</td>
      <td>{event.title}</td>
    </tr>
  )
}

export default function Calendar({ events }) {

  if (!events || !events.length) {
    return (
      <p className='alert alert-warning'>No events to show 😢</p>
    )
  }

  return (
    <table className='table'>
      <thead>
        <tr>
          <th>Time</th>
          <th>Length</th>
          <th>Title</th>
        </tr>
      </thead>
      <tbody>
        {
          events.map((event, index) => (
            <Event key={index} event={event} />
          ))
        }
      </tbody>
    </table>
  )
}

Calendar.propTypes = {
  events: types.array,
}
