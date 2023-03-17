<template>
  <el-card class="box-card">
    <el-alert class="AlertTitle"
      title="本科论文查询网站, 论文已经在维普、万方查过重。懂的都懂！！！！"
      type="success"
      effect="dark">
    </el-alert>

    <img src="../assets/论文2.jpg" class="img"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <img src="../assets/论文3.jpg" class="img">
<!--    <el-row>-->
<!--&lt;!&ndash;      <el-col :span="4">&ndash;&gt;-->
<!--&lt;!&ndash;        <img src="../assets/lunwen.jpg">&ndash;&gt;-->
<!--&lt;!&ndash;      </el-col>&ndash;&gt;-->
<!--      <el-col :span="4" class="img">-->
<!--        <img src="../assets/论文2.jpg">-->
<!--      </el-col>-->
<!--    </el-row>-->


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
          <el-button slot="append" icon="el-icon-search" @click="getTheisData()"></el-button>
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
<!--      <el-tab-column label="下载" width="120">-->
<!--        <template slot-scope="scope">-->
<!--          <el-button size="mini" type="danger" icon="el-icon-download" circle @click="download(scope.row)"></el-button>-->
<!--        </template>-->
<!--      </el-tab-column>-->
      <el-table-column prop="tips" label="获取"   width="300" ></el-table-column>
      <el-table-column prop="prices" label="价格" width="120"></el-table-column>
      <el-table-column label="下载、预览" width="120">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" icon="el-icon-download" circle @click="download(scope.row)"></el-button>
          </template>
      </el-table-column>

      <el-table-column label="预览" width="120">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" icon="el-icon-download" circle @click="yulan"></el-button>
        </template>
      </el-table-column>
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

<!-- 下载对话框  -->
    <el-dialog title="下载" :visible.sync="downloadDialogVisbile"width="50%" @close="closeDownloadVisbile">
      <!--  table 表格  -->
      <el-table :data="downlist" style="width: 100%" border size="medium" border>
        <el-table-column prop="name"  label="名称"></el-table-column>

        <el-table-column prop="url"  label="操作">
          <template slot-scope="scope">
<!--            <a :href=scope.row.url :download=scope.row.url >点击下载</a>-->
            <el-button @click="downloadUrl(scope.row.url)">下载</el-button>
<!--            <el-button @click="yulan(scope.row.url)">预览</el-button>-->
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
<!--  预览对话框  -->
    <el-dialog title="PDF预览1" :visible.sync="yulanDialogVisbile"width="90%" @close="closeDownloadVisbile">
<!--      <iframe :src="pdfSrc" frameborder="0" style="width: 100%; height: 100%"></iframe>-->
<!--      <iframe-->
<!--        src='`https://view.officeapps.live.com/op/view.aspx?src==http://101.42.97.221/logs/fanlai/11111.docx'-->
<!--        width=500-->
<!--        height=500-->
<!--        frameborder='0'>-->
<!--      </iframe>-->
<!--      <iframe-->
<!--        src='`https://view.xdocin.com/xdoc?_xdoc=http://101.42.97.221/logs/fanlai/11111.docx'-->
<!--        width=500-->
<!--        height=500-->
<!--        frameborder='0'>-->
<!--      </iframe>-->

      <iframe :src="pdfSrc" frameborder="0" style="width: 100%; height: 100%">

      </iframe>

    </el-dialog>
  </el-card>
</template>

<script>
import axios from "axios";
import pdf from 'vue-pdf';
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
      downlist: [],   // 下载列表
      total: 0,
      downloadDialogVisbile: false, // 下载对话框
      yulanDialogVisbile: false, // 预览对话框
      // pdf 相关
      numPages: 10,  // pdf 最多展示10页
      pdfSrc: "http://101.42.97.221/logs/fanlai/Go面试题new.pdf"
    }
  },
  created () {
    this.getTheis()
  },
  methods: {
    // 点击查询按钮，页面的index 自动变为1
    getTheisData() {
      this.queryInfo.page_index = 1;
      this.getTheis()
    },

    async getTheis() {
      const {data: res} = await this.$http.get('get_theis_title', {params: this.queryInfo})
      console.log('res = ', res)
      if (res.status !== 200) {
        return this.$message.error('获取论文列表失败')
      }
      console.log('res.data =', res.data);
      if (res.data != null) {
        res.data.forEach(item => {
          item.prices = '8.88元';
          item.tips = 'QQ:2129811510  ' + ' 微信:tobebetterman888'
        })
        this.theislist = res.data
      } else {
        this.theislist = [];
      }
      this.total = res.total
    },

    handleSizeChange(newSize) {
      console.log('newSize=', newSize);
      this.queryInfo.page_number = newSize
      // 重新获取数据
      this.getTheis()
    },

    handleCurrentChange(newPage) {
      this.queryInfo.page_index = newPage
      // 重新获取数据
      this.getTheis()
    },
    yulan() {
      this.yulanDialogVisbile = true
    },
    async download(info) {
      // 获取数据
      const {data: res} = await this.$http.get('get_url', {params: {'search': info.title}})
      console.log('res = ', res)
      if (res.status !== 200) {
        return this.$message.error('下载获取失败')
      }
      this.downlist = res.data
      // 显示对话框
      this.downloadDialogVisbile = true
    },
    closeDownloadVisbile() {
      this.yulanDialogVisbile = false
    },
    async downloadUrl(url) {
      window.location.href = 'http://101.42.97.221:8080/get_file?path=' + url;
    },
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
.img {
  width: 400px;
}
</style>
