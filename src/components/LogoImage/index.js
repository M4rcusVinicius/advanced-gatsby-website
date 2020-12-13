import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import * as S from "./styled"

const LogoImage = () => {
  const { logoImage } = useStaticQuery(
    graphql`
      query {
        logoImage: file(relativePath: { eq: "logo.png" }) {
          childImageSharp {
            fluid(maxWidth: 300) {
              ...GatsbyImageSharpFluid_tracedSVG
            }
          }
        }
      }
    `
  )

  return <S.LogoWrapper fluid={logoImage.childImageSharp.fluid} />
}

export default LogoImage
