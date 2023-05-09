<template>
    <SideBar></SideBar>
    <div class="page-wrapper">
        <div class="content container-fluid">
            <div class="row justify-content-center">
                <div class="col-xl-10">
                    <div class="page-header">
                        <div class="row align-items-center">
                            <button @click="exportToPdf" class="btn btn-primary me-1">
                                <i class="fa-solid fa-download"></i> Download
                            </button>
                        </div>
                    </div>
                    <div class="card invoice-info-card">
                        <div class="card-body" id="element">
                            <div class="invoice-item invoice-item-one">
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="invoice-logo">
                                            <img src="../../public/assets/img/logo.png" alt="logo" />
                                        </div>
                                        <div class="invoice-head">
                                            <h2>Product</h2>
                                            <p>
                                                Product Name : <i class="fa-solid fa-quote-left"></i
                                            >{{ product.nom }}
                                            </p>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="invoice-info">
                                            <strong class="customer-text-one"
                                            >Youssef ELHILALI</strong
                                            >
                                            <h6 class="invoice-name">Product Management System</h6>
                                            <p class="invoice-details">PMS</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="row align-items-center justify-content-center">
                                <div class="col-lg-8 col-md-8">
                                    <div class="invoice-total-card">
                                        <div class="invoice-total-box">
                                            <div class="invoice-total-inner">
                                                <p style="margin-bottom: 100px">
                                                    Product Image<span
                                                ><img
                                                        id="prdImg"
                                                        class="avatar avatar-sm me-2 avatar-img rounded-circle"
                                                        :src="'/assets/images/' + product.imagePath"
                                                        alt="Product Image"
                                                        style="margin-left: 30px;width: 100px; height: 100px;"
                                                /></span
                                                >
                                                </p>
                                                <p>
                                                    Product Description<span
                                                ><i class="fa-solid fa-quote-left"></i
                                                >{{ product.description }}</span
                                                >
                                                </p>
                                                <p>
                                                    Product Slug
                                                    <span
                                                    ><i class="fa-solid fa-quote-left"></i
                                                    >{{ product.slug }}</span
                                                    >
                                                </p>
                                                <p>
                                                    Category Name
                                                    <span
                                                            v-if="product.category"
                                                    ><i class="fa-solid fa-quote-left"></i
                                                    >{{ product.category.nom }}</span
                                                    >
                                                </p>
                                                <p>
                                                    Product Creation Date
                                                    <span
                                                    ><i class="fa-regular fa-calendar"></i
                                                    >{{ product.dateCreation }}</span
                                                    >
                                                </p>
                                                <p>
                                                    Product Modification Date
                                                    <span
                                                    ><i class="fa-regular fa-calendar"></i
                                                    >{{ product.dateModification }}</span
                                                    >
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="invoice-sign text-end">
                                <img
                                        class="img-fluid d-inline-block"
                                        src="../../public/assets/img/signature.png"
                                        alt="sign"
                                />
                                <span class="d-block">Youssef</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import SideBar from "./SideBar.vue";
import ProductService from "@/services/ProductService";
import CategoryService from "@/services/CategoryService";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default {
    name: "AddCategory",
    components: {
        SideBar,
    },
    data() {
        return {
            product: {
                nom: "",
                description: "",
                slug: "",
                dateCreation: null,
                dateModification: null,
                category: null,
                imagePath: "",
                categoryId: null
            }
        };
    },
    methods: {
        getProduct(){
            ProductService.getProduct(this.$route.params.id).then((res) => {
                console.log(res.data)
                this.product = res.data;
                this.product.dateCreation = this.formatDate(this.product.dateCreation)
                this.product.dateModification = this.formatDate(this.product.dateModification)
                this.getCategory(this.product.categoryId)
            }).catch(function (error){
                console.log(error)
            })
        },
        formatDate(date){
            let day = new Date(date).getDate();
            let mounth = new Date(date).getMonth()+1;
            let year = new Date(date).getFullYear();
            let hour = new Date(date).getHours();
            let second = new Date(date).getSeconds();
            let minute = new Date(date).getMinutes();
            return day + "-" + mounth + "-" + year + "  " + hour + ":" + minute + ":" + second;
        },
        exportToPdf() {
            var doc = new jsPDF();

            // Get the HTML element that contains the product details
            var productDetail = document.getElementById('element');

            // Use html2canvas library to capture the product detail element and convert it to an image
            html2canvas(productDetail).then(function(canvas) {
                // Add the image to the PDF document
                var imgData = canvas.toDataURL('image/png');
                doc.addImage(imgData, 'PNG', 10, 10, 150, 200);

                // Download the PDF file
                doc.save('product-detail.pdf');
            });
        },
        getCategory(id){
            CategoryService.getCategory(id).then(res => {
                this.product.category = res.data
            }).catch((error) => {
                console.log(error)
            })
        }
    },
    mounted() {
        let token = localStorage.getItem('jwtToken')
        if (!token) {
            this.$router.push({name: "Login"})
        }
        this.getProduct()
    }
};
</script>

<style>
span {
    font-size: 17px;
}
p {
    font-weight: bold;
    font-size: 18px;
}
.invoice-total-box {
    border: none;
    margin-top: 20px;
}
i {
    margin-right: 7px;
}
</style>
