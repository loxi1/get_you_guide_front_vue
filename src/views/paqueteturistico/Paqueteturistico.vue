<template>
  <layout-basic imagen="logo_design_up" tipoclase="orange">
    <component v-bind:is="componentFile"></component>
  </layout-basic>
</template>


<script>
  import LayoutBasic from '../../layouts/LayoutDefault.vue'

  const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

  export default {
    name: 'paqueteturistico',
    components: {
      LayoutBasic,
    },
    props: {
      probar: String
    },
    computed: {
      componentFile() {
        return () => import(`@/components/content/${this.$route.name}/${capitalize(this.$route.name)}.vue`);
      }
    },
    data() {
      return {
        laruta: this.$route.name,
      }
    },
    created() {
      this.$parent.$emit('update:layout', LayoutBasic);
    },
    render() {
      return this.$slots.default[0];
    },
  }
</script>