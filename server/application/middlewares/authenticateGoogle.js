const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { config } = require('dotenv');

config(); 

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/users/auth/google/callback",
      scope: ['profile', 'email']
    },
    async function (accessToken, refreshToken, profile, done) {
        console.log("Perfil recibido de Google:", profile);
        try {
            const email = profile.emails[0].value;
    
            const response = await fetch('http://localhost:3000/users/verifyEmail', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ correo: email }),  
            });
    
            const data = await response.json(); 
            if (data && data.correo) {
              return done(null, data);
            } else {
              return done(null, false, { message: 'El correo no está registrado.' });
            }
        } catch (error) {
            return done(error);
        }
    }
  )
);

// Serializa el usuario para la sesión
passport.serializeUser((user, done) => {
    done(null, user);
});

// Deserializa el usuario de la sesión
passport.deserializeUser((obj, done) => {
    done(null, obj);
});

module.exports = passport;