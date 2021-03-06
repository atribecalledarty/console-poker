import React from 'react';

class NewRoomForm extends React.Component {
    state = {
        name: "",
        password: "" 
    }

    changeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    createRoom = () => {
        const body = JSON.stringify(this.state)
        const token = localStorage.getItem('token');
        const options = {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body
        }
        return fetch(`/rooms`, options)
        // return fetch(`http://localhost:3001/rooms`, options)
    }

    submitHandler = event => {
        event.preventDefault();
        this.createRoom(this.state)
            .then(resp => resp.json())
            .then(json => this.props.history.push(`/rooms/${json.id}`));
    }

    leaveRoom = () => {
        this.props.history.push(`/rooms`)
    }

    render() {
        return (
            <div>
                
                <form onSubmit={this.submitHandler}>
                    <button className="nes-btn is-error" onClick={this.leaveRoom}>{'<'}</button>&nbsp;
                    <label>
                        Name&nbsp;
                    <input 
                    type="text" 
                    name="name" 
                    className="nes-input"
                    onChange={this.changeHandler} 
                    value={this.state.name} />
                    </label>&nbsp;
                    <label>
                        Password&nbsp;
                    <input 
                    type="password" 
                    name="password" 
                    className="nes-input"
                    onChange={this.changeHandler} 
                    value={this.state.password} />
                    </label>&nbsp;
                    <button type="submit" className="nes-btn is-primary smaller-btn" >Create</button>
                </form>
            </div>
        )
    }
}

export default NewRoomForm;