import styled from "styled-components"
import { Link } from 'gatsby'

export const LogoWrapper = styled.section`
  color: var(--texts);
  display: flex;
  flex-direction: column;
  padding: 0.3rem 0;
`

export const LogoLink = styled(Link)`
  color: var(--texts);
  text-decoration: none;
  transition: color 0.5s;
  display: flex;
  text-align: left;
  align-items: center;
  width: 100%;

  &:hover {
    color: var(--highlight);
  }
`

export const LogoName = styled.h1`
  font-size: 1.2rem;
  margin: 0 0 0 15px; 
  font-weight: 600; 

`

export const LogoAlthor = styled.small`
  display: block;
  font-weight: 300;
  font-size: 0.8rem;
  margin-top: 0.2rem;
`