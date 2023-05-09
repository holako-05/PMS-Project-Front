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
                            <h1 style="margin-bottom: 20px">Add Product</h1>
                            <Form
                                @submit.prevent="createProduct"
                                :validation-schema="schema"
                                v-slot="{ errors }"
                            >
                                <div class="form-group">
                                    <label class="form-control-label">Product Name<span
                                        class="text-danger">*</span></label>
                                    <Field
                                        class="form-control"
                                        name="name"
                                        v-model="product.nom"
                                        type="text"
                                        :class="{ 'is-invalid': errors['name'] }"
                                        rules="required|name"
                                    />
                                    <ErrorMessage name="name" class="error-feedback"/>
                                </div>
                                <div class="form-group">
                                    <label class="form-control-label">Product Description<span
                                        class="text-danger">*</span></label>
                                    <Field
                                        as="textarea"
                                        name="description"
                                        v-model="product.description"
                                        class="form-control"
                                        :class="{ 'is-invalid': errors['description'] }"
                                        rules="required|description"
                                    />
                                    <ErrorMessage name="description" class="error-feedback"/>
                                </div>
                                <div class="form-group">
                                    <label class="form-control-label">Product Image<span
                                        class="text-danger">*</span></label>
                                    <div class="change-photo-btn">
                                        <div>
                                            <p>Add Image</p>
                                        </div>
                                        <Field type="file"
                                               class="upload"
                                               name="image"
                                               :class="{ 'is-invalid': errors['image'] }"
                                               rules="required|image"
                                               @change="onFileChange"
                                        />
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="cat">Category Name<span class="text-danger">*</span></label>
                                    <select class="form-select" v-model="product.categoryId" name="cat">
                                        <option v-for="category in categories" :key="category.id" :value="category.id">
                                            {{ category.nom }}
                                        </option>
                                    </select>
                                </div>
                                <div class="form-group mb-0">
                                    <button
                                        type="submit"
                                        class="btn btn-lg btn-block btn-primary w-100"
                                        :disabled="loading"
                                        @click="createProduct"
                                    >
                                        <span
                                            v-show="loading"
                                            class="spinner-border spinner-border-sm"
                                        ></span>
                                        Add Product
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
import SideBar from "@/components/SideBar.vue";
import {ErrorMessage, Field, Form} from "vee-validate";
import * as yup from "yup";
import CategoryService from "@/services/CategoryService";
import ProductService from "@/services/ProductService";
export default {
    name: "AddProduct",
    components:{
        SideBar,
        Form,
        Field,
        ErrorMessage,
    },
    data() {
        const schema = yup.object().shape({
            name: yup
                .string()
                .required("Product Name is required!")
                .min(4, "Must be minimum 4 characters!"),
            description: yup
                .string()
                .required("Description is required!")
                .min(10, "Must be minimum 10 characters!"),
            cat: yup
                .string()
                .required("Category Name is required")
        });
        return {
            loading: false,
            errorMessage: "",
            schema,
            categories: null,
            product: {
                nom: "",
                description: "",
                image: "",
                categoryId: null
            },
        };
    },
    methods:{
        getCategories() {
            CategoryService.allCategories().then((res) => {
                this.categories = res.data;
            }).catch(function (error) {
                console.log(error)
            })
        },
        onFileChange(event) {
            this.product.image = event.target.files[0];
        },
        createProduct(){
                this.loading = true;
                let formData = new FormData();
                formData.append('nom', this.product.nom);
                formData.append('description', this.product.description);
                formData.append('image', this.product.image);
                formData.append('categoryId', this.product.categoryId);
                ProductService.addProduct(formData)
        }
    },
    mounted() {
        let token = localStorage.getItem('jwtToken')
        if (!token) {
            this.$router.push({name: "Login"})
        }
        this.getCategories()
    }
}
</script>

<style scoped>

</style>
