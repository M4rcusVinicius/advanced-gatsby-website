import styled from "styled-components"
import {Link} from 'gatsby'

export const SidebarWrapper = styled.aside`
  box-shadow: 0px 1px 10px var(--borders);
  background: var(--background);
  display: flex;
  height: auto;
  padding: 1rem 2rem;
  text-align: center;
  width: 100%;
  align-items: center;
  justify-content: space-around;
`

export const SidebarSearchLink = styled(Link)`
  display: block;
  background-color: var(--mediumBackground);
  border-radius: 0.4rem;
  padding: 0.8rem;
  text-decoration: none;
  font-size: 1.2rem;
  width: 20rem;

  &.active {
  }
`