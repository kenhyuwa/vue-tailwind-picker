# Vue Tailwind Picker
>Datepicker for vue.js & tailwindcss, build with dayjs

<p align="center">
  <img width="700px" src="https://raw.githubusercontent.com/kenhyuwa/vue-tailwind-picker/master/vue-tailwind-picker.png?raw=true">
</p>

## Installation

```bash
$ npm install vue-tailwind-picker --save
```

## Usage

```javascript
import Vue from 'vue'
import VueTailwindPicker from 'vue-tailwind-picker'

Vue.use(VueTailwindPicker)
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
    <td>formatDisplay</td>
    <td>String</td>
    <td>false</td>
    <td>YYYY-MM-DD</td>
  </tr>
  <tr>
    <td>tailwindPickerValue</td>
    <td>String</td>
    <td>false</td>
    <td>null or ''</td>
  </tr>
  <tr>
    <td>inline</td>
    <td>Boolean</td>
    <td>false</td>
    <td>true</td>
  </tr>
  <tr>
    <td>classicTheme</td>
    <td>Boolean</td>
    <td>false</td>
    <td>true</td>
  </tr>
  </tbody>
</table>

### other props for matching with tailwindcss

```javascript
... // e.g
className: {
  type: Object,
  required: false,
  default: () => ({
    shadow: 'shadow',
    borderColor: 'border-gray-300',
    textColor: 'text-gray-800',
    pagination: {
      backgroundColor: 'bg-teal-500',
      hover: 'bg-teal-600',
      textColor: 'text-gray-100',
    },
    monthAndYear: {
      borderColor: 'border-teal-500',
    },
    calendar: {
      selected: {
        backgroundColor: 'bg-teal-500',
        textColor: 'text-white',
        borderColor: 'border-teal-600',
      },
    },
  }),
},
```

## License

[MIT](http://opensource.org/licenses/MIT)
