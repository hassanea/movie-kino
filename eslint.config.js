import pluginVue from 'eslint-plugin-vue';
import pluginVueA11y from 'eslint-plugin-vuejs-accessibility';

export default [
  ...pluginVue.configs['flat/strongly-recommended'],
  ...pluginVueA11y.configs['flat/recommended'],
  {
    rules: {
      
    }
  }
];