<template>
  <div class="card mb-4">
    <SoftAlert v-if="successAdd" :icon="'fas fa-check'" :color="'success'" :dismissible="true">
      Freelancer Added Success
    </SoftAlert>
    <div class="card-header d-flex pb-0">
      <h6>Freelancers <span v-if="total !== 0">({{ total }})</span></h6>
      <a class="btn btn-link text-dark ms-auto mb-0" @click="addModal = !addModal">
        <i class="fas fa-plus text-dark me-2" aria-hidden="true"></i>Add Freelancer
      </a>
    </div>
    <!-- Modal -->
    <div class="modal" :class="{ 'd-block': addModal }" tabindex="-1" role="dialog" @click="addModal = !addModal">
      <div class="modal-dialog modal-dialog-centered" role="document" @click.stop>
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Add Freelancer</h5>
            <button type="button" class="btn btn-sm close" @click="addModal = !addModal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <SoftAlert v-if="failAdd" :icon="'fas fa-times'" :color="'danger'">
              {{ errorMessage }}
            </SoftAlert>
            <div class="form-group">
              <label for="formGroupExampleInput">Freelancer Name<span
                  style="color:red;margin-right: 5px;">*</span></label>
              <input type="text" class="form-control" placeholder="Freelancer Name" v-model="username">
            </div>
            <div class="form-group">
              <label for="exampleFormControlInput1">Email address<span
                  style="color:red;margin-right: 5px;">*</span></label>
              <input type="email" class="form-control" placeholder="name@example.com" v-model="email">
            </div>
            <div class="form-group">
              <label for="formGroupExampleInput">Contact Number<span
                  style="color:red;margin-right: 5px;">*</span></label>
              <input type="text" class="form-control" placeholder="Example input" v-model="phone_num">
            </div>
            <div class="form-group">
              <label for="formGroupExampleInput">Skill Sets</label>
              <input type="text" class="form-control" placeholder="Example input" v-model="skillsets">
            </div>
            <div class="form-group">
              <label for="formGroupExampleInput">Hobby</label>
              <input type="text" class="form-control" placeholder="Example input" v-model="hobby">
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" :disabled="isLoading" @click="addFreelancer">Submit</button>
            <button type="button" class="btn btn-secondary" :disabled="isLoading" @click="clearAddModal">Close</button>
          </div>
        </div>
      </div>
    </div>
    <!-- ###Modal### -->
    <!-- Edit Modal -->
    <div class="modal" :class="{ 'd-block': editModal }" tabindex="-1" role="dialog" @click="editModal = !editModal">
      <div class="modal-dialog modal-dialog-centered" role="document" @click.stop>
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Edit Freelancer</h5>
            <button type="button" class="btn btn-sm close" @click="editModal = !editModal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <SoftAlert v-if="failEdit" :icon="'fas fa-times'" :color="'danger'">
              {{ errorMessage }}
            </SoftAlert>
            <div class="form-group">
              <label for="formGroupExampleInput">Freelancer Name<span
                  style="color:red;margin-right: 5px;">*</span></label>
              <input type="text" class="form-control" placeholder="Freelancer Name" v-model="editData.username">
            </div>
            <div class="form-group">
              <label for="exampleFormControlInput1">Email address<span
                  style="color:red;margin-right: 5px;">*</span></label>
              <input type="email" class="form-control" placeholder="name@example.com" v-model="editData.email">
            </div>
            <div class="form-group">
              <label for="formGroupExampleInput">Contact Number<span
                  style="color:red;margin-right: 5px;">*</span></label>
              <input type="text" class="form-control" placeholder="Example input" v-model="editData.phone_num">
            </div>
            <div class="form-group">
              <label for="formGroupExampleInput">Skill Sets</label>
              <input type="text" class="form-control" placeholder="Example input" v-model="editData.skillsets">
            </div>
            <div class="form-group">
              <label for="formGroupExampleInput">Hobby</label>
              <input type="text" class="form-control" placeholder="Example input" v-model="editData.hobby">
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" :disabled="isLoading" @click="updateFreelancer">Update</button>
            <button type="button" class="btn btn-secondary" :disabled="isLoading" @click="clearEditModal">Close</button>
          </div>
        </div>
      </div>
    </div>
    <!-- ###Edit Modal### -->

    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center mb-0">
          <thead>
            <tr>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                Freelancer
              </th>
              <th class="text-end text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                Contact
              </th>
              <th class="text-secondary opacity-7" style="max-width: 100px;"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(freelancer, index) in freelancerList" :key="index">
              <td>
                <div class="d-flex px-2 py-1">
                  <div>
                    <soft-avatar :img="img1" size="sm" border-radius="lg" class="me-3" alt="user1" />
                  </div>
                  <router-link :to="{ name: 'Freelancer Profile', params: { id: freelancer._id } }">
                    <div class="d-flex flex-column justify-content-center">
                      <h6 class="mb-0 text-sm">{{ freelancer.username }}</h6>
                      <p class="text-xs text-secondary mb-0">
                        {{ freelancer.email }}
                      </p>
                    </div>
                  </router-link>
                </div>
              </td>
              <td class="align-middle text-end text-sm">
                <a :href="'http://wa.me/' + freelancer.phone_num" target="_blank" rel="noopener noreferrer">
                  <soft-badge class="me-2" color="success" variant="gradient" size="sm">WhatApps</soft-badge>
                </a>
                <a :href="'mailto:' + freelancer.email" target="_blank" rel="noopener noreferrer">
                  <soft-badge color="info" variant="gradient" size="sm">Email</soft-badge>
                </a>
              </td>
              <td class="align-middle text-end">
                <a class="btn btn-link text-dark px-3 mb-0" @click="editFreelancer(freelancer)">
                  <i class="fas fa-pencil-alt text-dark me-2" aria-hidden="true"></i>Edit
                </a>
                <div class="btn btn-link text-danger text-gradient px-3 mb-0" @click="confirmDelete(freelancer)">
                  <i class="far fa-trash-alt me-2" aria-hidden="true"></i>Delete
                </div>
              </td>
            </tr>


          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import SoftAvatar from "@/components/SoftAvatar.vue";
import SoftAlert from "@/components/SoftAlert.vue";
import SoftBadge from "@/components/SoftBadge.vue";
import img1 from "@/assets/img/bruce-mars.jpg";
import img2 from "@/assets/img/team-3.jpg";
import img3 from "@/assets/img/team-4.jpg";
import img4 from "@/assets/img/team-3.jpg";
import img5 from "@/assets/img/team-2.jpg";
import img6 from "@/assets/img/team-4.jpg";
import axios from "axios";
import Swal from 'sweetalert2';

export default {
  name: "authors-table",
  data() {
    return {
      img1,
      img2,
      img3,
      img4,
      img5,
      img6,
      addModal: false,
      editModal: false,
      username: '',
      email: '',
      phone_num: '',
      skillsets: [],
      hobby: [],
      successAdd: false,
      failAdd: false,
      failEdit:false,
      errorMessage: '',
      isLoading:false,
      editData:{
        username: '',
        email: '',
        phone_num: '',
        skillsets: [],
        hobby: [],
      }
    };
  },
  components: {
    SoftAvatar,
    SoftBadge,
    SoftAlert,
  },
  props: {
    freelancerList: [],
    total:{
      default:0,
    }
  },
  methods: {
    async addFreelancer() {
      this.failAdd = false;
      try {
        let data = {
          "username": this.username,
          "email": this.email,
          "phone_num": this.phone_num || [],
          "skillsets": this.skillsets || [],
          "hobby": this.hobby,
        };
        this.isLoading = true;
        const response = await axios.post('https://hibiki-freelancer-api.onrender.com/freelancers', data);

        if (response.status === 201) { // Check if the response is successful (status code 201)
          this.$emit('reload');
          this.addModal = false;
          Swal.fire("Success!", "Freelancer added successfully", "success");
        } else if (response.status === 400) {
          this.failAdd = true;
          this.errorMessage = response.data;
        } else {
          this.failAdd = true;
          this.errorMessage = 'Error adding freelancer';
        }
      } catch (error) {
        // Handle Axios error
        console.error('Error submitting data:', error);
        this.failAdd = true;
        this.errorMessage = 'Error submitting data: ' + error.request.responseText;
      } finally {
        this.isLoading = false;
      }
    },
    async deleteFreelancer(id) {
      try {
        this.isLoading = true;
        const response = await axios.delete('https://hibiki-freelancer-api.onrender.com/freelancers/'+id);
        console.log(response)
        if (response && response.status == 200) {
          this.$emit('reload');
          Swal.fire({
            title: 'Removed',
            text: response.data.data,
            icon: 'success',
            confirmButtonText: 'OK',
          })
        } else {
          console.error('Response data is undefined or does not have expected structure');
        }
      } catch (error) {
        // Handle Axios error
        console.error('Error submitting data:', error);
      } finally {
        this.isLoading = false;
      }
    },
    async updateFreelancer() {
      this.failEdit = false;
      try {
        let data = {
          "username": this.editData.username,
          "email": this.editData.email,
          "phone_num": this.editData.phone_num,
        };

        if (Array.isArray(this.editData.skillsets)) {
          data.skillsets = this.editData.skillsets;
        }

        // Conditionally include hobby if it exists and is a string
        if (typeof this.editData.hobby === 'string') {
          // Split the hobby string into an array using comma as separator
          data.hobby = this.editData.hobby.split(',');
        }

        this.isLoading = true;
        const response = await axios.put(`https://hibiki-freelancer-api.onrender.com/freelancers/${this.editData._id}`, data);
        if (response.status === 200) {
          this.$emit('reload');
          this.editModal = false;
          Swal.fire("Success!", "Freelancer updated successfully", "success");
        } else if (response.status === 400) {
          this.failEdit = true;
          this.errorMessage = response.data;
        } else {
          this.failEdit = true;
          this.errorMessage = 'Error editing freelancer';
        }
      } catch (error) {
        console.error('Error submitting data:', error);
        this.failAdd = true;
        this.errorMessage = 'Error submitting data: ' + error.request.responseText;
      } finally {
        this.isLoading = false;
      }
    },
    confirmDelete(freelancer){
      Swal.fire({
        title: 'Confirmation',
        html: `Do you sure you want to delete <b>${freelancer.username}</b>`,
        icon: 'warning', // Can be 'success', 'error', 'warning', 'info', 'question'
        confirmButtonText: 'Confirm',
        showCancelButton:true,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.deleteFreelancer(freelancer._id);
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
    },
    clearAddModal() {
      this.addModal = false;
      this.username = '';
      this.email = '';
      this.phone_num = '';
      this.skillsets = [];
      this.hobby = [];
      this.successAdd = false;
      this.failAdd = false;
    },
    clearEditModal() {
      this.editModal = false;
      this.editData.username = '';
      this.editData.email = '';
      this.editData.phone_num = '';
      this.editData.skillsets = [];
      this.editData.hobby = [];
    },
    editFreelancer(freelancer) {
      this.editModal = true;
      this.editData._id = freelancer._id;
      this.editData.username = freelancer.username;
      this.editData.email = freelancer.email;
      this.editData.phone_num = freelancer.phone_num;
      this.editData.skillsets = freelancer.skillsets;
      this.editData.hobby = freelancer.hobby;
    }
  },
};
</script>

<style scoped>
.modal{
  background-color: rgba(0,0,0,0.25);
  z-index: 9999;
}
</style>
