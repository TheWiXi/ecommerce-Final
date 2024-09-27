const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const { config } = require('dotenv');

config(); 

passport.use(
  new GitHubStrategy(
    {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/users/auth/github/callback",
        scope: ['user:email']
  },
  async function (accessToken, refreshToken, profile, done) {
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
          const newUser = {
            nombre: profile.displayName,
            correo: email,
            contraseña: process.env.KEY_SECRET,
            fotoPerfil: profile.photos[0].value,
            direccion: profile.location,
            tipo: 'comprador'
          };

          const createResponse = await fetch('http://localhost:3000/users/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser),
          });

          const createdUser = await createResponse.json();
          if (createResponse.ok) {
            return done(null, profile);
          } else {
            return done(null, false, { message: 'Error al crear el usuario.' });
          }
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
