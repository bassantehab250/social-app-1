import { useContext, useState } from "react";
import { FaBars } from "react-icons/fa";
import { IoMdClock } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { userLogin, setuserLogin } = useContext(AuthContext);
const navigate = useNavigate()
  function logout(){
    localStorage.removeItem("userToken")
    setuserLogin(null)
    navigate("/login")
  }
  return (
    <>
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* logo */}
            <div className="shrink-0 flex items-center">
              <Link to="/" className="text-2xl font-bold text-indigo-600">
                Logo
              </Link>
            </div>
            {/* desktop */}
            <div className="hidden md:flex items-center space-x-8">
              {userLogin ? (
                <>
                  <Link
                    to={"/"}
                    className="text-gray-700 hover:text-indigo-600 transition-colors font-medium"
                  >
                    Home
                  </Link>
                  <Link
                    to={"/profile"}
                    className="text-gray-700 hover:text-indigo-600 transition-colors font-medium"
                  >
                    Profile
                  </Link>
                  <button
                  onClick={logout}
                    className="text-gray-700 cursor-pointer hover:text-indigo-600 transition-colors font-medium"
                  >
                   LogOut
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to={"/register"}
                    className="text-gray-700 hover:text-indigo-600 transition-colors font-medium"
                  >
                    Register
                  </Link>
                  <Link
                    to={"/login"}
                    className=" bg-indigo-600 text-white rounded-lg py-2 px-4 hover:bg-indigo-700  transition-colors font-medium"
                  >
                    Login
                  </Link>
                </>
              )}
            </div>
            {/* mobile */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => {
                  setIsOpen(!isOpen);
                }}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700  hover:text-indigo-600 hover:bg-gray-100 focus:outline-none"
                aria-expanded={isOpen}
              >
                {!isOpen ? <FaBars /> : <IoMdClock />}
              </button>
            </div>
          </div>

          {/* mobile */}
          <div className={`md:hidden ${isOpen ? "block" : "hidden"}`}>
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
              <div className="flex flex-col gap-4">
                {userLogin ? (
                  <>
                    <Link
                      to={"/"}
                      className="text-gray-700 hover:text-indigo-600 transition-colors font-medium block"
                    >
                      Home
                    </Link>
                    <Link
                      to={"/profile"}
                      className="text-gray-700 hover:text-indigo-600 transition-colors font-medium block"
                    >
                      Profile
                    </Link>
                    <button
                    onClick={logout}
                    className="text-gray-700 cursor-pointer hover:text-indigo-600 transition-colors font-medium"
                  >
                   LogOut
                  </button>
                  </>
                ) : (
                  <>
                    <Link
                      to={"/register"}
                      className="text-gray-700 hover:text-indigo-600 transition-colors font-medium block"
                    >
                      Register
                    </Link>
                    <Link
                      to={"/login"}
                      className=" bg-indigo-600 text-white text-center rounded-lg py-2 px-4 hover:bg-indigo-700  transition-colors font-medium block"
                    >
                      Login
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
