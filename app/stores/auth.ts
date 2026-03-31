import { defineStore, acceptHMRUpdate } from "pinia";
import { FetchError } from "ofetch";
export const useAuthStore = defineStore("auth", {
  state: () => ({
    authenticating: false,
    username: "",
    password: "",
  }),
  getters: {},
  actions: {
    async authenticate() {
      const { fetch: refreshSession } = useUserSession();
      const router = useRouter();
      this.authenticating = true;
      const authResult = await $fetch("/api/auth/login", {
        method: "POST",
        body: {
          username: this.username,
          password: this.password,
        },
      }).catch((err) => {
        if (err instanceof FetchError) {
          alert(err.statusText);
        }
      });
      if (authResult == "OK") {
        await refreshSession();
        await router.replace("/");
      }
      this.authenticating = false;
    },
    async logout() {
      if(confirm("Are you sure you want to logout?")){
        const { clear } = useUserSession();
        await clear();
        window.location.reload()
      }
    }
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
