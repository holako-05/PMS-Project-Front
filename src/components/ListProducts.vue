<template>
    <SideBar></SideBar>
    <div class="page-wrapper">
        <div class="content container-fluid">
            <!---->
            <div class="page-header">
                <div class="row align-items-center">
                    <div class="col">
                        <h3 class="page-title">Products</h3>
                    </div>

                    <div class="col-auto">
                        <router-link to="/addProduct" class="btn btn-primary me-1">
                            <i class="fas fa-plus"></i>
                        </router-link>
                        <select
                                class="btn btn-primary"
                                v-model="selectedType"
                                style="height: 38px"
                        >
                            <option value="excel">Excel</option>
                            <option value="pdf">Pdf</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-header">
                    <div class="row">
                        <div class="col"></div>
                        <div class="top-nav-search col-auto">
                            <form>
                                <input
                                        type="text"
                                        class="form-control"
                                        v-model="search"
                                        @input="getProducts"
                                        placeholder="Search here"
                                />
                                <button class="btn" type="submit">
                                    <i class="fas fa-search"></i>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-stripped table-hover table-sm">
                            <thead class="thead-light">
                            <tr>
                                <th>Image</th>
                                <th @click="sort('nom')" style="cursor: pointer">
                                    Name
                                    <i v-if="sortProp === 'nom'" :class="sortOrder === 1 ? 'fa fa-sort-alpha-up' : 'fa fa-sort-alpha-down'"></i>
                                </th>
                                <th>
                                    Category Name
                                </th>
                                <th @click="sort('description')" style="cursor: pointer">
                                    Description
                                    <i v-if="sortProp === 'description'" :class="sortOrder === 1 ? 'fa fa-sort-alpha-up' : 'fa fa-sort-alpha-down'"></i>
                                </th>
                                <th @click="sort('slug')" style="cursor: pointer">
                                    Slug
                                    <i v-if="sortProp === 'slug'" :class="sortOrder === 1 ? 'fa fa-sort-alpha-up' : 'fa fa-sort-alpha-down'"></i>
                                </th>
                                <th @click="sort('dateCreation')" style="cursor: pointer">
                                    Creation Date
                                    <i v-if="sortProp === 'dateCreation'" :class="sortOrder === 1 ? 'fa fa-sort-numeric-up' : 'fa fa-sort-numeric-down'"></i>
                                </th>
                                <th @click="sort('dateModification')" style="cursor: pointer">
                                    Modification Date
                                    <i v-if="sortProp === 'dateModification'" :class="sortOrder === 1 ? 'fa fa-sort-numeric-up' : 'fa fa-sort-numeric-down'"></i>
                                </th>
                                <th class="text-right">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="product in sortedProducts" :key="product.id">
                                <td>
                                    <h2 class="table-avatar">
                                        <img
                                            class="avatar avatar-sm me-2 avatar-img rounded-circle"
                                            :src="'/assets/images/' + product.imagePath"
                                            alt="Product Image"
                                        />
                                    </h2>
                                </td>
                                <td>{{ product.nom }}</td>
                                <td>{{ getCategoryName(product.categoryId) || 'Loading...' }}</td>
                                <td>{{ product.description }}</td>
                                <td>{{ product.slug }}</td>
                                <td>
                    <span class="badge bg-success-light">{{
                        formatDate(product.dateCreation)
                        }}</span>
                                </td>
                                <td>
                    <span class="badge bg-warning-light">{{
                        formatDate(product.dateModification)
                        }}</span>
                                </td>
                                <td class="text-right">
                                    <div class="dropdown dropdown-action">
                                        <a
                                                href="#"
                                                class="action-icon dropdown-toggle"
                                                data-bs-toggle="dropdown"
                                                aria-expanded="false"
                                        ><i class="fas fa-ellipsis-h"></i
                                        ></a>
                                        <div class="dropdown-menu dropdown-menu-right">
                                            <router-link
                                                    class="dropdown-item"
                                                    :to="'/updateProduct/' + product.id"
                                            ><i class="far fa-edit me-2"></i>Edit</router-link
                                            >
                                            <router-link
                                                    class="dropdown-item"
                                                    :to="'/viewProduct/' + product.id"
                                            ><i class="far fa-eye me-2"></i>View</router-link
                                            >
                                            <button
                                                    class="dropdown-item"
                                                    @click="deleteProduct(product)"
                                            >
                                                <i class="far fa-trash-alt me-2"></i>Delete
                                            </button>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <nav v-if="!search" aria-label="...">
                        <ul class="pagination mt-2">
                            <li
                                class="page-item first"
                                :class="{ disabled: currentPage <= 0 }"
                            >
                                <a
                                    class="page-link"
                                    href="javascript:void(0);"
                                    @click="currentPage > 0 && previousPage()"
                                >
                                    <i class="fa fa-angle-left"></i>
                                    <span class="sr-only">Previous</span>
                                </a>
                            </li>

                            <li
                                class="page-item"
                                v-for="page in totalPages + 1"
                                :key="page"
                                :class="{ active: page - 1 === currentPage }"
                            >
                                <a
                                    class="page-link"
                                    href="javascript:void(0)"
                                    @click="goToPage(page - 1)"
                                >{{ page }}</a
                                >
                            </li>
                            <li
                                class="page-item last"
                                :class="{ disabled: currentPage + 1 >= totalPages + 1 }"
                            >
                                <a
                                    class="page-link"
                                    href="javascript:void(0);"
                                    @click="currentPage + 1 < totalPages + 1 && nextPage()"
                                >
                                    <i class="fa fa-angle-right"></i>
                                    <span class="sr-only">Next</span>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import SideBar from './SideBar.vue';
import ProductService from "@/services/ProductService";
import CategoryService from "@/services/CategoryService";
import jsPDF from "jspdf";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx/dist/xlsx.full.min.js";
import 'jspdf-autotable';

export default {
  name: "ListProducts",
  components: {
      SideBar
  },
  data: function () {
      return {
          products: [],
          categoryNames: {},
          selectedType: "excel",
          search: "",
          currentPage: 0,
          totalPages: 0,
          pageSize: 7,
          sortProp: 'nom',
          sortOrder: 1,
      }
  },
    watch: {
        selectedType: function () {
            this.downloadFile();
        },
    },
  methods: {
      getProducts() {
          ProductService.listProducts(`pageNo=${this.currentPage}&pageSize=${this.pageSize}`, this.search).then((res) => {
              console.log(res.data);
              this.products = res.data;
              this.totalPages = Math.ceil(this.products.length / this.pageSize);
              for (let product of this.products) {
                  this.getCategoryName(product.categoryId);
              }
          }).catch(function (error) {
              console.log(error)
          })
      },
      sort(prop) {
          if (prop === this.sortProp) {
              this.sortOrder = -this.sortOrder;
          } else {
              this.sortProp = prop;
              this.sortOrder = 1;
          }
      },
      previousPage() {
          this.currentPage--;
          this.getProducts();
      },
      nextPage() {
          this.currentPage++;
          this.getProducts();
      },
      goToPage(page) {
          this.currentPage = page;
          console.log(this.currentPage);
          this.getProducts();
      },
      getCategoryName(categoryId) {
          if (categoryId in this.categoryNames) {
              return this.categoryNames[categoryId];
          }
          CategoryService.getCategory(categoryId).then(response => {
              this.categoryNames[categoryId] = response.data.nom;
          });
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
      deleteProduct(data) {
          ProductService.deleteProduct(data.id, data).then((res) => {
              console.log(res.data)
              this.getProducts()
          }).catch(function (error){
              console.log(error)
          })
      },
      downloadFile() {
          if (this.selectedType === "pdf") {
              this.downloadPDF();
          } else if (this.selectedType === "excel") {
              this.downloadExcel();
          }
      },
      downloadPDF() {
          console.log("PDF")
          const doc = new jsPDF();
          const tableRows = [];
          const headers = [
              "Name",
              "Description",
              "Slug",
              "Date Created",
              "Modification Date",
          ];
          this.products.forEach((product) => {
              const dataRow = [
                  product.nom,
                  product.description,
                  product.slug,
                  product.dateCreation,
                  product.dateModification,
              ];
              tableRows.push(dataRow);
          });
          doc.autoTable({
              head: [headers],
              body: tableRows,
          });
          doc.save("products.pdf");
      },
      downloadExcel() {
          const selectedCategories = this.products.map((prod) => ({
              nom: prod.nom,
              description: prod.description,
              slug: prod.slug,
              dateCreation: prod.dateCreation,
              dateModification: prod.dateModification,
          }));
          const worksheet = XLSX.utils.json_to_sheet(selectedCategories);
          const workbook = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(workbook, worksheet, "Products");
          const excelBuffer = XLSX.write(workbook, {
              bookType: "xlsx",
              type: "array",
          });
          const blob = new Blob([excelBuffer], {
              type: "application/vnd.ms-excel",
          });
          saveAs(blob, "categories.xlsx");
      },
  },
    mounted(){
        let token = localStorage.getItem('jwtToken')
        if (!token) {
            this.$router.push({name: "Login"})
        }
        this.getProducts();
    },
    computed: {
        sortedProducts() {
            const productsCopy = this.products;
            return productsCopy.sort((a, b) => {
                const propA = a[this.sortProp].toUpperCase();
                const propB = b[this.sortProp].toUpperCase();
                if (propA < propB) {
                    return -1 * this.sortOrder;
                }
                if (propA > propB) {
                    return this.sortOrder;
                }
                return 0;
            });
        },
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
