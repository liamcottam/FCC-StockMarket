<template>
  <div>
    <a :href="`https://github.com/liamcottam/${$appName}`" target="_blank">
      <img style="position: fixed; top: 0; right: 0; border: 0; z-index:1;" src="https://camo.githubusercontent.com/365986a132ccd6a44c23a9169022c0b5c890c387/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f7265645f6161303030302e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_red_aa0000.png">
    </a>
    <div class="container">
      <h1 ref="appname">{{ $appName }}</h1>
      <chart></chart>
      <options></options>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.$options.sockets.add = (symbol) => { this.$store.dispatch('addItem', symbol); };
    this.$options.sockets.remove = (symbol) => { this.$store.dispatch('removeItem', symbol); };
    this.$options.sockets.connect = () => { this.$store.dispatch('init'); };
    this.$options.sockets.disconnect = () => { this.$store.dispatch('init'); };
  },
};
</script>

<style lang="scss">
$font: "Helvetica Neue",
Helvetica,
Arial,
sans-serif;

body {
  font-family: $font;
  font-size: 1em;
  line-height: 1.4;
  color: #444;
  margin: 0;
}

button,
input {
  font-family: $font;
}

@media (min-width: 768px) {
  .container {
    width: 750px;
  }
}

@media (min-width: 992px) {
  .container {
    width: 970px;
  }
}

h1 {
  font-weight: 500;
  line-height: 1.6;
  font-size: 1.6em;
}

p {
  margin: 0;
  font-size: 12px;
}

.container {
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}
</style>