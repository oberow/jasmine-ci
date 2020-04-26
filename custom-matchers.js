const customMatchers = {
  toBeCalculator: function(){
    return {
      compare: function(actual){
        const result = {
          pass: actual instanceof Calculator, //TODO,
          message: ''
        }

        if (result.pass){
          result.message = 'Expected' + actual + "not to be instance of Calculator"; // if  matcher is negated not.to.... then this message may show
        }else {
          result.message = 'Expected' + actual + " to be instance of Calculator";

        }
        return result;

      }
    }
  }
}
