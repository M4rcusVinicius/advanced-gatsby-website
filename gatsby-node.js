const { createFilePath } = require(`gatsby-source-filesystem`)
const path = require(`path`)
const kebabCase = require(`lodash.kebabcase`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const blogLayout = path.resolve(`./src/layouts/blog-post.js`)
  const blogListLayout = path.resolve(`./src/layouts/blog-list.js`)
  const blogCategoryLayout = path.resolve(`./src/layouts/blog-category.js`)
  const blogAuthorLayout = path.resolve(`./src/layouts/blog-author.js`)
  const blogGroupLayout = path.resolve(`./src/layouts/blog-group.js`)

  return graphql(`
    query blogPosts {
      allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
              date
              author
              category
              featured
              group
              image {
                childImageSharp {
                  fluid {
                    src
                  }
                }
              }
            }
            html
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      console.error(result.errors)
      reject(result.errors)
    }

    const posts = result.data.allMarkdownRemark.edges
    const postsPerPage = 3
    const postsWithoutFeatured = posts.filter(({ node }) => {
      return !node.frontmatter.featured
    })
    const numPages = Math.ceil(postsWithoutFeatured.length / postsPerPage)
    const categories = []
    const groups = []
    const authors = []

    // Creating blog list with pagination
    Array.from({ length: numPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? `/blog` : `/blog/page/${i + 1}`,
        component: blogListLayout,
        context: {
          limit: postsPerPage,
          skip: i * postsPerPage,
          currentPage: i + 1,
          numPages,
        },
      })
    })

    // Creating blog posts
    posts.forEach((post, index, arr) => {
      post.node.frontmatter.category.forEach(cat => categories.push(cat))
      authors.push(post.node.frontmatter.author)
      groups.push(post.node.frontmatter.group)

      const prev = arr[index - 1]
      const next = arr[index + 1]

      createPage({
        path: post.node.fields.slug,
        component: blogLayout,
        context: {
          slug: post.node.fields.slug,
          prev: prev,
          next: next,
        },
      })
    })

    // Creating category page
    const countCategories = categories.reduce((prev, curr) => {
      prev[curr] = (prev[curr] || 0) + 1
      return prev
    }, {})
    const allCategories = Object.keys(countCategories)

    allCategories.forEach((cat, i) => {
      const link = `/blog/category/${kebabCase(cat)}`

      Array.from({
        length: Math.ceil(countCategories[cat] / postsPerPage),
      }).forEach((_, i) => {
        createPage({
          path: i === 0 ? link : `${link}/page/${i + 1}`,
          component: blogCategoryLayout,
          context: {
            allCategories: allCategories,
            category: cat,
            limit: postsPerPage,
            skip: i * postsPerPage,
            currentPage: i + 1,
            numPages: Math.ceil(countCategories[cat] / postsPerPage),
          },
        })
      })
    })

    // Creating author page
    const countAuthor = authors.reduce((prev, curr) => {
      prev[curr] = (prev[curr] || 0) + 1
      return prev
    }, {})
    const allAuthors = Object.keys(countAuthor)

    allAuthors.forEach((aut, i) => {
      const link = `/blog/author/${kebabCase(aut)}`

      Array.from({
        length: Math.ceil(countAuthor[aut] / postsPerPage),
      }).forEach((_, i) => {
        createPage({
          path: i === 0 ? link : `${link}/page/${i + 1}`,
          component: blogAuthorLayout,
          context: {
            allAuthors: allAuthors,
            author: aut,
            limit: postsPerPage,
            skip: i * postsPerPage,
            currentPage: i + 1,
            numPages: Math.ceil(countAuthor[aut] / postsPerPage),
          },
        })
      })
    })

    // Creating group page
    const countGroup = groups.reduce((prev, curr) => {
      prev[curr] = (prev[curr] || 0) + 1
      return prev
    }, {})
    const allGroups = Object.keys(countGroup)

    allGroups.forEach((aut, i) => {
      const link = `/blog/group/${kebabCase(aut)}`

      Array.from({
        length: Math.ceil(countGroup[aut] / postsPerPage),
      }).forEach((_, i) => {
        createPage({
          path: i === 0 ? link : `${link}/page/${i + 1}`,
          component: blogGroupLayout,
          context: {
            allGroups: allGroups,
            group: aut,
            limit: postsPerPage,
            skip: i * postsPerPage,
            currentPage: i + 1,
            numPages: Math.ceil(countGroup[aut] / postsPerPage),
          },
        })
      })
    })
  })
}

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  // Ensures we are processing only markdown files
  if (node.internal.type === "MarkdownRemark") {
    // Use `createFilePath` to turn markdown files in our `data/faqs` directory into `/faqs/slug`
    const slug = createFilePath({
      node,
      getNode,
      basePath: "pages",
    })

    // Creates new query'able field with name of 'slug'
    createNodeField({
      node,
      name: "slug",
      value: `/${slug}`,
    })
  }
}

