import { defineStore } from "pinia";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  reload,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase.js";

let authInitializationPromise;

function getAuthErrorMessage(error) {
  const messages = {
    "auth/email-already-in-use": "Этот адрес электронной почты уже зарегистрирован.",
    "auth/invalid-email": "Введите корректный адрес электронной почты.",
    "auth/weak-password": "Пароль слишком простой.",
    "auth/invalid-credential": "Неверная почта или пароль.",
    "auth/user-disabled": "Этот аккаунт заблокирован.",
    "auth/too-many-requests": "Слишком много попыток. Попробуйте позже.",
    "auth/network-request-failed": "Проверьте подключение к интернету.",
    "auth/popup-blocked": "Разрешите всплывающие окна для входа через Google.",
    "auth/popup-closed-by-user": "Окно входа через Google закрыто.",
    "auth/cancelled-popup-request": "Запрос входа отменен. Попробуйте еще раз.",
    "auth/operation-not-allowed":
      "Вход через Google не включен в настройках Firebase.",
    "auth/unauthorized-domain":
      "Этот домен не разрешен для входа в Firebase.",
    "auth/account-exists-with-different-credential":
      "Аккаунт с этой почтой уже зарегистрирован другим способом.",
  };

  return messages[error?.code] || error?.message || "Не удалось выполнить запрос.";
}

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: auth.currentUser,
    emailVerified: Boolean(auth.currentUser?.emailVerified),
    authInitialized: false,
    loading: false,
    error: null,
    verificationSent: false,
  }),

  actions: {
    initializeAuth() {
      if (this.authInitialized) {
        return Promise.resolve(this.user);
      }

      if (!authInitializationPromise) {
        authInitializationPromise = new Promise((resolve, reject) => {
          let unsubscribe;
          unsubscribe = onAuthStateChanged(
            auth,
            (user) => {
              this.user = user;
              this.emailVerified = Boolean(user?.emailVerified);
              this.authInitialized = true;
              resolve(user);
            },
            (error) => {
              unsubscribe?.();
              reject(error);
            },
          );
        }).catch((error) => {
          authInitializationPromise = null;
          throw new Error(getAuthErrorMessage(error));
        });
      }

      return authInitializationPromise;
    },

    async signup({ fullName, email, password }) {
      this.loading = true;
      this.error = null;
      this.verificationSent = false;

      try {
        const credential = await createUserWithEmailAndPassword(
          auth,
          email,
          password,
        );
        this.user = credential.user;
        this.emailVerified = credential.user.emailVerified;

        await updateProfile(credential.user, { displayName: fullName });
        await sendEmailVerification(credential.user);
        this.verificationSent = true;
        return credential.user;
      } catch (error) {
        this.error = getAuthErrorMessage(error);
        throw new Error(this.error);
      } finally {
        this.loading = false;
      }
    },

    async signin({ email, password }) {
      this.loading = true;
      this.error = null;

      try {
        const credential = await signInWithEmailAndPassword(
          auth,
          email,
          password,
        );
        await reload(credential.user);

        if (!credential.user.emailVerified) {
          try {
            await sendEmailVerification(credential.user);
          } finally {
            this.user = null;
            this.emailVerified = false;
            await signOut(auth);
          }
          this.verificationSent = true;
          throw new Error(
            "Аккаунт не подтвержден. Мы отправили письмо для подтверждения.",
          );
        }

        this.user = credential.user;
        this.emailVerified = credential.user.emailVerified;
        return credential.user;
      } catch (error) {
        this.error = getAuthErrorMessage(error);
        throw new Error(this.error);
      } finally {
        this.loading = false;
      }
    },

    async signinWithGoogle() {
      this.loading = true;
      this.error = null;

      try {
        const provider = new GoogleAuthProvider();
        const credential = await signInWithPopup(auth, provider);
        await reload(credential.user);

        if (!credential.user.emailVerified) {
          await signOut(auth);
          this.user = null;
          this.emailVerified = false;
          throw new Error("Подтвердите электронную почту Google-аккаунта.");
        }

        this.user = credential.user;
        this.emailVerified = credential.user.emailVerified;
        return credential.user;
      } catch (error) {
        this.error = getAuthErrorMessage(error);
        throw new Error(this.error);
      } finally {
        this.loading = false;
      }
    },

    async resendVerificationEmail() {
      this.error = null;

      try {
        if (!auth.currentUser) {
          throw new Error("Войдите в аккаунт, чтобы отправить письмо повторно.");
        }

        await sendEmailVerification(auth.currentUser);
        this.verificationSent = true;
      } catch (error) {
        this.error = getAuthErrorMessage(error);
        throw new Error(this.error);
      }
    },

    async confirmAccount() {
      this.error = null;

      try {
        if (!auth.currentUser) {
          throw new Error("Сначала войдите в аккаунт.");
        }

        await reload(auth.currentUser);
        this.user = auth.currentUser;
        this.emailVerified = auth.currentUser.emailVerified;
        return this.emailVerified;
      } catch (error) {
        this.error = getAuthErrorMessage(error);
        throw new Error(this.error);
      }
    },

    async logout() {
      this.loading = true;
      this.error = null;

      try {
        await signOut(auth);
        this.user = null;
        this.emailVerified = false;
      } catch (error) {
        this.error = getAuthErrorMessage(error);
        throw new Error(this.error);
      } finally {
        this.loading = false;
      }
    },
  },
});
