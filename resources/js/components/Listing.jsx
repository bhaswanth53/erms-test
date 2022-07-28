import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { NavLink } from 'react-router-dom';
import axios from 'axios'

const initialstate = {
    employees: []
}

class Listing extends Component {
    state = initialstate

    componentDidMount() {
        axios.get('/data/employees.json')
            .then((response) => {
                this.setState({
                    employees: response.data
                })
            })
            .catch((error) => {
                console.log('An error occured!')
            })
    }

    render() {
        return (
            <div className="container py-3">
                <div className="row">
                    <div className="col-md-6">
                        <p className="title">Employees List</p>
                    </div>
                    <div className="col-md-6 text-right">
                        <NavLink to="/create">
                            <button className="btn btn-primary btn-sm">Create Employee</button>
                        </NavLink>
                    </div>
                </div>
                {this.state.employees.length > 0 ? (
                    <div className="table-responsive">
                        <table className="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.employees.map((item, i) => {
                                    return (
                                        <tr key={i}>
                                            <td>{item.name}</td>
                                            <td>{item.email}</td>
                                            <td>{item.role}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div>
                        <h2>No Users Found</h2>
                    </div>
                )}
            </div>
        )
    }
}

export default Listing

