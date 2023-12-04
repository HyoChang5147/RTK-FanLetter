import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

function MyProfile() {
  const location = useLocation();
  const userData = location.state;

  const [isEditing, setIsEditing] = useState(false);
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(userData ? userData.avatar : "");
  const [nickname, setNickname] = useState(userData ? userData.nickname : "");

  useEffect(() => {
    if (!isEditing) {
      setAvatarUrl(userData ? userData.avatar : "");
      setNickname(userData ? userData.nickname : "");
      setAvatarFile(null);
    }
  }, [isEditing, userData]);

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarFile(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNicknameChange = (event) => {
    setNickname(event.target.value);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    // 여기서 수정된 정보를 저장하고 필요에 따라 서버로 보낼 수 있습니다.
    setIsEditing(false);
    // 저장하는 로직 추가
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  return (
    <ProfileContainer>
      <ProfileWrapper>
        <ProfileHeading>My Profile</ProfileHeading>
        {userData && (
          <div>
            {!isEditing ? (
              <div>
                <ProfileImage src={avatarUrl} alt="Avatar" />
                <ProfileID>ID : {userData.userId}</ProfileID>
                <ProfileNickname>닉네임 : {nickname}</ProfileNickname>
                <EditButton onClick={handleEditClick}>프로필 수정</EditButton>
              </div>
            ) : (
              <div>
                <input type="file" onChange={handleAvatarChange} />
                {avatarFile && (
                  <ProfileImage src={avatarFile} alt="Avatar Preview" />
                )}
                <EditableInput
                  type="text"
                  value={nickname}
                  onChange={handleNicknameChange}
                  placeholder="Enter Nickname"
                />
                <EditButton onClick={handleSaveClick}>수정하기</EditButton>
                <EditButton onClick={handleCancelClick}>취소</EditButton>
              </div>
            )}
          </div>
        )}
      </ProfileWrapper>
    </ProfileContainer>
  );
}

export default MyProfile;

const ProfileContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
  padding: 20px 0;
`;

const ProfileWrapper = styled.div`
  backdrop-filter: blur(5px);
  max-width: 500px;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const ProfileHeading = styled.h2`
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
`;

const ProfileID = styled.p`
  text-align: center;
  font-size: 25px;
  font-weight: bold;
  margin-bottom: 10px;
  background-color: #fe5b52;
  border-radius: 10px;
  padding: 10px;
`;

const ProfileNickname = styled.p`
  text-align: center;
  font-size: 20px;
  margin-bottom: 10px;
  background-color: #fe5b52;
  border-radius: 10px;
  padding: 10px;
`;

const ProfileImage = styled.img`
  max-width: 200px;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  margin-bottom: 20px;
  text-align: center;
`;

const EditableInput = styled.input`
  width: 100%;
  margin-bottom: 10px;
  margin-top: 10px;
  padding: 15px;
`;

const EditButton = styled.button`
  font-size: 15px;
  padding: 10px;
  margin: 0 10px;
  margin-left: 0px;
  border-radius: 10px;
  gap: 5px;
  background-color: #ffb6c1;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ff9eb5;
  }
`;
