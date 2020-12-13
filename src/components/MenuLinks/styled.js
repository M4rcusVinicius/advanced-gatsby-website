import styled from "styled-components"
import media from "styled-media-query"
import { Link } from 'gatsby'

export const MenuLinksWrapper = styled.nav`
`

export const MenuLinksList = styled.ul`
  font-size: 1.2rem;
  font-weight: 500;
  display: flex;
  justify-content: space-around;
`

export const MenuLinksItem = styled.li`
  padding: 0 0.8rem;

  .active {
    color: var(--highlight);
  }
`

export const MenuLinksLink = styled(Link)`
  color: var(--texts);
  text-decoration: none;
  transition: color 0.2s;

  &:hover {
    color: var(--highlight);
  }
`
