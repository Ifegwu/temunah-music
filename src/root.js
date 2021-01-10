import React from 'react'
import DashboardLanding from './components/Dashboard/DashboardLanding'

export default function Root({ children, props }) {
    return (
        <DashboardLanding {...props}>
            {children}
        </DashboardLanding>
    )
}