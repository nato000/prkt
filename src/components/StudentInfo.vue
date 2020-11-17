<template>
  <div class="container">
    <h5>    </h5>
    <br>
    <table class="table table-hover table-bordered table-dark ">
      <th>
        <td class="col-sm-1">
        <img
          height="100"
          width="100"
          v-bind:src="student.photo"
          id="show-modal"
          @click="showModal = true"
        />
        
        <modal v-if="showModal" @close="showModal = false">
          <div slot="body"><img v-bind:src="student.photo" @click="$emit('close')"></div>
        </modal>
      </td>
      </th>
      <td>
        <tr>
          {{
            student.name
          }}
        </tr>
        <tr>
          Група:
          {{
            student.group
          }}
        </tr>
          <tr>
          Cдал:
          {{
            student.isDonePr
          }}
        </tr>

        
      </td>
    </table>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import modal from "./modal.vue";

Vue.use(VueAxios, axios);

export default {
  components: {
    modal,
  },
  props: {
    id: "",
  },
  data: function () {
    return {
      student: {},
      showModal: false,
    };
  },
   computed: {
    getCount() {
      return this.$store.getters.getCount;
    },   
  },
  mounted: function () {
    Vue.axios
      .get("http://46.101.212.195:3000/students/" + this.id)
      .then((response) => {
        console.log(response.data);
        this.student = response.data;
      });
  },
};
</script>
