import jwt from "jsonwebtoken";
import { error } from "../network/response"

//Completar la funcion para generar un token JWT en base al usuario que ha iniciado sesion
export const generateJWT = (user) => {
  const userObj = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email
  };
  const token = jwt.sign(userObj, process.env.SECRET_KEY, { algorithm: "HS384", expiresIn: "1h" });
  return token;
}

//Validar el token 
export const validateJWT = (req, res) => {
  const bearerToken = req.headers['authorization']
  if (!bearerToken) {
    error(req, res, 'no toquen', 403, 'No token provided')
  }
  console.log('bearerToken', bearerToken);
  const token = bearerToken.split(' ')[1]
  console.log('token', token);
  const decoded = jwt.verify(token, process.env.SECRET_KEY, (err, decodif) => {
    if (err) {
      error(req, res, err, 401, 'in jwt')
      return false
    }
    return decodif
  })
  return decoded
}