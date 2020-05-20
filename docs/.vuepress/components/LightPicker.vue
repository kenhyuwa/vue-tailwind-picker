<template>
  <div>
    <div class="w-full sm:w-1/3">
      <div class="relative sm:static">
        <label for="checkin-light" class="block text-sm font-bold"
          >Check-in</label
        >
        <div
          class="relative flex justify-between items-center bg-gray-200 border border-gray-300 rounded my-1 focus-within:bg-white"
        >
          <VueTailwindPicker
            @change="
              (value) => {
                checkin = value
              }
            "
          >
            <span
              class="absolute inset-y-0 left-0 bg-white inline-flex items-center px-1 m-1 rounded overflow-hidden shadow"
            >
              <svg
                class="h-6 w-auto"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 64 64"
                fill="currentColor"
              >
                <path
                  d="M57 8h-5V6a4 4 0 00-8 0v2h-8V6a4 4 0 00-8 0v2h-8V6a4 4 0 00-8 0v2H7a5 5 0 00-5 5v40a5 5 0 005 5h28a1 1 0 000-2H7a3.009 3.009 0 01-3-3V22h56v17a1 1 0 002 0V13a5 5 0 00-5-5zM46 6a2 2 0 014 0v6a2 2 0 01-4 0zM30 6a2 2 0 014 0v6a2 2 0 01-4 0zM14 6a2 2 0 014 0v6a2 2 0 01-4 0zm46 14H4v-7a3.009 3.009 0 013-3h5v2a4 4 0 008 0v-2h8v2a4 4 0 008 0v-2h8v2a4 4 0 008 0v-2h5a3.009 3.009 0 013 3z"
                />
                <path
                  d="M30 29a2 2 0 00-2-2h-4a2 2 0 00-2 2v3a2 2 0 002 2h4a2 2 0 002-2zm-6 3v-3h4v3zM18 29a2 2 0 00-2-2h-4a2 2 0 00-2 2v3a2 2 0 002 2h4a2 2 0 002-2zm-6 3v-3h4v3zM52 34a2 2 0 002-2v-3a2 2 0 00-2-2h-4a2 2 0 00-2 2v3a2 2 0 002 2zm-4-5h4v3h-4zM30 38a2 2 0 00-2-2h-4a2 2 0 00-2 2v3a2 2 0 002 2h4a2 2 0 002-2zm-6 3v-3h4v3zM18 38a2 2 0 00-2-2h-4a2 2 0 00-2 2v3a2 2 0 002 2h4a2 2 0 002-2zm-6 3v-3h4v3zM28 45h-4a2 2 0 00-2 2v3a2 2 0 002 2h4a2 2 0 002-2v-3a2 2 0 00-2-2zm-4 5v-3h4v3zM36 34h4a2 2 0 002-2v-3a2 2 0 00-2-2h-4a2 2 0 00-2 2v3a2 2 0 002 2zm0-5h4v3h-4zM34 41a2 2 0 002 2 1 1 0 000-2v-3h4a1 1 0 000-2h-4a2 2 0 00-2 2zM16 45h-4a2 2 0 00-2 2v3a2 2 0 002 2h4a2 2 0 002-2v-3a2 2 0 00-2-2zm-4 5v-3h4v3z"
                />
                <path
                  d="M49 36a13 13 0 1013 13 13.015 13.015 0 00-13-13zm0 24a11 11 0 1111-11 11.013 11.013 0 01-11 11z"
                />
                <path
                  d="M54.778 44.808L47 52.586l-3.535-3.536a1 1 0 00-1.414 1.414l4.242 4.243a1 1 0 001.414 0l8.485-8.485a1 1 0 00-1.414-1.414z"
                />
              </svg>
            </span>
            <input
              id="checkin-light"
              v-model="checkin"
              type="text"
              class="w-full z-1 block text-sm bg-transparent placeholder-gray-300 font-semibold pl-10 pr-0 py-2 cursor-default focus:outline-none"
              readonly
              placeholder="Check in"
            />
          </VueTailwindPicker>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueTailwindPicker from './../../../src/vue-tailwind-picker'
export default {
  name: 'LightPicker',
  components: {
    VueTailwindPicker,
  },
  data() {
    return {
      checkin: '',
    }
  },
}
</script>
