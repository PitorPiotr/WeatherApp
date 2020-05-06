import React from 'react';
import Weather from './Weather';




class App extends React.Component {
  state={term:""}
  onTermSubmit = (term) => {
     this.setState({term: term
     });
     
 };
    
    render() {return (
        <div>
        <Weather onFormSubmit={this.onTermSubmit} />
      </div>)
    }
}

export default App;