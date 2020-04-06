
import Vue, { VueConstructor } from 'vue';

declare module '*.vue' {
  export default Vue;
}

declare module '*.svg' {
  const content: VueConstructor<Vue>;

  export default content;
}
