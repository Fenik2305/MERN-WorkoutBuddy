import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const WorkoutDetails = ( {workout} ) => {
    const { dispatch } = useWorkoutsContext();
    const { user } = useAuthContext()

    const handleEdit = async () => {
        if (!user) {
            return
        }

        const response = await fetch("/api/workouts/" + workout._id, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        });

        const json = await response.json();

        if (response.ok) {
            console.log(json)
            dispatch({type: 'CHANGE_FORM', payload: json})
        }
    }

    const handleDelete = async () => {
        if (!user) {
            return
        }

        const response = await fetch("/api/workouts/" + workout._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        });

        const json = await response.json();

        if (response.ok) {
            dispatch({type: 'DELETE_WORKOUT', payload: json})
        }
    }

    return(
        <div className="workout-details">
            <h4>{workout.title}</h4>
            <p><strong>Load (kg): </strong>{workout.load}</p>
            <p><strong>Reps: </strong>{workout.reps}</p>
            <p><strong>Created: </strong>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
            {workout.createdAt !== workout.updatedAt && <p><strong>Last updated: </strong>{formatDistanceToNow(new Date(workout.updatedAt), { addSuffix: true })}</p>}
            <div className="workout-actions-container">
                <span className="material-symbols-outlined" onClick={handleEdit}>edit</span>
                <span className="material-symbols-outlined" onClick={handleDelete}>delete</span> 
            </div>
        </div>
    )
}

export default WorkoutDetails