<template>
  <nav class="app-topnav">
    <div class="container">
      <ul>
        <li style="position: absolute; left: 0; margin: 0;"><a href="javascript:history.back();">返回</a></li>
        <!-- 多模板渲染，区分登陆状态和非登录状态（用是否有token来区分） -->
        <template v-if="userStore.userInfo?.token">
          <li><a href="javascript:;"><i class="iconfont icon-user"></i>{{ userStore.userInfo.nickname }}</a></li>
          <li>
            <el-popconfirm title="确认退出吗?" @confirm="confirm" confirm-button-text="确认" cancel-button-text="取消">
              <template #reference>
                <a href="javascript:;">退出登录</a>
              </template>
            </el-popconfirm>
          </li>
          <li><a href="javascript:;">我的订单</a></li>
          <li><a @click="$router.push('/member')">会员中心</a></li>
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
import { useUserStore } from "@/stores/userStore"
import { useRouter } from "vue-router"

const router = useRouter()
const userStore = useUserStore()
const confirm = () => {
  //1.退出登录清楚用户token
  userStore.clearUserInfo()
  //2.退出到登录页面
  router.push('/login')
}
</script>

<style scoped lang="scss">
.app-topnav {
  background: #112d4e;

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
