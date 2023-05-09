<template>
  <SideBar></SideBar>
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
              <h1 style="margin-bottom: 20px">Add Category</h1>

              <Form
                @submit="addCategory"
                :validation-schema="schema"
                v-slot="{ errors }"
              >
                <div class="form-group">
                  <label class="form-control-label">Category Name</label>
                  <Field
                    class="form-control"
                    name="name"
                    v-model="category.nom"
                    type="text"
                    :class="{ 'is-invalid': errors['name'] }"
                    rules="required|name"
                  />
                  <ErrorMessage name="name" class="error-feedback" />
                </div>
                <div class="form-group">
                  <label class="form-control-label">Category Description</label>
                  <Field
                    as="textarea"
                    name="description"
                    v-model="category.description"
                    class="form-control"
                    :class="{ 'is-invalid': errors['description'] }"
                    rules="required|description"
                  />
                  <ErrorMessage name="description" class="error-feedback" />
                </div>
                <div class="form-group mb-0">
                  <button
                    class="btn btn-lg btn-block btn-primary w-100"
                    type="submit"
                    :disabled="loading"
                  >
                    <span
                      v-show="loading"
                      class="spinner-border spinner-border-sm"
                    ></span>
                    Add Category
                  </button>
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
import SideBar from "./SideBar.vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import CategoryService from "@/services/CategoryService";
import * as yup from "yup";

export default {
  name: "AddCategory",
  components: {
    SideBar,
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      name: yup
        .string()
        .required("Category Name is required!")
        .min(4, "Must be minimum 4 characters!"),
      description: yup
        .string()
        .required("Description is required!")
        .min(10, "Must be minimum 10 characters!"),
    });
    return {
      loading: false,
      errorMessage: "",
      schema,
      category: {
        nom: "",
        description: "",
      },
    };
  },
  methods:{
    addCategory(){
      CategoryService.addCategory({
        nom: this.category.nom,
        description: this.category.description
      })
    }
  },
  mounted() {
    let token = localStorage.getItem('jwtToken')
    if (!token) {
      this.$router.push({name: "Login"})
    }
  }
};
</script>
  
  <style></style>
  