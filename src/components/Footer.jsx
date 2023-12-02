import styled from "styled-components";
import React from "react";
import aespa from "../assets/aespa _forever.png";

function Footer() {
  return (
    <StyledDiv>
      <StyledAnchor>개인정보처리방침</StyledAnchor>
      <ImageAp src={aespa} alt="aespaImage" />
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

const ImageAp = styled.img`
  width: 80px;
  height: auto;
  cursor: pointer;
  margin: -12px 0;
`;

const StyledAnchor = styled.a`
  cursor: pointer;
  font-weight: 500;
  font-size: 13px;
`;
