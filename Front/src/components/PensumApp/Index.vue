<template>
    <div class="PensumApp">
        <SidebarPA/>
        <h1>Prueba</h1>
        <Pool/>
    </div>
</template>

<script>
import SidebarPA from "@/components/PensumApp/SidebarPA";
import Espacio from "@/components/PensumApp/Base/Espacio";
import Materia from "@/components/PensumApp/Base/Materia";
import Pool from "@/components/PensumApp/Base/Pool";
export default {
  name: "IndexPensum",

  components: {
    Espacio,
    Materia,
    SidebarPA,
    Pool
  },
  data() {
    return {
      lists: [["A", "B", "C"], ["D", "E", "F"]]
    };
  },
  methods: {
    handleDrop(toList, data) {
      const fromList = data.list;
      if (fromList) {
        toList.push(data.item);
        fromList.splice(fromList.indexOf(data.item), 1);
        toList.sort((a, b) => a > b);
      }
    }
  }
};
</script>

<style scoped>
</style>
