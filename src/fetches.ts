const HOST = 'https://vidare.dygufa.com';
const handleHttpStatus = (res: any) => {
  if (res.status >= 200 && res.status < 300) {
    return res.json();
  }
  throw res;
};

const createErrorHandler = (defaultValue: any) => (res: any) => {
  console.error('request failed', res);
  return defaultValue;
};

export const postAuth = (request: any) => {
  return fetch(`${HOST}/login`, {
    credentials: 'same-origin',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(request),
  })
    .then(handleHttpStatus)
    .catch(createErrorHandler({}));
};

export const postRegisterUser = (request: any) => {
  return fetch('https://sangue-land.dygufa.com', {
    credentials: 'same-origin',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: '',
    },
    body: JSON.stringify(request),
  })
    .then(handleHttpStatus)
    .catch(createErrorHandler({}));
};

export const getProducts = () => {
  return fetch(`${HOST}/products`, {
    credentials: 'same-origin',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(handleHttpStatus)
    .catch(createErrorHandler([]));
};

export const getMe = () => {
  const token = localStorage.getItem('token');
  return fetch(`${HOST}/me`, {
    credentials: 'same-origin',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token || 'Bli',
    },
  })
    .then(handleHttpStatus)
    .catch(createErrorHandler([]));
};
