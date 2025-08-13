import SearchBar from "../components/SearchBar";
import { Icon } from "@iconify/react";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 !p-4">
      <div className="w-full mx-auto flex justify-between !px-5 items-center">
        <div className="text-white text-lg font-bold">Notes App</div>
        <SearchBar searchQuery="" onSearchChange={() => {}} />
        <button className="flex gap-2 items-center text-white outfit-medium">
          <p>Usuario</p>
          <Icon icon="tdesign:user-filled" width="24" height="24" style={{ color: "#fff" }} />
        </button>
      </div>
    </nav>
  );
}

export default Navbar;