<template>
  <h1>
    secure rest api
  </h1>
  <v-sheet border rounded>
    <v-data-table :headers="headers" :hide-default-footer="users.length < 11" :items="users">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>
            <v-icon color="medium-emphasis" size="x-small" start></v-icon>
            User data
          </v-toolbar-title>

          <v-btn class="me-2" prepend-icon="mdi-plus" rounded="lg" text="Add a User" border @click="add"></v-btn>
        </v-toolbar>
      </template>

      <template v-slot:item.title="{ value }">
        <v-chip :text="value" border="thin opacity-25" label>
          <template v-slot:prepend>
            <v-icon color="medium-emphasis"></v-icon>
          </template>
        </v-chip>
      </template>

      <template v-slot:item.actions="{ item }">
        <div class="d-flex ga-2 justify-end">
          <v-icon color="medium-emphasis" icon="mdi-pencil" size="small" @click="edit(item.user_id)"></v-icon>

          <v-icon color="medium-emphasis" icon="mdi-delete" size="small" @click="remove(item.user_id)"></v-icon>
        </div>
      </template>

      <template v-slot:no-data>
        <v-btn prepend-icon="mdi-backup-restore" rounded="lg" text="Refresh" variant="text" border
          @click="getUsers"></v-btn>
      </template>

    </v-data-table>
  </v-sheet>

  <v-dialog v-model="dialog" max-width="500">
    <v-card :title="`${isEditing ? 'Edit' : 'Add'} a User`">
      <template v-slot:text>
        <v-row>
          <v-col cols="12">
            <v-text-field v-model="record.username" label="Username" />
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field v-model="record.user_id" label="User id" :disabled="isEditing" />
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field v-model="record.attempts" label="Attempts" />
          </v-col>

          <v-col cols="12" md="6">
            <v-checkbox v-model="record.status" label="Status" />
          </v-col>
        </v-row>
      </template>

      <v-divider></v-divider>

      <v-card-actions class="bg-surface-light">
        <v-btn text="Cancel" variant="plain" @click="dialog = false"></v-btn>

        <v-spacer></v-spacer>

        <v-btn text="Save" @click="save"></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <p v-if="errMessage">
    error: {{ errMessage }}
  </p>
</template>

<script lang="ts" setup>
import { CreateUser, DeleteUser, GetAllUser, UpdateUser } from '../api/crud';
import { UserDto } from '../models/UserDto';

// Use Providers
const router = useRouter()

// Consts
const DEFAULT_RECORD: UserDto = {
  status: false,
  username: '',
  user_id: '',
  attempts: ''
}

const headers = [
  { title: 'User Id', key: 'user_id', align: 'start' },
  { title: 'Username', key: 'username' },
  { title: 'Status', key: 'status', align: 'end' },
  { title: 'Attempts', key: 'attempts', align: 'end', sortable: false },
  { title: 'Actions', key: 'actions', align: 'end', sortable: false },
]

// Variables
const users = ref<UserDto[]>([])
const record = ref<UserDto>(DEFAULT_RECORD)
const errMessage = ref<string | undefined>()
const dialog = ref(false)
const isEditing = ref(false)

// Hooks
onMounted(async () => {
  await getUsers()
})

// Function

const getUsers = async () => {
  const rez = await GetAllUser()
  if (rez.status != 200) {
    errMessage.value = rez.statusText
    if (rez.status == 401) {
      await router.push({ name: '/login' })
    }
  }

  users.value = rez.data ?? []
}

const add = () => {
  isEditing.value = false
  record.value = { ...DEFAULT_RECORD }
  dialog.value = true
}

const edit = (id: string) => {
  isEditing.value = true
  const found = users.value.find(user => user.user_id === id)
  record.value = { ...found! }
  dialog.value = true
}

const remove = async (id: string) => {
  await DeleteUser(id)
  await getUsers()
}

const save = async () => {
  if (isEditing.value) {
    const rez = await UpdateUser(record.value.user_id, record.value)
    if (rez.status != 200) {
      errMessage.value = rez.data
      dialog.value = false
      return
    }
  } else {
    const rez = await CreateUser(record.value)
    if (rez.status != 201) {
      errMessage.value = rez.data
      dialog.value = false
      return
    }
  }
  dialog.value = false
  await getUsers()
}

</script>