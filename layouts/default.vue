<template>
  <div class="tw-flex tw-flex-col tw-items-center tw-min-h-screen tw-overflow-x-hidden">
    <main class="tw-flex-grow tw-w-full">
      <slot />
    </main>

    <footer>
      <GitBadge text="favourwright" link="http://github.com/favourwright" />
    </footer>
  </div>
</template>