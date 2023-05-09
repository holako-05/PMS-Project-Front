import axios from 'axios';
import router from "@/router";
import authHeader from "@/services/authHeader";

const base_url = "http://localhost:10000/category/";

class CategoryService{
    listCategories(p_url, search){
        if(search){
            p_url = p_url + "&search=" + search;
        }
        return axios.get(base_url + "newList?" + p_url, {headers: authHeader()});
    }

    allCategories(){
        return axios.get(base_url, {headers: authHeader()})
    }

    addCategory(category){
        axios.post(base_url + "add", category, {headers: authHeader()})
            .then((res) => {
                console.log(res.data);
                router.push({path: '/categories'})
            }).catch(function (error){
            console.log(error);
        })
    }

    updateCategory(id, category){
        axios.put(base_url + "update/" + id, category, {headers: authHeader()})
            .then((res) => {
                console.log(res.data);
                router.push({path: '/categories'})
            }).catch(function (error){
            console.log(error)
        })
    }

    getCategory(id){
        return axios.get(base_url + "getCategory/" + id, {headers: authHeader()})
    }

    deleteCategory(id, data){
        return axios.put( base_url + "up-de/" + id, data, {headers: authHeader()})
    }

    counting(){
        return axios.get(base_url + "count", {headers: authHeader()});
    }
}

export default new CategoryService();
