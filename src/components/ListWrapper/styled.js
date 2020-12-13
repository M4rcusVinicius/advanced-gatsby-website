import styled from "styled-components"

export const ListWrapper = styled.section`
  body#grid & {
    display: grid;
    grid-area: posts;
    grid-gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  }
`
