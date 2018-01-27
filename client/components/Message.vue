<template>
  <div class="message flex flex-row">
    <img :src="message.user.avatar || placeholder" :alt="message.user.email" class="avatar">
    <div class="message-wrapper">
      <p class="message-header">
        <span class="username font-600">{{ message.user.email }}</span>
        <span class="sent-date font-300">{{ formattedDate }}</span>
      </p>
      <p class="message-content font-300">{{ message.text }}</p>
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
