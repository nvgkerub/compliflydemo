import axios from 'axios';
import * as SendingTypes from '../constants/SendingTypes';
import * as userAPI from '../lib/api/userAPI';

export function sendAudio(token, audio, name) {
  const file = {
    audio,
    name,
    type: 'audio/aac',
  };
  const body = new FormData();
  body.append('audio', file);
  body.append('access_token', token);
  body.append('name', name);
  body.append('extention', 'aac');
  console.log(body);
  return (dispatch) => {
    fetch(userAPI.audio.send, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body
    })
    .then(res => console.log(res))
    .catch(err => console.log(err));
  };
}

export function sendMessageWithFile(token, subject, description, file_path, extention) {
  const body = new FormData();
  body.append('file', {
    uri: file_path,
    type: 'image/jpg',
    name: 'mssgpic',
  });
  body.append('access_token', token);
  body.append('subject', subject);
  body.append('description', description);
  body.append('extention', extention);
  body.append('is_public', '0');
  return (dispatch) => {
    fetch(userAPI.message.sendMessage, {
      method: 'POST',
      body
    })
    .then((res) => console.log(res))
    .catch((err) => console.log('error sending message with file,', err));
  };
}
