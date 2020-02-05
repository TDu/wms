var moreInfo = Vue.component('detail-pack', {
    data: function () {
        return {
        }
    },
    props:['packDetail'],
    methods: {
    },
    template: `
      <div class="" v-if="">
        <v-simple-table>
        <template v-slot:default>

          <tbody>
          <tr class="teal lighten-2">
            <th>Name</th>
            <td>
                {{ packDetail.name }}
            </td>
          </tr>
          <tr class="blue lighten-2">
            <th>Operation</th>
            <td>Operation Name</td>
          </tr>
          <tr class="blue lighten-2">
            <th>Location</th>
            <td>
                {{ packDetail.location_src.name }}<br/>
                Weight : ?<br/>
                Packaging : ?
            </td>
          </tr>
          <tr v-for="product in packDetail.product" class="blue">
            <th> {{ product.name }}</br> Lot: {{ product.lot }}</th>
            <td>
                {{ product.qty }}
            </td>
        </tr>
          </tbody>

        </template>
      </v-simple-table>
    </div>
    `
})
    // <v-card outlined>
    //     <v-card-title class="display-1 text--primary">PACK {{ packDetail.name }}</v-card-title>
    //     <v-card-subtitle>Operation Name</v-card-subtitle>
    //     <v-card-text>
    //   <div class="headline text--primary">LOCATION {{ packDetail.location_src.name}}</div>
    //         <v-list dense>
    //             <v-list-item>
    //               <v-list-item-content>Weight</v-list-item-content>
    //               <v-list-item-content class="align-end">34.30</v-list-item-content>
    //             </v-list-item>
    //             <v-list-item>
    //               <v-list-item-content>Packaging</v-list-item-content>
    //               <v-list-item-content class="align-end">P234</v-list-item-content>
    //             </v-list-item>
    //         </v-list dense>
    //         <v-divider></v-divider>

    // </v-card-text>
    // </v-card>

    // template: `
    //   <div class="" v-if="">
    //     <v-simple-table>
    //     <template v-slot:default>

    //       <tbody>
    //       <tr class="teal lighten-2">
    //         <th>Name</th>
    //         <td>
    //             {{ packDetail.name }}
    //         </td>
    //       </tr>
    //       <tr class="blue lighten-2">
    //         <th>Operation</th>
    //         <td>Operation Name</td>
    //       </tr>
    //       <tr class="blue lighten-2">
    //         <th>Location</th>
    //         <td>
    //             {{ packDetail.location_src.name }}<br/>
    //             Weight : ?<br/>
    //             Packaging : ?
    //         </td>
    //       </tr>
    //       <tr v-for="product in packDetail.product" class="blue">
    //         <th> {{ product.name }}</th>
    //         <td>
    //             {{ product.qty }}
    //         </td>
    //     </tr>
    //       </tbody>

    //     </template>
    //   </v-simple-table>
    // </div>
    // `
