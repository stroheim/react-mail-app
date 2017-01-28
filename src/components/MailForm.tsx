import * as React from 'react';
import * as ReactDOM from 'react-dom';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import SendButton from 'material-ui/svg-icons/content/send'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { AppProps } from './App';
import * as Actions from '../actions/index';
import { RootState } from '../reducers/index';
import Chip from 'material-ui/Chip';
import LinearProgress from 'material-ui/LinearProgress';
import CircularProgress from 'material-ui/CircularProgress';
import Paper from 'material-ui/Paper';
import * as Dropzone from 'react-dropzone';

/*
メモ
propsは一度レンダリングされると変更できない
*/

export default class MailForm extends React.Component<AppProps, {}>{

    constructor(props: AppProps) {
        super(props);
        this.state = {
            errorTextSubject: "",
            errorTextMessageBody: "",
            errorTextToAddress: ""
        };
    }

    onChangeSubject = (event: React.FormEvent<{}>) => {
        var _value = (event.target as any).value;
        this.props.dispatch(Actions.changeSubject(_value));
        if (_value === null || _value === undefined || _value === "") {
            this.setState({ errorTextSubject: "件名は必須です！" })
        } else {
            this.setState({ errorTextSubject: "" })
        }
    }

    onChangedMessageBody = (event: any) => {
        var _value = (event.target as any).value;
        this.props.dispatch(Actions.changeMessageBody(_value));
        if (_value === null || _value === undefined || _value === "") {
            this.setState({ errorTextMessageBody: "本文は必須です！" })
        } else {
            this.setState({ errorTextMessageBody: "" })
        }
        // console.log('[onChangedMessageBody] %s', _value);
    }

    onChangeToAddress = (event: any) => {
        var _value = (event.target as any).value;
        this.props.dispatch(Actions.changeToAddress(_value));
        if (_value === null || _value === undefined || _value === "") {
            this.setState({ errorTextToAddress: "送信先アドレスは必須です！" })
        } else {
            this.setState({ errorTextToAddress: "" })
        }
        // console.log('[onChangeToAddress] %s', _value);
    }

    onDeleteChip = (attachment: Actions.Attachment) => {
        // このタイミングで削除のWebAPIを呼ぶ
        Actions.deleteAttachmentAsync(attachment, this.props.dispatch);
    }

    renderChip2(attachment: Actions.Attachment) {
        if (attachment === null
            || attachment === undefined) {
            return;
        }
        if (attachment.filename === null
            || attachment.filename === undefined
            || attachment.filename === "") {
            return;
        }
        return (
            <Chip
                key={attachment.filename}
                style={{ margin: 4 }}
                onRequestDelete={() => this.onDeleteChip(attachment)}
                >
                {attachment.originalname}
            </Chip>
        );
    }

    renderChip() {
        if (this.props.app.mailModel.attachments === null
            || this.props.app.mailModel.attachments === undefined
            || this.props.app.mailModel.attachments.length === 0) {
            return null;
        }
        var attachment = this.props.app.mailModel.attachments[0];
        if (attachment.filename === null
            || attachment.filename === undefined
            || attachment.filename === "") {
            return null;
        }
        return (
            <Chip
                key={attachment.filename}
                style={{ margin: 4 }}
                >
                {attachment.originalname}
            </Chip>
        );
    }

    renderSendingProgress() {
        if (!this.props.app.isSending) {
            return null;
        }
        return (
            <LinearProgress mode="indeterminate" color={"#8ed1fc"} />
        );
    }

    renderUploadingProgress() {
        if (!this.props.app.isUploading) {
            return null;
        }
        return (
            <LinearProgress mode="indeterminate" color={"#7bdcb5"} />
        );
    }

    renderDeletingProgress() {
        if (!this.props.app.isDeleting) {
            return null;
        }
        return (
            <LinearProgress mode="indeterminate" color={"#f47373"} />
        );
    }

    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme()}>
                <div>
                    <br />
                    {this.renderSendingProgress()}
                    {this.renderUploadingProgress()}
                    {this.renderDeletingProgress()}

                    <br />
                    <TextField
                        floatingLabelText="From"
                        floatingLabelStyle={{ fontWeight: 700 }}
                        ref="fromAddress"
                        value={this.props.app.mailModel.fromAddress}
                        disabled={true}
                        />
                    <br />
                    <TextField
                        floatingLabelText="To"
                        floatingLabelStyle={{ fontWeight: 700 }}
                        ref="toAddress"
                        value={this.props.app.mailModel.toAddress}
                        onChange={(event) => { this.onChangeToAddress(event) } }
                        // onChange={(event) => this.onChangeToAddress(event)}
                        errorText={(this.state as any).errorTextToAddress}
                        />
                    <br />
                    <TextField
                        floatingLabelText="件名"
                        floatingLabelStyle={{ fontWeight: 700 }}
                        ref="subject"
                        onChange={(event) => this.onChangeSubject(event)}
                        // onChange={(event) => this.props.dispatch(Actions.changeSubject((event.target as any).value))}
                        value={this.props.app.mailModel.subject}
                        errorText={(this.state as any).errorTextSubject}
                        />
                    <br />
                    <TextField
                        floatingLabelText="本文"
                        floatingLabelStyle={{ fontWeight: 700 }}
                        ref="messageBody"
                        multiLine={true}
                        rows={10}
                        style={{ width: 300 }}
                        value={this.props.app.mailModel.messageBody}
                        onChange={(event) => this.onChangedMessageBody(event)}
                        errorText={(this.state as any).errorTextMessageBody}
                        />
                    <br />
                    <div>
                        <p>添付ファイル</p>
                        <Paper style={{ width: 500, display: "inline-block", height: 200 }} zDepth={3}>
                            <div style={{ display: "flex", flexwrap: "wrap" }}>
                                {/*this.renderChip()*/}
                                {this.props.app.mailModel.attachments.map(this.renderChip2, this)}
                                {/*this.props.app.mailModel.attachments.forEach(this.renderChip2, this)*/}
                            </div>
                        </Paper >
                    </div >

                </div >
            </MuiThemeProvider >
        );
    }
}