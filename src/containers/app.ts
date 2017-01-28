import { App, AppProps } from '../components/App';
import { RootState } from '../reducers/index';
import { Dispatch, connect } from 'react-redux';

// ルートコンポーネントとReducerの紐づけ

function mapStateToProps(state: RootState): AppProps {
    // console.log("call mapStateToProps!");
    // console.log(state.app);
    return state;
    // return {
    //     mailModel: {
    //         subject: state.app.mailModel.subject,
    //         messageBody: state.app.mailModel.messageBody,
    //         toAddress: state.app.mailModel.toAddress
    //     }
    // };
}

// function mapDispatchToProps(dispatch: Dispatch<RootState>) {
//     return dispatch;
// }

const AppContainer = connect(
    mapStateToProps
)(App);

export default AppContainer;

