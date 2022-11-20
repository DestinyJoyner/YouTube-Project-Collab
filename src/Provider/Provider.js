import React from 'react';
import {useState, useContext, createContext} from 'react'
import Nav from '../Components/Nav';
import Footer from '../Components/Footer';
import { fetchData } from '../API/Fetch';

// Create Context object to consume data in other components

export const ContextData = createContext()

function Provider(props) {
    // declare state to toggle darkMode
    const [darkMode, setDarkMode] = useState(false)
    // declare state to possibly store fetchdata
    const [fetchResponse, setFetchResponse] = useState({})
    // declare state to hold single videoId value
    const [idForVid, setIdForVid] = useState("")

    // variable to hold darkMode styles object
    const darkStyles = {
        backgroundColor: 'black',
        color: 'aqua',
        border: '2px solid green'
    }

    // the value prop always takes in an object { {} } and can hold multiple values
    // The components or elements inside of Provider will ALWAYS BE RENDERED WHEN CONTEXTDATA IS USED, OR IF APP WRAPPED INSIDE OF PROVIDER COMPONENT (inside index.js)
    return (
       <ContextData.Provider 
       value = {{darkMode, setDarkMode, fetchResponse, setFetchResponse, idForVid, setIdForVid, darkStyles }}> 
        <Nav />
        <Footer />
       </ContextData.Provider>
    );
}

export default Provider;