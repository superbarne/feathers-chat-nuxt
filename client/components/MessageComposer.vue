<template>
  <form id="send-message" v-on:submit.prevent>
    <div class="input-group mb-3">
      <input type="text" name="text" class="form-control" v-model="newMessage">
      <div class="input-group-append">
        <button type="submit" @click="addMessage" class="btn btn-primary">Send</button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: 'MessageComposer',
  data () {
    return {
      newMessage: ''
    }
  },
  props: {
    createMessage: Function
  },
  methods: {
    addMessage () {
      // Create a new message and then clear the input field
      this.createMessage({text: this.newMessage}).then(this.clearMessage)
    },
    clearMessage () {
      this.newMessage = ''
    }
  }
}
</script>
