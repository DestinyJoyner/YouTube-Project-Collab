import React from 'react';
import { useState, useEffect } from 'react';
import "./CommentForm.css" 

function CommentForm({videoId}) {
    const commentArr = window.localStorage.getItem(videoId) ? JSON.parse(window.localStorage.getItem(videoId)) : []
    // declare state for storing comments 
    const [comments, setComments] = useState(commentArr)

    // declare state for new comments
    const [newComment, setNewComment] = useState({
        commenter: "",
        comment: ""
    })

    // function for handling newComments
    function handleNewComment (e) {
        setNewComment({...newComment, [e.target.id] : e.target.value})
    }

    // function for storing comment to video
    function addComment() {
        const comment = {
            commenter: newComment.commenter,
            comment: newComment.comment,
        }
        commentArr.push(comment)
        setComments([...comments, comment])
        
    }

    // function for form reset
    function resetForm() {
        setNewComment({
            commenter: "",
            comment: ""
        })
    }

    // function for submitHandle
    function handleSubmit(e) {
        e.preventDefault()
        addComment()
        window.localStorage.setItem(videoId, JSON.stringify(commentArr))
        resetForm()
    }

    useEffect(() => {},[commentArr.length])
    
    return (
        <div className = "commentSection">
            <form 
            onSubmit = {(event) => handleSubmit(event)}
            className = "commentForm">
                <h4>Leave A Comment:</h4>
                
                <label htmlFor = 'commenter'><span>Name: </span>
                    <input
                    type = "text"
                    id = "commenter"
                    value = {newComment.commenter} 
                    onChange = {(event) => handleNewComment(event)}/>
                </label>

                <label htmlFor = 'comment'><span>Comment: </span>  
                    <input
                    type = "text"
                    id = "comment"
                    value = {newComment.comment} 
                    onChange = {(event) => handleNewComment(event)}/>
                </label>

                <input 
                type = "submit"
                className = 'commentButton'
                value = "Add Comment"/>

            </form>
        <div className = 'comments'>
            <ul>
                {
                    comments.map(({comment, commenter}) => 
                        <li>
                            <h4>{commenter}</h4>
                            <p>{comment}</p>
                        </li>
                    )
                }
            </ul>

        </div>

            
        </div>
    );
}

export default CommentForm;