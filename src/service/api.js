import instance from "../utils/axios-customize";

const registerAPI = (fullName, email, password, phone) => {
  const URL = "/api/v1/user/register";
  const data = {
    fullName: fullName,
    email: email,
    password: password,
    phone: phone
  };

  return instance.post(URL, data);
}

const loginAPI = (email, password) => {
  const URL = "/api/v1/auth/login";
  const data = {
    username: email,
    password: password
  }
  
  return instance.post(URL, data);
}

const getAllUsersAPI = (current, pageSize) => {
  const URL = `/api/v1/user?current=${current}&pageSize=${pageSize}`;
  return instance.get(URL);
}

const createUserAPI = (fullName, email, password, phone) => {
  const URL = "/api/v1/user";
  const data = {
    fullName: fullName,
    email: email,
    password: password,
    phone: phone
  }

  return instance.post(URL, data);
}

export { registerAPI, loginAPI, getAllUsersAPI,
  createUserAPI
 }