import React, {Component} from 'react'

export default class TableRow extends Component {

    constructor(props) {
        super(props)

    }

    render () {
        return(
            <tr>
                {this.props.data.map( (val,i) => {
                    return <td key={i}>
                        {val}
                    </td>
                })}
            </tr>
        )
    }
}