<template>
  <div class="about">
    <h1>{{title}}</h1>
    <p>{{description}}</p>
    <div>
      <ul v-if='ownerList'>
        <li v-for='ownerItem in ownerList' :key='ownerItem.id'>
          <router-link :to='`/owners/${ownerItem.id}`'  class='ownerContainer'>
            <div class='ownerImage' v-bind:style="{ 'background-image': 'url(' + ownerItem.image.url + ')' }">
            </div>
            <div class='ownerInfo'>
              <h3> {{ownerItem.name}} </h3>
              <p> {{ownerItem.description}} </p>

              <div  class='restInfo'>
                <span v-for='restItem in ownerItem.restaurants' :key='restItem.id' class='restTagItem'> {{restItem.name}}</span>
              </div>
            </div>
          </router-link>
        </li>
      </ul> 
      <div v-else> Not Owner </div> 
    </div>
  </div>
</template>

<script>
import ownerApis from '@/apis/owner'
export default {
  name: 'Owner',
  data: function() {
    return {
      ownerList: null,
      title: null,
      description: null
    }
  },
  components: {
  },
  async mounted() {
    return Promise.all([
      this.initOwnerList(),
      this.initPage()
    ])
  },
  methods: {
    initOwnerList: async function() {
      const response = await ownerApis.fetchList() || {}
      const {data = {}} = response
      this.ownerList = data
    },
    initPage: async function() {
      const response = await ownerApis.pageInfo() || {}
      const {data = {}} = response
      const {title = '', description = ''} = data
      this.title = title
      this.description = description
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
  text-decoration: none;
  color: #222222;
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
  padding: 10px 20px;
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
