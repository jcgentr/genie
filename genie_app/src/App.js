import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
// import BuildDatabase from './components/BuildDatabase/BuildDatabase';
import SearchDatabase from './components/SearchDatabase/SearchDatabase';
import Upload from './components/Upload/Upload';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
// font awesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

library.add(faDownload);

const initialState = {
  input: '',
  route: 'home',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      } 
    });
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onRouteChange = (route) => {
    if(route === 'signout') {
      this.setState({isSignedIn: false});
      this.setState({route: 'signin'});
    } else if (route === 'home') {
      this.setState({isSignedIn: true});
      this.setState({route: 'home'});
    } else { // register
      this.setState({route: route});
    }
  }

  render() {
    const {isSignedIn, route} = this.state;
    return (
      <div className="App">
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
        { route === 'home'
          ? <div>
              {/* <BuildDatabase /> */}
              
              <Tabs className="tabs">
                <TabList>
                  <Tab>Previous Searches</Tab>
                  <Tab>Build New Database</Tab>
                  <Tab>Search Current Database</Tab>
                </TabList>

                <TabPanel>
                  <div className="Card">
                  <h3>Previous Search Results</h3>
                    <table className="dbTable">
                      <tr className="tableHeads">
                        <td>Date</td>
                        <td>Search Name</td>
                        <td>Download</td>
                      </tr>
                      <tr>
                        <td>4/30/2019</td>
                        <td>Peromyscus</td>
                        <td><FontAwesomeIcon icon="download" /></td>
                      </tr>
                      <tr>
                        <td>4/30/2019</td>
                        <td>Peromyscus</td>
                        <td><FontAwesomeIcon icon="download" /></td>
                      </tr>
                      <tr>
                        <td>4/30/2019</td>
                        <td>Peromyscus</td>
                        <td><FontAwesomeIcon icon="download" /></td>
                      </tr>
                    </table>
                  </div>
                </TabPanel>
                <TabPanel>
                  <div className="Card">
                  <h3>Build a New Database</h3>
                    <Upload />
                  </div>
                </TabPanel>
                <TabPanel>
                  <div className="Card">
                    <h3>Search a Current Database</h3>
                    <p>Choose database here:  
                      <select>
                        <option value="peromyscus">Peromyscus</option>
                        <option value="peromyscus">Peromyscus</option>
                        <option value="peromyscus">Peromyscus</option>
                        <option value="peromyscus">Peromyscus</option>
                      </select> 
                    </p>
                    <br />
                    <input className="seq" type="text" placeholder="Enter sequence" />
                    <SearchDatabase />
                  </div>
                </TabPanel>
              </Tabs>
            </div>
          : ( route === 'signin'
              ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
              : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            )
        }
      </div>
    );
  }
}

export default App;
