export class AdapterLocalstorage {

    get<T>(key: string | string[]) {
        if (typeof key === 'string') {
            let result = localStorage.getItem(key) || '';
            try { result = JSON.parse(result); } catch {}
            return result as T;
        } else {
            let resultArr = {};
            for (const row of key) {
                let result = localStorage.getItem(row) || '';
                try { result = JSON.parse(result); } catch {}
                Object.assign(resultArr, { [row]: result });
            }
            return resultArr as T;
        }
    }
}