import React, { Component } from 'react'

let ProcessFile = (props) => {

    let displayData = props.data.map( (val,i) => {

        return(
            <tr key={i}>
                {
                    val.split(' ').map( (c, j) => {
                        return(
                            <td key={j}>
                                {c}
                            </td>
                        )
                    })
                }
            </tr>
        )
    })

    return (
        <div className='table-container'>
            <table className='table is-bordered'>
                <thead>           
                </thead>
                <tbody>
                    {displayData}
                </tbody>
            </table>
        </div>
    )
}

export default ProcessFile