import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { NavLink } from 'react-router-dom';
import axios from 'axios' // Import axios library
import Fav from 'favjs' // Import favjs library for form validation

// Create state constant
const initialstate = {
    name: "",
    email: "",
    role: "",
    roles: [
        'Administrator',
        'Editor',
        'Subscriber',
        'Author'
    ],
    errors: [],
    message: ""
}

class Create extends Component {
    state = initialstate // Define state

    // Run the function when form submitted
    handleSubmit = (e) => {
        // Prevent browser from doing anything.
        e.preventDefault()
        // Validate the form
        let validate = this.validateForm()
        if(validate == true) {
            // If validation is success, then create post data.
            let formData = {
                name: this.state.name,
                email: this.state.email,
                role: this.state.role
            }

            // Initiate HTTP request
            axios.post('/add', formData)
                .then((response) => {
                    /**
                     * If employee is added
                     * Log response data
                     * Update state with response message and clear errors list.
                     */
                    console.log(response.data)
                    this.setState({
                        message: response.data,
                        errors: []
                    })
                })
                .catch((error) => {
                    /**
                     * In case any error.
                     * Log error
                     */
                    console.log(error)
                    if(error.response) {
                        if(error.response.status == 422) {
                            /**
                             * If the error status code is 422, that means form validation is failed on the backend. Then update state to add response data to errors from backend.
                             */
                            this.setState({
                                errors: error.response.data
                            })
                        }
                    }
                })
        } else {
            /**
             * If frontend validation fails, then update the errors.
             */
            this.setState({
                errors: validate
            })
        }
    }

    // Update state with input values.
    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        });
    }

    // Validate form function
    validateForm = () => {
        // Define form data
        let formData = {
            name: this.state.name,
            email: this.state.email,
            role: this.state.role
        }

        // Initiate validator
        let fav = new Fav(formData)
        // Define rules
        fav.name('Full name').value('name').required()
        fav.name('Email Address').value('email').required().isEmail()
        fav.name('Role').value('role').required()
        if(fav.isSuccess()) {
            // If validation is success, return true
            return true
        }
        // If validation fails, then return error messages.
        return fav.geterrors()
    }

    render() {
        return (
            <div className="container py-3">
                <div className="row">
                    <div className="col-md-6">
                        <p className="title">Create Employee</p>
                    </div>
                    <div className="col-md-6 text-right">
                        <NavLink to="/">
                            <button className="btn btn-warning btn-sm">Back To Listing</button>
                        </NavLink>
                    </div>
                </div>
                {/* Check if any message is present. If present, then display it. This will be used to display success message after creating the employee. */}
                {this.state.message != '' ? (
                    <p className="text-success">{this.state.message}</p>
                ) : (
                    <p></p>
                )}
                <div>
                    {/* Create form and assign handle function */}
                    <form className="col-md-6" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label className="control-label">Full Name</label>
                            {/* Create input and assign onchange function */}
                            <input type="text" className="form-control" name="name" onChange={this.handleChange.bind(this)} />
                            {/* Check if the error is present. If present then display the error */}
                            {this.state.errors.name ? (
                                <span className="text-danger">{this.state.errors.name}</span>
                            ) : (
                                <span></span>
                            )}
                        </div>
                        <div className="form-group">
                            <label className="control-label">Email Address</label>
                            <input type="text" className="form-control" name="email" onChange={this.handleChange.bind(this)} />
                            {this.state.errors.email ? (
                                <span className="text-danger">{this.state.errors.email}</span>
                            ) : (
                                <span></span>
                            )}
                        </div>
                        <div className="form-group">
                            <label className="control-label">Role</label>
                            <select className="form-control" name="role" onChange={this.handleChange.bind(this)}>
                                <option value="">-- select --</option>
                                {/* Load options from state roles */}
                                {this.state.roles.map((item, i) => {
                                    return (
                                        <option key={i} value={item}>{item}</option>
                                    )
                                })}
                            </select>
                            {this.state.errors.role ? (
                                <span className="text-danger">{this.state.errors.role}</span>
                            ) : (
                                <span></span>
                            )}
                        </div>
                        {/* Submit form */}
                        <div className="form-group mt-2">
                            <button type="submit" className="btn btn-primary btn-sm">Create</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

// Export component
export default Create