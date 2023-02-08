import {Link} from 'react-router-dom'
import './index.css'

const LogoImg = props => {
  const {details} = props
  const {id, logoUrl, name} = details
  return (
    <li className="logo-con">
      <Link to={`/courses/${id}`} className="link-1 log-con">
        <img src={logoUrl} alt={name} className="logo-img" />
        <p className="course-name">{name}</p>
      </Link>
    </li>
  )
}

export default LogoImg
