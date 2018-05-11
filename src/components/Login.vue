<template>

  <div class="whole">
    <header>
      <div class="webName"></div>
    </header>
    <div class="contain">
      <div class="login">
        <h3>Login Your Account</h3>
        <form action="">
          <div style="margin-top :60px">
          <el-input placeholder="账号" type="text" name="studentNum"  required="required"  v-model="inuser " @click="showmsg=false">
            <template slot="prepend">用户名</template>
          </el-input>
          </div>
         <div style="margin-top :30px">
          <el-input type="password" name="password" placeholder="密码" required="required" v-model="inpwd"
                 @click="showmsg=false">
            <template slot="prepend">密码</template>
          </el-input>
         </div>
          <div v-show="showmsg" class="msg">{{msg}}</div>
          <div class="send-button">
            <button type="button" id="loginbtn"  @click="getinfo">登录</button>
            <button type="button" id="registerbtn" disabled="disabled">注册</button>
          </div>
        </form>
      </div>
    </div>


    <footer>

    </footer>
  </div>

</template>

<script>


  import crypto from 'crypto'
    export default {
        name: "Login",
      data() {
        return {
          studentNum: "",
          password: "",
          inuser: "",
          inpwd: "",
          msg: "输入的账号或密码有误",
          showmsg: false,
        }
    },
      methods: {
        getinfo() {
          this.studentNum = this.inuser;
          this.password = this.getmd5(this.inpwd);
          if (this.studentNum == "" || this.password == "") {


            this.showmsg = true;
            return;
          }

          this.$axios.post("https://cloudapi.usr.cn/usrCloud/user/login",{

              "account": this.studentNum,
              "password": this.password
            })
            .then(function (res) {
              if(res.data.info != "ok"){
                this.$alert('err : '+res.data.info,{
                  confirmButtonText: '确定'
                });
                this.showmsg = true;
              }
              else{
                sessionStorage.setItem('token', res.data.data.token);
                sessionStorage.setItem('username',this.studentNum);
                sessionStorage.setItem('md5_password', this.password);
                this.$router.push('/Refer');
              }

            }.bind(this))
            .catch(function (error) {
              console.log(error);
            })
        },
        getmd5(password) {
          var md5 = crypto.createHash("md5");
          md5.update(password);
          return md5.digest('hex');
        }
      },
      beforeMount(){
        sessionStorage.removeItem('token');
      }
    }
</script>

<style scoped>
  .whole {

    content: '';
    position: fixed;
    width: 100%;
    height: 100%;
    background: url("./../assets/blur-bg.jpg") no-repeat center center;
    background-size: cover;
    will-change: transform;
    z-index: -1;
  }

  header {
    background-color: rgba(0, 0, 0, 0.19);
    line-height: 50px;
    width: 100%;
    height: 50px;
    color: white;
  }

  .webName {
    margin-left: 20%;
    font-size: 18px;
  }

  .contain {
    width: 500px;
    height: 300px;
    margin: 80px auto;
    padding: 40px;
    background-color: rgba(0, 0, 0, 0.55);
    border: 2px ridge rgba(238, 238, 238, 0.13);
    border-radius: 10px;
    box-shadow: 0 0 18px 0 rgba(57, 141, 238, 0.12);
  }

  .login {
    width: 80%;
    margin-left: 10%;
    float: left;
    text-align: left;
  }

  .login h3 {
 /*   margin-bottom: 30px;
    font-size: 20px;*/
    color: aliceblue;
    position: center;
  }

  input[type="text"], input[type="password"] {
    width: 100%;
    margin-bottom: 20px;
    padding: 10px;
    float: left;
    background-color: transparent;
    border: none;
    font-size: 15px;
    border-bottom: 1px solid rgba(100, 100, 0, 0.9);
    outline: none;
    color: #000;
  }

  .msg {
    height: 10px;
    color: rgba(255, 33, 28, 0.84);
    font-size: 10px;
  }

  .send-button {
    margin-top: 10px;
  }

  .send-button button[type='button'] {
    width: 30%;
    padding: 10px 0;
    margin: 40px 30px;
    font-size: 16px;
    font-weight: 100;
    background-color: transparent;
    color: #9fcdff;
    border: 1px solid rgba(57, 141, 238, 0.41);
    border-radius: 3px;
    cursor: pointer;
    outline: none;
    transition: 0.5s all;
    -webkit-transition: 0.5s all;
    -moz-transition: 0.5s all;
    -o-transition: 0.5s all;
    text-decoration: none;
  }

  .send-button button[type='button']:hover {
    background-color: #398DEE;
    border: 1px solid #FFF;
    color: #FFFFFF;
    transition: 0.5s all;
    -webkit-transition: 0.5s all;
    -moz-transition: 0.5s all;
    -o-transition: 0.5s all;
    text-decoration: none;
  }

  footer {
    text-align: center;
    margin: 124px 0 0 0;
  }

  footer p {
    font-size: 12px;
    color: #000;
    line-height: 25px;
  }
</style>
