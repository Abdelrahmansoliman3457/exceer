<template>
    <Dialog v-model:visible="Save_modifications" modal class="custum_dialog_width noclose" :draggable="false">
        <div class="text-center">
            <p class="main-title"> {{ $t('Glopal.modifications_saved_successfully') }} </p>
            <img :src="require('@/assets/images/img-done.png')" alt="img-done" class="img-done">
        </div>
    </Dialog>
</template>

<script>
import Dialog from 'primevue/dialog';


export default {
    components: {
        Dialog
    },

    data() {
        return {
            Save_modifications: false,
        };
    },
}
</script>
