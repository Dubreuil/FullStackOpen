import React from 'react'

const Filter = ({filterText, handleFilterChange}) => 
    <div>
        Name Filter: <input value={filterText} onChange={handleFilterChange} />
    </div>

export default Filter