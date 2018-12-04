const { GraphQLServer } = require('graphql-yoga')

let links = [
  {
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL',
  },
]

let idCount = links.length

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => links,
    link: (root, args) => links.find(item => item.id === args.id),
  },
  Link: {
    id: root => root.id,
    description: root => root.description,
    url: root => root.url,
  },
  Mutation: {
    post: (root, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      }
      links.push(link)
      return link
    },
    updateLink: (root, args) => {
      const link = {
        id: `link-${args.id}`,
        description: args.description,
        url: args.url,
      }
      if (links[args.id]) {
        links[args.id] = link
      }
      return link
    },
    deleteLink: (root, args) => {
      const link = {
        id: `link-${args.id}`,
        description: links[args.id].description,
        url: links[args.id].url,
      }
      links = links.filter((_, index) => index !== args.id)
      return link
    },
  },
}

const server = new GraphQLServer({
  typeDefs: './schema.graphql',
  resolvers,
})

server.start(() => console.log(`Server is running on http://localhost:4000`))
