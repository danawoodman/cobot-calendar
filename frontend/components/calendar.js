import _ from 'lodash'
import moment from 'moment'
import React, { PropTypes as types } from 'react'

function Event({ event }) {

  const date = moment(event.from).format('MMM D, h:mm a')
  const durationMillis = new Date(event.to) - new Date(event.from)
  const duration = moment.duration(durationMillis).humanize()

  return (
    <tr>
      <td className='text-nowrap'>{date}</td>
      <td className='text-nowrap'>{duration}</td>
      <td>{event.title || event.resource_name}</td>
    </tr>
  )
}

export default function Calendar({ events }) {

  if (_.isEmpty(events)) {
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
