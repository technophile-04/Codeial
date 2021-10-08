export * from './constants';

export const setItemInLocalStorage = (key, value) => {
  if (!key || !value) {
    console.error('Key or value is missing cannot store!');
    return;
  }

  const valueToStore =
    typeof value !== 'string' ? JSON.stringify(value) : value;

  localStorage.setItem(key, valueToStore);
};

export const getItemFromLocalStorage = (key) => {
  if (!key) {
    console.error('Key  missing cannot get!');
    return;
  }

  return localStorage.getItem(key);
};

export const removeItemFromLocalStorage = (key) => {
  if (!key) {
    console.error('Key  missing cannot get!');
    return;
  }

  localStorage.removeItem(key);
};

export const getFormBody = (params) => {
  let formBody = [];

  for (let property in params) {
    let encodedKey = encodeURIComponent(property); // "user name" --> 'user%20name'
    let encodedValue = encodeURIComponent(params[property]); //"shiv 123" --> 'shiv%20%20123'

    formBody.push(encodedKey + '=' + encodedValue);
  }

  return formBody.join('&'); //username=shiv123&password=345
};
