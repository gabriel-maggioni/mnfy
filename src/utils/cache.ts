import NodeCache from 'node-cache';

class Cache {
    private cache = new NodeCache({ stdTTL: 900 });

    get(search:string){
        return this.cache.get(search);
    }
    set(search:string, value:object){
        this.cache.set(search, value);
    }
}

export default Cache;