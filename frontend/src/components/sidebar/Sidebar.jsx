// import Conversations from "./Conversations"
// import LogoutButton from "./LogoutButton"
// import SearchInput from "./SearchInput"

// const Sidebar = () => {
//   return (
//     <div className="
//     hidden
//     border-r border-slate-500 md:flex flex-col p-4 bg-slate-800/50">
//         <SearchInput/>
//         <div className="divider px-3"></div>
//         <Conversations/>
//         <LogoutButton/>
//     </div>
//   )
// }

// export default Sidebar

import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import SearchInput from "./SearchInput";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Hamburger Menu Icon */}
      <button
        onClick={toggleSidebar}
        className="absolute top-0 right-0 z-50 md:hidden text-gray-200 p-2 rounded-md hover:bg-slate-600 focus:outline-none"
      >
        <FiMenu size={24} />
      </button>

      {/* Sidebar */}

     <div className={`fixed top-0 left-0 h-full  bg-slate-800/50 border-r border-slate-500 p-4 z-40 transform ${
          isOpen ? "translate-x-0 flex bg-slate-800/80" : "-translate-x-full"
        } transition-transform duration-300 md:translate-x-0 md:relative md:flex flex-col`}>
         <SearchInput/>
         <div className="divider px-3"></div>
         <Conversations/>
         <LogoutButton/>
     </div>



      {/* Overlay for small screens */}
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
        ></div>
      )}
    </>
  );
};

export default Sidebar;
