import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './PageLink.css'

function PageLink(props) {
    const test = JSON.parse(window.localStorage.getItem("cats")).items
    console.log(test)
    const [results, setResults] = useState(test)


const pageToken = test.nextPageToken
// nextPageToken/prevPageToken - can be used as the value of the pageToken parameter to retrieve the next/previous page in the result set.
const next = JSON.parse(window.localStorage.getItem("pageToken")).nextKey

const previous = JSON.parse(window.localStorage.getItem("pageToken")).prevKey

// fetch shape w/ pageToken Param  : https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&order=relevance&pageToken=CAoQAA&q=cats&key=${process.env.REACT_APP_API_KEY}
/* return : {
  "kind": "youtube#searchListResponse",
  "etag": "N_S6CcchJAq4PfzbRs0kv8Ev6rM",
  "nextPageToken": "CBQQAA",
  "prevPageToken": "CAoQAQ",
  "regionCode": "US",
  "pageInfo": {
    "totalResults": 1000000,
    "resultsPerPage": 10
  },
  "items": [
    */
   function handleOnClick (e) {
    
    const value = e.target.innerText
    console.log(value)
    fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&order=relevance&pageToken=${value === `Next Page` ? next : previous}&q=cats&key=${process.env.REACT_APP_API_KEY}`)
        .then(resp => resp.json())
        .then(respJson => {
            console.log(respJson)
            // setResults(respJson.items)
            const tokenData = {
                'prevKey': respJson.prevPageToken,
                'nextKey': respJson.nextPageToken
            }
            window.localStorage.setItem("pageToken", JSON.stringify(tokenData))

        })
        .catch(err => console.log(err))

   }

    // useEffect(() => {
    //     fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&order=relevance&q=cats&key=${process.env.REACT_APP_API_KEY}`)
    //     .then(resp => resp.json())
    //     .then(respJson => {
    //         console.log(respJson)
    //         // setResults(respJson.items)
    //         const tokenData = {
    //             'prevKey': respJson.prevPageToken,
    //             'nextKey': respJson.nextPageToken
    //         }
    //         window.localStorage.setItem("pageToken", JSON.stringify(tokenData))

    //     })
    // },[])

    return (
        <div>
            {
                results.map(({snippet}) => <p>{snippet.title}</p>)
            }
            
            <div className='pageLinks'>
            
            <Link 
            to = "/videos/page"
            
            onClick= {(event) => {handleOnClick(event)}}
            ><span
            value = "next">Next Page</span></Link>
            
            <Link 
            to = "/videos/page"
            
            onClick= {(event) => {handleOnClick(event)}}><span
            value ="previous">Previous Page</span></Link>
            </div>
                
            
        </div>
    );
}

export default PageLink;