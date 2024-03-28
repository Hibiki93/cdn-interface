<template>
  <div class="card h-100">
    <div class="p-3 pb-0 card-header">
      <div class="row">
        <div class="col-md-8 d-flex align-items-center">
          <h6 class="mb-0">{{ title }}</h6>
        </div>
      </div>
    </div>
    <div class="p-3 card-body">
      <ul class="list-group">
        <li class="pb-0 border-0 list-group-item ps-0">
          <strong class="text-sm text-dark">Skill:</strong> &nbsp;
          <a
            v-for="(skill, index) of userDetail.skillsets"
            :key="index"
            class="py-0 mb-0 btn-simple ps-1 pe-2"
          >
          <i class="mx-2" :class="getIcon(skill)"></i>{{skill}}
          </a>
        </li>
        <li class="pb-0 border-0 list-group-item ps-0">
          <strong class="text-sm text-dark">Hobby:</strong> &nbsp;
          <a
            v-for="(hobby, index) of userDetail.hobby"
            :key="index"
            class="py-0 mb-0 btn-simple ps-1 pe-2"
          >
            {{hobby}}
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileInfoCard",
  props: {
    title: {
      type: String,
      default: "",
    },
    userDetail:{
      type:Object,
      required: true,
    },
    social: {
      type: Array,
      link: String,
      icon: String,
      default: () => [],
    },
    action: {
      type: Object,
      route: String,
      tooltip: String,
      default: () => ({
        route: "javascript:;",
      }),
    },
  },
  computed: {
  getIcon() {
    return function(skill) {
      console.log('Skill:', skill); // Check if skill is received correctly
      const skillIcons = {
        html: 'fab fa-html5',
        css: 'fab fa-css3-alt',
        javascript: 'fab fa-js',
        nodejs: 'fab fa-node-js',
        vuejs: 'fab fa-vuejs',
        // Add more skill mappings as needed
      };

      // Check if the skill exists in the skillIcons object
      if (Object.prototype.hasOwnProperty.call(skillIcons, skill)) {
        // Return the corresponding Font Awesome icon class
        return skillIcons[skill];
      } else {
        // If the skill doesn't have a specific icon, return a default icon
        return 'fas fa-code'; // For example, use a code icon as default
      }
    };
  }
}

};
</script>
