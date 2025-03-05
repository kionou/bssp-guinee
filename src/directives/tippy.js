// src/directives/tippy.js
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/shift-away.css';
import 'tippy.js/animations/scale.css';
import 'tippy.js/animations/perspective.css';
import 'tippy.js/themes/light.css';

export default {
  mounted(el, binding) {
    const options = typeof binding.value === 'string' 
      ? { content: binding.value } 
      : binding.value;
      
    tippy(el, options);
  }
}