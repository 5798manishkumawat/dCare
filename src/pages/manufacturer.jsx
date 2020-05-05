import React, { Component } from 'react';
import {BrowserRouter as Router,Route,Link,Switch} from 'react-router-dom';
import './myStylepage.css';
class Manufacturer extends Component {

    constructor(props) {
        super(props);
        this.state={
           isManufacturer:false,
           med1:0,med2:0,med3:0,med4:0,med5:0,
        }
    }

    componentDidMount = async () => {
        await this.setUser();
        const contract = this.props.passedStates.contract;
    }
    setUser = async () => {
        
        const account = this.props.passedStates.account;
        const contract = this.props.passedStates.contract;
        const web3 = this.props.passedStates.web3;
        const user = await contract.methods.checkUser(account).call();
        if(user==="Manufacturer")
        this.setState({isManufacturer:true});
        else if(user !== "")
        console.log(user); 
    }
    handleChange1 = async (e) => {
        this.setState({med1:e.target.value})
        console.log(e.target.value);
    }
    handleChange2 = async (e) => {
        this.setState({med2:e.target.value})
        console.log(e.target.value);
    }
    handleChange3 = async (e) => {
        this.setState({med3:e.target.value})
        console.log(e.target.value);
    }
    handleChange4 = async (e) => {
        this.setState({med4:e.target.value})
        console.log(e.target.value);
    }
    handleChange5 = async (e) => {
        this.setState({med5:e.target.value})
        console.log(e.target.value);
    }
    handleTransaction = async (e) => {
        e.preventDefault();
        const account = this.props.passedStates.account;
        const contract = this.props.passedStates.contract;
        const m1 = this.state.med1;
        const m2 = this.state.med2;
        const m3 = this.state.med3;
        const m4 = this.state.med4;
        const m5 = this.state.med5;
        await contract.methods.updateMedicine(m1,m2,m3,m4,m5).send({from:account});
        
    }
    render() {
        return (
            <div>
                { (this.state.isManufacturer===true) && 
                (<center>
                <form className="manufactform">
                    <div>
                     <h2>Paracetamol</h2><input type="number" placeholder="0" onChange={this.handleChange1} />
                    </div>
                    <div>
                     <h2>Oxalgin</h2><input type="number" placeholder="0" onChange={this.handleChange2} />
                    </div>
                    <div>
                     <h2>Maftol Spasmoproxyvon</h2><input type="number" placeholder="0" onChange={this.handleChange3} />
                    </div>
                    <div>
                     <h2>Norflox-Tz</h2><input type="number" placeholder="0" onChange={this.handleChange4} />
                    </div>
                    <div>
                     <h2>Saridon</h2><input type="number" placeholder="0" onChange={this.handleChange5} />
                    </div>
                    <br></br><br></br>
                    <div>
                    <button type="submit" className="btn btn-outline-success" value="Update Medicines" onClick={this.handleTransaction}>Update Medicine</button>
                    </div> 
                </form>
                </center>)}
            </div>
        );
    }
}

export default Manufacturer;