<template>
  <form action="">
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Anschreiben</p>
      </header>
      <section class="modal-card-body">
        <b-field>
          <b-select
            v-model="person"
            required expanded
            placeholder="Person">
            <option>{{ users[0] }}</option>
            <option>{{ users[1] }}</option>
          </b-select>
        </b-field>

        <b-field label="bekommt">
          <b-input size="is-medium"
                   type="number"
                   step="0.01"
                   min="0"
                   placeholder="0,00"
                   v-model="money"
                   icon="euro_symbol"
                   required expanded></b-input>
        </b-field>
        
        <b-field label="für">
          <b-input size="is-medium"
                   placeholder="z.B. Kackpappe"
                   v-model="reason"
                   expanded>          
          </b-input>
        </b-field>
      </section>
      <footer class="modal-card-foot">
        <button class="button" type="button" @click="$parent.close()">Zurück</button>
        <button class="button is-primary">Ab dafür!</button>
      </footer>
    </div>
  </form>
</template>

<script>
 export default {
   name: 'debtModal',
   props: ['users'],
   data () {
     return {
       person: null,
       money: null,
       reason: null
     }
   }
 }
</script>

<style scoped>
 .modal-card {
   width: auto;
 }
</style>
