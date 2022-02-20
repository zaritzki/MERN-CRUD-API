import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { createGoal } from '../features/goals/goalSlice'

const GoalForm = () => {
	const [text, setText] = useState('')

	const dispatch = useDispatch()

	const handleSubmit = (e) => {
		e.preventDefault()

		let formValid = true

		if (text === '') {
			formValid = false
			toast.error('Please enter your goal')
		}

		if (formValid) {
			dispatch(createGoal({ text }))
			setText('')
		}
	}

	return (
		<section className='form'>
			<form onSubmit={handleSubmit}>
				<div className='form-group'>
					<label htmlFor='text'>Goal</label>
					<input
						type='text'
						name='text'
						id='text'
						value={text}
						onChange={(e) => setText(e.target.value)}
					/>
				</div>
				<div className='form-group'>
					<button className='btn btn-block' type='submit'>
						Add Goal
					</button>
				</div>
			</form>
		</section>
	)
}

export default GoalForm
