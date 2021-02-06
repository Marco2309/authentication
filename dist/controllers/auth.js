"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signIn = exports.login = void 0;

var _models = require("../models/");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//1. Completar la logica para manejar el inicio de sesión
// - responder con un codigo de estado 401 cuando las credenciales sean incorrectas
// - responder con un mensaje (message) y codigo de estado 200 cuando las credenciales sean correctas
// - responder con el token jwt (token) 
var login = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res) {});

  return function login(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}(); //2. Completar el registro de usuario
// - responder con un codigo de estado fallido 400 > cuando hagan falta campos o cuando el usuario ya exista en la base de datos
// - responder con el objeto del usuario que ha sido creado y un codigo 201 cuando el registro sea satisfactorio


exports.login = login;

var signIn = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (req, res) {});

  return function signIn(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.signIn = signIn;