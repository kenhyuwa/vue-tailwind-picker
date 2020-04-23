import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isBetween from 'dayjs/plugin/isBetween';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import advancedFormat from 'dayjs/plugin/advancedFormat';

//

dayjs.extend(isToday);
dayjs.extend(customParseFormat);
dayjs.extend(isBetween);
dayjs.extend(localizedFormat);
dayjs.extend(advancedFormat);

// import './css/tailwind.css' // development only

var script = {
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
      default: function () { return ({
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
      }); },
    },
  },
  data: function data() {
    var startDatepicker = dayjs(this.startDate, this.formatDate);
    var endDatepicker = this.endDate ? dayjs(this.endDate, this.formatDate) : undefined;
    var today = dayjs(this.startDate, this.formatDate);
    var months = Array.from(Array(12), function (v, i) {
      return dayjs()
        .month(i)
        .format('MMMM')
    });
    var years = Array.from(
      Array(this.endDate ? endDatepicker.diff(today, 'year') : dayjs().diff(today, 'year') + 10),
      function (v, i) {
        return dayjs().add(i, 'year').$y
      }
    );
    var visibleMonth = false;
    var visibleYear = false;
    return {
      startDatepicker: startDatepicker,
      endDatepicker: endDatepicker,
      today: today,
      visibleMonth: visibleMonth,
      months: months,
      visibleYear: visibleYear,
      years: years,
    }
  },
  mounted: function mounted() {
    this.init();
  },
  methods: {
    dayjs: dayjs,
    init: function init() {
      this.emit();
    },
    emit: function emit() {
      this.$emit('tailwind-change', this.today.format(this.formatDisplay));
    },
    changePicker: function changePicker(date) {
      this.today = date;
      this.emit();
    },
    onPrevious: function onPrevious() {
      if (this.visiblePrev) {
        this.today = this.today
          .set('month', this.today.$M === 0 ? 11 : this.today.$M - 1)
          .set('year', this.today.$M === 0 ? this.today.$y - 1 : this.today.$y);
        this.emit();
      }
    },
    onNext: function onNext() {
      if (this.visibleNext) {
        this.today = this.today
          .set('month', (this.today.$M + 1) % 12)
          .set('year', this.today.$M === 11 ? this.today.$y + 1 : this.today.$y);
        this.emit();
      }
    },
    possibleDate: function possibleDate(date) {
      return this.endDate ? date.isBetween(this.startDatepicker, this.endDatepicker.add(1, 'day'), 'day', '[)') : true
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
      this.today = this.today.set('month', month);
      this.emit();
      this.toggleMonth();
    },
    setYear: function setYear(year) {
      this.today = this.today.set('year', year);
      this.emit();
      this.toggleYear();
    },
  },
  computed: {
    days: function days() {
      return Array.from(Array(7), function (v, i) {
        return dayjs()
          .day(i)
          .format('ddd')
      })
    },
    previousPicker: function previousPicker() {
      var display = [];
      var previous = this.today.date(0);
      var current = this.today.date(0);
      for (var i = 0; i <= current.day(); i++) {
        display.push(previous.subtract(i, 'day'));
      }
      return display.sort(function (a, b) { return a.$d - b.$d; })
    },
    currentPicker: function currentPicker() {
      var this$1 = this;

      return Array.from(Array(this.today.daysInMonth()), function (v, i) {
        var events = this$1.today.date(++i);
        events.$events = this$1.eventDate.find(function (o) {
          return o.date === events.format(this$1.formatDate)
        });
        return events
      })
    },
    nextPicker: function nextPicker() {
      var display = [];
      var previous = this.previousPicker.length;
      var current = this.today.daysInMonth();
      for (var i = 1; i <= 42 - (previous + current); i++) {
        display.push(
          dayjs()
            .date(i)
            .month(this.today.$M + 1)
        );
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
      return this.today.diff(this.startDate, 'month') > 0
    },
    visibleNext: function visibleNext() {
      return this.endDate ? this.endDatepicker.diff(this.today, 'month') > 0 : true
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
    { staticClass: "relative select-none", class: _vm.className.textColor },
    [
      _c(
        "div",
        [
          _vm._t("default"),
          _vm._v(" "),
          _c("transition", { attrs: { name: "v-tailwind-picker" } }, [
            _c(
              "div",
              {
                staticClass:
                  "absolute bottom-0 inset-x-0 bg-transparent mt-3 z-10",
                class: { "inline-mode": _vm.inline },
                attrs: { id: "v-tailwind-picker" }
              },
              [
                _c(
                  "div",
                  {
                    staticClass:
                      "w-full h-auto max-w-xs transition-all duration-150 ease-linear bg-white rounded overflow-hidden border",
                    class: [_vm.className.borderColor, _vm.className.shadow]
                  },
                  [
                    _c("div", { attrs: { id: "v-tailwind-picker-header" } }, [
                      _c(
                        "div",
                        {
                          staticClass:
                            "flex flex-row justify-center items-center p-3"
                        },
                        [
                          _c(
                            "div",
                            {
                              staticClass:
                                "flex items-center font-semibold text-2xl xl:text-3xl leading-none"
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
                            _c("div", { staticClass: "leading-none text-sm" }, [
                              _vm._v(_vm._s(_vm.today.format("MMMM YYYY")))
                            ]),
                            _vm._v(" "),
                            _c("div", { staticClass: "leading-none text-xs" }, [
                              _vm._v(_vm._s(_vm.today.format("dddd")))
                            ])
                          ])
                        ]
                      )
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "relative px-1 py-1" }, [
                      _c("div", {
                        staticClass: "absolute inset-0",
                        class: _vm.className.pagination.backgroundColor
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
                                                _vm.className.pagination
                                                  .textColor,
                                                "hover:" +
                                                  _vm.className.pagination.hover
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
                                                  staticClass:
                                                    "h-4 w-auto fill-current",
                                                  attrs: {
                                                    xmlns:
                                                      "http://www.w3.org/2000/svg",
                                                    viewBox:
                                                      "0 0 511.641 511.641"
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
                          _c(
                            "div",
                            {
                              staticClass: "flex flex-1",
                              class: _vm.className.pagination.textColor
                            },
                            [
                              _c(
                                "div",
                                {
                                  staticClass:
                                    "flex-1 rounded overflow-hidden py-2 ml-2 mr-1 font-semibold text-center cursor-pointer transition duration-150 ease-out",
                                  class:
                                    "hover:" + _vm.className.pagination.hover,
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
                                    "flex-1 rounded overflow-hidden py-2 mr-2 ml-1 font-semibold text-center cursor-pointer transition duration-150 ease-out",
                                  class:
                                    "hover:" + _vm.className.pagination.hover,
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
                            ]
                          ),
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
                                                _vm.className.pagination
                                                  .textColor,
                                                "hover:" +
                                                  _vm.className.pagination.hover
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
                                                  staticClass:
                                                    "h-4 w-auto fill-current",
                                                  attrs: {
                                                    xmlns:
                                                      "http://www.w3.org/2000/svg",
                                                    viewBox:
                                                      "0 0 511.949 511.949"
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
                                        "flex flex-no-wrap py-1 border-b",
                                      class: _vm.className.borderColor
                                    },
                                    _vm._l(_vm.days, function(day, i) {
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
                                                _vm.classicTheme
                                                  ? i === 0
                                                    ? "text-red-500"
                                                    : i === 5
                                                    ? "text-green-500"
                                                    : ""
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
                                    { staticClass: "flex flex-wrap relative" },
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
                                              "w-1/7 flex justify-center cursor-not-allowed bg-gray-200 my-px",
                                            class: {
                                              "rounded-r-full":
                                                i ===
                                                _vm.previousPicker.length - 1
                                            }
                                          },
                                          [
                                            _c(
                                              "div",
                                              {
                                                staticClass:
                                                  "relative h-8 w-8 flex justify-center items-center"
                                              },
                                              [
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
                                                        staticClass:
                                                          "text-xs opacity-50",
                                                        class: [
                                                          _vm.classicTheme
                                                            ? date.day() === 0
                                                              ? "text-red-500"
                                                              : date.day() === 5
                                                              ? "text-green-500"
                                                              : ""
                                                            : ""
                                                        ]
                                                      },
                                                      [
                                                        _vm._v(
                                                          "\n                          " +
                                                            _vm._s(date.$D) +
                                                            "\n                        "
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
                                      _vm._l(_vm.currentPicker, function(date) {
                                        var _obj;
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
                                              "w-1/7 group flex justify-center items-center my-px py-px"
                                          },
                                          [
                                            _c(
                                              "div",
                                              { staticClass: "relative" },
                                              [
                                                date.$events
                                                  ? _c("div", {
                                                      staticClass:
                                                        "absolute top-0 right-0 h-2 w-2 rounded-full z-10",
                                                      class: [
                                                        {
                                                          "bg-indigo-500": !date
                                                            .$events.color
                                                        }
                                                      ],
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
                                                      "relative h-8 w-8 flex justify-center items-center rounded-full overflow-hidden"
                                                  },
                                                  [
                                                    _vm.possibleDate(date)
                                                      ? _c("div", {
                                                          staticClass:
                                                            "absolute inset-0 rounded-full transition duration-150 ease-in-out border-dotted border-transparent",
                                                          class: [
                                                            {
                                                              border:
                                                                date.$D !==
                                                                _vm.today.$D
                                                            },
                                                            date.$D ===
                                                            _vm.today.$D
                                                              ? _vm.className
                                                                  .calendar
                                                                  .selected
                                                                  .backgroundColor
                                                              : "cursor-pointer",
                                                            "hover:" +
                                                              _vm.className
                                                                .calendar
                                                                .selected
                                                                .borderColor
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
                                                              {
                                                                "text-red-500":
                                                                  (_vm.holidayDate(
                                                                    date
                                                                  ) ||
                                                                    date.day() ===
                                                                      0) &&
                                                                  date.$D !==
                                                                    _vm.today
                                                                      .$D &&
                                                                  _vm.classicTheme
                                                              },
                                                              {
                                                                "text-green-500":
                                                                  date.day() ===
                                                                    5 &&
                                                                  date.$D !==
                                                                    _vm.today
                                                                      .$D &&
                                                                  _vm.classicTheme
                                                              },
                                                              ((_obj = {}),
                                                              (_obj[
                                                                "z-10 " +
                                                                  _vm.className
                                                                    .calendar
                                                                    .selected
                                                                    .textColor +
                                                                  " font-semibold"
                                                              ] =
                                                                date.$D ===
                                                                _vm.today.$D),
                                                              _obj),
                                                              {
                                                                "opacity-50 cursor-not-allowed": !_vm.possibleDate(
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
                                              "w-1/7 flex justify-center cursor-not-allowed bg-gray-200 my-px",
                                            class: {
                                              "rounded-l-full": date.$D === 1
                                            }
                                          },
                                          [
                                            _c(
                                              "div",
                                              {
                                                staticClass:
                                                  "relative h-8 w-8 flex justify-center items-center"
                                              },
                                              [
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
                                                        staticClass:
                                                          "text-xs opacity-50",
                                                        class: [
                                                          _vm.classicTheme
                                                            ? date.day() === 0
                                                              ? "text-red-500"
                                                              : date.day() === 5
                                                              ? "text-green-500"
                                                              : ""
                                                            : ""
                                                        ]
                                                      },
                                                      [
                                                        _vm._v(
                                                          "\n                          " +
                                                            _vm._s(date.$D) +
                                                            "\n                        "
                                                        )
                                                      ]
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
                          {
                            attrs: { name: "v-tailwind-picker-months-and-year" }
                          },
                          [
                            _vm.enableMonth
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
                                                    ? _vm.className.monthAndYear
                                                        .borderColor
                                                    : _vm.className.borderColor,
                                                  "hover:" +
                                                    _vm.className.monthAndYear
                                                      .borderColor
                                                ],
                                                on: {
                                                  click: function($event) {
                                                    return _vm.setMonth(i)
                                                  }
                                                }
                                              },
                                              [
                                                _c("span", [
                                                  _vm._v(_vm._s(month))
                                                ])
                                              ]
                                            )
                                          ]
                                        )
                                      }),
                                      0
                                    )
                                  ]
                                )
                              : _vm._e(),
                            _vm._v(" "),
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
                                                    ? _vm.className.monthAndYear
                                                        .borderColor
                                                    : _vm.className.borderColor,
                                                  "hover:" +
                                                    _vm.className.monthAndYear
                                                      .borderColor
                                                ],
                                                on: {
                                                  click: function($event) {
                                                    return _vm.setYear(year)
                                                  }
                                                }
                                              },
                                              [
                                                _c("span", [
                                                  _vm._v(_vm._s(year))
                                                ])
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
                    }).length > 0 &&
                    !_vm.visibleMonth &&
                    !_vm.visibleYear
                      ? _c(
                          "div",
                          { attrs: { id: "v-tailwind-picker-footer" } },
                          [
                            _c(
                              "transition-group",
                              {
                                staticClass:
                                  "flex flex-wrap border-t px-2 py-1",
                                class: _vm.className.borderColor,
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
                                      staticClass: "w-full flex"
                                    },
                                    [
                                      _c(
                                        "div",
                                        { staticClass: "flex-shrink-0" },
                                        [
                                          _c(
                                            "div",
                                            { staticClass: "text-xs" },
                                            [
                                              _vm._v(
                                                _vm._s(
                                                  _vm.dayjs(
                                                    event.$events.date,
                                                    _vm.formatDate
                                                  ).$D
                                                )
                                              )
                                            ]
                                          )
                                        ]
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "div",
                                        { staticClass: "text-xs mx-1" },
                                        [_vm._v(_vm._s(event.$events.event))]
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
          ])
        ],
        2
      )
    ]
  )
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  var __vue_inject_styles__ = function (inject) {
    if (!inject) { return }
    inject("data-v-25bffc83_0", { source: "\n#v-tailwind-picker[data-v-25bffc83] {\n  top: 95%;\n}\n#v-tailwind-picker[data-v-25bffc83]:not(.inline-mode)::before {\n  content: '';\n  width: 14px;\n  height: 14px;\n  z-index: 10;\n  top: -7px;\n  left: 12px;\n  border-radius: 2px;\n  display: block;\n  position: absolute;\n  background: #ffffff;\n  border-top: 1px solid #e2e8f0;\n  border-left: 1px solid #e2e8f0;\n  transform: rotate(45deg);\n}\n#v-tailwind-picker .smooth-scrolling[data-v-25bffc83] {\n  height: 248px;\n  max-height: 250px;\n}\n.w-1\\/7[data-v-25bffc83] {\n  width: 14.285714%;\n}\n.v-tailwind-picker-enter-active[data-v-25bffc83],\n.v-tailwind-picker-leave-active[data-v-25bffc83] {\n  transition: all 0.1s;\n}\n.v-tailwind-picker-enter[data-v-25bffc83],\n.v-tailwind-picker-leave-to[data-v-25bffc83] {\n  opacity: 0;\n  transform: translateY(15px);\n}\n.v-tailwind-picker-chevron-left-enter-active[data-v-25bffc83],\n.v-tailwind-picker-chevron-left-leave-active[data-v-25bffc83] {\n  transition: all 0.2s;\n}\n.v-tailwind-picker-chevron-left-enter[data-v-25bffc83],\n.v-tailwind-picker-chevron-left-leave-to[data-v-25bffc83] {\n  opacity: 0;\n  transform: translateX(-15px);\n}\n.v-tailwind-picker-chevron-right-enter-active[data-v-25bffc83],\n.v-tailwind-picker-chevron-right-leave-active[data-v-25bffc83] {\n  transition: all 0.2s;\n}\n.v-tailwind-picker-chevron-right-enter[data-v-25bffc83],\n.v-tailwind-picker-chevron-right-leave-to[data-v-25bffc83] {\n  opacity: 0;\n  transform: translateX(15px);\n}\n.v-tailwind-picker-body-enter-active[data-v-25bffc83],\n.v-tailwind-picker-body-leave-active[data-v-25bffc83] {\n  transition: all 0.2s;\n}\n.v-tailwind-picker-body-enter[data-v-25bffc83],\n.v-tailwind-picker-body-leave-to[data-v-25bffc83] {\n  opacity: 0;\n  transform: translateY(-15px);\n}\n.v-tailwind-picker-footer-enter-active[data-v-25bffc83],\n.v-tailwind-picker-footer-leave-active[data-v-25bffc83] {\n  transition: all 0.2s;\n}\n.v-tailwind-picker-footer-enter[data-v-25bffc83],\n.v-tailwind-picker-footer-leave-to[data-v-25bffc83] {\n  opacity: 0;\n  transform: translateY(-15px);\n}\n.v-tailwind-picker-months-and-year-enter-active[data-v-25bffc83],\n.v-tailwind-picker-months-and-year-leave-active[data-v-25bffc83] {\n  transition: all 0.2s;\n}\n.v-tailwind-picker-months-and-year-enter[data-v-25bffc83],\n.v-tailwind-picker-months-and-year-leave-to[data-v-25bffc83] {\n  opacity: 0;\n  transform: translateY(-15px);\n}\n", map: {"version":3,"sources":["/Users/user/Documents/RoomMe/feelin-website/.packages/vue-tailwind-picker/src/vue-tailwind-picker.vue"],"names":[],"mappings":";AAqgBA;EACA,QAAA;AACA;AAEA;EACA,WAAA;EACA,WAAA;EACA,YAAA;EACA,WAAA;EACA,SAAA;EACA,UAAA;EACA,kBAAA;EACA,cAAA;EACA,kBAAA;EACA,mBAAA;EACA,6BAAA;EACA,8BAAA;EACA,wBAAA;AACA;AAEA;EACA,aAAA;EACA,iBAAA;AACA;AAEA;EACA,iBAAA;AACA;AAEA;;EAEA,oBAAA;AACA;AAEA;;EAEA,UAAA;EACA,2BAAA;AACA;AAEA;;EAEA,oBAAA;AACA;AAEA;;EAEA,UAAA;EACA,4BAAA;AACA;AAEA;;EAEA,oBAAA;AACA;AAEA;;EAEA,UAAA;EACA,2BAAA;AACA;AAEA;;EAEA,oBAAA;AACA;AAEA;;EAEA,UAAA;EACA,4BAAA;AACA;AAEA;;EAEA,oBAAA;AACA;AAEA;;EAEA,UAAA;EACA,4BAAA;AACA;AAEA;;EAEA,oBAAA;AACA;AAEA;;EAEA,UAAA;EACA,4BAAA;AACA","file":"vue-tailwind-picker.vue","sourcesContent":["<template>\n  <div class=\"relative select-none\" :class=\"className.textColor\">\n    <div>\n      <slot></slot>\n      <transition name=\"v-tailwind-picker\">\n        <div\n          id=\"v-tailwind-picker\"\n          class=\"absolute bottom-0 inset-x-0 bg-transparent mt-3 z-10\"\n          :class=\"{ 'inline-mode': inline }\"\n        >\n          <div\n            class=\"w-full h-auto max-w-xs transition-all duration-150 ease-linear bg-white rounded overflow-hidden border\"\n            :class=\"[className.borderColor, className.shadow]\"\n          >\n            <div id=\"v-tailwind-picker-header\">\n              <div class=\"flex flex-row justify-center items-center p-3\">\n                <div class=\"flex items-center font-semibold text-2xl xl:text-3xl leading-none\">\n                  {{ today.format('DD') }}\n                </div>\n                <div class=\"mx-1\">\n                  <div class=\"leading-none text-sm\">{{ today.format('MMMM YYYY') }}</div>\n                  <div class=\"leading-none text-xs\">{{ today.format('dddd') }}</div>\n                </div>\n              </div>\n            </div>\n\n            <div class=\"relative px-1 py-1\">\n              <div class=\"absolute inset-0\" :class=\"className.pagination.backgroundColor\"></div>\n              <div class=\"flex justify-between items-center relative\">\n                <div class=\"flex-shrink-0 w-8\">\n                  <transition name=\"v-tailwind-picker-chevron-left\">\n                    <div v-if=\"!enableMonth && !enableYear\" class=\"rounded-full overflow-hidden\">\n                      <div\n                        class=\"transition duration-150 ease-out p-2\"\n                        :class=\"[\n                          visiblePrev ? 'cursor-pointer' : 'cursor-not-allowed opacity-30',\n                          className.pagination.textColor,\n                          `hover:${className.pagination.hover}`,\n                        ]\"\n                        @click=\"onPrevious()\"\n                      >\n                        <svg\n                          class=\"h-4 w-auto fill-current\"\n                          xmlns=\"http://www.w3.org/2000/svg\"\n                          viewBox=\"0 0 511.641 511.641\"\n                        >\n                          <path\n                            d=\"M148.32 255.76L386.08 18c4.053-4.267 3.947-10.987-.213-15.04a10.763 10.763 0 00-14.827 0L125.707 248.293a10.623 10.623 0 000 15.04L371.04 508.667c4.267 4.053 10.987 3.947 15.04-.213a10.763 10.763 0 000-14.827L148.32 255.76z\"\n                          />\n                        </svg>\n                      </div>\n                    </div>\n                  </transition>\n                </div>\n                <div class=\"flex flex-1\" :class=\"className.pagination.textColor\">\n                  <div\n                    class=\"flex-1 rounded overflow-hidden py-2 ml-2 mr-1 font-semibold text-center cursor-pointer transition duration-150 ease-out\"\n                    @click=\"toggleMonth()\"\n                    :class=\"`hover:${className.pagination.hover}`\"\n                  >\n                    {{ today.format('MMMM') }}\n                  </div>\n                  <div\n                    class=\"flex-1 rounded overflow-hidden py-2 mr-2 ml-1 font-semibold text-center cursor-pointer transition duration-150 ease-out\"\n                    @click=\"toggleYear()\"\n                    :class=\"`hover:${className.pagination.hover}`\"\n                  >\n                    {{ today.$y }}\n                  </div>\n                </div>\n\n                <div class=\"flex-shrink-0 w-8\">\n                  <transition name=\"v-tailwind-picker-chevron-right\">\n                    <div class=\"rounded-full overflow-hidden\" v-if=\"!enableMonth && !enableYear\">\n                      <div\n                        class=\"transition duration-150 ease-out p-2\"\n                        :class=\"[\n                          visibleNext ? 'cursor-pointer' : 'cursor-not-allowed opacity-30',\n                          className.pagination.textColor,\n                          `hover:${className.pagination.hover}`,\n                        ]\"\n                        @click=\"onNext()\"\n                      >\n                        <svg\n                          class=\"h-4 w-auto fill-current\"\n                          xmlns=\"http://www.w3.org/2000/svg\"\n                          viewBox=\"0 0 511.949 511.949\"\n                        >\n                          <path\n                            d=\"M386.235 248.308L140.902 2.975c-4.267-4.053-10.987-3.947-15.04.213a10.763 10.763 0 000 14.827l237.76 237.76-237.76 237.867c-4.267 4.053-4.373 10.88-.213 15.04 4.053 4.267 10.88 4.373 15.04.213l.213-.213 245.333-245.333a10.624 10.624 0 000-15.041z\"\n                          />\n                        </svg>\n                      </div>\n                    </div>\n                  </transition>\n                </div>\n              </div>\n            </div>\n\n            <div class=\"smooth-scrolling overflow-x-hidden overflow-y-auto\">\n              <transition name=\"v-tailwind-picker-body\">\n                <div v-if=\"!enableMonth && !enableYear\" class=\"relative\">\n                  <div class=\"flex flex-no-wrap py-1 border-b\" :class=\"className.borderColor\">\n                    <div v-for=\"(day, i) in days\" :key=\"day\" class=\"w-1/7 flex justify-center\">\n                      <div\n                        class=\"leading-relaxed text-sm\"\n                        :class=\"[classicTheme ? (i === 0 ? 'text-red-500' : i === 5 ? 'text-green-500' : '') : '']\"\n                      >\n                        {{ day }}\n                      </div>\n                    </div>\n                  </div>\n\n                  <div class=\"flex flex-wrap relative\">\n                    <div\n                      v-for=\"(date, i) in previousPicker\"\n                      :key=\"`${date.$D}${date.$M}${date.$y}-previous`\"\n                      class=\"w-1/7 flex justify-center cursor-not-allowed bg-gray-200 my-px\"\n                      :class=\"{ 'rounded-r-full': i === previousPicker.length - 1 }\"\n                    >\n                      <div class=\"relative h-8 w-8 flex justify-center items-center\">\n                        <div class=\"flex justify-center items-center\" :data-tailwind-datepicker=\"date.$d\">\n                          <div\n                            class=\"text-xs opacity-50\"\n                            :class=\"[\n                              classicTheme\n                                ? date.day() === 0\n                                  ? 'text-red-500'\n                                  : date.day() === 5\n                                  ? 'text-green-500'\n                                  : ''\n                                : '',\n                            ]\"\n                          >\n                            {{ date.$D }}\n                          </div>\n                        </div>\n                      </div>\n                    </div>\n\n                    <div\n                      v-for=\"date in currentPicker\"\n                      :key=\"`${date.$D}${date.$M}${date.$y}-current`\"\n                      class=\"w-1/7 group flex justify-center items-center my-px py-px\"\n                    >\n                      <div class=\"relative\">\n                        <div\n                          v-if=\"date.$events\"\n                          class=\"absolute top-0 right-0 h-2 w-2 rounded-full z-10\"\n                          :class=\"[{ 'bg-indigo-500': !date.$events.color }]\"\n                          :style=\"{\n                            backgroundColor: date.$events.color ? date.$events.color : '',\n                          }\"\n                        ></div>\n                        <div class=\"relative h-8 w-8 flex justify-center items-center rounded-full overflow-hidden\">\n                          <div\n                            v-if=\"possibleDate(date)\"\n                            class=\"absolute inset-0 rounded-full transition duration-150 ease-in-out border-dotted border-transparent\"\n                            :class=\"[\n                              {\n                                border: date.$D !== today.$D,\n                              },\n                              date.$D === today.$D ? className.calendar.selected.backgroundColor : 'cursor-pointer',\n                              `hover:${className.calendar.selected.borderColor}`,\n                            ]\"\n                            @click=\"changePicker(date)\"\n                          ></div>\n                          <div class=\"flex justify-center items-center\" :data-tailwind-datepicker=\"date.$d\">\n                            <div\n                              :class=\"[\n                                {\n                                  'text-red-500':\n                                    (holidayDate(date) || date.day() === 0) && date.$D !== today.$D && classicTheme,\n                                },\n                                {\n                                  'text-green-500': date.day() === 5 && date.$D !== today.$D && classicTheme,\n                                },\n                                {\n                                  [`z-10 ${className.calendar.selected.textColor} font-semibold`]: date.$D === today.$D,\n                                },\n                                { 'opacity-50 cursor-not-allowed': !possibleDate(date) },\n                              ]\"\n                            >\n                              <span>{{ date.$D }}</span>\n                            </div>\n                          </div>\n                        </div>\n                      </div>\n                    </div>\n\n                    <div\n                      v-for=\"date in nextPicker\"\n                      :key=\"`${date.$D}${date.$M}${date.$y}-next`\"\n                      class=\"w-1/7 flex justify-center cursor-not-allowed bg-gray-200 my-px\"\n                      :class=\"{ 'rounded-l-full': date.$D === 1 }\"\n                    >\n                      <div class=\"relative h-8 w-8 flex justify-center items-center\">\n                        <div class=\"flex justify-center items-center\" :data-tailwind-datepicker=\"date.$d\">\n                          <div\n                            class=\"text-xs opacity-50\"\n                            :class=\"[\n                              classicTheme\n                                ? date.day() === 0\n                                  ? 'text-red-500'\n                                  : date.day() === 5\n                                  ? 'text-green-500'\n                                  : ''\n                                : '',\n                            ]\"\n                          >\n                            {{ date.$D }}\n                          </div>\n                        </div>\n                      </div>\n                    </div>\n                  </div>\n                </div>\n              </transition>\n\n              <transition name=\"v-tailwind-picker-months-and-year\">\n                <div v-if=\"enableMonth\" class=\"relative smooth-scrolling overflow-y-auto overflow-x-hidden\">\n                  <div class=\"flex flex-wrap py-1\">\n                    <div v-for=\"(month, i) in months\" :key=\"i\" class=\"w-1/3 flex justify-center items-center px-2\">\n                      <div\n                        :class=\"[\n                          i === today.$M ? className.monthAndYear.borderColor : className.borderColor,\n                          `hover:${className.monthAndYear.borderColor}`,\n                        ]\"\n                        class=\"w-full flex justify-center items-center py-2 my-1 transition duration-150 ease-out rounded border cursor-pointer\"\n                        @click=\"setMonth(i)\"\n                      >\n                        <span>{{ month }}</span>\n                      </div>\n                    </div>\n                  </div>\n                </div>\n                <div v-if=\"enableYear\" class=\"relative smooth-scrolling overflow-y-auto overflow-x-hidden\">\n                  <div class=\"flex flex-wrap py-1\">\n                    <div v-for=\"(year, i) in years\" :key=\"i\" class=\"w-1/3 flex justify-center items-center px-2\">\n                      <div\n                        :class=\"[\n                          year === today.$y ? className.monthAndYear.borderColor : className.borderColor,\n                          `hover:${className.monthAndYear.borderColor}`,\n                        ]\"\n                        class=\"w-full flex justify-center items-center py-2 my-1 transition duration-150 ease-out rounded border cursor-pointer\"\n                        @click=\"setYear(year)\"\n                      >\n                        <span>{{ year }}</span>\n                      </div>\n                    </div>\n                  </div>\n                </div>\n              </transition>\n            </div>\n\n            <div\n              v-if=\"currentPicker.filter(o => o.$events !== undefined).length > 0 && !visibleMonth && !visibleYear\"\n              id=\"v-tailwind-picker-footer\"\n            >\n              <transition-group\n                name=\"v-tailwind-picker-footer\"\n                tag=\"div\"\n                class=\"flex flex-wrap border-t px-2 py-1\"\n                :class=\"className.borderColor\"\n              >\n                <div\n                  v-for=\"(event, i) in currentPicker.filter(o => o.$events !== undefined)\"\n                  :key=\"`${i}-event`\"\n                  class=\"w-full flex\"\n                >\n                  <div class=\"flex-shrink-0\">\n                    <div class=\"text-xs\">{{ dayjs(event.$events.date, formatDate).$D }}</div>\n                  </div>\n                  <div class=\"text-xs mx-1\">{{ event.$events.event }}</div>\n                </div>\n              </transition-group>\n            </div>\n          </div>\n        </div>\n      </transition>\n    </div>\n  </div>\n</template>\n\n<script>\nimport dayjs from 'dayjs'\n\nimport isToday from 'dayjs/plugin/isToday'\nimport customParseFormat from 'dayjs/plugin/customParseFormat'\nimport isBetween from 'dayjs/plugin/isBetween'\nimport localizedFormat from 'dayjs/plugin/localizedFormat'\nimport advancedFormat from 'dayjs/plugin/advancedFormat'\n\ndayjs.extend(isToday)\ndayjs.extend(customParseFormat)\ndayjs.extend(isBetween)\ndayjs.extend(localizedFormat)\ndayjs.extend(advancedFormat)\n\n// import './css/tailwind.css' // development only\n\nexport default {\n  name: 'vue-tailwind-picker',\n  props: {\n    startDate: {\n      type: String,\n      required: false,\n      default: dayjs().format('YYYY-MM-DD'),\n    },\n    endDate: {\n      type: String,\n      required: false,\n      default: undefined,\n    },\n    disableDate: {\n      type: Array,\n      required: false,\n      default: () => [],\n    },\n    eventDate: {\n      type: Array,\n      required: false,\n      default: () => [],\n    },\n    formatDate: {\n      type: String,\n      required: false,\n      default: 'YYYY-MM-DD',\n    },\n    formatDisplay: {\n      type: String,\n      required: false,\n      default: 'YYYY-MM-DD',\n    },\n    tailwindPickerValue: {\n      type: String,\n      required: false,\n      default: '',\n    },\n    inline: {\n      type: Boolean,\n      required: false,\n      default: true,\n    },\n    classicTheme: {\n      type: Boolean,\n      required: false,\n      default: true,\n    },\n    className: {\n      type: Object,\n      required: false,\n      default: () => ({\n        shadow: 'shadow',\n        borderColor: 'border-gray-300',\n        textColor: 'text-gray-800',\n        pagination: {\n          backgroundColor: 'bg-teal-500',\n          hover: 'bg-teal-600',\n          textColor: 'text-gray-100',\n        },\n        monthAndYear: {\n          borderColor: 'border-teal-500',\n        },\n        calendar: {\n          selected: {\n            backgroundColor: 'bg-teal-500',\n            textColor: 'text-white',\n            borderColor: 'border-teal-600',\n          },\n        },\n      }),\n    },\n  },\n  data() {\n    const startDatepicker = dayjs(this.startDate, this.formatDate)\n    const endDatepicker = this.endDate ? dayjs(this.endDate, this.formatDate) : undefined\n    const today = dayjs(this.startDate, this.formatDate)\n    const months = Array.from(Array(12), (v, i) => {\n      return dayjs()\n        .month(i)\n        .format('MMMM')\n    })\n    const years = Array.from(\n      Array(this.endDate ? endDatepicker.diff(today, 'year') : dayjs().diff(today, 'year') + 10),\n      (v, i) => {\n        return dayjs().add(i, 'year').$y\n      },\n    )\n    const visibleMonth = false\n    const visibleYear = false\n    return {\n      startDatepicker,\n      endDatepicker,\n      today,\n      visibleMonth,\n      months,\n      visibleYear,\n      years,\n    }\n  },\n  mounted() {\n    this.init()\n  },\n  methods: {\n    dayjs,\n    init() {\n      this.emit()\n    },\n    emit() {\n      this.$emit('tailwind-change', this.today.format(this.formatDisplay))\n    },\n    changePicker(date) {\n      this.today = date\n      this.emit()\n    },\n    onPrevious() {\n      if (this.visiblePrev) {\n        this.today = this.today\n          .set('month', this.today.$M === 0 ? 11 : this.today.$M - 1)\n          .set('year', this.today.$M === 0 ? this.today.$y - 1 : this.today.$y)\n        this.emit()\n      }\n    },\n    onNext() {\n      if (this.visibleNext) {\n        this.today = this.today\n          .set('month', (this.today.$M + 1) % 12)\n          .set('year', this.today.$M === 11 ? this.today.$y + 1 : this.today.$y)\n        this.emit()\n      }\n    },\n    possibleDate(date) {\n      return this.endDate ? date.isBetween(this.startDatepicker, this.endDatepicker.add(1, 'day'), 'day', '[)') : true\n    },\n    holidayDate(date) {\n      return !!(date.$events && date.$events.holiday)\n    },\n    toggleMonth() {\n      this.visibleMonth = !this.visibleMonth\n      if (this.visibleMonth) {\n        this.visibleYear = false\n      }\n    },\n    toggleYear() {\n      this.visibleYear = !this.visibleYear\n      if (this.visibleYear) {\n        this.visibleMonth = false\n      }\n    },\n    setMonth(month) {\n      this.today = this.today.set('month', month)\n      this.emit()\n      this.toggleMonth()\n    },\n    setYear(year) {\n      this.today = this.today.set('year', year)\n      this.emit()\n      this.toggleYear()\n    },\n  },\n  computed: {\n    days() {\n      return Array.from(Array(7), (v, i) => {\n        return dayjs()\n          .day(i)\n          .format('ddd')\n      })\n    },\n    previousPicker() {\n      const display = []\n      const previous = this.today.date(0)\n      const current = this.today.date(0)\n      for (let i = 0; i <= current.day(); i++) {\n        display.push(previous.subtract(i, 'day'))\n      }\n      return display.sort((a, b) => a.$d - b.$d)\n    },\n    currentPicker() {\n      return Array.from(Array(this.today.daysInMonth()), (v, i) => {\n        const events = this.today.date(++i)\n        events.$events = this.eventDate.find(o => {\n          return o.date === events.format(this.formatDate)\n        })\n        return events\n      })\n    },\n    nextPicker() {\n      const display = []\n      const previous = this.previousPicker.length\n      const current = this.today.daysInMonth()\n      for (let i = 1; i <= 42 - (previous + current); i++) {\n        display.push(\n          dayjs()\n            .date(i)\n            .month(this.today.$M + 1),\n        )\n      }\n      return display\n    },\n    enableMonth() {\n      return this.visibleMonth\n    },\n    enableYear() {\n      return this.visibleYear\n    },\n    visiblePrev() {\n      return this.today.diff(this.startDate, 'month') > 0\n    },\n    visibleNext() {\n      return this.endDate ? this.endDatepicker.diff(this.today, 'month') > 0 : true\n    },\n  },\n}\n</script>\n\n<style scoped>\n#v-tailwind-picker {\n  top: 95%;\n}\n\n#v-tailwind-picker:not(.inline-mode)::before {\n  content: '';\n  width: 14px;\n  height: 14px;\n  z-index: 10;\n  top: -7px;\n  left: 12px;\n  border-radius: 2px;\n  display: block;\n  position: absolute;\n  background: #ffffff;\n  border-top: 1px solid #e2e8f0;\n  border-left: 1px solid #e2e8f0;\n  transform: rotate(45deg);\n}\n\n#v-tailwind-picker .smooth-scrolling {\n  height: 248px;\n  max-height: 250px;\n}\n\n.w-1\\/7 {\n  width: 14.285714%;\n}\n\n.v-tailwind-picker-enter-active,\n.v-tailwind-picker-leave-active {\n  transition: all 0.1s;\n}\n\n.v-tailwind-picker-enter,\n.v-tailwind-picker-leave-to {\n  opacity: 0;\n  transform: translateY(15px);\n}\n\n.v-tailwind-picker-chevron-left-enter-active,\n.v-tailwind-picker-chevron-left-leave-active {\n  transition: all 0.2s;\n}\n\n.v-tailwind-picker-chevron-left-enter,\n.v-tailwind-picker-chevron-left-leave-to {\n  opacity: 0;\n  transform: translateX(-15px);\n}\n\n.v-tailwind-picker-chevron-right-enter-active,\n.v-tailwind-picker-chevron-right-leave-active {\n  transition: all 0.2s;\n}\n\n.v-tailwind-picker-chevron-right-enter,\n.v-tailwind-picker-chevron-right-leave-to {\n  opacity: 0;\n  transform: translateX(15px);\n}\n\n.v-tailwind-picker-body-enter-active,\n.v-tailwind-picker-body-leave-active {\n  transition: all 0.2s;\n}\n\n.v-tailwind-picker-body-enter,\n.v-tailwind-picker-body-leave-to {\n  opacity: 0;\n  transform: translateY(-15px);\n}\n\n.v-tailwind-picker-footer-enter-active,\n.v-tailwind-picker-footer-leave-active {\n  transition: all 0.2s;\n}\n\n.v-tailwind-picker-footer-enter,\n.v-tailwind-picker-footer-leave-to {\n  opacity: 0;\n  transform: translateY(-15px);\n}\n\n.v-tailwind-picker-months-and-year-enter-active,\n.v-tailwind-picker-months-and-year-leave-active {\n  transition: all 0.2s;\n}\n\n.v-tailwind-picker-months-and-year-enter,\n.v-tailwind-picker-months-and-year-leave-to {\n  opacity: 0;\n  transform: translateY(-15px);\n}\n</style>\n"]}, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__ = "data-v-25bffc83";
  /* module identifier */
  var __vue_module_identifier__ = undefined;
  /* functional template */
  var __vue_is_functional_template__ = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__ = normalizeComponent(
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

export default __vue_component__;
export { install };
