import axiosClient from './axiosClient';
const userApi = {
  post: (user) => {
    const url = '/user/register';
    return axiosClient.post(url, user);
  },
};

export default userApi;
