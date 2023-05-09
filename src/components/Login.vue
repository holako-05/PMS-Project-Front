<template>
  <div class="main-wrapper login-body">
    <div class="login-wrapper">
      <div class="container">
        <img
          class="img-fluid logo-dark mb-2"
          src="../../public/assets/img/logo.png"
          alt="Logo"
        />
        <div class="loginbox">
          <div class="login-right">
            <div class="login-right-wrap">
              <h1>Login</h1>
              <p class="account-subtitle">Access to our dashboard</p>
              <Form
                @submit="login"
                :validation-schema="schema"
                v-slot="{ errors }"
              >
                <div class="form-group">
                  <label class="form-control-label">Email Address</label>
                  <Field
                    name="email"
                    type="email"
                    v-model="user.mail"
                    class="form-control"
                    :class="{ 'is-invalid': errors['email'] }"
                    rules="required|email"
                  />
                  <ErrorMessage name="email" class="error-feedback" />
                </div>
                <div class="form-group">
                  <label class="form-control-label">Password</label>
                  <div class="pass-group">
                    <Field
                      v-if="showPassword"
                      name="pass"
                      v-model="user.pass"
                      type="text"
                      class="form-control pass-input"
                      :class="{ 'is-invalid': errors['pass'] }"
                      rules="required|pass"
                    />
                    <Field
                      v-else
                      type="password"
                      name="pass"
                      v-model="user.pass"
                      class="form-control pass-input"
                      :class="{ 'is-invalid': errors['pass'] }"
                      rules="required|pass"
                    />
                    <span
                      @click="toggleShow"
                      class="fas toggle-password"
                      :class="{
                        'fa-eye-slash': showPassword && !errors['pass'],
                        'fa-eye': !showPassword && !errors['pass'],
                      }"
                    ></span>
                    <ErrorMessage name="pass" class="error-feedback" />
                  </div>
                </div>
                <button
                  class="btn btn-lg btn-block btn-primary w-100"
                  type="submit"
                  :disabled="loading"
                >
                  <span
                    v-show="loading"
                    class="spinner-border spinner-border-sm"
                  ></span>
                  Login
                </button>
                <div class="form-group">
                  <div v-if="message" class="alert alert-danger" role="alert">
                    {{ message }}
                  </div>
                </div>
                <div class="login-or">
                  <span class="or-line"></span>
                  <span class="span-or">or</span>
                </div>

                <div class="social-login mb-3">
                  <span>Login with</span>
                  <a href="#" class="facebook"
                    ><i class="fab fa-facebook-f"></i></a
                  ><a href="#" class="google"><i class="fab fa-google"></i></a>
                </div>

                <div class="text-center dont-have">
                  Don't have an account yet?
                  <router-link to="/register">Register</router-link>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AuthService from "../services/AuthService";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
  name: "LoginPage",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      email: yup
        .string()
        .required("Email is required!")
        .email("Email is invalid!")
        .max(50, "Must be maximum 50 characters!"),
      pass: yup.string().required("Password is required!"),
    });
    return {
      showPassword: false,
      loading: false,
      message: "",
      errorMessage: "",
      schema,
      user: {
        mail: "",
        pass: "",
      },
    };
  },
  methods: {
    toggleShow() {
      this.showPassword = !this.showPassword;
    },
    login() {

      this.message = "";
      this.successful = false;
      this.loading = true;

      AuthService.login({
        email: this.user.mail,
        password: this.user.pass,
      })
        .then((response) => {
          localStorage.setItem("jwtToken", JSON.stringify(response.data));
          this.$router.push({ path: "/categories" });
          console.log(response.data)
        })
        .catch((error) => {
          console.log(error);
          if (error.response && error.response.status === 401) {
            this.errorMessage = "Invalid email or password. Please try again.";
          } else {
            this.errorMessage = "An error occurred. Please try again later.";
          }
        });
    },
  },
  computed: {
    buttonLabel() {
      return this.showPassword ? "Hide" : "Show";
    },
  },
  mounted() {
    let token = localStorage.getItem("jwtToken");
    if (token) {
      this.$router.push({ name: "Categories" });
    }
  },
};
</script>
<style></style>
