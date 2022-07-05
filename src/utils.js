import axios from 'axios';

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

export async function doGetRequest(url, token) {
  try {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    const { data } = await axios.get(url, { headers: headers });

    return data;
  } catch (error) {
    console.log('error ===', error);
    return error.message;
  }
}
