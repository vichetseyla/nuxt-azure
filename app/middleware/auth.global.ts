export default defineNuxtRouteMiddleware((to, from) => {
  const { loggedIn } = useUserSession();
  if (to.path.includes("api")) return;
  if (!to.path.includes("auth") && !loggedIn.value) {
    return navigateTo("/auth");
  }
  if (to.path.includes("auth") && loggedIn.value) {
    return navigateTo("/");
  }
});
