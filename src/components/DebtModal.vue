<template>
  <form @submit.prevent="send">
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Anschreiben</p>
      </header>
      <section class="modal-card-body">
        <b-field>
          <b-select
            v-model="person"
            required expanded
            placeholder="Person"
            size="is-medium"
            :disabled="disabled">
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
                   required expanded
                   :disabled="disabled">
          </b-input>
        </b-field>
        
        <b-field label="für">
          <b-input size="is-medium"
                   placeholder="z.B. Kackpappe"
                   v-model="reason"
                   expanded
                   :disabled="disabled">
          </b-input>
        </b-field>
      </section>
      <footer class="modal-card-foot center-outer">
        <div class="center-inner">
          <button class="button" type="button" :disabled="disabled" @click="$parent.close()">Zurück</button>
          <button class="button is-primary" :disabled="disabled">Ab dafür!</button>
        </div>
      </footer>
    </div>
  </form>
</template>

<script>
 export default {
   name: 'debtModal',
   props: ['users', 'submit'],
   data () {
     return {
       person: null,
       money: null,
       reason: null,
       disabled: false
     }
   },
   methods: {
     send () {
       this.disabled = true
       let person = this.person === this.users[0] ? 0 : 1
       let money = this.money * 100
       this.submit(person, money, this.reason).then(() => {
         this.$parent.close()
       })
     }
   }
 }
</script>
