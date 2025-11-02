import dotenv from "dotenv";
dotenv.config();

import passport from "passport";
import userService from "../services/userService.js";
import GoogleStrategy from "passport-google-oauth20";

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await userService.getUserById(id);
    if (!user) throw new Error("User not found!");
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

export default passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let existingUser = await userService.getUserByGoogleId(profile.id);
        if (existingUser) {
          return done(null, existingUser);
        } else {
          const newUser = await userService.createGoogleUser({
            name: profile._json.name,
            email: profile._json.email,
            googleId: profile.id,
          });
          return done(null, newUser);
        }
      } catch (err) {
        return done(err, null);
      }
    }
  )
);
