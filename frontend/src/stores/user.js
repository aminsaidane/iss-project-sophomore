import { defineStore } from 'pinia'


export const userStore = defineStore("user",{
    state :()=>{
        return{
            id:"",
            username:"",
            type:""
        }
    }, 
    actions:{
           setId(id){
            this.id=id
           },
           setUserName(username){
            this.username=username
           },
           setType(type){
            this.type = type
           }
    },persist:{
        storage: sessionStorage,
        pick: ['id','username','type'],
    }
    
})