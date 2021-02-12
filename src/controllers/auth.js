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
      return res.status(200).json({
        message: "Has iniciado sesión correctamente",
        token
      })
    }
    return error(req, res, 'Credenciales incorrectas', 401, "Las credenciales son incorrectas")
  } catch (e) { error(req, res, e, 400) }
}

export const signIn = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  const user = await Users.findOne({ where: { email: email } });
  let thereIsUser = false
  let thereIsemail = false
  let thereIspassword = false
  let thereIsfirstName = false
  let thereIslastName = false

  user ? thereIsUser = false : thereIsUser = true
  email ? thereIsemail = true : thereIsemail = false
  password ? thereIspassword = true : thereIspassword = false
  firstName ? thereIsfirstName = true : thereIsfirstName = false
  lastName ? thereIslastName = true : thereIslastName = false

  if (thereIsUser && thereIsemail && thereIspassword && thereIsfirstName && thereIslastName) {
    bcryptjs.genSalt(10, (err, salt) => {
      if (err) {
        console.log('Err en genSalt', err);
        return !1
      }
      return bcryptjs.hash(password, salt, (err, hash) => {
        if (err) {
          console.log('Err en hash', err);
          return !1
        }
        req.body.password = hash;
        Users.create(req.body)
          .then(userCreated => res.status(201).json(userCreated))
          .catch(e => error(req, res, e, 400))
        return !0
      })
    })
  } else {
    if (user) {
      error(req, res, 'This user already exists in the database', 400, 'This email has already been registered')
    } else {
      error(req, res, 'missing data', 400, 'missing data')
    }
  }
}

export const users = (req, res) => {
  const decoded = validateJWT(req, res)
  if (decoded) {
    Users.findAll()
      .then(users => res.status(200).json(users))
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
      .then(user => res.status(200).json(user))
      .catch(e => error(req, res, e, 401))
  } else {
    console.log('[response error] => No decode in user');
  }
}



