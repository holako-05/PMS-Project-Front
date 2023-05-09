<template>
  <SideBar></SideBar>
  <div class="page-wrapper">
    <div class="content container-fluid">
      <div class="row justify-content-center">
        <div class="col-xl-10">
          <div class="page-header">
            <div class="row align-items-center">
              <button @click="exportPDF" class="btn btn-primary me-1">
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
                      <h2>Category</h2>
                      <p>
                        Category Name : <i class="fa-solid fa-quote-left"></i
                        >{{ category.nom }}
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
                        <p>
                          Category Description<span
                            ><i class="fa-solid fa-quote-left"></i
                            >{{ category.description }}</span
                          >
                        </p>
                        <p>
                          Category Slug
                          <span
                            ><i class="fa-solid fa-quote-left"></i
                            >{{ category.slug }}</span
                          >
                        </p>
                        <p>
                          Category Creation Date
                          <span
                            ><i class="fa-regular fa-calendar"></i
                            >{{ category.dateCreation }}</span
                          >
                        </p>
                        <p>
                          Category Modification Date
                          <span
                            ><i class="fa-regular fa-calendar"></i
                            >{{ category.dateModification }}</span
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
import CategoryService from "@/services/CategoryService";
import html2pdf from "html2pdf.js";

export default {
  name: "AddCategory",
  components: {
    SideBar,
  },
  data() {
    return {
      category: {
        nom: "",
        description: "",
        slug: "",
        dateCreation: null,
        dateModification: null,
      },
    };
  },
  methods: {
    getCategory() {
      CategoryService.getCategory(this.$route.params.id)
        .then((res) => {
          console.log("View => " + res.data);
          this.category = res.data;
          this.category.dateCreation = this.formatDate(
            this.category.dateCreation
          );
          this.category.dateModification = this.formatDate(
            this.category.dateModification
          );
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    formatDate(date) {
      let day = new Date(date).getDate();
      let mounth = new Date(date).getMonth() + 1;
      let year = new Date(date).getFullYear();
      let hour = new Date(date).getHours();
      let second = new Date(date).getSeconds();
      let minute = new Date(date).getMinutes();
      return (
        day +
        "-" +
        mounth +
        "-" +
        year +
        "  " +
        hour +
        ":" +
        minute +
        ":" +
        second
      );
    },
    exportPDF(){
      html2pdf(document.getElementById("element"), {
        margin: 1,
        filename: "category.pdf",
      });
      this.$router.push({path: '/categories'})
    }
  },
  mounted() {
    let token = localStorage.getItem("jwtToken");
    if (!token) {
      this.$router.push({ name: "Login" });
    }
    this.getCategory();
  },
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
    