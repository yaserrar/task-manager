import { Outlet } from "react-router-dom";
import Header from "../header/header";

const Root = () => {
  return (
    <>
      <Header />
      <div className="w-full flex justify-center">
        <div className="container max-w-[1536px] px-6 ">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Root;
