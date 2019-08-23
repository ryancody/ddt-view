import React, { Component } from 'react'
import TableRow from './TableRow'

export default class Table extends Component {

    constructor(props) {
        super(props)

        this.state = {
            table: null,
            scrollWindowHeight: 200,
            scrollWindowPos: 0,
            data: this.props.data,
            filteredIDs: []
        }
    }

    componentDidMount() {
        document.addEventListener('scroll', this.trackScrolling)
        this.setState({ table: document.getElementById('table') })
        console.log('mounted')
    }

    componentWillUnmount() {
        document.removeEventListener('scroll', this.trackScrolling);
    }

    trackScrolling = () => {
        if (this.state.table.getBoundingClientRect().top >= 0) {
            let newPos = this.state.scrollWindowPos - this.state.scrollWindowHeight
            if (newPos < 0) {
                newPos = 0
            }
            this.setState({ scrollWindowPos: newPos })
        }
        if (this.state.table.getBoundingClientRect().bottom <= window.innerHeight) {
            let newPos = this.state.scrollWindowPos + this.state.scrollWindowHeight
            if (newPos > this.state.data.length - this.state.scrollWindowPos) {
                newPos = this.state.data.length - this.state.scrollWindowPos
            }
            this.setState({ scrollWindowPos: newPos })
        }
    }

    addtoFilteredIds = (id) => {
        let newIds = Array.from(this.state.filteredIDs)
        newIds.push(id)
        console.log('filtered ids', newIds)
        this.setState({ filteredIDs: newIds })
    }

    renderRows = (pos) => {
        let rows = []

        let bottom = pos;
        if (bottom < 0) {
            bottom = 0
        }

        let top = pos + this.state.scrollWindowHeight
        if (top > this.state.data.length - 1) {
            top = this.state.data.length - 1
        }

        for (let i = bottom; i < top; i++) {
            if (!this.state.filteredIDs.includes(this.state.data[i][1])) {
                let row = <tr key={i}>{this.state.data[i].map((v, j) => { return <td onClick={() => this.addtoFilteredIds(this.state.data[i][1])} key={j}>{v}</td> })}</tr>

                rows.push(row)
            }
        }

        return rows
    }

    render() {

        let tableHead = ['Time', 'ID', 'TX/RX', 'Length', 'Data']

        return (
            <div className='table-container'>
                <table id='table' className='table is-fullwidth'>
                    <thead>
                        <tr>
                            {tableHead.map((val, i) => {
                                return <th key={i}>{val}</th>
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderRows(this.state.scrollWindowPos)}
                    </tbody>
                </table>
            </div>
        )
    }
}