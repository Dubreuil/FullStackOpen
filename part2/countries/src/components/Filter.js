import React from 'react'

const Filter = ({label, filterText, filterChangeHandler}) => {
    return (
        <div>
            <label>{ label } </label>
            <input value={filterText} onChange={filterChangeHandler} />
        </div>
    )
}

export default Filter