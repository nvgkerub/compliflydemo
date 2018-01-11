import * as LibraryTypes from '../constants/LibraryTypes';
import createReducer from '../lib/createReducer';

const defaultState = {
  error: null,
  pdfList: []
};

function GRAB_PDF_LIST(state, action) {
  console.log(action.payload);
  return {
    ...state,
    pdfList: action.payload
  };
}
function LIBRARY_ERROR(state, action) {
  return {
    ...state,
    error: action.payload
  };
}

const handlers = {};
handlers[LibraryTypes.GRAB_PDF_LIST] = GRAB_PDF_LIST;
handlers[LibraryTypes.LIBRARY_ERROR] = LIBRARY_ERROR;

export default createReducer(defaultState, handlers);
