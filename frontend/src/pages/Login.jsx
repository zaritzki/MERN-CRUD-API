import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaSignInAlt } from 'react-icons/fa'

import { login, reset } from '../features/auth/authSlice'

import Spinner from '../components/Spinner'

const Login = () => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	})

	// Destructure the fields from our formData
	const { email, password } = formData

	// init
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const { user, isLoading, isSuccess, isError, message } = useSelector(
		(state) => state.auth
	)

	useEffect(() => {
		if (isError) {
			toast.error(message)
		}

		if (isSuccess || user) {
			navigate('/dashboard') // redirect to dashboard
		}

		// dispatch to reset
		dispatch(reset())
	}, [user, isError, isSuccess, message, navigate, dispatch])

	const onChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}))
	}

	const handleSubmit = (e) => {
		e.preventDefault()

		let formValid = true

		if (email === '') {
			formValid = false
			toast.error('Please enter your email')
		}
		if (password === '') {
			formValid = false
			toast.error('Please enter your password')
		}

		if (formValid) {
			const userData = {
				email,
				password,
			}
			dispatch(login(userData))
		}
	}

	if (isLoading) {
		return <Spinner />
	}

	return (
		<>
			<section className='heading'>
				<h1>
					<FaSignInAlt /> Login
				</h1>
				<p>Login your account</p>
			</section>
			<section className='form'>
				<form onSubmit={handleSubmit}>
					<div className='form-group'>
						<input
							type='email'
							className='form-control'
							id='email'
							name='email'
							value={email}
							placeholder='Enter your email'
							onChange={onChange}
						/>
					</div>
					<div className='form-group'>
						<input
							type='password'
							className='form-control'
							id='password'
							name='password'
							value={password}
							placeholder='Enter your password'
							onChange={onChange}
						/>
					</div>
					<div className='form-group'>
						<button type='submit' className='btn btn-block'>
							Login
						</button>
					</div>
				</form>
			</section>
		</>
	)
}

export default Login
