import React, { useState, useEffect } from 'react';
import Layout from '../components/Frontend/Layout';
import { parse } from "query-string"
import { useLocation } from "@reach/router"
import { Snackbar } from '@material-ui/core';

const Auth = ({ children }) => {
  const [openError, setOpenError] = useState(true)
    const [param, setParam] = useState(false)

    const location = useLocation()

    useEffect(() => {
        const searchParams = parse(location.search)
		setParam(searchParams)
		
		if(openError){
				setTimeout(() => {
				setOpenError(false)
			}, 6000)
        }
    }, [setParam, setOpenError])

  return (
    <Layout>
      <>
        {children}
        {
          param.message && <Snackbar message={param.message} open={openError} autoHideDuration={6000} />
        }
      </>
    </Layout>
  )
}

export default Auth;

