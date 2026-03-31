export function unauthorizedError() {
  return createError({
    status: 401,
    statusText: "Unauthorized",
    statusMessage: "Unauthorized",
    message: "Unauthorized",
  });
}

export function serverError(message?: string) {
  return createError({
    status: 500,
    statusText: message,
    statusMessage: message,
    message: message,
  });
}
