class A {
    defaultMethod() {
      return {
        text: `You've reached the ${this.constructor.name} default method`
      };
    }
  }
  
  export default new A();