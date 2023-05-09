import { createRouter, createWebHistory } from 'vue-router'
import ListCategories from '@/components/ListCategories'
import ListProducts from '@/components/ListProducts'
import Login from '@/components/Login'
import Register from '@/components/Register'
import AddCategory from '@/components/AddCategory'
import UpdateCategory from '@/components/UpdateCategory'
import ViewCategory from '@/components/ViewCategory'
import AddProduct from "@/components/AddProduct.vue";
import UpdateProduct from "@/components/UpdateProduct.vue";
import ViewProduct from "@/components/ViewProduct.vue";


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/categories',
            name: 'Categories',
            component: ListCategories
        },
        {
            path: '/products',
            name: 'Products',
            component: ListProducts
        },
        {
            path: '/addCategory',
            name: 'AddCategory',
            component: AddCategory
        },
        {
            path: '/updateCategory/:id',
            name: 'UpdateCategory',
            component: UpdateCategory
        },
        {
            path: '/viewCategory/:id',
            name: 'ViewCategory',
            component: ViewCategory
        },
        {
            path: '/addProduct',
            name: 'AddProduct',
            component: AddProduct
        },
        {
            path: '/updateProduct/:id',
            name: 'UpdateProduct',
            component: UpdateProduct
        },
        {
            path: '/viewProduct/:id',
            name: 'ViewProduct',
            component: ViewProduct
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/register',
            name: 'Register',
            component: Register
        }
    ]
});

export default router
