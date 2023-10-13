import { useState, useEffect } from "react"

import WorkoutDetails from "./WorkoutDetails.js"
import WorkoutForm from "./WorkoutForm.js"

const Home = () => {
    const [workouts, setWorkouts] = useState(null)
  
    useEffect(() => {
      const fetchWorkouts = async () => {
        const response = await fetch('/api/workouts')
        const json = await response.json()
  
        if (response.ok) {
          setWorkouts(json)
          console.log(json)
        }
      }
  
      fetchWorkouts()
    }, [])
    
    return (
        <div className="home">
            <div className="workouts">
                {workouts && workouts.map((workout) => (
                    <WorkoutDetails key={workout._id} workout={workout}/>
                ))}
            </div>
            <WorkoutForm />
        </div>
    )
}

export default Home