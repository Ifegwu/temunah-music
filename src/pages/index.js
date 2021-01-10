import React, { useState, useEffect } from 'react';
import Layout from '../components/Frontend/Layout';
import { parse } from "query-string"
import { useLocation } from "@reach/router"
import { Snackbar } from '@material-ui/core';
import theme from '../components/ThemeModified'
import { ThemeProvider } from 'styled-components';

const IndexPage = ({ children }) => {
  const [openError, setOpenError] = useState(true)
  const [param, setParam] = useState(false)
  
  	const location = useLocation()
	useEffect(() => {
		const searchParams = parse(location.search)
		setParam(searchParams)
		// console.log(searchParams.message)
		
		if(openError){
			setTimeout(() => {
				setOpenError(false)
			}, 6000)
		}	
	}, [setParam])


  return (
    <Layout>
		<>
			{
				param.message && 
					<ThemeProvider theme={theme}>
						<Snackbar message={param.message} open={openError} autoHideDuration={6000} />
					</ThemeProvider>
			}
			{children}
		</>
    </Layout>
  )
}

export default IndexPage;

