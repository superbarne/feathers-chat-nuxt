<template>
  <div class="signin-wrapper">
    <form class="form-signin" method="post" @submit.prevent="onSubmit(email, password)">
      <div class="text-center mb-4">
        <img class="mb-4" src="http://feathersjs.com/img/feathers-logo-wide.png" alt="" width="100%">
        <div class="alert alert-danger" role="alert" v-if="error">
          {{error.message}}
          <button @click.prevent="dismissError"  type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </div>
      </div>
      
      <div class="form-label-group">
        <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required="" autofocus="" v-model="email">
        <label for="inputEmail">Email address</label>
      </div>

      <div class="form-label-group">
        <input type="password" id="inputPassword" class="form-control" placeholder="Password" required="" v-model="password">
        <label for="inputPassword">Password</label>
      </div>

      <button class="btn btn-lg btn-primary btn-block" type="submit">Login</button>

      <div class="text-center p-3">
        <router-link as="button" :to="{name: 'index'}" class="button button-secondary block">Back</router-link>
      </div>
    </form>
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'

export default {
  data () {
    return {
      email: undefined,
      password: undefined,
      error: undefined
    }
  },
  methods: {
    dismissError () {
      this.error = undefined
      this.clearAuthenticateError()
    },

    onSubmit (email, password) {
      this.authenticate({strategy: 'local', email, password})
        // Just use the returned error instead of mapping it from the store.
        .catch(error => {
          // Convert the error to a plain object and add a message.
          let type = error.className
          error = Object.assign({}, error)
          error.message = (type === 'not-authenticated')
            ? 'Incorrect email or password.'
            : 'An error prevented login.'
          this.error = error
        })
        .then(() => {
          return this.$router.replace({name: 'chat'})
        })
    },
    ...mapMutations('auth', {
      clearAuthenticateError: 'clearAuthenticateError'
    }),
    ...mapActions('auth', ['authenticate'])
  }
}
</script>

<style>
  :root {
    --input-padding-x: .75rem;
    --input-padding-y: .75rem;
  }

  .signin-wrapper {
    height: 100%;
    display: -ms-flexbox;
    display: -webkit-box;
    display: flex;
    -ms-flex-align: center;
    -ms-flex-pack: center;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    padding-top: 40px;
    padding-bottom: 40px;
    background-color: #f5f5f5;
  }

  .form-signin {
    width: 100%;
    max-width: 420px;
    padding: 15px;
    margin: 0 auto;
  }

  .form-label-group {
    position: relative;
    margin-bottom: 1rem;
  }

  .form-label-group > input,
  .form-label-group > label {
    padding: var(--input-padding-y) var(--input-padding-x);
  }

  .form-label-group > label {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    margin-bottom: 0; /* Override default `<label>` margin */
    line-height: 1.5;
    color: #495057;
    border: 1px solid transparent;
    border-radius: .25rem;
    transition: all .1s ease-in-out;
  }

  .form-label-group input::-webkit-input-placeholder {
    color: transparent;
  }

  .form-label-group input:-ms-input-placeholder {
    color: transparent;
  }

  .form-label-group input::-ms-input-placeholder {
    color: transparent;
  }

  .form-label-group input::-moz-placeholder {
    color: transparent;
  }

  .form-label-group input::placeholder {
    color: transparent;
  }

  .form-label-group input:not(:placeholder-shown) {
    padding-top: calc(var(--input-padding-y) + var(--input-padding-y) * (2 / 3));
    padding-bottom: calc(var(--input-padding-y) / 3);
  }

  .form-label-group input:not(:placeholder-shown) ~ label {
    padding-top: calc(var(--input-padding-y) / 3);
    padding-bottom: calc(var(--input-padding-y) / 3);
    font-size: 12px;
    color: #777;
  }
</style>
