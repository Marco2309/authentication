import { Users } from "../models/";
import { success, error } from '../network/response'

export const defaultt = async (req, res) => {
  res.send('Server Run successfully')
}
//1. Completar la logica para manejar el inicio de sesión
// - responder con un codigo de estado 401 cuando las credenciales sean incorrectas
// - responder con un mensaje (message) y codigo de estado 200 cuando las credenciales sean correctas
// - responder con el token jwt (token) 
export const login = async (req, res) => {
  try {
    
  } catch (error) { error(req, res, e, 400) }
}

//2. Completar el registro de usuario
// - responder con un codigo de estado fallido 400 > cuando hagan falta campos o cuando el usuario ya exista en la base de datos
// - responder con el objeto del usuario que ha sido creado y un codigo 201 cuando el registro sea satisfactorio
export const signIn = async (req, res) => {
  try {
    const userCreated = await Users.create(datos);
    success(req, res, 201, userCreated)
  } catch (e) { error(req, res, e, 400) }

}

export const users = async (req, res) => {
try {
  const userCreated = await Users.create(datos);
    success(req, res, 201, userCreated)
} catch (e) { error(req, res, e, 400) }
}

export const user = async (req, res) => {
try {
  const userCreated = await Users.create(datos);
    success(req, res, 201, userCreated)
} catch (e) { error(req, res, e, 400) }
}

