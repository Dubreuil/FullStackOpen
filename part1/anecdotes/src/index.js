import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ text, clickHandler }) => {
  return (
    <button onClick={ clickHandler }>{ text }</button>
  )
}

const Content = ({ header, anecdote, votes }) => {
  if (votes === 0) {
    return (
      <div>
        <h1>{ header }</h1>
        <div>No votes yet</div>
      </div>
    )
  }
  
  else {
    return (
      <div>
        <h1>{ header }</h1>
        <div>{ anecdote }</div>
        <div>This anecdote has { votes } votes</div>
      </div>
    )
  }
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(initVotes) 

  const NewAnecdote = () => {
    let newSelected = Math.floor(Math.random() * anecdotesLength)
    setSelected(newSelected)
  }

  const VoteClickHandler = () => {
    const votesCopy = [...votes]
    votesCopy[selected] += 1
    setVotes(votesCopy)
  }

  const MostVotes = () => {
    return votes.indexOf(Math.max(...votes))
  }

  return (
    <div>
      <div>
        {props.anecdotes[selected]}
        <div>This anecdote has { votes[selected] } votes</div>
      </div>
      <div>
        <Button text="Vote" clickHandler={ VoteClickHandler } />
        <Button text="Next anecdote" clickHandler={ NewAnecdote } />
      </div>
      <Content header="Anecdote with most votes" anecdote={ anecdotes[MostVotes()] } votes={ votes[MostVotes()] } />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const anecdotesLength = anecdotes.length
const initVotes = new Uint8Array(anecdotesLength);

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)