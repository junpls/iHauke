<template>
  <form action="">
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Schulden begleichen</p>
      </header>
      <section class="modal-card-body">
        <b-field label="Schulden verringern um">
          <b-input size="is-medium"
                   type="number"
                   step="0.01"
                   placeholder="0,00"
                   v-model="money"
                   icon="euro_symbol"
                   required expanded></b-input>
        </b-field>
        <b-checkbox v-model="all">Alles komplett</b-checkbox>
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
