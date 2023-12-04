import Input from "components/Input";
import MemberButton from "components/MemberButton";
import FanLetterList from "components/FanLetterList";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
    }
  }, [navigate, accessToken]);

  return accessToken ? (
    <div>
      <MemberButton />
      <Input />
      <FanLetterList />
    </div>
  ) : null;
}

export default Home;
