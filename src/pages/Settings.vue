<template>
  <div class="page-user">
    <h2 class="text-center mb-6">User Settings</h2>

    <form class="form form-narrow" @submit.prevent="validateUserSettings">
      <div class="form-header">
        <div class="subtitle">Edit your personal profile here.</div>
      </div>

      <!-- Display Name -->
      <div class="form-group" :class="{ 'form-group-error': v$.fields.newDisplayName.$error }">
        <label for="user-settings-name">Change Display Name</label>
        <input
          v-model="fields.newDisplayName"
          type="text"
          id="user-settings-name"
          placeholder="New Display Name"
        />
        <small v-if="!v$.fields.newDisplayName.required">Display Name is required</small>
        <small v-if="!v$.fields.newDisplayName.minLength || !v$.fields.newDisplayName.maxLength">
          Display Name must be between 2 and 20 characters
        </small>
      </div>

      <!-- Email -->
      <div class="form-group" :class="{ 'form-group-error': v$.fields.newEmail.$error }">
        <label for="user-settings-email">Change Email</label>
        <input
          v-model="fields.newEmail"
          type="email"
          id="user-settings-email"
          placeholder="New Email"
        />
        <small v-if="!v$.fields.newEmail.required">Email is required</small>
        <small v-if="!v$.fields.newEmail.email">Email must be valid</small>
      </div>

      <!-- Password -->
      <div class="form-group" :class="{ 'form-group-error': v$.fields.newPassword.$error }">
        <label for="user-settings-password">Change Password</label>
        <input
          v-model="fields.newPassword"
          type="password"
          id="user-settings-password"
          placeholder="New Password"
        />
        <small v-if="!v$.fields.newPassword.minLength || !v$.fields.newPassword.maxLength">
          Password must be between 8 and 1024 characters
        </small>
      </div>

      <div class="form-footer">
        <button type="submit">Save Changes</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import useVuelidate from "@vuelidate/core";
import { required, minLength, maxLength, email } from "@vuelidate/validators";
import { auth } from "@/firebase";
import {
  updateProfile,
  updateEmail,
  updatePassword,
  onAuthStateChanged,
} from "firebase/auth";

export default {
  name: "page-user-settings",
  setup() {
    const rules = {
      fields: {
        newDisplayName: {
          required,
          minLength: minLength(2),
          maxLength: maxLength(20),
        },
        newEmail: { required, email },
        newPassword: {
          minLength: minLength(8),
          maxLength: maxLength(1024),
        },
      },
    };

    const state = Vue.reactive({
      fields: {
        newDisplayName: "",
        newEmail: "",
        newPassword: "",
      },
    });

    const v$ = useVuelidate(rules, state);

    return { ...Vue.toRefs(state), v$ };
  },
  computed: {
    ...mapGetters(["sessionUser"]),
    pageTitle() {
      return this.sessionUser?.displayName || "Loading...";
    },
  },
  methods: {
    catch(error) {
      if (error.code === "auth/requires-recent-login")
        this.$router.push("/signin");
      this.$store.commit("notifyError", {
        title: error.code,
        body: error.message,
      });
    },
    validateUserSettings() {
      this.v$.$touch();
      if (!this.v$.$error) this.updateUserSettings();
    },
    updateUserSettings() {
      let changes = 0;
      const { newDisplayName, newEmail, newPassword } = this.fields;
      const user = auth.currentUser;
      if (!user) return;

      if (newDisplayName && newDisplayName !== user.displayName) {
        this.updateName(newDisplayName);
        changes++;
      }
      if (newEmail && newEmail !== user.email) {
        this.updateEmail(newEmail);
        changes++;
      }
      if (newPassword) {
        this.updatePassword(newPassword);
        changes++;
      }

      if (changes === 0) {
        this.$store.commit("notifyWarn", {
          title: "Nothing Changed",
          body: `You made no changes to your user profile settings.`,
        });
      }
    },
    updateName(name) {
      const user = auth.currentUser;
      if (!user) return;
      updateProfile(user, { displayName: name })
        .then(() => {
          this.$store.commit("notifyCustom", {
            title: "Display Name Updated",
            body: `Your display name has been successfully changed to "${name}".`,
          });
          this.$store.commit("setSessionUserDisplayName", name);
        })
        .catch(this.catch);
    },
    updateEmail(email) {
      const user = auth.currentUser;
      if (!user) return;
      updateEmail(user, email)
        .then(() => {
          this.$store.commit("notifyCustom", {
            title: "Email Updated",
            body: `Your email has been successfully updated.`,
          });
          this.$store.commit("setSessionUserEmail", email);
        })
        .catch(this.catch);
    },
    updatePassword(password) {
      const user = auth.currentUser;
      if (!user) return;
      updatePassword(user, password)
        .then(() => {
          this.$store.commit("notifyCustom", {
            title: "Password Updated",
            body: `Your password has been successfully updated.`,
          });
        })
        .catch(this.catch);
    },
  },
  mounted() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.fields.newDisplayName = user.displayName || "";
        this.fields.newEmail = user.email || "";
      } else {
        this.$store.commit("setSessionRequest", this.$route.path);
        this.$router.replace("/signup");
        this.$store.commit("notifyAuthRequired");
      }
    });

    const nameInput = document.querySelector("#user-settings-name");
    if (nameInput) nameInput.focus();
  },
};
</script>
