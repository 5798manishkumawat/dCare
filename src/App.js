import './App.css';
import React, { Component } from 'react';
import getWeb3 from './getWeb3';
import dcare from './contracts/dcare.json';
import {BrowserRouter as Router,Route,Link,Switch} from 'react-router-dom';
import Doctor from './pages/doctor';
import Patient from './pages/patient';
import Pharmacist from './pages/pharmacist';
import Manufacturer from './pages/manufacturer';
import './myStyle.css';
class App extends Component {
    constructor(props) {
      super(props);
      this.state={
        account:null,
        web3:null,
        contract:null,
        accounts:null,
        isClicked:false,
        Medicine:[],
        
      }
    }
    componentDidMount = async ()=> {
      try{
            const web3 = await getWeb3();
            const accounts = await web3.eth.getAccounts();
            const networkId = await web3.eth.net.getId();
            const deployedNetwork = dcare.networks[networkId];
            const instance = new web3.eth.Contract(dcare.abi, deployedNetwork.address);
            console.log(deployedNetwork)
            this.setState({
              web3,
              accounts,
              contract: instance
            });
            this.setState({account:accounts[0]})
            
            } catch (error) {
            alert(
            `Failed to load web3, accounts, or contract. Check console for details.`,
            );
            console.error(error);
          }
    }

    handleClick = async (e) => {
      e.preventDefault();
      let click=this.state.isClicked;
      click=!click;
      this.setState({isClicked:click})
      if(click===true){
          this.setState({Medicine : []});
          const contract = this.state.contract;
         let log,joined;
          for(let i=0;i<=4;i++)
          {
              log  = await contract.methods.getMedicine(i).call();
              if(i==0)
              {joined = this.state.Medicine.concat(<div class="grid-item"><h2>Paracetamol</h2><b>{log}</b></div>)}
              else if(i==1)
               {joined = this.state.Medicine.concat(<div class="grid-item"><h2>Oxalgin</h2><b>{log}</b></div>)}
              else if(i==2)
               {joined = this.state.Medicine.concat(<div class="grid-item"><h2>Maftol Spasmoproxyvon</h2><b>{log}</b></div>)}
              else if(i==3)
               {joined = this.state.Medicine.concat(<div class="grid-item"><h2>Norflox-Tz</h2><b>{log}</b></div>)}
              else
               {joined = this.state.Medicine.concat(<div class="grid-item"><h2>Saridon</h2><b>{log}</b></div>)}
              this.setState({Medicine:joined});
          }
      }
  }

  render() {
    return (
      <Router>
          <div>
                 <ul class="nav nav-tabs">
                    <li class="nav-item">
                        <button class="nav-link active"><Link to='/patient'>Patient</Link></button>
                    </li>
                    <li class="nav-item">
                        <button class="nav-link active"><Link to='/doctor'>Doctor</Link></button>
                    </li>
                    <li class="nav-item">
                        <button class="nav-link active"><Link to='/pharmacist'>Pharmacist</Link></button>
                    </li>
                    <li class="nav-item">
                        <button class="nav-link active"><Link to='/manufacturer'>Manufacturer</Link></button>
                    </li>
                </ul>
            <Switch>
                <Route path='/patient'>
                    <Patient passedStates={this.state}/>
                </Route>
                <Route path='/doctor'>
                    <Doctor passedStates={this.state}/>
                </Route>
                <Route path='/pharmacist'>
                    <Pharmacist passedStates={this.state}/>
                </Route>
                <Route path='/manufacturer'>
                    <Manufacturer passedStates={this.state}/>
                </Route>
            </Switch>

            <button class="btn btn-success" onClick={this.handleClick}>View Medicines...</button>
            {   (this.state.isClicked===true) &&
                        (<div>
                            <div className="grid-container medst">{this.state.Medicine}</div>
                        </div>
                        )}
            </div>
        </Router>
    );
  }
}

export default App;

