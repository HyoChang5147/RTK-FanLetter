import React from "react";
import styled from "styled-components";
import redVelvetImage from "../assets/Red-Velvet-Logo-Sappy-2019.png";
import aespaImage from "../assets/aespa _forever.png";

function Header() {
  return (
    <HeaderContainer>
      <ImageRv src={redVelvetImage} alt="Red Velvet" />
      <ImageAp src={aespaImage} alt="Red Velvet" />
    </HeaderContainer>
  );
}

export default Header;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ImageRv = styled.img`
  width: 300px;
  height: auto;
  margin: 0 10px;
  margin-bottom: 20px;
  margin-top: 35px;
`;

const ImageAp = styled.img`
  width: 300px;
  height: auto;
  margin: 0 10px;
  margin-bottom: 20px;
`;
