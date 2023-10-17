import { useEffect } from "react"
import { useWorkoutsContext } from '../hooks/useWorkoutsContext.js'

import WorkoutDetails from "./WorkoutDetails.js"
import CreateWorkoutForm from "./CreateWorkoutForm.js"
import EditWorkoutForm from "./EditWorkoutForm.js"

const Home = () => {
    const {workouts, actualWorkoutForm, dispatch} = useWorkoutsContext()

    useEffect(() => {
      const fetchWorkouts = async () => {
        const response = await fetch('/api/workouts')
        const json = await response.json()
  
        if (response.ok) {
          dispatch({type: 'SET_WORKOUTS', payload: json})
        }
      }
  
      fetchWorkouts()
    }, [dispatch])
    
    return (
        <div className="home">
            <div className="workouts">
                {workouts && workouts.map((workout) => (
                    <WorkoutDetails key={workout._id} workout={workout}/>
                ))}
            </div>
            {actualWorkoutForm}
        </div>
    )
}

export default Home