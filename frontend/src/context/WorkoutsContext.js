import { createContext, useReducer } from "react";
import CreateWorkoutForm from "../components/CreateWorkoutForm";
import EditWorkoutForm from "../components/EditWorkoutForm";

export const WorkoutsContext = createContext();

export const workoutsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_WORKOUTS':
            return {
                actualWorkoutForm: <CreateWorkoutForm />,
                workouts: action.payload
            }
        case 'CREATE_WORKOUT':
            return {
                actualWorkoutForm: <CreateWorkoutForm />,
                workouts: [action.payload, ...state.workouts]
            }
        case 'DELETE_WORKOUT':
            return {
                actualWorkoutForm: <CreateWorkoutForm />,
                workouts: state.workouts.filter((w) => w._id !== action.payload._id)
            }
        case 'CHANGE_FORM':
            return {
                actualWorkoutForm: <EditWorkoutForm toEdit={action.payload} />,
                workouts: state.workouts
            }
        case 'EDIT_WORKOUT':
            return {
                actualWorkoutForm: <CreateWorkoutForm/>,
                workouts: action.payload
            }
        default:
            return state
    }
}

export const WorkoutsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(workoutsReducer, {
        actualWorkoutForm: <CreateWorkoutForm />,
        workouts: null
    })

    return (
        <WorkoutsContext.Provider value={{...state, dispatch}}>
            { children }
        </WorkoutsContext.Provider>
    )
}