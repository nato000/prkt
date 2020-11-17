<template>
  <div class="container">
    <div v-bind:class="this.$store.getters.getCurrentstyle">
      <input type="radio" value="style1" v-model="style" />Стиль_1
      <button class="btn btn-dark" @click="CurrStyle">Стиль</button>
      <input type="radio" value="style2" v-model="style" />Стиль_2 <br />
      <br>
      <h5>Количество: {{ getCount }}</h5>
      <br>
      <form>
        <h4>Добавить:</h4>
        <input v-model="student.name" placeholder="Ф.И.О." />
        <select v-model="student.group">
          <option value="РПЗ 17 1/9">РПЗ 17 1/9</option>
          <option value="РПЗ 17 2/9">РПЗ 17 2/9</option>
        </select>
        <input type="checkbox" v-model="student.isDonePr" />
        <button class="btn btn-primary" id="post" @click="addStudent()">
          Добавить
        </button>
      </form>
      <template>
        <tr v-for="student in students" :key="student._id">
          <template v-if="student._id === editId">
            <input v-model="student.name" value="student.name" />
            <select v-model="student.group" value="student.group">
              <option value="РПЗ 17 1/9">РПЗ 17 1/9</option>
              <option value="РПЗ 17 2/9">РПЗ 17 2/9</option>
            </select>
            <input
              type="checkbox"
              v-model="student.isDonePr"
              value="student.isDonePr"
            />
            <button class="btn btn-success" @click="editStudent(editId)">
              Обновить
            </button>
          </template>
        </tr>
      </template>
      <br />

      <table class="table table-hover table-bordered table-dark ">
        <thead class="thead">
          <tr>
            <th scope="col">Фото</th>
            <th scope="col">Ф.И.О.</th>
            <th scope="col">Группа</th>
            <th scope="col">Сдал/Не сдал</th>
            <!-- <th scope="col">Видалити</th>
            <th scope="col">Редагувати</th>  -->
          </tr>
        </thead>

        <template>
          <tr v-for="student in students" :key="student._id">
            <td><img :src="student.photo" width="40" height="40" /></td>
            <td>
              <router-link :to="'/student-info/' + student._id">
                {{ student.name }}
              </router-link>
            </td>
            <td>{{ student.group }}</td>
            <td>
              <div v-if="student.isDonePr == true">
                <input type="checkbox" disabled checked="student.isDonePr" />
              </div>
              <div v-else><input type="checkbox" disabled /></div>
            </td>
         
            <td>
              <input
                type="button"
                class="btn btn-warning"
                @click="deleteStudent(student._id)"
                value="Удалить"
              />
            </td>
            <td>
              <input
                type="button"
                class="btn btn-info"
                @click.prevent="updateStudent(student._id)"
                value="Редактировать"
              />
            </td>
          </tr>
        </template>
      </table>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";

export default {
  data() {
    return {
      students: [],
      search: "",
      editId: "",
      student: { name: "", group: "", isDonePr: "false" },
      style: "",
    };
  },
  mounted: function () {
    axios.get("http://46.101.212.195:3000/students").then((response) => {
      console.log(response.data);
      this.students = response.data;
      this.$store.commit("setCount", this.students.length);
    });
  },
  computed: {
    getCount() {
      return this.$store.getters.getCount;
    },
  },
  methods: {
    CurrStyle: function () {
      this.$store.commit("setCurrentstyle", this.style);
    },
    deleteStudent(id) {
      axios
        .delete("http://46.101.212.195:3000/students/" + id, {})
        .then((response) => {
          this.students = this.students.filter((element) => {
            return element._id !== id;
          });
        });
    },
    addStudent() {
      axios
        .post("http://46.101.212.195:3000/students", this.student)
        .then((response) => {
          this.students.push(this.student);
          console.log(response.data);
        });
    },
    editStudent: function (id) {
      let searchstudent = this.students.find((element) => {
        return element._id == id;
      });

      axios
        .put("http://46.101.212.195:3000/students/" + id, {
          name: searchstudent.name,
          group: searchstudent.group,
          isDonePr: searchstudent.isDonePr,
        })
        .then((response) => {
          console.log(response.data);
        });
      this.editId = 0;
    },
    updateStudent: function (id) {
      this.editId = id;
    },
  },
};
</script>

<style>
</style>