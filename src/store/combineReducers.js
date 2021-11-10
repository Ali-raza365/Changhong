import { combineReducers } from 'redux';
import appReducer from './reducers/app';
import userSession from './reducers/userSession';
import VoucherReducer from './reducers/VoucherReducer';
import WalletReducer from './reducers/WalletReducer';
import questionReducer from './reducers/questionReducer';
import stockReducer from './reducers/stockReducer';
import trainingReducer from './reducers/trainingReducer';
import MPRReducer from './reducers/MPRReducer';
import DisplayReducer from './reducers/DisplayReducer';

export default combineReducers({
     app: appReducer,
     userSession: userSession,
     voucher: VoucherReducer,
     wallet: WalletReducer,
     questions: questionReducer,
     stock: stockReducer,
     training: trainingReducer,
     MRP: MPRReducer,
     Display: DisplayReducer,
});
