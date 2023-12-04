import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { __loginUser } from "../redux/modules/authSlice";
import { useNavigate } from "react-router-dom";
import { authServerAPI } from "../axios/api";
import styled from "styled-components";

const Login = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [signingUp, setSigningUp] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!id || !password) {
      alert("아이디와 비밀번호를 입력해주세요.");
      return;
    }
    try {
      await dispatch(__loginUser({ id, password }));
      navigate("/");
    } catch (error) {
      console.error("로그인 실패:", error);
    }
  };

  const handleSignUp = async () => {
    if (!id || !password || !nickname) {
      alert("아이디, 비밀번호, 닉네임을 모두 입력해주세요.");
      return;
    }
    try {
      const response = await authServerAPI.post("/register", {
        id: id,
        password: password,
        nickname: nickname,
      });
      console.log("회원가입 성공:", response.data);
    } catch (error) {
      console.error("회원가입 실패:", error);
    }
  };

  return (
    <Container>
      <StyledDiv>
        <Input
          type="text"
          placeholder="아이디 (4 ~ 10글자)"
          value={id}
          onChange={(e) => setId(e.target.value)}
          minLength={4}
          maxLength={10}
        />
        <Input
          type="password"
          placeholder="비밀번호 (4 ~ 15글자)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={4}
          maxLength={15}
        />
        {signingUp && (
          <Input
            type="text"
            placeholder="닉네임 (1 ~ 10글자)"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            minLength={1}
            maxLength={10}
          />
        )}
        {!signingUp ? (
          <>
            <SecondaryButton onClick={handleLogin}>로그인</SecondaryButton>
            <PrimaryButton onClick={() => setSigningUp(true)}>
              회원가입
            </PrimaryButton>
          </>
        ) : (
          <>
            <SecondaryButton onClick={() => setSigningUp(false)}>
              로그인
            </SecondaryButton>
            <PrimaryButton onClick={handleSignUp}>가입하기</PrimaryButton>
          </>
        )}
      </StyledDiv>
    </Container>
  );
};

export default Login;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const StyledDiv = styled.div`
  border: 2px solid #fe5b52;
  padding: 20px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  max-width: 400px;
`;

const Input = styled.input`
  margin: 10px 0;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 16px;
  width: calc(100% - 20px);
`;

const PrimaryButton = styled.button`
  margin: 10px 0;
  padding: 8px;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  width: calc(100% - 20px);
  background-color: #007bff;
  color: white;
  border: none;

  &:hover {
    background-color: #0056b3;
  }
`;

const SecondaryButton = styled.button`
  margin: 10px 0;
  padding: 8px;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  width: calc(100% - 20px);
  background-color: #f8d71c;
  color: #000000;
  border: 1px solid #f8d71c;
  / &:hover {
    background-color: #ffec80;
    border-color: #ffec80;
  }
`;
