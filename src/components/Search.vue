<template lang='pug'>
  .search
    icon(type='search' size='20' class='searchicon')
    input(confirm-type='search' type='text' placeholder='请输入穴道名称' )
</template>

<script>
export default {
  props: ['text']
}
</script>

<style>
.card {
  padding: 10px;
}
</style>
