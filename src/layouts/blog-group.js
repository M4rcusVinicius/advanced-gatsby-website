import React from "react"
import kebabCase from "lodash.kebabcase"
import { graphql } from "gatsby"
import { Row, Cell } from "griding"

import { Container } from "../components/grid"
import * as S from "../components/styles.css"
import Layout from "../components/layout"
import Seo from "../components/seo"
import Pagination from "../components/pagination"
import renderList from "../components/renderList"

const BlogAuhor = ({ data, pageContext }) => {
  const { allMarkdownRemark } = data
  const { currentPage, numPages, group, allGroups } = pageContext

  return (
    <Layout>
      <Seo title={group} />

      <Container>
        <Row>
          <Cell xs={12}>
            <S.HeaderSectionTitle>Groups:</S.HeaderSectionTitle>
            <S.HeaderSectionList>
              {allGroups.map((cat) => (
                <S.HeaderSectionLink to={`/blog/group/${kebabCase(cat)}`}>
                  {cat}
                </S.HeaderSectionLink>
              ))}
            </S.HeaderSectionList>
          </Cell>

          {allMarkdownRemark.edges.map(renderList)}
        </Row>

        <Pagination
          currentPage={currentPage}
          numPages={numPages}
          contextPage={`group/${kebabCase(group)}`}
        />
      </Container>
    </Layout>
  )
}

export default BlogAuhor

export const query = graphql`
  query blogPostsListByGroup($group: String, $skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { group: { in: [$group] } } }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            date
            author
            group
            category
            image {
              childImageSharp {
                fluid {
                  src
                }
              }
            }
          }
        }
      }
    }
  }
`
