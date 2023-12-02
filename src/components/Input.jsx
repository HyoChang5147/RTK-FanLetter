import React, { useState } from "react";
import { useDispatch } from "react-redux";
import memberData from "shared/data";
import styled from "styled-components";
import { __addLetter } from "../redux/modules/lettersSlice";
import uuid from "react-uuid";

const Input = () => {
  const dispatch = useDispatch();
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [content, setContent] = useState("");
  const [selectedMember, setSelectedMember] = useState("");

  const handleAddLetter = async (e) => {
    e.preventDefault();

    const currentTime = new Date();
    const KSTTime = currentTime.toLocaleString("ko-KR", {
      timeZone: "Asia/Seoul",
    });

    if (!content || !selectedMember) {
      alert("모든 정보를 입력해 주세요.");
      return;
    }

    try {
      const letterData = {
        id: uuid(),
        nickname: userData.nickname,
        content,
        avatar: userData.avatar,
        writedTo: selectedMember,
        createdAt: KSTTime,
        userId: userData.userId,
      };

      dispatch(__addLetter(letterData));

      setContent("");
      setSelectedMember("");
    } catch (error) {
      console.error("에러 발생:", error);
    }
  };

  return (
    <FormContainer>
      <Form onSubmit={handleAddLetter}>
        <NicknameDisplay>닉네임: {userData.nickname}</NicknameDisplay>
        <Label>Fan Letter</Label>
        <TextArea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="최대 100자 까지 작성할 수 있습니다"
          maxLength={100}
        />
        <Label>Member</Label>
        <SelectField
          name="writedTo"
          value={selectedMember}
          onChange={(e) => setSelectedMember(e.target.value)}
        >
          <option value="" disabled>
            멤버를 선택해주세요.
          </option>
          {memberData.map((member) => (
            <option key={member.id} value={member.member}>
              {member.member}
            </option>
          ))}
        </SelectField>
        <SubmitButton type="submit">작성하기</SubmitButton>
      </Form>
    </FormContainer>
  );
};

export default Input;

const FormContainer = styled.div`
  max-width: 400px;
  margin: 20px auto;
  padding: 30px;
  border-radius: 10px;
  backdrop-filter: blur(5px);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Label = styled.p`
  font-size: 1.2em;
  font-weight: bold;
  color: #fff;
  margin-bottom: 8px;
`;

const NicknameDisplay = styled.p`
  font-size: 2em;
  font-weight: bold;
  color: #fff;
  margin-bottom: 8px;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 130px;
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 10px;
`;

const SelectField = styled.select`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 10px;
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  background-color: #fe5b52;
  color: #fff;
  transition: background-color 0.3s ease;
  border-radius: 10px;

  &:hover {
    background-color: #fe3228;
  }
`;
