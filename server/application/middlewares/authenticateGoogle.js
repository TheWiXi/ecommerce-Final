const passport = require('passport'); // Importa el módulo de passport
const GoogleStrategy = require('passport-google-oauth20').Strategy; // Importa la estrategia de Google
const { config } = require('dotenv'); // Importa la configuración de variables de entorno

config(); // Carga las variables de entorno desde .env

// Configura Passport para usar la estrategia de Google
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID, // ID del cliente de Google
      clientSecret: process.env.GOOGLE_CLIENT_SECRET, // Secreto del cliente de Google
      callbackURL: "http://localhost:3000/users/auth/google/callback", // URL de callback tras autenticación
      scope: ['profile', 'email'] // Alcance para acceder al perfil y correo del usuario
    },
    async function (accessToken, refreshToken, profile, done) { // Función que se llama después de la autenticación
        try {
            const email = profile.emails[0].value; // Obtiene el correo del perfil de Google
            
            // Verifica si el correo ya existe en la base de datos
            const response = await fetch('http://localhost:3000/users/verifyEmail', {
              method: 'POST', // Método de la solicitud
              headers: {
                'Content-Type': 'application/json', // Tipo de contenido de la solicitud
              },
              body: JSON.stringify({ correo: email }),  // Cuerpo de la solicitud con el correo
            });
    
            const data = await response.json(); // Convierte la respuesta a JSON
            if (data && data.correo) { // Si el correo ya existe
              return done(null, data); // Devuelve el usuario existente
            } else {
              // Si el usuario no existe, crea un nuevo objeto de usuario
              const newUser = {
                nombre: profile.displayName, // Nombre del usuario
                correo: email, // Correo del usuario
                contraseña: process.env.KEY_SECRET, // Contraseña (secreto)
                fotoPerfil: profile.photos[0].value, // Foto de perfil
                tipo: 'comprador' // Tipo de usuario
              };

              // Crea un nuevo usuario en la base de datos
              const createResponse = await fetch('http://localhost:3000/users/', {
                method: 'POST', // Método de la solicitud
                headers: {
                  'Content-Type': 'application/json', // Tipo de contenido de la solicitud
                },
                body: JSON.stringify(newUser), // Cuerpo de la solicitud con el nuevo usuario
              });

              const createdUser = await createResponse.json(); // Convierte la respuesta a JSON
              if (createResponse.ok) { // Si la creación del usuario fue exitosa
                return done(null, createdUser); // Devuelve el usuario creado
              } else {
                return done(null, false, { message: 'Error al crear el usuario.' }); // Devuelve un mensaje de error
              }
            }
        } catch (error) {
            return done(error); // Devuelve un error si ocurre
        }
    }
  )
);

// Serializa el usuario para la sesión
passport.serializeUser((user, done) => {
    done(null, user); // Almacena el usuario en la sesión
});

// Deserializa el usuario de la sesión
passport.deserializeUser((obj, done) => {
    done(null, obj); // Recupera el usuario de la sesión
});

module.exports = passport; // Exporta el módulo de passport
