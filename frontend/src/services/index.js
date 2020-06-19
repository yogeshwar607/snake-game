import { BASESERVERURL } from '../constants';

const postApiCall = async ({ url, data }) => {
  try {
    const apiUrl = `${BASESERVERURL}${url}`
    console.log(apiUrl,JSON.stringify(data) , data)

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    };

    const response = await fetch(apiUrl, requestOptions);
    const result = await response.json();

    return result;
  } catch (error) {
    console.log("error",error);
    return error;
  }
};

export { postApiCall };
