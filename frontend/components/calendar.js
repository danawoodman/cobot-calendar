import _ from 'lodash'
import FA from 'react-fontawesome'
import moment from 'moment'
import React, { PropTypes as types } from 'react'

function Event({ event }) {

  const date = moment(event.from).format('M/D')
  const time = moment(event.from).format('h:mm A')
  const durationMillis = new Date(event.to) - new Date(event.from)
  const duration = moment.duration(durationMillis).humanize()
  const titleText = event.title.startsWith('Event: ') ?
    event.title.replace('Event: ', '') :
    event.title
  const title = event.membership ?
    <span>
      <FA name='user' className='mr-1' />
      <a href={event.url}>
        {event.resource_name} reservation
      </a>
      <small className='text-muted ml-1'>({event.membership.name})</small>
    </span> :
    <span><a href={event.url}>{titleText}</a></span>

  return (
    <tr>
      <td><strong>{title}</strong></td>
      <td className='text-nowrap'>
        {date} <span className='text-muted'>at</span> {time}
      </td>
      <td className='text-nowrap'>
        <small className='text-muted ml-1'>{duration}</small>
      </td>
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
    <table className='table table-hover'>
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
