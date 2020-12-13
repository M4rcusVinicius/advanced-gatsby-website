import React from "react"
import Logo from "../Logo"
import MenuLinks from "../MenuLinks"
import MenuBar from "../MenuBar"

import * as S from "./styled"

const Sidebar = () => (
  <S.SidebarWrapper>
    <Logo />
    <MenuLinks />
    <MenuBar />
  </S.SidebarWrapper>
)

export default Sidebar
