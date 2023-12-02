import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedMember } from "../redux/modules/members";
import styled from "styled-components";
import memberData from "shared/data";

const MemberButton = () => {
  const dispatch = useDispatch();
  const selectedMember = useSelector((state) => state.members.selectedMember);

  const handleButtonClick = (member) => {
    dispatch(setSelectedMember(member));
  };

  return (
    <ButtonContainer>
      {memberData.map((memberInfo) => (
        <Button
          key={memberInfo.id}
          onClick={() => handleButtonClick(memberInfo.member)}
          selected={selectedMember === memberInfo.member}
        >
          <img src={memberInfo.nameImg} alt={memberInfo.member} />
        </Button>
      ))}
    </ButtonContainer>
  );
};

export default MemberButton;

const ButtonContainer = styled.div`
  text-align: center;
`;

const Button = styled.button`
  width: 150px;
  height: 70px;
  margin: 5px;
  background-color: ${(props) => (props.selected ? "#fe3228" : "#fe5b52")};
  color: #fff;
  border-radius: 10px;
  margin-top: 25px;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    margin-right: 5px;
  }
`;
