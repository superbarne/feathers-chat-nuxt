<template>
  <main id="chat" class="d-flex h-100 flex-column">
    <nav class="navbar navbar-dark bg-dark">
      <a class="navbar-brand" href="#">
        <img src="~assets/img/feathers.png" height="30" alt="Feathers Logo">
      </a>
    </nav>
    <div class="container-fluid col mt-3">
      <div class="row h-100" v-if="user">
        <div class="col-3">
          <user-list :users="users"
            :logout="logout" />
        </div>

        <message-list class="col-9" :messages="messages.data"
          :findMessages="findUsers"
          :createMessage="createMessage" />
      </div>
    </div>
  </main>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import UserList from '../components/Users'
import MessageList from '../components/Messages'

export default {
  name: 'chat-app',
  computed: {
    ...mapState('auth', [
      'user'
    ]),
    ...mapGetters('messages', {
      findMessagesInStore: 'find'
    }),
    ...mapGetters('users', {
      users: 'list'
    }),
    messages () {
      return this.findMessagesInStore({query: { $sort: {createdAt: 1} }})
    }
  },
  methods: {
    ...mapActions('messages', {
      findMessages: 'find',
      createMessage: 'create'
    }),
    ...mapActions('users', {
      findUsers: 'find'
    }),
    ...mapActions('auth', [
      'logout'
    ])
  },
  created () {
    if (!this.user) {
      return this.$router.replace({name: 'login'})
    }
    // Query users from Feathers
    this.findUsers({
      query: {
        $sort: {email: 1},
        $limit: 25
      }
    })
    // Query messages from Feathers
    this.findMessages({
      query: {
        $sort: {createdAt: -1},
        $limit: 25
      }
    })
  },
  components: {
    UserList,
    MessageList
  }
}
</script>

<style scoped>
main#chat {
  height: 100%;
}

/* Header */
header.title-bar {
  padding: 10px 0;
  border-bottom: 1px solid #f1f1f1;
}

header.title-bar img.logo {
  width: 100%;
  max-width: 140px;
}

header.title-bar span.title {
  color: #969696;
  font-weight: 100;
  text-transform: uppercase;
  font-size: 1.2em;
  margin-left: 7px;
}
</style>
