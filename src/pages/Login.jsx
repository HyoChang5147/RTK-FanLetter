import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [signingUp, setSigningUp] = useState(false);

  const handleLogin = async () => {
    try {
      const data = {
        email: id,
        password: password,
      };

      const response = await axios.post(
        "https://moneyfulpublicpolicy.co.kr/login",
        data
      );
      const { accessToken } = response.data;

      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

      console.log("로그인 성공:", response.data);
    } catch (error) {
      console.error("로그인 실패:", error);
    }
  };

  const handleSignUp = async () => {
    try {
      const response = await axios.post(
        "https://moneyfulpublicpolicy.co.kr/register",
        {
          id: id,
          password: password,
          nickname: nickname,
        }
      );
      console.log("회원가입 성공:", response.data);
    } catch (error) {
      console.error("회원가입 실패:", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {signingUp && (
        <input
          type="text"
          placeholder="Nickname"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
      )}
      {!signingUp ? (
        <>
          <button onClick={handleLogin}>로그인</button>
          <button onClick={() => setSigningUp(true)}>회원가입으로 전환</button>
        </>
      ) : (
        <>
          <button onClick={handleSignUp}>회원가입</button>
          <button onClick={() => setSigningUp(false)}>로그인으로 전환</button>
        </>
      )}
    </div>
  );
};

export default Login;
