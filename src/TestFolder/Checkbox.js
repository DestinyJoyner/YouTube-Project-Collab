import React from 'react';
import './Checkbox.css'

function Checkbox({checked, setChecked, id, videoList, setVideoList}) {

    function handleOnChange(e) {
        console.log(e.target.value)
        setChecked(!checked)
        if(!videoList.includes(e.target.value)){
            videoList.push(e.target.value)
        }
        else {
           const remove = videoList.filter(el => el !== e.target.value)
           setVideoList(remove)
           setChecked(!checked)
        }
        
    }
    return (
        <div className='checkbox'>
        <label htmlFor='checkbox'>Add to Favorites:</label>
        <br></br>
        <input 
        type= "checkbox"
        name = "checkbox"
        value={id}
        onChange={(event) => handleOnChange(event)} />
    </div>
    );
}

export default Checkbox;