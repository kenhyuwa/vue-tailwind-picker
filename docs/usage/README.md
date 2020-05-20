# Usage

::: warning
[Tailwindcss](//tailwindcss.com) must be installed in your project
:::

## Vuejs
if you have used component packages from vue, this will be very easy for you.

```vue
<template>
    <div>
        <VueTailwindPicker
            @change="(v) => checkin = v"
        >
            <input type="text" v-model="checkin" />
        </VueTailwindPicker>
    </div>
</template>
<script>

export default {
  components: {
    VueTailwindPicker  
  },
  data(){
    return {
        checkin: '',
    }   
  }
}
</script>
```

## Nuxtjs

You can create plugin inside plugins directory e.g v-tailwind-picker.js or you just import at component.

```javascript
import Vue from 'vue'
import VueTailwindPicker from 'vue-tailwind-picker'

Vue.use(VueTailwindPicker)
```

then add to nuxt.config.js
```javascript
{
  plugins: [
    '~/plugins/v-tailwind-picker'
  ]
}
```

```vue
<template>
    <client-only>
        <VueTailwindPicker
            @change="(v) => checkin = v"
        >
            <input type="text" v-model="checkin" />
        </VueTailwindPicker>
    </client-only>
</template>
<script>

export default {
  data(){
    return {
        checkin: '',
    }   
  }
}
</script>
```
