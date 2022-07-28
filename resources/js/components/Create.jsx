import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { NavLink } from 'react-router-dom';
import axios from 'axios'
import Fav from 'favjs'

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
    state = initialstate

    handleSubmit = (e) => {
        e.preventDefault()
        let validate = this.validateForm()
        if(validate == true) {
            let formData = {
                name: this.state.name,
                email: this.state.email,
                role: this.state.role
            }

            axios.post('/add', formData)
                .then((response) => {
                    console.log(response.data)
                    this.setState({
                        message: response.data,
                        errors: []
                    })
                })
                .catch((error) => {
                    if(error.response) {
                        if(error.response.status == 422) {
                            this.setState({
                                errors: error.response.data
                            })
                        }
                    }
                })
        } else {
            this.setState({
                errors: validate
            })
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        });
    }

    validateForm = () => {
        let formData = {
            name: this.state.name,
            email: this.state.email,
            role: this.state.role
        }

        let fav = new Fav(formData)
        fav.name('Full name').value('name').required()
        fav.name('Email Address').value('email').required().isEmail()
        fav.name('Role').value('role').required()
        if(fav.isSuccess()) {
            return true
        }
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
                {this.state.message != '' ? (
                    <p className="text-success">{this.state.message}</p>
                ) : (
                    <p></p>
                )}
                <div>
                    <form className="col-md-6" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label className="control-label">Full Name</label>
                            <input type="text" className="form-control" name="name" onChange={this.handleChange.bind(this)} />
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
                        <div className="form-group mt-2">
                            <button type="submit" className="btn btn-primary btn-sm">Create</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default Create