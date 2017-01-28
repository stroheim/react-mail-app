import { Action, Dispatch } from 'redux';
import * as axios from 'axios';
// import * as ActionTypes from './type';
import { RootState } from '../reducers/index';
import 'isomorphic-fetch';

export type Actions = SendAction |
    SaveAction |
    ClearAction |
    ChangeSubjectAction |
    ChangeMessageBodyAction |
    ChangeToAddressAction |
    SendStartAction |
    SendEndAction |
    UploadStartAction |
    UploadEndAction |
    DeleteAttachmentStartAction |
    DeleteAttachmentEndAction |
    FindStartAction |
    FindEndAction;

export enum ActionTypes {
    Send,
    SendAsync,
    Save,
    Clear,
    ChangeSubject,
    ChangeMessageBody,
    ChangeToAddress
}

// export class ActionTypes {
//     static SEND = "SEND";
//     static SAVE = "SAVE";
//     static CLEAR = "CLEAR";
//     static CHANGE_SUBJECT = "CHANGE_SUBJECT";
//     static CHANGE_MESSAGE_BODY = "CHANGE_MESSAGE_BODY";
//     static CHANGE_TO_ADDRESS = "CHANGE_TO_ADDRESS";
// }

export type MailModel = {
    subject: string;
    messageBody: string;
    toAddress: string;
    fromAddress: string;
}

export type SendResult = {
    _id: string;
    from: string;
    to: string;
    subject: string;
    sended: Date;
}

export interface SendStartAction extends Action {
    type: "SEND_START";
}

export function sendStart(): SendStartAction {
    return {
        type: "SEND_START"
    };
}

export interface SendEndAction extends Action {
    type: "SEND_END";
}

export function sendEnd(): SendEndAction {
    return {
        type: "SEND_END"
    };
}

export interface UploadStartAction extends Action {
    type: "UPLOAD_START";
}

export function uploadStart(): UploadStartAction {
    return {
        type: "UPLOAD_START"
    };
}

export interface UploadEndAction extends Action {
    type: "UPLOAD_END";
    payload: {
        attachment: Attachment;
    };
}

export function uploadEnd(attachment: Attachment): UploadEndAction {
    return {
        type: "UPLOAD_END",
        payload: {
            attachment: attachment
        }
    };
}

export async function uploadAsync(file: any, dispatch: Dispatch<RootState>) {
    dispatch(uploadStart());

    const options = {
        headers: {
            "Content-Type": file.type
        }
    };

    var data = new FormData();
    data.append("file", file);

    var originalname: string = null;
    var mimetype: string = null;
    var filename: string = null;
    var path: string = null;

    await axios.post("/api/upload", data, options)
        .then(res => {
            console.log("アップロード完了");
            console.log(res);
            originalname = (res.data as any).originalname;
            mimetype = (res.data as any).mimetype;
            filename = (res.data as any).filename;
            path = (res.data as any).path;
        }).catch(err => {
            console.error(err);
        });
    const attachment: Attachment = {
        originalname: originalname,
        mimetype: mimetype,
        filename: filename,
        path: path
    }

    dispatch(uploadEnd(attachment));

}

export interface Attachment {
    originalname: string;
    mimetype: string;
    filename: string;
    path: string;
}

export interface DeleteAttachmentStartAction extends Action {
    type: "DELETE_ATTACHMENT_START";
}

export function deleteAttachmentStart(): DeleteAttachmentStartAction {
    return {
        type: "DELETE_ATTACHMENT_START"
    };
}

export interface DeleteAttachmentEndAction extends Action {
    type: "DELETE_ATTACHMENT_END";
    payload: {
        attachment: Attachment;
    };
}

export function deleteAttachmentEnd(attachment: Attachment): DeleteAttachmentEndAction {
    return {
        type: "DELETE_ATTACHMENT_END",
        payload: {
            attachment: attachment
        }
    };
}

export async function deleteAttachmentAsync(attachment: Attachment,
    dispatch: Dispatch<RootState>) {
    dispatch(deleteAttachmentStart());
    const options = {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "X-Requested-With": "XMLHttpRequest"
        },
        params: {
            path: attachment.filename
        }
    };
    // var data = JSON.stringify({ "path": attachment.originalname });


    await axios.delete("/api/attachment", options)
        .then(res => {
            console.log("成功");
        }).catch(err => {
            console.log("失敗");
        });

    dispatch(deleteAttachmentEnd(attachment));
}

export interface MailAttachment {
    filename: string;
    path: string;
}

export class SendAsyncArgument {
    subject: string;
    messageBody: string;
    toAddress: string;
    fromAddress: string;
    hasAttachment: boolean;
    attachments: Array<MailAttachment>;
}

export async function sendAsync(arg: SendAsyncArgument,
    dispatch: Dispatch<RootState>) {
    dispatch(sendStart());
    const options = {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "X-Requested-With": "XMLHttpRequest"
        }
    };

    var data = JSON.stringify(arg);

    console.log(data);

    await axios.post("/api/send", data, options)
        .then(res => {
            console.log("送信完了");
        }).catch(err => {
            console.error(err);
        })
    dispatch(sendEnd());

    // try {
    //     const response: ResponseInterface = await fetch('/send', createRquestInit("POST", {
    //         subject,
    //         messageBody,
    //         toAddress
    //     }));

    //     if (response.status === 200) {
    //         console.log("request success");
    //     } else {
    //         throw new Error(`illegal status code: ${response.status}`);
    //     }
    // } catch (e) {
    //     console.error(e);
    // } finally {
    //     dispatch(sendEnd());
    // }

    // return ( dispatch: Dispatch<RootState>,getState)=>{

    // }

    // return createRequest("/send", "post", { subject, messageBody, toAddress })
    //     .then(response => {
    //         if (response.status === 200) {
    //             return dispatch({
    //                 type: "SUCCESS_SEND"
    //             });
    //         } else {
    //             return dispatch({
    //                 type: "FAILED_SEND"
    //             });
    //         }
    //     }).catch(() => {
    //         return dispatch({
    //             type: "FAILED_SEND"
    //         });
    //     });

    // return {
    //     type: "SEND_ASYNC"
    // };
}

export interface SendAction extends Action {
    // type: typeof ActionTypes.SEND;
    type: "SEND";
    payload: MailModel;
}
export function send(subject: string, messageBody: string, toAddress: string, fromAddress: string): SendAction {
    console.log("actions called");
    console.log("件名[%s] 本文[%s]  宛先[%s] ", subject, messageBody, toAddress);
    return {
        type: "SEND",
        payload: {
            subject: subject,
            messageBody: messageBody,
            toAddress: toAddress,
            fromAddress: fromAddress
        }
    };
}

export interface SaveAction extends Action {
    type: "SAVE";
    payload: MailModel;
}
export function save(subject: string, messageBody: string, toAddress: string, fromAddress: string): SaveAction {
    return {
        type: "SAVE",
        payload: {
            subject: subject,
            messageBody: messageBody,
            toAddress: toAddress,
            fromAddress: fromAddress
        }
    };
}

export interface ClearAction extends Action {
    type: "CLEAR";
}

export function clear(): ClearAction {
    return {
        type: "CLEAR"
    };
}

export async function findAsync(dispatch: Dispatch<RootState>) {
    dispatch(findStart());
    const options = {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "X-Requested-With": "XMLHttpRequest"
        }
    };
    var results = new Array<SendResult>();
    await axios.get("/api/find", options)
        .then(res => {
            console.log("成功");
            // console.log((res.data as any).historyList);
            results = (res.data as any).historyList as Array<SendResult>;
            // console.log(results);
        }).catch(err => {
            console.log("失敗");
        });

    dispatch(findEnd(results));

}

export interface FindStartAction extends Action {
    type: "FIND_START";
}

export function findStart(): FindStartAction {
    return {
        type: "FIND_START"
    };
}

export interface FindEndAction extends Action {
    type: "FIND_END";
    payload: Array<SendResult>;
}

export function findEnd(results: Array<SendResult>): FindEndAction {
    return {
        type: "FIND_END",
        payload: results
    };
}

export interface ChangeSubjectAction extends Action {
    type: "CHANGE_SUBJECT";
    payload: {
        subject: string
    };
}

export function changeSubject(subject: string): ChangeSubjectAction {
    return {
        type: "CHANGE_SUBJECT",
        payload: {
            subject: subject
        }
    };
}

export interface ChangeMessageBodyAction extends Action {
    type: "CHANGE_MESSAGE_BODY";
    payload: {
        messageBody: string
    };
}

export function changeMessageBody(messageBody: string): ChangeMessageBodyAction {
    return {
        type: "CHANGE_MESSAGE_BODY",
        payload: {
            messageBody: messageBody
        }
    };
}

export interface ChangeToAddressAction extends Action {
    type: "CHANGE_TO_ADDRESS";
    payload: {
        toAddress: string
    };
}

export function changeToAddress(toAddress: string): ChangeToAddressAction {
    return {
        type: "CHANGE_TO_ADDRESS",
        payload: {
            toAddress: toAddress
        }
    };
}

function createRequest(url: string, method: string, data: any) {
    return axios.request({
        url,
        method,
        data
    });
}

function createRquestInit(method: string, data: any) {
    const req: RequestInit = {
        method: method,
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        }
    };
    return req;
}