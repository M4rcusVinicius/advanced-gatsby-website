import React from "react"
import PropTypes from "prop-types"

import getThemeColor from "../../utils/getThemeColor"

import * as S from "./styled"

const PostItem = ({
  featuredImgFluid,
  slug,
  category,
  date,
  timeToRead,
  title,
  description,
}) => {

  return (
  <S.PostItemLink
    to={slug}
    cover
    direction="right"
    bg={getThemeColor()}
    duration={0.6}
  >
    <S.PostItemWrapper>
      <S.PostItemBannerDiv>
        <S.PostItemBanner fluid={featuredImgFluid} />
      </S.PostItemBannerDiv>
      <S.PostItemInfo>
        <S.PostItemTitle>{title}</S.PostItemTitle>
        <S.PostItemDate>
          {category} • {date} • {timeToRead} min de leitura
        </S.PostItemDate>
        <S.PostItemDescription>{description}</S.PostItemDescription>
      </S.PostItemInfo>
    </S.PostItemWrapper>
  </S.PostItemLink>
)}

PostItem.propTypes = {
  featuredImgFluid: PropTypes.string,
  slug: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  timeToRead: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
}

export default PostItem
