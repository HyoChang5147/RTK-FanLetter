import styled from "styled-components";
import React from "react";

function Footer() {
  return (
    <StyledDiv>
      <StyledAnchor>개인정보처리방침</StyledAnchor>
      <StyledAnchor>서비스 이용약관</StyledAnchor>
      <StyledAnchor>고객센터</StyledAnchor>
    </StyledDiv>
  );
}

export default Footer;

const StyledDiv = styled.div`
  backdrop-filter: blur(5px);
  padding: 20px;
  display: flex;
  justify-content: space-between;
`;

const StyledAnchor = styled.a`
  cursor: pointer;
  font-weight: 500;
  font-size: 13px;
`;
