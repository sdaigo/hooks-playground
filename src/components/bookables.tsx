import * as React from 'react'
import { useState } from 'react'
import { prop } from 'ramda'

import { bookables } from '../db.json'

export default function Bookables() {
  const [group, setGroup] = useState('Kit')
  const [bookableIndex, setBookableIndex] = useState(0)
  const [hasDetails, setHasDetails] = useState(false)

  const bookablesInGroup = bookables.filter(b => b.group === group)
  const bookable = bookablesInGroup[bookableIndex]
  const groups = [...new Set(bookables.map(prop('group')))]

  const changeBookable = (index: number) => () => {
    setBookableIndex(index)
  }

  const nextBookable = () => {
    setBookableIndex(i => (i + 1) % bookablesInGroup.length)
  }

  return (
    <>
      <div>
        <select value={group} onChange={e => setGroup(e.target.value)}>
          {groups.map(g => (
            <option value={g} key={g}>
              {g}
            </option>
          ))}
        </select>
        <ul className="bookables">
          {bookablesInGroup.map((b, i) => (
            <li
              key={b.title}
              className={i === bookableIndex ? 'selected' : ''}
              onClick={changeBookable(i)}
            >
              {b.title}
            </li>
          ))}
        </ul>
        <p>
          <button onClick={nextBookable} autoFocus>
            Next
          </button>
        </p>
      </div>
      <div className="bookableDetails">
        {bookable && (
          <>
            <p>
              <label>
                <input
                  type="checkbox"
                  onChange={e => setHasDetails(e.target.checked)}
                  checked={hasDetails}
                />
                Show Details
              </label>
            </p>
            {hasDetails && (
              <div>
                <h2>{bookable.title}</h2>
                <p>{bookable.notes}</p>
              </div>
            )}
          </>
        )}
      </div>
    </>
  )
}
