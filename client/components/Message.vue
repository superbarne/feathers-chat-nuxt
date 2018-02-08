<template>
  <div class="message">
    <img :src="message.user.avatar || placeholder" :alt="message.user.email" class="avatar">
    <div class="message-wrapper">
      <p class="message-header">
        <span class="username">{{ message.user.email }}</span>
        <span class="sent-date">{{ formattedDate }}</span>
      </p>
      <p class="message-content">{{ message.text }}</p>
    </div>
  </div>
</template>

<script>

export default {
  props: ['message', 'index'],
  computed: {
    formattedDate () {
      return this.message.createdAt
    }
  }
}
</script>
