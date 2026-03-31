export default defineEventHandler(async (event) => {
  const path = event.path.toLowerCase();
  const isAPIRoute = path.includes("api") ?? false;
  if (!isAPIRoute) return;
  const session = await getUserSession(event);
  const isAuthRoute = path.includes("auth") ?? false;
  if (!isAuthRoute && !session.user) {
    throw unauthorizedError();
  }
});
