<template>
  <div class="mainContent">
    <div class="container">
      <div class="row my-4">
        <div class="col-md-12">
          <select class="custom-select" id="inputGroupSelect03" v-model="currentZone">
            <option value="">----- 全選 -----</option>
            <option
              v-for="(item, index) in zone"
              :key="index"
              :value="item"
            >{{item}}</option>
          </select>
        </div>
      </div>
      <div class="row">
        <div class="col-md-4 mb-4" v-for="(item, index) in filterData" :key="index">
          <div class="card h-100">
            <div class="card-head">
              <div class="zoneTeg">{{item.Zone}}</div>
              <img class="picture" :style="{ backgroundImage: 'url(' + item.Picture1 + ')' }">
            </div>
            <div class="card-body">
              <h3 class="card-title">{{item.Name}}</h3>
              <ul class="list-group list-group-flush">
                <li class="list-group-item card-info mb-1" v-if="item.Ticketinfo === '免費參觀'">
                  <i class="fa fa-ticket card-info-icon"></i>{{item.Ticketinfo}}
                </li>
                <li class="list-group-item card-info mb-1" v-if="item.Ticketinfo !== '免費參觀'">
                  <i class="fa fa-ticket card-info-icon"></i>尚無資訊
                </li>
                <li class="list-group-item card-info mb-1">
                  <i class="fa fa-map-marker card-info-icon"></i>{{item.Add | filterArea}}
                </li>
                <li class="list-group-item card-info">
                  <i class="fa fa-phone card-info-icon"></i>{{item.Tel | filterTel}}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'APIRequest',
  props: {},
  data () {
    return {
      data: [],
      zone: [],
      currentZone: ''
    }
  },
  methods: {
    getData () {
      const vm = this
      const api = process.env.HTTP_PATH
      vm.$http.get(api).then((res) => {
        this.data = res.data.result.records
        this.getZone()
      })
    },
    getZone () {
      this.data.filter(item => {
        this.zone.push(item.Zone)
        this.zone = this.zone.filter((element, index, arr) => {
          return arr.indexOf(element) === index
        })
      })
    },
    zoneFilter (event) {
      console.log('event', event.target.value)
    }
  },
  computed: {
    filterData () {
      const vm = this
      let items = []
      if (vm.currentZone !== '') {
        items = vm.data.filter(item => {
          return item.Zone === vm.currentZone
        })
      } else {
        items = vm.data
      }
      return items
    }
  },
  filters: {
    filterArea (area) {
      return area.substring(6)
    },
    filterTel (tel) {
      return tel.replace('886-7-', '(07) ')
    }
  },
  created () {
    this.getData()
  }
}
</script>
