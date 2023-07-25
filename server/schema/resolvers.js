import sendEmailToUser from "../config/emailConfig.js";
import Plant from "../models/Plant.js";
import User from "../models/User.js";
import Plantnote from "../models/Plantnote.js";
import { signToken } from "../utils/auth.js";
import jwt from "jsonwebtoken";

const resolvers = {
  Query: {
    me: async (_, __, { token }) => {
      if (token) {
        const validToken = await jwt.verify(token, "mysecretsshhhhh");
        const user = await User.findById(validToken._id).populate("plants");
        return user;
      }
    },
    // Query for a single user
    user: async (parent, { id }) => {
      try {
        const user = await User.findById(id).populate("plants");
        return user;
      } catch (error) {
        throw new Error("Failed to fetch user");
      }
    },
    // Query for all users
    users: async () => {
      try {
        const users = await User.find({})
          .populate("plants")
          .populate("plantsWithNotis");
        return users;
      } catch (error) {
        throw new Error("Failed to fetch users");
      }
    },
    // Query for a single plant
    plant: async (parent, { id }) => {
      try {
        const plant = await Plant.findById(id);
        return plant;
      } catch (error) {
        throw new Error("Failed to fetch plant");
      }
    },
    // Query for all plants
    plants: async (parent, { user_id }) => {
      try {
        const user = await User.findById(user_id).populate("plants");
        return user;
      } catch (error) {
        throw new Error("Failed to fetch plants");
      }
    },

    // Query for a single plantnote
    plantNote: async (parent, { id, noteId }) => {
      try {
        const plant = await Plant.findById(id);

        if (!plant) {
          throw new Error("Plant not found");
        }

        const plantNote = plant.plantNotes.find(
          (plantNote) => plantNote.noteId === noteId
        );

        if (!plantNote) {
          throw new Error("Plant note not found");
        }

        return plantNote;
      } catch (error) {
        throw new Error("Failed to fetch plantnote");
      }
    },

    // Query for all plantnotes
    plantNotes: async (parent, { id }) => {
      try {
        const plant = await Plant.findById(id);

        if (!plant) {
          throw new Error("Plant not found");
        }

        const plantNotes = plant.plantNotes;
        return plantNotes;
      } catch (error) {
        throw new Error("Failed to fetch plantnotes");
      }
    },
  },

  Mutation: {
    // Mutation to create a new user
    createUser: async (parent, { username, email, password }) => {
      console.error({ username, email, password, User });
      try {
        const user = await User.create({
          username: username,
          email: email,
          password: password,
        });
        const response = await sendEmailToUser(user.email);
        const token = signToken(user); // Generate token using user

        return { token, user, response };
      } catch (error) {
        console.error(error.message);
        throw new Error("Failed to create user");
      }
    },
    // Mutation to update a user
    updateUser: async (parent, { id, username, email }) => {
      try {
        const user = await User.findByIdAndUpdate(
          id,
          {
            username: username,
            email: email,
          },
          { new: true }
        ).populate("plants");

        const token = signToken(user); // Generate token using updated user
        return { token, user };
      } catch (error) {
        console.error(error.message);
        throw new Error("Failed to update user");
      }
    },
    // Mutation to login a user
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email }).populate("plants");

      if (!user) {
        throw new Error("No user found with this email address");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new Error("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },

    // Mutation to change user password
    changePassword: async (parent, { id, currentPassword, newPassword }) => {
      try {
        const user = await User.findById(id);

        if (!user) {
          throw new Error("User not found");
        }

        const correctPw = await user.isCorrectPassword(currentPassword);

        if (!correctPw) {
          throw new Error("Incorrect current password");
        }

        user.password = newPassword;
        await user.save();

        return user;
      } catch (error) {
        console.error(error.message);
        throw new Error("Failed to change password");
      }
    },

    // Mutation to add a plant to a user's plants
    addPlant: async (
      parent,
      { latinName, commonName, img, idealLight, watering, username }
    ) => {
      try {
        const plant = await Plant.create({
          latinName,
          commonName,
          img,
          idealLight,
          watering,
          username,
          notification: false,
        });

        // Add the plant to the associated user's plants array
        return User.findOneAndUpdate(
          { username: username },
          { $addToSet: { plants: plant._id } },
          { new: true }
        )
          .populate("plants")
          .populate("plantsWithNotis");
      } catch (error) {
        console.error(error.message);
        throw new Error("Failed to add plant");
      }
    },

    // Mutation to add a plant note to a user's plant
    addPlantNoteToPlant: async (parent, { id, note, username }) => {
      try {
        // Find the associated plant
        const plant = await Plant.findById(id);
        if (!plant) {
          throw new Error("Plant not found");
        }

        const plantNote = { note, username };
        plant.plantNotes.push(plantNote);

        const updatedPlant = await plant.save();

        return updatedPlant;
      } catch (error) {
        console.error(error.message);
        throw new Error("Failed to add plant note");
      }
    },

    // mutation to delete plant from user's plants
    deletePlant: async (parent, { id }) => {
      try {
        //  find the plant to be deleted
        const plant = await Plant.findById(id);
        if (!plant) {
          throw new Error("Plant not found");
        }

        // delete the plant from the database
        await Plant.findByIdAndDelete(id);

        // find the associated user
        return User.findOneAndUpdate(
          { username: plant.username },
          { $pull: { plants: { _id: id } } },
          { new: true }
        )
          .populate("plants")
          .populate("plantsWithNotis");
      } catch (error) {
        console.error(error.message);
        throw new Error("Failed to delete plant");
      }
    },

    // mutation to delete plant note from user's plant notes
    deletePlantNote: async (parent, { id, noteId }) => {
      try {
        // Find the associated Plant and pull the note from the plantNotes array
        const plant = await Plant.findByIdAndUpdate(
          id,
          { $pull: { plantNotes: { noteId: noteId } } },
          { new: true }
        );
        if (!plant) {
          throw new Error("Plant not found");
        }

        // Return the updated plant
        return plant;
      } catch (error) {
        console.error(error.message);
        throw new Error("Failed to delete plant note");
      }
    },

    // mutation to update plant image
    updatePlant: async (parent, { id, img }) => {
      try {
        // Find the plant to be updated
        const plant = await Plant.findById(id);

        if (!plant) {
          throw new Error("Plant not found");
        }

        // Update the plant's image
        plant.img = img;
        await plant.save();
        console.error(plant);
        return plant;
      } catch (error) {
        console.error(error.message);
        throw new Error("Failed to update plant");
      }
    },
    // mutation to update plant note
    updatePlantNote: async (parent, { id, noteId, note }) => {
      try {
        // Find the associated Plant and update the note
        const plant = await Plant.findOneAndUpdate(
          { _id: id, "plantNotes.noteId": noteId },
          { $set: { "plantNotes.$.note": note } },
          { new: true }
        );
        if (!plant) {
          throw new Error("Plant not found");
        }

        // Return the updated plant
        return plant;
      } catch (error) {
        console.error(error.message);
        throw new Error("Failed to update plant note");
      }
    },

    // mutation to set plant notification
    setPlantNotifications: async (parent, { username, id }) => {
      try {
        const user = await User.findOneAndUpdate(
          { username: username },
          { $addToSet: { plantsWithNotis: id } },
          { new: true }
        )
          .populate("plants")
          .populate("plantsWithNotis");
        return user;
      } catch (error) {
        console.error(error.message);
        throw new Error("Failed to set plant notifications");
      }
    },

    // mutation to set plant notification back to false
    setPlantNotificationsFalse: async (parent, { username, id }) => {
      try {
        const user = await User.findOneAndUpdate(
          { username: username },
          { $pull: { plantsWithNotis: id } },
          { new: true }
        )
          .populate("plants")
          .populate("plantsWithNotis");
        return user;
      } catch (error) {
        console.error(error.message);
        throw new Error("Failed to set plant notifications");
      }
    },
  },
};

export default resolvers;
