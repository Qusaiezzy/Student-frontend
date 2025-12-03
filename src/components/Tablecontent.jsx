import React from 'react'

function Tablecontent() {
    return (
        <div className='root'>
            <div className="table">
                <table style={{border:'2px solid'}}> 
                    <tr >
                        <th>FA1</th>
                        <th>FA2</th>
                        <th>FA3</th>
                        <th>Out of</th>
                        <th>Teacher Reviews</th>
                        <th>Your Reviews</th>
                    </tr>
                     <tr >
                        <td>10</td>
                        <td>33</td>
                        <td>-</td>
                        <td>50</td>
                        <td>good</td>
                        <td>Your Reviews</td>
                    </tr>
                </table>
            </div>

        </div>
    )
}

export default Tablecontent