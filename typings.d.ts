declare module '*.css';
declare module '*.scss';
declare module '*.png';
declare module '*.jpg';

declare module '*.vue' {
  import { ComponentOptions } from 'vue'
  const component: ComponentOptions;
  export default component;
}