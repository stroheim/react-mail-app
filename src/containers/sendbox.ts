import { App, AppProps } from '../components/App';
import { RootState } from '../reducers/index';
import { Dispatch, connect } from 'react-redux';
import SendBox from '../components/SendBox';

function mapStateToProps(state: RootState): AppProps {
    return state;
}

// function mapDispatchToProps(dispatch: Dispatch<RootState>) {
//     return dispatch;
// }

const SendboxContainer = connect(
    mapStateToProps
)(SendBox);

export default SendboxContainer;

