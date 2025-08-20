<template>
  <nav class="app-topnav">
    <div class="container">
      <ul>
        <!-- 多模板渲染，区分登陆状态和非登录状态 -->
        <template v-if="false">
          <li><a href="javascript:;"><i class="iconfont icon-user"></i>LMC</a></li>
          <li>
            <el-popconfirm title="确认退出吗?" confirm-button-text="确认" cancel-button-text="取消">
              <template #reference>
                <a href="javascript:;">退出登录</a>
              </template>
            </el-popconfirm>
          </li>
          <li><a href="javascript:;">我的订单</a></li>
          <li><a href="javascript:;">会员中心</a></li>
        </template>
        <template v-else>
          <li><a href="javascript:;" @click="$router.push('/login')">请先登录</a></li>
          <li><a href="javascript:;">帮助中心</a></li>
          <li><a href="javascript:;">关于我们</a></li>
        </template>
      </ul>
    </div>
  </nav>
</template>

<script setup lang="ts">
// import { ref } from 'vue';
// 引入Element Plus的Popconfirm组件
import { ElPopconfirm } from 'element-plus';

// 登录状态变量，实际项目中可能从Vuex/Pinia或本地存储获取
// const isLogin = ref(true);
</script>

<style scoped lang="scss">
.app-topnav {
  background:#112d4e;

  ul {
    display: flex;
    height: 53px;
    justify-content: flex-end;
    align-items: center;

    li {
      a {
        padding: 0 15px;
        color: #f9f7f7;
        line-height: 1;
        display: inline-block;

        i {
          font-size: 14px;
          margin-right: 2px;
        }

        &:hover {
          color: #3d84a8;
        }
      }

      ~li {
        a {
          border-left: 2px solid #666;
        }
      }
    }
  }
}
</style>
