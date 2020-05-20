# Mode
vue-tailwind-picker gives you the freedom to determine the theme you want to use as long as it does not deviate from the basic color of the tailwindcss. below are 2 examples if you use the darkmode theme for example.

## Light

by default the theme in vue tailwind picker is as below:

```vue
<VueTailwindPicker
    @change="(v) => checkin = v"
  >
  <input type="text" v-mode="checkin"/>
</VueTailwindPicker>
```

the result is:

<LightPicker />

## Dark

if you want to change the theme, you can simply change from the <code>:theme</code> props as below

```vue
<VueTailwindPicker
    :theme="{
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
    }"
    @change="(v) => checkin = v"
  >
  <input type="text" v-mode="checkin"/>
</VueTailwindPicker>
```

the result is:

<DarkPicker />

<br/>
<br/>
<br/>
You are free to use all colors from tailwindcss here. just how you will explore

