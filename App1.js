//Working code to get the data from API and showing in to React Bootstrap table.
import React, { Component } from "react"
import DataTable from 'react-bootstrap/Table';

class T24l3 extends Component{

    constructor(props){
        super(props)
        this.state = {
            artifacts: [],
            isLoading: false,
            isError: false    
        }
    }

    //async function that will call a jsonplaceholder api to get users

    async componentDidMount(){
        this.setState({isLoading:true})
        //const response = await fetch("https://jsonplaceholder.typicode.com/users")
        
        const response = await fetch("https://mocki.io/v1/8fcb5413-d954-439c-bb51-9dcd1ef6d066")
        console.log(response)

        if(response.ok){
            const artifacts = await response.json()
            console.log(artifacts)
            this.setState({artifacts,isLoading:false})
        }else{
            this.setState({isError:true,isLoading:false})
        }
    }

    renderTableHeader = () => {
        return Object.keys(this.state.artifacts[0]).map(attr => <th key={attr}> {attr.toUpperCase()}</th>)
    }

    renderTableBody = () => {
        return this.state.artifacts.map(artifact => {
            return(
                <tr key={artifact.streams}>
                    <td><b>{artifact.streams}</b></td>
                    <td>
                        {`${artifact.dev01.version}`}
                    </td>
                    <td>
                        {`${artifact.dev02.version}`}
                    </td>
                    <td>
                        {`${artifact.dev03.version}`}
                    </td>
                    <td>
                        {`${artifact.tst01.version}`}
                    </td>
                    <td>
                        {`${artifact.tst02.version}`}
                    </td>
                    <td>
                        {`${artifact.int.version}`}
                    </td>
                    <td>
                        {`${artifact.uat.version}`}
                    </td>
                    <td>
                        {`${artifact.tat.version}`}
                    </td>
                </tr>
            )
        } )
    }
 
    render() {
        const {artifacts, isLoading, isError} = this.state
       
        if(isLoading){
            return <div>Loading...</div>
        }

        if(isError){
            return <div>There is some issues...</div>
        }

        return artifacts.length > 0
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
            <div>No artifacts</div>    
        )
        
    }
}

export default T24l3;
