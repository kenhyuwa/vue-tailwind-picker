# Vue Tailwind Picker
>Datepicker for vue.js of tailwindcss & dayjs

[![NPM](https://nodei.co/npm/vue-tailwind-picker.png?compact=true)](https://www.npmjs.com/package/vue-tailwind-picker)

![Example](https://raw.githubusercontent.com/kenhyuwa/vue-tailwind-picker/master/vue-tailwind-picker.gif)

##### Default
<p align="center">
  <img width="700px" src="https://raw.githubusercontent.com/kenhyuwa/vue-tailwind-picker/master/vue-tailwind-picker-light.png?raw=true">
</p>

##### Dark
<p align="center">
  <img width="700px" src="https://raw.githubusercontent.com/kenhyuwa/vue-tailwind-picker/master/vue-tailwind-picker-dark.png?raw=true">
</p>

## Installation
### NPM
```bash
$ npm install vue-tailwind-picker
```

### Yarn
```bash
$ yarn add vue-tailwind-picker
```

#### CDN

```html
<script src="https://unpkg.com/vue-tailwind-picker@1.1.0/dist/vue-tailwind-picker.min.js"></script>
```

If you are using native ES Modules, there is also an ES Modules compatible build:
```html
<script type="module">
  import VueTailwindPicker from 'https://cdn.jsdelivr.net/npm/vue-tailwind-picker@1.1.0/dist/vue-tailwind-picker.esm.js'
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
            :theme="classObject"
            :event-date="events"
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
            picker: '',
            darkMode: false, // change to dynamic variable, this is just example,
            events: []
        }
    },
    mounted() {
        // get event from API 
        // example response
        this.events = [
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
      ]
    },
    computed:{
        classObject(){
            return this.darkMode ? 
            {
                background: '#1A202C',
                text: 'text-white',
                border: 'border-gray-700',
                currentColor: 'text-gray-200',
                navigation: {
                    background: 'bg-gray-800',
                    hover: 'hover:bg-gray-700',
                    focus: 'bg-gray-700',
                },
                picker: {
                    rounded: 'rounded-md',
                    selected: {
                        background: 'bg-teal-400',
                        border: 'border-teal-400',
                        hover: 'hover:border-teal-400',
                    },
                    holiday: 'text-red-400',
                    weekend: 'text-green-400',
                    event: 'bg-blue-500',
                },
                event: {
                    border: 'border-gray-700',
                },
            } : 
            {
                 background: '#FFFFFF',
                 text: 'text-gray-700',
                 border: 'border-gray-200',
                 currentColor: 'text-gray-200',
                 navigation: {
                    background: 'bg-gray-100',
                    hover: 'hover:bg-gray-200',
                    focus: 'bg-gray-200',
                 },
                 picker: {
                    rounded: 'rounded-full',
                    selected: {
                        background: 'bg-red-500',
                        border: 'border-red-500',
                        hover: 'hover:border-red-500',
                    },
                    holiday: 'text-red-400',
                    weekend: 'text-green-400',
                    event: 'bg-indigo-500',
                 },
                 event: {
                    border: 'border-gray-200',
                 },
            }
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
    <td>theme</td>
    <td>Object</td>
    <td>false</td>
    <td>see example, default object is light mode</td>
  </tr>
  <tr>
    <td>eventDate</td>
    <td>Array</td>
    <td>false</td>
    <td>[]</td>
  </tr>
  <tr>
    <td>@change</td>
    <td>Event</td>
    <td>false</td>
    <td>$emit()</td>
  </tr>
  <tr>
    <td>autoClose</td>
    <td>Boolean</td>
    <td>false</td>
    <td>true</td>
  </tr>
  </tbody>
</table>

## Contributing
please contribute to be better...

## License

The MIT License (MIT). Please see [LICENSE](http://opensource.org/licenses/MIT) for more information.

## Changelog

Please see [CHANGELOG](CHANGELOG.md) for more information what has changed recently

_Made with love by [Ken](https://facebook.com/diaddemi)_
