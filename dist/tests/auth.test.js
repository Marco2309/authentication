"use strict";

var _supertest = _interopRequireDefault(require("supertest"));

var _index = _interopRequireDefault(require("../index"));

var _models = require("../models/");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var user = {
  firstName: "Gustavo",
  lastName: "Hernandez",
  email: "gus91@gmail.com",
  password: "gus12345&"
};
var userLogin = {
  email: "gus91@gmail.com",
  password: "gus12345&"
};
var invalidUserLogin = {
  email: "gus91@gmail.com",
  password: "gus123456&"
};
var invalidUser = {
  firstName: "",
  lastName: "",
  email: "gus02@gmail.com",
  password: "gus12345&"
};
var token = "";
var invalidToken = "2yhasidi12691djsdkabao";
var userID = 0;
describe("Pruebas Usuarios", () => {
  it("Agregar al usuario Gustavo", /*#__PURE__*/_asyncToGenerator(function* () {
    var results = yield (0, _supertest.default)(_index.default).post("/signin").send(user);
    expect(results.statusCode).toEqual(201);
    expect(results.body).toHaveProperty("email", user.email);
    userID = results.body.id;
  }));
  it("Registro fallido al agregar un usuario con el mismo correo", /*#__PURE__*/_asyncToGenerator(function* () {
    var results = yield (0, _supertest.default)(_index.default).post("/signin").send(user);
    expect(results.statusCode).toBeGreaterThanOrEqual(400);
    expect(results.body).toHaveProperty("message");
  }));
  it("Registro fallido al agregar un usuario sin nombre y apellido", /*#__PURE__*/_asyncToGenerator(function* () {
    var results = yield (0, _supertest.default)(_index.default).post("/signin").send(invalidUser);
    expect(results.statusCode).toBeGreaterThanOrEqual(400);
    expect(results.body).toHaveProperty("message");
  }));
});
describe("Autenticacion", () => {
  it("Iniciar sesión", /*#__PURE__*/_asyncToGenerator(function* () {
    var results = yield (0, _supertest.default)(_index.default).post("/login").send(userLogin);
    expect(results.statusCode).toBeGreaterThanOrEqual(200);
    expect(results.body).toHaveProperty("message");
  }));
  it("Inicio de sesión con credenciales incorrectas", /*#__PURE__*/_asyncToGenerator(function* () {
    var results = yield (0, _supertest.default)(_index.default).post("/login").send(invalidUserLogin);
    expect(results.statusCode).toBeGreaterThanOrEqual(401);
    expect(results.body).toHaveProperty("message");
  }));
  it("Inicio de sesión y respuesta de un token JWT", /*#__PURE__*/_asyncToGenerator(function* () {
    var results = yield (0, _supertest.default)(_index.default).post("/login").send(userLogin);
    expect(results.statusCode).toBeGreaterThanOrEqual(200);
    expect(results.body).toHaveProperty("token");
    token = results.body.token;
  }));
});
describe("Acceso a rutas protegidas | Autorización | (Opcional)", () => {
  it("Obtener un usuario por ID con token de autorización", /*#__PURE__*/_asyncToGenerator(function* () {
    var results = yield (0, _supertest.default)(_index.default).get("/users/" + userID).set("Authorization", "Bearer " + token);
    expect(results.statusCode).toBeGreaterThanOrEqual(200);
    expect(results.body).toHaveProperty("lastName", "Hernandez");
  }));
  it("Obtener todos los usuarios con token de autorización", /*#__PURE__*/_asyncToGenerator(function* () {
    var results = yield (0, _supertest.default)(_index.default).get("/users").set("Authorization", "Bearer " + token);
    expect(results.statusCode).toBeGreaterThanOrEqual(200);
    expect(results.body).toEqual(expect.arrayContaining([expect.objectContaining({
      email: user.email,
      lastName: user.lastName,
      firstName: user.firstName
    })]));
  }));
  it("Obtener todos los usuarios con token de autorización invalido", /*#__PURE__*/_asyncToGenerator(function* () {
    var results = yield (0, _supertest.default)(_index.default).get("/users").set("Authorization", "Bearer " + invalidToken);
    expect(results.statusCode).toBeGreaterThanOrEqual(401);
    expect(results.body).toHaveProperty("message");
  }));
});
beforeAll(done => {
  done();
});
afterAll( /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator(function* (done) {
    //Borrar todos los datos de la base de datos
    yield _models.Users.destroy({
      where: {
        email: user.email
      }
    });
    yield _models.Users.destroy({
      where: {
        email: invalidUser.email
      }
    });
    done();
  });

  return function (_x) {
    return _ref10.apply(this, arguments);
  };
}());