import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Display = props => <div>{props.value}</div>

const Button = ({ name, clickHandler }) => (
  <button onClick={clickHandler}>
    {name}
  </button>
)

const History = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>
        The app is used by pressing the buttons.
      </div>
    )
  }
  else {
    return (
      <div>
        Button press history: {props.allClicks.join(', ')}
      </div>
    )
  }
}

const App = () => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])

  const HandleLeftClick = () => {
    setAll(allClicks.concat('L'))
    setLeft(left + 1)
  }

  const HandleRightClick = () => {
    setAll(allClicks.concat('R'))
    setRight(right + 1)
  }

  return (
    <div>
      <div>
        {left}
        <Button name='left' clickHandler={HandleLeftClick} />
        <Button name='right' clickHandler={HandleRightClick} />
        {right}
        <History allClicks={allClicks} />
      </div>
    </div>
  )
}

ReactDOM.render(
  <App />, 
  document.getElementById('root')
)