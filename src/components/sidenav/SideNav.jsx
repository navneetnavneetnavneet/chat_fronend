import React, { useEffect, useState } from "react";
import TopNav from "./TopNav";
import Status from "./Status";
import Chats from "./Chats";
import axios from "../../utils/axios";
import User from "./User";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const SideNav = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const { allStatus } = useSelector((state) => state.statusReducer);
  const { user } = useSelector((state) => state.userReducer);

  const fetchSearchResults = async () => {
    if (!search) {
      return;
    }
    setLoading(true);
    try {
      const { data, status } = await axios.get(
        `/users/alluser?search=${search}`
      );
      if (data && status === 200) {
        setUsers(data);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error?.response?.data);
    }
  };

  useEffect(() => {
    fetchSearchResults();

    return () => setUsers([]);
  }, [search]);

  return (
    <div className="relative w-full sm:w-[50vw] md:w-[40vw] lg:w-[30vw] h-screen border-r border-zinc-400">
      <TopNav />
      <div className="relative w-full h-[10vh] px-2 md:px-4 py-4">
        <div className="flex items-center justify-between px-2 py-1 rounded-md border border-zinc-400">
          <i className="ri-search-line text-[1.25rem] cursor-pointer"></i>
          <input
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            type="text"
            placeholder="Search chats . . ."
            className="w-full px-2 border-none outline-0 bg-transparent text-lg"
          />
          {search && (
            <i
              onClick={() => setSearch("")}
              className="ri-close-line text-[1.25rem] cursor-pointer"
            ></i>
          )}
        </div>
        <div
          className={`w-full ${
            users.length > 0 ? "h-[60vh]" : ""
          } z-[999] absolute top-[100%] left-0 bg-zinc-200 overflow-x-hidden overflow-y-auto`}
        >
          {!loading ? (
            users.length > 0 &&
            users.map((user) => <User key={user._id} user={user} />)
          ) : (
            <h3 className="text-[1rem] font-medium opacity-50 w-full text-center py-5">
              Please wait . . .
            </h3>
          )}
        </div>
      </div>
      <div className="w-full h-[10vh] px-2 md:px-4 flex items-center gap-2 md:gap-3 border-b border-zinc-400 overflow-x-auto overflow-y-hidden">
        {user?.status?.length === 0 ? <Status user={user} /> : ""}
        {allStatus.length > 0 &&
          allStatus.map((status) => (
            <Status key={status._id} user={status.user} />
          ))}
      </div>
      <Chats />
      <Link
        to="/create-group"
        className="absolute bottom-2 right-2 w-14 md:w-16 h-14 md:h-16 bg-zinc-600 rounded-full flex items-center justify-center text-white cursor-pointer"
      >
        <i className="ri-add-line text-[1.5rem] md:text-[2rem]"></i>
      </Link>
    </div>
  );
};

export default SideNav;
