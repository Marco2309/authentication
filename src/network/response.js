
function success(req, res, status=200, response='successful operation') {
  res.status(status).json({
      response: response,
      status: `[STATUS]==>${status}]$`
  })
}


function error(req, res, error, status=500, response='Internal error', ) {
  console.log('[response error] => ' + error);
  res.status(status).json({
      response: response,
      status: `[STATUS]==>|${status}|]$`
  })
}

module.exports = {
  success,
  error
}