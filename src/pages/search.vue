<template>
  SOAP api for searching
  <v-text-field class="mt-5" v-model="query" clearable label="Enter a instagram username" variant="outlined">
  </v-text-field>

  <v-btn @click="searchUserInfo" :loading="loading">Search</v-btn>
  <div v-if="!loading">
    <v-container>
      <v-card v-if="userInfo" elevation="2" class="mx-auto" max-width="800">
        <v-card-title class="d-flex align-center pa-4">
          <v-avatar size="64" class="mr-4">
            <v-img :src="userInfo.ProfilePicUrl ?? undefined" :alt="`${userInfo.Username ?? 'User'}'s profile picture`"
              cover>
              <template v-slot:error>
                <v-avatar color="grey-lighten-1" size="64">
                  <v-icon icon="mdi-account-circle" size="x-large"></v-icon>
                </v-avatar>
              </template>
              <template v-slot:placeholder>
                <v-avatar color="grey-lighten-3" size="64">
                  <v-progress-circular indeterminate color="grey-darken-1"></v-progress-circular>
                </v-avatar>
              </template>
            </v-img>
          </v-avatar>
          <div>
            <div class="text-h5 font-weight-bold">
              {{ userInfo.FullName ?? userInfo.Username ?? 'User Profile' }}
              <v-chip v-if="userInfo.IsVerified" color="primary" size="small" variant="flat" class="ml-2" label>
                <v-icon start icon="mdi-check-decagram"></v-icon>
                Verified
              </v-chip>
            </div>
            <div class="text-subtitle-1 text-medium-emphasis">
              @{{ userInfo.Username ?? 'N/A' }}
              <span v-if="userInfo.Category"> · {{ userInfo.Category }}</span>
            </div>
            <div v-if="userInfo.TextPostAppBadgeLabel" class="text-caption text-medium-emphasis mt-1">
              Threads: {{ userInfo.TextPostAppBadgeLabel }}
            </div>
          </div>
          <v-spacer></v-spacer>
        </v-card-title>

        <v-divider></v-divider>

        <v-card-text class="d-flex justify-space-around text-center py-3">
          <div>
            <div class="text-h6 font-weight-bold">{{ formatCount(userInfo.MediaCount) }}</div>
            <div class="text-caption text-medium-emphasis">Posts</div>
          </div>
          <div>
            <div class="text-h6 font-weight-bold">{{ formatCount(userInfo.FollowerCount) }}</div>
            <div class="text-caption text-medium-emphasis">Followers</div>
          </div>
          <div>
            <div class="text-h6 font-weight-bold">{{ formatCount(userInfo.FollowingCount) }}</div>
            <div class="text-caption text-medium-emphasis">Following</div>
          </div>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text v-if="userInfo.Biography">
          <p class="text-body-1" style="white-space: pre-wrap;">{{ userInfo.Biography }}</p>
        </v-card-text>

        <v-list v-if="userInfo.BioLinks && userInfo.BioLinks.length > 0" density="compact">
          <v-list-subheader>LINKS</v-list-subheader>
          <v-list-item v-for="(link, index) in userInfo.BioLinks" :key="index" :href="link.Url ?? '#'" target="_blank"
            rel="noopener noreferrer" prepend-icon="mdi-link-variant">
            <v-list-item-title class="font-weight-medium">{{ link.Title ?? link.Url }}</v-list-item-title>
            <v-list-item-subtitle v-if="link.Title && link.Url && link.Title !== link.Url">
              {{ link.Url }}
            </v-list-item-subtitle>
          </v-list-item>
        </v-list>

        <v-list v-if="hasOtherDetails(userInfo)" density="compact">
          <v-divider v-if="userInfo.Biography || (userInfo.BioLinks && userInfo.BioLinks.length > 0)"></v-divider>
          <v-list-subheader>DETAILS</v-list-subheader>
          <v-list-item v-if="userInfo.ExternalUrl" :href="userInfo.ExternalUrl" target="_blank"
            rel="noopener noreferrer" prepend-icon="mdi-web">
            <v-list-item-title>Website</v-list-item-title>
            <v-list-item-subtitle>{{ userInfo.ExternalUrl }}</v-list-item-subtitle>
          </v-list-item>
          <v-list-item v-if="userInfo.IsBusiness !== null" prepend-icon="mdi-domain">
            <v-list-item-title>Business Account</v-list-item-title>
            <v-list-item-subtitle>{{ userInfo.IsBusiness ? 'Yes' : 'No' }}</v-list-item-subtitle>
          </v-list-item>
          <v-list-item v-if="userInfo.AccountType !== null" prepend-icon="mdi-account-cog-outline">
            <v-list-item-title>Account Type</v-list-item-title>
            <v-list-item-subtitle>{{ userInfo.AccountType }}</v-list-item-subtitle>
          </v-list-item>
          <v-list-item v-if="userInfo.Pk" prepend-icon="mdi-identifier">
            <v-list-item-title>User PK</v-list-item-title>
            <v-list-item-subtitle>{{ userInfo.Pk }}</v-list-item-subtitle>
          </v-list-item>
          <v-list-item v-if="userInfo.Id" prepend-icon="mdi-identifier">
            <v-list-item-title>User ID</v-list-item-title>
            <v-list-item-subtitle>{{ userInfo.Id }}</v-list-item-subtitle>
          </v-list-item>
        </v-list>

      </v-card>
      <v-alert v-else-if="!errorAlert" type="info" variant="tonal" class="mt-4">
        No user information available to display.
      </v-alert>
      <v-alert v-else type="error" variant="tonal" class="mt-4">
        User not found
      </v-alert>
    </v-container>
  </div>
</template>

<script lang="ts" setup>
import { callSoapFromBrowser } from '../api/soap'

const query = ref(null)
const userInfo = ref<UserInfoResult | null>(null);
const errorAlert = ref(false)
const loading = ref(false)


const formatCount = (count: number | null | undefined): string => {
  if (count === null || count === undefined) return '0';
  if (count < 10000) return count.toString();
  if (count < 1000000) return (count / 1000).toFixed(1) + 'K';
  return (count / 1000000).toFixed(1) + 'M';
};

const hasOtherDetails = (user: UserInfoResult | null): boolean => {
  if (!user) return false;
  return !!user.ExternalUrl || user.IsBusiness !== null || user.AccountType !== null || !!user.Pk || !!user.Id;
}

const searchUserInfo = async () => {
  errorAlert.value = false
  if (query.value == undefined || query.value === "") {
    userInfo.value = null
    return
  }
  loading.value = true
  try {
    const rez = await callSoapFromBrowser(query.value)
    userInfo.value = rez
  } catch (error) {
    console.log(error)
    errorAlert.value = true
    userInfo.value = null
  }
  finally {
    loading.value = false
  }
}
</script>
