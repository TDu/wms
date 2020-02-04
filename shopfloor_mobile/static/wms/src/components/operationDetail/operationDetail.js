
var operationDetail = Vue.component('operation-detail', {
  data: function () {
    return {
        details_overlay: false,
    }
  },
  props:['operation'],
    methods: {
        show_details: function() {
        console.log('SHOW ME SOME Details...');
        this.details_overlay = true;
    },
    },
  template: `
  <div class="detail operation-detail" v-if="!_.isEmpty(operation)">
    <v-simple-table>
    <template v-slot:default>
      <tbody>
      <tr class="teal lighten-2" v-if="operation.name">
        <th>Name</th>
        <td>
            {{ operation.name }}
            <v-btn @click="show_details" icon text>
                <v-icon large dark>mdi-help-circle</v-icon>
            </v-btn>
        </td>
      </tr>
      <tr class="teal lighten-2" v-if="operation.barcode">
        <th>Barcode</th>
        <td>{{ operation.barcode }}</td>
      </tr>
      <tr class="teal lighten-2">
        <th>Source</th>
        <td>{{ operation.location_src.name }}</td>
      </tr>
      <tr class="amber">
        <th>Destination</th>
        <td>{{ operation.location_dst.name }}</td>
      </tr>
      </tbody>
        <v-overlay :value="details_overlay">
            <more-info :packDetail="operation"></more-info>
            <v-btn color="primary" @click="details_overlay = false">
                Close
            </v-btn>
        </v-overlay> 


    </template>
  </v-simple-table>
</div>
`
})
