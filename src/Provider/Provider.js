import React from 'react';
import {useState, createContext} from 'react'
import Nav from '../Components/Nav';
import Footer from '../Components/Footer';
import Modal from '../Components/Modal';
import { fetchData } from '../API/Fetch';

// Create Context object to consume data in other components

export const ContextData = createContext()

function Provider(props) {
    // declare state to toggle darkMode
    const [darkMode, setDarkMode] = useState(false)
    // declare test (same name) state to be used in components
    const [searchInput, setSearchInput] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [numResults, setNumResults] = useState("9");
    const [order, setOrder] = useState("relevance");

    // variable to hold darkMode styles object
    const darkStyles = {
        backgroundColor: 'black',
        color: 'aqua',
        border: '2px solid green'
    }

    // the value prop always takes in an object { {} } and can hold multiple values
    // The components or elements inside of Provider will ALWAYS BE RENDERED WHEN CONTEXTDATA IS USED, OR IF APP WRAPPED INSIDE OF PROVIDER COMPONENT (inside index.js)
    // ****** NEED {props.children} to render all child components ****
    return (
        <div style={ darkMode ? darkStyles : {}}>
       <ContextData.Provider 
       value = {{darkMode, setDarkMode, searchInput, setSearchInput, searchResult, setSearchResult, isOpen, setIsOpen, darkStyles , fetchData, order, setOrder, numResults, setNumResults}}> 
        
        <Nav />
        <Footer />
        {isOpen && <Modal />}
        
        {props.children}
       </ContextData.Provider>
       </div>
    );
}

export default Provider;