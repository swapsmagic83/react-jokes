import React, {useState, useEffect} from "react";
import axios from "axios"
import Joke from "./Joke";
import "./JokeList.css"

const JokeList = ({numJokesToGet=5}) =>{
    const [jokes,setJokes] = useState([])
    const [loading,setLoading] = useState(true)

    useEffect(()=>{
        async function addNewJokes(){
            let allJokes= [...jokes]
            let seenJokes = new Set();
            try{
                while(allJokes.length <numJokesToGet){
                    let res = await axios.get("https://icanhazdadjoke.com/",{
                        headers: { Accept: "application/json" }
                    })
                    let {...jokeObj} =res.data
                    if (!seenJokes.has(jokeObj.id)) {
                        seenJokes.add(jokeObj.id);
                        allJokes.push({ ...jokeObj, votes: 0 });
                      } else {
                        console.error("duplicate found!");
                      }
                }
                setJokes(allJokes)
               setLoading(false)
            } catch(err){
                console.error(err)
            }    
        }
        if(jokes.length===0) addNewJokes()
    },[jokes,numJokesToGet])

    const generateNewJokes =() =>{
        setJokes([])
        setLoading(true)
    }

   function vote(id,delta) {
        setJokes(allJokes =>
            allJokes.map(j => (j.id === id ? { ...j, votes: j.votes + delta } : j))
          );
    }
    if (loading) {
        return (
          <div className="loading">
            <i className="fas fa-4x fa-spinner fa-spin" />
          </div>
          )
      }
      let sortedJokes = [...jokes].sort((a, b) => b.votes - a.votes);
    return (
        <>
       <button onClick={generateNewJokes} className="JokeList-getmore">Get New Jokes</button>
        {sortedJokes.map(joke =>(
            <Joke id={joke.id} joke={joke.joke} vote={vote} votes={joke.votes}/>
        ))}
        </>
    )
}
export default JokeList