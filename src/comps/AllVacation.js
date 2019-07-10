import React, { Component } from 'react'
import Vacation from './Vacation';





// all vacations view

export default class AllVacation extends Component {
    render() {
        return (
            <div>
                <h2>all vacations</h2>
                {this.props.vacs.map(v => <Vacation key={v.id} refresh={this.props.refresh} vac={v}/>)}
            </div>
        )
    }
}
