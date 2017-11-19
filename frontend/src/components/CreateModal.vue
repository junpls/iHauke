<template>
  <form @submit.prevent="send">
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Neues Board</p>
      </header>
      <section class="modal-card-body">
        Board erstellen für
        <b-field grouped>
          <b-input size="is-normal"
                   type="text"
                   placeholder="z.B. Jörg"
                   v-model="users[0]"
                   required expanded></b-input>
          und&nbsp;
          <b-input size="is-normal"
                   type="text"
                   placeholder="Thorben"
                   v-model="users[1]"
                   required expanded></b-input>
        </b-field>
      </section>
      <footer class="modal-card-foot center-outer">
        <div class="center-inner">
          <button class="button" type="button" @click="$parent.close()">Zurück</button>
          <button class="button is-primary">Weiter</button>
        </div>
      </footer>
    </div>
  </form>
</template>

<script>
 export default {
   name: 'debtModal',
   props: ['submit'],
   data () {
     return {
       users: []
     }
   },
   methods: {
     send () {
       this.submit(this.users).then(() => {
         this.$parent.close()
       })
     }
   }
 }
</script>

<style scoped>
 .modal-card {
   width: auto;
 }
</style>
