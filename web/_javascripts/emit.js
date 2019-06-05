function _each(item, fn) {
  const items = Array.isArray(item) ? item : [item];
  for (let i = 0; i < items.length; i++) {
    fn(items[i]);
  }
}

export class SyncEmitter {
  constructor(context) {
    this.queues = {};
    this.context = context || this;
  }

  on(event, fn, context) {
    const queue = (this.queues[event] = this.queues[event] || []);
    const index = queue.indexOf(fn);
    if (~index && fn.__onetime && queue[index].__onetime) return this;
    fn.context = context || this.context;
    queue.push(fn);
    return this;
  }

  one(event, fn, context) {
    fn.__onetime = true;
    return this.on(event, fn, context);
  }

  once(event, fn, context) {
    fn.__onetime = true;
    return this.on(event, fn, context);
  }

  off(event, fn) {
    if (!(event in this.queues)) return this;
    if (fn == undefined) return delete this.queues[event];
    const queue = this.queues[event];
    const index = queue.indexOf(fn);
    if (index < 0 || typeof fn != 'function') return this;
    this.queues[event].splice(index, 1);
    return this;
  }

  emit(event, ...args) {
    if (!(event in this.queues)) return this;
    const queue = this.queues[event].slice();
    for (let i = 0; i < queue.length; i++) {
      let fn = queue[i];
      fn.__onetime && this.off(event, fn);
      fn.apply(fn.context, args);
    }
    return this;
  }
}

export class AsyncEmitter {
  constructor(context) {
    this.queues = {};
    this.context = context || this;
  }

  on(event, fn) {
    _each(event, event => {
      this.queues[event] = this.queues[event] || [];
      this.queues[event].push(fn);
      // this.queues[event].push(fn.bind(this.context));
    });
  }

  one(event, fn) {
    fn.__onetime = true;
    return this.on(event, fn);
  }

  off(event, fn) {
    _each(event, event => {
      if (fn) {
        this.queues[event].splice(this.queues[event].indexOf(fn), 1);
      } else {
        delete this.queues[event];
      }
    });
  }

  emit(event, ...args) {
    _each(event, event => {
      const queue = this.queues[event] && this.queues[event].slice();
      queue &&
        queue.forEach(fn => {
          fn.__onetime && this.off(event, fn);
          window.setTimeout(fn.bind(this.context), 0, ...args);
          // window.setTimeout(fn, 0, ...args);
        });
    });
  }
}
