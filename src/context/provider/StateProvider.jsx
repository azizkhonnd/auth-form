/* eslint-disable react/prop-types */
import reducer, { initialState } from "../reducer/reducer"
import { useReducer } from "react"
import AppContext from "../store"

const StateProvider = ({ children }) => {
    return (
        <AppContext.Provider value={useReducer(reducer, initialState)}>
            {children}
        </AppContext.Provider>

    )
}

export default StateProvider