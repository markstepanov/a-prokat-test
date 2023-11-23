<template>
  <q-page class="row">

      <div class="col">
        <div class="col">
        <h4> Существующие Заказы </h4>
        </div>
        <br>

      <div class="col" v-if="!data">
        <q-circular-progress
          indeterminate
          rounded
          size="50px"
          color="lime"
          class="q-ma-md"
        />
      </div>
      <div class='col' v-else>

        <div class="q-pa-md" style="max-width: 350px">
      <q-list bordered separator>
        <q-item clickable v-ripple v-for="item in data" :key="item['id']">
          <q-item-section>


          Комментраий: {{ item.values[3] }}
          <br>
          Статус:{{ item.values[2][0] == "1" ? "Новый": "-"}}


          </q-item-section>
        </q-item>
         </q-list>
      </div>

      </div>

      </div>
      <div class="col ">
        <h4>Создать Заказ</h4>
        <br>
          <div class="q-pa-md" style="max-width: 350px;">
            <span>Комментраий</span>
             <q-input
              v-model="textareaContent"
              filled
              autogrow
            />

          <br>
          <q-btn color="primary" label="Добавить" @click="uploadOrder" />


          </div>



      </div>


  </q-page>
</template>

<script>
import { defineComponent, ref} from 'vue'
import {url} from "../utils/apiProvider"
import { useQuasar } from 'quasar'



export default defineComponent({

  data: ()=> ({
      data: null,
      textareaContent : null,
      $q: useQuasar()
  }),
  methods : {
    async fetchOrders (){
      const response = await fetch(url +"/order")
      const a = await response.json()
      this.data = a.orders
      console.log(this.data)
    },

      async uploadOrder(){
        
        const resp = await fetch(url +"/order", {
          method: "POST",
          headers: {
                  "Content-Type": "application/json",
          },
          body: JSON.stringify({comment: this.textareaContent})
        })

        if (resp.status !== 200){
          this.$q.notify({
            message: "Не получилось создать заказ"
          })
          return
        }

        this.data = null
        this.fetchOrders()
    }


  },
  mounted() {
    this.fetchOrders()
  },

  name: 'IndexPage'
})
</script>
