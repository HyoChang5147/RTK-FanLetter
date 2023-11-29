import React, { useState, useEffect } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateLetterContent, removeLetter } from "../redux/modules/letters";

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
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      dispatch(removeLetter(letter.id));
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
    <div>
      <h2>Letter Detail</h2>
      <p>Nickname: {letter.nickname}</p>
      {isEditing ? (
        <>
          <textarea
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            placeholder="새로운 내용 입력"
          />
          <button onClick={handleUpdateContent}>완료</button>
          <button onClick={handleCancelEdit}>취소</button>
        </>
      ) : (
        <p>Contents: {letter.contents}</p>
      )}
      {!isEditing && <button onClick={() => setIsEditing(true)}>수정</button>}
      <Link to="/" onClick={handleDelete}>
        삭제하기
      </Link>
      <Link to="/">Home</Link>
    </div>
  );
};

export default Detail;
