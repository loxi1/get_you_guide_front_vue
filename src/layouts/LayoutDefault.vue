<template>
    <div class="basic-layout">
        <Header :claseheader="tipoclase" :img="imagen"/>
        <div class="content">
            <slot/>
        </div>
        <footer>
        </footer>
    </div>
</template>

<style>
    @import 'layoutdefault.css';
</style>

<script>
    import Header from "../components/header/Header.vue"
    import Content from "../components/content/Content.vue"
    export default {
        name: 'layoutdefault',
        components: {
            Header,
            Content
        },
        props: {
            tipoclase: String,
            imagen: String
        }
    }
</script>