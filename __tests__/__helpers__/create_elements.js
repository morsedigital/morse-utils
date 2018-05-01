export const create = (el)=>{
  el = el || 'div';
  const holder = document.createElement(el);

  const obj = {
    addId: (id)=>{
      holder.id = id;
      return obj;
    }
    , addAttribute: (attrs)=>{
      if (attrs){
        for (let a in attrs){
          if (attrs[a]){
            holder[a] = attrs[a];
          }
        }
      }

      return obj;
    }
    , append: (path)=>{
      path = path || document.body;
      path.appendChild(holder);
      return obj;
    }
    , get: ()=>{
      return holder;
    }
    , remove: ()=>{
      holder.parentNode.removeChild(holder);
    }
  };
  return obj;
};

export const createHolder = (id, path, el)=>{
  el = el || 'div';
  path = path || document.body;

  const holder = document.createElement(el);
  holder.id = id;
  path.appendChild(holder);
  return holder;
};

export const createElement = (path, attrs, el)=>{
  el = el || 'div';

  const holder = document.createElement(el);

  if (attrs){
    for (let a in attrs){
      if (attrs[a]){
        holder[a] = attrs[a];
      }
    }
  }

  if (path){
    path.appendChild(holder);
  }

  return holder;
};

export const removeElement = (el)=>{
  el.parentNode.removeChild(el);
};
