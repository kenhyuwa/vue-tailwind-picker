# Props
## `Star Date`
- Type: `String`
- Required: `false`
- Default: `dayjs().format('YYYY-MM-DD')`

To determine the start date, the previous date will be disabled.

## `End Date`
- Type: `String`
- Required: `false`
- Default: `undefined`

To determine the start date, the next date will be disabled.

## `Format Date`
- Type: `String`
- Required: `false`
- Default: `YYYY-MM-DD`

to determine the date format to be used. read of [dayjs](//day.js.org/docs/en/parse/string-format).

## `Event Date`
- Type: `Array`
- Required: `false`
- Default: `[]`

You can use events in datepicker, by default you need 3 key objects date, description, holiday.
example:

```vue
:event-date=[
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
```

## `Inline`
- Type: `Boolean`
- Required: `false`
- Default: `false`

to determine whether the datepicker is displayed inline or as a dropdown.

## `Auto Close`
- Type: `Boolean`
- Required: `false`
- Default: `true`

to determine whether the datepicker closes after the selected date

## `Theme`
- Type: `Object`
- Required: `false`
- Default:
```vue
    :theme={
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
```

to configure the theme of the datepicker, refer to the colors provided by [tailwindcss](//tailwindcss.com/docs/customizing-colors#default-color-palette).

### Theme Advance
#### `background`
background of datepicker.
#### `text`
text color for datepicker, including detail date, day, date, and event description.
#### `border`
border color of datepicker.
#### `currentColor`
this is must be match with border color, because this is border of arrow datepicker when props `inline=true`.
example:
if border is `border-red-500` currentColor must be `text-red-500`
#### `navigation`
this is navigation `previous` and `next` of datepicker.
##### `background`
background for navigation.
##### `hover`
background of arrow `previous` and `next` including if `month` or `year` selected.
##### `focus`
background when `month` or `year` selected.
#### `picker`
body of datepicker, expect `navigation` and `events`.
##### `rounded`
rounded corner if date selected.
##### `selected`
###### `background`
background if date selected.
###### `border`
border if date selected.
###### `hover`
border if date on hover and date not disabled.
##### `holiday`
color for holiday date and day is sunday.
##### `weekend`
color for date if day is friday.
##### `event`
`dot` of date if date of event holiday is `true`.
#### `event`
##### `border`
border space between body and events of datepicker.
