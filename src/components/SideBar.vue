<template>
<div class="main-wrapper">
    <div class="header header-one">
    <div class="header-left header-left-one">
        <a href="index.html" class="logo">
        <img src="../../public/assets/img/logo.png" alt="Logo" />
        </a>
        <a href="index.html" class="white-logo">
        <img src="../../public/assets/img/logo-white.png" alt="Logo" />
        </a>
        <a href="index.html" class="logo logo-small">
        <img
            src="../../public/assets/img/logo-small.png"
            alt="Logo"
            width="30"
            height="30"
        />
        </a>
    </div>

    <ul class="nav nav-tabs user-menu">
        <li class="nav-item dropdown has-arrow flag-nav">
        <a
            class="nav-link dropdown-toggle"
            data-bs-toggle="dropdown"
            href="#"
            role="button"
        >
            <img
            src="../../public/assets/img/flags/us.png"
            alt=""
            height="20"
            />
            <span>English</span>
        </a>
        <div class="dropdown-menu dropdown-menu-right">
            <a href="javascript:void(0);" class="dropdown-item">
            <img
                src="../../public/assets/img/flags/us.png"
                alt=""
                height="16"
            />
            English
            </a>
            <a href="javascript:void(0);" class="dropdown-item">
            <img
                src="../../public/assets/img/flags/fr.png"
                alt=""
                height="16"
            />
            French
            </a>
            <a href="javascript:void(0);" class="dropdown-item">
            <img
                src="../../public/assets/img/flags/es.png"
                alt=""
                height="16"
            />
            Spanish
            </a>
            <a href="javascript:void(0);" class="dropdown-item">
            <img
                src="../../public/assets/img/flags/de.png"
                alt=""
                height="16"
            />
            German
            </a>
        </div>
        </li>

        <li class="nav-item dropdown has-arrow main-drop">
        <a
            href="#"
            class="dropdown-toggle nav-link"
            data-bs-toggle="dropdown"
        >
            <span class="user-img">
            <img
                src="../../public/assets/img/profiles/avatar-01.jpg"
                alt=""
            />
            <span class="status online"></span>
            </span>
            <span>Admin</span>
        </a>
        <div class="dropdown-menu">
            <router-link to="" @click.prevent="logout" class="dropdown-item"
            ><i data-feather="log-out" class="me-1"></i> Logout</router-link
            >
        </div>
        </li>
    </ul>
    </div>

    <div class="sidebar" id="sidebar">
    <div class="sidebar-inner slimscroll">
        <div id="sidebar-menu" class="sidebar-menu">
        <ul>
            <li class="menu-title"><span>Main</span></li>
            <li>
            <router-link to="/categories"><i class="fa-sharp fa-solid fa-boxes-stacked"></i> <span>Category</span></router-link>
            </li>
            <li>
            <router-link to="/products"><i class="fa-brands fa-product-hunt"></i> <span>Products</span></router-link>
            </li>
        </ul>
        </div>
    </div>
    </div>
</div>
</template>

<script>
export default {
    name: "SideBar",
    methods:{
        logout(){
            localStorage.clear();
            this.$router.push({name:'Login'});
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
