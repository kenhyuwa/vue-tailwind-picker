# Vue Tailwind Picker
>Datepicker for vue.js of tailwindcss & dayjs

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
$ npm install vue-tailwind-picker --save
```

#### CDN

```html
<script src="https://unpkg.com/vue-tailwind-picker@1.0.2/dist/vue-tailwind-picker.min.js"></script>
```

If you are using native ES Modules, there is also an ES Modules compatible build:
```html
<script type="module">
  import VueTailwindPicker from 'https://cdn.jsdelivr.net/npm/vue-tailwind-picker@1.0.2/dist/vue-tailwind-picker.esm.js'
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
            :class-name="classObject"
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
                backgroundColor: '#1A202C',
                base: 'gray-800',
                hover: 'gray-700',
                color: {
                   default: 'white',
                   holiday: 'red-500',
                   weekend: 'indigo-400',
                   selected: 'teal-400',
                   event: 'blue-500',
                },
            } : 
            {
                 backgroundColor: '#FFFFFF',
                 base: 'gray-100',
                 hover: 'gray-200',
                 color: {
                   default: 'gray-700',
                   holiday: 'red-400',
                   weekend: 'green-400',
                   selected: 'red-500',
                   event: 'indigo-500',
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
    <td>className</td>
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
  </tbody>
</table>

## Contributing
please contribute to be better...

## License

[MIT](http://opensource.org/licenses/MIT)
