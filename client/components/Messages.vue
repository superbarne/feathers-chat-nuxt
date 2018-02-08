<template>
  <div>
    <main class="chat">
      <single-message v-for="message in messages" :key="message._id" :message="message" v-cloak />
    </main>
    <MessageComposer :createMessage="createMessage" />
  </div>
</template>

<script>
import SingleMessage from './Message.vue'
import MessageComposer from './MessageComposer.vue'

export default {
  name: 'message-list',
  data () {
    return {
      // TODO: Fix the placeholder
      placeholder: 'PLACEHOLDER'
    }
  },
  props: {
    messages: Array,
    findMessages: Function,
    createMessage: Function
  },
  methods: {
    scrollToBottom () {
      this.$nextTick(() => {
        const node = this.$el.getElementsByClassName('chat')[0]
        node.scrollTop = node.scrollHeight
      })
    }
  },
  watch: {
    messages () {
      this.messages.length && this.scrollToBottom()
    }
  },
  components: {
    MessageComposer,
    SingleMessage
  }
}
</script>

<style>
</style>
