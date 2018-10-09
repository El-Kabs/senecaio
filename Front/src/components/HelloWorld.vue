<template>
  <div>
    <Sidebar/>
    <div class = "content">
      <ul>
        <li v-for='(salon, index) of salones' :key='index'>
          {{ salon }}
        </li>
      </ul>
    </div>
  </div>
  
</template>

<script>
import Sidebar from "@/components/Base/Sidebar";
import Navbar from "@/components/Base/Navbar";
export default {
  name: 'HelloWorld',
  components: {
    Sidebar,
    Navbar
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      salones: ""
    }
  },
  mounted: function () {
    const _this = this
    fetch('https://sobrecupo-salones.herokuapp.com/biblioteca', {
      method: 'GET'
    }).then(res => res.text()).then(json => {
      console.log(json.replace(/'/g, '"'))
      const parsed = JSON.parse(json.replace(/'/g, '"'))
      _this.salones = parsed
    })
  }
}
</script>


<style scoped>
.frame{
  width: 100%;
  height: 100;
}
.content{
  height: 100%;
  margin-left: 54px;
}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
