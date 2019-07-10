import React, { Component } from 'react'

export default class AllUsers extends Component {
    render() {
        return (
            <div>
                <ul>
                    {this.props.allusers.map(u => <li key={u.id}>Username:{u.username} ; Password:{u.password}</li>)}
                </ul>
            </div>
        )
    }
}
