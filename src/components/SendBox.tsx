// メール送信履歴表示用
import * as React from 'react';
import { Table, TableHeader, TableHeaderColumn, TableBody, TableRow, TableRowColumn } from 'material-ui/Table';
import { AppProps } from './App';
import LinearProgress from 'material-ui/LinearProgress';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import * as Actions from '../actions/index';

export default class SendBox extends React.Component<AppProps, {}>{

    constructor(props: AppProps) {
        // console.log(props);
        super(props);
        Actions.findAsync(this.props.dispatch);
    }

    renderSearchingProgress() {
        if (!this.props.app.isSearching) {
            return null;
        }
        return (
            <LinearProgress mode="indeterminate" color={"#8ed1fc"} />
        );
    }

    renderSearchedList() {
        if (this.props.app.isSearching) {
            return null;
        }

        return (
            <Table>
                <TableHeader displaySelectAll={false}>
                    <TableRow>
                        <TableHeaderColumn>From</TableHeaderColumn>
                        <TableHeaderColumn>To</TableHeaderColumn>
                        <TableHeaderColumn>Subject</TableHeaderColumn>
                        <TableHeaderColumn>Sended Date</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false} stripedRows={true}>
                    {this.props.app.sendedList.map(data =>
                        <TableRow key={data._id}>
                            <TableRowColumn>{data.from}</TableRowColumn>
                            <TableRowColumn>{data.to}</TableRowColumn>
                            <TableRowColumn>{data.subject}</TableRowColumn>
                            <TableRowColumn>{data.sended}</TableRowColumn>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        );
    }

    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme()}>
                <div>
                    <br />
                    {this.renderSearchingProgress()}
                    {this.renderSearchedList()}
                </div>
            </MuiThemeProvider>
        );
    }
}