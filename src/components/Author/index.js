import React from "react"
import * as S from "./styled"
import Avatar from "../Avatar"
import SocialLinks from "../SocialLinks"

const Althor = (props) => {

  return (
    <S.AlthorWrapper>
      <Avatar />
      <S.AlthorName>{props.name}</S.AlthorName>
      <S.AlthorJob>Ensino Médio</S.AlthorJob>
      <SocialLinks />
    </S.AlthorWrapper>
  )
}

export default Althor
