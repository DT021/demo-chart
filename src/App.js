import * as React from 'react';
import './App.css';
import ChartContainer from './components/chartContainer/ChartContainer';

class App extends React.Component {
    render() {
        return (
            <div className='App'>
                <ChartContainer/>
            </div>
        );
    }
}

export default App;