import {Component} from 'react'
import Loader from 'react-loader-spinner'

import './index.css'
import Header from '../header'
import LogoItem from '../courseLogo'

const loaderConstraints = {
  initial: 'INITIAL',
  progress: 'PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {coursesData: [], loaderStatus: loaderConstraints.initial}

  componentDidMount() {
    this.getCoursesData()
  }

  getCoursesData = async () => {
    this.setState({loaderStatus: loaderConstraints.progress})
    const url = 'https://apis.ccbp.in/te/courses'
    const response = await fetch(url)
    const data = await response.json()
    if (response.ok) {
      const update = data.courses.map(each => ({
        id: each.id,
        logoUrl: each.logo_url,
        name: each.name,
      }))
      this.setState({
        coursesData: update,
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
    const {coursesData} = this.state
    return (
      <div className="main-con">
        <h1 className="heading">Courses</h1>
        <ul className="list-con">
          {coursesData.map(each => (
            <LogoItem details={each} key={each.id} />
          ))}
        </ul>
      </div>
    )
  }

  reloadApiCall = () => {
    this.getCoursesData()
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
        We cannot seem to find the page you are looking for.
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

export default Home
