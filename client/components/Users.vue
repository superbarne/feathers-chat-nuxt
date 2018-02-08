<template>
  <aside class="sidebar">
    <header>
      <h4 class="font-300 text-center">
        <span class="font-600 online-count">{{ users.length }}</span> {{plural}}
      </h4>
    </header>
    <div class="media text-muted pt-3" v-for="user in users" :key="user.id">
      <img :src="user.avatar" class="mr-2 rounded" style="width: 32px; height: 32px;">
      <p class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
        <strong class="d-block text-gray-dark">{{ user.email }}</strong>
      </p>
    </div>
    <footer class="flex flex-row flex-center">
      <button class="logout button button-primary" @click="logout">Sign Out</button>
    </footer>
  </aside>
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
