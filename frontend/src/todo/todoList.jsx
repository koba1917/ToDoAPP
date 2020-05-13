import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { markAsDone , markAsPending , remove } from './todoActions'

import IconButton from '../template/iconButton'

const TodoList = props => {

    const renderRows = () => {
        const list = props.list || []

        return list.map( todo => (
            <tr key={todo._id}>
                <td className={todo.done ? 'markedAsDone' : ''}>{todo.description}</td>
                <td>
                    {
                        todo.done  ?
                         (<IconButton style='warning' onClick={()=> props.markAsPending(todo)} icon='undo'/>) 
                         : (<IconButton style='success' onClick={()=> props.markAsDone(todo)} icon='check'/>)
                    }
                    <IconButton style='danger' onClick={()=> props.remove(todo)} icon='trash'/>
                </td>
            </tr>
        ))
    }
    
    return(
        <table className="table">
            <thead>
                <tr>
                    <th>Description</th>
                    <th className='tableActions'>Action</th>
                </tr>
            </thead>
            <tbody>
                {renderRows()}
            </tbody>
        </table>
    )
}

const mapStateToProps = state => ({list: state.todo.list})
const mapDispatchToProps = dispatch => bindActionCreators({ markAsDone , markAsPending , remove }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)