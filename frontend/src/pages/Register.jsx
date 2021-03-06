import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaUser } from 'react-icons/fa'

import { register, reset } from '../features/auth/authSlice'

import Spinner from '../components/Spinner'

const Register = () => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
	})

	// Destructure the fields from our formData
	const { name, email, password, confirmPassword } = formData

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

		if (name === '') {
			formValid = false
			toast.error('Please enter your name')
		}

		if (email === '') {
			formValid = false
			toast.error('Please enter your email')
		}

		if (password === '') {
			formValid = false
			toast.error('Please enter your password')
		}

		if (confirmPassword === '') {
			formValid = false
			toast.error('Please confirm your password')
		}

		if (password !== confirmPassword) {
			formValid = false
			toast.error('Password do not match')
		}

		if (formValid) {
			const userData = {
				name,
				email,
				password,
				userType: 1,
			}

			dispatch(register(userData))
		}
	}

	if (isLoading) {
		return <Spinner />
	}

	return (
		<>
			<section className='heading'>
				<h1>
					<FaUser /> Register
				</h1>
				<p>Please create an account</p>
			</section>
			<section className='form'>
				<form onSubmit={handleSubmit}>
					<div className='form-group'>
						<input
							type='text'
							className='form-control'
							id='name'
							name='name'
							value={name}
							placeholder='Enter your name'
							onChange={onChange}
						/>
					</div>
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
						<input
							type='password'
							className='form-control'
							id='confirmPassword'
							name='confirmPassword'
							value={confirmPassword}
							placeholder='Confirm your password'
							onChange={onChange}
						/>
					</div>
					<div className='form-group'>
						<button type='submit' className='btn btn-block'>
							Register
						</button>
					</div>
				</form>
			</section>
		</>
	)
}

export default Register
