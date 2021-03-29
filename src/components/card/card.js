import LWElement from './../../lib/lw-element.js';
import ast from './ast.js';
// import a from './a.scss';

customElements.define('ui-card',
   class extends LWElement {  // LWElement extends HTMLElement
      constructor() {
         super(ast);
         // super.applyStyles(a);
      }

      // derived from LWElement
      // domReady() {
      //    console.log('Dom is ready');
      // }

      // inputReady() {
      //    console.log('input is ready');
      // }

      // Called when the urlHash changes. This could be useful to update the 
      // DOM on component routing.
      // urlHashChanged() {
      //    // update component DOM
      //    this.update();
      // }

      // derived from HTMLElement
      // connectedCallback() {
      //    console.log(this.isConnected);
      //    console.log('Element added to page.');
      // }

      // disconnectedCallback() {
      //    console.log('Element removed from page.');
      // }

      // adoptedCallback() {
      //    console.log('Element moved to new page.');
      // }

      // static get observedAttributes() {
      //    return [];
      // }

      // attributeChangedCallback(name, oldValue, newValue) {
      //    console.log(name, oldValue, newValue);
      // }
   }
);
