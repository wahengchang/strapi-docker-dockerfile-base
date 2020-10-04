<template>
  <div class="about">
    <div v-if='!ownerItem'>
      <h1>owner detail {{$route.params.id}}</h1>
      <p>loading owner</p>
    </div>

    <div v-else class='ownerContainer'>
      <div class='ownerImage' v-bind:style="{ 'background-image': 'url(' + ownerItem.image.url + ')' }">
      </div>
      <div class='ownerInfo'>
        <h1> {{ownerItem.name}} </h1>
        <p> {{ownerItem.description}} </p>
      </div>
    </div>

    <div v-if='ownerItem && ownerItem.restaurants' class='restContainer'>
      <div v-for='restItem in ownerItem.restaurants' :key='restItem.id' class='restTagItem'> 
        <div class='ownerContainer'>
          <div class='ownerImage' v-bind:style="{ 'background-image': 'url(' + restItem.image[0].url + ')' }">
          </div>
          <div class='ownerInfo'>
            <h1> {{restItem.name}} </h1>
            <p> {{restItem.description}} </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ownerApis from '@/apis/owner'
export default {
  name: 'OwnerDetail',
  data: function(){
    return {
      ownerId: this.$route.params.id,
      ownerItem: null
    }
  },
  async mounted() {
    try{
      const {ownerId} = this
      return Promise.all([
        this.initOwnerDetail(ownerId),
      ])
    }
    catch(e){
      alert(e)
    }
  },
  methods: {
    initOwnerDetail: async function(id = '') {
      const response = await ownerApis.fetchDetail(id) || {}
      const {data = {}} = response
      this.ownerItem = data
    }
  }
}
</script>

<style scoped>

.ownerContainer {
  display: flex;
  margin: 20px 0;
  border: 1px solid lightgray;
  text-align: left;
}


.ownerContainer  .ownerImage {
  width: 200px;
  height: 200px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}


.ownerContainer .ownerInfo {
  width: 100%;
  padding: 0 20px;
}

.ownerContainer .ownerInfo .restInfo{ 
    margin-top: 50px;
}
.ownerContainer .ownerInfo .restInfo .restTagItem{
    background: #12aaee;
    padding: 2px 3px;
    border-radius: 3px;
    font-size: 11px;
    color: white;
}
</style>
