import styled from "styled-components"
import media from "styled-media-query"
import { Link } from 'gatsby'
import Img from "gatsby-image"

export const PostItemLink = styled(Link)`
  color: var(--texts);
  display: flex;
  text-decoration: none;

  body#grid & {
  }

  &:hover {
    color: var(--highlight);
  }
`

export const PostItemWrapper = styled.section`
  align-items: center;
  border-radius: 15px;
  display: flex;
  margin: 0.8em 0;
  width: 100%;
  box-shadow: var(--borders) 1px 1px 5px 0px;
  background-color: var(--background);

  body#grid & {
    margin: 0;
    flex-direction: column;
    justify-content: top;
    max-width: 400px;
  }
`

export const PostItemBanner = styled(Img)`
  border-radius: 25px 0 0 25px;
  min-height: 12rem;
  min-width: 12rem;

  body#grid & {
    height: 100%;
    width: 100%;
    border-radius: 15px;
  }
`

export const PostItemBannerDiv = styled.div`

  body#grid & {
    height: 15rem;
    width: 100%;
    padding: 0.4rem;
  }
`

export const PostItemInfo = styled.div`
  padding: 1.5rem 2.4rem 1.5rem 1.5rem; 
  display: flex;
  flex-direction: column;
  margin-left: 1.5rem;

  body#grid & {
    margin: 0;
    padding: 2rem; 
  }
`

export const PostItemDate = styled.time`
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--lightText);
  margin: 0 0 1rem;
`

export const PostItemTitle = styled.h1`
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--title);
  margin: 0 0 0.6rem;

  body#grid & {
    line-height: 1.1;
    font-size: 1.3rem;
    margin: 0.8rem 0;
  }
`

export const PostItemDescription = styled.p`
  font-size: 1.1rem;
  font-weight: 300;
  line-height: 1.2;
  overflow: hidden; // Removendo barra de rolagem
  text-overflow: ellipsis; // Adicionando "..." ao final
  display: -webkit-box;
  -webkit-line-clamp: 4; // Quantidade de linhas
  -webkit-box-orient: vertical; 
`
