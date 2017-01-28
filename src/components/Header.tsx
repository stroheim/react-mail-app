import * as React from 'react';
import * as ReactDOM from 'react-dom';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import IconButton from 'material-ui/IconButton';
import SendButton from 'material-ui/svg-icons/content/send'
import AttachFileButton from 'material-ui/svg-icons/editor/attach-file'
import DeleteButton from 'material-ui/svg-icons/action/delete'
import OutboxButton from 'material-ui/svg-icons/content/inbox';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { AppProps } from './App';
import * as Actions from '../actions/index';

import AppBar from 'material-ui/AppBar';

const muiTheme = getMuiTheme();

class Header extends React.Component<AppProps, {}> {

    onChangeFile = (event: any) => {
        var files = event.target.files;
        if (files === null || files === undefined || files.length === 0) {
            return;
        }
        // var file = files[0];
        // Actions.uploadAsync(file, this.props.dispatch);
        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            Actions.uploadAsync(file, this.props.dispatch);
        }
    }

    getSendAsyncArgument = (): Actions.SendAsyncArgument => {
        var arg = new Actions.SendAsyncArgument();
        arg.subject = this.props.app.mailModel.subject;
        arg.messageBody = this.props.app.mailModel.messageBody;
        arg.fromAddress = this.props.app.mailModel.fromAddress;
        arg.toAddress = this.props.app.mailModel.toAddress;
        arg.hasAttachment = false;
        if (this.props.app.mailModel.attachments === null
            || this.props.app.mailModel.attachments === undefined
            || this.props.app.mailModel.attachments.length === 0) {
            return arg;
        }

        // var attachment = this.props.app.mailModel.attachments[0];
        // if (attachment.filename === null
        //     || attachment.filename === undefined
        //     || attachment.filename === "") {
        //     return arg;
        // }
        arg.attachments = new Array<Actions.MailAttachment>();
        this.props.app.mailModel.attachments.forEach((val, idx, arr) => {
            var attach: Actions.MailAttachment = {
                filename: val.originalname,
                path: val.path
            }
            arg.attachments.push(attach);
        })
        arg.hasAttachment = true;
        return arg;
    }

    onHumburgerButtonClick = (event: any) => {

    }

    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div>
                    <header>
                        <AppBar
                            onLeftIconButtonTouchTap={(event) => {

                            } }
                            title='メール送信アプリ'
                            iconElementRight={
                                <div>
                                    <IconButton tooltip="Choose File" onTouchTap={() => {
                                        console.log((this.refs as any).file);
                                        (this.refs as any).file.click();
                                        //(this.refs as any).file.getDOMNode().click();
                                    } }>
                                        <AttachFileButton color={"white"} />
                                    </IconButton>
                                    <IconButton tooltip="Send E-Mail" onTouchTap={() => {
                                        console.log("件名[%s] 本文[%s]  宛先[%s] ",
                                            this.props.app.mailModel.subject,
                                            this.props.app.mailModel.messageBody,
                                            this.props.app.mailModel.toAddress);

                                        var arg = this.getSendAsyncArgument();

                                        Actions.sendAsync(arg, this.props.dispatch);
                                    } }>
                                        <SendButton color={"white"} />
                                    </IconButton>
                                    <IconButton tooltip="Clear" onTouchTap={() => {
                                        this.props.dispatch(Actions.clear())
                                    } }>
                                        <DeleteButton color={"white"} />
                                    </IconButton>
                                </div>
                            }
                            >
                        </AppBar>
                    </header>
                    <input type="file" ref="file"
                        style={{ display: "none" }}
                        value={this.props.app.mailModel.file} onChange={(event) => this.onChangeFile(event)}
                        multiple={true}
                        />
                </div>
            </MuiThemeProvider>
        );
    }
}

export default Header;
