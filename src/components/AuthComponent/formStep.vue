<template>

      <ul class="steps">
        <li :class="{'step-item': true, 'active': isFirstElementActive}">
          <div class="icon-done">
            <i class="fas fa-check icon"></i>
          </div>
          <span class="progress-label">1</span>
        </li>

        <li :class="{'step-item': true, 'active': isSecElementActive}">
          <div class="icon-done">
            <i class="fas fa-check icon"></i>
          </div>
          <span class="progress-label">2</span>
        </li>

        <li :class="{'step-item': true, 'active': isThirdElementActive}">
          <div class="icon-done">
            <i class="fas fa-check icon"></i>
          </div>
          <span class="progress-label">3</span>
        </li>
      </ul>
</template>

<script>
export default {
    props: {
        isFirstElementActive: Boolean, // Receive the prop from the parent
        isSecElementActive: Boolean, // Receive the prop from the parent
        isThirdElementActive: Boolean, // Receive the prop from the parent
    },
}
</script>