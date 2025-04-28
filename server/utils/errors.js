/**
 * Sends a 400 Bad Request response with the given message.
 *
 * @param {http.ServerResponse} res
 * @param {string} [message]
 * Default message is "Bad request!"
 */
function badRequestError(res, message) {
  res.status(400);
  res.send(message ? JSON.stringify({ message }) : { message: "Bad request!" });
  res.end();
}

/**
 * Sends a 404 Not Found response with the given message.
 *
 * @param {http.ServerResponse} res - The server response object.
 * @param {string} [message] - Optional custom message to include in the response.
 * Default message is "Not found!".
 */

function notFoundError(res, message) {
  res.status(404);
  res.send(message ? JSON.stringify({ message }) : { message: "Not found!" });
  res.end();
}

export { badRequestError, notFoundError };
