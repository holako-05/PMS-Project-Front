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
              <h1>Register</h1>
              <p class="account-subtitle">Access to our dashboard</p>

              <Form
                @submit="register"
                :validation-schema="schema"
                v-slot="{ errors }"
              >
                <div class="form-group">
                  <label class="form-control-label">First Name</label>
                  <Field
                    name="fname"
                    class="form-control"
                    type="text"
                    v-model="user.firstName"
                    :class="{ 'is-invalid': errors['fname'] }"
                    rules="required|fname"
                  />
                  <ErrorMessage name="fname" class="error-feedback" />
                </div>
                <div class="form-group">
                  <label class="form-control-label">Last Name</label>
                  <Field
                    name="lname"
                    class="form-control"
                    type="text"
                    v-model="user.lastName"
                    :class="{ 'is-invalid': errors['lname'] }"
                    rules="required|lname"
                  />
                  <ErrorMessage name="lname" class="error-feedback" />
                </div>
                <div class="form-group">
                  <label class="form-control-label">Email Address</label>
                  <Field
                    name="email"
                    class="form-control"
                    type="text"
                    v-model="user.email"
                    :class="{ 'is-invalid': errors['email'] }"
                    rules="required|email"
                  />
                  <ErrorMessage name="email" class="error-feedback" />
                </div>
                <div class="form-group">
                  <label class="form-control-label">Password</label>
                  <div class="pass-group">
                    <Field
                      name="pass"
                      v-if="showPassword"
                      type="text"
                      class="form-control pass-input"
                      v-model="user.password"
                      :class="{ 'is-invalid': errors['pass'] }"
                      rules="required|pass"
                    />
                    <Field
                      name="pass"
                      v-else
                      type="password"
                      class="form-control pass-input"
                      v-model="user.password"
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
                <div class="form-group mb-0">
                  <button
                    class="btn btn-lg btn-block btn-primary w-100"
                    :disabled="loading"
                    type="submit"
                  >
                    <span
                      v-show="loading"
                      class="spinner-border spinner-border-sm"
                    ></span>
                    Register
                  </button>
                </div>
              </Form>
              <div
                v-if="message"
                class="alert"
                :class="successful ? 'alert-success' : 'alert-danger'"
              >
                {{ message }}
              </div>

              <div class="login-or">
                <span class="or-line"></span>
                <span class="span-or">or</span>
              </div>

              <div class="social-login">
                <span>Register with</span>
                <a href="#" class="facebook"
                  ><i class="fab fa-facebook-f"></i></a
                ><a href="#" class="google"><i class="fab fa-google"></i></a>
              </div>

              <div class="text-center dont-have">
                Already have an account?
                <router-link to="/login">Login</router-link>
              </div>
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
  name: "RegisterPage",
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
      fname: yup
        .string()
        .required("First Name is required!")
        .min(3, "Must be minimum 3 characters!"),
      lname: yup
        .string()
        .required("Last Name is required!")
        .min(3, "Must be minimum 3 characters!"),
    });
    return {
      showPassword: false,
      password: "",
      successful: false,
      loading: false,
      message: "",
      schema,
      user: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    toggleShow() {
      this.showPassword = !this.showPassword;
    },
    register() {
      this.message = "";
      this.successful = false;
      this.loading = true;

      AuthService.register({
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        email: this.user.email,
        password: this.user.password,
      })
        .then((response) => {
          localStorage.setItem("jwtToken", JSON.stringify(response.data));
          this.$router.push({ name: "Categories" });
        })
        .catch(function (error) {
          console.log(error);
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
