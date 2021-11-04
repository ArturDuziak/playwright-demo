declare namespace PlaywrightTest {
  interface Matchers<R> {
    /**
     * Used when you want to assert that the value is one of given group of values
     * @example 
     * expect(5).toBeOneOf([3,4,5,6])
     * expect('Dog').toBeOneOf(['Cat','Dog','CatDog'])
     */
    toBeOneOf(values: Array<string | number>): R;
  }
}
