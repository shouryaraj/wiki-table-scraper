import React from 'react';
import ReactDOM from 'react-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Input, InputGroup, Icon} from 'rsuite';
import { Panel, PanelGroup } from 'rsuite';

class TableDisplay extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            
        }
    }

    

    
    render(){
        return(
            <div>
                <Panel header="Table 1">
                     <p> </p><p/>
                </Panel>
            </div>
        )
    }
}

export default TableDisplay;