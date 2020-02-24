<template>
  <div class="chat container">
    <h2 class="center teal-text">H! Chat</h2>
    <div class="card">
      <div class="card-content">
        <ul class="messages" v-chat-scroll>
          <li v-for="message in messages" :key="message.id">
            <span class="teal-text">{{ message.name }}</span>
            <span class="grey-text text-darken-3">{{ message.content}}</span>
            <span class="grey-text time">{{ message.timestamp}}</span>

          </li>
        </ul>
      </div>
    </div>
    <div class="card-action">
      <NewMessage :name="name"/>
    </div>

  </div>
</template>

<script>
  import NewMessage from '@/components/NewMessage'
  import db from '@/firebase/init'
  import moment from 'moment'

  export default {
    name: "Chat",
    props: ['name'],
    components: {
      NewMessage
    },

    data() {
      return {
        messages: [],

      }
    },
    created() {
      let ref = db.collection('messages').orderBy('timestamp')
      //orderBy - sortuje po czasie - przez co najnowsze wiadomosci
      //beda na koncu listy!

      ref.onSnapshot(snapshot => {
        (snapshot.docChanges().forEach(change => {
          if (change.type === 'added') {
            let doc = change.doc
            console.log(doc)
            this.messages.push({
              id: doc.id,
              content: doc.data().content,
              name: doc.data().name,
              timestamp: moment(doc.data().timestamp).format('LLLL')
            })

          }
        }))
      })
      //  metoda onSnapshot nasluchuje na jakiekolwiek zmiany
      //  w kolekcji messages - jesli cos zostaje zmienione/usuniete
      //  /dodane to firestore robi migawke tej bazy w tym czasie
      //  i wysyla go do nas
    }
  }
</script>

<style>
  .chat h2 {
    font-size: 2.4em;
    margin-bottom: 40px;
  }

  .chat span {
    font-size: 1.4em;
  }

  .chat .time {
    display: block;
    font-size: 0.8em;
  }

  .messages {
    max-height: 350px;
    overflow: auto;
  }

  .messages::-webkit-scrollbar {
    width: 3px;
  }

  .messages::-webkit-scrollbar-track  {
    background: #ddd;
  }

  .messages::-webkit-scrollbar-thumb {
    background: #aaa;
  }

  .messages li {
    list-style-type: none;
  }

</style>
