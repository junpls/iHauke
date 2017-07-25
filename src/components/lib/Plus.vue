<template>
    <svg class="plus" :style="{ width: size, height: size }"
         xmlns:dc="http://purl.org/dc/elements/1.1/"
         xmlns:cc="http://creativecommons.org/ns#"
         xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
         xmlns:svg="http://www.w3.org/2000/svg"
         xmlns="http://www.w3.org/2000/svg"
         :width="size"
         :height="size"
         viewBox="0 0 199.99999 199.99999"
         id="svg4319"
         version="1.1">
      <g
        id="layer1"
        transform="translate(0,-852.36225)">
        <path
          style="display:inline;opacity:1;stroke:none;stroke-width:1;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1"
          d="m 100.00005,864.67886 c -48.426363,-4.9e-4 -87.684113,39.2564 -87.684697,87.68274 -5e-4,48.4271 39.257568,87.6851 87.684697,87.6846 48.42638,-6e-4 87.68327,-39.2582 87.68277,-87.6846 -5.8e-4,-48.42564 -39.25715,-87.68215 -87.68277,-87.68274 z m -3.98367,49.3682 7.93474,0 0,34.20435 34.20429,0 0,7.93279 -34.20429,0 0,34.20433 -7.93474,0 0,-34.20433 -34.204288,0 0,-7.93279 34.204288,0 z"
          id="path4136-5" />
      </g>
    </svg>
</template>

<script>
 export default {
   name: 'plus',
   props: ['href', 'size']
 }
 
</script>

<style lang="scss" scoped>
 @import "./../../_style.scss";
 
 .plus {
   fill-opacity: 1;
   fill: $primary;
 }

 .plus:hover {
   fill: lighten($primary, 10%);
 }

 .plus:active {
   fill: lighten($primary, 20%);
 }
</style>
