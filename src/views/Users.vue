<template>
  <div>
    <h1>{{$route.name}}</h1>
    <div class="user-info" v-if="userInfo">
      <img :src="userInfo.avatar">
      <div class="info">
        <p>First name: {{userInfo.first_name}}</p>
        <p>Last name: {{userInfo.last_name}}</p>
        <p>email: <a class="email" :href="`mailto:${userInfo.email}`">{{userInfo.email}}</a></p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import router from '@/router';
import { useStore } from '@/store'
import { ComputedRef, computed } from 'vue';

const store = useStore();
store.dispatch('fetchSingleUser', router.currentRoute.value.params.id);

const userInfo: ComputedRef = computed(() => store.getters.singleUser);

</script>

<style lang="scss" scoped>
.user-info{
  display: flex;
  align-items: center;
  .info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 1em;
    .user-email {
      font-size: 0.75rem;
      color: rgba(204, 204, 204, 0.561)
    }
    a{
      color: #ccc;
      text-decoration: none;
      transition: 0.3s;
      &:hover{
        color: #66ccff;
      }
    }
  }
}
</style>