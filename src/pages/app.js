import React from "react"
import { Router } from "@reach/router"
import Layout from "../components/Frontend/Layout"
import Profile from "../components/Dashboard/Profile"
import Authenticate from "../components/Auth/Authenticate"
import DashboardComponent from '../components/Dashboard/DashboardComponent'
import PrivateRoute from '../components/Dashboard/PrivateRoute'

const App = () => (
  <Layout>
    <Router>
      <PrivateRoute path="/app/profile"  component={Profile} />
      <PrivateRoute path="/app/dashboard" component={DashboardComponent} />
      <Authenticate path="/app/login" component={Authenticate} />
    </Router>
  </Layout>
)

export default App