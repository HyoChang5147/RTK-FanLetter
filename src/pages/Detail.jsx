import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  __deleteLetter,
  __updateLetterContent,
} from "../redux/modules/lettersSlice";
import styled from "styled-components";

function Detail() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const letter = location.state;
  const [updatedContent, setUpdatedContent] = useState(letter.content);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));

    if (!userData.accessToken) {
      navigate("login");
    }
  }, [navigate]);

  const handleDelete = (letterId) => {
    const confirmed = window.confirm("정말로 이 편지를 삭제하시겠습니까?");
    if (confirmed) {
      dispatch(__deleteLetter(letterId))
        .unwrap()
        .then(() => {
          navigate("/");
        })
        .catch((error) => {
          console.error("Error deleting letter:", error);
        });
    }
  };

  const handleUpdateContent = (letterId, content) => {
    if (content.trim() === "") {
      alert("내용을 입력해주세요.");
      return;
    }

    if (content === letter.content) {
      alert("변경된 사항이 없습니다.");
      setIsEditing(false);
      return;
    }

    const confirmed = window.confirm("편지 내용을 수정하시겠습니까?");
    if (confirmed) {
      dispatch(__updateLetterContent({ letterId, updatedContent: content }))
        .unwrap()
        .then(() => {
          alert("편지 내용이 수정되었습니다.");
          setIsEditing(false);
          navigate("/");
        })
        .catch((error) => {
          console.error("Error updating letter content:", error);
        });
    }
  };

  const userData = JSON.parse(localStorage.getItem("userData"));
  const isSameUser = userData.userId === letter.userId;

  return (
    <PageContainer>
      <DetailContainer>
        <AvatarContainer>
          <Avatar src={letter.avatar} alt="Avatar" />
          <UserInfo>
            <LetterNickname>닉네임: {letter.nickname}</LetterNickname>
            <SentTo>Sent to: {letter.writedTo}</SentTo>
          </UserInfo>
        </AvatarContainer>
        {isEditing ? (
          <div>
            <Textarea
              type="text"
              value={updatedContent}
              onChange={(e) => setUpdatedContent(e.target.value)}
              placeholder="최대 100자 까지 작성할 수 있습니다"
              maxLength={100}
            />
            <UpdateButton
              onClick={() => handleUpdateContent(letter.id, updatedContent)}
            >
              수정하기
            </UpdateButton>
            <Button onClick={() => setIsEditing(false)}>수정 취소</Button>
          </div>
        ) : (
          <LetterContent>{letter.content}</LetterContent>
        )}
        <CreatedAt>최초 등록 날자: {letter.createdAt}</CreatedAt>
        {!isEditing && isSameUser && (
          <Button onClick={() => setIsEditing(true)}>내용 수정하기</Button>
        )}
        {!isEditing && isSameUser && (
          <DeleteButton onClick={() => handleDelete(letter.id)}>
            Fan Letter 삭제
          </DeleteButton>
        )}
      </DetailContainer>
    </PageContainer>
  );
}

export default Detail;

const AvatarContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 20px;
`;

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
`;

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  width: 600px;
  max-height: 800px;
  border-radius: 10px;
  border: 1px solid #fe3228;
  &:hover {
    background-color: #fe5b52;
  }
`;

const Avatar = styled.img`
  max-width: 100px;
  border-radius: 50%;
`;

const Button = styled.button`
  margin-top: 10px;
  padding: 8px 16px;
  margin: 5px 5px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const UpdateButton = styled(Button)`
  background-color: #ffc107;
  color: black;
  &:hover {
    background-color: #ffcd39;
  }
`;

const DeleteButton = styled(Button)`
  background-color: #dc3545;
  &:hover {
    background-color: #c82333;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 100px;
  margin-bottom: 10px;
  padding: 8px;
`;

const SentTo = styled.p`
  font-weight: bold;
  margin-bottom: 5px;
`;

const LetterNickname = styled.p`
  font-size: 30px;
  margin-bottom: 10px;
  margin-top: 20px;
`;

const LetterContent = styled.p`
  font-size: 50px;
  margin-bottom: 20px;
`;

const CreatedAt = styled.p`
  padding: 10px;
  text-align: right;
`;
