import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __fetchLetters } from "../redux/modules/lettersSlice";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { initialize } from "../redux/modules/lettersSlice";

function FanLetterList() {
  const dispatch = useDispatch();
  const letters = useSelector((state) => state.lettersSlice.letters);
  const selectedMember = useSelector((state) => state.members.selectedMember);
  const loading = useSelector((state) => state.lettersSlice.loading);
  const error = useSelector((state) => state.lettersSlice.error);
  const errorMessage = useSelector((state) => state.lettersSlice.errorMessage);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(__fetchLetters());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      navigate("/login");
      dispatch(initialize());
    }
  }, [error]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {errorMessage} </div>;
  }

  let filteredLetters = [];
  if (letters.length !== 0) {
    filteredLetters = letters.filter(
      (letter) => letter.writedTo === selectedMember
    );
  }

  if (filteredLetters.length === 0) {
    return (
      <NoLettersMessage>
        {selectedMember}에게 Fan Letter를 작성해 주세요!
      </NoLettersMessage>
    );
  }

  return (
    <Container>
      {filteredLetters.map((letter) => (
        <LetterContainer
          key={letter.id}
          onClick={() => navigate(`/detail/${letter.id}`, { state: letter })}
        >
          <LetterContentContainer>
            <LetterAvatar src={letter.avatar} alt="Avatar" />
            <LetterTextContainer>
              <SentTo>Sent to: {letter.writedTo}</SentTo>
              <LetterNickname>{letter.nickname}</LetterNickname>
              <LetterContent>{letter.content}</LetterContent>
              <CreatedAt>{letter.createdAt}</CreatedAt>
            </LetterTextContainer>
          </LetterContentContainer>
        </LetterContainer>
      ))}
    </Container>
  );
}

export default FanLetterList;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LetterContainer = styled.div`
  margin-bottom: 20px;
  border: 1px solid #fe3228;
  cursor: pointer;
  width: 400px;
  border-radius: 10px;
  object-fit: cover;

  &:hover {
    background-color: #fe5b52;
  }
`;

const LetterContentContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
`;

const LetterAvatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
  object-fit: cover;
`;

const LetterTextContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const LetterNickname = styled.h3`
  margin-bottom: 5px;
  font-weight: bold;
  text-align: left;
`;

const LetterContent = styled.p`
  margin-bottom: 10px;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 20px;
`;

const SentTo = styled.p`
  margin-bottom: 5px;
  font-style: italic;
  color: #555;
  text-align: left;
`;

const CreatedAt = styled.div`
  font-size: 0.8em;
  text-align: right;
`;

const NoLettersMessage = styled.div`
  margin: 20px;
  font-size: 18px;
  color: #555;
  text-align: center;
`;
