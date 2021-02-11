import { Users } from "../models/";
import { success, error } from '../network/response'
import bcryptjs from "bcryptjs";
import { generateJWT, validateJWT } from "../middlewares/jwt";

export const defaultt = async (req, res) => {
  res.send('Server Run successfully')
}

// - responder con el token jwt (token) 
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ where: { email: email } });
    const valid = bcryptjs.compareSync(password, user.password);
    if (user && valid) {
      const token = generateJWT(user);
      return success(req, res, 200, {
        message: "Has iniciado sesión correctamente",
        token
      });
    }
    return error(req, res, 'Credenciales incorrectas', 401, "Las credenciales son incorrectas")
  } catch (e) { error(req, res, e, 400) }
}

export const signIn = (req, res) => {
  const pass = req.body.password;
  bcryptjs.genSalt(10, (err, salt) => {
    if (err) {
      console.log('Err en genSalt', err);
      return !1
    }
    return bcryptjs.hash(pass, salt, (err, hash) => {
      if (err) {
        console.log('Err en hash', err);
        return !1
      }
      req.body.password = hash;
      Users.create(req.body)
        .then(userCreated => success(req, res, 201, userCreated))
        .catch(e => error(req, res, e, 400))
      return !0
    })
  })
}

export const users = (req, res) => {
  const decoded = validateJWT(req, res)
  if (decoded) {
    Users.findAll()
      .then(users => success(req, res, 201, users))
      .catch(e => error(req, res, e, 401))
  } else {
    console.log('[response error] => No decode in users');
  }
}

export const user = (req, res) => {
  const id = req.params.id
  const decoded = validateJWT(req, res)
  if (Number(id) === decoded.id) {
    Users.findByPk(id)
      .then(user => success(req, res, 201, user))
      .catch(e => error(req, res, e, 401))
  } else {
    console.log('[response error] => No decode in user');
  }
}



