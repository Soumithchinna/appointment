// Write your code here
import {v4} from 'uuid'

import {Component} from 'react'

import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    appointmentList: [],
    titleInput: '',
    dateInput: '',
    isFilterActive: false,
  }

  toggleisStarred = id => {
    this.setState(prevState => ({
      appointmentList: prevState.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isStarred: !eachAppointment.isStarred}
        }
        return eachAppointment
      }),
    }))
  }

  onFilter = () => {
    const {isFilterActive} = this.state
    this.setState({isFilterActive: !isFilterActive})
  }

  onChangeDateInput = event => {
    this.setState({dateInput: event.target.value})
  }

  onChangeTitleInput = event => {
    this.setState({titleInput: event.target.value})
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {dateInput, titleInput} = this.state
    const formatDate = dateInput
      ? format(new Date(dateInput), 'dd MMMM yyyy, EEEE')
      : ''
    const newAppointment = {
      id: v4(),
      title: titleInput,
      date: formatDate,
      isStarred: false,
    }
    this.setState(prevState => ({
      appointmentList: [...prevState, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  getFilterAppointmentList = () => {
    const {appointmentList, isFilterActive} = this.state
    if (isFilterActive === true) {
      return appointmentList.filter(
        eachTransaction => eachTransaction.isStarred === true,
      )
    }
    return appointmentList
  }

  render() {
    const {titleInput, dateInput, isFilterActive} = this.state
    const filterClassName = isFilterActive ? 'filter-filled' : 'filter-empty'
    const filterAppointmentList = this.getFilterAppointmentList()

    return (
      <div className="app-container">
        <div className="responsive-container">
          <div className="appointment-container">
            <div className="add-appointment-container">
              <form className="form" onSubmit={this.onAddAppointment}>
                <h1 className="add-appointment-heading">Add Appointment</h1>
                <label className="label" htmlFor="title">
                  TITLE
                </label>
                <input
                  type="text"
                  id="title"
                  value={titleInput}
                  className="input"
                  placeholder="Title"
                  onChange={this.onChangeTitleInput}
                />
                <label className="label" htmlFor="date">
                  DATE
                </label>
                <input
                  type="date"
                  id="date"
                  value={dateInput}
                  className="input"
                  onChange={this.onChangeDateInput}
                />
                <button type="button" className="add-button">
                  Add
                </button>
              </form>
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="appointment-image"
              />
            </div>
            <hr className="hr" />
            <div className="header-with-filter-container">
              <h1 className="heading">Appointments</h1>
              <button
                type="button"
                className={`filter-style ${filterClassName}`}
                onClick={this.onFilter}
              >
                Starred
              </button>
            </div>
            <ul className="appointment-list">
              {filterAppointmentList.map(eachAppointment => (
                <AppointmentItem
                  key={eachAppointment.id}
                  appointmentDetails={eachAppointment}
                  toggleisStarred={this.isStarred}
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
