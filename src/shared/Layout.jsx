import Footer from "components/Footer";
import LogOut from "components/LogOut";
import { Outlet } from "react-router-dom";
import redVelvetImage from "../assets/Red-Velvet-Logo-Sappy-2019.png";
import styled from "styled-components";

function Layout() {
  return (
    <LayoutContainer>
      <Header>
        <HeaderWrapper>
          <Title
            onClick={() => {
              window.location.replace("/");
            }}
          >
            <ImageEp src={redVelvetImage} alt="redVelvetImage" />
          </Title>
          <RightAlignedItems>
            <ProfileLogoutWrapper>
              <button>My Profile</button>
              <LogOut />
            </ProfileLogoutWrapper>
          </RightAlignedItems>
        </HeaderWrapper>
      </Header>
      <StLayout>
        <Outlet />
      </StLayout>
      <Footer />
    </LayoutContainer>
  );
}

export default Layout;

const LayoutContainer = styled.div`
  width: 100%;
  height: 100vh;
  /* min-width: 600px; */
`;

const Header = styled.header`
  width: "100%";
  height: 6rem;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  box-shadow: 0 3px 7px #e9cccc;
`;

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 1250px;
  margin: 0 auto;
`;

const Title = styled.div`
  cursor: pointer;
  transition: all 0.3s ease-in-out;
`;

const ImageEp = styled.img`
  width: 200px;
  height: auto;
  margin: 0 10px;
`;

const StLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 90vh;
`;

const RightAlignedItems = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileLogoutWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-left: 20px;
  gap: 10px;
`;
