<template>
  <div v-if="isLoading" class="container-fluid">
    <div class="mt-5">
      Loading...
    </div>
  </div>
  <div v-if="!isLoading" class="container-fluid">
    <div class="mt-4 page-header min-height-300 border-radius-xl" :style="{
      backgroundImage:
        'url(' + require('@/assets/img/curved-images/curved14.jpg') + ')',
      backgroundPositionY: '50%',
    }">
      <span class="mask bg-gradient-success opacity-6"></span>
    </div>
    <div class="mx-4 overflow-hidden card card-body blur shadow-blur mt-n6">
      <div class="row gx-4">
        <div class="col-auto">
          <div class="avatar avatar-xl position-relative">
            <img src="@/assets/img/bruce-mars.jpg" alt="profile_image" class="shadow-sm w-100 border-radius-lg" />
          </div>
        </div>
        <div class="col-auto my-auto">
          <div class="h-100">
            <h5 class="mb-1">{{ userDetail.username }}</h5>
            <p class="mb-0 text-sm font-weight-bold">Developer</p>
          </div>
        </div>
        <div class="mx-auto mt-3 col-lg-4 col-md-6 my-sm-auto ms-sm-auto me-sm-0">
        </div>
      </div>
    </div>
  </div>
  <div v-if="!isLoading" class="py-4 container-fluid">
    <div class="mt-3 row">
      <div class="mt-4 col-12 col-md-6 col-xl-4 mt-md-0">
        <profile-info-card title="Profile Information"
          :description="'Hi, I’m ' + userDetail.username + ', Decisions: If you can’t decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality).'"
          :info="{
          fullName: userDetail.username,
          mobile: userDetail.phone_num,
          email: userDetail.email,
          location: 'Malaysia',
        }" :social="[
      {
        link: 'https://www.facebook.com/',
        icon: faFacebook,
      },
      {
        link: 'https://twitter.com/',
        icon: faTwitter,
      },
      {
        link: 'https://www.instagram.com/',
        icon: faInstagram,
      },
    ]"/>
      </div>
      <div class="mt-4 col-12 col-md-6 col-xl-8 mt-md-0">
        <skill-set-card title="Skill Sets Information" :userDetail="userDetail"/>
      </div>
    </div>
    <div class="mt-4 row">
      <div class="col-12">
        <div class="mb-4 card">
          <div class="p-3 pb-0 card-header">
            <h6 class="mb-1">Projects</h6>
            <p class="text-sm">Architects design houses</p>
          </div>
          <div class="p-3 card-body">
            <div class="row">
              <default-project-card title="Modern" :image="img1" label="Project #2" description="As Uber works through a huge amount of internal
                management turmoil." :authors="[
      {
        image: team1,
        name: 'Elena Morison',
      },
      {
        image: team2,
        name: 'Ryan Milly',
      },
      {
        image: team3,
        name: 'Nick Daniel',
      },
      {
        image: team4,
        name: 'Peterson',
      },
    ]" :action="{
      color: 'success',
      label: 'View Project',
    }" />

              <default-project-card title="Scandinavian" :image="img2" label="Project #1" description="Music is something that every person has his or her own
                      specific opinion about." :authors="[
      {
        image: team3,
        name: 'Nick Daniel',
      },
      {
        image: team4,
        name: 'Peterson',
      },
      {
        image: team1,
        name: 'Elena Morison',
      },
      {
        image: team2,
        name: 'Ryan Milly',
      },
    ]" :action="{
      color: 'success',
      label: 'View Project',
    }" />

              <default-project-card title="Minimalist" :image="img3" label="Project #3" description="Different people have different taste, and various types
                      of music." :authors="[
      {
        image: team4,
        name: 'Peterson',
      },
      {
        image: team3,
        name: 'Nick Daniel',
      },
      {
        image: team1,
        name: 'Elena Morison',
      },
      {
        image: team2,
        name: 'Ryan Milly',
      },
    ]" :action="{
      color: 'success',
      label: 'View Project',
    }" />

              <div class="mb-4 col-xl-3 col-md-6 mb-xl-0">
                <place-holder-card :title="{ text: 'New project', variant: 'h5' }" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProfileInfoCard from "./components/ProfileInfoCard.vue";
import SkillSetCard from "./components/SkillSetHobbyCard.vue";
import img1 from "@/assets/img/home-decor-1.jpg";
import img2 from "@/assets/img/home-decor-2.jpg";
import img3 from "@/assets/img/home-decor-3.jpg";
import team1 from "@/assets/img/team-1.jpg";
import team2 from "@/assets/img/team-2.jpg";
import team3 from "@/assets/img/team-3.jpg";
import team4 from "@/assets/img/team-4.jpg";
import {
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import DefaultProjectCard from "./components/DefaultProjectCard.vue";
import PlaceHolderCard from "@/examples/Cards/PlaceHolderCard.vue";
import setNavPills from "@/assets/js/nav-pills.js";
import setTooltip from "@/assets/js/tooltip.js";
import axios from "axios";

export default {
  name: "Freelancer Profile",
  components: {
    ProfileInfoCard,
    DefaultProjectCard,
    PlaceHolderCard,
    SkillSetCard,
  },
  data() {
    return {
      showMenu: false,
      img1,
      team1,
      team2,
      team3,
      team4,
      img2,
      img3,
      faFacebook,
      faTwitter,
      faInstagram,
      isLoading:true,
      userDetail: {
        username: "Eric Pang",
        email: "yue-555@hotmail.com",
        phone_num: "0123456789",
        skillsets: ["html", "node"],
        hobby: ["hear music", "playing apex"]
      }
    };
  },
  mounted() {
    this.$store.state.isAbsolute = true;
    setNavPills();
    setTooltip(this.$store.state.bootstrap);
  },
  beforeUnmount() {
    this.$store.state.isAbsolute = false;
  },
  created() {
    this.getFreelancerDetail();
  },
  methods: {
    async getFreelancerDetail() {
      const id = this.$route.params.id;
      try {
        this.isLoading = true;

        const response = await axios.get(`https://hibiki-freelancer-api.onrender.com/freelancers/${id}`);

        if (response && response.data.data) {
          console.log(response)
          this.userDetail = response.data.data;
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
    handlePageChange(page) {
      this.currentPage = page;
    }
  },
};
</script>
