// Write your code here
import {Component} from 'react'
import {v4} from 'uuid'
import './index.css'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem/index'

class Appointments extends Component {
  state = {
    title: '',
    date: '',
    isFilterActive: false,
    commentList: [],
  }

  onChangeTitle = e => {
    this.setState({title: e.target.value})
  }

  onChangeDate = e => {
    this.setState({date: e.target.value})
  }

  onFilter = () => {
    const {isFilterActive} = this.state

    this.setState({
      isFilterActive: !isFilterActive,
    })
  }

  onClickAdd = () => {
    const {title, date} = this.state

    const formattedDate = date
      ? format(new Date(date), 'dd MMMM yyyy, EEEE')
      : ''

    const newComment = {
      id: v4(),
      title,
      date: formattedDate,
      isStarred: false,
    }

    this.setState(prevState => ({
      commentList: [...prevState.commentList, newComment],
      title: '',
      date: '',
    }))
  }

  onClickStar = id => {
    this.setState(prevState => ({
      commentList: prevState.commentList.map(eachComment => {
        if (id === eachComment.id) {
          return {...eachComment, isStarred: !eachComment.isStarred}
        }
        return eachComment
      }),
    }))
  }

  getStarredItems = () => {
    const {commentList, isFilterActive} = this.state

    if (isFilterActive) {
      return commentList.filter(
        eachTransaction => eachTransaction.isStarred === true,
      )
    }
    return commentList
  }

  render() {
    const {title, date, isFilterActive} = this.state
    const filterClassName = isFilterActive ? 'filter-filled' : 'filter-empty'
    const filteredAppointmentsList = this.getStarredItems()

    return (
      <div className="app-container">
        <div className="main-card">
          <h1 className="main-head">Add Appointment</h1>
          <div className="top-card">
            <form>
              <div className="text-card">
                <label htmlFor="text">TITLE</label>
                <input
                  type="text"
                  className="text-type"
                  id="text"
                  value={title}
                  placeholder="Title"
                  onChange={this.onChangeTitle}
                />
              </div>

              <div className="text-card">
                <label htmlFor="date">DATE</label>
                <input
                  type="date"
                  id="date"
                  value={date}
                  onChange={this.onChangeDate}
                />
              </div>
              <button type="button" className="butt" onClick={this.onClickAdd}>
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png "
              alt="appointments"
              className="main-img"
            />
          </div>
          <hr className="line" />
          <div className="second-card">
            <div className="top-bg">
              <h1 className="second-head">Appointments</h1>
              <button
                type="button"
                className={`starred ${filterClassName}`}
                data-testid="star"
                onClick={this.onFilter}
              >
                starred
              </button>
            </div>

            <ul className="unorder">
              {filteredAppointmentsList.map(eachComment => (
                <AppointmentItem
                  key={eachComment.id}
                  commentItem={eachComment}
                  onClickStar={this.onClickStar}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
