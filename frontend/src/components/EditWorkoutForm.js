import { useState } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext.js'
import { useAuthContext } from '../hooks/useAuthContext.js';

const EditWorkoutForm = ({ toEdit }) => {
    const { dispatch } = useWorkoutsContext();
    const {user} = useAuthContext()

    const [title, setTitle] = useState(toEdit.title);
    const [load, setLoad] = useState(toEdit.load);
    const [reps, setReps] = useState(toEdit.reps);
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);

    const handleSubmit = async (e) => {
      e.preventDefault()

      if (!user) {
        setError('You must be logged in!')
        return
      }

      const workout = {title, load, reps}

      const response = await fetch('/api/workouts/' + toEdit._id, {
        method: 'PATCH',
        body: JSON.stringify(workout),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
        }
      })

      const json = await response.json();

      if (!response.ok) {
        setError(json.error);
        setEmptyFields(json.emptyFields);
      }

      if (response.ok) {
        setEmptyFields([]);
        setError(null);
        setTitle('')
        setLoad('')
        setReps('')
      }

      const updatedWorkouts = await fetch('/api/workouts', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
      }
      })

      const workoutsJSON = await updatedWorkouts.json();

      if (updatedWorkouts.ok) {
        dispatch({type: 'EDIT_WORKOUT', payload: workoutsJSON})
      }
    }

    return(
        <form className='create' onSubmit={handleSubmit}>
            <h3>Edit workout</h3>

            <label>New title:</label>
            <input 
              type='text' 
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              className={emptyFields.includes('title') ? 'error' : ''}
            />

            <label>New load (kg):</label>
            <input 
              type='number' 
              onChange={(e) => setLoad(e.target.value)}
              value={load}
              className={emptyFields.includes('load') ? 'error' : ''}
            />

            <label>New reps:</label>
            <input 
              type='number' 
              onChange={(e) => setReps(e.target.value)}
              value={reps}
              className={emptyFields.includes('reps') ? 'error' : ''}
            />

            <button>Update workout</button>
            {error && <div className='error'>{error}</div>}
        </form>
    )
}

export default EditWorkoutForm