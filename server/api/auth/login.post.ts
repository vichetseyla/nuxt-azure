const runtimeConfig = useRuntimeConfig()
export default defineEventHandler(async (event) => {
  const { username, password } = await readBody(event);
  if(!username || !password){
    setResponseStatus(event, 400,"No username or password.");
    return "No username or password.";
  }
  
  const id = 99;
  await setUserSession(
    event,
    {
      user: {
        id,
      },
    }
  );
  setResponseStatus(event, 200);
  return "OK";
});
