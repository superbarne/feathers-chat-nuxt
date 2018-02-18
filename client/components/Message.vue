<template>
  <div class="card flex-md-row mb-4 box-shadow h-md-250">
    <img class="card-img-left flex-auto d-none d-md-block" :src="message.user.avatar" style="width:92px">
    <div class="card-body d-flex flex-column align-items-start">
      <div class="mb-1">{{ message.user.email }} <span class="text-muted">{{ formattedDate | moment('from', 'now') }}</span></div>
      <p class="card-text mb-auto">{{ message.text }}</p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'message',
  props: ['message'],
  computed: {
    formattedDate () {
      return new Date(this.message.createdAt)
    }
  }
}
</script>
