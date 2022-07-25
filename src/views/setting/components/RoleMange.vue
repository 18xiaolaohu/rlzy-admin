<template>
  <div>
    <el-button
      type="primary"
      size="mini"
      @click="
        roleDialogVisible = true;
        isEdit = false;
        form = {};
      "
      >新增角色</el-button
    >
    <el-table :data="roleList" border>
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column
        label="角色名"
        prop="name"
        width="160px"
        sortable
      ></el-table-column>
      <el-table-column
        label="描述"
        prop="description"
        sortable
      ></el-table-column>
      <el-table-column label="操作">
        <template v-slot="scope">
          <el-button type="text" @click="showRightDialog(scope.row.id)"
            >分配权限</el-button
          >
          <el-button type="text" @click="showRoleDialog(scope.row)"
            >修改</el-button
          >
          <!-- <el-button type="text" @click="showRightDialog(scope.row.id)
          >修改
          </el-button> -->
          <el-button type="text" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row type="flex" justify="end">
      <el-pagination
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        :current-page="paramsObj.page"
        :page-size="paramsObj.pagesize"
        :page-sizes="[2, 3, 4, 5, 6]"
        @current-change="handelCurrentChange"
        @size-change="handelSizeChange"
      >
      </el-pagination>
    </el-row>

    <!-- 分配权限 -->
    <el-dialog title="分配权限" :visible.sync="rightVisible" width="20%">
      <el-tree
        v-if="rightVisible"
        ref="myTree"
        :data="permissions"
        :props="{ label: 'name' }"
        default-expand-all
        show-checkbox
        node-key="id"
        :default-checked-keys="selectedPermissions"
      ></el-tree>
      <template #footer>
        <el-button type="primary" @click="save">确认</el-button>
        <el-button @click="rightVisible = false">取消</el-button>
      </template>
    </el-dialog>

    <!-- 新增和编辑对话框 -->
    <el-dialog title="新增" :visible.sync="roleDialogVisible" @close="reset">
      <!-- 三层 -->
      <el-form ref="myForm" label-width="80px" :model="form" :rules="rules">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="description">
          <el-input v-model="form.description"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button type="primary" @click="onClick">确认</el-button>
        <el-button @click="roleDialogVisible = false">取消</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { getRoleList, delRole, addRole, editRole } from '@/api/setting'
import { getPermissions, getPermissionsById, assignPermission } from '@/api/permission'
import { tranferListToTree } from '@/utils/index.js'
export default {
  filters: {},
  components: {},
  data () {
    return {
      paramsObj: {
        page: 1, // 默认第一页
        pagesize: 4 // 每页数量
      },
      roleList: [],
      total: null,
      rightVisible: false,
      permissions: [],
      selectedPermissions: [],
      id: null,
      roleDialogVisible: false,
      form: {
        name: '',
        description: ''
      },
      rules: {
        name: [
          { required: true, message: '角色名称不能为空', trigger: 'blur' }
        ]
      },
      isEdit: false
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getRoleList()
  },
  methods: {
    async getRoleList () {
      const res = await getRoleList(this.paramsObj)
      this.roleList = res.rows
      this.total = res.total// 用于做分页
    },
    handelCurrentChange (page) {
      // console.log(page)
      this.paramsObj.page = page // 改变默认页数
      this.getRoleList() // 重新获取值
    },
    handelSizeChange (pagesize) {
      this.paramsObj.pagesize = pagesize
      this.getRoleList()
    },
    del (id) {
      this.$confirm('确定删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 删除当前页最后一条信息，就应该跳转到上一页
        if (this.roleList.length === 1 && this.paramsObj.page > 1) {
          this.paramsObj.page--
        }
        await delRole(id)
        this.getRoleList()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    async showRightDialog (id) {
      this.id = id
      // 获取所有权限点
      const res = await getPermissions()
      console.log(res)
      this.permissions = tranferListToTree(res, '0')
      // 获取当前的权限点
      const res1 = await getPermissionsById(id)
      console.log(res1)
      this.selectedPermissions = res1.permIds
      this.rightVisible = true
    },
    async save () {
      // console.log(this.$refs.myTree.getCheckedKeys())
      await assignPermission(this.id, this.$refs.myTree.getCheckedKeys())
      this.rightVisible = false
    },
    onClick () {
      // 二次校验
      // 防止向服务器发送空数据
      this.$refs.myForm.validate(async bool => {
        if (!bool) return this.$message.error('表单数据非法')
        if (this.isEdit) {
          // 修改信息发送
          await editRole(this.form)
        } else {
          const res = await addRole(this.form)
          console.log(res)
        }
        this.roleDialogVisible = false
        this.getRoleList()
      })
    },
    // 重置表单，把input里的清空
    reset () {
      this.$refs.myForm.resetFields()
    },
    // 修改
    showRoleDialog (row) {
      this.isEdit = true
      this.roleDialogVisible = true
      this.form = { ...row } // 浅拷贝
      // this.form = Object.assign({}, row) // 浅拷贝
    }
  }
}
</script>

<style scoped>
.el-table {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
