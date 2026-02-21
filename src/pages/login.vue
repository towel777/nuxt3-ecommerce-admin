<script setup lang="ts">
import LoginForm from '@/features/auth/ui/LoginForm.vue'

definePageMeta({ layout: 'auth' })
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-4">
    <div class="w-full max-w-sm">
      <!-- Logo -->
      <div class="text-center mb-8">
        <div class="w-12 h-12 bg-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Icon name="ph:shopping-cart" size="24" class="text-white" />
        </div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">
          ShopAdmin
        </h1>
        <p class="text-sm text-gray-500 mt-1">
          Войдите в панель управления
        </p>
      </div>

      <div class="card-padded">
        <LoginForm />
      </div>
    </div>
  </div>
</template>
