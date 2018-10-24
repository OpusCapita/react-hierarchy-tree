import { intlReducer } from 'react-intl-redux';
import { combineReducers } from 'redux';
import { datagridReducer } from '@opuscapita/react-grid';

export default combineReducers({
  intl: intlReducer,
  datagrid: datagridReducer,
});
