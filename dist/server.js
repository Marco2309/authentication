"use strict";

var _index = _interopRequireDefault(require("./index"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config();

var PORT = process.env.PORT || 8000;

_index.default.listen(PORT, () => {
  console.log("Servidor escuchando sobre el puerto", PORT);
});