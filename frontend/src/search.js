import React from 'react';
import axios from 'axios';
import { Input, InputGroup, Icon} from 'rsuite';
import { Button} from 'rsuite';
import './App.css';

// import default style
import 'rsuite/dist/styles/rsuite-default.css';

// Inline css 
const styles = {
  marginBottom: 10
};
const center = {
  padding: '25% 25% 25%' 
}
/**
 * Search Component is responsible to fetch the data from the server according to the link provided 
 * by the user. The data will renders into the table format.
 * 
 */
class Search extends React.Component {

  constructor(props){
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.convertarray = this.convertarray.bind(this);
    this.callAPI = this.callAPI.bind(this);
    this.state = {
      inputValue: '',
      resp: []
    }
  }
  
convertarray(dict){
    /**
     * Convert Dictonary to array format
     * dict: Dictionary 
     */
    var arr = [ ]
    for (var key in dict) {
        arr.push(dict[key]);
      }
    console.log(arr);
    return arr;
}

  handleInputChange(value) {
    /**
     * Handles dynamically the values from the search bar 
     * value: string value
     */
    this.setState({ inputValue: value });
  }

  callAPI(){
    /**
     * The function takes the current url from the search bar sends get request
     */
    if (this.state.inputValue.length > 1){
        axios.get(`/url/?URL=${this.state.inputValue}`)
        .then(response =>  {
            var output = this.convertarray(response.data);
            this.setState({resp:  output})
        });
    }
   
    
  }

  render() {
    return (
      <div>
        <div style={center}>
          <p style={{textAlign: "center", paddingBottom: "3%", fontSize: "50px"}}>URL</p>
         
          <InputGroup style={styles}>
            {" "}
            <Input
              size="md"
              value={this.state.inputValue}
              onChange={(e) => this.handleInputChange(e)}
            />
            <InputGroup.Addon>
              <Button appearance="default" onClick={this.callAPI} >
                <Icon icon="search" />
              </Button>
            </InputGroup.Addon>
            
          </InputGroup>
          <p style={{textAlign: "left",paddingBottom: "1%"}}>Example: https://en.wikipedia.org/wiki/World_Tourism_rankings</p>
        </div>
        <div >
        {/* Dynamically Maps the table from given server response */}
        {this.state.resp && this.state.resp.map(
            table =><div key={table} className="row"> {table.map(
              single => <div className="column"><table key={single}><tbody>  {single.map(
                col => <tr key={col}>{col}</tr>)}</tbody></table></div>)}</div>) }
        </div>
      </div>
    );
  }
}

export default Search;
