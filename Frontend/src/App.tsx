import { Component } from 'react';
import Router from "./routes/index";
import Providers from "./Providers/Providers";

class App extends Component {
  render() {
    return (
      <Providers>
        <Router />
      </Providers>
    );
  }
}

export default App;
