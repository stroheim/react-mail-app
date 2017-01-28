import * as React from 'react';
import { Link } from 'react-router';

interface AppProps {
    children: any
}

export default class Routes extends React.Component<AppProps, {}>{

    render() {
        return (
            <div>
                <h1>React Study App</h1>
                <li><Link to="/">Home</Link></li>
                <li><Link to="send">Create New E-Mail</Link></li>
                <li><Link to="find">Sendbox</Link></li>
                {this.props.children}
            </div>
        );
    }
}