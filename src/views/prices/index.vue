<template>
  <div>
    <group>
      <x-switch title="Show Me" v-model="show"></x-switch>
    </group>
    <div v-transfer-dom>
      <alert v-model="show" title="Congratulations" @on-show="onShow" @on-hide="onHide">7878</alert>
    </div>

    <group title="prop:content">
      <x-switch title="hjl" v-model="show2"></x-switch>
    </group>
    <div v-transfer-dom>
      <alert v-model="show2" title="kio" content="kl;"></alert>
    </div>

    <group title="1">
      <cell title="2" @click.native="showPlugin" is-link></cell>
      <cell title="3" @click.native="showPluginAuto" is-link></cell>
    </group>
  </div>
</template>



<script>
  import { Alert, Group, XSwitch, Cell, TransferDomDirective as TransferDom } from 'vux'
  export default {
    directives: {
      TransferDom
    },
    components: {
      Alert,
      Group,
      XSwitch,
      Cell
    },
    data () {
      return {
        show: false,
        show1: false,
        show2: false
      }
    },
    methods: {
      onHide () {
        console.log('on hide')
      },
      onShow () {
        console.log('on show')
      },
      showPlugin () {
        this.$vux.alert.show({
          title: 'VUX is Cool',
          content: this.$t('Do you agree?'),
          onShow () {
            console.log('Plugin: I\'m showing')
          },
          onHide () {
            console.log('Plugin: I\'m hiding now')
          }
        })
      },
      showPluginAuto () {
        this.showPlugin()
        setTimeout(() => {
          this.$vux.alert.hide()
      }, 3000)
      }
    }
  }
</script>
