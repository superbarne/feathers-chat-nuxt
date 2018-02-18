<template>
  <div class="p-3 bg-white rounded box-shadow">
    <h6 class="border-bottom border-gray pb-2 mb-0"><span class="font-600 online-count">{{ users.length }}</span> {{plural}}</h6>
    <div class="media text-muted pt-3" v-for="user in users" :key="user.id">
      <img :src="user.avatar" style="width: 32px; height: 32px;" class="mr-2 rounded">
      <div class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
        <div class="d-flex justify-content-between align-items-center w-100">
          <strong class="text-gray-dark">{{ user._id }}</strong>
        </div>
        <span class="d-block">{{ user.email }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'user-list',
  computed: {
    plural () {
      return this.users.length === 1 ? 'user' : 'users'
    }
  },
  props: {
    users: Array,
    logout: Function
  }
}
</script>

<style>
</style>
