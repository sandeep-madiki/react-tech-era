import {Component} from 'react'
import Loader from 'react-loader-spinner'

import './index.css'
import Header from '../header'

const loaderConstraints = {
  initial: 'INITIAL',
  progress: 'PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class CourseDetails extends Component {
  state = {courseDetails: {}, loaderStatus: loaderConstraints.initial}

  componentDidMount() {
    this.getCourseData()
  }

  getCourseData = async () => {
    this.setState({loaderStatus: loaderConstraints.progress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/te/courses/${id}`
    const response = await fetch(url)
    const data = await response.json()
    if (response.ok) {
      const updated = {
        description: data.course_details.description,
        id: data.course_details.id,
        imageUrl: data.course_details.image_url,
        name: data.course_details.name,
      }
      this.setState({
        courseDetails: updated,
        loaderStatus: loaderConstraints.success,
      })
    } else {
      this.setState({loaderStatus: loaderConstraints.failure})
    }
  }

  renderLoader = () => (
    <div className="loader-con" data-testid="loader">
      <Loader type="ThreeDots" color="#4656a1" />
    </div>
  )

  renderSuccessView = () => {
    const {courseDetails} = this.state
    const {imageUrl, name, description} = courseDetails
    return (
      <div className="details-con">
        <div className="content-con">
          <img src={imageUrl} alt={name} className="details-img" />
          <div className="description-con">
            <h1 className="d-name">{name}</h1>
            <p className="d-des">{description}</p>
          </div>
        </div>
      </div>
    )
  }

  reloadApiCall = () => {
    this.getCourseData()
  }

  renderFailureView = () => (
    <div className="failure-con">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="failure-h">Oops! Something Went Wrong</h1>
      <p className="failure-p">
        We cannot seem to find the page you are looking for{' '}
      </p>
      <button type="button" className="retry-btn" onClick={this.reloadApiCall}>
        Retry
      </button>
    </div>
  )

  getViews = () => {
    const {loaderStatus} = this.state
    switch (loaderStatus) {
      case loaderConstraints.progress:
        return this.renderLoader()
      case loaderConstraints.success:
        return this.renderSuccessView()
      case loaderConstraints.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.getViews()}
      </>
    )
  }
}

export default CourseDetails
