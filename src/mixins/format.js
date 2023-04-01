export default {
  methods: {
    obj2Str(target) {
      if (target !== 'object') return target

      return JSON.stringify(target)
    }
  }
}