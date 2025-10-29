import passport from "passport";
import { Strategy } from "passport-local";
import * as userService from "../services/userService.js";

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await userService.getUserById(id);
    if (!user) throw new Error("User not found!");
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

export default passport.use(
  new Strategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      const user = await userService.authenticateUser(email, password);
      try {
        if (!user) {
          throw new Error("Incorrect email or password!");
        }
        done(null, user);
      } catch (error) {
        done(error, null);
      }
    }
  )
);
