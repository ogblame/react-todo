import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { useState } from 'react'

export default function Root() {
	const [darkMode, setDarkMode] = useState(false)

	const theme = createTheme({
		palette: {
			mode: darkMode ? 'dark' : 'light',
		},
	})

	const toggleTheme = () => {
		setDarkMode((prevMode) => !prevMode)
	}

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<App mode={theme.palette.mode} toggleTheme={toggleTheme} />
		</ThemeProvider>
	)
}

createRoot(document.getElementById('root')!).render(<Root />)
