import React, { useState, useEffect } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateLetterContent, removeLetter } from "../redux/modules/letters";
import styled from "styled-components";
const Detail = () => {
  const { id } = useParams();
  const location = useLocation();
  const letter = location.state;
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [newContent, setNewContent] = useState(letter.contents);
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    setNewContent(letter.contents);
    setUpdated(false);
  }, [letter.contents]);

  const handleUpdateContent = () => {
    if (!newContent.trim()) {
      alert("내용을 입력해 주세요.");
      return;
    }

    if (newContent === letter.contents) {
      alert("변경된 내용이 없습니다.");
      return;
    }

    const confirmUpdate = window.confirm("내용을 수정하시겠습니까?");
    if (confirmUpdate) {
      dispatch(updateLetterContent({ id: letter.id, newContent }));
      setIsEditing(false);
      setUpdated(true);
    }
  };

  const handleCancelEdit = () => {
    setNewContent(letter.contents);
    setIsEditing(false);
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm("정말로 삭제하시겠습니까?");
    if (confirmDelete) {
      dispatch(removeLetter(letter.id));
      window.location.href = "/";
    }
  };

  useEffect(() => {
    if (updated) {
      window.location.href = "/";
    }
  }, [updated]);

  if (!letter) {
    return <div>No letter found!</div>;
  }

  return (
    <Container>
      <ContentWrapper>
        <h2>닉네임: {letter.nickname}</h2>
        {isEditing ? (
          <TextArea
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            placeholder="최대 100자 까지 작성할 수 있습니다"
            maxLength={100}
          />
        ) : (
          <p>내용: {letter.contents}</p>
        )}
        <CreatedAt>{letter.createdAt}</CreatedAt>
      </ContentWrapper>
      <ButtonContainer>
        {isEditing ? (
          <>
            <Button onClick={handleUpdateContent}>완료</Button>
            <Button onClick={handleCancelEdit}>취소</Button>
          </>
        ) : (
          <Button onClick={() => setIsEditing(true)}>수정</Button>
        )}
        <DeleteLink onClick={handleDelete}>삭제하기</DeleteLink>
        <HomeButton to="/">Home</HomeButton>
      </ButtonContainer>
    </Container>
  );
};

export default Detail;

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #fe3228;
  border-radius: 8px;

  &:hover {
    backdrop-filter: blur(8px);
  }
`;

const ContentWrapper = styled.div`
  margin-bottom: 20px;

  h2 {
    font-size: 35px;
    font-weight: bold;
    margin-bottom: 10px;
    text-align: center;
  }

  p {
    font-size: 30px;
    margin-bottom: 10px;
    font-weight: bold;
    text-align: center;
  }
`;

const CreatedAt = styled.div`
  font-size: 0.8em;
  text-align: right;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 150px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  margin-right: 10px;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: #ffcc00;
  font-size: 14px;

  &:hover {
    background-color: #ffdb4d;
  }
`;

const DeleteLink = styled.div`
  background-color: #fe5b52;
  color: #fff;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  margin-right: 260px;

  &:hover {
    background-color: #fe3228;
  }
`;

const HomeButton = styled(Link)`
  background-color: #007bff;
  color: #fff;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  text-decoration: none;
  font-size: 14px;

  &:hover {
    background-color: #0056b3;
  }
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;
