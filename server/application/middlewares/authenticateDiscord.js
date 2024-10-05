const passport = require('passport');
const DiscordStrategy = require('passport-discord').Strategy;
const { config } = require('dotenv');
config(); 

passport.use(
    new DiscordStrategy({
    clientID: process.env.DISCORD_CLIENT_ID,
    clientSecret: process.env.DISCORD_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/users/auth/discord/callback',
    scope: ['identify', 'email']
},
async function(accessToken, refreshToken, profile, done) {
    try {
        console.log(profile)
        const email = profile.email;

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
            nombre: profile.username,
            correo: email,
            contraseña: process.env.KEY_SECRET,
            fotoPerfil: profile.avatar,
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
            return done(null, createdUser);
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