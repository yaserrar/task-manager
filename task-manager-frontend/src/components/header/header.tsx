import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
} from "@nextui-org/react";
import { Link, useNavigate } from "react-router-dom";
import useUserStore from "../../lib/stores/user-store";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { isLoggerIn, logout } = useUserStore();
  const navigate = useNavigate();
  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      isMenuOpen={isMenuOpen}
      maxWidth="2xl"
    >
      <NavbarContent>
        <NavbarBrand className="text-primary font-bold text-xl">
          Task manager
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="end">
        {!isLoggerIn ? (
          <>
            <NavbarItem className="hidden lg:flex">
              <Link to="/login">Login</Link>
            </NavbarItem>
            <NavbarItem>
              <Button as={Link} color="primary" to="/sign-up" variant="flat">
                Sign Up
              </Button>
            </NavbarItem>
          </>
        ) : (
          <NavbarItem>
            <Button
              color="primary"
              variant="flat"
              onClick={() => {
                logout();
                navigate("/login");
              }}
            >
              Logout
            </Button>
          </NavbarItem>
        )}
      </NavbarContent>
    </Navbar>
  );
};

export default Header;
