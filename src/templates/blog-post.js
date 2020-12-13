import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/Layout"
import SEO from "../components/seo"
import RecommendedPosts from "../components/RecommendedPosts"
import Comments from "../components/Comments"
import Althor from "../components/Author"

import * as S from "../components/Post/styled"

const BlogPost = ({ data, pageContext }) => {
  const post = data.markdownRemark
  const next = pageContext.nextPost
  const previous = pageContext.previousPost
  let featuredImgFluid = post.frontmatter.featuredImage.childImageSharp.fluid

  return (
    <Layout>
      <SEO title={post.frontmatter.title} />
        <S.PostHeader>
          <S.PostTitle>{post.frontmatter.title}</S.PostTitle>
          <S.PostDate>
            {post.frontmatter.date}   •   {post.timeToRead} min de leitura
          </S.PostDate>
        </S.PostHeader>
      <S.Container>
        <S.MainContent>
          <S.PostBanner fluid={featuredImgFluid} />
          <S.PostDescription>{post.frontmatter.description}</S.PostDescription>
          <div dangerouslySetInnerHTML={{ __html: post.html }}></div>
        </S.MainContent>
        <div>
          <Althor name={post.frontmatter.author} />
        </div>
      </S.Container>
        <RecommendedPosts next={next} previous={previous} />
        <Comments url={post.fields.slug} title={post.frontmatter.title} />
    </Layout>
  )
}

export const query = graphql`
  query Post($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
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
        author
        title
        description
        date(locale: "pt-br", formatString: "DD [de] MMMM [de] YYYY")
      }
      html
      timeToRead
    }
  }
`

export default BlogPost
