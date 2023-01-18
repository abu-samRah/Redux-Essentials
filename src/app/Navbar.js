import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import {
  fetchNotifications,
  selectNotifications,
} from '../features/notifications/notificationsSlice'

export const Navbar = () => {
  const dispatch = useDispatch()
  const notifications = useSelector(selectNotifications)

  const fetchNewNotifications = () => {
    dispatch(fetchNotifications())
  }

  const readCount = notifications.reduce(
    (acc, curr) => (curr.read ? acc : ++acc),
    0
  )
  let unreadNotificationsBadge

  if (readCount > 0) {
    unreadNotificationsBadge = <span className="badge">{readCount}</span>
  }

  return (
    <nav>
      <section>
        <h1>Redux Essentials Example</h1>

        <div className="navContent">
          <div className="navLinks">
            <Link to="/">Posts</Link>
            <Link to="/users">Users</Link>
            <Link to="/notifications">
              Notifications {unreadNotificationsBadge}
            </Link>
          </div>
          <button className="button" onClick={fetchNewNotifications}>
            Refresh Notifications
          </button>
        </div>
      </section>
    </nav>
  )
}
