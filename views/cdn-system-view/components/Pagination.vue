<template>
    <div>
      <ul class="pagination">
        <li class="page-item" :class="{ 'disabled': currentPage === 1 }">
          <a class="page-link" :class="{ 'bg-light': currentPage === 1 }" href="#" @click="prevPage">
            <i class="fas fa-chevron-left"></i></a>
        </li>
        <li v-for="pageNumber in totalPages" :key="pageNumber" class="page-item" :class="{ 'active': currentPage === pageNumber }">
          <a class="page-link" href="#" @click="gotoPage(pageNumber)">{{ pageNumber }}</a>
        </li>
        <li class="page-item" :class="{ 'disabled': currentPage === totalPages }">
          <a class="page-link" href="#" @click="nextPage">
            <i class="fas fa-chevron-right"></i></a>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      currentPage: {
        type: Number,
        required: true
      },
      total: {
        type: Number,
        required: true
      },
      perPage: {
        type: Number,
        required: true
      }
    },
    computed: {
      totalPages() {
        return Math.ceil(this.total / this.perPage);
      }
    },
    methods: {
      handlePageChange(page) {
        this.$emit('update:currentPage', page);
      },
      prevPage() {
        if (this.currentPage > 1) {
          this.handlePageChange(this.currentPage - 1);
        }
      },
      nextPage() {
        if (this.currentPage < this.totalPages) {
          this.handlePageChange(this.currentPage + 1);
        }
      },
      gotoPage(pageNumber) {
        if (pageNumber >= 1 && pageNumber <= this.totalPages) {
          this.handlePageChange(pageNumber);
        }
      }
    }
  };
  </script>
  