import React from 'react';
import { useState, useEffect } from 'react';
import { fetchData } from '../API/Fetch';
import VideoThumbnail from './VideoThumbnail';

function Home({setIsOpen}) {

    const [desVids, setDesVids] = useState([])
    const [dansVids, setDansVids] = useState([])
    const [dansTheme, setDansTheme] = useState("")
    const [desTheme, setDesTheme] = useState("")

    const dansPicks = ['seria a', 'qlimax', 'life hacks', 'react coding', 'funny cat videos', 'ted lasso']
    const desPicks = ['asian cuisine recipes', 'egypt pyramids','how to adult', 'resident evil', 'the office', 'hats' ]

    function randomize(arr) {
        const length = arr.length
        const index = Math.floor(Math.random() * length)
        return arr[index]
    }

    useEffect(() => {
        const danVal = randomize(dansPicks)
        const desVal = randomize(desPicks)
        setDansTheme(danVal)
        setDesTheme(desVal)
        const dansValue = fetchData(`search`, danVal, setDansVids, setIsOpen, 5 )
        
        const desValue = fetchData(`search`, desVal, setDesVids, setIsOpen, 5)

        // [dansValue,desValue].reduce(el => fetch =>[[],[]] => setFeatVids)
    //   const featData =  [dansValue,desValue].reduce((acc, el) => {
    
    //         fetchData('search', el, )
    //     }, [],[])

    }, [])
    return (
        <>
        <div className='featVids'>
            <h3>{dansTheme}</h3>
            {
                dansVids && dansVids.map((video) => {
                   return <VideoThumbnail key = {video.id.videoId} video = {video} videoId = {video.id.videoId} />
                })
            }
        </div>

        <div className='featVids'>
            <h3>{desTheme}</h3>
        {
              desVids &&  desVids.map((video) => {
                  return  <VideoThumbnail key = {video.id.videoId} video = {video} videoId = {video.id.videoId} />
                })
            }
        </div>
        </>
    );
}

export default Home;