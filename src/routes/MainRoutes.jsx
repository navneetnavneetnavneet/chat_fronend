import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import HomePage from "../pages/HomePage";
import SignUpPage from "../pages/SignUpPage";
import SignInPage from "../pages/SignInPage";
import ProfilePage from "../pages/ProfilePage";
import EditProfilePage from "../pages/EditProfilePage";
import { useDispatch, useSelector } from "react-redux";
import { asyncFetchAllUser, asyncLoadUser } from "../store/actions/userActions";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import { setAllUser } from "../store/reducers/userSlice";
import { asyncFetchAllChats } from "../store/actions/chatActions";
import { setChats } from "../store/reducers/chatSlice";
import ChatPage from "../pages/ChatPage";
import CreateGroupPage from "../pages/CreateGroupPage";
import UpdateGroupDetails from "../pages/UpdateGroupDetails";
import ChatInformation from "../pages/ChatInformation";
import ShowStatusPage from "../pages/ShowStatusPage";
import UploadStatusPage from "../pages/UploadStatusPage";
import { asyncFetchAllStatus } from "../store/actions/statusActions";
import { setAllStatus } from "../store/reducers/statusSlice";

const MainRoutes = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector((state) => state.userReducer);

  useEffect(() => {
    dispatch(asyncLoadUser());
    dispatch(asyncFetchAllChats());
    dispatch(asyncFetchAllStatus());
    dispatch(asyncFetchAllUser());

    isAuthenticated && navigate("/");
    !isAuthenticated && navigate("/signin");

    return () => {
      dispatch(setChats([]));
      dispatch(setAllStatus([]));
      dispatch(setAllUser([]));
    };
  }, [isAuthenticated, dispatch]);

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profile/edit" element={<EditProfilePage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route
          path="/reset-password/:resetToken"
          element={<ResetPasswordPage />}
        />
        <Route path="/chat/:chatId" element={<ChatPage />}>
          <Route
            path="/chat/:chatId/group-details"
            element={<UpdateGroupDetails />}
          />
          <Route
            path="/chat/:chatId/chat-information"
            element={<ChatInformation />}
          />
        </Route>
        <Route path="/create-group" element={<CreateGroupPage />} />
        <Route path="/status/:userId" element={<ShowStatusPage />} />
        <Route path="/status/upload" element={<UploadStatusPage />} />
      </Routes>
    </>
  );
};

export default MainRoutes;
