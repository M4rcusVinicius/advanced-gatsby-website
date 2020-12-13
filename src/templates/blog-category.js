import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/Layout"
import SEO from "../components/seo"
import PostItem from "../components/PostItem"
import Pagination from "../components/Pagination"

import * as S from "../components/ListWrapper/styled"

const CategoryList = props => {
  const postList = props.data.allMarkdownRemark.edges

  const {  currentPage, numPages, category } = props.pageContext
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPage = currentPage - 1 === 1 ? `/${category}/` : `/${category}/page/${currentPage - 1}`
  const nextPage = `/${category}/page/${currentPage + 1}`

  return (
    <Layout>
      <SEO title="Home" />
      <S.ListWrapper>
        {postList.map(
          ({
            node: {
              frontmatter: { category, date, description, title, featuredImage },
              timeToRead,
              fields: { slug },
            },
          }) => {
            let featuredImgFluid = featuredImage.childImageSharp.fluid
            return(
            <PostItem
              featuredImgFluid={featuredImgFluid}
              slug={slug}
              category={category}
              date={date}
              timeToRead={timeToRead}
              title={title}
              description={description}
              />
              )
            }
          )}
      </S.ListWrapper>

      <Pagination
        isFirst={isFirst}
        isLast={isLast}
        currentPage={currentPage}
        numPages={numPages}
        prevPage={prevPage}
        nextPage={nextPage}
      />
    </Layout>
  )
}

export const query = graphql`
  query CategoryList($category: String, $skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { fields: frontmatter___date, order: DESC }
      filter: {frontmatter: {category: {eq: $category }}}
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            featuredImage {
              childImageSharp {
                fluid(maxWidth: 800) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            category
            date(locale: "pt-br", formatString: "DD [de] MMMM [de] YYYY")
            description
            title
          }
          timeToRead
        }
      }
    }
  }
`

export default CategoryList
