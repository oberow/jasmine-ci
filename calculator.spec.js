describe('calculator.js', function () {
  let calculator;
  let calculator2;
  
  describe('Calculator', function () {

    beforeEach(function(){
      calculator = new Calculator();
      calculator2 = new Calculator();
    });

    afterEach(function(){

    });

    it('should initialize the total', function () {
      expect(calculator.total).toBe(0);
      expect(calculator.total).toBeFalsy();
    });

    it('can be instantiated', function () {
      jasmine.addMatchers(customMatchers);


      expect(calculator).toBeCalculator();
      expect(calculator).toBeTruthy();
      expect(calculator2).toBeTruthy();
      expect(calculator).toEqual(calculator2);
      expect(calculator.constructor.name /*Calculator*/).toContain("Calc");
    });

    it('has common operations', function () {

      expect(calculator.add).toBeDefined();
      expect(calculator.subtract).toBeDefined();
      expect(calculator.multiply).toBeDefined();
      expect(calculator.divide).toBeDefined();
    })


    describe('add()', function () {
      it('should add numbers to total', function () {
        calculator.add(5);
        expect(calculator.total).toBe(5);
        // expect(10).toBe(4);
      });

      it('returns total', function () {
        calculator.total = 50;
        expect(calculator.add(20)).toBe(70);
        expect(calculator.total).toMatch(/-?\d+/);
        expect(typeof calculator.total).toMatch('number');
        expect(calculator.total).toBeNumber();
        expect(calculator.total).toEqual(jasmine.anything());
      })
    });


    describe('subtract()', function () {
      it('should subtract numbers from total', function () {
        calculator.total = 30;
        calculator.subtract(5);
        expect(calculator.total).toBe(25);
      });

    });

    describe('multiply()', function () {
      it('does not handle NaN', function () {
        calculator.total = 20;
        calculator.multiply('a');
        expect(calculator.total).toBeNaN();
      });

    });

    describe('divide()', function () {
      it('handles divide by zero', function () {
        expect(function () {
          calculator.divide(0)
        }).toThrow();
        expect(function () {
          calculator.divide(0)
        }).toThrowError(Error);
        expect(function () {
          calculator.divide(0)
        }).toThrowError(Error, 'cannot divide by zero');
      });

      it('should divide total by number', function () {
        calculator.total = 100;
        calculator.divide(2);
        expect(calculator.total).toBe(50);
      });


    });


    describe('get version', function () {
      it('fetches version from external source', function(){
        //use this to stub the call that returns a promise
        spyOn(window,'fetch').and.returnValue(Promise.resolve(
          new Response('{"version": "0.1"}')
        ));

        calculator.version.then(function(version){
          expect(version).toBe('0.1'); //asynchronous, jasmine does not have access to this spec when running spec runner
          // done();
        });
      });

      //async version
      // it('fetches version from external source', async function(){
      //   //use this to stub the call that returns a promise
      //   spyOn(window,'fetch').and.returnValue(Promise.resolve(
      //     new Response('{"version": "0.1"}')
      //   ));
      //
      //   const version = await calculator.version; //wait for promise to be resolved
      //     expect(version).toBe('0.1'); //asynchronous, jasmine does not have access to this spec when running spec runner
      //     // done();
      // });

    });

  });
});
