// creat our typeDefs for our schema and export them
const typeDefs = `
  type User {
    _id: ID!
    username: String!
    email: String!
    plants: [Plant]
    plantsWithNotis: [Plant]
  }

  type Plant {
    _id: ID!
    latinName: String!
    commonName: String!
    img: String!
    idealLight: String!
    watering: String!
    username: String!
    plantNotes: [Plantnote]
  }

  type Plantnote {
    noteId: String!
    note: String!
    username: String!
    createdAt: String
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    users: [User]
    user(id: ID!): User
    plants: User!
    plant(id: ID!): Plant!
    plantNotes(id: ID!): [Plantnote]
    plantNote(id: ID!, noteId: String!): Plantnote!
    me: User
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): Auth
    updateUser(id: ID, username: String, email: String): Auth
    changePassword(id: ID!, currentPassword: String!, newPassword: String!): User!
    login(email: String!, password: String!): Auth
    addPlant(latinName: String!, commonName: String!, img: String!, idealLight: String!, watering: String!, username: String!): User!
    updatePlant(id: ID!, img: String!) : Plant!
    deletePlant(id: ID!): User!
    addPlantNoteToPlant(id: ID! note: String!, username: String!): Plant!
    deletePlantNote(id: ID! noteId: String!): Plant!
    updatePlantNote(id: ID!, noteId: String!, note: String!,): Plant!
    setPlantNotifications(id: ID!, username: String!): User!
    setPlantNotificationsFalse(id: ID!, username: String!): User!
  }
`;

export default typeDefs;
