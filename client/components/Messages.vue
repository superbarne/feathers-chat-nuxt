<template>
  <div class="d-flex flex-column">
    <main class="chat col">
      <message v-for="message in messages" :key="message._id" :message="message" v-cloak />
    </main>
    <MessageComposer :createMessage="createMessage" class=""/>
  </div>
</template>

<script>
import Message from './Message.vue'
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
    Message
  }
}
</script>

<style>
  .chat {
    overflow-y: scroll;
  }
</style>
