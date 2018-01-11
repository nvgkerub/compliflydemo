import axios from 'axios';
import * as LibraryTypes from '../constants/LibraryTypes';
import * as userAPI from '../lib/api/userAPI';


export function grabPdfList(token) {
  const date = '0';
  return (dispatch) => (
    axios.get(userAPI.library.libraryPDF, {
      params: {
        access_token: token,
        date
      }
    })
    .then(res => (
      res.data.status === 'success'
      ?
        dispatch({
          type: LibraryTypes.GRAB_PDF_LIST,
          payload: res.data.response.librarydata
        })
      :
        dispatch({
          type: LibraryTypes.LIBRARY_ERROR,
          payload: res.data.response
        })
    ))
    .catch(err => console.log(err))
  );
}
