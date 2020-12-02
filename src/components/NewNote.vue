<template>
  <v-form class="mt-5" @submit.prevent="add()">
    <v-textarea
      append-icon="mdi-plus"
      color="blue"
      outlined
      v-model="note"
      label="Note"
      placeholder="Start writing your note here"
    ></v-textarea>
    <v-btn color="success" type="submit">SAVE</v-btn>
  </v-form>
</template>

<script>
import {db} from '@/firebase/db'

export default {
    name: 'NewNote',
    data(){
        return{
            id: '',
            lists: [],
            listsID: 0,
            note: ''
        }
    },
    methods:{
        async add(){

              let data = {id: this.lists[this.listID].taskslist[this.$route.params.taskId-1].notes.length+1, note: this.note}
            
            await this.lists[this.listID].taskslist[this.$route.params.taskId-1].notes.push(data)
            this.lists[this.$route.params.id-1].taskslist[this.$route.params.taskId-1].subtitle = `this task contains ${this.lists[this.listID].taskslist[this.$route.params.taskId-1].notes.length} notes`
            
     
        
    
      await db.collection('Users').where('username', '==', this.$store.getters.CURR_USER)
      .get()
      .then(query => {
        query.forEach(doc => {
          
          this.id = doc.id
        })
        
         db.collection('Users').doc(this.id).update({
          lists: this.lists
        })
        
      })
        
       this.note = ''
       
        }
    },
    mounted(){
        this.lists = this.$store.getters.LISTS
         this.listID = this.$store.getters.TASKID-1
         this.notes = this.lists[this.listID].taskslist[this.$route.params.taskId-1].notes

    }
}
</script>