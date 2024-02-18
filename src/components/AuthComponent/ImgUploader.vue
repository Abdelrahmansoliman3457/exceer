

<template>
    <input
      class=""
      type="file"
      :multiple="IsMultible"
      ref="deleteVal"
      :name="name"
      :accept="acceptedFiles"
      @change="handleFileChange" />
    <div v-if="uploadedImages.length > 0">
      <div
        class="uploaded-block"
        v-for="(image, index) in uploadedImages"
        :key="index"
      >
        <img
          v-if="acceptedFiles == 'image/*'"
          :src="image.url"
          alt="Uploaded Image"
          class="test"
        />
        <div v-else-if="acceptedFiles == 'application/*'">
          <p>{{ image.file.name }}</p>
          pdf text
        </div>
        <button class="remove-btn" @click="removeImage(index)">
          <i class="fas fa-trash-alt"></i>
        </button>
      </div>
    </div>
</template>

<script>

export default {

    props: ['acceptedFiles', 'name', 'IsMultible', "customProp", "newImages"],
  data() {
    return {
      uploadedImages: [],
    //   acceptedFiles: "application/*",
    };
  },

  methods: {
    handleFileChange(event) {
      let selectedFiles = event.target.files;

        if (this.validateImageSize(selectedFiles)) {

        if(this.customProp) {
          
          for (let i = 0; i < selectedFiles.length; i++) {
              const file = selectedFiles[i];
                const imageUrl = URL.createObjectURL(file);
                this.uploadedImages.push({ url: imageUrl, file });
            }
            console.log("multible")
            
        }

       else {
          const file = selectedFiles[0];
          const imageUrl = URL.createObjectURL(file);
          this.uploadedImages.push({ url: imageUrl, file, id: 0 });
          
      }
            } else {
              // Display an error message or take appropriate action
              console.log('Image size exceeds the maximum limit');
            }

        // Emit a custom event to pass the uploadedImages array to the parent component
        this.$emit("uploaded-images-updated", this.uploadedImages[0].file);
        console.log(this.uploadedImages)
        // event.target.value = null;
    },

    validateImageSize(files) {
      const maxSizeInBytes = 20 * 1024 * 1024; // 20MB

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.size > maxSizeInBytes) {
          return false; // Image size exceeds the maximum limit
        }
      }

  return true; // All images are within the size limit
},
    
    removeImage(index) {
      // Remove the image from the uploadedImages array
      this.$emit("remove-image", this.uploadedImages[index]);
      this.uploadedImages.splice(index, 1);
      this.$emit("uploaded-images-updated", this.uploadedImages);
      console.log(this.uploadedImages, "from remove")
      this.$refs.deleteVal.value = null;
    },
  },
  

    watch: {
    newImages(newVal) {
      if (newVal) {
        this.uploadedImages = [{ url: newVal, file: null }];
      }
    },
  },


  // watch: {
  //   newImages(newVal) {
  //     if (newVal && Array.isArray(newVal) && newVal.length > 0) {
  //       this.uploadedImages = newVal.map(item => ({
  //         url: item.url,
  //         file: item.file || null
  //       }));
  //     } else {
  //       // Handle the case where newImages is a single string URL
  //       this.uploadedImages = newVal
  //         ? [{ url: newVal, file: null }]
  //         : [];
  //     }
  //   },
  // },
  
};

</script>










<!--


<template>
  <input
    class=""
    type="file"
    :multiple="IsMultible"
    :name="name"
    :accept="acceptedFiles"
    @change="handleFileChange"
  />
  <div v-if="uploadedImages">
    <div
      class="uploaded-block"
      v-for="(image, index) in (Array.isArray(uploadedImages) ? uploadedImages : [uploadedImages])"
      :key="index"
    >
      <img
        v-if="acceptedFiles == 'image/*'"
        :src="image.url"
        alt="Uploaded Image"
        class="test"
      />
      <div v-else-if="acceptedFiles == 'application/*'">
        <p>{{ image.file.name }}</p>
        pdf text
      </div>
      <button class="remove-btn" @click="removeImage(index)">
        <i class="fas fa-trash-alt"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['acceptedFiles', 'name', 'IsMultible', 'customProp'],
  data() {
    return {
      uploadedImages: [],
    };
  },
  methods: {
    handleFileChange(event) {
      let selectedFiles = event.target.files;

      if (this.validateImageSize(selectedFiles)) {
        if (this.customProp) {
          // Handle multiple file upload
          this.uploadedImages = selectedFiles.map((file, index) => ({
            url: URL.createObjectURL(file),
            file,
            id: index,
          }));
          console.log("multiple");
        } else {
          // Handle single file upload
          const file = selectedFiles[0];
          const imageUrl = URL.createObjectURL(file);
          this.uploadedImages = { url: imageUrl, file, id: 0 };
        }
      } else {
        // Display an error message or take appropriate action
        console.log('Image size exceeds the maximum limit');
      }

      // Emit a custom event to pass the uploadedImages array or object to the parent component
      this.$emit('uploaded-images-updated', this.uploadedImages);
      console.log(this.uploadedImages);
      event.target.value = null;
    },

    validateImageSize(files) {
      const maxSizeInBytes = 20 * 1024 * 1024; // 20MB

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.size > maxSizeInBytes) {
          return false; // Image size exceeds the maximum limit
        }
      }

      return true; // All images are within the size limit
    },

    removeImage(index) {
      this.uploadedImages = Array.isArray(this.uploadedImages)
        ? this.uploadedImages.filter((img) => img.id !== index)
        : [];

      // Emit a custom event to notify the parent about the removed image
      this.$emit('image-removed', { images: this.uploadedImages, removedIndex: index });
    }

  },
};
</script>

-->