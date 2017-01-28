import { combineReducers } from 'redux';

import * as Actions from '../actions/index';

export interface AppState {
    mailModel: {
        subject: string;
        messageBody: string;
        toAddress: string;
        fromAddress: string;
        file: any;
        attachments: Array<Actions.Attachment>;
    };
    sendedList: Array<Actions.SendResult>;
    isSending: boolean;
    isSended: boolean;
    isUploading: boolean;
    isUploaded: boolean;
    isDeleting: boolean;
    isDeleted: boolean;
    isSearching: boolean;
    isSearched: boolean;
}

export interface RootState {
    app: AppState;
}

export function init(): AppState {
    return {
        mailModel: {
            subject: "",
            messageBody: "",
            toAddress: "",
            fromAddress: "test@example.com",
            file: "",
            attachments: []
        },
        sendedList: [],
        isSending: false,
        isSended: false,
        isUploading: false,
        isUploaded: false,
        isDeleting: false,
        isDeleted: false,
        isSearching: false,
        isSearched: false
    };
}

export const appStateReducer = (state: AppState = init(), action: Actions.Actions) => {
    // console.log("reducer called!! %s", action.type);
    // console.log(state);
    var resultState = init();
    switch (action.type) {
        // case "SEND":
        //     // メール送信時の処理
        //     return (<any>Object).assign({}, state, {
        //         isSending: false,
        //         isSended: false,
        //         isUploading: false,
        //         isUploaded: false,
        //         isDeleting: false,
        //         isDeleted: false,
        //         isSearching: false,
        //         isSearched: false,
        //         mailModel: {
        //             subject: action.payload.subject,
        //             messageBody: action.payload.messageBody,
        //             toAddress: action.payload.toAddress,
        //             fromAddress: action.payload.fromAddress,
        //             file: state.mailModel.file,
        //             attachments: state.mailModel.attachments
        //         }
        //     });
        // case "SAVE":
        //     return (<any>Object).assign({}, state, {
        //         isSending: false,
        //         isSended: false,
        //         isUploading: false,
        //         isUploaded: false,
        //         isDeleting: false,
        //         isDeleted: false,
        //         isSearching: false,
        //         isSearched: false,
        //         mailModel: {
        //             subject: action.payload.subject,
        //             messageBody: action.payload.messageBody,
        //             toAddress: action.payload.toAddress,
        //             fromAddress: action.payload.fromAddress,
        //             file: state.mailModel.file,
        //             attachments: state.mailModel.attachments
        //         }
        //     });
        case "CLEAR":
            return (<any>Object).assign({}, state, resultState);
        case "CHANGE_SUBJECT":
            resultState.mailModel = state.mailModel;
            resultState.mailModel.subject = action.payload.subject;

            return (<any>Object).assign({}, state, resultState);
        case "CHANGE_MESSAGE_BODY":
            resultState.mailModel = state.mailModel;
            resultState.mailModel.messageBody = action.payload.messageBody;
            return (<any>Object).assign({}, state, resultState);
        case "CHANGE_TO_ADDRESS":
            resultState.mailModel = state.mailModel;
            resultState.mailModel.toAddress = action.payload.toAddress;
            return (<any>Object).assign({}, state, resultState);
        case "SEND_START":
            console.log("SEND_START");
            resultState.mailModel = state.mailModel;
            resultState.isSending = true;
            return (<any>Object).assign({}, state, resultState);
        case "SEND_END":
            console.log("SEND_END");
            resultState.mailModel = state.mailModel;
            resultState.isSended = true;
            return (<any>Object).assign({}, state, resultState);
        case "UPLOAD_START":
            console.log("UPLOAD_START");
            resultState.mailModel = state.mailModel;
            resultState.isUploading = true;
            return (<any>Object).assign({}, state, resultState);
        case "UPLOAD_END":
            console.log("UPLOAD_END");
            // console.log(action.payload.attachment);
            // アップロード済みのリストの最後尾に追加する
            resultState.mailModel = state.mailModel;
            resultState.isUploaded = true;
            var attachments = state.mailModel.attachments;
            attachments.push(action.payload.attachment);
            resultState.mailModel.attachments = attachments;
            resultState.mailModel.file = "";
            return (<any>Object).assign({}, state, resultState);
        case "DELETE_ATTACHMENT_START":
            console.log("DELETE_ATTACHMENT_START");
            resultState.mailModel = state.mailModel;
            resultState.isDeleting = true;
            return (<any>Object).assign({}, state, resultState);
        case "DELETE_ATTACHMENT_END":
            console.log("DELETE_ATTACHMENT_END");
            resultState.mailModel = state.mailModel;
            resultState.isDeleted = true;
            // アップロード済みのリストから削除する
            var deletedAttachment = action.payload.attachment;
            var deletedIndex = state.mailModel.attachments.map((at) => at.originalname).indexOf(deletedAttachment.originalname);
            var attachments = state.mailModel.attachments;
            attachments.splice(deletedIndex, 1);
            resultState.mailModel.attachments = attachments;
            resultState.mailModel.file = "";

            return (<any>Object).assign({}, state, resultState);
        case "FIND_START":
            console.log("FIND_START");
            resultState.isSearching = true;
            return (<any>Object).assign({}, state, resultState);
        case "FIND_END":
            console.log("FIND_END");
            resultState.isSearched = true;
            resultState.sendedList = action.payload;
            // console.log(resultState.sendedList);
            return (<any>Object).assign({}, state, resultState);

        //型チェックにより発生しえない
        // default:
        //     return state;
    }
    return state;
}

export default combineReducers({
    app: appStateReducer
});