<template>
  <el-card class="box-card">
    <el-alert class="AlertTitle"
      title="本科论文查询网站"
      type="success"
      effect="dark">
    </el-alert>
<!--  查询  -->
    <el-row :gutter="15">
<!--  长度    -->
      <el-col :span="10">
        <!--   clearable 文本可清空, 清空的同时, 查询       -->
        <!--   clear 在点击由 clearable 属性生成的清空按钮时触发  @clear 绑定的事件  -->
        <el-input placeholder="请输入论文名称" v-model="queryInfo.theis_name" clearable @clear="getTheis()">
          <!--        <el-select v-model="select" slot="prepend" placeholder="请选择">-->
          <!--          <el-option label="餐厅名" value="1"></el-option>-->
          <!--          <el-option label="订单号" value="2"></el-option>-->
          <!--          <el-option label="用户电话" value="3"></el-option>-->
          <!--        </el-select>-->
          <el-button slot="append" icon="el-icon-search" @click="getTheis()"></el-button>
        </el-input>
      </el-col>
    </el-row>
<!--  table 表格  -->
    <el-table :data="theislist" style="width: 100%" border size="medium" border>
      <el-table-column type="index" width="60" ></el-table-column>
      <el-table-column prop="title"  label="论文题目"></el-table-column>
      <el-table-column prop="size"  label="大小" width="120">
        <template slot-scope="scope">
          {{scope.row.size}}{{scope.row.type}}
        </template>
      </el-table-column>
<!--      <el-tab-column label="下载" width="120"></el-tab-column>-->
      <el-table-column label="获取"  prop="tips" width="300" ></el-table-column>
      <el-table-column prop="prices" label="价格" width="120"></el-table-column>
    </el-table>

    <!--     分页 -->
    <!--   page-sizes 每页显示的条数 [这个是设定自己设定的] -->
    <!--   current-page 当前是第几页 -->
    <!--   page-sizes 每页显示的条数 [这个是设定自己设定的] -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.page_index"
      :page-sizes="[5, 10, 15]"
      :page-size="queryInfo.page_number"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total" background>
    </el-pagination>
  </el-card>
</template>

<script>
export default {
  name: "TheisVue",
  data () {
    return {
      // 获取用户列表参数对象
      queryInfo: {
        theis_name: '',
        // 当前的页数
        page_index: 1,
        // 当前每页显示多少条数据
        page_number: 5 // 这个值要和:page-sizes 数组的第一个值相同
      },
      theislist: [],  // 论文列表
      total: 0,
    }
  },
  created () {
    this.getTheis()
  },
  methods: {
    async getTheis () {
      const {data: res} = await this.$http.get('get_theis_title', {params: this.queryInfo})
      console.log('res = ', res)
      if (res.status !== 200) {
        return this.$message.error('获取论文列表失败')
      }
      res.data.forEach(item => {
        item.prices = '8.88元';
        item.tips='QQ:2129811510  ' + ' 微信:tobebetterman888'
      })
      this.theislist = res.data
      this.total = res.total
    },

    handleSizeChange (newSize) {
      console.log('newSize=',newSize);
      this.queryInfo.page_number = newSize
      // 重新获取数据
      this.getTheis()
    },

    handleCurrentChange (newPage){
      this.queryInfo.page_index = newPage
      // 重新获取数据
      this.getTheis()
    }
  }
}
</script>

<style scoped>
.el-pagination {
  margin-top: 30px;
}

.el-table{
  margin-top: 50px;
}

.el-alert {
  margin-bottom: 50px;
}

*{
  margin:0;
  padding:0;
  border:0
}

.AlertTitle
{
  font-size: 30pt;
  font-weight: normal;
  font-style: normal;
  text-align:center;
}
</style>
