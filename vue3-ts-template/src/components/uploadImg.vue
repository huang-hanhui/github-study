<script setup lang="ts">
import {ref} from "vue"
const imgList = ref([])
const imgNum = ref(9)
const uploadImg = (val) => {
    let file = val.target.files // 获取图片信息
    let img = new FileReader()  // 本地获取图片并使用的做法    new FormData() 这个才是线上的办法
    img.readAsDataURL(file[0])  // 获取图片消息
    img.onload = ((e)=>{
        imgList.value.push(e.target.result)
        imgNum.value--
        // 同步输出处理后的 base64 图片信息
    })
    // console.log(imgList.value)   路径数组
}
// 删除图片
const handleDelete = (val) => {
    imgList.value.splice(val,1)
}
</script>

<template>
    <!--    multiple  接受上传多个值 -->
   <div class="box">
       <div class="look" v-for="(item,index) in imgList">
           <img :src="item" alt="" />
           <div class="heibu">
               <img src="https://s1.ax1x.com/2022/08/08/vMEtPO.png" alt="" title="点击查看" >
               <img src="https://s1.ax1x.com/2022/08/08/vMEaxH.png" alt="" title="点击删除" @click="handleDelete(index)" >
           </div>
       </div>
       <div class="btn" v-if="imgNum >= 1">
           <input type="file" class="demo_file" accept="image/png,image/gif,image/jpeg" multiple @change="uploadImg($event)">
           <img src="https://s1.ax1x.com/2022/08/08/vMEwMd.png" class="demo_img" alt=""/>
       </div>
   </div>
</template>

<style scoped >
.box {
    display: flex;
    flex-wrap: wrap;
    width: 636px;

}
.look {
    position: relative;
}
.look img{
    width: 180px;
    height: 180px;
    margin-right: 10px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
}

.btn {
    width: 180px;
    height: 180px;
    border: 1px solid #ccc;
    position: relative;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    
}
.demo_file {
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
}

.demo_img {
    display: block;
    width: 50%;
    height: 50%;
}
.heibu {
    position: absolute;
    top: 0;
    left: 0;
    width: 180px;
    height: 180px;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.heibu img {
    width: 30px;
    height: 30px;
    z-index: -99;
}
.heibu:hover {
    background-color: rgba(0,0,0,0.3);
    cursor: pointer;
    z-index: 100;
}
</style>