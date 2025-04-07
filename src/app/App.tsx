import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import './App.css'
import { jwtDecode } from 'jwt-decode'
import AppBar from './AppBar.tsx'
import { Container, TextField, InputAdornment, Stack, ToggleButtonGroup, ToggleButton } from '@mui/material'
import { AccountCircle, Visibility, VisibilityOff } from '@mui/icons-material'
import Button from '@mui/material/Button'
import { SyntheticEvent, useState } from 'react'
import IconButton from '@mui/material/IconButton'

interface AppProps {
	mode: string
	toggleTheme: (theme: string) => void
}

function App({ mode, toggleTheme }: AppProps) {
	const [user, setUser] = useState<{ access_token: string; username: string } | null>(null)
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [loading, setLoading] = useState(false)
	const [loginFormName, setLoginFormName] = useState('login')
	const [showPassword, setShowPassword] = useState(false)

	const handleClickShowPassword = () => setShowPassword(!showPassword)

	const handleUserNameChange = (e: SyntheticEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		setEmail(e.currentTarget.value)
	}

	const handlePasswordChange = (e: SyntheticEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		setPassword(e.currentTarget.value)
	}

	const handleLogin = async () => {
		setLoading(true)
		const loginResponse = await fetch('https://todos-be.vercel.app/auth/login', {
			method: 'POST',
			body: JSON.stringify({ username: email, password }),
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
			},
		})
		const loginData = (await loginResponse.json()) as { access_token: string; username: string }
		const accessToken = loginData.access_token
		console.log(jwtDecode(accessToken))

		localStorage.setItem('accessToken', accessToken)
		setLoading(false)
		setUser(loginData)
	}

	const handleRegister = async () => {
		setLoading(true)
		await fetch('https://todos-be.vercel.app/auth/register', {
			method: 'POST',
			body: JSON.stringify({ username: email, password }),
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
			},
		})
		setLoading(false)
	}

	const handleChange = (_event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
		setLoginFormName(loginFormName === 'login' ? 'register' : 'login')
	}

	return (
		<>
			<AppBar
				username={user?.username}
				mode={mode}
				toggleTheme={() => toggleTheme(mode === 'dark' ? 'light' : 'dark')}
			/>
			<div style={{ marginTop: '100px' }}></div>
			<Container maxWidth={'sm'} sx={{ boxShadow: 3, padding: 6, borderRadius: 3 }}>
				<ToggleButtonGroup
					disabled={loading}
					size={'small'}
					fullWidth={true}
					sx={{ marginBottom: 2 }}
					color="primary"
					value={loginFormName}
					exclusive
					onChange={handleChange}
					aria-label="Platform"
				>
					<ToggleButton value="login">Login</ToggleButton>
					<ToggleButton value="register">Register</ToggleButton>
				</ToggleButtonGroup>
				{loginFormName === 'login' ? (
					<Stack spacing={2}>
						<TextField
							disabled={loading}
							value={email}
							onChange={handleUserNameChange}
							id="filled-basic"
							label="email"
							variant="filled"
							slotProps={{
								input: {
									startAdornment: (
										<InputAdornment position="start">
											<AccountCircle />
										</InputAdornment>
									),
								},
							}}
						/>
						<TextField
							id="filled-basic"
							disabled={loading}
							value={password}
							onChange={handlePasswordChange}
							type={showPassword ? 'text' : 'password'}
							label="password"
							variant="filled"
							slotProps={{
								input: {
									startAdornment: (
										<InputAdornment position="start">
											<AccountCircle />
										</InputAdornment>
									),
									endAdornment: (
										<InputAdornment position="end">
											<IconButton
												aria-label={showPassword ? 'hide password' : 'show password'}
												onClick={handleClickShowPassword}
												edge="end"
											>
												{showPassword ? <VisibilityOff /> : <Visibility />}
											</IconButton>
										</InputAdornment>
									),
								},
							}}
						/>
						<Button variant="contained" onClick={handleLogin} loadingPosition={'start'} loading={loading}>
							{loading ? 'Logging' : 'Login'}
						</Button>
					</Stack>
				) : (
					<Stack spacing={2}>
						<TextField
							disabled={loading}
							value={email}
							onChange={handleUserNameChange}
							id="filled-basic"
							label="email"
							variant="filled"
							slotProps={{
								input: {
									startAdornment: (
										<InputAdornment position="start">
											<AccountCircle />
										</InputAdornment>
									),
								},
							}}
						/>
						<TextField
							id="filled-basic"
							disabled={loading}
							value={password}
							onChange={handlePasswordChange}
							type={showPassword ? 'text' : 'password'}
							label="password"
							variant="filled"
							slotProps={{
								input: {
									startAdornment: (
										<InputAdornment position="start">
											<AccountCircle />
										</InputAdornment>
									),
									endAdornment: (
										<InputAdornment position="end">
											<IconButton
												aria-label={showPassword ? 'hide password' : 'show password'}
												onClick={handleClickShowPassword}
												edge="end"
											>
												{showPassword ? <VisibilityOff /> : <Visibility />}
											</IconButton>
										</InputAdornment>
									),
								},
							}}
						/>
						<Button variant="contained" onClick={handleRegister} loadingPosition={'start'} loading={loading}>
							{loading ? 'Registering' : 'Register'}
						</Button>
					</Stack>
				)}
			</Container>
		</>
	)
}

export default App
