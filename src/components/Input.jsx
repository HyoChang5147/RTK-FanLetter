import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addLetter } from "../redux/modules/letters";
import uuid from "react-uuid";
import memberData from "shared/data";
import styled from "styled-components";

const Input = () => {
  const dispatch = useDispatch();
  const [nickname, setNickname] = useState("");
  const [content, setContent] = useState("");
  const [selectedMember, setSelectedMember] = useState("");

  const handleAddLetter = (e) => {
    e.preventDefault();

    if (!nickname || !content || !selectedMember) {
      alert("모든 정보를 입력해 주세요.");
      return;
    }

    const currentTime = new Date();
    const KSTTime = currentTime.toLocaleString("ko-KR", {
      timeZone: "Asia/Seoul",
    });

    dispatch(
      addLetter({
        id: uuid(),
        nickname,
        contents: content,
        member: selectedMember,
        createdAt: KSTTime,
      })
    );

    setNickname("");
    setContent("");
    setSelectedMember("");
  };
  return (
    <FormContainer>
      <Form onSubmit={handleAddLetter}>
        <Label>Nickname</Label>
        <InputField
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="최대 20글자 까지 작성할 수 있습니다"
          maxLength={20}
        />
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
  border-radius: 8px;
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

const InputField = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 10px;
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
