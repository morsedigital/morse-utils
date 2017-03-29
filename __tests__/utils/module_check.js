/* eslint-env browser, jasmine */
import _ from 'lodash';

export default (spyManager)=>(ReturnValue)=>{
  describe('should return the correct object', function(){
    let rv;
    beforeEach(function(){
      rv = ReturnValue();
    });

    it('should return correct object with check & tigger', function(){
      expect(_.isPlainObject(rv)).toBeTruthy();
      expect(_.has(rv, 'check')).toBeTruthy();
      expect(_.has(rv, 'check')).toBeTruthy();
    });

    it('should return check', function(){
      let check = rv.check;
      expect(_.isFunction(check)).toBeTruthy();
      expect(check).toEqual(spyManager.get('check'));
    });

    it('should return trigger', function(){
      expect(_.isFunction(rv.trigger)).toBeTruthy();
    });
  });
};
