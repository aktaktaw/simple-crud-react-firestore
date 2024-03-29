import React,{Component} from 'react'
import ReactDOM from 'react-dom'
import firebase from '../config/Firebase'
import {Link} from 'react-router-dom'
import { stat } from 'fs'
import { tsThisType } from '@babel/types'

class Create extends Component{
    constructor(){
        super()
        this.ref = firebase.firestore().collection('boards')
        this.state= {
            title:'',
            description :'',
            author: ''
        }
    }

    onChange = (e) =>{
        const state = this.state
        state[e.target.name] = e.target.value
        this.setState(state)
    }
    
    onSubmit = (e) =>{
        e.preventDefault()
        
        const {title, description, author} = this.state

        this.ref.add({
            title,
            description,
            author
        }).then((docRef)=>{
            this.setState({
                title:'',
                description:'',
                author: ''
            })
            this.props.history.push("/")
        })
        .catch((error)=>{
            console.error("Error insert document", error);
        })
    }

    render(){
        const {title, description, author} = this.state

        return(
            <div class="container">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h3>ADD BOARD</h3>
                    </div>
                    <div class="panel-body">
                        <h4><Link to="/" class="btn btn-primary">Book List</Link></h4>
                        <form onSubmit={this.onSubmit}>
                        <div class="form-group">
                            <label for="title">Title:</label>
                            <input type="text" class="form-control" name="title" value={title} onChange={this.onChange} placeholder="Title"/>
                        </div>
                        <div class="form-group">
                            <label for="description">Description:</label>
                            <textarea class="form-control" name="description" onChange={this.onChange} placeholder="Description" cols="80" rows="3">{description}</textarea>
                        </div>
                        <div class="form-group">
                            <label for="author">Author:</label>
                            <input type="text" class="form-control" name="author" value={author} onChange={this.onChange} placeholder="Author"/>
                        </div>
                        <button type="submit" class="btn btn-success">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Create