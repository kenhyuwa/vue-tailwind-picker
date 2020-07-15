# CHANGELOG
>All changes when a new version is released are documented here.

## 0.0.1
- First commit

## 0.0.2 
- Fix minor bug

## 1.0.0
- Major update
- Change all props to easy usage

## 1.0.1
- Support dark mode

## 1.0.3
- Fix closable when selected picker

## 1.1.0
- Major update
- Change props <code>:class-name</code> to <code>:theme</code>
- Fix style when purge Tailwind CSS is enable
- Add new props <code>auto-close</code>
- Fix reset picker when away

## 1.1.1
- Move dayjs to `peerDependencies`

## 1.1.2
- Move Tailwind CSS to `peerDependencies`
- Move Documentation to [Vue Tailwind Picker](https://vue-tailwind-picker.netlify.app/)

## 1.1.3
- Fix bug can't select <code>previous</code> year
- Add new props <code>:start-from-monday</code> default is <code>false</code>

## 1.1.4
- :tada: Tailwind CSS Datepicker SSR support now
- Support empty initial value
```vue
<template>
    <VueTailWindPicker
        :init="false"
        @change="(v) => value = v">
        <input v-model="value" placeholder="Example initial value">
    </VueTailWindPicker>
</template>
// ... 
<script >
    export default {
        components: { VueTailWindPicker: () => import('vue-tailwind-picker'), },
        data(){
            return {
                value: ''
            }
        },
        // ...
    }
</script>
```
- Add new props `init`, default `true`, if `true` set initial value with `start-date`, else set value with default value from `v-model` of input.
