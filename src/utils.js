import axios from 'axios';
import App from './App';

export async function doPostRequest(url, values, token) {
  try {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    const { data } = await axios.post(url, values, {
      headers: headers,
    });

    return data;
  } catch (error) {
    console.log('error ===', error);
    return error.message;
  }
}

export async function doGetRequest(url, values) {
  try {
    const { data } = await axios.get(url, values);

    return data;
  } catch (error) {
    console.log('error ===', error);
    return error.message;
  }
}
