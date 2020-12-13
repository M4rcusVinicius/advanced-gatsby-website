const path = require("path")
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === "MarkdownRemark") {
    const slug = createFilePath({
      node,
      getNode,
      basePath: "pages",
    })
    createNodeField({
      node,
      name: "slug",
      value: `/${slug.slice(12)}`,
    })
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return graphql(`
    {
      allMarkdownRemark(sort: { fields: frontmatter___date, order: DESC }) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              category
              date(locale: "pt-br", formatString: "DD [de] MMMM [de] YYYY")
              description
              title
            }
            timeToRead
          }
          next {
            frontmatter {
              title
            }
            fields {
              slug
            }
          }
          previous {
            fields {
              slug
            }
            frontmatter {
              title
            }
          }
        }
      }
      categoryGroup: allMarkdownRemark {
        group(field: frontmatter___category) {
          tag: fieldValue
          totalCount
        }
      }
    }
  `).then(result => {
    const posts = result.data.allMarkdownRemark.edges

    posts.forEach(({ node, next, previous }) => {
      createPage({
        path: node.fields.slug,
        component: path.resolve(`./src/templates/blog-post.js`),
        context: {
          slug: node.fields.slug,
          previousPost: next,
          nextPost: previous,
        },
      })
    })

    const postsPerPage = 9
    const numPages = Math.ceil(posts.length / postsPerPage)
    const categories = result.data.categoryGroup.group

    Array.from({ length: numPages }).forEach((_, index) => {
      createPage({
        path: index === 0 ? `/` : `/page/${index + 1}`,
        component: path.resolve(`./src/templates/blog-list.js`),
        context: {
          limit: postsPerPage,
          skip: index * postsPerPage,
          numPages: numPages,
          currentPage: index + 1,
        },
      })
    })  
    
    const numTrabalhos = categories.find(x => x.tag === 'trabalho').totalCount
    const numPagesTrabalhos = Math.ceil(numTrabalhos / postsPerPage)

    Array.from({ length: numPagesTrabalhos }).forEach((_, index) => {
      createPage({
        path: index === 0 ? `/trabalho/` : `/trabalho/page/${index + 1}`,
        component: path.resolve(`./src/templates/blog-category.js`),
        context: {
          limit: postsPerPage,
          skip: index * postsPerPage,
          numPages: numPagesTrabalhos,
          currentPage: index + 1,
          category: 'trabalho'
        },
      })
    })  

    const numResumos = categories.find(x => x.tag === 'resumo').totalCount
    const numPagesResumos = Math.ceil(numResumos / postsPerPage)

    Array.from({ length: numPagesResumos }).forEach((_, index) => {
      createPage({
        path: index === 0 ? `/resumo/` : `/resumo/page/${index + 1}`,
        component: path.resolve(`./src/templates/blog-category.js`),
        context: {
          limit: postsPerPage,
          skip: index * postsPerPage,
          numPages: numPagesResumos,
          currentPage: index + 1,
          category: 'resumo'
        },
      })
    })  
  })
}
