import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({ text }) => {
  return (
    <h1>{text}</h1>
  )
}

const Button = ({ text, clickHandler }) => (
  <button onClick={clickHandler}>
    {text}
  </button>
)

const Statistic = ({ text, value }) =>  {
  return (
    <tr>
      <td>{ text }</td>
      <td>{ value }</td>
    </tr>
  )
}

const Statistics = ({ statistics }) => {

  let content = (
    <p>No feedback given yet</p>
  )

  if (statistics.totalVotes !== 0) {

    let resultsItems = statistics.results.map(result => {
      return (
        <Statistic key={ result.name } text={ result.name } value={ result.value } />
      )
    })
    
    content = (
      <table>
        <tbody>
          { resultsItems }
          <Statistic text="Total votes" value={ statistics.totalVotes } />
          <Statistic text="Average score" value={ statistics.averageScore } />
          <Statistic text="Positive %" value={ statistics.positivePercent } />
        </tbody>
      </table>
    )
  }
  return (
    <div>
      <h2>{ statistics.statisticsHeader }</h2>
      { content }
    </div>
  )
}

const Input = ({ buttons }) => { 
  let buttonsPrint = buttons.map(buttonItem => {
    return (
      <Button key={ buttonItem.text } text={ buttonItem.text } clickHandler={ buttonItem.clickHandler } />
    )
  })
  return (
    <div>
      { buttonsPrint }
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const ClickHandlerGood = () => (
    setGood(good + 1)
  )
  const ClickHandlerNeutral = () => (
    setNeutral(neutral + 1)
  )
  const ClickHandlerBad = () => (
    setBad(bad + 1)
  )

  const buttons = [{
    text: "Bad",
    clickHandler: ClickHandlerBad
  }, {
    text: "Neutral",
    clickHandler: ClickHandlerNeutral
  }, {
    text: "Good",
    clickHandler: ClickHandlerGood
  }]

  let totalVotes = (bad+neutral+good)

  const statistics = {
    statisticsHeader: 'Statistics',
    results: [
      {
        name: 'Bad',
        value: bad
      }, {
        name: 'Neutral',
        value: neutral
      }, {
        name: 'Good',
        value: good
      }
    ],
    totalVotes: totalVotes,
    averageScore: totalVotes === 0 ? 0 : ((bad*-1) + (good)) / totalVotes,
    positivePercent: totalVotes === 0 ? 0 : good * 100 / totalVotes
  }

  return (
    <div>
      <Header text='Give Unicafe feedback' />
      <Input buttons={buttons} />
      <Statistics statistics={statistics} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))