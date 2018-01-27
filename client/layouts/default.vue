<template>
  <nuxt/>
</template>

<script>
import MyFooter from '~/components/Footer.vue'

export default {
  components: {
    MyFooter
  },
  computed: {
    // The user is automatically set by the feathers-vuex auth module upon login.
    user () {
      return this.$store.state.auth.user
    }
  },
  watch: {
    // When the user is set, redirect to the Chat page.
    user (newVal) {
      if (newVal === undefined) {
        this.$router.replace({name: 'Login'})
      } else {
        this.$router.replace({name: 'Chat'})
      }
    }
  },
  async fetch () {
    await this.$store.dispatch('auth/authenticate').catch(error => {
      if (!error.message.includes('Could not find stored JWT')) {
        console.error(error)
      }
    })
  }
}
</script>

<style>


</style>
