import mongoose from "mongoose";
import userModel from "./user.js"
import User from "./user.js";

// const User = User;

mongoose.set("debug", true);

mongoose
  .connect("mongodb://localhost:27017/users", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error));

function getUsers(name, job) {
  let promise;
  if (name === undefined && job === undefined) {
    promise = userModel.find();
  } else if (name && !job) {
    promise = findUserByName(name);
  } else if (job && !name) {
    promise = findUserByJob(job);
  }
  else if (job && name) {
    promise = findUserByNameAndJob(job);
  }
  return promise;
}

function findUserById(id) {
  return userModel.findById(id);
}

function addUser(user) {
  const userToAdd = new User(user);
  return userToAdd.save();
  // const promise = userToAdd.save();
  // return promise;
}

function findUserByName(name) {
  return userModel.find({ name: name });
}

function findUserByJob(job) {
  return userModel.find({ job: job });
}

function findUserByNameAndJob(name, job) {
  return userModel.find({  name: name, job: job });
}

function deleteUserById(id) {
  return userModel.findByIdAndDelete(id)
    .then((result) => {
      if (result) {
        console.log(`User with ID ${id} deleted successfully.`);
        return { success: true, message: "User deleted successfully." };
      } else {
        return { success: false, message: "User not found." };
      }
    })
    .catch((error) => {
      console.error(`Error deleting user with ID ${id}:`, error);
      return { success: false, message: "An error occurred while deleting the user.", error };
    });
}


export default {
  addUser,
  getUsers,
  findUserById,
  findUserByName,
  findUserByJob,
  findUserByNameAndJob,
  deleteUserById

};