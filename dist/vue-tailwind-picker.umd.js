(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('dayjs'), require('dayjs/plugin/isToday'), require('dayjs/plugin/customParseFormat'), require('dayjs/plugin/isBetween'), require('dayjs/plugin/localizedFormat'), require('dayjs/plugin/advancedFormat'), require('dayjs/plugin/isSameOrBefore'), require('dayjs/plugin/isSameOrAfter')) :
  typeof define === 'function' && define.amd ? define(['exports', 'dayjs', 'dayjs/plugin/isToday', 'dayjs/plugin/customParseFormat', 'dayjs/plugin/isBetween', 'dayjs/plugin/localizedFormat', 'dayjs/plugin/advancedFormat', 'dayjs/plugin/isSameOrBefore', 'dayjs/plugin/isSameOrAfter'], factory) :
  (global = global || self, factory(global.VueTailwindPicker = {}, global.dayjs, global['dayjs/plugin/isToday'], global['dayjs/plugin/customParseFormat'], global['dayjs/plugin/isBetween'], global['dayjs/plugin/localizedFormat'], global['dayjs/plugin/advancedFormat'], global['dayjs/plugin/isSameOrBefore'], global['dayjs/plugin/isSameOrAfter']));
}(this, (function (exports, dayjs, isToday, customParseFormat, isBetween, localizedFormat, advancedFormat, isSameOrBefore, isSameOrAfter) { 'use strict';

  dayjs = dayjs && Object.prototype.hasOwnProperty.call(dayjs, 'default') ? dayjs['default'] : dayjs;
  isToday = isToday && Object.prototype.hasOwnProperty.call(isToday, 'default') ? isToday['default'] : isToday;
  customParseFormat = customParseFormat && Object.prototype.hasOwnProperty.call(customParseFormat, 'default') ? customParseFormat['default'] : customParseFormat;
  isBetween = isBetween && Object.prototype.hasOwnProperty.call(isBetween, 'default') ? isBetween['default'] : isBetween;
  localizedFormat = localizedFormat && Object.prototype.hasOwnProperty.call(localizedFormat, 'default') ? localizedFormat['default'] : localizedFormat;
  advancedFormat = advancedFormat && Object.prototype.hasOwnProperty.call(advancedFormat, 'default') ? advancedFormat['default'] : advancedFormat;
  isSameOrBefore = isSameOrBefore && Object.prototype.hasOwnProperty.call(isSameOrBefore, 'default') ? isSameOrBefore['default'] : isSameOrBefore;
  isSameOrAfter = isSameOrAfter && Object.prototype.hasOwnProperty.call(isSameOrAfter, 'default') ? isSameOrAfter['default'] : isSameOrAfter;

  //

  dayjs.extend(isToday);
  dayjs.extend(customParseFormat);
  dayjs.extend(isBetween);
  dayjs.extend(localizedFormat);
  dayjs.extend(advancedFormat);
  dayjs.extend(isSameOrBefore);
  dayjs.extend(isSameOrAfter);

  var handleOutsideClick;

  // import './css/tailwind.css' // Development only

  /**
   * Author: kenhyuwa <wahyu.dhiraashandy8@gmail.com
   * Url: https://github.com/kenhyuwa
   **/

  var script = {
    name: 'VueTailwindPicker',
    directives: {
      closable: {
        // https://github.com/TahaSh/vue-closable // resource
        bind: function bind(el, binding, vnode) {
          // Here's the click/touchstart handler
          // (it is registered below)
          handleOutsideClick = function (e) {
            e.stopPropagation();
            // Get the handler method name and the exclude array
            // from the object used in v-closable
            var ref = binding.value;
            var handler = ref.handler;
            var exclude = ref.exclude;

            // This variable indicates if the clicked element is excluded
            var clickedOnExcludedEl = false;
            if (exclude) {
              exclude.forEach(function (refName) {
                // We only run this code if we haven't detected
                // any excluded element yet
                if (!clickedOnExcludedEl) {
                  // Get the element using the reference name
                  var excludedEl = vnode.context.$refs[refName];
                  // See if this excluded element
                  // is the same element the user just clicked on
                  clickedOnExcludedEl = excludedEl
                    ? excludedEl.contains(e.target)
                    : false;
                }
              });
            }

            // We check to see if the clicked element is not
            // the dialog element and not excluded
            if (clickedOnExcludedEl && vnode.context.autoClose) {
              vnode.context[handler]();
            }
            if (!el.contains(e.target) && !clickedOnExcludedEl) {
              // If the clicked element is outside the dialog
              // and not the button, then call the outside-click handler
              // from the same component this directive is used in
              vnode.context[handler]();
            }
          };
          // Register click/touchstart event listeners on the whole page
          document.addEventListener('click', handleOutsideClick);
          document.addEventListener('touchstart', handleOutsideClick);
        },

        unbind: function unbind() {
          // If the element that has v-closable is removed, then
          // unbind click/touchstart listeners from the whole page
          document.removeEventListener('click', handleOutsideClick);
          document.removeEventListener('touchstart', handleOutsideClick);
        },
      },
    },
    props: {
      init: {
        type: Boolean,
        required: false,
        default: true,
      },
      selectedDate: {
        type: String,
        required: false,
      },
      startDate: {
        type: String,
        required: false,
      },
      endDate: {
        type: String,
        required: false,
        default: undefined,
      },
      // Next future
      disableDate: {
        type: Array,
        required: false,
        default: function () { return []; },
      },
      eventDate: {
        type: Array,
        required: false,
        default: function () { return []; },
      },
      formatDate: {
        type: String,
        required: false,
        default: 'YYYY-MM-DD',
      },
      // Confused with this
      formatDisplay: {
        type: String,
        required: false,
        default: 'YYYY-MM-DD',
      },
      inline: {
        type: Boolean,
        required: false,
        default: false,
      },
      // Not make sure with this
      tailwindPickerValue: {
        type: String,
        required: false,
        default: '',
      },
      // Next future
      dateRange: {
        type: Boolean,
        required: false,
        default: false,
      },
      // Next future
      autoClose: {
        type: Boolean,
        required: false,
        default: true,
      },
      startFromMonday: {
        type: Boolean,
        required: false,
        default: false,
      },
      theme: {
        type: Object,
        required: false,
        default: function () { return ({
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
        }); },
      },
    },
    data: function data() {
      var startDatepicker = this.startDate ? dayjs(this.startDate, this.formatDate) : dayjs();
      // Featured for my own project
      //   .add(
      //   dayjs().hour() >= 20 ? 1 : 0,
      //   'day',
      // )
      var endDatepicker = this.endDate
        ? dayjs(this.endDate, this.formatDate)
        : undefined;
      var today = this.selectedDate && this.startDate < this.selectedDate
        ? dayjs(this.selectedDate, this.formatDate)
        : dayjs(startDatepicker, this.formatDate);
      var months = Array.from(Array(12), function (v, i) {
        return dayjs().month(i).format('MMMM')
      });
      var years = Array.from(
        Array(
          this.endDate
            ? endDatepicker.diff(today, 'year') + 1
            : today.diff(today, 'year') + 36
        ),
        function (v, i) {
          return today.add(i, 'year').$y
        }
      );
      var visibleMonth = false;
      var visibleYear = false;
      var showPicker = false;
      return {
        startDatepicker: startDatepicker,
        endDatepicker: endDatepicker,
        today: today,
        visibleMonth: visibleMonth,
        months: months,
        visibleYear: visibleYear,
        years: years,
        showPicker: showPicker,
      }
    },
    computed: {
      days: function days() {
        var customWeekend = this.startFromMonday ? 1 : 0;
        return Array.from(Array(7), function (v, i) {
          return dayjs()
            .day(i + customWeekend)
            .format('ddd')
        })
      },
      previousPicker: function previousPicker() {
        var customWeekend = this.startFromMonday ? 1 : 0;
        var display = [];
        var previous = this.today.date(0);
        var current = this.today.date(0);
        for (var i = 0; i <= current.day() - customWeekend; i++) {
          display.push(previous.subtract(i, 'day'));
        }
        return display.sort(function (a, b) { return a.$d - b.$d; })
      },
      currentPicker: function currentPicker() {
        var this$1 = this;

        var customWeekend = this.startFromMonday ? 1 : 0;
        var eventDate = this.eventDate.length > 0 ? this.eventDate : [];
        return Array.from(
          Array(this.today.daysInMonth() - customWeekend),
          function (v, i) {
            var events = this$1.today.date(++i);
            events.$events = eventDate.find(function (o) {
              return o.date === events.format(this$1.formatDate)
            });
            return events
          }
        )
      },
      nextPicker: function nextPicker() {
        var customWeekend = this.startFromMonday ? 1 : 0;
        var display = [];
        var previous = this.previousPicker.length;
        var current = this.today.daysInMonth();
        for (var i = 1; i <= 42 - (previous + current) + customWeekend; i++) {
          display.push(this.today.date(i).add(1, 'month'));
        }
        return display
      },
      enableMonth: function enableMonth() {
        return this.visibleMonth
      },
      enableYear: function enableYear() {
        return this.visibleYear
      },
      visiblePrev: function visiblePrev() {
        if (!this.dateRange) {
          var endOf = this.today.subtract(1, 'month').endOf('month');
          var diff = this.startDatepicker.diff(endOf, 'day');
          return diff < this.today.daysInMonth() - this.today.$D
        }
        return true
      },
      visibleNext: function visibleNext() {
        if (!this.dateRange && this.endDate) {
          var startOf = this.today.add(1, 'month').startOf('month');
          return this.endDatepicker.diff(startOf, 'day') > 0
        }
        return true
      },
    },
    watch: {
      showPicker: function showPicker(prev, next) {
        if (prev) {
          this.visibleMonth = next;
          this.visibleYear = next;
        }
      },
    },
    mounted: function mounted() {
      if (this.init) { this.emit(); }
    },
    methods: {
      dayjs: dayjs,
      emit: function emit() {
        this.$emit('change', this.today.format(this.formatDate));
      },
      changePicker: function changePicker(date) {
        this.today = date;
        this.emit();
        this.showPicker = !this.showPicker;
      },
      onPrevious: function onPrevious() {
        if (this.visiblePrev) {
          var today = this.today
            .set('month', this.today.$M === 0 ? 11 : this.today.$M - 1)
            .set('year', this.today.$M === 0 ? this.today.$y - 1 : this.today.$y);
          if (this.possibleDate(today)) {
            this.today = today;
          } else {
            this.today = this.startDatepicker;
          }
          this.emit();
        }
      },
      onNext: function onNext() {
        if (this.visibleNext) {
          var today = this.today
            .set('month', (this.today.$M + 1) % 12)
            .set('year', this.today.$M === 11 ? this.today.$y + 1 : this.today.$y);
          if (this.possibleDate(today)) {
            this.today = today;
          } else {
            this.today = this.endDatepicker;
          }
          this.emit();
        }
      },
      possibleStartDate: function possibleStartDate(date) {
        return this.dateRange
          ? true
          : date.isSameOrAfter(this.startDatepicker, 'day')
      },
      possibleEndDate: function possibleEndDate(date) {
        if (this.endDate) {
          return this.dateRange
            ? true
            : date.isSameOrBefore(this.endDatepicker, 'day')
        }
        return false
      },
      possibleDate: function possibleDate(date) {
        if (this.endDate) {
          return this.possibleStartDate(date) && this.possibleEndDate(date)
        }
        return this.possibleStartDate(date)
      },
      holidayDate: function holidayDate(date) {
        return !!(date.$events && date.$events.holiday)
      },
      toggleMonth: function toggleMonth() {
        this.visibleMonth = !this.visibleMonth;
        if (this.visibleMonth) {
          this.visibleYear = false;
        }
      },
      toggleYear: function toggleYear() {
        this.visibleYear = !this.visibleYear;
        if (this.visibleYear) {
          this.visibleMonth = false;
        }
      },
      setMonth: function setMonth(month) {
        if (this.possibleDate(this.today.set('month', month))) {
          this.today = this.today.set('month', month);
        } else {
          this.today = this.startDatepicker;
        }
        this.emit();
        this.toggleMonth();
      },
      setYear: function setYear(year) {
        if (this.possibleDate(this.today.set('year', year))) {
          this.today = this.today.set('year', year);
        } else {
          this.today = this.startDatepicker;
        }
        this.emit();
        this.toggleYear();
      },
      onAway: function onAway() {
        this.showPicker = false;
      },
      onFeedBack: function onFeedBack() {
        this.showPicker = true;
      },
    },
  };

  function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
      if (typeof shadowMode !== 'boolean') {
          createInjectorSSR = createInjector;
          createInjector = shadowMode;
          shadowMode = false;
      }
      // Vue.extend constructor export interop.
      var options = typeof script === 'function' ? script.options : script;
      // render functions
      if (template && template.render) {
          options.render = template.render;
          options.staticRenderFns = template.staticRenderFns;
          options._compiled = true;
          // functional template
          if (isFunctionalTemplate) {
              options.functional = true;
          }
      }
      // scopedId
      if (scopeId) {
          options._scopeId = scopeId;
      }
      var hook;
      if (moduleIdentifier) {
          // server build
          hook = function (context) {
              // 2.3 injection
              context =
                  context || // cached call
                      (this.$vnode && this.$vnode.ssrContext) || // stateful
                      (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
              // 2.2 with runInNewContext: true
              if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                  context = __VUE_SSR_CONTEXT__;
              }
              // inject component styles
              if (style) {
                  style.call(this, createInjectorSSR(context));
              }
              // register component module identifier for async chunk inference
              if (context && context._registeredComponents) {
                  context._registeredComponents.add(moduleIdentifier);
              }
          };
          // used by ssr in case component is cached and beforeCreate
          // never gets called
          options._ssrRegister = hook;
      }
      else if (style) {
          hook = shadowMode
              ? function (context) {
                  style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
              }
              : function (context) {
                  style.call(this, createInjector(context));
              };
      }
      if (hook) {
          if (options.functional) {
              // register for functional component in vue file
              var originalRender = options.render;
              options.render = function renderWithStyleInjection(h, context) {
                  hook.call(context);
                  return originalRender(h, context);
              };
          }
          else {
              // inject component registration as beforeCreate hook
              var existing = options.beforeCreate;
              options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
          }
      }
      return script;
  }

  var isOldIE = typeof navigator !== 'undefined' &&
      /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
  function createInjector(context) {
      return function (id, style) { return addStyle(id, style); };
  }
  var HEAD;
  var styles = {};
  function addStyle(id, css) {
      var group = isOldIE ? css.media || 'default' : id;
      var style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
      if (!style.ids.has(id)) {
          style.ids.add(id);
          var code = css.source;
          if (css.map) {
              // https://developer.chrome.com/devtools/docs/javascript-debugging
              // this makes source maps inside style tags work properly in Chrome
              code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
              // http://stackoverflow.com/a/26603875
              code +=
                  '\n/*# sourceMappingURL=data:application/json;base64,' +
                      btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                      ' */';
          }
          if (!style.element) {
              style.element = document.createElement('style');
              style.element.type = 'text/css';
              if (css.media)
                  { style.element.setAttribute('media', css.media); }
              if (HEAD === undefined) {
                  HEAD = document.head || document.getElementsByTagName('head')[0];
              }
              HEAD.appendChild(style.element);
          }
          if ('styleSheet' in style.element) {
              style.styles.push(code);
              style.element.styleSheet.cssText = style.styles
                  .filter(Boolean)
                  .join('\n');
          }
          else {
              var index = style.ids.size - 1;
              var textNode = document.createTextNode(code);
              var nodes = style.element.childNodes;
              if (nodes[index])
                  { style.element.removeChild(nodes[index]); }
              if (nodes.length)
                  { style.element.insertBefore(textNode, nodes[index]); }
              else
                  { style.element.appendChild(textNode); }
          }
      }
  }

  /* script */
  var __vue_script__ = script;

  /* template */
  var __vue_render__ = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "div",
      {
        directives: [
          {
            name: "closable",
            rawName: "v-closable",
            value: {
              handler: "onAway",
              exclude: ["currentPicker"]
            },
            expression:
              "{\n    handler: 'onAway',\n    exclude: ['currentPicker'],\n  }"
          }
        ],
        ref: "vTailwindPickerRef",
        staticClass: "relative select-none",
        style: "--bg-tailwind-picker: " + _vm.theme.background + ";",
        on: { click: _vm.onFeedBack }
      },
      [
        _vm._t("default"),
        _vm._v(" "),
        _c("transition", { attrs: { name: "v-tailwind-picker" } }, [
          _c(
            "div",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: _vm.showPicker || _vm.inline,
                  expression: "showPicker || inline"
                }
              ]
            },
            [
              _c(
                "div",
                {
                  staticClass: "bg-transparent mt-3 z-10",
                  class: [
                    { "inline-mode": _vm.inline },
                    _vm.inline ? "static" : "absolute bottom-0 inset-x-0",
                    _vm.theme.currentColor
                  ],
                  attrs: { id: "v-tailwind-picker" }
                },
                [
                  _c(
                    "div",
                    {
                      staticClass:
                        "w-88 h-auto max-w-xs transition-all duration-150 ease-linear rounded overflow-hidden border",
                      class: [
                        _vm.theme.border,
                        _vm.theme.text,
                        _vm.inline ? "shadow-xs" : "shadow-md"
                      ],
                      style: { backgroundColor: "var(--bg-tailwind-picker)" }
                    },
                    [
                      _c("div", { attrs: { id: "v-tailwind-picker-header" } }, [
                        _c(
                          "div",
                          {
                            staticClass:
                              "flex flex-row justify-center items-center px-2 py-1"
                          },
                          [
                            _c(
                              "div",
                              {
                                staticClass:
                                  "flex items-center text-2xl xl:text-3xl"
                              },
                              [
                                _vm._v(
                                  "\n                " +
                                    _vm._s(_vm.today.format("DD")) +
                                    "\n              "
                                )
                              ]
                            ),
                            _vm._v(" "),
                            _c("div", { staticClass: "mx-1" }, [
                              _c(
                                "div",
                                { staticClass: "leading-none text-xxs" },
                                [
                                  _vm._v(
                                    "\n                  " +
                                      _vm._s(_vm.today.format("dddd")) +
                                      "\n                "
                                  )
                                ]
                              ),
                              _vm._v(" "),
                              _c("div", { staticClass: "leading-none text-xs" }, [
                                _vm._v(
                                  "\n                  " +
                                    _vm._s(_vm.today.format("MMMM YYYY")) +
                                    "\n                "
                                )
                              ])
                            ])
                          ]
                        )
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "relative p-1" }, [
                        _c("div", {
                          staticClass: "absolute inset-0",
                          class: _vm.theme.navigation.background
                        }),
                        _vm._v(" "),
                        _c(
                          "div",
                          {
                            staticClass:
                              "flex justify-between items-center relative"
                          },
                          [
                            _c(
                              "div",
                              { staticClass: "flex-shrink-0 w-8" },
                              [
                                _c(
                                  "transition",
                                  {
                                    attrs: {
                                      name: "v-tailwind-picker-chevron-left"
                                    }
                                  },
                                  [
                                    !_vm.enableMonth && !_vm.enableYear
                                      ? _c(
                                          "div",
                                          {
                                            staticClass:
                                              "rounded-full overflow-hidden"
                                          },
                                          [
                                            _c(
                                              "div",
                                              {
                                                staticClass:
                                                  "transition duration-150 ease-out p-2",
                                                class: [
                                                  _vm.visiblePrev
                                                    ? "cursor-pointer"
                                                    : "cursor-not-allowed opacity-30",
                                                  _vm.theme.navigation.hover
                                                ],
                                                on: {
                                                  click: function($event) {
                                                    return _vm.onPrevious()
                                                  }
                                                }
                                              },
                                              [
                                                _c(
                                                  "svg",
                                                  {
                                                    staticClass: "h-4 w-auto",
                                                    attrs: {
                                                      xmlns:
                                                        "http://www.w3.org/2000/svg",
                                                      viewBox:
                                                        "0 0 511.641 511.641",
                                                      fill: "currentColor"
                                                    }
                                                  },
                                                  [
                                                    _c("path", {
                                                      attrs: {
                                                        d:
                                                          "M148.32 255.76L386.08 18c4.053-4.267 3.947-10.987-.213-15.04a10.763 10.763 0 00-14.827 0L125.707 248.293a10.623 10.623 0 000 15.04L371.04 508.667c4.267 4.053 10.987 3.947 15.04-.213a10.763 10.763 0 000-14.827L148.32 255.76z"
                                                      }
                                                    })
                                                  ]
                                                )
                                              ]
                                            )
                                          ]
                                        )
                                      : _vm._e()
                                  ]
                                )
                              ],
                              1
                            ),
                            _vm._v(" "),
                            _c("div", { staticClass: "flex flex-1" }, [
                              _c(
                                "div",
                                {
                                  staticClass:
                                    "flex-1 rounded overflow-hidden py-1 ml-2 mr-1 text-center cursor-pointer transition duration-150 ease-out",
                                  class: [
                                    _vm.enableMonth
                                      ? _vm.theme.navigation.focus
                                      : "",
                                    _vm.theme.navigation.hover
                                  ],
                                  on: {
                                    click: function($event) {
                                      return _vm.toggleMonth()
                                    }
                                  }
                                },
                                [
                                  _vm._v(
                                    "\n                  " +
                                      _vm._s(_vm.today.format("MMMM")) +
                                      "\n                "
                                  )
                                ]
                              ),
                              _vm._v(" "),
                              _c(
                                "div",
                                {
                                  staticClass:
                                    "flex-1 rounded overflow-hidden py-1 mr-2 ml-1 text-center cursor-pointer transition duration-150 ease-out",
                                  class: [
                                    _vm.enableYear
                                      ? _vm.theme.navigation.focus
                                      : "",
                                    _vm.theme.navigation.hover
                                  ],
                                  on: {
                                    click: function($event) {
                                      return _vm.toggleYear()
                                    }
                                  }
                                },
                                [
                                  _vm._v(
                                    "\n                  " +
                                      _vm._s(_vm.today.$y) +
                                      "\n                "
                                  )
                                ]
                              )
                            ]),
                            _vm._v(" "),
                            _c(
                              "div",
                              { staticClass: "flex-shrink-0 w-8" },
                              [
                                _c(
                                  "transition",
                                  {
                                    attrs: {
                                      name: "v-tailwind-picker-chevron-right"
                                    }
                                  },
                                  [
                                    !_vm.enableMonth && !_vm.enableYear
                                      ? _c(
                                          "div",
                                          {
                                            staticClass:
                                              "rounded-full overflow-hidden"
                                          },
                                          [
                                            _c(
                                              "div",
                                              {
                                                staticClass:
                                                  "transition duration-150 ease-out p-2",
                                                class: [
                                                  _vm.visibleNext
                                                    ? "cursor-pointer"
                                                    : "cursor-not-allowed opacity-30",
                                                  _vm.theme.navigation.hover
                                                ],
                                                on: {
                                                  click: function($event) {
                                                    return _vm.onNext()
                                                  }
                                                }
                                              },
                                              [
                                                _c(
                                                  "svg",
                                                  {
                                                    staticClass: "h-4 w-auto",
                                                    attrs: {
                                                      xmlns:
                                                        "http://www.w3.org/2000/svg",
                                                      viewBox:
                                                        "0 0 511.949 511.949",
                                                      fill: "currentColor"
                                                    }
                                                  },
                                                  [
                                                    _c("path", {
                                                      attrs: {
                                                        d:
                                                          "M386.235 248.308L140.902 2.975c-4.267-4.053-10.987-3.947-15.04.213a10.763 10.763 0 000 14.827l237.76 237.76-237.76 237.867c-4.267 4.053-4.373 10.88-.213 15.04 4.053 4.267 10.88 4.373 15.04.213l.213-.213 245.333-245.333a10.624 10.624 0 000-15.041z"
                                                      }
                                                    })
                                                  ]
                                                )
                                              ]
                                            )
                                          ]
                                        )
                                      : _vm._e()
                                  ]
                                )
                              ],
                              1
                            )
                          ]
                        )
                      ]),
                      _vm._v(" "),
                      _c(
                        "div",
                        {
                          staticClass:
                            "smooth-scrolling overflow-x-hidden overflow-y-auto"
                        },
                        [
                          _c(
                            "transition",
                            { attrs: { name: "v-tailwind-picker-body" } },
                            [
                              !_vm.enableMonth && !_vm.enableYear
                                ? _c("div", { staticClass: "relative" }, [
                                    _c(
                                      "div",
                                      {
                                        staticClass:
                                          "flex flex-nowrap py-2 border-b",
                                        class: _vm.theme.border
                                      },
                                      _vm._l(_vm.days, function(day) {
                                        return _c(
                                          "div",
                                          {
                                            key: day,
                                            staticClass:
                                              "w-1/7 flex justify-center"
                                          },
                                          [
                                            _c(
                                              "div",
                                              {
                                                staticClass:
                                                  "leading-relaxed text-sm",
                                                class: [
                                                  day === "Sun"
                                                    ? _vm.theme.picker.holiday
                                                    : day === "Fri"
                                                    ? _vm.theme.picker.weekend
                                                    : ""
                                                ]
                                              },
                                              [
                                                _vm._v(
                                                  "\n                      " +
                                                    _vm._s(day) +
                                                    "\n                    "
                                                )
                                              ]
                                            )
                                          ]
                                        )
                                      }),
                                      0
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "div",
                                      {
                                        ref: "currentPicker",
                                        staticClass: "flex flex-wrap relative"
                                      },
                                      [
                                        _vm._l(_vm.previousPicker, function(
                                          date,
                                          i
                                        ) {
                                          return _c(
                                            "div",
                                            {
                                              key:
                                                "" +
                                                date.$D +
                                                date.$M +
                                                date.$y +
                                                "-previous",
                                              staticClass:
                                                "w-1/7 flex justify-center my-2px cursor-not-allowed",
                                              class: [
                                                i ===
                                                _vm.previousPicker.length - 1
                                                  ? "rounded-r-full"
                                                  : "",
                                                _vm.theme.navigation.background
                                              ]
                                            },
                                            [
                                              _c(
                                                "div",
                                                {
                                                  staticClass:
                                                    "h-8 w-8 flex justify-center items-center",
                                                  attrs: {
                                                    "data-tailwind-datepicker":
                                                      date.$d
                                                  }
                                                },
                                                [
                                                  _c(
                                                    "div",
                                                    {
                                                      staticClass:
                                                        "text-xs opacity-75",
                                                      class: [
                                                        date.day() === 0
                                                          ? _vm.theme.picker
                                                              .holiday
                                                          : date.day() === 5
                                                          ? _vm.theme.picker
                                                              .weekend
                                                          : ""
                                                      ]
                                                    },
                                                    [
                                                      _vm._v(
                                                        "\n                        " +
                                                          _vm._s(date.$D) +
                                                          "\n                      "
                                                      )
                                                    ]
                                                  )
                                                ]
                                              )
                                            ]
                                          )
                                        }),
                                        _vm._v(" "),
                                        _vm._l(_vm.currentPicker, function(date) {
                                          return _c(
                                            "div",
                                            {
                                              key:
                                                "" +
                                                date.$D +
                                                date.$M +
                                                date.$y +
                                                "-current",
                                              staticClass:
                                                "w-1/7 group flex justify-center items-center my-2px"
                                            },
                                            [
                                              _c(
                                                "div",
                                                {
                                                  staticClass:
                                                    "relative overflow-hidden",
                                                  class: _vm.theme.picker.rounded
                                                },
                                                [
                                                  date.$events
                                                    ? _c("div", {
                                                        staticClass:
                                                          "absolute top-0 right-0 h-2 w-2 z-2",
                                                        class:
                                                          _vm.theme.picker.event,
                                                        style: {
                                                          backgroundColor: date
                                                            .$events.color
                                                            ? date.$events.color
                                                            : ""
                                                        }
                                                      })
                                                    : _vm._e(),
                                                  _vm._v(" "),
                                                  _c(
                                                    "div",
                                                    {
                                                      staticClass:
                                                        "relative h-8 w-8 flex justify-center items-center overflow-hidden",
                                                      class: [
                                                        _vm.theme.picker.rounded,
                                                        _vm.possibleDate(date)
                                                          ? "cursor-pointer"
                                                          : "cursor-not-allowed"
                                                      ]
                                                    },
                                                    [
                                                      _vm.possibleDate(date)
                                                        ? _c("div", {
                                                            staticClass:
                                                              "absolute inset-0 transition duration-150 ease-in-out border border-dotted border-transparent",
                                                            class: [
                                                              _vm.theme.picker
                                                                .rounded,
                                                              _vm.possibleDate(
                                                                date
                                                              )
                                                                ? "hover:" +
                                                                  _vm.theme.picker
                                                                    .selected
                                                                    .border
                                                                : "",
                                                              date.$D ===
                                                              _vm.today.$D
                                                                ? _vm.theme.picker
                                                                    .selected
                                                                    .background +
                                                                  " shadow-xs"
                                                                : ""
                                                            ],
                                                            on: {
                                                              click: function(
                                                                $event
                                                              ) {
                                                                return _vm.changePicker(
                                                                  date
                                                                )
                                                              }
                                                            }
                                                          })
                                                        : _vm._e(),
                                                      _vm._v(" "),
                                                      _c(
                                                        "div",
                                                        {
                                                          staticClass:
                                                            "flex justify-center items-center",
                                                          attrs: {
                                                            "data-tailwind-datepicker":
                                                              date.$d
                                                          }
                                                        },
                                                        [
                                                          _c(
                                                            "div",
                                                            {
                                                              class: [
                                                                (_vm.holidayDate(
                                                                  date
                                                                ) ||
                                                                  date.day() ===
                                                                    0) &&
                                                                date.$D !==
                                                                  _vm.today.$D
                                                                  ? _vm.theme
                                                                      .picker
                                                                      .holiday
                                                                  : "",
                                                                date.day() ===
                                                                  5 &&
                                                                date.$D !==
                                                                  _vm.today.$D
                                                                  ? _vm.theme
                                                                      .picker
                                                                      .weekend
                                                                  : "",
                                                                {
                                                                  "z-10 text-white ":
                                                                    date.$D ===
                                                                      _vm.today
                                                                        .$D &&
                                                                    _vm.possibleDate(
                                                                      date
                                                                    )
                                                                },
                                                                {
                                                                  "opacity-50": !_vm.possibleDate(
                                                                    date
                                                                  )
                                                                }
                                                              ]
                                                            },
                                                            [
                                                              _c("span", [
                                                                _vm._v(
                                                                  _vm._s(date.$D)
                                                                )
                                                              ])
                                                            ]
                                                          )
                                                        ]
                                                      )
                                                    ]
                                                  )
                                                ]
                                              )
                                            ]
                                          )
                                        }),
                                        _vm._v(" "),
                                        _vm._l(_vm.nextPicker, function(date) {
                                          return _c(
                                            "div",
                                            {
                                              key:
                                                "" +
                                                date.$D +
                                                date.$M +
                                                date.$y +
                                                "-next",
                                              staticClass:
                                                "w-1/7 flex justify-center my-2px cursor-not-allowed",
                                              class: [
                                                date.$D === 1
                                                  ? "rounded-l-full"
                                                  : "",
                                                _vm.theme.navigation.background
                                              ]
                                            },
                                            [
                                              _c(
                                                "div",
                                                {
                                                  staticClass:
                                                    "h-8 w-8 flex justify-center items-center",
                                                  attrs: {
                                                    "data-tailwind-datepicker":
                                                      date.$d
                                                  }
                                                },
                                                [
                                                  _c(
                                                    "div",
                                                    {
                                                      staticClass:
                                                        "text-xs opacity-75",
                                                      class: [
                                                        date.day() ===
                                                        (_vm.startFromMonday
                                                          ? 1
                                                          : 0)
                                                          ? _vm.theme.picker
                                                              .holiday
                                                          : date.day() ===
                                                            (_vm.startFromMonday
                                                              ? 6
                                                              : 5)
                                                          ? _vm.theme.picker
                                                              .weekend
                                                          : ""
                                                      ]
                                                    },
                                                    [
                                                      _vm._v(
                                                        "\n                        " +
                                                          _vm._s(date.$D) +
                                                          "\n                      "
                                                      )
                                                    ]
                                                  )
                                                ]
                                              )
                                            ]
                                          )
                                        })
                                      ],
                                      2
                                    )
                                  ])
                                : _vm._e()
                            ]
                          ),
                          _vm._v(" "),
                          _c(
                            "transition",
                            { attrs: { name: "v-tailwind-picker-months" } },
                            [
                              _vm.enableMonth
                                ? _c(
                                    "div",
                                    {
                                      staticClass:
                                        "relative flex items-center smooth-scrolling overflow-y-auto overflow-x-hidden"
                                    },
                                    [
                                      _c(
                                        "div",
                                        { staticClass: "flex flex-wrap py-1" },
                                        _vm._l(_vm.months, function(month, i) {
                                          return _c(
                                            "div",
                                            {
                                              key: i,
                                              staticClass:
                                                "w-1/3 flex justify-center items-center px-2"
                                            },
                                            [
                                              _c(
                                                "div",
                                                {
                                                  staticClass:
                                                    "w-full flex justify-center items-center py-2 my-1 transition duration-150 ease-out rounded border cursor-pointer",
                                                  class: [
                                                    i === _vm.today.$M
                                                      ? "" +
                                                        _vm.theme.picker.selected
                                                          .border
                                                      : _vm.theme.border +
                                                        " " +
                                                        _vm.theme.picker.selected
                                                          .hover
                                                  ],
                                                  on: {
                                                    click: function($event) {
                                                      return _vm.setMonth(i)
                                                    }
                                                  }
                                                },
                                                [
                                                  _c(
                                                    "span",
                                                    {
                                                      staticClass: "font-medium"
                                                    },
                                                    [_vm._v(_vm._s(month))]
                                                  )
                                                ]
                                              )
                                            ]
                                          )
                                        }),
                                        0
                                      )
                                    ]
                                  )
                                : _vm._e()
                            ]
                          ),
                          _vm._v(" "),
                          _c(
                            "transition",
                            { attrs: { name: "v-tailwind-picker-years" } },
                            [
                              _vm.enableYear
                                ? _c(
                                    "div",
                                    {
                                      staticClass:
                                        "relative smooth-scrolling overflow-y-auto overflow-x-hidden"
                                    },
                                    [
                                      _c(
                                        "div",
                                        { staticClass: "flex flex-wrap py-1" },
                                        _vm._l(_vm.years, function(year, i) {
                                          return _c(
                                            "div",
                                            {
                                              key: i,
                                              staticClass:
                                                "w-1/3 flex justify-center items-center px-2"
                                            },
                                            [
                                              _c(
                                                "div",
                                                {
                                                  staticClass:
                                                    "w-full flex justify-center items-center py-2 my-1 transition duration-150 ease-out rounded border cursor-pointer",
                                                  class: [
                                                    year === _vm.today.$y
                                                      ? "" +
                                                        _vm.theme.picker.selected
                                                          .border
                                                      : _vm.theme.border +
                                                        " " +
                                                        _vm.theme.picker.selected
                                                          .hover
                                                  ],
                                                  on: {
                                                    click: function($event) {
                                                      return _vm.setYear(year)
                                                    }
                                                  }
                                                },
                                                [
                                                  _c(
                                                    "span",
                                                    {
                                                      staticClass: "font-medium"
                                                    },
                                                    [_vm._v(_vm._s(year))]
                                                  )
                                                ]
                                              )
                                            ]
                                          )
                                        }),
                                        0
                                      )
                                    ]
                                  )
                                : _vm._e()
                            ]
                          )
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _vm.currentPicker.filter(function(o) {
                        return o.$events !== undefined
                      }).length > 0
                        ? _c(
                            "div",
                            { attrs: { id: "v-tailwind-picker-footer" } },
                            [
                              _c(
                                "transition-group",
                                {
                                  staticClass: "flex flex-wrap border-t p-1",
                                  class: _vm.theme.event.border,
                                  attrs: {
                                    name: "v-tailwind-picker-footer",
                                    tag: "div"
                                  }
                                },
                                _vm._l(
                                  _vm.currentPicker.filter(function(o) {
                                    return o.$events !== undefined
                                  }),
                                  function(event, i) {
                                    return _c(
                                      "div",
                                      {
                                        key: i + "-event",
                                        staticClass:
                                          "w-full flex flex-row space-x-1 mb-px"
                                      },
                                      [
                                        _c(
                                          "div",
                                          {
                                            staticClass:
                                              "inline-flex justify-end w-4"
                                          },
                                          [
                                            _c(
                                              "span",
                                              {
                                                staticClass:
                                                  "text-xs leading-none",
                                                class: _vm.theme.picker.holiday
                                              },
                                              [
                                                _vm._v(
                                                  "\n                    " +
                                                    _vm._s(
                                                      _vm.dayjs(
                                                        event.$events.date,
                                                        _vm.formatDate
                                                      ).$D
                                                    ) +
                                                    "\n                  "
                                                )
                                              ]
                                            )
                                          ]
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "div",
                                          { staticClass: "flex flex-wrap" },
                                          [
                                            _c(
                                              "div",
                                              {
                                                staticClass:
                                                  "w-full flex items-end"
                                              },
                                              [
                                                _c(
                                                  "span",
                                                  {
                                                    staticClass:
                                                      "text-xxs leading-none"
                                                  },
                                                  [
                                                    _vm._v(
                                                      "\n                      " +
                                                        _vm._s(
                                                          event.$events
                                                            .description
                                                        ) +
                                                        "\n                    "
                                                    )
                                                  ]
                                                )
                                              ]
                                            )
                                          ]
                                        )
                                      ]
                                    )
                                  }
                                ),
                                0
                              )
                            ],
                            1
                          )
                        : _vm._e()
                    ]
                  )
                ]
              )
            ]
          )
        ])
      ],
      2
    )
  };
  var __vue_staticRenderFns__ = [];
  __vue_render__._withStripped = true;

    /* style */
    var __vue_inject_styles__ = function (inject) {
      if (!inject) { return }
      inject("data-v-6a4fe8a3_0", { source: "\n#v-tailwind-picker[data-v-6a4fe8a3] {\n  top: 95%;\n}\n#v-tailwind-picker .w-1\\/7[data-v-6a4fe8a3] {\n  width: 14.285714%;\n}\n#v-tailwind-picker .w-88[data-v-6a4fe8a3] {\n  width: 22rem;\n}\n#v-tailwind-picker .text-xxs[data-v-6a4fe8a3] {\n  font-size: 0.6rem;\n}\n#v-tailwind-picker .my-2px[data-v-6a4fe8a3] {\n  margin-top: 2px;\n  margin-bottom: 2px;\n}\n#v-tailwind-picker[data-v-6a4fe8a3]:not(.inline-mode)::before {\n  content: '';\n  width: 14px;\n  height: 14px;\n  z-index: 10;\n  top: -7px;\n  left: 12px;\n  border-radius: 2px;\n  border-color: currentColor;\n  position: absolute;\n  display: block;\n  background-color: var(--bg-tailwind-picker);\n  border-left-width: 1px;\n  border-top-width: 1px;\n  transform: rotate(45deg);\n}\n#v-tailwind-picker .smooth-scrolling[data-v-6a4fe8a3] {\n  height: 255px;\n  max-height: 255px;\n}\n#v-tailwind-picker .smooth-scrolling[data-v-6a4fe8a3]::-webkit-scrollbar {\n  width: 4px;\n}\n#v-tailwind-picker .smooth-scrolling[data-v-6a4fe8a3] ::-webkit-scrollbar-thumb {\n  border-radius: 8px;\n  background-color: rgba(0, 0, 0, 0.1);\n}\n.v-tailwind-picker-enter-active[data-v-6a4fe8a3],\n.v-tailwind-picker-leave-active[data-v-6a4fe8a3] {\n  transition: all 0.1s;\n}\n.v-tailwind-picker-enter[data-v-6a4fe8a3],\n.v-tailwind-picker-leave-to[data-v-6a4fe8a3] {\n  opacity: 0;\n  transform: translateY(15px);\n}\n.v-tailwind-picker-body-enter-active[data-v-6a4fe8a3],\n.v-tailwind-picker-body-leave-active[data-v-6a4fe8a3] {\n  transition: all 0.2s;\n}\n.v-tailwind-picker-body-enter[data-v-6a4fe8a3],\n.v-tailwind-picker-body-leave-to[data-v-6a4fe8a3] {\n  opacity: 0;\n  transform: translateY(-15px);\n}\n.v-tailwind-picker-months-enter-active[data-v-6a4fe8a3],\n.v-tailwind-picker-months-leave-active[data-v-6a4fe8a3] {\n  transition: all 0.2s;\n}\n.v-tailwind-picker-months-enter[data-v-6a4fe8a3],\n.v-tailwind-picker-months-leave-to[data-v-6a4fe8a3] {\n  opacity: 0;\n  transform: translateY(-15px);\n}\n.v-tailwind-picker-years-enter-active[data-v-6a4fe8a3],\n.v-tailwind-picker-years-leave-active[data-v-6a4fe8a3] {\n  transition: all 0.2s;\n}\n.v-tailwind-picker-years-enter[data-v-6a4fe8a3],\n.v-tailwind-picker-years-leave-to[data-v-6a4fe8a3] {\n  opacity: 0;\n  transform: translateY(-15px);\n}\n.v-tailwind-picker-footer-enter-active[data-v-6a4fe8a3],\n.v-tailwind-picker-footer-leave-active[data-v-6a4fe8a3] {\n  transition: all 0.2s;\n}\n.v-tailwind-picker-footer-enter[data-v-6a4fe8a3],\n.v-tailwind-picker-footer-leave-to[data-v-6a4fe8a3] {\n  opacity: 0;\n  transform: translateY(-15px);\n}\n", map: {"version":3,"sources":["/Users/user/Documents/vue-tailwind-picker/src/vue-tailwind-picker.vue"],"names":[],"mappings":";AA0xBA;EACA,QAAA;AACA;AAEA;EACA,iBAAA;AACA;AAEA;EACA,YAAA;AACA;AAEA;EACA,iBAAA;AACA;AAEA;EACA,eAAA;EACA,kBAAA;AACA;AAEA;EACA,WAAA;EACA,WAAA;EACA,YAAA;EACA,WAAA;EACA,SAAA;EACA,UAAA;EACA,kBAAA;EACA,0BAAA;EACA,kBAAA;EACA,cAAA;EACA,2CAAA;EACA,sBAAA;EACA,qBAAA;EACA,wBAAA;AACA;AAEA;EACA,aAAA;EACA,iBAAA;AACA;AAEA;EACA,UAAA;AACA;AAEA;EACA,kBAAA;EACA,oCAAA;AACA;AAEA;;EAEA,oBAAA;AACA;AAEA;;EAEA,UAAA;EACA,2BAAA;AACA;AAEA;;EAEA,oBAAA;AACA;AAEA;;EAEA,UAAA;EACA,4BAAA;AACA;AAEA;;EAEA,oBAAA;AACA;AAEA;;EAEA,UAAA;EACA,4BAAA;AACA;AAEA;;EAEA,oBAAA;AACA;AAEA;;EAEA,UAAA;EACA,4BAAA;AACA;AAEA;;EAEA,oBAAA;AACA;AAEA;;EAEA,UAAA;EACA,4BAAA;AACA","file":"vue-tailwind-picker.vue","sourcesContent":["<template>\n  <div\n    ref=\"vTailwindPickerRef\"\n    class=\"relative select-none\"\n    v-closable=\"{\n      handler: 'onAway',\n      exclude: ['currentPicker'],\n    }\"\n    @click=\"onFeedBack\"\n    :style=\"`--bg-tailwind-picker: ${theme.background};`\"\n  >\n    <slot></slot>\n    <transition name=\"v-tailwind-picker\">\n      <div v-show=\"showPicker || inline\">\n        <div\n          id=\"v-tailwind-picker\"\n          class=\"bg-transparent mt-3 z-10\"\n          :class=\"[\n            { 'inline-mode': inline },\n            inline ? 'static' : 'absolute bottom-0 inset-x-0',\n            theme.currentColor,\n          ]\"\n        >\n          <div\n            class=\"w-88 h-auto max-w-xs transition-all duration-150 ease-linear rounded overflow-hidden border\"\n            :class=\"[\n              theme.border,\n              theme.text,\n              inline ? 'shadow-xs' : 'shadow-md',\n            ]\"\n            :style=\"{ backgroundColor: `var(--bg-tailwind-picker)` }\"\n          >\n            <!--            Header of picker-->\n            <div id=\"v-tailwind-picker-header\">\n              <div class=\"flex flex-row justify-center items-center px-2 py-1\">\n                <div class=\"flex items-center text-2xl xl:text-3xl\">\n                  {{ today.format('DD') }}\n                </div>\n                <div class=\"mx-1\">\n                  <div class=\"leading-none text-xxs\">\n                    {{ today.format('dddd') }}\n                  </div>\n                  <div class=\"leading-none text-xs\">\n                    {{ today.format('MMMM YYYY') }}\n                  </div>\n                </div>\n              </div>\n            </div>\n            <!--            Navigation of picker-->\n            <div class=\"relative p-1\">\n              <div\n                class=\"absolute inset-0\"\n                :class=\"theme.navigation.background\"\n              ></div>\n              <div class=\"flex justify-between items-center relative\">\n                <div class=\"flex-shrink-0 w-8\">\n                  <transition name=\"v-tailwind-picker-chevron-left\">\n                    <div\n                      v-if=\"!enableMonth && !enableYear\"\n                      class=\"rounded-full overflow-hidden\"\n                    >\n                      <div\n                        class=\"transition duration-150 ease-out p-2\"\n                        :class=\"[\n                          visiblePrev\n                            ? 'cursor-pointer'\n                            : 'cursor-not-allowed opacity-30',\n                          theme.navigation.hover,\n                        ]\"\n                        @click=\"onPrevious()\"\n                      >\n                        <svg\n                          class=\"h-4 w-auto\"\n                          xmlns=\"http://www.w3.org/2000/svg\"\n                          viewBox=\"0 0 511.641 511.641\"\n                          fill=\"currentColor\"\n                        >\n                          <path\n                            d=\"M148.32 255.76L386.08 18c4.053-4.267 3.947-10.987-.213-15.04a10.763 10.763 0 00-14.827 0L125.707 248.293a10.623 10.623 0 000 15.04L371.04 508.667c4.267 4.053 10.987 3.947 15.04-.213a10.763 10.763 0 000-14.827L148.32 255.76z\"\n                          />\n                        </svg>\n                      </div>\n                    </div>\n                  </transition>\n                </div>\n                <div class=\"flex flex-1\">\n                  <div\n                    class=\"flex-1 rounded overflow-hidden py-1 ml-2 mr-1 text-center cursor-pointer transition duration-150 ease-out\"\n                    :class=\"[\n                      enableMonth ? theme.navigation.focus : '',\n                      theme.navigation.hover,\n                    ]\"\n                    @click=\"toggleMonth()\"\n                  >\n                    {{ today.format('MMMM') }}\n                  </div>\n                  <div\n                    class=\"flex-1 rounded overflow-hidden py-1 mr-2 ml-1 text-center cursor-pointer transition duration-150 ease-out\"\n                    :class=\"[\n                      enableYear ? theme.navigation.focus : '',\n                      theme.navigation.hover,\n                    ]\"\n                    @click=\"toggleYear()\"\n                  >\n                    {{ today.$y }}\n                  </div>\n                </div>\n\n                <div class=\"flex-shrink-0 w-8\">\n                  <transition name=\"v-tailwind-picker-chevron-right\">\n                    <div\n                      v-if=\"!enableMonth && !enableYear\"\n                      class=\"rounded-full overflow-hidden\"\n                    >\n                      <div\n                        class=\"transition duration-150 ease-out p-2\"\n                        :class=\"[\n                          visibleNext\n                            ? 'cursor-pointer'\n                            : 'cursor-not-allowed opacity-30',\n                          theme.navigation.hover,\n                        ]\"\n                        @click=\"onNext()\"\n                      >\n                        <svg\n                          class=\"h-4 w-auto\"\n                          xmlns=\"http://www.w3.org/2000/svg\"\n                          viewBox=\"0 0 511.949 511.949\"\n                          fill=\"currentColor\"\n                        >\n                          <path\n                            d=\"M386.235 248.308L140.902 2.975c-4.267-4.053-10.987-3.947-15.04.213a10.763 10.763 0 000 14.827l237.76 237.76-237.76 237.867c-4.267 4.053-4.373 10.88-.213 15.04 4.053 4.267 10.88 4.373 15.04.213l.213-.213 245.333-245.333a10.624 10.624 0 000-15.041z\"\n                          />\n                        </svg>\n                      </div>\n                    </div>\n                  </transition>\n                </div>\n              </div>\n            </div>\n            <!--            Body of picker-->\n            <div class=\"smooth-scrolling overflow-x-hidden overflow-y-auto\">\n              <transition name=\"v-tailwind-picker-body\">\n                <div v-if=\"!enableMonth && !enableYear\" class=\"relative\">\n                  <div\n                    class=\"flex flex-nowrap py-2 border-b\"\n                    :class=\"theme.border\"\n                  >\n                    <div\n                      v-for=\"day in days\"\n                      :key=\"day\"\n                      class=\"w-1/7 flex justify-center\"\n                    >\n                      <div\n                        class=\"leading-relaxed text-sm\"\n                        :class=\"[\n                          day === 'Sun'\n                            ? theme.picker.holiday\n                            : day === 'Fri'\n                            ? theme.picker.weekend\n                            : '',\n                        ]\"\n                      >\n                        {{ day }}\n                      </div>\n                    </div>\n                  </div>\n\n                  <div ref=\"currentPicker\" class=\"flex flex-wrap relative\">\n                    <div\n                      v-for=\"(date, i) in previousPicker\"\n                      :key=\"`${date.$D}${date.$M}${date.$y}-previous`\"\n                      class=\"w-1/7 flex justify-center my-2px cursor-not-allowed\"\n                      :class=\"[\n                        i === previousPicker.length - 1 ? 'rounded-r-full' : '',\n                        theme.navigation.background,\n                      ]\"\n                    >\n                      <div\n                        class=\"h-8 w-8 flex justify-center items-center\"\n                        :data-tailwind-datepicker=\"date.$d\"\n                      >\n                        <div\n                          class=\"text-xs opacity-75\"\n                          :class=\"[\n                            date.day() === 0\n                              ? theme.picker.holiday\n                              : date.day() === 5\n                              ? theme.picker.weekend\n                              : '',\n                          ]\"\n                        >\n                          {{ date.$D }}\n                        </div>\n                      </div>\n                    </div>\n\n                    <div\n                      v-for=\"date in currentPicker\"\n                      :key=\"`${date.$D}${date.$M}${date.$y}-current`\"\n                      class=\"w-1/7 group flex justify-center items-center my-2px\"\n                    >\n                      <div\n                        class=\"relative overflow-hidden\"\n                        :class=\"theme.picker.rounded\"\n                      >\n                        <div\n                          v-if=\"date.$events\"\n                          class=\"absolute top-0 right-0 h-2 w-2 z-2\"\n                          :class=\"theme.picker.event\"\n                          :style=\"{\n                            backgroundColor: date.$events.color\n                              ? date.$events.color\n                              : '',\n                          }\"\n                        ></div>\n                        <div\n                          class=\"relative h-8 w-8 flex justify-center items-center overflow-hidden\"\n                          :class=\"[\n                            theme.picker.rounded,\n                            possibleDate(date)\n                              ? 'cursor-pointer'\n                              : 'cursor-not-allowed',\n                          ]\"\n                        >\n                          <div\n                            v-if=\"possibleDate(date)\"\n                            class=\"absolute inset-0 transition duration-150 ease-in-out border border-dotted border-transparent\"\n                            :class=\"[\n                              theme.picker.rounded,\n                              possibleDate(date)\n                                ? `hover:${theme.picker.selected.border}`\n                                : '',\n                              date.$D === today.$D\n                                ? `${theme.picker.selected.background} shadow-xs`\n                                : '',\n                            ]\"\n                            @click=\"changePicker(date)\"\n                          ></div>\n                          <div\n                            class=\"flex justify-center items-center\"\n                            :data-tailwind-datepicker=\"date.$d\"\n                          >\n                            <div\n                              :class=\"[\n                                (holidayDate(date) || date.day() === 0) &&\n                                date.$D !== today.$D\n                                  ? theme.picker.holiday\n                                  : '',\n                                date.day() === 5 && date.$D !== today.$D\n                                  ? theme.picker.weekend\n                                  : '',\n                                {\n                                  'z-10 text-white ':\n                                    date.$D === today.$D && possibleDate(date),\n                                },\n                                {\n                                  'opacity-50': !possibleDate(date),\n                                },\n                              ]\"\n                            >\n                              <span>{{ date.$D }}</span>\n                            </div>\n                          </div>\n                        </div>\n                      </div>\n                    </div>\n\n                    <div\n                      v-for=\"date in nextPicker\"\n                      :key=\"`${date.$D}${date.$M}${date.$y}-next`\"\n                      class=\"w-1/7 flex justify-center my-2px cursor-not-allowed\"\n                      :class=\"[\n                        date.$D === 1 ? 'rounded-l-full' : '',\n                        theme.navigation.background,\n                      ]\"\n                    >\n                      <div\n                        class=\"h-8 w-8 flex justify-center items-center\"\n                        :data-tailwind-datepicker=\"date.$d\"\n                      >\n                        <div\n                          class=\"text-xs opacity-75\"\n                          :class=\"[\n                            date.day() === (startFromMonday ? 1 : 0)\n                              ? theme.picker.holiday\n                              : date.day() === (startFromMonday ? 6 : 5)\n                              ? theme.picker.weekend\n                              : '',\n                          ]\"\n                        >\n                          {{ date.$D }}\n                        </div>\n                      </div>\n                    </div>\n                  </div>\n                </div>\n              </transition>\n              <transition name=\"v-tailwind-picker-months\">\n                <div\n                  v-if=\"enableMonth\"\n                  class=\"relative flex items-center smooth-scrolling overflow-y-auto overflow-x-hidden\"\n                >\n                  <div class=\"flex flex-wrap py-1\">\n                    <div\n                      v-for=\"(month, i) in months\"\n                      :key=\"i\"\n                      class=\"w-1/3 flex justify-center items-center px-2\"\n                    >\n                      <div\n                        :class=\"[\n                          i === today.$M\n                            ? `${theme.picker.selected.border}`\n                            : `${theme.border} ${theme.picker.selected.hover}`,\n                        ]\"\n                        class=\"w-full flex justify-center items-center py-2 my-1 transition duration-150 ease-out rounded border cursor-pointer\"\n                        @click=\"setMonth(i)\"\n                      >\n                        <span class=\"font-medium\">{{ month }}</span>\n                      </div>\n                    </div>\n                  </div>\n                </div>\n              </transition>\n              <transition name=\"v-tailwind-picker-years\">\n                <div\n                  v-if=\"enableYear\"\n                  class=\"relative smooth-scrolling overflow-y-auto overflow-x-hidden\"\n                >\n                  <div class=\"flex flex-wrap py-1\">\n                    <div\n                      v-for=\"(year, i) in years\"\n                      :key=\"i\"\n                      class=\"w-1/3 flex justify-center items-center px-2\"\n                    >\n                      <div\n                        :class=\"[\n                          year === today.$y\n                            ? `${theme.picker.selected.border}`\n                            : `${theme.border} ${theme.picker.selected.hover}`,\n                        ]\"\n                        class=\"w-full flex justify-center items-center py-2 my-1 transition duration-150 ease-out rounded border cursor-pointer\"\n                        @click=\"setYear(year)\"\n                      >\n                        <span class=\"font-medium\">{{ year }}</span>\n                      </div>\n                    </div>\n                  </div>\n                </div>\n              </transition>\n            </div>\n            <!--            Event of picker-->\n            <div\n              v-if=\"\n                currentPicker.filter((o) => o.$events !== undefined).length > 0\n              \"\n              id=\"v-tailwind-picker-footer\"\n            >\n              <transition-group\n                name=\"v-tailwind-picker-footer\"\n                tag=\"div\"\n                class=\"flex flex-wrap border-t p-1\"\n                :class=\"theme.event.border\"\n              >\n                <div\n                  v-for=\"(event, i) in currentPicker.filter(\n                    (o) => o.$events !== undefined,\n                  )\"\n                  :key=\"`${i}-event`\"\n                  class=\"w-full flex flex-row space-x-1 mb-px\"\n                >\n                  <div class=\"inline-flex justify-end w-4\">\n                    <span\n                      class=\"text-xs leading-none\"\n                      :class=\"theme.picker.holiday\"\n                    >\n                      {{ dayjs(event.$events.date, formatDate).$D }}\n                    </span>\n                  </div>\n                  <div class=\"flex flex-wrap\">\n                    <div class=\"w-full flex items-end\">\n                      <span class=\"text-xxs leading-none\">\n                        {{ event.$events.description }}\n                      </span>\n                    </div>\n                  </div>\n                </div>\n              </transition-group>\n            </div>\n          </div>\n        </div>\n      </div>\n    </transition>\n  </div>\n</template>\n\n<script>\nimport dayjs from 'dayjs'\nimport isToday from 'dayjs/plugin/isToday'\nimport customParseFormat from 'dayjs/plugin/customParseFormat'\nimport isBetween from 'dayjs/plugin/isBetween'\nimport localizedFormat from 'dayjs/plugin/localizedFormat'\nimport advancedFormat from 'dayjs/plugin/advancedFormat'\nimport isSameOrBefore from 'dayjs/plugin/isSameOrBefore'\nimport isSameOrAfter from 'dayjs/plugin/isSameOrAfter'\n\ndayjs.extend(isToday)\ndayjs.extend(customParseFormat)\ndayjs.extend(isBetween)\ndayjs.extend(localizedFormat)\ndayjs.extend(advancedFormat)\ndayjs.extend(isSameOrBefore)\ndayjs.extend(isSameOrAfter)\n\nlet handleOutsideClick\n\n// import './css/tailwind.css' // Development only\n\n/**\n * Author: kenhyuwa <wahyu.dhiraashandy8@gmail.com\n * Url: https://github.com/kenhyuwa\n **/\n\nexport default {\n  name: 'VueTailwindPicker',\n  directives: {\n    closable: {\n      // https://github.com/TahaSh/vue-closable // resource\n      bind(el, binding, vnode) {\n        // Here's the click/touchstart handler\n        // (it is registered below)\n        handleOutsideClick = (e) => {\n          e.stopPropagation()\n          // Get the handler method name and the exclude array\n          // from the object used in v-closable\n          const { handler, exclude } = binding.value\n\n          // This variable indicates if the clicked element is excluded\n          let clickedOnExcludedEl = false\n          if (exclude) {\n            exclude.forEach((refName) => {\n              // We only run this code if we haven't detected\n              // any excluded element yet\n              if (!clickedOnExcludedEl) {\n                // Get the element using the reference name\n                const excludedEl = vnode.context.$refs[refName]\n                // See if this excluded element\n                // is the same element the user just clicked on\n                clickedOnExcludedEl = excludedEl\n                  ? excludedEl.contains(e.target)\n                  : false\n              }\n            })\n          }\n\n          // We check to see if the clicked element is not\n          // the dialog element and not excluded\n          if (clickedOnExcludedEl && vnode.context.autoClose) {\n            vnode.context[handler]()\n          }\n          if (!el.contains(e.target) && !clickedOnExcludedEl) {\n            // If the clicked element is outside the dialog\n            // and not the button, then call the outside-click handler\n            // from the same component this directive is used in\n            vnode.context[handler]()\n          }\n        }\n        // Register click/touchstart event listeners on the whole page\n        document.addEventListener('click', handleOutsideClick)\n        document.addEventListener('touchstart', handleOutsideClick)\n      },\n\n      unbind() {\n        // If the element that has v-closable is removed, then\n        // unbind click/touchstart listeners from the whole page\n        document.removeEventListener('click', handleOutsideClick)\n        document.removeEventListener('touchstart', handleOutsideClick)\n      },\n    },\n  },\n  props: {\n    init: {\n      type: Boolean,\n      required: false,\n      default: true,\n    },\n    selectedDate: {\n      type: String,\n      required: false,\n    },\n    startDate: {\n      type: String,\n      required: false,\n    },\n    endDate: {\n      type: String,\n      required: false,\n      default: undefined,\n    },\n    // Next future\n    disableDate: {\n      type: Array,\n      required: false,\n      default: () => [],\n    },\n    eventDate: {\n      type: Array,\n      required: false,\n      default: () => [],\n    },\n    formatDate: {\n      type: String,\n      required: false,\n      default: 'YYYY-MM-DD',\n    },\n    // Confused with this\n    formatDisplay: {\n      type: String,\n      required: false,\n      default: 'YYYY-MM-DD',\n    },\n    inline: {\n      type: Boolean,\n      required: false,\n      default: false,\n    },\n    // Not make sure with this\n    tailwindPickerValue: {\n      type: String,\n      required: false,\n      default: '',\n    },\n    // Next future\n    dateRange: {\n      type: Boolean,\n      required: false,\n      default: false,\n    },\n    // Next future\n    autoClose: {\n      type: Boolean,\n      required: false,\n      default: true,\n    },\n    startFromMonday: {\n      type: Boolean,\n      required: false,\n      default: false,\n    },\n    theme: {\n      type: Object,\n      required: false,\n      default: () => ({\n        background: '#FFFFFF',\n        text: 'text-gray-700',\n        border: 'border-gray-200',\n        currentColor: 'text-gray-200',\n        navigation: {\n          background: 'bg-gray-100',\n          hover: 'hover:bg-gray-200',\n          focus: 'bg-gray-200',\n        },\n        picker: {\n          rounded: 'rounded-full',\n          selected: {\n            background: 'bg-red-500',\n            border: 'border-red-500',\n            hover: 'hover:border-red-500',\n          },\n          holiday: 'text-red-400',\n          weekend: 'text-green-400',\n          event: 'bg-indigo-500',\n        },\n        event: {\n          border: 'border-gray-200',\n        },\n      }),\n    },\n  },\n  data() {\n    const startDatepicker = this.startDate ? dayjs(this.startDate, this.formatDate) : dayjs()\n    // Featured for my own project\n    //   .add(\n    //   dayjs().hour() >= 20 ? 1 : 0,\n    //   'day',\n    // )\n    const endDatepicker = this.endDate\n      ? dayjs(this.endDate, this.formatDate)\n      : undefined\n    const today = this.selectedDate && this.startDate < this.selectedDate\n      ? dayjs(this.selectedDate, this.formatDate)\n      : dayjs(startDatepicker, this.formatDate);\n    const months = Array.from(Array(12), (v, i) => {\n      return dayjs().month(i).format('MMMM')\n    })\n    const years = Array.from(\n      Array(\n        this.endDate\n          ? endDatepicker.diff(today, 'year') + 1\n          : today.diff(today, 'year') + 36,\n      ),\n      (v, i) => {\n        return today.add(i, 'year').$y\n      },\n    )\n    const visibleMonth = false\n    const visibleYear = false\n    const showPicker = false\n    return {\n      startDatepicker,\n      endDatepicker,\n      today,\n      visibleMonth,\n      months,\n      visibleYear,\n      years,\n      showPicker,\n    }\n  },\n  computed: {\n    days() {\n      const customWeekend = this.startFromMonday ? 1 : 0\n      return Array.from(Array(7), (v, i) => {\n        return dayjs()\n          .day(i + customWeekend)\n          .format('ddd')\n      })\n    },\n    previousPicker() {\n      const customWeekend = this.startFromMonday ? 1 : 0\n      const display = []\n      const previous = this.today.date(0)\n      const current = this.today.date(0)\n      for (let i = 0; i <= current.day() - customWeekend; i++) {\n        display.push(previous.subtract(i, 'day'))\n      }\n      return display.sort((a, b) => a.$d - b.$d)\n    },\n    currentPicker() {\n      const customWeekend = this.startFromMonday ? 1 : 0\n      const eventDate = this.eventDate.length > 0 ? this.eventDate : []\n      return Array.from(\n        Array(this.today.daysInMonth() - customWeekend),\n        (v, i) => {\n          const events = this.today.date(++i)\n          events.$events = eventDate.find((o) => {\n            return o.date === events.format(this.formatDate)\n          })\n          return events\n        },\n      )\n    },\n    nextPicker() {\n      const customWeekend = this.startFromMonday ? 1 : 0\n      const display = []\n      const previous = this.previousPicker.length\n      const current = this.today.daysInMonth()\n      for (let i = 1; i <= 42 - (previous + current) + customWeekend; i++) {\n        display.push(this.today.date(i).add(1, 'month'))\n      }\n      return display\n    },\n    enableMonth() {\n      return this.visibleMonth\n    },\n    enableYear() {\n      return this.visibleYear\n    },\n    visiblePrev() {\n      if (!this.dateRange) {\n        const endOf = this.today.subtract(1, 'month').endOf('month')\n        const diff = this.startDatepicker.diff(endOf, 'day')\n        return diff < this.today.daysInMonth() - this.today.$D\n      }\n      return true\n    },\n    visibleNext() {\n      if (!this.dateRange && this.endDate) {\n        const startOf = this.today.add(1, 'month').startOf('month')\n        return this.endDatepicker.diff(startOf, 'day') > 0\n      }\n      return true\n    },\n  },\n  watch: {\n    showPicker(prev, next) {\n      if (prev) {\n        this.visibleMonth = next\n        this.visibleYear = next\n      }\n    },\n  },\n  mounted() {\n    if (this.init) this.emit()\n  },\n  methods: {\n    dayjs,\n    emit() {\n      this.$emit('change', this.today.format(this.formatDate))\n    },\n    changePicker(date) {\n      this.today = date\n      this.emit()\n      this.showPicker = !this.showPicker\n    },\n    onPrevious() {\n      if (this.visiblePrev) {\n        const today = this.today\n          .set('month', this.today.$M === 0 ? 11 : this.today.$M - 1)\n          .set('year', this.today.$M === 0 ? this.today.$y - 1 : this.today.$y)\n        if (this.possibleDate(today)) {\n          this.today = today\n        } else {\n          this.today = this.startDatepicker\n        }\n        this.emit()\n      }\n    },\n    onNext() {\n      if (this.visibleNext) {\n        const today = this.today\n          .set('month', (this.today.$M + 1) % 12)\n          .set('year', this.today.$M === 11 ? this.today.$y + 1 : this.today.$y)\n        if (this.possibleDate(today)) {\n          this.today = today\n        } else {\n          this.today = this.endDatepicker\n        }\n        this.emit()\n      }\n    },\n    possibleStartDate(date) {\n      return this.dateRange\n        ? true\n        : date.isSameOrAfter(this.startDatepicker, 'day')\n    },\n    possibleEndDate(date) {\n      if (this.endDate) {\n        return this.dateRange\n          ? true\n          : date.isSameOrBefore(this.endDatepicker, 'day')\n      }\n      return false\n    },\n    possibleDate(date) {\n      if (this.endDate) {\n        return this.possibleStartDate(date) && this.possibleEndDate(date)\n      }\n      return this.possibleStartDate(date)\n    },\n    holidayDate(date) {\n      return !!(date.$events && date.$events.holiday)\n    },\n    toggleMonth() {\n      this.visibleMonth = !this.visibleMonth\n      if (this.visibleMonth) {\n        this.visibleYear = false\n      }\n    },\n    toggleYear() {\n      this.visibleYear = !this.visibleYear\n      if (this.visibleYear) {\n        this.visibleMonth = false\n      }\n    },\n    setMonth(month) {\n      if (this.possibleDate(this.today.set('month', month))) {\n        this.today = this.today.set('month', month)\n      } else {\n        this.today = this.startDatepicker\n      }\n      this.emit()\n      this.toggleMonth()\n    },\n    setYear(year) {\n      if (this.possibleDate(this.today.set('year', year))) {\n        this.today = this.today.set('year', year)\n      } else {\n        this.today = this.startDatepicker\n      }\n      this.emit()\n      this.toggleYear()\n    },\n    onAway() {\n      this.showPicker = false\n    },\n    onFeedBack() {\n      this.showPicker = true\n    },\n  },\n}\n</script>\n\n<style scoped>\n#v-tailwind-picker {\n  top: 95%;\n}\n\n#v-tailwind-picker .w-1\\/7 {\n  width: 14.285714%;\n}\n\n#v-tailwind-picker .w-88 {\n  width: 22rem;\n}\n\n#v-tailwind-picker .text-xxs {\n  font-size: 0.6rem;\n}\n\n#v-tailwind-picker .my-2px {\n  margin-top: 2px;\n  margin-bottom: 2px;\n}\n\n#v-tailwind-picker:not(.inline-mode)::before {\n  content: '';\n  width: 14px;\n  height: 14px;\n  z-index: 10;\n  top: -7px;\n  left: 12px;\n  border-radius: 2px;\n  border-color: currentColor;\n  position: absolute;\n  display: block;\n  background-color: var(--bg-tailwind-picker);\n  border-left-width: 1px;\n  border-top-width: 1px;\n  transform: rotate(45deg);\n}\n\n#v-tailwind-picker .smooth-scrolling {\n  height: 255px;\n  max-height: 255px;\n}\n\n#v-tailwind-picker .smooth-scrolling::-webkit-scrollbar {\n  width: 4px;\n}\n\n#v-tailwind-picker .smooth-scrolling ::-webkit-scrollbar-thumb {\n  border-radius: 8px;\n  background-color: rgba(0, 0, 0, 0.1);\n}\n\n.v-tailwind-picker-enter-active,\n.v-tailwind-picker-leave-active {\n  transition: all 0.1s;\n}\n\n.v-tailwind-picker-enter,\n.v-tailwind-picker-leave-to {\n  opacity: 0;\n  transform: translateY(15px);\n}\n\n.v-tailwind-picker-body-enter-active,\n.v-tailwind-picker-body-leave-active {\n  transition: all 0.2s;\n}\n\n.v-tailwind-picker-body-enter,\n.v-tailwind-picker-body-leave-to {\n  opacity: 0;\n  transform: translateY(-15px);\n}\n\n.v-tailwind-picker-months-enter-active,\n.v-tailwind-picker-months-leave-active {\n  transition: all 0.2s;\n}\n\n.v-tailwind-picker-months-enter,\n.v-tailwind-picker-months-leave-to {\n  opacity: 0;\n  transform: translateY(-15px);\n}\n\n.v-tailwind-picker-years-enter-active,\n.v-tailwind-picker-years-leave-active {\n  transition: all 0.2s;\n}\n\n.v-tailwind-picker-years-enter,\n.v-tailwind-picker-years-leave-to {\n  opacity: 0;\n  transform: translateY(-15px);\n}\n\n.v-tailwind-picker-footer-enter-active,\n.v-tailwind-picker-footer-leave-active {\n  transition: all 0.2s;\n}\n\n.v-tailwind-picker-footer-enter,\n.v-tailwind-picker-footer-leave-to {\n  opacity: 0;\n  transform: translateY(-15px);\n}\n</style>\n"]}, media: undefined });

    };
    /* scoped */
    var __vue_scope_id__ = "data-v-6a4fe8a3";
    /* module identifier */
    var __vue_module_identifier__ = undefined;
    /* functional template */
    var __vue_is_functional_template__ = false;
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    var __vue_component__ = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
      __vue_inject_styles__,
      __vue_script__,
      __vue_scope_id__,
      __vue_is_functional_template__,
      __vue_module_identifier__,
      false,
      createInjector,
      undefined,
      undefined
    );

  // Import vue component

  // Declare install function executed by Vue.use()
  function install(Vue) {
    if (install.installed) { return }
    install.installed = true;
    Vue.component('VueTailwindPicker', __vue_component__);
  }

  // Create module definition for Vue.use()
  var plugin = {
    install: install,
  };

  // Auto-install when vue is found (eg. in browser via <script> tag)
  var GlobalVue = null;
  if (typeof window !== 'undefined') {
    GlobalVue = window.Vue;
  } else if (typeof global !== 'undefined') {
    GlobalVue = global.Vue;
  }
  if (GlobalVue) {
    GlobalVue.use(plugin);
  }

  exports.default = __vue_component__;
  exports.install = install;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
