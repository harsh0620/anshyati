import React from "react";
import { MdGroups } from "react-icons/md";
import { Routes, Route } from "react-router-dom";
import CreateGroup from "./Groups/CreateGroup";
import GetGroups from "./Groups/GetGroups";
import GetGroupsInfo from "./Groups/GetGroupsInfo";
import JoinGroup from "./Groups/JoinGroup";
import SettingsGroup from "./Groups/SettingsGroup";
import HeaderTitle from "./HeaderTitle";
const Groups = () => {
  return (
    <div>
      <HeaderTitle title="Groups" icon={<MdGroups />} />
      <Routes>
        <Route path="/" element={<GetGroups />} />
        <Route path="/create" element={<CreateGroup />} />
        <Route path="/join/:groupId" element={<JoinGroup />} />
        <Route path="/info/:groupId" element={<GetGroupsInfo />} />
        <Route path="/settings/:groupId" element={<SettingsGroup />} />
      </Routes>
    </div>
  );
};

export default Groups;
