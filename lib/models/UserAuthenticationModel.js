import mongoose from "mongoose";

const userAuthenticationSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required."],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, "Email is invalid"],
  },
  // username: {
  //     type: String,
  //     required: [true, 'Username is required'],
  //     minlength: [3, 'Username must be at least 3 characters long'],
  //     maxlength: [50, 'Username cannot exceed 50 characters'],
  //     trim: true
  // },
  // password: {
  //     type: String,
  //     required: [true, 'Password is required'],
  //     minlength: [6, 'Password must be at least 6 characters long'],
  //     validate: {
  //         validator: function (value) {
  //             // Regex for at least one letter, one number, and one special character
  //             return /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;"'<>,.?~`|\\/-]).{6,}$/.test(value);
  //         },
  //         message: 'Password must contain at least one letter, one number, and one special character.'
  //     }
  // },

  username: {
    type: String,
    minlength: [3, "Username must be at least 3 characters long"],
    maxlength: [50, "Username cannot exceed 50 characters"],
    trim: true,
    required: function () {
      return !this.auth.google.id; // Only required if not using Google OAuth
    },
  },
  password: {
    type: String,
    minlength: [6, "Password must be at least 6 characters long"],
    validate: {
      validator: function (value) {
        return (
          !this.auth.google.id ||
          /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;"'<>,.?~`|\\/-]).{6,}$/.test(
            value
          )
        );
      },
      message:
        "Password must contain at least one letter, one number, and one special character.",
    },
    required: function () {
      return !this.auth.google.id; // Only required if not using Google OAuth
    },
  },
  auth: {
    google: {
      id: {
        type: String,
        unique: true,
        sparse: true, // Allows for null values
      },
      email: {
        type: String,
        match: [/\S+@\S+\.\S+/, "Google email is invalid"],
        sparse: true, // Allows for null values
      },
      image: {
        type: String,
        required: false,
      },
    },
    emailRegister: {
      id: {
        type: String,
        unique: true,
        sparse: true,
      },
      username: {
        type: String,
        sparse: true,
      },
      image: {
        type: String,
        required: false,
      },
    },
  },
});

const userAuthenticationModel =
  mongoose.models.UserAuthentication ||
  mongoose.model("UserAuthentication", userAuthenticationSchema);
export default userAuthenticationModel;
