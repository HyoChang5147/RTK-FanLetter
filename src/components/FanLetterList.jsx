import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const FanLetterList = () => {
  const navigate = useNavigate();
  const letters = useSelector((state) => state.letters.letters);
  const selectedMember = useSelector((state) => state.members.selectedMember);
  const filteredLetters = letters.filter(
    (letter) => letter.member === selectedMember
  );

  const handleLetterClick = (id, letter) => {
    navigate(`/detail/${id}`, { state: letter });
  };

  return (
    <Container>
      {filteredLetters.map((letter) => (
        <LetterContainer
          key={letter.id}
          onClick={() => handleLetterClick(letter.id, letter)}
        >
          <ul>
            <li key={letter.id}>
              <LetterNickname>{letter.nickname}</LetterNickname>
              <LetterContent>{letter.contents}</LetterContent>
              <SentTo>Sent to: {letter.member}</SentTo>
              <CreatedAt>{letter.createdAt}</CreatedAt>
            </li>
          </ul>
        </LetterContainer>
      ))}
    </Container>
  );
};

export default FanLetterList;

const LetterContainer = styled.div`
  margin-bottom: 20px;
  border: 1px solid #fe3228;
  padding: 10px;
  cursor: pointer;
  width: 400px;
  height: auto;
  border-radius: 10px;

  &:hover {
    background-color: #fe5b52;
  }
`;

const LetterNickname = styled.h3`
  margin-bottom: 5px;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const LetterContent = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 5px;
`;

const SentTo = styled.p`
  font-style: italic;
  color: #555;
`;

const CreatedAt = styled.div`
  font-size: 0.8em;
  text-align: right;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
