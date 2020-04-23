<template>
  <div class="relative select-none" :class="className.textColor">
    <div>
      <slot></slot>
      <transition name="v-tailwind-picker">
        <div
          id="v-tailwind-picker"
          class="absolute bottom-0 inset-x-0 bg-transparent mt-3 z-10"
          :class="{ 'inline-mode': inline }"
        >
          <div
            class="w-full h-auto max-w-xs transition-all duration-150 ease-linear bg-white rounded overflow-hidden border"
            :class="[className.borderColor, className.shadow]"
          >
            <div id="v-tailwind-picker-header">
              <div class="flex flex-row justify-center items-center p-3">
                <div class="flex items-center font-semibold text-2xl xl:text-3xl leading-none">
                  {{ today.format('DD') }}
                </div>
                <div class="mx-1">
                  <div class="leading-none text-sm">{{ today.format('MMMM YYYY') }}</div>
                  <div class="leading-none text-xs">{{ today.format('dddd') }}</div>
                </div>
              </div>
            </div>

            <div class="relative px-1 py-2">
              <div class="absolute inset-0" :class="className.pagination.backgroundColor"></div>
              <div class="flex justify-between items-center relative">
                <div class="flex-shrink-0 w-8">
                  <transition name="v-tailwind-picker-chevron-left">
                    <div v-if="!enableMonth && !enableYear" class="rounded-full overflow-hidden">
                      <div
                        class="transition duration-150 ease-out p-2"
                        :class="[
                          visiblePrev ? 'cursor-pointer' : 'cursor-not-allowed opacity-30',
                          className.pagination.textColor,
                          `hover:${className.pagination.hover}`,
                        ]"
                        @click="onPrevious()"
                      >
                        <svg
                          class="h-4 w-auto fill-current"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 511.641 511.641"
                        >
                          <path
                            d="M148.32 255.76L386.08 18c4.053-4.267 3.947-10.987-.213-15.04a10.763 10.763 0 00-14.827 0L125.707 248.293a10.623 10.623 0 000 15.04L371.04 508.667c4.267 4.053 10.987 3.947 15.04-.213a10.763 10.763 0 000-14.827L148.32 255.76z"
                          />
                        </svg>
                      </div>
                    </div>
                  </transition>
                </div>
                <div class="flex flex-1" :class="className.pagination.textColor">
                  <div
                    class="flex-1 rounded overflow-hidden py-1 ml-2 mr-1 font-semibold text-center cursor-pointer transition duration-150 ease-out"
                    @click="toggleMonth()"
                    :class="`hover:${className.pagination.hover}`"
                  >
                    {{ today.format('MMMM') }}
                  </div>
                  <div
                    class="flex-1 rounded overflow-hidden py-1 mr-2 ml-1 font-semibold text-center cursor-pointer transition duration-150 ease-out"
                    @click="toggleYear()"
                    :class="`hover:${className.pagination.hover}`"
                  >
                    {{ today.$y }}
                  </div>
                </div>

                <div class="flex-shrink-0 w-8">
                  <transition name="v-tailwind-picker-chevron-right">
                    <div class="rounded-full overflow-hidden" v-if="!enableMonth && !enableYear">
                      <div
                        class="transition duration-150 ease-out p-2"
                        :class="[
                          visibleNext ? 'cursor-pointer' : 'cursor-not-allowed opacity-30',
                          className.pagination.textColor,
                          `hover:${className.pagination.hover}`,
                        ]"
                        @click="onNext()"
                      >
                        <svg
                          class="h-4 w-auto fill-current"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 511.949 511.949"
                        >
                          <path
                            d="M386.235 248.308L140.902 2.975c-4.267-4.053-10.987-3.947-15.04.213a10.763 10.763 0 000 14.827l237.76 237.76-237.76 237.867c-4.267 4.053-4.373 10.88-.213 15.04 4.053 4.267 10.88 4.373 15.04.213l.213-.213 245.333-245.333a10.624 10.624 0 000-15.041z"
                          />
                        </svg>
                      </div>
                    </div>
                  </transition>
                </div>
              </div>
            </div>

            <div class="smooth-scrolling overflow-x-hidden overflow-y-auto">
              <transition name="v-tailwind-picker-body">
                <div v-if="!enableMonth && !enableYear" class="relative">
                  <div class="flex flex-no-wrap py-1 border-b" :class="className.borderColor">
                    <div v-for="(day, i) in days" :key="day" class="w-1/7 flex justify-center">
                      <div
                        class="leading-relaxed text-sm"
                        :class="[classicTheme ? (i === 0 ? 'text-red-500' : i === 5 ? 'text-green-500' : '') : '']"
                      >
                        {{ day }}
                      </div>
                    </div>
                  </div>

                  <div class="flex flex-wrap relative">
                    <div
                      v-for="(date, i) in previousPicker"
                      :key="`${date.$D}${date.$M}${date.$y}-previous`"
                      class="w-1/7 flex justify-center cursor-not-allowed bg-gray-200 my-px"
                      :class="{ 'rounded-r-full': i === previousPicker.length - 1 }"
                    >
                      <div class="relative h-8 w-8 flex justify-center items-center">
                        <div class="flex justify-center items-center" :data-tailwind-datepicker="date.$d">
                          <div
                            class="text-xs opacity-50"
                            :class="[
                              classicTheme
                                ? date.day() === 0
                                  ? 'text-red-500'
                                  : date.day() === 5
                                  ? 'text-green-500'
                                  : ''
                                : '',
                            ]"
                          >
                            {{ date.$D }}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      v-for="date in currentPicker"
                      :key="`${date.$D}${date.$M}${date.$y}-current`"
                      class="w-1/7 group flex justify-center items-center my-px py-px"
                    >
                      <div class="relative">
                        <div
                          v-if="date.$events"
                          class="absolute top-0 right-0 h-2 w-2 rounded-full z-10"
                          :class="[{ 'bg-indigo-500': !date.$events.color }]"
                          :style="{
                            backgroundColor: date.$events.color ? date.$events.color : '',
                          }"
                        ></div>
                        <div class="relative h-8 w-8 flex justify-center items-center rounded-full overflow-hidden">
                          <div
                            v-if="possibleDate(date)"
                            class="absolute inset-0 rounded-full transition duration-150 ease-in-out border-dotted border-transparent"
                            :class="[
                              {
                                border: date.$D !== today.$D,
                              },
                              date.$D === today.$D ? className.calendar.selected.backgroundColor : 'cursor-pointer',
                              `hover:${className.calendar.selected.borderColor}`,
                            ]"
                            @click="changePicker(date)"
                          ></div>
                          <div class="flex justify-center items-center" :data-tailwind-datepicker="date.$d">
                            <div
                              :class="[
                                {
                                  'text-red-500':
                                    (holidayDate(date) || date.day() === 0) && date.$D !== today.$D && classicTheme,
                                },
                                {
                                  'text-green-500': date.day() === 5 && date.$D !== today.$D && classicTheme,
                                },
                                {
                                  [`z-10 ${className.calendar.selected.textColor} font-semibold`]: date.$D === today.$D,
                                },
                                { 'opacity-50 cursor-not-allowed': !possibleDate(date) },
                              ]"
                            >
                              <span>{{ date.$D }}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      v-for="date in nextPicker"
                      :key="`${date.$D}${date.$M}${date.$y}-next`"
                      class="w-1/7 flex justify-center cursor-not-allowed bg-gray-200 my-px"
                      :class="{ 'rounded-l-full': date.$D === 1 }"
                    >
                      <div class="relative h-8 w-8 flex justify-center items-center">
                        <div class="flex justify-center items-center" :data-tailwind-datepicker="date.$d">
                          <div
                            class="text-xs opacity-50"
                            :class="[
                              classicTheme
                                ? date.day() === 0
                                  ? 'text-red-500'
                                  : date.day() === 5
                                  ? 'text-green-500'
                                  : ''
                                : '',
                            ]"
                          >
                            {{ date.$D }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </transition>

              <transition name="v-tailwind-picker-months-and-year">
                <div v-if="enableMonth" class="relative smooth-scrolling overflow-y-auto overflow-x-hidden">
                  <div class="flex flex-wrap py-1">
                    <div v-for="(month, i) in months" :key="i" class="w-1/3 flex justify-center items-center px-2">
                      <div
                        :class="[
                          i === today.$M ? className.monthAndYear.borderColor : className.borderColor,
                          `hover:${className.monthAndYear.borderColor}`,
                        ]"
                        class="w-full flex justify-center items-center py-2 my-1 transition duration-150 ease-out rounded border cursor-pointer"
                        @click="setMonth(i)"
                      >
                        <span>{{ month }}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="enableYear" class="relative smooth-scrolling overflow-y-auto overflow-x-hidden">
                  <div class="flex flex-wrap py-1">
                    <div v-for="(year, i) in years" :key="i" class="w-1/3 flex justify-center items-center px-2">
                      <div
                        :class="[
                          year === today.$y ? className.monthAndYear.borderColor : className.borderColor,
                          `hover:${className.monthAndYear.borderColor}`,
                        ]"
                        class="w-full flex justify-center items-center py-2 my-1 transition duration-150 ease-out rounded border cursor-pointer"
                        @click="setYear(year)"
                      >
                        <span>{{ year }}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  v-if="currentPicker.filter(o => o.$events !== undefined).length > 0 && !visibleMonth && !visibleYear"
                  id="v-tailwind-picker-footer"
                >
                  <transition-group
                    name="v-tailwind-picker-footer"
                    tag="div"
                    class="flex flex-wrap border-t px-2 py-1"
                    :class="className.borderColor"
                  >
                    <div
                      v-for="(event, i) in currentPicker.filter(o => o.$events !== undefined)"
                      :key="`${i}-event`"
                      class="w-full flex"
                    >
                      <div class="flex-shrink-0">
                        <div class="text-xs">{{ dayjs(event.$events.date, formatDate).$D }}</div>
                      </div>
                      <div class="text-xs mx-1">{{ event.$events.event }}</div>
                    </div>
                  </transition-group>
                </div>
              </transition>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'

import isToday from 'dayjs/plugin/isToday'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import isBetween from 'dayjs/plugin/isBetween'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import advancedFormat from 'dayjs/plugin/advancedFormat'

dayjs.extend(isToday)
dayjs.extend(customParseFormat)
dayjs.extend(isBetween)
dayjs.extend(localizedFormat)
dayjs.extend(advancedFormat)

// import './css/tailwind.css' // development only

export default {
  name: 'vue-tailwind-picker',
  props: {
    startDate: {
      type: String,
      required: false,
      default: dayjs().format('YYYY-MM-DD'),
    },
    endDate: {
      type: String,
      required: false,
      default: undefined,
    },
    disableDate: {
      type: Array,
      required: false,
      default: () => [],
    },
    eventDate: {
      type: Array,
      required: false,
      default: () => [],
    },
    formatDate: {
      type: String,
      required: false,
      default: 'YYYY-MM-DD',
    },
    formatDisplay: {
      type: String,
      required: false,
      default: 'YYYY-MM-DD',
    },
    tailwindPickerValue: {
      type: String,
      required: false,
      default: '',
    },
    inline: {
      type: Boolean,
      required: false,
      default: true,
    },
    classicTheme: {
      type: Boolean,
      required: false,
      default: true,
    },
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
  },
  data() {
    const startDatepicker = dayjs(this.startDate, this.formatDate)
    const endDatepicker = this.endDate ? dayjs(this.endDate, this.formatDate) : undefined
    const today = dayjs(this.startDate, this.formatDate)
    const months = Array.from(Array(12), (v, i) => {
      return dayjs()
        .month(i)
        .format('MMMM')
    })
    const years = Array.from(
      Array(this.endDate ? endDatepicker.diff(today, 'year') : dayjs().diff(today, 'year') + 10),
      (v, i) => {
        return dayjs().add(i, 'year').$y
      },
    )
    const visibleMonth = false
    const visibleYear = false
    return {
      startDatepicker,
      endDatepicker,
      today,
      visibleMonth,
      months,
      visibleYear,
      years,
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    dayjs,
    init() {
      this.emit()
    },
    emit() {
      this.$emit('tailwind-change', this.today.format(this.formatDisplay))
    },
    changePicker(date) {
      this.today = date
      this.emit()
    },
    onPrevious() {
      if (this.visiblePrev) {
        this.today = this.today
          .set('month', this.today.$M === 0 ? 11 : this.today.$M - 1)
          .set('year', this.today.$M === 0 ? this.today.$y - 1 : this.today.$y)
        this.emit()
      }
    },
    onNext() {
      if (this.visibleNext) {
        this.today = this.today
          .set('month', (this.today.$M + 1) % 12)
          .set('year', this.today.$M === 11 ? this.today.$y + 1 : this.today.$y)
        this.emit()
      }
    },
    possibleDate(date) {
      return this.endDate ? date.isBetween(this.startDatepicker, this.endDatepicker.add(1, 'day'), 'day', '[)') : true
    },
    holidayDate(date) {
      return !!(date.$events && date.$events.holiday)
    },
    toggleMonth() {
      this.visibleMonth = !this.visibleMonth
      if (this.visibleMonth) {
        this.visibleYear = false
      }
    },
    toggleYear() {
      this.visibleYear = !this.visibleYear
      if (this.visibleYear) {
        this.visibleMonth = false
      }
    },
    setMonth(month) {
      this.today = this.today.set('month', month)
      this.emit()
      this.toggleMonth()
    },
    setYear(year) {
      this.today = this.today.set('year', year)
      this.emit()
      this.toggleYear()
    },
  },
  computed: {
    days() {
      return Array.from(Array(7), (v, i) => {
        return dayjs()
          .day(i)
          .format('ddd')
      })
    },
    previousPicker() {
      const display = []
      const previous = this.today.date(0)
      const current = this.today.date(0)
      for (let i = 0; i <= current.day(); i++) {
        display.push(previous.subtract(i, 'day'))
      }
      return display.sort((a, b) => a.$d - b.$d)
    },
    currentPicker() {
      return Array.from(Array(this.today.daysInMonth()), (v, i) => {
        const events = this.today.date(++i)
        events.$events = this.eventDate.find(o => {
          return o.date === events.format(this.formatDate)
        })
        return events
      })
    },
    nextPicker() {
      const display = []
      const previous = this.previousPicker.length
      const current = this.today.daysInMonth()
      for (let i = 1; i <= 42 - (previous + current); i++) {
        display.push(
          dayjs()
            .date(i)
            .month(this.today.$M + 1),
        )
      }
      return display
    },
    enableMonth() {
      return this.visibleMonth
    },
    enableYear() {
      return this.visibleYear
    },
    visiblePrev() {
      return this.today.diff(this.startDate, 'month') > 0
    },
    visibleNext() {
      return this.endDate ? this.endDatepicker.diff(this.today, 'month') > 0 : true
    },
  },
}
</script>

<style scoped>
#v-tailwind-picker {
  top: 95%;
}

#v-tailwind-picker:not(.inline-mode)::before {
  content: '';
  width: 14px;
  height: 14px;
  z-index: 10;
  top: -7px;
  left: 12px;
  border-radius: 2px;
  display: block;
  position: absolute;
  background: #ffffff;
  border-top: 1px solid #e2e8f0;
  border-left: 1px solid #e2e8f0;
  transform: rotate(45deg);
}

#v-tailwind-picker .smooth-scrolling {
  height: 248px;
  max-height: 250px;
}

.w-1\/7 {
  width: 14.285714%;
}

.v-tailwind-picker-enter-active,
.v-tailwind-picker-leave-active {
  transition: all 0.1s;
}

.v-tailwind-picker-enter,
.v-tailwind-picker-leave-to {
  opacity: 0;
  transform: translateY(15px);
}

.v-tailwind-picker-chevron-left-enter-active,
.v-tailwind-picker-chevron-left-leave-active {
  transition: all 0.2s;
}

.v-tailwind-picker-chevron-left-enter,
.v-tailwind-picker-chevron-left-leave-to {
  opacity: 0;
  transform: translateX(-15px);
}

.v-tailwind-picker-chevron-right-enter-active,
.v-tailwind-picker-chevron-right-leave-active {
  transition: all 0.2s;
}

.v-tailwind-picker-chevron-right-enter,
.v-tailwind-picker-chevron-right-leave-to {
  opacity: 0;
  transform: translateX(15px);
}

.v-tailwind-picker-body-enter-active,
.v-tailwind-picker-body-leave-active {
  transition: all 0.2s;
}

.v-tailwind-picker-body-enter,
.v-tailwind-picker-body-leave-to {
  opacity: 0;
  transform: translateY(-15px);
}

.v-tailwind-picker-footer-enter-active,
.v-tailwind-picker-footer-leave-active {
  transition: all 0.2s;
}

.v-tailwind-picker-footer-enter,
.v-tailwind-picker-footer-leave-to {
  opacity: 0;
  transform: translateY(-15px);
}

.v-tailwind-picker-months-and-year-enter-active,
.v-tailwind-picker-months-and-year-leave-active {
  transition: all 0.2s;
}

.v-tailwind-picker-months-and-year-enter,
.v-tailwind-picker-months-and-year-leave-to {
  opacity: 0;
  transform: translateY(-15px);
}
</style>
