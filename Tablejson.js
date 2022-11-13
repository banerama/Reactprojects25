//Working code to get the data from API and showing in to React Bootstrap table.
import React, { Component } from "react"
import DataTable from 'react-bootstrap/Table';

class Table extends Component{

    constructor(props){
        super(props)
        this.state = {
            users: [],
            isLoading: false,
            isError: false    
        }
    }

    //async function that will call a jsonplaceholder api to get users

    async componentDidMount(){
        this.setState({isLoading:true})
        const response = await fetch("https://jsonplaceholder.typicode.com/users")
        console.log(response)

        if(response.ok){
            const users = await response.json()
            console.log(users)
            this.setState({users,isLoading:false})
        }else{
            this.setState({isError:true,isLoading:false})
        }
    }

    renderTableHeader = () => {
        return Object.keys(this.state.users[0]).map(attr => <th key={attr}> {attr.toUpperCase()}</th>)
    }

    renderTableBody = () => {
        return this.state.users.map(user => {
            return(
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>  
                    <td>
                        {`${user.address.street},${user.address.city}`}
                    </td>
                    <td>{user.website}</td>  
                    <td>{user.phone}</td>
                    <td>{user.company.name}</td>  
                </tr>
            )
        } )
    }
 
    render() {
        const {users, isLoading, isError} = this.state
       
        if(isLoading){
            return <div>Loading...</div>
        }

        if(isError){
            return <div>There is some issues...</div>
        }

        return users.length > 0
        ? (
            <DataTable striped bordered hover>
                <thead>
                    {this.renderTableHeader()}
                </thead>
                <tbody>
                    {this.renderTableBody()}
                </tbody>
            </DataTable>
        ):(
            <div>No Users</div>    
        )
        
    }
}

export default Table;