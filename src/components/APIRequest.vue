<template>
  <div class="mainContent">
    <loading :active.sync="isLoading"></loading>
    <div class="container">
      <div class="row my-4 align-items-center">
        <div class="col-md-2">
          <div class="vueImg"></div>
        </div>
        <div class="col-md-10">
          <p class="m-0 officialInfo">
            官方敘述：有很多時候你在建構應用程式的時需要訪問一個 API 並展開其數據，做這件事的方式有好幾種，而基於 promise 使用的 HTTP 客戶端，AXIOS 則是其中非常流行的一種 <a href="https://cn.vuejs.org/v2/cookbook/using-axios-to-consume-apis.html">連結</a>
          </p>
        </div>
      </div>
      <div class="row mb-4">
        <div class="col-md-10">
          <select class="custom-select" id="inputGroupSelect03" v-model="currentZone">
            <option value="">----- 全選 -----</option>
            <option
              v-for="(item, index) in zone"
              :key="index"
              :value="item"
            >{{item}}</option>
          </select>
        </div>
        <div class="col-md-2">
          <button type="button" class="btn btn-info" @click="getData()">資料載入</button>
          <button type="button" class="btn btn-danger" @click="clean()">清除</button>
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
      currentZone: '',
      isLoading: false
    }
  },
  methods: {
    getData () {
      const vm = this
      const api = process.env.HTTP_PATH
      vm.isLoading = true
      vm.$http.get(api)
        .then(res => {
          vm.isLoading = false
          this.data = res.data.result.records
          this.getZone()
        })
        .catch(error => {
          console.log(error)
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
    },
    clean () {
      this.data = []
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
