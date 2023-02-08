import './index.css'
import Header from '../header'

const NotFound = () => (
  <>
    <Header />
    <div className="not-con">
      <img
        className="not-img"
        src="https://assets.ccbp.in/frontend/react-js/tech-era/not-found-img.png"
        alt="not found"
      />
      <h1 className="not-heading">Page Not Found</h1>
      <p className="not-des">
        We are sorry, the page you requested could not be found.
      </p>
    </div>
  </>
)

export default NotFound
