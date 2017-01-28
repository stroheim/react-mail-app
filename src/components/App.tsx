import * as React from 'react';
import { Dispatch, Action } from 'redux';
import { connect } from 'react-redux';

import * as Actions from '../actions/index';
import { AppState, RootState } from '../reducers/index';
import Header from './Header';
import MailForm from './MailForm';
import Snackbar from 'material-ui/Snackbar';
import * as injectTapEventPlugin from "react-tap-event-plugin";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
const muiTheme = getMuiTheme();
injectTapEventPlugin();

export interface AppProps extends React.Props<App> {
    dispatch?: Dispatch<RootState>;
    app: AppState;
    // app: {
    //     mailModel: {
    //         subject: string;
    //         messageBody: string;
    //         toAddress: string;
    //         fromAddress: string;
    //         file: any;
    //         attachment: {
    //             originalname: string;
    //             mimetype: string;
    //             filename: string;
    //             path: string;
    //         }
    //     };
    //     isSending: boolean;
    //     isSended: boolean;
    //     isUploading: boolean;
    //     isUploaded: boolean;
    // }
}

export class App extends React.Component<AppProps, {}> {

    // static propTypes = {
    //     app: React.PropTypes.object.isRequired

    // }

    renderSnackbar() {
        var message = "";
        var isOpen = false;
        if (this.props.app.isSended) {
            message = "E-Mail Sended";
            isOpen = true;
        } else if (this.props.app.isUploaded) {
            message = "File Uploaded";
            isOpen = true;
        } else if (this.props.app.isDeleted) {
            message = "Attachment Deleted";
            isOpen = true;
        }
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div>
                    <Snackbar open={isOpen}
                        message={message}
                        autoHideDuration={2000}
                        />
                </div>
            </MuiThemeProvider>
        );
    }


    render() {
        // {this.renderSnackbar()}
        return (
            <div>
                <Header dispatch={this.props.dispatch}
                    app={this.props.app}
                    />
                <MailForm dispatch={this.props.dispatch}
                    app={this.props.app}
                    />
                {this.renderSnackbar()}
            </div>
        );
    }
}

