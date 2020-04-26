describe('main.js', function(){
  describe('calculate()', function(){

    it('validates expression when first number is invalid', function(){
      //when you spy on a method, when it is called, the real method isn't called
      spyOn(window,'updateResult').and.stub();
      calculate('a+3');
      expect(window.updateResult).toHaveBeenCalled();
      expect(window.updateResult).toHaveBeenCalledWith('Operation not recognized');
      expect(window.updateResult).toHaveBeenCalledTimes(1);
    });

    it('validates expression when second number is invalid', function(){
      //when you spy on a method, when it is called, the real method isn't called
      spyOn(window,'updateResult');
      calculate('3+a');
      expect(window.updateResult).toHaveBeenCalled();
      expect(window.updateResult).toHaveBeenCalledWith('Operation not recognized');
    });

    it('validates expression when operation is invalid', function(){
      //when you spy on a method, when it is called, the real method isn't called
      spyOn(window,'updateResult'); //and.
      calculate('3_4');
      expect(window.updateResult).toHaveBeenCalled();
      expect(window.updateResult).toHaveBeenCalledWith('Operation not recognized');
    });


    it('calls add', function(){
      // spyOn(Calculator.prototype,'add');
      const spy =  spyOn(Calculator.prototype,'add');
      calculate('3+4');

      expect(spy).toHaveBeenCalledTimes(2);
    });

    it('calls subtract', function(){
      const spy =  spyOn(Calculator.prototype,'subtract');
      calculate('3-7');
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith(7);
    });
    it('calls multiply',function(){
      const spy =  spyOn(Calculator.prototype,'multiply');
      calculate('3*8');
      expect(spy).toHaveBeenCalled();
      expect(spy).not.toHaveBeenCalledWith(3);
      expect(spy).toHaveBeenCalledWith(8);
    });

    it('calls divide', function(){
      const spy =  spyOn(Calculator.prototype,'divide');
      calculate('3/2');
      expect(spy).toHaveBeenCalled();
      expect(spy).not.toHaveBeenCalledWith(3);
      expect(spy).toHaveBeenCalledWith(2);
    });

    it('calls updateResult (example using and.callThrough', function(){
      spyOn(window, 'updateResult');
      spyOn(Calculator.prototype, 'multiply').and.callThrough();
      calculate('5*5');
      expect(window.updateResult).toHaveBeenCalled();
      expect(window.updateResult).toHaveBeenCalledWith(25);
    });

    it('calls updateResult (example using and.callFake', function(){
      spyOn(window, 'updateResult');
      spyOn(Calculator.prototype, 'multiply').and.callFake(function (number){
        return 25;
      });
      calculate('5*5');
      expect(window.updateResult).toHaveBeenCalled();
      expect(window.updateResult).toHaveBeenCalledWith(25);
    });

    it('calls updateResult (example using and.returnValue', function(){
      spyOn(window, 'updateResult');
      spyOn(Calculator.prototype, 'multiply').and.returnValue('lololol');
      calculate('5*5');
      expect(window.updateResult).toHaveBeenCalled();
      expect(window.updateResult).toHaveBeenCalledWith('lololol');
    });

    it('calls updateResult (example using and.returnValues', function(){
      spyOn(window, 'updateResult');
      spyOn(Calculator.prototype, 'add').and.returnValues(null, 'whatever [add] returns');
      calculate('5+5');
      expect(window.updateResult).toHaveBeenCalled();
      expect(window.updateResult).toHaveBeenCalledWith('whatever [add] returns');
    });

    it('does not handle errors', function(){
      spyOn(Calculator.prototype, 'multiply').and.throwError('some error');
      // calculate('5*5');
      expect(function(){calculate('5*5')}).toThrowError('some error');
    });











  });
  describe('updateResult()', function(){
    beforeAll(function(){

      const element = document.createElement('div'); // insert a row in the db
      element.setAttribute('id', 'result');
      document.body.appendChild(element);
      this.element = element;
    });

    afterAll(function(){
      document.body.removeChild(this.element);
    });

    it('adds result to DOM element', function(){
      updateResult('5'); //update db row

      expect(this.element.innerText).toBe('5'); //check db row
    })
  });

  describe('showVersion()', function(){
    it('calls calculator version', function(){
      // spyOn(document, 'getElementById').and.returnValue({
      //   innerText:null
      // });
      // debugger;
      const spy = spyOnProperty(Calculator.prototype,'version','get').and.returnValue(
        Promise.resolve()
      );
      showVersion();
      // expect(Object.getOwnPropertyDescriptor(Calculator.prototype,'version').get).toHaveBeenCalled();
      expect(spy).toHaveBeenCalled();
    });
  });
});
