# Vue Tailwind Picker
>Datepicker for vue.js of tailwindcss & dayjs

<p align="center">
  <img width="700px" src="https://raw.githubusercontent.com/kenhyuwa/vue-tailwind-picker/master/vue-tailwind-picker.png?raw=true">
</p>

## Installation
### NPM
```bash
$ npm install vue-tailwind-picker --save
```

#### CDN

```html
<script src="https://unpkg.com/vue-tailwind-picker@1.0.1/dist/vue-tailwind-picker.min.js"></script>
```

If you are using native ES Modules, there is also an ES Modules compatible build:
```html
<script type="module">
  import VueTailwindPicker from 'https://cdn.jsdelivr.net/npm/vue-tailwind-picker@1.0.1/dist/vue-tailwind-picker.esm.js'
</script>
```

## Usage
Vue.js

```javascript
import VueTailwindPicker from 'vue-tailwind-picker'
export default {
  components: {
    VueTailwindPicker  
  }
}
```

Nuxt.js
Create plugin inside plugins directory e.g v-tailwind-picker.js

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

## Example on nuxt.js

```vue
<template>
    <client-only>
        <VueTailwindPicker
            start-date="2020-01-01"
            end-date="2021-12-31"
            format-date="YYYY-MM-DD"
            :inline="true"
            :class-name="{
                base: 'gray-100',
                hover: 'gray-200',
                color: {
                    default: 'gray-700',
                    holiday: 'red-400',
                    weekend: 'green-400',
                    selected: 'red-500',
                    event: 'indigo-500',
                },
            }"
            :event-date="[
                {
                    date: '2020-01-01',
                    description: 'Happy new year',
                    holiday: true,
                },
                {
                    date: '2020-02-14',
                    description: 'Happy valentine day',
                    holiday: false,
                },
            ]"
            @change="(v) => (picker = v)"
        >
        <input
          v-model="picker"
          type="text"
          placeholder="Datepicker"
          readonly
        />
        </VueTailwindPicker>
    </client-only>
</template>

<script>
export default {
    data() {
        return {
            picker: ''
        }
    }
}
</script>
```

## Options/Props

<table>
  <thead>
  <tr>
    <th>Props</th>
    <th>Type</th>
    <th>Required</th>
    <th>Default</th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>startDate</td>
    <td>String</td>
    <td>false</td>
    <td>dayjs().format('YYYY-MM-DD')</td>
  </tr>
  <tr>
    <td>endDate</td>
    <td>String</td>
    <td>false</td>
    <td><i>undefined</i></td>
  </tr>
  <tr>
    <td>formatDate</td>
    <td>String</td>
    <td>false</td>
    <td>YYYY-MM-DD</td>
  </tr>
  <tr>
    <td>inline</td>
    <td>Boolean</td>
    <td>false</td>
    <td>false</td>
  </tr>
  <tr>
    <td>className</td>
    <td>Object</td>
    <td>false</td>
    <td>see example</td>
  </tr>
  <tr>
    <td>@change</td>
    <td>Event</td>
    <td>false</td>
    <td>$emit()</td>
  </tr>
  </tbody>
</table>

## Contributing
please contribute to be better...

## License

[MIT](http://opensource.org/licenses/MIT)
