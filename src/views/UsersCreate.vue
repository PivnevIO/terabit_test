<template>
  <div>
    <h1>{{$route.name}}</h1>
    <form @submit="createUser">
      <div class="form-item">
        <label for="email">Email: </label>
        <input type="email" name="email" v-model="email" placeholder="Email" pattern=".+@*\.*" required>
      </div>
      <div class="form-item">
        <label for="first_name">First name: </label>
        <input type="text" name="first_name" v-model="first_name" placeholder="First name" required>
      </div>
      <div class="form-item">
        <label for="last_name">Last name: </label>
        <input type="text" name="last_name" v-model="last_name" placeholder="Last name" required>
      </div>
      <div class="form-item">
        <button>Добавить</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref, Ref } from 'vue';
import { useStore } from '@/store';
import { Users } from '@/models/api';
import router from '@/router';

const store = useStore();

const email: Ref<string> = ref("")
const first_name: Ref<string> = ref("")
const last_name: Ref<string> = ref("")

const createUser = (): void => {
  const userData: Users = {
    email: email.value,
    first_name: first_name.value,
    last_name: last_name.value,
  };
  store.dispatch('createUser', userData);
  router.push('/')
}
</script>

<style lang="scss">
.form-item{
  display: flex;
  align-items: center;
  margin-bottom: 1em;
  label{
    min-width: 8em;
  }
}
</style>