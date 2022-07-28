import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { NavLink } from 'react-router-dom';
import axios from 'axios' // Import axios library

// Initiate state
const initialstate = {
    employees: []
}

class Listing extends Component {
    state = initialstate // Define component state

    // Run the function at the time component is mounted.
    componentDidMount() {
        // Get employees from public/employees.json
        axios.get('/data/employees.json')
            .then((response) => {
                // Assign employees to employees array in state
                this.setState({
                    employees: response.data
                })
            })
            .catch((error) => {
                // Log when an error occured
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
                        {/* Create a link to /create page. NavLink component will redirect to link without browser reloading */}
                        <NavLink to="/create">
                            <button className="btn btn-primary btn-sm">Create Employee</button>
                        </NavLink>
                    </div>
                </div>

                {/* Check if employees are there in the employees state */}
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
                                {/* If employees are there, then run a loop to display each eployee details */}
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

// Export component
export default Listing

