// This is example of setting the timer so that the Api can be called at regular intervals
import React, { Component } from "react"

class Timer extends Component {

    // Declaring constructor to set the state
    constructor(props){
        super(props)
        this.state = {
            count: 0
        }
    }

    render() {
        const {count} = this.state
        return(
            <div>
                <h1>Current Count : {count}</h1>
            </div>
        )
    }

    
    componentDidMount(){
        this.myInterval = setInterval(() => {
            this.setState(prevState => ({
                count: prevState.count + 1
            }))
        }, 1000)

        this.setState({
            count: this.state.count + 1
        })
    }

    componentWillUnmount(){
        clearInterval(this.myInterval)
    }
}

export default Timer;