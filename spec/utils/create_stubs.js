export const CookieManager = (stubs, spyManager)=>(cookie, value)=>{
  spyManager.addSpy({title: cookie, opts: ['getValue', 'createCookie', 'deleteCookie']
        });
  spyManager.addReturn(cookie, 'getValue')('returnValue', value);
  stubs.return('CookieMgmt')('returnValue', spyManager.get(cookie));
}

export const Checker = (stubs, spyManager)=>()=>{
  spyManager.add('check');
  stubs.return('checker')('returnValue', spyManager.get('check'));
}