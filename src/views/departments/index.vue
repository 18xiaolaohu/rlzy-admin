<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card v-loading="isLoading" style="min-height: 700px">
        <el-tabs>
          <el-tab-pane label="用户管理" name="first">
            <!-- 用了一个行列布局 -->
            <Treeltem
              :node="titleObj"
              @delDepartment="getDepartmentsList"
            ></Treeltem>
            <el-tree :data="data" default-expand-all>
              <template v-slot="scope">
                <Treeltem
                  :node="scope.node"
                  @delDepartment="getDepartmentsList"
                ></Treeltem>
              </template>
            </el-tree>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getDepartmentsList } from '@/api/departments'
import Treeltem from './components/Treeltem'
export default {
  filters: {},
  components: { Treeltem },
  data () {
    return {
      data: [],
      titleObj: {},
      isLoading: true
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getDepartmentsList()
  },
  methods: {
    async getDepartmentsList () {
      const res = await getDepartmentsList()
      console.log(res)
      // 递归
      function tranferListToTree (list, pid) {
        var list1 = []
        list.forEach(item => {
          if (item.pid === pid) {
            list1.push(item)
            item.children = tranferListToTree(list, item.id)
          }
        })
        return list1
      }
      const res1 = tranferListToTree(res.depts, '')
      console.log(res1)
      this.data = res1
      this.titleObj = res.depts[0]
      this.isLoading = false
    }
  }
}
</script>

<style scoped lang='scss'>
::v-deep .el-tree-node {
  padding: 10px !important;
  span,
  div {
    font-size: 20px;
  }
}
::v-deep .el-tree-node__content {
  padding: 20px 0 !important;
}
</style>
