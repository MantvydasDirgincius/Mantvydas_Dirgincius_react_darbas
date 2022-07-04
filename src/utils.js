import axios from 'axios';

export async function doPostRequest(url, values) {
  try {
    const { data } = await axios.post(url, values);

    return data;
  } catch (error) {
    console.log('error ===', error);
    return error.message;
  }
}
