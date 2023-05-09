import axios from 'axios';
import router from "@/router";
import authHeader from "@/services/authHeader";

const base_url = "http://localhost:10000/product/";


class ProductService{

    listProducts(p_url, search){
        if(search){
            p_url = p_url + "&search=" + search;
        }
        return axios.get(base_url + "newList?" + p_url, {headers: authHeader()});
    }

    addProduct(formData){
        axios.post(base_url + "add", formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: "Bearer " + JSON.parse(localStorage.getItem("jwtToken")).token
            }
        }).then((res) => {
            console.log(res.data);
            router.push({ name:'Products' })
        }).catch(function (error){
            console.log(error);
        })
    }

    updateProduct(id, formData){
        axios.put(base_url + "update/" + id, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: "Bearer " + JSON.parse(localStorage.getItem("jwtToken")).token
            }
        }).then((res) => {
                console.log(res.data);
                router.push({path: '/products'})
            }).catch(function (error){
            console.log(error)
        })
    }

    getProduct(id){
        return axios.get(base_url + "getProduct/" + id, {headers: authHeader()})
    }

    deleteProduct(id, data){
        return axios.put(base_url + "update-delete/" + id, data, {headers: authHeader()})
    }

    counting(){
        return axios.get(base_url + "count", {headers: authHeader()});
    }

}

export default new ProductService();
