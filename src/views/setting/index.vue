<template>
  <div class="dashboard-container">
    <div class="app-container">公司设置</div>
    <el-card>
      <el-tabs v-model="activeName">
        <el-tab-pane label="公司管理" name="first">
          <RoleMange></RoleMange>
        </el-tab-pane>
        <el-tab-pane label="公司信息" name="second">
          <CompanyInfo></CompanyInfo>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import RoleMange from './components/RoleMange.vue'
import CompanyInfo from './components/CompanyInfo.vue'
export default {
  filters: {},
  components: { RoleMange, CompanyInfo },
  data () {
    return {
      activeName: 'first'
    }
  },
  computed: {},
  watch: {},
  created () { },
  methods: {}
}
</script>

<style scoped lang='scss'>
</style>
