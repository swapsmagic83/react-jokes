import React from "react";

const Joke = ({id,joke,vote,votes}) =>{
    function addVote(){
        vote(id,+1)
    }
    function subtractVote(){
        vote(id,-1)
    }
    return (
        <>
        <div>
        <button onClick={addVote}>
            <i className="fas fa-thumbs-up"></i>
        </button>
        <button onClick={subtractVote}>
            <i className="fas fa-thumbs-down"></i>
        </button>
        {votes}
        <p>{joke}</p>
        </div>
        </>
    )
}
export default Joke