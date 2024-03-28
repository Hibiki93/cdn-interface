<template>
  <footer class="py-3 footer">
    <div class="container-fluid">
      <div class="row align-items-center justify-content-lg-between">
        <div class="mb-4 col-lg-6 mb-lg-0 offset-lg-6">
          <div
            class="text-sm text-center copyright text-muted text-lg-end">
            ©
            {{ new Date().getFullYear() }}, made with by
            Hibiki
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "app-footer",
};
</script>
