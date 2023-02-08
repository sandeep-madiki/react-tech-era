import {Switch, Route, Redirect} from 'react-router-dom'

import './App.css'
import Home from './components/home'
import Details from './components/courseDetails'
import NotFound from './components/notFound'

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/courses/:id" component={Details} />
    <Route exact path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
