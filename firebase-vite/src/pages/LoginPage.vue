<template>
  <div class="h-full flex flex-col items-center justify-center">
    <div class="w-3/4 md:w-1/2">
      <label for="email-address" class="sr-only">Email address</label>
      <input
        id="email-address"
        name="email"
        type="email"
        autocomplete="email"
        required
        class="appearance-none w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
        placeholder="Email address"
      />
    </div>
    <div class="w-3/4 md:w-1/2 mt-4">
      <label for="password" class="sr-only">Password</label>
      <input
        id="password"
        name="password"
        type="password"
        autocomplete="password"
        required
        class="appearance-none w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
        placeholder="Password"
      />
    </div>

    <div class="w-3/4 md:w-1/2 mt-4">
      <button class="w-full block rounded-md bg-indigo-500 text-white p-2">Signup</button>
    </div>
  </div>
</template>