// Write your code here

import './index.css'

const AppointmentItem = props => {
  const {commentItem, onClickStar} = props
  const {id, title, date, isStarred} = commentItem

  const starredImage = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onSelectStar = () => {
    onClickStar(id)
  }

  return (
    <li className="list-item">
      <div className="start-bg">
        <h1 className="head">{title}</h1>
        <img
          src={starredImage}
          alt="star"
          className="list-img"
          onClick={onSelectStar}
        />
      </div>
      <p className="para">Date: {date} </p>
    </li>
  )
}

export default AppointmentItem
