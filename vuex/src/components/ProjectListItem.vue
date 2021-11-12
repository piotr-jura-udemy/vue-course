<template>
  <div
    class="
      rounded-md
      py-2
      px-2
      text-gray-500
      font-semibold
      flex
      justify-between
      cursor-pointer
    "
  >
    <div>Project Name</div>
    <div
      class="
        rounded-lg
        bg-gray-300
        text-gray-800
        px-2
        font-normal
        w-8
        text-center
      "
    >
      4
    </div>
  </div>
</template>

<script>
export default {
  props: { project: Object },
};
</script>
