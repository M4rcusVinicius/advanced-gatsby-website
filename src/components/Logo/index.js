import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import getThemeColor from "../../utils/getThemeColor"
import LogoImage from "../LogoImage"
import * as S from "./styled"

const Logo = () => {
  const {
    site: {
      siteMetadata: { title, position },
    },
  } = useStaticQuery(graphql`
    query MySiteMetadata {
      site {
        siteMetadata {
          title
          position
        }
      }
    }
  `)

  return (
    <S.LogoWrapper>
      <S.LogoLink
        to="/"
        cover
        direction="left"
        bg={getThemeColor()}
        duration={0.6}
      >
        <LogoImage />
        <S.LogoName>
          {title}
          <S.LogoAlthor>{position}</S.LogoAlthor>
        </S.LogoName>
      </S.LogoLink>
    </S.LogoWrapper>
  )
}

export default Logo
