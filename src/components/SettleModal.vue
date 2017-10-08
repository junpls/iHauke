<template>
  <form @submit.prevent="send">
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Schulden begleichen</p>
      </header>
      <section class="modal-card-body">
        <b-field label="Schulden verringern um">
          <b-input size="is-medium"
                   type="number"
                   step="0.01"
                   :min="min"
                   :max="Math.abs(balance/100)"
                   placeholder="0,00"
                   v-model="money"
                   icon="euro_symbol"
                   ref="input"
                   :disabled="disabled"
                   required expanded></b-input>
        </b-field>
        <b-checkbox @change="all" :disabled="disabled">Alles komplett</b-checkbox>
      </section>
      <footer class="modal-card-foot center-outer">
        <div class="center-inner">
          <button class="button" type="button" @click="$parent.close()" :disabled="disabled">Zurück</button>
          <button class="button is-primary" :disabled="disabled">Ab dafür!</button>
        </div>
      </footer>
    </div>
  </form>
</template>

<script>
 export default {
   name: 'debtModal',
   props: ['balance', 'submit'],
   data () {
     return {
       money: null,
       min: 0,
       disabled: false
     }
   },
   methods: {
     all (event) {
       if (event) {
         this.money = Math.abs(this.balance / 100)
         this.min = this.money
       } else {
         this.min = 0
       }
     },
     send () {
       this.disabled = true
       let person = this.balance > 0 ? 0 : 1
       let balance = -Math.abs(this.money) * 100
       this.submit(person, balance).then(() => {
         this.$parent.close()
       })
     }
   }
 }
</script>
