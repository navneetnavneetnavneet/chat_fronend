import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { asyncCreateGroup } from "../store/actions/chatActions";

const CreateGroupPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [selectedUsers, setSelectedUsers] = useState([]);
  const [chatName, setChatName] = useState("");

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

    return () => {
      setUsers([]);
    };
  }, [search]);

  const handleAddUser = (user) => {
    if (selectedUsers.includes(user)) {
      return toast.warning("User already added !");
    }

    setSelectedUsers([...selectedUsers, user]);
  };

  const handleRemoveUser = (user) => {
    setSelectedUsers(
      selectedUsers &&
        selectedUsers.filter((selectedUser) => selectedUser._id !== user._id)
    );
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!chatName) {
      return toast.warning("Please enter group name !");
    }

    if (selectedUsers.length > 2) {
      return toast.warning("More than 2 users are required in group !");
    }

    const groupDetails = {
      chatName,
      users: JSON.stringify(
        selectedUsers && selectedUsers.map((user) => user._id)
      ),
    };

    await dispatch(asyncCreateGroup(groupDetails));
    await navigate("/");
    toast.success("Group is created");
    setChatName("");
  };

  return (
    <div className="w-full h-screen bg-zinc-200">
      <div className="w-full h-[10vh] px-2 md:px-4 flex items-center justify-between border-b border-zinc-400">
        <i
          onClick={() => navigate("/")}
          className="ri-arrow-left-line text-[1.25rem] cursor-pointer"
        ></i>
        <h1 className="text-[1.5rem] md:text-[1.75rem] lg:text-[2rem] font-semibold tracking-tighter">
          Create Group
        </h1>
        <i className="ri-menu-line text-[1.25rem] cursor-pointer"></i>
      </div>

      <div className="w-full md:w-[40vw] lg:w-[30vw] mx-auto pt-10 px-2">
        <h1 className="w-full text-center px-2 py-2 text-[1.5rem] text-white font-semibold leading-none rounded-md tracking-tighter bg-orange-400">
          Group Details
        </h1>

        <form
          onSubmit={submitHandler}
          className="w-full mt-5 flex flex-col gap-y-3 font-medium"
        >
          <input
            onChange={(e) => setChatName(e.target.value)}
            value={chatName}
            type="text"
            placeholder="Enter group name"
            className="w-full px-2 py-2 rounded-md text-base font-medium outline-0 bg-transparent border border-zinc-400"
          />
          <div className="w-full px-2 rounded-md border border-zinc-400 bg-white flex gap-2 items-center">
            <i className="ri-search-line text-[1.2rem]"></i>
            <input
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              type="text"
              placeholder="Search . . ."
              className="w-full py-2 outline-none text-base"
            />
            {search ? (
              <i
                onClick={() => setSearch("")}
                className="ri-close-line cursor-pointer text-base"
              ></i>
            ) : (
              ""
            )}
          </div>
          <div className="w-full flex gap-5 overflow-x-auto overflow-y-hidden">
            {selectedUsers.length > 0
              ? selectedUsers.map((u) => (
                  <div
                    key={u._id}
                    className="w-20 py-2 flex-shrink-0 flex gap-1 flex-col items-center justify-center bg-blue-300 rounded-md"
                  >
                    <div className="relative w-14 md:w-16 h-14 md:h-16 rounded-full border-2 border-zinc-400 p-[2px]">
                      <div className="w-full h-full rounded-full overflow-hidden">
                        <img
                          className="w-full h-full object-cover"
                          src={u.profileImage.url}
                          alt=""
                        />
                      </div>
                      <div
                        onClick={() => handleRemoveUser(u)}
                        className="absolute top-0 -right-2 w-[1.5rem] h-[1.5rem] cursor-pointer text-white rounded-full flex items-center justify-center bg-orange-500"
                      >
                        <i className="ri-close-line text-[1.25rem] cursor-pointer"></i>
                      </div>
                    </div>
                    <h4 className="text-[1.25rem] font-semibold tracking-tighter leading-none">
                      {u.fullName.split(" ")[0]}
                    </h4>
                  </div>
                ))
              : ""}
          </div>
          <div className="w-full max-h-[20vh] bg-zinc-200 overflow-x-hidden overflow-y-auto">
            {!loading ? (
              users.length > 0 &&
              users.map((user) => (
                <div
                  onClick={() => handleAddUser(user)}
                  key={user._id}
                  className="relative w-full h-[10vh] px-2 flex items-center gap-2 md:gap-3 border-b border-zinc-400 cursor-pointer"
                >
                  <div className="w-14 md:w-16 h-14 md:h-16 rounded-full overflow-hidden">
                    <img
                      className="w-full h-full object-cover"
                      src={user.profileImage.url}
                      alt=""
                    />
                  </div>
                  <h1 className="text-[1.25rem] md:text-[1.5rem] font-semibold tracking-tighter">
                    {user.fullName}
                  </h1>

                  {selectedUsers.length > 0 && selectedUsers.includes(user) ? (
                    <div className="absolute right-4 w-[1.5rem] h-[1.5rem] cursor-pointer text-white rounded-full flex items-center justify-center bg-zinc-500">
                      <i className="ri-check-fill text-[1.2rem] font-medium"></i>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              ))
            ) : (
              <h3 className="text-[1rem] font-medium opacity-50 w-full text-center py-5">
                Please wait . . .
              </h3>
            )}
          </div>
          <button className="w-full px-2 py-2 mt-3 rounded-md outline-none text-white text-base bg-blue-500 hover:bg-blue-600 cursor-pointer">
            Create Group
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateGroupPage;
