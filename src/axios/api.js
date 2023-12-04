import axios from "axios";

const AUTH_SERVER_API_BASE_URL = process.env.REACT_APP_LOGIN_SERVER_URL;

export const jsonServerAPI = axios.create({
  baseURL: "http://localhost:4000",
});

const getToken = () => {
  const accessToken = localStorage.getItem("accessToken");
  return accessToken;
};

export const authServerAPI = axios.create({
  baseURL: AUTH_SERVER_API_BASE_URL,
});

jsonServerAPI.interceptors.request.use(
  async function (config) {
    const response = await authServerAPI.get("/user", {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    if (response.data.success === true) {
      return config;
    } else {
      localStorage.setItem("accessToken", undefined);
    }
  },

  function (error) {
    console.log("요청 인터셉터 오류:", error);
    return Promise.reject(error);
  }
);

jsonServerAPI.interceptors.response.use(
  // 응답을 내보내기 전 수행되는 함수
  function (response) {
    console.log("인터셉터 응답 받았습니다!");
    return response;
  },

  // 오류응답을 내보내기 전 수행되는 함수
  function (error) {
    console.log("인터셉터 응답 오류발생!");
    return Promise.reject(error);
  }
);

// call 탈취
// 내가 원하는대로 바꿔요 // 동작을 바꿈 // 반환

export default jsonServerAPI;
