import React , { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { add , changedDescription , search , clear } from './todoActions'
import Grid from '../template/grid'
import IconButton from '../template/iconButton'

class TodoForm extends Component {
    
    constructor(props){
        super(props)
        this.keyHandler = this.keyHandler.bind(this)
    }
    
    componentWillMount(){
        this.props.search()
    }

    keyHandler(e){
        const { add ,  search , description , clear } = this.props
        if(e.key === 'Enter'){
            e.shiftKey ? search() : add(description)
        } else if (e.key === 'Escape'){
           clear()
        }
    }

   

    render(){
        const { add, search , description , clear} = this.props
        return(
            <div role="form" className="todoForm">
                
                <Grid cols='12 9 10'>
                    <input 
                    id="description" 
                    className="form-control" 
                    placeholder="Add a task..."
                    value={this.props.description}
                    onKeyUp={this.keyHandler}
                    onChange={this.props.changedDescription}/>
                </Grid>
    
                <Grid cols='12 3 2'>
                    <IconButton style="primary" icon="plus" onClick={() => add(description)}/>
                    <IconButton style="info" icon="search" onClick={() => search()}/>
                    <IconButton style="default" icon="close" onClick={() => clear()} />
                </Grid>
    
            </div>
        )
    }
}

const mapStateToProps = state => ({ description: state.todo.description })
const mapDispatchToProps = dispatch => bindActionCreators({ add, changedDescription , search , clear }, dispatch )

export default connect(mapStateToProps, mapDispatchToProps)(TodoForm)