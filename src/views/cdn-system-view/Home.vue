<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div v-if="isLoading">
        <div class="loader">Loading...</div>
      </div>
      <div class="col-12" v-if="!isLoading">
        <FreelancerTable :total="total" :freelancerList="freelancerList" @reload="getFreelancerList" />
      </div>
      <div  v-if="!isLoading" class="col-12 text-end d-flex justify-content-end">
        <Pagination :currentPage="currentPage" :total="total" :perPage="perPage" @update:currentPage="handlePageChange" />
      </div>
    </div>
  </div>
</template>

<script>
import FreelancerTable from "./components/FreelancerTable";
import Pagination from "./components/Pagination";
import axios from "axios";

export default {
  name: "tables",
  components: {
    FreelancerTable,
    Pagination
  },
  data() {
    return {
      isLoading:true,
      currentPage: 1,
      perPage: 5,
      total: 0,
      totalPages: 0,
      freelancerList: [],
    }
  },
  created() {
    this.getFreelancerList();
  },
  methods: {
    async getFreelancerList() {
      try {
        this.isLoading = true;
        let queryParams = {
          page: this.currentPage,
          perPage: this.perPage,
        };

        const response = await axios.get('https://hibiki-freelancer-api.onrender.com/freelancers', {
          params: queryParams
        });

        if (response && response.data.data) {
          this.freelancerList = response.data.data;
          this.total = response.data.pagination.totalItems;
          this.totalPages = response.data.pagination.totalPages;
        } else {
          console.error('Response data is undefined or does not have expected structure');
        }
      } catch (error) {
        // Handle Axios error
        console.error('Error submitting data:', error);
      }finally{
        this.isLoading = false;
      }
    },
    handlePageChange(page) {
      this.currentPage = page; 
    }
  },
  watch: {
    currentPage() {
      this.getFreelancerList();
    }
  }

};
</script>
